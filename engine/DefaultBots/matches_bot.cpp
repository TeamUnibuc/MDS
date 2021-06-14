#include <iostream>
#include <vector>
#include <assert.h>
#include <string>
#include <time.h>
#include <random>
using namespace std;

int main()
{
    srand(time(0));

    int nr;
    cin >> nr;

    if (nr % 4 == 0)
        cout << rand() % 3 + 1 << '\n';
    else
        cout << nr % 4 << '\n';
    return 0;
}