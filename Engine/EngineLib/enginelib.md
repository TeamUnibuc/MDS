# Engine Worker

The engine's workflow is the following:

1. The game coordonator and the bots are compiled, and their binaries are placed in the same folder.
1. An `ia-sandbox` container is created, with:
    * `IA_SANDBOX` - a global variable with the path of the `ia-sandbox` executable.
    * Folder is mounted as `/working_dir`.
    * Write rights on the folder.


 ia-sandbox a.out -r /home/theodor/Projects/MDS/Engine --mount /bin:/bin:exec --mount /lib:/lib:exec --mount /lib64:/lib64:exec --mount /usr/bin:/usr/bin:exec --mount /usr/lib:/usr/lib:exec --mount /usr/include:/usr/include