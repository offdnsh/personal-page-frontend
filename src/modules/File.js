import axios from 'axios'

async function getAll (query) {
    return await axios.get(`files?${query}`)
}

async function getAllById (id) {
    return await axios.get(`files/${id}`)
}

async function destroy(id) {
    return await axios.delete(`files/${id}`)
}

async function upload(form) {
    return await axios.post('files', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

async function download(filename) {
    return await axios.get(`download/${filename}`)
}

async function updateCategory(id, category) {
    return await axios.put(`files/${id}`, { category })
}

export default {
    getAll,
    getAllById,
    destroy,
    upload,
    updateCategory,
    download
}