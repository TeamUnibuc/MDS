import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent:'center',
        alignItems: 'center'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent:'center',
        alignItems: 'center'
    }
}));

export { useStyles };
