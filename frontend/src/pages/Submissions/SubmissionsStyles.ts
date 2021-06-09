import { makeStyles, withStyles } from '@material-ui/core/styles'
import { TableRow, TableCell } from '@material-ui/core'

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    cellRow: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignContent: 'center',
        alignItems: 'center'
    },
    clickable: {
        textDecoration: "none",
        cursor: "pointer"
    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export { useStyles, StyledTableCell, StyledTableRow }