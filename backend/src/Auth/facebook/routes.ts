import express from 'express'
import passport from 'passport';
import { FacebookScopes } from './FacebookStrategy';

export const facebookRoutes = express.Router()

facebookRoutes.get('/smart',
    passport.authenticate('facebook-smart', {scope: FacebookScopes})
);

facebookRoutes.get('/smart-callback',
    passport.authenticate('facebook-smart', {
            failureRedirect: '/auth/smart-fail',
            successRedirect: '/auth/smart-success',
            failureFlash: true,
        }
    ),
)
