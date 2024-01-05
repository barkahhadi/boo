const UserEntities = require('../entities/user.entities')

/**
 * User service
 */
const UserService = {
    /**
     * Get user by id
     *
     * @param {string} userId
     *
     * @returns {Promise<UserEntities>}
     */
    getUser: (userId) => {
        return UserEntities.findById(userId)
    },

    /**
     * Create a new user
     *
     * @param {object} user
     *
     * @returns {Promise<UserEntities>}
     */
    createUser: (user) => {
        return UserEntities.create(user)
    },
}

module.exports = UserService
