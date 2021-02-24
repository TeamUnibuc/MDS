import { env } from './config';
import express from 'express'

export function sampleFunction (x: string): string {
  return x + x;
}

console.log(`port env variable:  ${env.PORT}`);

console.log(sampleFunction('something'));

const app = express()

app.get("/api", (req, res) => {
  console.log(req.url)
  res.json({"OK": "Yep"})
})

app.listen(env.PORT, () => {
  console.log("Started to listen!")
})
