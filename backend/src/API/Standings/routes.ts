import express from 'express'
import {GameStandings} from './GameStandings'
import {Global} from './Global'
import {UserStatsGame} from './UserStatsGame'
import {UserStatsGlobal} from './UserStatsGlobal'

export const standingsRoutes = express.Router()

standingsRoutes.post('/GameStandings', GameStandings)
standingsRoutes.post('/Global', Global)
standingsRoutes.post('/UserStatsGame', UserStatsGame)
standingsRoutes.post('/UserStatsGlobal', UserStatsGlobal)
