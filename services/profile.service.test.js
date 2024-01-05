const ProfileService = require('../services/profile.service')
const ProfileEntities = require('../entities/profile.entities')
const mongoose = require('mongoose')
const connect = require('../database/conn')

describe('ProfileService', () => {
    beforeAll(async () => {
        await connect()
    })

    beforeEach(async () => {
        // Clear database before each test
        await ProfileEntities.deleteMany({})
    })

    afterAll(() => {
        // Close MongoDB connection
        mongoose.connection.close()
    })

    describe('getProfile', () => {
        it('should return a profile by id', async () => {
            const newProfile = await ProfileService.createProfile({
                name: 'Barkah',
                description: 'Adolph Larrue Martinez III.',
                mbti: 'INTP',
                enneagram: '9w8',
                variant: 'sp/so',
                tritype: 725,
                socionics: 'SEE',
                sloan: 'RCOEN',
                psyche: 'FEVL',
                temperaments: 'Phlegmatic',
                image: 'https://barkah.dev/images/avatars.svg',
            })

            const profile = await ProfileService.getProfile(newProfile._id)
            expect(profile).toBeDefined()
            expect(profile._id.toString()).toEqual(newProfile._id.toString())
        })
    })

    describe('createProfile', () => {
        it('should create a new profile', async () => {
            const profile = {
                name: 'Barkah',
                description: 'Adolph Larrue Martinez III.',
                mbti: 'INTP',
                enneagram: '9w8',
                variant: 'sp/so',
                tritype: 725,
                socionics: 'SEE',
                sloan: 'RCOEN',
                psyche: 'FEVL',
                temperaments: 'Phlegmatic',
                image: 'https://barkah.dev/images/avatars.svg',
            }

            const newProfile = await ProfileService.createProfile(profile)
            expect(newProfile).toBeDefined()
            expect(newProfile._id).toBeDefined()
            expect(newProfile.name).toEqual(profile.name)
        })
    })
})
