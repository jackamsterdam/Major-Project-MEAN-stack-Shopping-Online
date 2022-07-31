import mongoose from 'mongoose'
import config from '../01-utils/config'

async function connect(): Promise<void> {
    try {
        const db = await mongoose.connect(config.connectionString)
        console.log("We're connected to MongoDB " + db.connections[0].name);

    } catch (err: any) {
        console.log(err) // if there is no connection then nothing will work anyways.
    }
}

export default {
    connect
}