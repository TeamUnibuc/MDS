export const function_proto = `/**
 * Receives the id of the player to move.
 * Returns { player_response, error } as a result.
 * If error is "", then the player successfully moved.
 * If error is not "", then player_response" should be "".
 */
std::pair <std::string, std::string> MovePlayer(int id, std::string state, double time_limit_sec = 1.);`

export const engine_sample = `// Sample of an engine for the NIM game.
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
