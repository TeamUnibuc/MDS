import React from 'react';
import { Container } from '@material-ui/core';
import { GlobalStandings } from './Components/';
import { TitleDivider } from 'components/TitleDivider';

export default function Standings() : JSX.Element {
    // const classes = useStyles();

    return (
        <Container>
            <TitleDivider title='Global Standings'/>
            <GlobalStandings />
        </Container>
    );
}