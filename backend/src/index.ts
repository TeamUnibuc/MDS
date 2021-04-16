import { env } from './config';
import express from 'express'
import { startMongoConnection } from './DBConnection'

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

// Connect to the engine.
const zerorpc = require("zerorpc");
const client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");

app.post("/api/fight", (req, res) => {
  console.log("Received a fight request at " + req.url)
  const engine = req.body.engine;
  const bots = req.body.bots;

  console.log("Content of the request")
  console.log("Engine: " + engine + "\nvars: " + bots)
  
  const obj = {
    engine: engine,
    bots: bots
  }
  const obj_string = JSON.stringify(obj)
  client.invoke("StartSimulation", obj_string, function(err: string, res: string) {
    console.log(res)
  });
  res.json({"OK": "Yep"})
})

app.get("/api", (req, res) => {
  console.log(req.url)
  res.json({"OK": "Yep"})
})

const instance = app.listen(env.PORT, () => {
  console.log(`URL: http://localhost:${env.PORT}`)
  console.log(`Running backend in ${env.NODE_ENV} environment`)
})

export const closeServer = (): void => {
  instance.close()
  client.close()
}

// idiot export

export const sampleFunction = (x: string): string => {
  return x + x
}
