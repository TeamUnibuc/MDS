"""
    Library testing the engine
"""

import pathlib
from typing import List
import unittest
from unittest.runner import TextTestResult, TextTestRunner
import engine
import json

# Global path with sample bots and default includes.
path = pathlib.Path(__file__).parent.absolute().as_posix() + "/Grader/"

def read_sample_file(name: str) -> str:
    """
        Reads a file forom the default path
    """
    with open(path + name, "r") as fin:
        return fin.read() 

sample_bot_ok = read_sample_file("sample_nim_bot.cpp")
sample_bot_tle = read_sample_file("sample_nim_bot_TLE.cpp")
sample_bot_rte = read_sample_file("sample_nim_bot_RTE.cpp")
sample_bot_ce = "invalid c++ code"

sample_grader_ok = read_sample_file("sample_nim_grader.cpp")
sample_grader_tle = read_sample_file("sample_nim_grader_TLE.cpp")
sample_grader_rte = read_sample_file("sample_nim_grader_RTE.cpp")
sample_grader_ce = "invalid c++ code"

# Simulator class we are testing
simulator = engine.Simulator()

def eval(engine: str, bots: List[str]) -> str:
    """
        Packing engine and bots into a json,
        calls the simulator and returns the answer
    """
    obj = json.dumps({
        "engine": engine,
        "bots": bots
    })
    result = simulator.StartSimulation(obj)
    return json.loads(result)

class TestSuccessfulExecution(unittest.TestCase):
    """
        Tests expected normal behaviour if all works correctly
    """

    def test_successful_execution(self):
        """
            both bots work corectly
        """
        result = eval(sample_grader_ok, [sample_bot_ok, sample_bot_ok])
        self.assertTrue("status" in result)
        self.assertTrue(result["status"] == "ok")
        self.assertTrue("logs" in result)
        self.assertTrue("winner" in result)

    def test_successful_execution_invalid_first_bot(self):
        """
            Tests what happends if the first crashes or gets TLE
        """
        for bad_bot in [sample_bot_rte, sample_bot_tle]:
            result = eval(sample_grader_ok, [bad_bot, sample_bot_ok])
            self.assertTrue("status" in result)
            self.assertTrue(result["status"] == "ok")
            self.assertTrue("winner" in result)
            self.assertTrue(result["winner"] == "1")
    

    def test_successful_execution_invalid_second_bot(self):
        """
            Tests what happends if the first crashes or gets TLE
        """
        for bad_bot in [sample_bot_rte, sample_bot_tle]:
            result = eval(sample_grader_ok, [sample_bot_ok, bad_bot])
            self.assertTrue("status" in result)
            self.assertTrue(result["status"] == "ok")
            self.assertTrue("winner" in result)
            self.assertTrue(result["winner"] == "0")


class TestCompilationErrors(unittest.TestCase):
    """
        Tests behaviour when facing compilation errors
    """

    def test_grader_ce(self):
        """
            engine doesn't compile
        """
        result = eval(sample_grader_ce, [sample_bot_ok, sample_bot_ok])
        self.assertTrue("status" in result)
        self.assertTrue(result["status"] == "compilation_error")
        self.assertTrue("file" in result)
        self.assertTrue(result["file"] == "engine")
        self.assertTrue("compilation_message" in result)

    def test_bot_ce(self):
        """
            Tests what happends one of the bots doesn't compile
        """
        for b1, b2, id in [(sample_bot_ok, sample_bot_ce, 1), (sample_bot_ce, sample_bot_ok, 0)]:
            result = eval(sample_grader_ok, [b1, b2])
            self.assertTrue("status" in result)
            self.assertTrue(result["status"] == "compilation_error")
            self.assertTrue("file" in result)
            self.assertTrue(result["file"] == "bot_" + str(id))
            self.assertTrue("compilation_message" in result)

class TestEngineErrors(unittest.TestCase):
    """
        Tests behaviour when engine doesn't work properly
    """

    def test_grader_error(self):
        """
            engine doesn't compile
        """
        for en in [sample_grader_rte, sample_grader_tle]:
            result = eval(en, [sample_bot_ok, sample_bot_ok])
            self.assertTrue("status" in result)
            self.assertTrue(result["status"] == "error")
            self.assertTrue("reason" in result)


# See what happends when the engine gets TLE because stuff is to slow
def main():
    unittest.main()

if __name__ == "__main__":
    main()