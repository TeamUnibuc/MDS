import express from 'express'
import { env } from '../config'

export const authRoutes = express.Router()

const frontendPath = `${env.FRONTEND_BASE_URL}:${env.FRONTEND_PORT}`

// Some default /auth route to display current user
authRoutes.get('/', (req, res) => {
    let user = null;
    if (req.isAuthenticated()) {
        user = req.user;
    }
    res.json({
        authenticated: user ? true : false,
        user: user,
    })
})

// Logs the user out
authRoutes.get('/logout', (req, res) => {
    req.logout()
    res.redirect(`${frontendPath}/Dashboard?info_msg=Logged Out`)
})

// SMART strategies
authRoutes.get('/smart-fail', (req, res) => {
    const errMsg = req.flash('error')
    res.redirect(`${frontendPath}/Dashboard?error_msg=${errMsg}`)
})

authRoutes.get('/smart-success', (req, res) => {
    const user = req.user;
    console.log(user)
    if (!user) {
        return res.redirect(`${frontendPath}/Dashboard?msg=WTF--user-object-missing-in-request`)
    }
    if (!user.Username) {
        // User has username, so it is a real existing user in DB
        return res.redirect(`${frontendPath}/Dashboard?error_msg=WTF--user-doesnt-have-username???`)
    }
    const msg = req.flash('success')
    res.redirect(`${frontendPath}/Dashboard?success_msg=${msg}`)
})
