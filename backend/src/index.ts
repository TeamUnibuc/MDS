import { env } from './config';
import express from 'express'
import { startMongoConnection } from './DBConnection'

// initialize connection to database

startMongoConnection()


//  Start express erver to listen for http api requests

const app = express()

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
