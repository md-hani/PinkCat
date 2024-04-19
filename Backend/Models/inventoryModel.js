const mongoose = require('mongoose')

const Schema = mongoose.Schema

const inventorySchema = new Schema({
    itemType: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    available: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    checkOut: {
        type: String
    },
    returnTime: {
        type: String
    },
}, {timestamps: true})

module.exports = mongoose.model('Inventory', inventorySchema)