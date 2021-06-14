#include <iostream>
#include <vector>
#include <assert.h>
#include <string>
using namespace std;

int main()
{
    // Read states
    vector <string> lines(3);

    for (string& s : lines)
        cin >> s;

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (lines[i][j] == '-') {
                cout << i << ' ' << j << '\n';
                return 0;
            }
        }
    }
    // shouldn't get here.
    assert(0);
}