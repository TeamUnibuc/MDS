# Proiect Metode de Dezvoltare Software

## Tehnologii posibile

1. `NodeJS` pentru server
1. `Socket.io` pentru comunicare server / frontend
1. `zerorpc.io` pentru comunicarea NodeJS / Python
1. `Pytorch` pentru ML
1. `ElectronJS` pentru aplicatie desktop in nodejs
1. `KonvasJS` pentru rendare 2d in HTML
1. `Bazel` pentru C++ Build
1. `GTest` pentru testare C++
1. `ProtocolBuffers` pentru comunicare / salvare date
1. `Abseil.io` pentru functionalitati aditionale C++

## Boti

stdin: starea jocului
stdout: mutarea noastra

## Eval

```c++
    string PlayTurn(int player, string state) {
        string ans = exec("Bot_nr#" + player + ".out", stdin = state);
        return ans;
    }

    void Render(Sprite s) {
        screen.display(s);
    }

    // Ce implementeaza cu adevarat evalul
    int Eval() {
        string state = "1234455";
        player = 1;
        while (true) {
            string state_nou = PlayTurn(player, state);
            if (state_nou_prost)
                return 1 - player;
            player = 1 - player;
            Sprite s = ...
            Render(s);
        }
    }
```
