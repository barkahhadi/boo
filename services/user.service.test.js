const UserService = require('../services/user.service')
const UserEntities = require('../entities/user.entities')
const connect = require('../database/conn')
const mongoose = require('mongoose')

describe('UserService', () => {
    beforeAll(async () => {
        await connect()
    })

    beforeEach(async () => {
        // Clear database before each test
        await UserEntities.deleteMany({})
    })

    afterAll(() => {
        // Close MongoDB connection
        mongoose.connection.close()
    })

    describe('getUser', () => {
        it('should return a user by id', async () => {
            const newUser = await UserService.createUser({
                name: 'Barkah',
            })

            const user = await UserService.getUser(newUser._id)
            expect(user).toBeDefined()
            expect(user._id.toString()).toEqual(newUser._id.toString())
        })
    })

    describe('createUser', () => {
        it('should create a new user', async () => {
            const user = {
                name: 'Barkah',
            }

            const newUser = await UserService.createUser(user)
            expect(newUser).toBeDefined()
            expect(newUser._id).toBeDefined()
            expect(newUser.name).toEqual(user.name)
        })
    })
})
