import { closeServer } from '../src'
import { mongoConnect, mongoDisconnect } from '../src/DBConnection'

beforeAll(async () => {
    await mongoConnect()
})

afterAll(async () => {
    closeServer();
    await mongoDisconnect()
})
