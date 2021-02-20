#include <bits/stdc++.h>
#include "enginelib.hpp"
using namespace std;

int main()
{
    vector <int> state = { 5, 4, 10, 2, 3 };

    cout << "Initial state: { ";
    for (auto i : state)
        cout << i << " ";
    cout << "}\n";

    // Play game.
    for (int i = 0; ; i = 1 - i) {
        ostringstream out;
        out << state.size() << '\n';
        for (auto i : state)
            out << i << ' ';
        out << '\n';

        auto [player_action, error] = MovePlayer(i, out.str());

        if (player_action.size() == 0) {
            cout << "Player #" << i << " failed to play: error " << error << "\n";
            cout << "Winner is player #" << 1 - i << "!\n";
            return 0;
        }

        istringstream in(player_action);

        int poz, nr;
        in >> poz >> nr;

        cout << "Player #" << i << ": Action = (" << poz << ", " << nr << ")\n";

        if (poz < 0 || poz >= state.size() || nr > state[poz] || nr <= 0) {
            cout << "    Action illegal. Player #" << i << "loses!";
            return 0;
        }

        state[poz] -= nr;
        cout << "    Action accepted. state is { ";
        for (auto i : state)
            cout << i << ' ';
        cout << "}\n";
    }
}
