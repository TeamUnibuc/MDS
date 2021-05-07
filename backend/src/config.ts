import { EnvType, load } from 'ts-dotenv'

// Because typescript is stronglytyped-ish, we have to specify the schema
export const schema = {
    NODE_ENV: String,
    PORT: String,
    
    ENGINE_PORT: {
        type: String,
        default: '4242',
    },

    FRONTEND_PORT: String,

    MONGO_USERNAME: String,
    MONGO_PASSWORD: String,
    MONGO_HOST: String,
    MONGO_PORT: Number,
    MONGO_DB: String,

    GOOGLE_CLIENT_ID: String,
    GOOGLE_CLIENT_SECRET: String,

    FACEBOOK_CLIENT_ID: String,
    FACEBOOK_CLIENT_SECRET: String,
    
    GITHUB_CLIENT_ID: String,
    GITHUB_CLIENT_SECRET: String,

    BACKEND_BASE_URL: {
        type: String,
        default: 'https://universityproject.ml',
    },

    FRONTEND_BASE_URL: {
        type: String,
        default: 'https://universityproject.ml',
    },
}

export type Env = EnvType<typeof schema>

export const env: Env = load(schema)
