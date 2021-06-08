import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import AddBoxIcon from '@material-ui/icons/AddBox';
import StorageIcon from '@material-ui/icons/Storage';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { useUserStatus } from 'Contexts/UserStatus';
import { Link } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';



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
  const {state: {user, authenticated}} = useUserStatus()

  const classes = useStyles();

  const drawerClosed = () => {
    toggleDrawer()
  }

  const list = () => (
    // <Divider />   
    <div className={classes.list}> 
    <List >

        <Link href="/">
        <ListItem button>
          <ListItemIcon> <HomeIcon /> </ListItemIcon>
            Home
        </ListItem>
          </Link>

          <Link href="/Problemset">
        <ListItem button>
          <ListItemIcon> <LibraryBooksIcon /> </ListItemIcon>
          Problemset
        </ListItem>
          </Link>

          <Link href="/Standings">
        <ListItem button>
          <ListItemIcon> <FormatListNumberedIcon /> </ListItemIcon>
          Standings
        </ListItem>
          </Link>

        
          <Link href="/Submissions">
        <ListItem button>
          <ListItemIcon> <StorageIcon /> </ListItemIcon>
          Submissions
        </ListItem>
          </Link>

    </List>
    <Divider />
    {authenticated && user &&
      <List >


        <Link href="/Users">
        <ListItem button>
          <ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
          Profile
        </ListItem>
          </Link>


          <Link href={`/Submissions?User_ID=${user.UserID}`}>   
        <ListItem button>
          <ListItemIcon> <StorageIcon /> </ListItemIcon>
          My Submissions
        </ListItem>
          </Link>

        <Link href="/Problemset/New">
        <ListItem button>
          <ListItemIcon> <AddBoxIcon /> </ListItemIcon>
          New Game
        </ListItem>
          </Link>

    </List>
    }
    
    </div>
  )
  
  return (
    <Drawer 
      open={open} 
      onClose={drawerClosed}>
        {list()}
    </Drawer>
  );
}

export default Sidebar
