#include <iostream>
#include <vector>
#include <sstream>
#include <string>

#include "enginelib.hpp"
using namespace std;

int main()
{
    vector <string> state = { "---", "---", "---" };

    auto print_state = [&]() {
        cout << "    " + state[0] + "\n    " + state[1] + "\n    " + state[2] + "\n";
    };

    cout << "Initial state:\n";
    print_state();

    int winner = -1;

    // Play game.
    for (int i = 0; ; i = 1 - i) {
        auto [player_action, error] = MovePlayer(i,
            state[0] + "\n" + state[1] + "\n" + state[2] + "\n");

        if (player_action.size() == 0) {
            cout << "Player #" << i << " failed to play: error " << error << "\n";
            cout << "Winner is player #" << 1 - i << "!\n";
            winner = 1 - i;
            break;
        }

        istringstream in(player_action);

        int lin, col;
        in >> lin >> col;

        cout << "Player #" << i << ": Action = (lin=" << lin << ", col=" << col << ")\n";

        if (min(lin, col) < 0 || max(lin, col) > 2 || state[lin][col] != '-') {
            cout << "    Action illegal. Player #" << i << "loses!";
            winner = 1 - i;
            break;
        }

        state[lin][col] = (i == 0 ? 'X' : 'O');
        cout << "    Action accepted. state is:\n";
        print_state();

        bool won = 0;
        for (int p = 0; p < 3; p++) {
            if (state[0][p] == state[1][p] && state[1][p] == state[2][p] && state[2][p] != '-')
                won = 1;
            if (state[p][0] == state[p][1] && state[p][1] == state[p][2] && state[p][2] != '-')
                won = 1;
        }

        if (state[0][0] == state[1][1] && state[1][1] == state[2][2] && state[2][2] != '-')
            won = 1;
        if (state[0][2] == state[1][1] && state[1][1] == state[2][0] && state[2][0] != '-')
            won = 1;

        if (won) {
            cout << "Player #" << i << " wins!\n";
            winner = i;
            break;
        }
    }

    cerr << winner;
    return 0;
}
