import React from 'react';
import { Container } from '@material-ui/core';
import { GlobalStandings } from './Components/';

export default function Standings() : JSX.Element {
    // const classes = useStyles();

    return (
        <Container>
            <GlobalStandings />
        </Container>
    );
}