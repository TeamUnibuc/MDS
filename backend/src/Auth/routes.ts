import express from 'express'
import { env } from '../config'
import { UsersModel } from '../models/UsersModel'

export const authRoutes = express.Router()

const frontendPath = `${env.FRONTEND_BASE_URL}:${env.FRONTEND_PORT}`

// Some default /auth route to display current user
authRoutes.get('/', (req, res) => {
    let user = null;
    if (req.isAppUserAuthenticated()) {
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
    res.redirect(`${frontendPath}/Dashboard?msg=LoggedOutOK`)
})

// SMART strategies
authRoutes.get('/smart-create', async (req, res) => {
    // check if it's authenticated from passport point of view
    if (req.isAuthenticated()) {
        if (req.user.Username) {
            return res.json({created: false, reason: "Already a fully registered user"})
        }

        const existingUser = await UsersModel.findByEmail(req.user.Email)
        if (!existingUser) {
            const msg = `Weird, trying to update user with: ${req.user.Email}, but it doesnt exist in DB`
            console.log(msg)
            return res.json({created: false, reason: msg})
        }
        
        const newUsername = String(req.query.tryNewUsername);
        if (!newUsername) {
            return res.json({created: false, reason: "Invalid username"})
        }

        existingUser.Username = newUsername
        
        existingUser.save()
        .then(user => {
            console.log(`User with username ${newUsername} created/updated username`)
            res.json({created: true, user: user})
        }).catch(err => {
            console.log('Error trying to create user: ', err)
            res.json({created: false, reason: err})
        })
    }
    else {
        console.log('Someone tried to create user but they are not even logged in socially...')
        res.json({created: false, reason: "You are not even logged in with a social provider"})
    }
})


authRoutes.get('/smart-fail', (req, res) => {
    const errMsg = req.flash('error')
    res.redirect(`${frontendPath}/Dashboard?msg=${errMsg}`)
})

authRoutes.get('/smart-success', (req, res) => {
    const user = req.user;
    console.log(user)
    if (!user) {
        return res.redirect(`${frontendPath}/Dashboard?msg=WTF--user-object-missing-in-request`)
    }
    if (user.Username) {
        // User has username, so it is a real existing user in DB
        return res.redirect(`${frontendPath}/Dashboard`)
    }
    res.redirect(`${frontendPath}/SmartRegister?email=${user.Email}`)
})
