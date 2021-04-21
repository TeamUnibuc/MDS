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

    A description of the used API can be seen [here](https://github.com/TeamUnibuc/MDS/wiki/Engine-API).
"""

# Used for lunching subprocesses.
# We will mainly use it for getting results from called functions.
import subprocess
from multiprocessing import Manager, Process

# For accessing the filesystem.
import os
import pathlib
import shutil

# Other stuff.
import random
import json
import logging

# Communication with TS Backend.
import zerorpc



# Initialize logging.
logging.basicConfig(format = u'[LINE:%(lineno)d]# %(levelname)-8s [%(asctime)s]  %(message)s', level = logging.NOTSET)


# Path of the ia-sandbox executable
ia_sandbox_path = subprocess.run(["which", "ia-sandbox"], stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1]

# Path of the g++ executable
gpp_path = subprocess.run(["which", "g++"], stdout=subprocess.PIPE).stdout.decode('utf-8')[:-1]


# Class able to start a sandbox in which to run a match.
class Match:
    """
        Steps for running a match:
            1. The working directory (/tmp/match_random-id) is created.
            2. The dependencies are injected in the environment.
            3. The C++ files are compiled in paralel.
                * Each bot is compiled in it's own folder: /tmp/match_random-id/bot_id/
                * The engine is also compiled in it's own folder: /tmp/match_random-id/engine/
            4. The engine's executable is moved up one one directory, and is executed.
    """

    def __init__(self):
        self.working_dir = "/tmp/match_" + str(random.randint(1, int(1e18)))
        os.mkdir(self.working_dir)
        logging.info(f"Created working folder: {self.working_dir}")

    def __del__(self):
        """
            Free memory (delete simulation folder).
        """
        shutil.rmtree(self.working_dir, ignore_errors=True)


    def RunInSandbox(self, executable: str, new_root:str = "", args: list = [], time_limit: float = 3.):
        """
            Runs the executable inside the ia-sandbox, while passing the args.
        """

        # No new root set, revert to the working dir
        if new_root == "":
            new_root = self.working_dir

        # Command to be ran.
        command = [
            "ia-sandbox", executable,
            "-t", str(int(time_limit * 1000)) + "ms",
            "-r", new_root
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

    def Inject(self, content, filename, path):
        """
            Injects content in the environment.
        """
        if path != "":
            os.mkdir(self.working_dir + path)

        with open(self.working_dir + path + "/" + filename, "w") as fout:
            fout.write(content)

    def Compile(self, code: str, name: str):
        """
            Compiles the code into an executable called name inside the working dir, in it's own folder
        """

        # Create new folder
        new_path = self.working_dir + "/" + name
        if not os.path.exists(new_path):
            os.mkdir(new_path)
    
        # Write code into a cpp file.
        with open(new_path + "/" + name + ".cpp", "w") as fout:
            fout.write(code)

        # Compile the code.
        result = self.RunInSandbox(gpp_path, new_path, ["-std=c++17", "-Wall", "-Wextra", "--static", "-O2", name + ".cpp", "-o", name], 30)
        
        return result

    def Move(self, source, dest):
        os.rename(self.working_dir + source, self.working_dir + dest)

# Entry point of the script.
# Will probably be called from `nodejs` with some sockets.
def Simulate(engine: str, bots: list, injects: list):
    """
        Simulates a battle between the bots from `bots`,
        by running the engine.

        Parameters:
            engine: C++ code with the engine.
            bots: List containing bots to compete against each other.
            injects: pair of (code, name) of additional files to inject.
        Return value: stringify {
            result: "Success/CompilationError/TimeLimitExceded etc",
            file_error: "file that failed to compile",
            compilation_message: "Compilation error",
            evaluation_stdout: "eval",
            evaluation_stderr: "eval"
        }
    """

    # Create a new match object.
    match = Match()

    # Inject required files in the environment.
    for (code, name, path) in injects:
        match.Inject(code, name, path)
    
    # Compiles a code with a given filename, and places the result into ret.
    def Compile(code: str, name: str, ret):
        compilation_status = match.Compile(code, name)
        compiled = False
        try:
            status = json.loads(compilation_status[0])
            if "result" in status and "Success" in status["result"]:
                compiled = True
        except:
            pass
        if not compiled:
            ret["status"] = {
                "status": "compilation_error",
                "file": name,
                "compilation_message": compilation_status[2]
            }
        else:
            ret["status"] = {
                "status": "ok"
            }

    # Process manager, creating process-independent dictionaries.
    process_manager = Manager()

    # Process of the engine's compilation.
    engine_status = process_manager.dict()
    engine_process = Process(target=Compile, args=[engine, "engine", engine_status])

    NR_BOTS = len(bots)

    # Processes of the bots' compilations.
    bots_status = [process_manager.dict() for _ in range(NR_BOTS)]
    bots_process = [Process(target=Compile, args=[bots[i], "bot_" + str(i), bots_status[i]]) for i in range(NR_BOTS)]

    # Starting all the processes.
    engine_process.start()
    for proc in bots_process:
        proc.start()

    # Joining all processes.
    engine_process.join()
    for proc in bots_process:
        proc.join()

    if engine_status["status"]["status"] != "ok":
        return engine_status["status"]

    for status in bots_status:
        if status["status"]["status"] != "ok":
            return status["status"]
    
    # Run the actual match.
    match.Move("/engine/engine", "/engine_bin")
    for bot in range(NR_BOTS):
        match.Move(f"/bot_{bot}/bot_{bot}", f"/bot_{bot}_bin")

    match_status = match.RunInSandbox("/engine_bin")
    try:
        result = json.loads(match_status[0])

        if "Success" not in result["result"]:
            raise Exception("Didn't finish successfully")

        winner = int(match_status[2])
        if winner < 0 or winner >= NR_BOTS:
            raise Exception(f"Invalid winner: {winner}")

        ans = {
            "status": "ok",
            "logs": match_status[1],
            "winner": match_status[2]
        }
        return ans
    except Exception as e:
        return {
            "status": "error",
            "reason": repr(e),
            "data": match_status
        }


class Simulator(object):
    def StartSimulation(self, content: str):
        logging.info("Received new request.")

        try:
            json_content = json.loads(content)
            engine = json_content["engine"]
            bots = json_content["bots"]
            with open(pathlib.Path(__file__).parent.absolute().as_posix() + "/Grader/enginelib.hpp", "r") as fin:
                injects = [(fin.read(), "enginelib.hpp", "/engine")]
            result = Simulate(engine, bots, injects)
            
            logging.info(f"Result: {result}")
            return json.dumps(result)
        except Exception as e:
            # logging.error(f"Error: {str(e)}")
            result = json.dumps({
                "status": "error",
                "reason": repr(e)
            })
            logging.error(f"Error: {result}")
            return result
            

def main():
    address = "tcp://0.0.0.0:4242"
    s = zerorpc.Server(Simulator())
    logging.info(f"Starting server. Listening at address {address}")
    s.bind(address)
    s.run()

if __name__ == "__main__":
    main()