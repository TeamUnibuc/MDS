import React, { useEffect, useState } from 'react';
import { useStyles, StyledTableCell, StyledTableRow } from './GlobalStandingsStyles';
import { TableContainer, Table, TableHead, TableRow, Paper, TableBody, Box, 
        TableFooter, TablePagination, CircularProgress, TableCell, MenuItem, TextField } from '@material-ui/core';
import api from 'api';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { GlobalStandingsResults } from 'api/Standings/GlobalStandings';

const rowsPerPageOptions : number[] = [5, 10, 25];
const order_bys = ['score', 'submissions', 'defeated'];
const result_orders = ['increasing', 'decreasing'];

export default function GlobalStandings() : JSX.Element {
    const classes = useStyles();

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [standings, setStandings] = useState<undefined | GlobalStandingsResults>();
    const [orderBy, setOrderBy] = useState('score');
    const [resultOrder, setResultOrder] = useState('decreasing');

    useEffect(() => {
        const reqBody = {
            requested_entries : rowsPerPage,
            requested_offset : page * rowsPerPage,
            order_by: orderBy,
            result_order: resultOrder,
        }
        api.Standings.GlobalStandings(reqBody)
            .then(res => setStandings(res))
            .catch(err => console.log(err))
    }, [page, rowsPerPage, orderBy, resultOrder]);

    console.log(standings);

    if (!standings){
        return <CircularProgress />
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell align="right">Total Points</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {standings.entries.map((row, idx) => (
                        <EntryRow key={idx} {...row} />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell align="right" className={classes.cellRow}>
                            <TextField 
                                select
                                value={resultOrder}
                                onChange={(event) => setResultOrder(event.target.value)}
                                helperText="Result order"
                            >
                                {result_orders.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                                ))}
                            </TextField>
                            <Box width="100px" />
                            <TextField 
                                select
                                value={orderBy}
                                onChange={(event) => setOrderBy(event.target.value)}
                                helperText="Criteria to sort by"
                            >
                                {order_bys.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                                ))}
                            </TextField>
                        </TableCell>
                        <TablePagination
                            rowsPerPageOptions={rowsPerPageOptions}
                            count={standings.entries_found}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={(event, newPage) => setPage(newPage)}
                            onChangeRowsPerPage={(event) => setRowsPerPage(parseInt(event.target.value))}
                            ActionsComponent={TablePaginationActions}
                        />                        
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

function EntryRow(item : any) : JSX.Element {
    const { AuthorUsername, TotalPoints } = item

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                {AuthorUsername}
            </StyledTableCell>
            <StyledTableCell align="right">{TotalPoints}</StyledTableCell>
        </StyledTableRow>
    );
}