import { env } from './config';
import express from 'express'
import { startMongoConnection } from './DBConnection'

// initialize connection to database

startMongoConnection()


//  Start express erver to listen for http api requests

const app = express()


// Connect to the engine.
var zerorpc = require("zerorpc");
var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");

app.get("/api/fight", (req, res) => {
  console.log("Received a fight request at " + req.url)
  const engine = req.query.engine;
  const bots = req.query.bots;
  const injects = req.query.injects;

  console.log("Content of the request")
  console.log("Engine: " + engine + "\nvars: " + bots + "\nInjects: " + injects)
  
  const obj = {
    engine: engine,
    bots: bots,
    injects: injects
  }
  const obj_string = JSON.stringify(obj)
  client.invoke("StartSimulation", obj_string, function(err: String, res: String, more: String) {
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
}

// idiot export

export const sampleFunction = (x: string): string => {
  return x + x
}
