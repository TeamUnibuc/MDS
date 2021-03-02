// import { env } from 'config'
import mongoose from 'mongoose'
import { env } from './config';

const MONGODB_URI = `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@` + 
    `${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}`;

export const startMongoConnection = (): void => {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        () => {
            console.log(`Connected to MongoDB with user: ${env.MONGO_USERNAME}`);
        },
        err => {
            console.log(`Error connecting to MongoDB: ${err}`);
        }
    )
}
