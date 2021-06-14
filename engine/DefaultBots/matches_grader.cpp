#include <iostream>
#include <vector>
#include <sstream>
#include <string>

#include "enginelib.hpp"
using namespace std;

int main()
{
    int state = 24;

    cout << "Initial state: " << state << " sticks!";

    int winner = -1;

    // Play game.
    for (int i = 0; ; i = 1 - i) {
        auto [player_action, error] = MovePlayer(i, to_string(state) + "\n");

        if (player_action.size() == 0) {
            cout << "Player #" << i << " failed to play: error " << error << "\n";
            cout << "Winner is player #" << 1 - i << "!\n";
            winner = 1 - i;
            break;
        }

        istringstream in(player_action);

        int nr;
        in >> nr;

        cout << "Player #" << i << "' action: take " << nr << " sticks\n";

        if (nr <= 0 || nr > 3 || nr > state) {
            cout << "    Action illegal. Player #" << i << "loses!";
            winner = 1 - i;
            break;
        }

        state -= nr;

        if (state == 0) {
            cout << "Player #" << i << " wins!\n";
            winner = i;
            break;
        }
    }

    cerr << winner;
    return 0;
}
