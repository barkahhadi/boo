const CommentService = require('../services/comment.service')
const ProfileService = require('../services/profile.service')
const UserService = require('../services/user.service')
const { MBTI, ENNEAGRAM, ZODIAC } = require('../constants')

const CommentController = {
    getComments: async (req, res, next) => {
        const profileId = req.params.id

        if (!profileId) {
            return res.status(400).json({
                message: 'profileId is required',
            })
        }

        try {
            const sortBy = req.query.sortBy || 'recent'
            const filterBy = req.query.filterBy || 'all'

            const comments = await CommentService.getComments(
                profileId,
                sortBy,
                filterBy
            )
            res.json({
                message:
                    comments.length > 0
                        ? 'Comments found'
                        : 'No comments found',
                data: comments,
            })
        } catch (err) {
            next(err)
        }
    },

    createComment: async (req, res, next) => {
        try {
            // validate required fields
            if (!req.body.profileId) {
                return res.status(400).json({
                    message: 'profileId is required',
                })
            } else if (!req.body.comment) {
                return res.status(400).json({
                    message: 'comment is required',
                })
            } else if (!req.body.userId) {
                return res.status(400).json({
                    message: 'userId is required',
                })
            }

            const profile = await ProfileService.getProfile(req.body.profileId)

            if (!profile) {
                return res.status(400).json({
                    message: 'Profile not found',
                })
            }

            const user = await UserService.getUser(req.body.userId)

            if (!user) {
                return res.status(400).json({
                    message: 'User not found',
                })
            }

            // check if mbti, enneagram, and zodiac are valid
            if (req.body.mbti && !MBTI.includes(req.body.mbti)) {
                return res.status(400).json({
                    message: 'Invalid MBTI',
                })
            } else if (
                req.body.enneagram &&
                !ENNEAGRAM.includes(req.body.enneagram)
            ) {
                return res.status(400).json({
                    message: 'Invalid Enneagram',
                })
            } else if (req.body.zodiac && !ZODIAC.includes(req.body.zodiac)) {
                return res.status(400).json({
                    message: 'Invalid Zodiac',
                })
            }

            const newComment = await CommentService.createComment(req.body)

            res.json({
                message: 'New comment created',
                data: {
                    id: newComment._id,
                },
            })
        } catch (err) {
            next(err)
        }
    },

    likeUnlikeComment: async (req, res, next) => {
        const commentId = req.body.commentId
        const userId = req.body.userId

        if (!commentId) {
            return res.status(400).json({
                message: 'commentId is required',
            })
        } else if (!userId) {
            return res.status(400).json({
                message: 'userId is required',
            })
        }

        // check if user exists
        const user = await UserService.getUser(userId)

        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            })
        }

        try {
            const isLiked = await CommentService.likeUnlikeComment(
                commentId,
                userId
            )
            res.json({
                message: isLiked ? 'Comment liked' : 'Comment unliked',
                isLiked,
            })
        } catch (err) {
            next(err)
        }
    },
}

module.exports = CommentController
