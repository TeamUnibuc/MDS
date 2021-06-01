import React, { useState, useContext } from 'react';
import { useStyles } from './CustomRequestStyles';
import { ApiTesterContext } from '../../ApiTesterContext';
import { prettyJSON } from 'utils';


import CodeMirror from '@uiw/react-codemirror'
import { TextField, Button, Box } from '@material-ui/core'

function CustomRequest() : JSX.Element {
    const classes = useStyles();
    const { setApiResponse } = useContext(ApiTesterContext);
    const [requestBody, setRequestBody] = useState('{}');
    const [path, setPath] = useState('/api/...');

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // const reqBody = JSON.parse(requestBody);
        // const data = await fetch(path, {
        //     method: "POST",
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(reqBody)
        // })
        // const content = await data.json();
        // console.log(content);
        // setApiResponse(prettyJSON(content));

        setApiResponse('{Custom}');
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
                value={path}
                onChange={(event) => setPath(event.target.value)}
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