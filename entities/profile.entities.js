const mongoose = require('mongoose')

const ProfileEntities = new mongoose.Schema(
    {
        name: String,
        description: String,
        mbti: String,
        enneagram: String,
        variant: String,
        tritype: Number,
        socionics: String,
        sloan: String,
        psyche: String,
        temperaments: String,
        image: String,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('profiles', ProfileEntities)
