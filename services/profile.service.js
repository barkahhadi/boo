const ProfileEntities = require('../entities/profile.entities')

/**
 * Profile service
 */
const ProfileService = {
    /**
     * Get profile by id
     *
     * @param {string} profileId
     *
     * @returns {Promise<ProfileEntities>}
     */
    getProfile: async (profileId) => {
        return ProfileEntities.findById(profileId)
    },

    /**
     * Create a new profile
     *
     * @param {object} profile
     *
     * @returns {Promise<ProfileEntities>}
     */
    createProfile: (profile) => {
        const newProfile = new ProfileEntities({
            name: profile.name,
            description: profile.description || null,
            mbti: profile.mbti || null,
            enneagram: profile.enneagram || null,
            variant: profile.variant || null,
            tritype: profile.tritype || null,
            socionics: profile.socionics || null,
            sloan: profile.sloan || null,
            psyche: profile.psyche || null,
            temperaments: profile.temperaments || null,
            image: profile.image || null,
        })
        return newProfile.save()
    },
}

module.exports = ProfileService
