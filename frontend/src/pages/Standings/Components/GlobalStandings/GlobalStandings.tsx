import React from 'react';
import { useStyles, StyledTableCell, StyledTableRow } from './GlobalStandingsStyles';
import { TableContainer, Table, TableHead, TableRow, Paper, TableBody } from '@material-ui/core';

const rows = [
    {
        UserName : "Costel",
        GameName : "NIM",
        BotName : "Dumb",
        SubmissionDate : new Date('2021-06-01T16:23:22.054+00:00'),
        Points : 10
    },
    {
        UserName : "Felix",
        GameName : "NIM",
        BotName : "mediu",
        SubmissionDate : new Date('2021-06-01T16:23:22.054+00:00'),
        Points : 50
    },
    {
        UserName : "Costel",
        GameName : "NIM",
        BotName : "Destept",
        SubmissionDate : new Date('2021-06-01T16:23:22.054+00:00'),
        Points : 100
    },
    {
        UserName : "Teo",
        GameName : "Catan",
        BotName : "O mizerie",
        SubmissionDate : new Date('2021-06-01T16:23:22.054+00:00'),
        Points : 10
    },
    {
        UserName : "Teo",
        GameName : "Catan",
        BotName : "CNN",
        SubmissionDate : new Date('2021-06-01T16:23:22.054+00:00'),
        Points : 99
    },
]

export default function GlobalStandings() : JSX.Element {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell align="right">Game Name</StyledTableCell>
                        <StyledTableCell align="right">Bot Name</StyledTableCell>
                        <StyledTableCell align="right">Points</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <EntryRow key={idx} {...row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function EntryRow(item : any) : JSX.Element {
    const { UserName, GameName, BotName, SubmissionDate, Points } = item

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                {UserName}
            </StyledTableCell>
            <StyledTableCell align="right">{GameName}</StyledTableCell>
            <StyledTableCell align="right">{BotName}</StyledTableCell>
            <StyledTableCell align="right">{Points}</StyledTableCell>
            <StyledTableCell align="right">{SubmissionDate.toISOString()}</StyledTableCell>
        </StyledTableRow>
    );
}