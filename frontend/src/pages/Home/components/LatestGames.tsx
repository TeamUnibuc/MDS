import { Box, Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import api from 'api';
import { GameModel } from 'api/Models'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      minWidth: 375,
      maxWidth: 480,
      backgroundColor: '#5467d1',
      marginRight: 20,
      marginBottom: 10,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    link: {
        cursor: "pointer",
        textDecoration: 'inherit',
        color: 'black',
        
        '&:hover': {
            color: '#CC5803',
        }
    }
  });

export default function LatestGames(): JSX.Element 
{
    const [games, setGames] = useState<GameModel[]>([])
    
    const classes = useStyles();

    useEffect(() => {
        api.Games.GetAll({
            requested_games: 5, 
            requested_offset: 0, 
            order_by: "date",
            result_order: 'decreasing'
        }).then(res => {
            setGames(res.games)
        }).catch(err => {
            console.log("viata naspa: ", err)
        })
    }, [])

    return <Box>
        <Box mb={3}>
            <Typography variant="h4">
                Latest Games
    </Typography>

        </Box>

        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap">

            {games.map((game, index) =>
                <Card key={index}
                    className={classes.root}
                    variant="outlined">
                    <CardContent >

                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            # {index + 1}
                        </Typography>


                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between">
                            <Box display="flex" flexDirection="row" alignItems="center">

                                <Link
                                    to={`/problemset/view?GameID=${game.GameID}`}
                                    className={classes.link} >
                                    <Typography variant="h5" component="h2">
                                        {game.Name}
                                    </Typography>
                                </Link>
                                {/* <Typography className={classes.pos} color="textSecondary">
            adjective
        </Typography> */}
                            </Box>

                            <Box display="flex" flexDirection="row" alignItems="center">
                                <Link
                                    to={`/users?handle=${game.AuthorUsername}`}
                                    className={classes.link} >
                                    <Typography component="p">
                                        {game.AuthorUsername}
                                    </Typography>
                                </Link>
                            </Box>

                        </Box>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {(new Date(game.Date)).toLocaleString('ro-RO')}
                        </Typography>
                        <Box>

                        </Box>
                    </CardContent>
                    {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
                </Card>
            )

            }

        </Box>
    </Box>
}