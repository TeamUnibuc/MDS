import React from 'react';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';
import CodeMirror from '@uiw/react-codemirror';
import { Box } from '@material-ui/core';

const function_proto = `/**
 * Receives the id of the player to move.
 * Returns { player_response, error } as a result.
 * If error is "", then the player successfully moved.
 * If error is not "", then player_response" should be "".
 */
std::pair <std::string, std::string> MovePlayer(int id, std::string state, double time_limit_sec = 1.);`

const engine_sample = `// Sample of an engine for the NIM game.
#include <iostream>
#include <vector>
#include <sstream>
#include "enginelib.hpp"
using namespace std;

int main()
{
    vector <int> state = { 5, 4, 10, 2, 3 };

    cout << "Initial state: { ";
    for (auto i : state)
        cout << i << " ";
    cout << "}\\n";

    int winner = 0;

    // Play game.
    for (int i = 0; ; i = 1 - i) {
        ostringstream out;
        out << state.size() << '\\n';
        for (auto i : state)
            out << i << ' ';
        out << '\\n';

        auto [player_action, error] = MovePlayer(i, out.str());

        if (player_action.size() == 0) {
            cout << "Player #" << i << " failed to play: error " << error << "\\n";
            cout << "Winner is player #" << 1 - i << "!\\n";
            winner = 1 - i;
            break;
        }

        istringstream in(player_action);

        int poz, nr;
        in >> poz >> nr;

        cout << "Player #" << i << ": Action = (" << poz << ", " << nr << ")\\n";

        if (poz < 0 || poz >= state.size() || nr > state[poz] || nr <= 0) {
            cout << "    Action illegal. Player #" << i << "loses!";
            winner = 1 - i;
            break;
        }

        state[poz] -= nr;
        cout << "    Action accepted. state is { ";
        for (auto i : state)
            cout << i << ' ';
        cout << "}\\n";
    }

    cerr << winner;
    return 0;
}
`

export default function Documentation() : JSX.Element {

    return (
        <div>
            <h1>Fight-Bots Documentation</h1>

            <h2>How Fight-Bots evaluation works</h2>

            <div>
                <p>The evaluation of submissions is done for each game with the help of what we call the &quot;engine&quot; of the game.</p>
                <p>As such, for adding a new game, the users should also include an engine, able to simulate the game, and a few bots (at least one), which the users will have to defeat for winning points.</p>
            </div>

            <h2>The enginelib.hpp library</h2>

            For interacting with bots while simulating the game, the engine should include the following library:

            <Box style={{width:'100%', height: '50px'}}>
                <CodeMirror
                    value={"#include \"enginelib.hpp\""}                    
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'c++',
                        lineNumbers: true,
                        readOnly: true,

                    }}
                />
            </Box>

            The header gives the engine access to the following function:

            <Box style={{width:'100%', height: '150px'}}>
                <CodeMirror
                    value={function_proto}                    
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'c++',
                        lineNumbers: true,
                        readOnly: true,

                    }}
                />
            </Box>
            
            <br />

            <h2>Displaying Battle Results</h2>

            <div>
                <p>The battle results are displayed in two ways:</p>
                <ol>
                    <li>The battle log should be printed to stdout, and will be used for giving to the users a brief overview of the battle.</li>
                    <li>The winner of the game (Bot #0 or Bot #1) should be printed to stderr. If the winner is Bot #x, then the engine should print to stderr x.</li>
                </ol>
            </div>

            <h2>Engine Sample</h2>
            <Box style={{width:'100%', height: '1000px'}}>
                <CodeMirror
                    value={engine_sample}                    
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'c++',
                        lineNumbers: true,
                        readOnly: true,

                    }}
                />
            </Box>

        </div>
    );
}