import React, { FC } from 'react'

import clsx from 'clsx'
import { Box, Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'
import { TrFight } from 'api/Transient/SubmissionStatus'

interface Props {
    status?: TrFight['Status'],
    index: number,
}

export const FightCard: FC<Props> = ({ status, index }: Props) => {
    const classes = useStyles()

    return <Card
        className={clsx(classes.root, status === "won" ? classes.won : (status === "lost" ? classes.lost : classes.loading))}
        variant="outlined">
        <CardContent >

            <Typography className={classes.title} color="textSecondary" gutterBottom>
                # {index + 1}
            </Typography>


            <Box display='flex' justifyContent='center'>
        
                {!status ? <CircularProgress /> :
                    <Typography variant="h5">
                        <strong>{status}</strong>
                    </Typography>
                }
                
                
            </Box>

        </CardContent>
        {/* <CardActions>
  <Button size="small">Learn More</Button>
</CardActions> */}
    </Card>
}

const useStyles = makeStyles({
    root: {
        minWidth: 200,
        height: 115,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 14,
    },
    loading: {
        backgroundColor: '#b8b8b8',
    },
    won: {
        backgroundColor: '#79f295',
    },
    lost: {
        backgroundColor: '#ff8880',
    }
})
