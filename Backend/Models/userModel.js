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
    priv: {
        type: String,
        required: true
    },
}, {timestamps: true})

userSchema.statics.signup = async function (name, email, username, password, priv) {
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

    const user = await this.create({name, email, username, password: hash, priv})

    return user
}

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username})

    if(!user){
        throw Error('Incorrect username or password')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect username or password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)