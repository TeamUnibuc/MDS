import express from 'express'
import passport from 'passport';
import { GoogleScopes } from './GoogleStrategy';

export const googleRoutes = express.Router()

googleRoutes.get('/google',
    passport.authenticate('google-login', {scope: GoogleScopes})
);


googleRoutes.get('/register/google',
    passport.authenticate('google-register', {scope: GoogleScopes})
)

googleRoutes.get('/google-callback',
    passport.authenticate('google-login', {failureRedirect: '/auth/login-fail',
                                     successRedirect: '/auth/login-success',
                                     failureFlash: true}),
)

googleRoutes.get('/register/google-callback',
    passport.authenticate('google-register', {failureRedirect: '/auth/register-fail',
                                     successRedirect: '/auth/register-success',
                                     failureFlash: true}),
)
