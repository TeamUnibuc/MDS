import express from 'express'
import { EngineConnection } from '../EngineConnection'
import { gameRoutes } from './Games/routes'
import { NewGame } from './NewGame'

export const routes = express.Router()

routes.use(express.json())

routes.use('/games', gameRoutes)

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
