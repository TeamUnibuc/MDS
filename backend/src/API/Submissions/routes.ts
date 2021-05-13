import express from 'express'
import {GetAll} from './GetAll'

export const gameRoutes = express.Router()

gameRoutes.post('/GetAll', GetAll)
