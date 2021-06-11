import React, { FC, useEffect, useState } from 'react'

import { Box, List, makeStyles, Typography } from '@material-ui/core'
import { TrFight } from 'api/Transient/SubmissionStatus'
import api from 'api'
import { useLocation } from 'react-router-dom'
import { ComputerOutlined } from '@material-ui/icons'

interface Props {
    gameName: string,
}

export const Transient: FC<Props> = ({gameName}: Props) =>
{
    const [fights, setFights] = useState<TrFight[]>([])
    const [totalFights, setTotalFights] = useState(0)
    const classes = useStyles()
    const SubmissionID = new URLSearchParams(useLocation().search).get('SubmissionID') ?? "";

    const computedList: (TrFight | null)[] = Array(totalFights).fill(null)
    fights.map((fight, index) => {
        computedList[index] = fight
    })

    const updateFights = (closeUpdater: { (): void; (): void }) =>
    {
        api.Transient.SubmissionStatus({SubmissionID: SubmissionID})
        .then(res => {
            if (res.status !== "ok")
                return console.log('Request not ok finding transient submissions status :(', res.error_message)
            setFights(res.fights)
            if (res.fights.length > 0 && res.fights.length === res.totalFights)
                closeUpdater()

            console.log('received list of fights: ', res.fights)
        }).catch(err => {
            console.log('Error requesting transient: ', err)
        })
    }

    useEffect(() => {
        api.Submissions.GetOne({SubmissionID: SubmissionID})
        .then(res => {
            if (res.status !== "ok")
                return console.log('Bad retrieving submission initial status', res.error_message)
            console.log('Submission detail for Get One: ', res)
            setTotalFights(res.OfficialBots)
        })

        const delay = 0.5
        const updater = setInterval(() => updateFights(closeUpdater), delay * 1000);

        const closeUpdater = () => clearInterval(updater) 

        // clear on component unmount
        return () => closeUpdater();
    }, [])

    console.log('Know total bots: ', totalFights)
    console.log('Computed List: ', computedList)

    return <>
        <Typography variant="h5">
            Submission status of your code for game: {gameName}
        </Typography>
        <List>
        {computedList.map((fight, index) => {
            return <Box key={index} className={classes.fightBox}>
                {fight && 
                <Box className={fight.Status == "won" ? classes.win : classes.lose}>
                    <p>Against: {fight.AgainstID}</p>
                    <p>Status: {fight.Status}</p>
                </Box>
                }
            </Box>
        })}
        </List>
    </>
}

const useStyles = makeStyles({
    fightBox: {
        backgroundColor: 'grey',
        minWidth: 30,
        minHeight: 30,
    },
    win: {
        backgroundColor: 'green'
    },
    lose: {
        backgroundColor: 'red'
    }
})
