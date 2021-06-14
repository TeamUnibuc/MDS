#include <iostream>
#include <vector>
#include <assert.h>
using namespace std;

int main()
{
    int n;
    cin >> n;

    vector <int> v(n);
    
    int x = 0;

    for (auto& i : v) {
        cin >> i;
        x ^= i;
    }

    if (x == 0) {
        // let me die :(
        for (int i = 0; i < n; i++) {
            if (v[i]) {
                cout << i << ' ' << 1 << '\n';
                return 0;
            }
        }

        // can't move. Just crash.
        assert(0);
    }

    for (int i = 0; i < n; i++) {
        if ((v[i]  ^ x) < v[i]) {
            cout << i << ' ' << (v[i] ^ x) << '\n';
            return 0;
        }
    }

    // shouldn't get here.
    assert(0);
}