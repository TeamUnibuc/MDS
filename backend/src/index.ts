import { env } from './config';
import express from 'express'

const app = express()

export const sampleFunction = (x: string): string => {
  return x + x
}

app.get("/api", (req, res) => {
  console.log(req.url)
  res.json({"OK": "Yep"})
})

const instance = app.listen(env.PORT, () => {
  console.log(`URL: http://localhost:${env.PORT}`)
})

export const closeServer = (): void => {
  instance.close()
}
