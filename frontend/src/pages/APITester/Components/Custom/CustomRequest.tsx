import React, { useState } from 'react';
import { useStyles } from './CustomRequestStyles'

import CodeMirror from '@uiw/react-codemirror'
import { TextField, Button, Box } from '@material-ui/core'

function CustomRequest() : JSX.Element {
    const classes = useStyles()
    const [requestBody, setRequestBody] = useState('{}');

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // fetch...
    }

    return (
        <form onSubmit={handleSubmit} className={classes.container} >
            <Box mt="20px" />

            <label>
                Path:
            </label>
            <TextField 
                name="path"
                placeholder="/api/..."
                helperText="Please enter path of the request"
            />

            <Box mt="20px" />
            <label>
                Request Body
            </label>
            <br />
            <Box className={classes.codeMirror}>
                <CodeMirror
                    value={requestBody}
                    onChange={(instance : CodeMirror.Editor) => setRequestBody(instance.getValue())}
                    options={{
                        theme: 'elegant',
                        keyMap: 'sublime',
                        mode: 'javascript',
                        lineNumbers: true,
                    }}
                />
            </Box>
            
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Submit
            </Button>
        </form>
    );
}

export default CustomRequest;