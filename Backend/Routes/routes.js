const express = require('express')
const User = require('../Models/userModel')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({message: 'Samson and Hani are the fattest'})
})

router.post('/createuser', async (req, res) => {
    const {name, email, username, password} = req.body
    try{
        const user = await User.signup(name, email, username, password)
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