import express from 'express'

export const authRoutes = express.Router()

// Some default /auth route to display current user
authRoutes.get('/', (req, res) => {
    let user = null;
    if (req.isAuthenticated()) {
        user = req.user;
    }
    res.json({
        authenticated: user ? true : false,
        user: user
    })
})

// Logs the user out
authRoutes.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})

// All login strategies have redirect to this Route
authRoutes.get('/login-success', (req, res) => {
    if (req.isUnauthenticated()) {
        console.log("Weird, i should be the successfull authenticated redirect")
        return res.redirect(`/error/SucessRedirectSaysNotAuthenticated`)
    } 
    if (req.isAuthenticated()) {
        console.log("Successful LOGIN ")
        console.log(req.user)
        return res.redirect(`/auth`)
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
        return res.redirect(`/auth`)
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
