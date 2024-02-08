const express = require('express')
const User = require('../Models/userModel')
const StaffBio = require('../Models/staffBioModel')

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

router.post('/findemail', async (req, res) => {
    const {email} = req.body
    try{
        const find = await User.findOne({email})
        res.status(200).json(find)
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



module.exports = router