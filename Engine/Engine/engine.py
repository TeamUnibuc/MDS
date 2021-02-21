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
        command = ["ia-sandbox", executable, "-t", str(int(time_limit * 1000)) + "ms",
                    "-r", self.working_dir,
                    "--mount", "/bin:/bin:exec",
                    "--mount", "/lib:/lib:exec",
                    "--mount", "/lib64:/lib64:exec", 
                    "--mount", "/usr/bin:/usr/bin:exec",
                    "--mount", "/usr/lib:/usr/lib:exec",
                    "--mount", ia_sandbox_path[:-10] + ":/ia-sandbox:exec",
                    "--mount", "/usr/include:/usr/include",
                    "--mount", "/sys/fs/cgroup/cpuacct/ia-sandbox:/sys/fs/cgroup/cpuacct/ia-sandbox:rw",
                    "--mount", "/sys/fs/cgroup/memory/ia-sandbox:/sys/fs/cgroup/memory/ia-sandbox:rw",
                    "--mount", "/sys/fs/cgroup/pids/ia-sandbox:/sys/fs/cgroup/pids/ia-sandbox:rw",
                    "--env", "PATH=/usr/bin",
                    "-o", "json",
                    "--stdout", self.working_dir + "/stdout",
                    "--stderr", self.working_dir + "/stderr", 
                    "--"] + args

        # Running command.
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        sandbox_status = result.stdout.decode('utf-8')
        sandbox_error = result.stderr.decode('utf-8')

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
        result = self.RunInSandbox(gpp_path, ["-std=c++17", "-Wall", "-Wextra", "--static", "-O2", name + ".cpp", "-o", name], 5)
        
        return result


# Entry point of the script.
# Will probably be called from `nodejs` with some sockets.
def Simulate(engine: str, bots: list):
    """
        Simulates a battle between the bots from `bots`,
        by running the engine.

        Parameters:
            engine: C++ code with the engine.
            bots: List containing bots to compete against each other.
        Return value:
            A Json TODO: fix return value
    """

    # Create a new match object.
    match = Match()

    # Compile the engine, and return failure if unable to compile.
    compilation_status = match.Compile(engine, "engine")
    if compilation_status.status != "OK":
        return {
            "status": "ERROR",
            "error": {
                "type": "compilation",
                "file": "engine",
                "details": compilation_status
            }
        }
    
    # Compile bots, and return failure if unable to compile.
    for id, code in enumerate(bots):
        compilation_status = match.Compile(code, "bot_" + str(id))
        if compilation_status.status != "OK":
            return {
                "status": "ERROR",
                "error": {
                    "type": "compilation",
                    "file": "bot_" + str(id),
                    "details": compilation_status
                }
            }
    
    # Run the actual match.
    match_status = match.RunInSandbox("/engine", [])

    return {
        "status": "OK",
        "result": match_status
    }


