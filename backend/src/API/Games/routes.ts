import express from 'express'
import {getGames} from './cevafunctie'

export const gameRoutes = express.Router()

gameRoutes.post('/GetGames', getGames)

