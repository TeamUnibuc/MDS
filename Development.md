# Cum executam si cum facem debug

## Setup

- Intai de toate, trebuie sa rulam `npm install` in folderul `backend` si `frontend`

## Operatiuni backend:

Vom presupune cand lucram la backend ca terminalul se afla la fiecare comanda cu `cwd` in `backend` 

## Run backend

- `npm run build`
- `npm run serve`  (serve nu face rebuild)

## Run backend tests

- `npm run test`

## Debug backend

- `npm run build`  (este nevoie sa avem folderul `dist` actualizat)
- Pornim launch configuration: `Debug Backend`

## Debug tests

* Requirement: Extensia Jest Runner
* Requirement: Setarea din .vscode folder: `"jestrunner.projectPath": "${workspaceFolder}/backend"`
- Deasupra testelor / suitelor, apasati `Debug`


