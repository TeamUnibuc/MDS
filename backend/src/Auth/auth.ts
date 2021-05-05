import passport from 'passport'
import { Application } from 'express'
import { UsersModel } from '../models/UsersModel'
import { LoginGoogleStrategy, RegisterGoogleStrategy, SmartGoogleStrategy } from './google/GoogleStrategy'
import { authRoutes } from './routes'
import { googleRoutes } from './google/routes'
import { facebookRoutes } from './facebook/routes'
import { LoginFacebookStrategy, RegisterFacebookStrategy } from './facebook/FacebookStrategy'

export const passport_configure = (app: Application): void => 
{
    app.use(passport.initialize())
    app.use(passport.session())

    app.use('/auth', authRoutes)
    app.use('/google', googleRoutes)
    app.use('/facebook', facebookRoutes)
}

passport.use('google-smart', SmartGoogleStrategy)
passport.use('google-login', LoginGoogleStrategy)
passport.use('google-register', RegisterGoogleStrategy)

passport.use('facebook-login', LoginFacebookStrategy)
passport.use('facebook-register', RegisterFacebookStrategy)

passport.serializeUser((user, done) => {
    done(null, user.Email)
})

/// Eroare asta o sa fie data daca cumva ne asteptam sa existe userul ca fiind logat,
//  dar defapt nu exista in MongoDB
passport.deserializeUser(async (email: string, done) => {
    const user = await UsersModel.findByEmail(email);
    if (user === null) 
        return done(new Error('Did not find user by Email'), null)
    return done(null, user)
})
