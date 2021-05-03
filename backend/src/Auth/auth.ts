import passport from 'passport'
import { Application } from 'express'
import { UsersModel } from '../models/UsersModel'
import { LoginGoogleStrategy, RegisterGoogleStrategy } from './google/GoogleStrategy'
import { authRoutes } from './routes'
import { googleRoutes } from './google/routes'

export const passport_configure = (app: Application): void => 
{
    app.use(passport.initialize())
    app.use(passport.session())

    app.use('/auth', authRoutes)
    app.use('/google', googleRoutes)
}

passport.serializeUser((user, done) => {
    done(null, user.Email)
})

passport.deserializeUser(async (email: string, done) => {
    const user = await UsersModel.findByEmail(email);
    if (user === null) 
        return done({errMessage: 'Did not find user by Email'}, null)
    return done(null, user)
})

passport.use('google-login', LoginGoogleStrategy)
passport.use('google-register', RegisterGoogleStrategy)
