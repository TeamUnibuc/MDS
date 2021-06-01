import express from 'express'
import {Get} from './Get'

export const userRoutes = express.Router()

userRoutes.post('/Get', Get)
