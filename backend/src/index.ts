import { env } from './config'
import express, { Application } from 'express'
import { startMongoConnection } from './DBConnection'
import { EngineConnection } from './EngineConnection'

// import passport from 'passport'
// import { GoogleStrategy } from './Auth/GoogleStrategy'
import { routes as routesAPI } from './API/routes'
import session from 'express-session'
import cors from 'cors'
import flash from 'connect-flash'
import morgan from 'morgan'
import { passport_configure } from './Auth/auth'

// initialize connection to database
startMongoConnection()

//  Start express erver to listen for http api requests
const app: Application = express()

// set up cors to allow us to accept requests from our client
app.use(
    cors({
        origin: `${env.BASE_URL}:${env.PORT}`, // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);

// Better logging
app.use(morgan('dev'))

// Automatically get the json content of the request body
app.use(
    express.urlencoded({
        extended: true
    })
)

// Encrypted session
app.use(session({ secret: "cats" }));
app.use(flash())

// API routes
app.use('/api', routesAPI)

// passport configs
passport_configure(app)


// Start express app
const instance = app.listen(env.PORT, () => {
    console.log(`URL: http://localhost:${env.PORT}`)
    console.log(`Running backend in ${env.NODE_ENV} environment`)
})

export const closeServer = (): void => {
    instance.close();
    EngineConnection.CloseConnection();
}

// idiot export for test
export const sampleFunction = (x: string): string => {
    return x + x
}
