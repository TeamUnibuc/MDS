import passport from 'passport'
import { Application } from 'express'
import { UsersModel } from '../models/UsersModel'
import { SmartGoogleStrategy } from './google/GoogleStrategy'
import { authRoutes } from './routes'
import { googleRoutes } from './google/routes'
import { facebookRoutes } from './facebook/routes'
import { SmartFacebookStrategy } from './facebook/FacebookStrategy'
import { appAuthMiddleware } from './Middleware/AppAuth'
import { SmartGithubStrategy } from './github/GithubStrategy'
import { githubRoutes } from './github/routes'

export const passport_configure = (app: Application): void => 
{
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(appAuthMiddleware)

    app.use('/auth', authRoutes)
    app.use('/google', googleRoutes)
    app.use('/facebook', facebookRoutes)
    app.use('/github', githubRoutes)
}

passport.use('google-smart', SmartGoogleStrategy)

passport.use('facebook-smart', SmartFacebookStrategy)

passport.use('github-smart', SmartGithubStrategy)

passport.serializeUser((user, done) => {
    done(null, user.Email)
})

/// Eroare asta o sa fie data daca cumva ne asteptam sa existe userul ca fiind logat,
//  dar defapt nu exista in MongoDB
passport.deserializeUser(async (email: string, done) => {
    const user = await UsersModel.findByEmail(email);
    if (user === null) {
        return done(new Error('Passport error: Did not find user by Email'), null)
        /// Poate redirect
        // return res.redirect()
    } 
    return done(null, user)
})
