import express from 'express'
import { EngineConnection } from '../EngineConnection'
import { accountRoutes } from './Account/routes'
import { gameRoutes } from './Games/routes'
import { NewGame } from './NewGame'
import { standingsRoutes } from './Standings/routes'
import { submissionRoutes } from './Submissions/routes'
import { transientRoutes } from './Transient/routes'
import { userRoutes } from './Users/routes'

export const routes = express.Router()

routes.use(express.json())

// Backend API routes

routes.use('/Games', gameRoutes)
routes.use('/Submissions', submissionRoutes)
routes.use('/Standings', standingsRoutes)
routes.use('/Account', accountRoutes)
routes.use('/Users', userRoutes)
routes.use('/Transient', transientRoutes)

// routes for testing

routes.post("/fight", (req, res) => {
    console.log("Received a fight request at " + req.url)
    const engine = req.body.engine;
    const bots = req.body.bots;

    console.log("Content of the request")
    console.log("Engine: " + engine + "\nvars: " + bots)

    EngineConnection.Fight(engine, bots)
        .then(result => res.json(result))
        .catch(err => {
            console.log(err);
            res.sendStatus(403);
        })
})

routes.post("/new_game", (req, res) => {
    NewGame(req, res);
})

routes.get("/", (req, res) => {
    console.log(req.url)
    res.json({ "OK": "Yep" })
})
