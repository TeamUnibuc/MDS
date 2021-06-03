import express from 'express'
import {Get} from './Get'
import {GetByUsername} from './GetByUsername'

export const userRoutes = express.Router()

userRoutes.post('/Get', Get)
userRoutes.post('/GetByUsername', GetByUsername)
