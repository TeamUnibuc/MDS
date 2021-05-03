import passport from 'passport'
import express, { Application } from 'express'
import { UsersModel } from '../models/UsersModel'
import { GoogleScopes, LoginGoogleStrategy, RegisterGoogleStrategy } from './GoogleStrategy'

export const passport_configure = (app: Application): void => 
{
    app.use(passport.initialize())
    app.use(passport.session())

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

    app.use('/auth', authRoutes)
}

const authRoutes = express.Router()

authRoutes.get('/google',
    passport.authenticate('google-login', {scope: GoogleScopes})
);


authRoutes.get('/register/google',
    passport.authenticate('google-register', {scope: GoogleScopes})
)

authRoutes.get('/google-callback',
    passport.authenticate('google-login', {failureRedirect: '/auth/login-fail',
                                     successRedirect: '/auth/login-success',
                                     failureFlash: true}),
)

authRoutes.get('/register/google-callback',
    passport.authenticate('google-register', {failureRedirect: '/auth/register-fail',
                                     successRedirect: '/auth/register-success',
                                     failureFlash: true}),
)


// All login strategies have redirect to this Route
authRoutes.get('/login-success', (req, res) => {
    if (req.isUnauthenticated()) {
        console.log("Weird, i should be the successfull authenticated redirect")
        return res.redirect(`/error/SucessRedirectSaysNotAuthenticated`)
    } 
    if (req.isAuthenticated()) {
        console.log("Successful LOGIN ")
        console.log(req.user)
        return res.redirect(`/Dashboard/${req.user.Email}`)
    }
    console.log("WTF are you doing here???? XXXXXXXXXXXXXXXXXXXXXX")
})

// All Registration strategies have redirect to this Route
authRoutes.get('/register-success', (req, res) => {
    if (req.isUnauthenticated()) {
        console.log("Weird, i should be the successfull authenticated redirect")
        return res.redirect(`/error/SucessRedirectSaysNotAuthenticated`)
    } 
    if (req.isAuthenticated()) {
        console.log("Successful REGISTRATION ")
        console.log(req.user)
        return res.redirect(`/Dashboard/${req.user.Email}`)
    }
    console.log("WTF are you doing here???? XXXXXXXXXXXXXXXXXXXXXX")
})


// All login strategies have failed-login redirects here
authRoutes.get('/login-fail', (req, res) => {
    const msg = "Failed login info: " + req.flash('error')
    console.log(msg)
    res.send(msg)
})

// All register strategies have failed-register redirects here
authRoutes.get('/register-fail', (req, res) => {
    const msg = "Failed registration info: " + req.flash('error')
    console.log(msg)
    res.send(msg)
})

authRoutes.get('/', (req, res) => {
    let user = null;
    if (req.isAuthenticated()) {
        user = req.user;
    }
    res.json({
        authenticated: user ? "Yes" : "No",
        user: user
    })
})
