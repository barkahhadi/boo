const mongoose = require('mongoose')

const UserEntities = new mongoose.Schema(
    {
        name: String,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('users', UserEntities)
