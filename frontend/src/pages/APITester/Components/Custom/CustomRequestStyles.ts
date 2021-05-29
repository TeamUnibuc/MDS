import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent:'center',
        alignItems: 'center',
        width: '500px'
    },
    codeMirror: {
        width: "100%",
        height: "300px"
    }
}));

export { useStyles };
