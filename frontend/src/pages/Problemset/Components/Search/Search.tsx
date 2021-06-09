import React, { useEffect, useState } from 'react';
import { useStyles, StyledTableCell, StyledTableRow } from './SearchStyles';
import { TableContainer, Table, TableHead, TableRow, Paper, TableBody, Box, 
        TableFooter, TablePagination, CircularProgress, TableCell, MenuItem, TextField, Container, Link } from '@material-ui/core';
import api from 'api';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { GetAllResults } from 'api/Games/GetAll';

const rowsPerPageOptions : number[] = [10, 25, 50];
const order_bys = ['date', 'solved', 'submissions'];
const result_orders = ['increasing', 'decreasing'];

export default function Search() : JSX.Element {
    const classes = useStyles();

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [standings, setStandings] = useState<undefined | GetAllResults>();
    const [orderBy, setOrderBy] = useState('solved');
    const [resultOrder, setResultOrder] = useState('decreasing');

    useEffect(() => {
        const reqBody = {
            requested_games : rowsPerPage,
            requested_offset : page * rowsPerPage,
            order_by: orderBy,
            result_order: resultOrder,
        }
        api.Games.GetAll(reqBody)
            .then(res => setStandings(res))
            .catch(err => console.log(err))
    }, [page, rowsPerPage, orderBy, resultOrder]);

    console.log(standings);

    if (!standings){
        return <CircularProgress />
    }

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Game Name</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                            <StyledTableCell align="right">Author</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {standings.games.map((row) => (
                            <TableRow key={row.GameID}>
                                <TableCell onClick={ () => window.location.href='/problemset/view?GameID='+row.GameID }
                                            style={{cursor: 'pointer'}}>
                                    {row.Name}
                                </TableCell>
                                <TableCell align='right'>{new Date(row.Date).toLocaleDateString()}</TableCell>
                                <TableCell align='right'>
                                    <span onClick={ () => window.location.href='/users?handle='+row.AuthorUsername }
                                            style={{cursor: 'pointer'}}>
                                        {row.AuthorUsername}
                                    </span>
                                </TableCell>
                            </TableRow>
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
                                count={standings.games_found}
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
        </Container>
    );
}
