import axios from 'axios'

async function uploadPhoto(file) {
    return await axios.post('account/uploadphoto', file,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

async function updateSettings(form) {
    return await axios.put('account/settings', form)
}

async function updateMainDataProfile(form) {
    return await axios.post('account/profile/main', form)
}

async function updateSocialProfile(form) {
    return await axios.post('account/profile/social', form)
}

export default {
    uploadPhoto,
    updateSettings,
    updateMainDataProfile,
    updateSocialProfile
}