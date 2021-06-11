import React, { FC } from 'react'

import { Box, Divider, makeStyles, Typography } from '@material-ui/core'

interface Props {
    title: string,
}

export const TitleDivider: FC<Props> = ({title}: Props) =>
{
    const classes = useStyles()

    return <>
    <Box pt={1} className={classes.titleBox}>
        <Typography variant="h4">
            {title}
        </Typography>
    </Box>
    <Box py={3} className={classes.divider}>
        <Divider />
    </Box>
    </>
}

const useStyles = makeStyles({
    divider: {
        // background: '#8f8f8f',
        // color: '#8f8f8f',
        width: '100%',
    },
    titleBox: {
        display: 'flex', 
        width: '100%',
        paddingLeft: '4%',
    }
})
