import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useUserStatus } from 'Contexts/UserStatus';

const useStyles = makeStyles({
  list: {
    width: 250,
    marginLeft: 20,
  },
  fullList: {
    width: 'auto',
  },
});

interface Props {
  open: boolean,
  toggleDrawer(): void
}

const Sidebar = ({open, toggleDrawer}: Props): JSX.Element => 
{
  const [toRender, setRender] = useState('nothing')
  const {state, reloadUserState} = useUserStatus()

  const classes = useStyles();

  const drawerClosed = (e: React.SyntheticEvent) => {
    toggleDrawer()
  }

  if (toRender !== 'nothing')
    return <Redirect to={toRender}></Redirect>

  const list = () => (
    // <Divider />   
    <div className={classes.list}> 
    <List >
      {[['Home', '/'], 
        ['Problemset', '/Problemset'], 
        ['Standings', '/Standings']].map(([text, link], index) => (
        
          <Box key={text}>
          <Link to={link} onClick={toggleDrawer} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> 
          
            <ListItemIcon >{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItem button >
            </ListItem>
              {text} 
          </Link>

          </Box>
          
      ))}
    </List>
    <Divider />
    {state.authenticated && 
      <List >
      {[['Profile', '/users'], 
        ['New Game', '/Problemset/New'], 
        ].map(([text, link], index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <Link to={link} onClick={toggleDrawer}> {text} </Link>
        </ListItem>
      ))}
    </List>
    }
    
    </div>
    );
  
  return (
    <Drawer 
      open={open} 
      onClose={drawerClosed}>
        {list()}
    </Drawer>
  );
}

export default Sidebar
