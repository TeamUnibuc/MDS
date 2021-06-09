import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from 'api';
import { GetAllResults } from 'api/Submissions/GetAll';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';

import { useStyles, StyledTableCell, StyledTableRow } from './SubmissionsStyles';
import { TableContainer, Table, TableHead, TableRow, Paper, TableBody, Box, Link,
        TableFooter, TablePagination, CircularProgress, TableCell, MenuItem, TextField } from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';

const rowsPerPageOptions : number[] = [5, 10, 25];
const order_bys = ['score', 'date'];
const result_orders = ['increasing', 'decreasing'];

export default function Submissions() : JSX.Element {
    const [Submissions, setSubmissions] = useState<undefined | GetAllResults>();
    const [orderBy, setOrderBy] = useState('score');
    const [resultOrder, setResultOrder] = useState('decreasing');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [Error, setError] = useState(false)

    const classes = useStyles();

    const GameID = new URLSearchParams(useLocation().search).get('GameID');
    const UserID = new URLSearchParams(useLocation().search).get('UserID');

    useEffect(() => {
        const reqBody = {
            requested_submissions : rowsPerPage,
            requested_offset : page * rowsPerPage,
            order_by: orderBy,
            result_order: resultOrder,
            GameID: (GameID ? GameID : undefined),
            UserID : (UserID ? UserID : undefined)
        }
        api.Submissions.GetAll(reqBody)
            .then(res => setSubmissions(res))
            .catch(err => {
                console.log(err);
                setError(true);
            })
    }, [page, rowsPerPage, orderBy, resultOrder]);

    if (Error){
        return <div>Incorrect or Inexistent User ID or Game ID</div>
    }

    if (!Submissions){
        return <CircularProgress />
    }

    if (Submissions.status === 'fail'){
        return <div>{Submissions.error_message}</div>
    }
    
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell align="right">Problem</StyledTableCell>
                        <StyledTableCell align="right">Date Submitted</StyledTableCell>
                        <StyledTableCell align="right">Score</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Submissions.submissions.map((row, idx) => (
                        <EntryRow key={idx} {...row} />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell align="right" className={classes.cellRow} colSpan={2}>
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
                            count={Submissions.submissions_found}
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
    const { AuthorUsername, GameName, Score, SubmissionID } = item;
    const DateSubmitted = item.Date;
    const classes = useStyles();

    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                <Link href={`/Submission?id=${SubmissionID}`}>
                    <Box className={classes.clickable} style={{textDecoration: 'none'}}>
                        {AuthorUsername}
                    </Box>
                </Link>
            </StyledTableCell>
            <StyledTableCell align="right">{GameName}</StyledTableCell>
            <StyledTableCell align="right">{(new Date(DateSubmitted)).toLocaleString('ro-RO')}</StyledTableCell>
            <StyledTableCell align="right">{Score}</StyledTableCell>
        </StyledTableRow>
    );
}