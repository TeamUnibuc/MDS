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

googleRoutes.get('/login',
    passport.authenticate('google-login', {scope: GoogleScopes})
);

googleRoutes.get('/login-callback',
    passport.authenticate('google-login', {failureRedirect: '/auth/login-fail',
                                     successRedirect: '/auth/login-success',
                                     failureFlash: true}),
)

googleRoutes.get('/register',
    passport.authenticate('google-register', {scope: GoogleScopes})
)


googleRoutes.get('/register-callback',
    passport.authenticate('google-register', {failureRedirect: '/auth/register-fail',
                                     successRedirect: '/auth/register-success',
                                     failureFlash: true}),
)
