# Cum executam si cum facem debug

## Setup

- Intai de toate, trebuie sa rulam `npm install` in folderul `backend` si `frontend`
- Pentru a lucra cu teste, folosim extensia `Jest Runner`

-----------------------------------
## Operatiuni backend:

Vom presupune cand lucram la backend ca terminalul se afla la fiecare comanda cu `cwd` in `backend` 

## Run backend  (Deocamndata doar debug-friendly)

- `npm run build`
- `npm run serve`  (serve nu face rebuild)

## Run backend tests

Toate testele:
- `npm run test`

Teste specifice:
- Deasupra testului / suitei apasati `Run`

## Debug backend

* Requirement: VS-Code extension: Jest Runner

- `npm run build`  (este nevoie sa avem folderul `dist` actualizat)
- Pornim launch configuration: `Debug Backend`

## Debug backend tests

* Requirement: VS-Code extension: Jest Runner

- `npm run build`  (este nevoie sa avem folderul `dist` actualizat)
- Deasupra testelor / suitelor, apasati `Debug`

-------------------------------------
## Operatiuni frontend:

Vom presupune cand lucram la frontend ca terminalul se afla mereu in `cwd` la adresa `frontend`

## Run frontend  (Debug)

- `npm run serve`

## Run frontend tests

Toate testele:
- `npm run test`

Teste specifice:
- Deasupra testului / suitei apasati `Run`

## Debug frontend  (Chrome, client-side)

* Trebuie sa avem serviciul (procesul de nodeJS) care ruleaza frontend-ul in picioare
* Activati serviciul cu `npm run serve`
* Avem 3 metode de a da debug:
- Developer Console din chrome/firefox, pentru plain debugging (sursele se afla in webpack -> src)
- Chrome extension Vue Dev Tools
- Pornim launch configuration `vuejs: chrome`

## Debug frontend tests

* Requirement: VS-Code extension: Jest Runner
- Deasupra testelor / suitelor, apasati `Debug`