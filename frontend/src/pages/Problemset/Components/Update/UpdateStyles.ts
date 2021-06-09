import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    codeMirrorContainer: {
        width:'100%',
        backgroundColor: 'white',
        border: '1px solid gray'
    },
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'flex-start',
        width: '100%'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        minWidth: '30%'
    }
});

export { useStyles }