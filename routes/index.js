'use strict'

const express = require('express')
const router = express.Router()
const ProfileController = require('../controllers/profile.controller')
const CommentController = require('../controllers/comment.controller')
const UserController = require('../controllers/user.controller')

module.exports = function () {
    router.post('/comment/toggle-like', CommentController.likeUnlikeComment)
    router.post('/comment/add', CommentController.createComment)
    router.get('/comment/:id', CommentController.getComments)

    router.post('/user/add', UserController.createUser)

    router.get('/:id', ProfileController.getProfile)
    router.post('/profile/add', ProfileController.createProfile)

    return router
}
