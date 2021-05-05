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

facebookRoutes.get('/login',
    passport.authenticate('facebook-login', {scope: FacebookScopes})
);


facebookRoutes.get('/register',
    passport.authenticate('facebook-register', {scope: FacebookScopes})
)

facebookRoutes.get('/login-callback',
    passport.authenticate('facebook-login', {failureRedirect: '/auth/login-fail',
                                     successRedirect: '/auth/login-success',
                                     failureFlash: true}),
)

facebookRoutes.get('/register-callback',
    passport.authenticate('facebook-register', {failureRedirect: '/auth/register-fail',
                                     successRedirect: '/auth/register-success',
                                     failureFlash: true}),
)
