require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const database = require('./db')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

    ; (async () => {
        await database.sync({ /*force: true*/ })
    })()

app.use((req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue

    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ error: true, message: "Invalid user." });
        else {
            req.user = user; //set the user to req so other routes can use it
            next();
        }
    });
});

// routers
app.use('/users', require('./routes/userRoutes.js'))
app.use('/auth', require('./routes/authRoutes.js'))
app.use('/characters', require('./routes/characterRoutes.js'))
app.use('/equipments', require('./routes/equipmentRoutes.js'))
app.use('/languages', require('./routes/languageRoutes.js'))
app.use('/masterys', require('./routes/masteryRoutes.js'))
app.use('/organizations', require('./routes/organizationRoutes.js'))
app.use('/races', require('./routes/raceRoutes.js'))
app.use('/skills', require('./routes/skillRoutes.js'))
app.use('/types', require('./routes/typeRoutes.js'))
app.use('/weapons', require('./routes/weaponRoutes.js'))

//static Images Folder

app.use('/Images', express.static('./Images'))


//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})