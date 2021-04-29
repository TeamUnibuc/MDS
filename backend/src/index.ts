import { env } from './config'
import express from 'express'
import { startMongoConnection } from './DBConnection'
import { EngineConnection } from './EngineConnection'

// initialize connection to database
startMongoConnection()


//  Start express erver to listen for http api requests
const app = express()

// Automatically get the json content of the request body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


app.post("/api/fight", (req, res) => {
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

app.get("/api", (req, res) => {
    console.log(req.url)
    res.json({ "OK": "Yep" })
})

const instance = app.listen(env.PORT, () => {
    console.log(`URL: http://localhost:${env.PORT}`)
    console.log(`Running backend in ${env.NODE_ENV} environment`)
})

export const closeServer = (): void => {
    instance.close();
    EngineConnection.CloseConnection();
}

// idiot export

export const sampleFunction = (x: string): string => {
    return x + x
}
