/**
 * This library helps with the runtime evaluation of programs.
 */

#ifndef ENGINE_LIB__
#define ENGINE_LIB__

#include <fstream>
#include <string>

/**
 * Receives the id of the player to move.
 * Returns { player_response, error } as a result.
 * If error is "", then the player successfully moved.
 * If error is not "", then player_response" should be "".
 */
std::pair <std::string, std::string> MovePlayer(int id, std::string state, double time_limit_sec = 1.)
{
    using namespace std;

    std::string executable_name = "/bot_" + to_string(id);

    ofstream out("bot_input");
    out << state << '\n';
    out.close();

    string command = "/ia-sandbox/ia-sandbox " + executable_name +
            " --stdin bot_input --stdout bot_output --stderr ignore " +
            "-t " + to_string(int(time_limit_sec * 1000)) + "ms " +
            "-o oneline > ia_sandbox_stdout";

    system(command.c_str());

    auto get_str = [&](string file) -> string {
        ifstream in(file);
        istreambuf_iterator<char> eos;
        return string(istreambuf_iterator<char>(in), eos);
    };

    string bot_result = get_str("bot_output");
    string env_result = get_str("ia_sandbox_stdout");

    if (env_result.substr(0, 2) != "OK")
        return { "", env_result };
    
    return { bot_result, "" };
} 

#endif // ENGINE_LIB__