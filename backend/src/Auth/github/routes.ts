import express from 'express'
import passport from 'passport';
import { GithubScopes } from './GithubStrategy';

export const githubRoutes = express.Router()

githubRoutes.get('/smart',
    passport.authenticate('github-smart', {scope: GithubScopes})
);

githubRoutes.get('/smart-callback',
    passport.authenticate('github-smart', {
            failureRedirect: '/auth/smart-fail',
            successRedirect: '/auth/smart-success',
            failureFlash: true,
        }
    ),
)
