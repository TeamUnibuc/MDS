import { EnvType, load } from 'ts-dotenv'

// Because typescript is stronglytyped-ish, we have to specify the schema
export const schema = {
    NODE_ENV: String,
    PORT: String,
    
    ENGINE_PORT: {
        type: String,
        default: '4242'
    },

    MONGO_USERNAME: String,
    MONGO_PASSWORD: String,
    MONGO_HOST: String,
    MONGO_PORT: Number,
    MONGO_DB: String,

    GOOGLE_CLIENT_ID: String,
    GOOGLE_CLIENT_SECRET: String,

    BASE_URL: {
        type: String,
        default: 'http://localhost'
    }
}

export type Env = EnvType<typeof schema>

export const env: Env = load(schema)
