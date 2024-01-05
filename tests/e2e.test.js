const request = require('supertest')
const app = require('../app-e2e')
const mongoose = require('mongoose')
const connect = require('../database/conn')
let profileId, userId, commentId

describe('E2E tests', () => {
    beforeAll(async () => {
        await connect()
    })

    afterAll(() => {
        // Close MongoDB connection
        mongoose.connection.close()
    })

    it('e2e: /profile/add', async () => {
        const res = await request(app).post('/profile/add').send({
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
        expect(res.statusCode).toEqual(200)
        expect(res.body.data).toHaveProperty('id')

        profileId = res.body.data.id
    })

    it('e2e: /:profileId', async () => {
        const res = await request(app).get(`/${profileId}`)
        expect(res.statusCode).toEqual(200)
    })

    it('e2e: /user/add', async () => {
        const res = await request(app).post('/user/add').send({
            name: 'Hadi',
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.data).toHaveProperty('id')

        userId = res.body.data.id
    })

    it('e2e: /comment/add', async () => {
        const res = await request(app).post('/comment/add').send({
            profileId,
            userId,
            comment: 'This is a comment.',
            mbti: 'INTP',
            enneagram: '9w8',
            zodiac: null,
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.data).toHaveProperty('id')
        commentId = res.body.data.id
    })

    it('e2e: /comment/:profileId', async () => {
        const res = await request(app).get(
            `/comment/${profileId}?sortBy=recent&filterBy=all`
        )
        expect(res.statusCode).toEqual(200)
        expect(res.body.data).toBeInstanceOf(Array)
    })

    it('e2e: /comment/toggle-like', async () => {
        const res = await request(app).post('/comment/toggle-like').send({
            commentId,
            userId,
        })
        expect(res.statusCode).toEqual(200)
    })
})
