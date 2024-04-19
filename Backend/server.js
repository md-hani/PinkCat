require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./Routes/routes')
const cors = require('cors')


//express app
const app = express()

//middleware
//app.use(cors)
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    res.header({"Access-Control-Allow-Origin": "*"});
    next()
})

// routes
app.use('/api', routes)

//DB connection
mongoose.connect(process.env.DB_URI)
 .then(() => {
    // listening for requests
app.listen(process.env.PORT, () => {
    console.log('Connected to DB & Listening on port', process.env.PORT)
})
 })
 .catch((error) => {
    console.log(error)
 })




