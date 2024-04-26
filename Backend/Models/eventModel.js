const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    event: {
        type: Object,
        required:true
    },
    calendarId: {
        type: String,
        required:true
    },
}, {timestamps: true})

module.exports = mongoose.model('Event', eventSchema)