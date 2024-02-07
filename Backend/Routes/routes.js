const express = require('express')
const User = require('../Models/userModel')

const router = express.Router()

router.post('/loginuser', async (req, res) => {
    const {username, password} = req.body
    try{
        const user = await User.login(username, password)
        res.status(200).json(user)
    } catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/createuser', async (req, res) => {
    const {name, email, username, password, priv} = req.body
    try{
        const user = await User.signup(name, email, username, password, priv)
        res.status(200).json(user)
    } catch(error){
        res.status(400).json({error: error.message})
    }
})

router.patch('/:id', async (req, res) => {
    const {id} = req.params

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    res.status(200).json(user)
})

module.exports = router