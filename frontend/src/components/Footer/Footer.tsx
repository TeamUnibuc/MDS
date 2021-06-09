import React from 'react';
import { useStyles } from './FooterStyles';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { Box } from '@material-ui/core';

export default function Footer() : JSX.Element {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <CopyrightIcon />
            <Box width="15px" />
            Made by Dragancea Constantin, Pușcașu Felix, Moroianu Theodor, Chichirim Stelian
        </Box>
    );
}