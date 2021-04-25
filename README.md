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


## Development

Pentru instructiuni la cum sa contribui la proiect, consulta [Development](Development.md)

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

## Functionalitati

### Etapa 1
* Schelet al proiectului -- Evaluarea merge, exista frontend, backend, baza de date.

### Etapa 2

1. Useri se pot loga cu google / fb / github / twitter.
2. Exista o colectie de jocuri.
    Un joc este constituit din:
    * Un enunt -- descrierea jocului.
    * Un grader -- program capabil sa decida castigatorul dintr-o multime de boti.
    * Unul sau mai multi boti oficiali -- pe care utilizatorii trebuie sa ii bata pentru a castiga puncte.
    * Pentru a lua puncte, utilizatorii trebuie sa bata (in ordine) botii oficiali.
3. Exista un clasament.
    Clasamentul exista pentru:
    * Fiecare joc in parte, cu cei mai buni jucatori.
    * Per toatal, cu userii cu cele mai multe puncte.

## Etape 3

1. Userii pot adauga probleme.
    Trebuie sa trimita:
    * Un titlu
    * Un enunt
    * Un grader
    * O serie de boti (daca problema este cu mai multi jucatori)

## Etapa 4

1. Se organizeaza campionate.
    Organizarea:
    * Se organizeaza o competitie (ca pe codeforces).
    * Se anunta problema si cerintele.
    * Se dau la dispozitia utilizatorilor cativa boti (sau niciunul) pe care isi pot testa submisia.
    * Cand se termina competitia, se face cumva un clasament al jucatorilor facandu-i sa se bata intre ei.
2. Reprezentare grafica a problemei.
    La trimiterea unei probleme, se poate opta pentru integrarea reprezentarii grafice.
    
