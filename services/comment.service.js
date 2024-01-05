const CommentEntities = require('../entities/comment.entities')

/**
 * Comment service
 */
const CommentService = {
    /**
     * Get comments by profileId
     *
     * @param {string} profileId
     * @param {string} sortBy
     * @param {string} filterBy
     *
     * @returns {Promise<CommentEntities[]>}
     */
    getComments: async (profileId, sortBy = 'recent', filterBy = 'all') => {
        let conditions = { profile: profileId }

        if (filterBy === 'mbti') {
            conditions.mbti = { $exists: true, $ne: null }
        } else if (filterBy === 'enneagram') {
            conditions.enneagram = { $exists: true, $ne: null }
        } else if (filterBy === 'zodiac') {
            conditions.zodiac = { $exists: true, $ne: null }
        }

        const collection = CommentEntities.find(conditions).populate({
            path: 'user',
            select: 'name',
        })

        if (sortBy === 'best') {
            collection.sort({ likes: -1 })
        } else if (sortBy === 'recent') {
            collection.sort({ createdAt: -1 })
        }

        return collection
    },

    /**
     * Get comment by id
     *
     * @param {string} id
     *
     * @returns {Promise<CommentEntities>}
     */
    getById: async (id) => {
        return CommentEntities.findById(id)
    },

    /**
     * Create a new comment
     *
     * @param {object} comment
     * @param {string} comment.profileId
     *
     * @returns {Promise<CommentEntities>}
     */
    createComment: (comment) => {
        const newComment = new CommentEntities({
            profile: comment.profileId,
            user: comment.userId,
            comment: comment.comment,
            mbti: comment.mbti || null,
            enneagram: comment.enneagram || null,
            zodiac: comment.zodiac || null,
            likes: [],
        })
        return newComment.save()
    },

    /**
     * Like or unlike a comment
     *
     * @param {string} commentId
     * @param {string} userId
     *
     * @returns {Promise<boolean>}
     */
    likeUnlikeComment: async (commentId, userId) => {
        const comment = await CommentEntities.findById(commentId)
        if (!comment) {
            throw new Error('Comment not found')
        }
        let isLiked = false

        const likes = comment.likes || []
        // Check if the userId is already in the likes array
        if (likes.includes(userId)) {
            await CommentEntities.findByIdAndUpdate(
                commentId,
                { $pull: { likes: userId } },
                { new: true }
            )
        } else {
            await CommentEntities.findByIdAndUpdate(
                commentId,
                { $push: { likes: userId } },
                { new: true }
            )
            isLiked = true
        }

        return isLiked
    },
}

module.exports = CommentService
