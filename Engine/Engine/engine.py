"""
    Python engine, able to:
    1. Receive a game engine (as a .cpp file)
    2. Receive a list of bots (as .cpp files)
    3. Compile the game engine and the bots, returning the error code on compilation fault
    4. Run the game bot.

    Note:
    1. Compilations are made in an isolated container, with time limit, for avoiding
            recursive templates or other junk.
    2. The game engine is itself run in a container, for avoiding untrusted code execution.
    3. Bots are (you guessed it) also run into containers, for easying the timing etc.
"""

# Used for lunching subprocesses.
# We will mainly use it for getting results from called functions.
import subprocess

# For accessing the filesystem.
import os
import shutil

# Other stuff.
import random
import json

# Path of the ia-sandbox executable
ia_sandbox_path = subprocess.run(["which", "ia-sandbox"], stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1]

# Path of the g++ executable
gpp_path = subprocess.run(["which", "g++"], stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1]

class Match:
    def __init__(self):
        self.working_dir = "/tmp/match_" + str(random.randint(1, int(1e9)))
        os.mkdir(self.working_dir)

        # TODO: move the .hpp of the lib

    def __del__(self):
        shutil.rmtree(self.working_dir, ignore_errors=True)


    def RunInSandbox(self, executable: str, args: list = [], time_limit: float = 3.):
        """
            Runs the executable inside the ia-sandbox, while passing the args.
        """

        # Command to be ran.
        command = [
            "ia-sandbox", executable,
            "-t", str(int(time_limit * 1000)) + "ms",
            "-r", self.working_dir
        ]
        mounts = [
            "--mount", "/bin:/bin:exec",
            "--mount", "/lib:/lib:exec",
            "--mount", "/usr/bin:/usr/bin:exec",
            "--mount", "/usr/lib:/usr/lib:exec",
            "--mount", ia_sandbox_path[:-10] + ":/ia-sandbox:exec",
            "--mount", "/usr/include:/usr/include",
            "--mount", "/sys/fs/cgroup/cpuacct/ia-sandbox:/sys/fs/cgroup/cpuacct/ia-sandbox:rw",
            "--mount", "/sys/fs/cgroup/memory/ia-sandbox:/sys/fs/cgroup/memory/ia-sandbox:rw",
            "--mount", "/sys/fs/cgroup/pids/ia-sandbox:/sys/fs/cgroup/pids/ia-sandbox:rw",
        ]
        if os.path.exists("/lib64"):
            mounts = mounts + ["--mount", "/lib64:/lib64:exec"]

        config = [
            "--env", "PATH=/usr/bin",
            "-o", "json",
            "--stdout", self.working_dir + "/stdout",
            "--stderr", self.working_dir + "/stderr", 
            "--"] + args

        # Running command.
        result = subprocess.run(command + mounts + config, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        sandbox_status = result.stdout.decode('utf-8')
        sandbox_error = result.stderr.decode('utf-8')

        if sandbox_error != "":
            sandbox_status += "Error: " + sandbox_error

        # Retrieving stdout and stderr.
        with open(self.working_dir + "/stdout", "r") as fin:
            stdout = fin.read()
        with open(self.working_dir + "/stderr", "r") as fin:
            stderr = fin.read()

        return sandbox_status, stdout, stderr

    def Inject(self, content, filename):
        with open(self.working_dir + "/" + filename, "w") as fout:
            fout.write(content)

    def Compile(self, code, name):
        """Compiles the code into an executable called name inside the working dir"""
    
        # Write code into a cpp file.
        with open(self.working_dir + "/" + name + ".cpp", "w") as fout:
            fout.write(code)

        # Compile the code.
        result = self.RunInSandbox(gpp_path, ["-std=c++17", "-Wall", "-Wextra", "--static", "-O2", name + ".cpp", "-o", name], 15)
        
        return result


# Entry point of the script.
# Will probably be called from `nodejs` with some sockets.
def Simulate(engine: str, bots: list, injects: list):
    """
        Simulates a battle between the bots from `bots`,
        by running the engine.

        Parameters:
            engine: C++ code with the engine.
            bots: List containing bots to compete against each other.
        Return value: stringify {
            result: "Success/CompilationError",
            file_error: "file that failed to compile",
            compilation_message: "Compilation error",
            evaluation_stdout: "eval",
            evaluation_stderr: "eval"
        }
    """

    # Create a new match object.
    match = Match()

    for (code, name) in injects:
        match.Inject(code, name)
    
    def Compile(code: str, name: str):
        compilation_status = match.Compile(code, name)
        compiled = False
        try:
            status = json.loads(compilation_status[0])
            if "result" in status and "Success" in status["result"]:
                compiled = True
        except:
            pass
        if not compiled:
            return {
                "result": {
                    "CompilationError": None,
                },
                "file_error": name,
                "compilation_message": compilation_status[2]
            }
        return {
            "result": {
                "Success": None
            }
        }

    status = Compile(engine, "engine")
    if "Success" not in status["result"]:
        return status
    
    for id, code in enumerate(bots):
        status = Compile(code, "bot_" + str(id))
        if "Success" not in status["result"]:
            status
    
    # Run the actual match.
    match_status = match.RunInSandbox("/engine", [])

    try:
        object = json.loads(match_status[0])
        object["evaluation_stdout"] = match_status[1]
        object["evaluation_stderr"] = match_status[2]
        return object
    except:
        return {
            "status": {
                "Failure": None
            },
            "data": match_status
        }


