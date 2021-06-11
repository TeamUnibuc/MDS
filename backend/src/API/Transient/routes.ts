import express from 'express'

import { SubmissionStatus } from './SubmissionStatus'

export const transientRoutes = express.Router()

transientRoutes.post('/SubmissionStatus', SubmissionStatus)
