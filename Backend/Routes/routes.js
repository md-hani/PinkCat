const express = require('express')
const User = require('../Models/userModel')
const StaffBio = require('../Models/staffBioModel')
const Inventory = require('../Models/inventoryModel')
const Calendar = require('../Models/calendarModel')
const Event = require("../Models/eventModel")
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const xlsx = require('xlsx')
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
      pass: 'cxinthwnpcfmkczh'
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

  router.post("/createEvent",async (req, res) => {
    const {eventTitle, startDate, endDate, calendarSelectValue, colorSelectValue} = req.body
    try{
        const item = await Event.create({calendarId: calendarSelectValue, event: {title: eventTitle, start: startDate, end: endDate, color: colorSelectValue, extendedProps: {id: '0'}}})
        await Calendar.updateOne({_id: calendarSelectValue}, {$push: {events: item._id}})
        await Event.updateOne({_id: item._id}, {$set: {"event.extendedProps.id": item._id}})

        res.status(200).json('its good')
    }catch(error){
        res.status(400).json({error: error.message})
    }
  })

  router.post("/editEvent",async (req, res) => {
    const {eventTitle, startDate, endDate, calendarSelectValue, colorSelectValue, eventId} = req.body
    try{
        const item = await Event.findById(eventId)
        await Calendar.updateOne({_id: item.calendarId}, {$pull: {events: item._id}})
        await Calendar.updateOne({_id: calendarSelectValue}, {$push: {events: item._id}})
        await Event.findOneAndUpdate({_id: item._id}, {calendarId: calendarSelectValue, event: {title: eventTitle, start: startDate, end: endDate, color: colorSelectValue, extendedProps: {id: eventId}}})

        res.status(200).json('its good')
    }catch(error){
        res.status(400).json({error: error.message})
    }
  })

  router.post("/deleteEvent",async (req, res) => {
    const {eventId} = req.body
    try{
        const item = await Event.findById(eventId)
        await Calendar.updateOne({_id: item.calendarId}, {$pull: {events: item._id}})
        await Event.deleteOne({_id: eventId})

        res.status(200).json('its good')
    }catch(error){
        res.status(400).json({error: error.message})
    }
  })

  router.post("/toggleCalendar",async (req, res) => {
    const {idValue, enabledValue} = req.body
    try{
        const item = await Calendar.updateOne({_id: idValue}, {enabled: enabledValue})

        res.status(200).json('its good')
    }catch(error){
        res.status(400).json({error: error.message})
    }
  })

// router.post('/readExcel', async (req, res) => {
//     const data = xlsx.readFile('../frontend/src/assets/InventorySample.xlsx');

//     const worksheet = data.Sheets['Sheet1']
//     const rows = xlsx.utils.sheet_to_json(worksheet)

//     for (let i = 0; i < rows.length; i++)
//     {
//         const {itemType, name, description} = rows[i]
//         const available = true
//         const checkOut = '-'
//         const returnTime = '-'
//         await Inventory.create({itemType, name, available, description, checkOut, returnTime})
//     }

//     res.status(200).json("Good")

// })

router.post('/createNewCalendar', async (req, res) => {
    const {nameEdit, currentUsername} = req.body
    try{
        const item = await Calendar.create({name: nameEdit})

        await User.findOneAndUpdate({username: currentUsername}, {$push: {calendars: item._id}})

        res.status(200).json("ok")
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/getUserCalendars', async (req, res) => {
    const {calendars} = req.body
    try{
        var calArray = []

        for(let i = 0; i < calendars.length; i++)
        {
            const filter = {_id: calendars[i]}
            const item = await Calendar.findOne(filter)
            calArray.push(item)
        }
        console.log(calArray)
        res.status(200).json(calArray)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/getUserEvents', async (req, res) => {
    const {calendars} = req.body
    try{
        var eventArray = []

        for(let i = 0; i < calendars.length; i++)
        {
            const filter = {calendarId: calendars[i]}
            const enableCheck = await Calendar.findOne({_id: calendars[i]})
            console.log("1", enableCheck.enabled)
            if(enableCheck.enabled)
            {
                const item = await Event.find(filter)
                console.log(item)
                for(let j = 0; j < item.length; j++){
                    eventArray.push(item[j])
                }
            }
        }
        console.log(eventArray)
        res.status(200).json(eventArray)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/setNameInventory', async (req, res) => {
    const {nameEditKey, nameEdit} = req.body
    try{
        const filter = { _id: nameEditKey };
        const update = { name: nameEdit };

        const item = await Inventory.findOneAndUpdate(filter, update);

        res.status(200).json(item)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/deleteMyCalendar', async (req, res) =>{
    const {myId, myUser}= req.body
    try{
        const item = await Calendar.findOne({_id: myId})
        const a = await User.findOneAndUpdate({username: myUser}, {$pull: {calendars: item._id}});
        await Event.deleteMany({calendarId: myId})
        const b = await Calendar.deleteOne({_id: myId});

        res.status(200).json('its good')
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/renameMyCalendar', async (req, res) => {
    const {calKey, calNameEdit} = req.body
    try{
        await Calendar.findOneAndUpdate({_id: calKey}, {name: calNameEdit})

        res.status(200).json('its good')
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/setDescriptionInventory', async (req, res) => {
    const {descriptionEditKey, descriptionEdit} = req.body
    try{
        const filter = { _id: descriptionEditKey };
        const update = { description: descriptionEdit };

        const item = await Inventory.findOneAndUpdate(filter, update);

        res.status(200).json(item)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/setAvailableInventory', async (req, res) => {
    const {availableEditKey, availableEdit} = req.body
    try{
        var isAvailable = ''
        if(availableEdit === 'true')
        {
            isAvailable = true
        }
        else{
            isAvailable = false
        }
        const filter = { _id: availableEditKey };
        const update = { available: isAvailable };

        const item = await Inventory.findOneAndUpdate(filter, update);

        res.status(200).json(item)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/setCheckoutInventory', async (req, res) => {
    const {checkoutEditKey, myDate} = req.body
    try{
        const filter = { _id: checkoutEditKey };
        const update = { checkOut: myDate };

        const item = await Inventory.findOneAndUpdate(filter, update);

        res.status(200).json(item)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.post('/setReturnInventory', async (req, res) => {
    const {returnEditKey, myDate} = req.body
    try{
        const filter = { _id: returnEditKey };
        const update = { returnTime: myDate };

        const item = await Inventory.findOneAndUpdate(filter, update);

        res.status(200).json(item)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

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

router.post('/createInventoryItem', async (req, res) => {
    const {itemType, name, description} = req.body
    const available = true
    try{
        await Inventory.create({itemType, name, available, description})

        res.status(200).json("Successful Inventory Addition")
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