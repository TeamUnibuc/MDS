import React from 'react'

import { Box, makeStyles, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const useStyles = makeStyles({
  root: {
    minWidth: 380,
    maxWidth: 450,
    backgroundColor: '#7dbeff',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  iconProfile: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  iconScore: {
    paddingTop: 4,
    paddingBottom: 4,
  }
});

interface Props {
    username: string,
    points: number,
}

export default function TotalPoints({username, points}: Props): JSX.Element
{
    const classes = useStyles();
    
    return <Card 
        className={classes.root} 
        variant="outlined">
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Short sumamry
      </Typography>
        <Box 
          display="flex" 
          flexDirection="row" 
          justifyContent="space-between">
            <Box display="flex" flexDirection="row" alignItems="center">
                <PersonOutlineIcon />

                <Typography variant="h5" component="h2">
                    {username}
                </Typography>
                {/* <Typography className={classes.pos} color="textSecondary">
        adjective
      </Typography> */}
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" component="p">
                    {points}
                </Typography>
                <WhatshotIcon />
            </Box>

        </Box>
    </CardContent>
    {/* <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions> */}
  </Card>



    
}