const ProfileService = require('../services/profile.service')
const { MBTI, ENNEAGRAM } = require('../constants')

const ProfileController = {
    getProfile: async (req, res, next) => {
        const profileId = req.params.id

        if (!profileId) {
            return res.status(400).json({
                message: 'profileId is required',
            })
        }

        try {
            const profile = await ProfileService.getProfile(profileId)
            if (!profile) {
                return res.render('404')
            }

            res.render('profile_template', {
                profile: profile,
            })
        } catch (err) {
            next(err)
        }
    },
    createProfile: async (req, res, next) => {
        try {
            const newProfile = await ProfileService.createProfile(req.body)

            if (!req.body.mbti) {
                throw new Error('MBTI is required')
            } else if (!req.body.enneagram) {
                throw new Error('Enneagram is required')
            }

            if (!MBTI.includes(req.body.mbti)) {
                throw new Error('Invalid MBTI')
            } else if (!ENNEAGRAM.includes(req.body.enneagram)) {
                throw new Error('Invalid Enneagram')
            }

            res.json({
                message: 'New profile created',
                data: {
                    id: newProfile._id,
                },
            })
        } catch (err) {
            next(err)
        }
    },
}

module.exports = ProfileController
