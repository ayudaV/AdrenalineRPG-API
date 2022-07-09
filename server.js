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
        await database.sync({ force: true })
    })()

app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue

    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user; //set the user to req so other routes can use it
            next();
        }
    });
});

// routers
const routerUser = require('./routes/userRoutes.js')
app.use('/users', routerUser)
const routerAuth = require('./routes/authRoutes.js')
app.use('/auth', routerAuth)
//static Images Folder

app.use('/Images', express.static('./Images'))


//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})