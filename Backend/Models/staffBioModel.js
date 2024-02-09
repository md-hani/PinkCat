const mongoose = require('mongoose')

const Schema = mongoose.Schema

const staffBioSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    position: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    picture: {
        type: String
    },
}, {timestamps: true})

module.exports = mongoose.model('StaffBio', staffBioSchema)