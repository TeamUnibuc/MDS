import React from 'react';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';
import CodeMirror from '@uiw/react-codemirror';
import { Box } from '@material-ui/core';
import { useStyles } from './DocumentationStyles';

import { engine_sample, function_proto } from './utils';


export default function Documentation() : JSX.Element {
    const classes = useStyles();
    
    return (
        <div>
            <h1>Fight-Bots Documentation</h1>

            <h2>How Fight-Bots evaluation works</h2>

            <div>
                <p>The evaluation of submissions is done for each game with the help of what we call the &quot;engine&quot; of the game.</p>
                <p>As such, for adding a new game, the users should also include an engine, able to simulate the game, and a few bots (at least one), which the users will have to defeat for winning points.</p>
            </div>

            <h2>The enginelib.hpp library</h2>

            For interacting with bots while simulating the game, the engine should include the following library:

            <Box className={classes.codeMirrorContainer} height="50px">
                <CodeMirror
                    value={"#include \"enginelib.hpp\""}                    
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'c++',
                        lineNumbers: true,
                        readOnly: true,

                    }}
                />
            </Box>

            The header gives the engine access to the following function:

            <Box className={classes.codeMirrorContainer} height="150px">
                <CodeMirror
                    value={function_proto}                    
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'c++',
                        lineNumbers: true,
                        readOnly: true,

                    }}
                />
            </Box>
            
            <br />

            <h2>Displaying Battle Results</h2>

            <div>
                <p>The battle results are displayed in two ways:</p>
                <ol>
                    <li>The battle log should be printed to stdout, and will be used for giving to the users a brief overview of the battle.</li>
                    <li>The winner of the game (Bot #0 or Bot #1) should be printed to stderr. If the winner is Bot #x, then the engine should print to stderr x.</li>
                </ol>
            </div>

            <h2>Engine Sample</h2>
            <Box className={classes.codeMirrorContainer} height="1000px">
                <CodeMirror
                    value={engine_sample}                    
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'c++',
                        lineNumbers: true,
                        readOnly: true,

                    }}
                />
            </Box>

        </div>
    );
}