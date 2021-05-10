import express from 'express'
import {getGames} from './cevafunctie'
import {GetAll} from './GetAll'
import {GetGame} from './GetGame'
import {Alter} from './Alter'
import {Sources} from './Sources'
import {Delete} from './Delete'


export const gameRoutes = express.Router()

gameRoutes.post('/GetAll', GetAll)
gameRoutes.post('/GetGame', GetGame)
gameRoutes.post('/Alter', Alter)
gameRoutes.post('/Sources', Sources)
gameRoutes.post('/Delete', Delete)

gameRoutes.post('/GetGames', getGames)


