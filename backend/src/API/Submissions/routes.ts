import express from 'express'
import {GetAll} from './GetAll'
import {Details} from './Details'
import {New} from './New'

export const submissionRoutes = express.Router()

submissionRoutes.post('/GetAll', GetAll)
submissionRoutes.post('/Details', Details)
submissionRoutes.post('/New', New)
