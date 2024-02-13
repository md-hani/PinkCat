const express = require('express')
const User = require('../Models/userModel')
const StaffBio = require('../Models/staffBioModel')
const jwt = require('jsonwebtoken')

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

router.post('/createstaffbio', async (req, res) => {
    const {name, position, bio, picture} = req.body
    try{
        const staffBio = await StaffBio.create({name, position, bio, picture})
        res.status(200).json(staffBio)
    } catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/getallbios', async (req, res) => {
    try{
        const allBios = await StaffBio.find({})
        res.status(200).json(allBios)
    }
    catch(error){
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