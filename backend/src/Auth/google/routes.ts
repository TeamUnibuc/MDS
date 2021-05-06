import express from 'express'
import passport from 'passport';
import { GoogleScopes } from './GoogleStrategy';

export const googleRoutes = express.Router()

googleRoutes.get('/smart',
    passport.authenticate('google-smart', {scope: GoogleScopes})
);

googleRoutes.get('/smart-callback',
    passport.authenticate('google-smart', {
            failureRedirect: '/auth/smart-fail',
            successRedirect: '/auth/smart-success',
            failureFlash: true,
        }
    ),
)
