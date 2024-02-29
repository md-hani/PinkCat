const express = require('express')
const User = require('../Models/userModel')
const StaffBio = require('../Models/staffBioModel')
const Inventory = require('../Models/inventoryModel')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/src/assets');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
const upload = multer({ storage: storage })

const router = express.Router()

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
      user: "noreply.amcstmu@gmail.com",
      pass: "cxinthwnpcfmkczh"
    }
  });
  router.post("/send", async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({email})

    const mailOptions = {
      from: "noreply.amcstmu@gmail.com",
      to: req.body.email,
      subject: "Test Email",
      html: '<p>Click <a href="http://localhost:3000/resetPassword?uid=' + user.username + '">here</a> to reset your password for The Academic Media Center Website.</p>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
       if(error){
         return res.status(500).send(error);
       }
       res.status(200).json("Email sent successfully");
    });
  });

router.post('/loginuser', async (req, res) => {
    const {username, password} = req.body
    try{
        const user = await User.login(username, password)

        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/resetPasswordPoint', async (req, res) => {
    const {newPassword, username} = req.body
    try{
        await User.resetPassword(newPassword, username)

        res.status(200).json("Successful password reset")
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/getTableData', async (req, res) => {
    try{
        const tableData = await Inventory.find()

        res.status(200).json(tableData)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/profileimage', upload.single("file"), async (req, res) => {
    try{
        const username = (JSON.parse(JSON.stringify(req.body)).data)
        const newPath = req.file.originalname

        const filter = { username: username };
        const update = { picture: newPath };

        await User.findOneAndUpdate(filter, update);

        res.status(200).json(newPath)
    } catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/getcurrentuser', async (req, res) => {
    const {username} = req.body
    try{
        const user = await User.findOne({username})

        res.status(200).json(user)
    }catch(error){
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

        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
})



module.exports = router