import { EnvType, load } from 'ts-dotenv'

// Because typescript is stronglytyped-ish, we have to specify the schema
export const schema = {
  NODE_ENV: String,
  PORT: String
}

export type Env = EnvType<typeof schema>

export const env: Env = load(schema)
