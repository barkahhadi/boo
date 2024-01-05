const mongoose = require('mongoose')

const CommentEntities = new mongoose.Schema(
    {
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'profiles',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        mbti: String,
        enneagram: String,
        zodiac: String,
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
            },
        ],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('comments', CommentEntities)
