require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const database = require('./db')
const app = express()
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

    ; (async () => {
        await database.sync({force:true})
    })()

// routers
const router = require('./routes/userRoutes.js')
app.use('/users', router)

//static Images Folder

app.use('/Images', express.static('./Images'))


//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})