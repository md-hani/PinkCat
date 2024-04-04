const mongoose = require('mongoose')

const Schema = mongoose.Schema

const calendarSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    events: {
        type: Array
    },
}, {timestamps: true})

module.exports = mongoose.model('Calendar', calendarSchema)