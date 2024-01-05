const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

module.exports = async function connect() {
    const mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()

    await mongoose.connect(mongoUri, {
        dbName: 'boo',
    })
    console.log('MongoDB connected to %s', mongoUri)
}
