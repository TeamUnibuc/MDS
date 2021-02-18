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

# Other stuff.
import random

# Path of the ia-sandbox executable
ia_sandbox_path = subprocess.run(["which", "ia-sandbox"], stdout=subprocess.PIPE).stdout.decode('utf-8')

class Match:
    def __init__(self):
        self.working_dir = "/tmp/match_" + str(random.randint(1, int(1e9)))
        os.mkdir(self.working_dir)

        # TODO: move the .hpp of the lib

    def __del__(self):
        os.rmdir(self.working_dir)


    def RunInSandbox(self, executable, args):
        """
            Runs the executable inside the ia-sandbox, while passing the args.
            Returns a dict.
            TODO:
            ia-sandbox a.out -r /home/theodor/Projects/MDS/Engine
                    --mount /bin:/bin:exec
                    --mount /lib:/lib:exec
                    --mount /lib64:/lib64:exec
                    --mount /usr/bin:/usr/bin:exec
                    --mount /usr/lib:/usr/lib:exec
                    --mount /usr/include:/usr/include 
        """
        pass

    def Compile(self, code, name):
        """Compiles the code into an executable called name inside the working dir"""
    
        # Write code into a cpp file.
        with open(self.working_dir + "/" + name + ".cpp", "w") as fout:
            fout.write(code)

        # Compile the code.
        result = self.RunInSandbox("g++", ["-std=c++17", "-Wall", "-Wextra", "-O2", code + ".cpp", "-o", name])
        
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
    match_status = match.RunInSandbox("engine", [])

    return {
        "status": "OK",
        "result": match_status
    }

