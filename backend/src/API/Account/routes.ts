import express from 'express'
import {Edit} from './Edit'
import {Details} from './Details'
import {Delete} from './Delete'

export const accountRoutes = express.Router()

accountRoutes.post('/Edit', Edit)
accountRoutes.post('/Details', Details)
accountRoutes.post('/Delete', Delete)
