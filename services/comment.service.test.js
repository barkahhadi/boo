const CommentService = require('../services/comment.service')
const CommentEntities = require('../entities/comment.entities')
const UserEntities = require('../entities/user.entities')
const connect = require('../database/conn')
const mongoose = require('mongoose')

describe('CommentService', () => {
    beforeAll(async () => {
        await connect()
    })

    beforeEach(async () => {
        // Clear database before each test
        await CommentEntities.deleteMany({})
        await UserEntities.deleteMany({})
    })

    afterAll(() => {
        // Close MongoDB connection
        mongoose.connection.close()
    })

    describe('getComments', () => {
        it('should return comments sorted by likes', async () => {
            await CommentService.createComment({
                profileId: '65973810b97743c39838770d',
                userId: '65973817b97743c398387710',
                comment: 'This is a comment',
                mbti: 'INFP',
                enneagram: '9w1',
                zodiac: 'Aries',
            })

            const newCommentToLike = await CommentService.createComment({
                profileId: '65973810b97743c39838770d',
                userId: '65973817b97743c398387710',
                comment: 'This is a comment',
                mbti: 'INFP',
                enneagram: '9w1',
                zodiac: 'Aries',
            })

            await CommentService.likeUnlikeComment(
                newCommentToLike._id,
                '65973817b97743c398387710'
            )

            const comments = await CommentService.getComments(
                '65973810b97743c39838770d',
                'best',
                'all'
            )

            expect(Array.isArray(comments)).toBe(true)
            expect(comments).toHaveLength(2)
            expect(comments[0].likes).toHaveLength(1)
        })

        it('should return comments sorted by createdAt', async () => {
            await CommentService.createComment({
                profileId: '65973810b97743c39838770d',
                userId: '65973817b97743c398387710',
                comment: 'This is a comment',
                mbti: 'INFP',
                enneagram: '9w1',
                zodiac: 'Aries',
            })

            const latestComment = await CommentService.createComment({
                profileId: '65973810b97743c39838770d',
                userId: '65973817b97743c398387710',
                comment: 'This is a comment',
                mbti: 'INFP',
                enneagram: '9w1',
                zodiac: 'Aries',
            })

            const comments = await CommentService.getComments(
                '65973810b97743c39838770d',
                'recent',
                'all'
            )
            expect(Array.isArray(comments)).toBe(true)
            expect(comments).toHaveLength(2)
            expect(comments[0]._id).toEqual(latestComment._id)
        })
    })

    describe('getById', () => {
        it('should return a comment by id', async () => {
            const newComment = await CommentService.createComment({
                profileId: '65973810b97743c39838770d',
                userId: '65973817b97743c398387710',
                comment: 'This is a comment',
                mbti: 'INFP',
                enneagram: '9w1',
                zodiac: 'Aries',
            })

            const comment = await CommentService.getById(newComment._id)
            expect(comment).toBeDefined()
            expect(comment._id).toEqual(newComment._id)
        })
    })

    describe('createComment', () => {
        it('should create a new comment', async () => {
            const comment = {
                profileId: '65973810b97743c39838770d',
                userId: '65973817b97743c398387710',
                comment: 'This is a comment',
                mbti: 'INFP',
                enneagram: '9w1',
                zodiac: 'Aries',
            }
            const newComment = await CommentService.createComment(comment)
            expect(newComment).toBeDefined()
            expect(newComment._id).toBeDefined()
        })
    })

    describe('likeUnlikeComment', () => {
        it('should like a comment', async () => {
            const newComment = await CommentService.createComment({
                profileId: '65973810b97743c39838770d',
                userId: '65973817b97743c398387710',
                comment: 'This is a comment',
                mbti: 'INFP',
                enneagram: '9w1',
                zodiac: 'Aries',
            })

            const isLiked = await CommentService.likeUnlikeComment(
                newComment._id,
                '65973817b97743c398387710'
            )
            expect(isLiked).toBe(true)
        })

        it('should unlike a comment', async () => {
            const newComment = await CommentService.createComment({
                profileId: '65973810b97743c39838770d',
                userId: '65973817b97743c398387710',
                comment: 'This is a comment',
                mbti: 'INFP',
                enneagram: '9w1',
                zodiac: 'Aries',
            })

            await CommentService.likeUnlikeComment(
                newComment._id,
                '65973817b97743c398387710'
            )

            const isLiked = await CommentService.likeUnlikeComment(
                newComment._id,
                '65973817b97743c398387710'
            )
            expect(isLiked).toBe(false)
        })
    })
})
