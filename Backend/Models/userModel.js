const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true})

userSchema.statics.signup = async function (name, email, username, password) {
    const usernameExists = await this.findOne({username})
    const emailExists = await this.findOne({email})

    if (usernameExists)
    {
        throw Error('Username already exists')
    }
    if (emailExists)
    {
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password.toString(), salt)

    const user = await this.create({name, email, username, password: hash})

    return user
}

module.exports = mongoose.model('User', userSchema)