const UserService = require('../services/user.service')

const UserController = {
    getUser: async (req, res, next) => {
        const userId = req.params.id

        if (!userId) {
            return res.status(400).json({
                message: 'userId is required',
            })
        }

        try {
            const user = await UserService.getUser(userId)
            if (!user) {
                return res.render('404')
            }

            res.render('user_template', {
                user: user,
            })
        } catch (err) {
            next(err)
        }
    },

    createUser: async (req, res, next) => {
        if (!req.body.name) {
            return res.status(400).json({
                message: 'name is required',
            })
        }

        try {
            const newUser = await UserService.createUser(req.body)

            res.json({
                message: 'New user created',
                data: {
                    id: newUser._id,
                },
            })
        } catch (err) {
            next(err)
        }
    },
}

module.exports = UserController
