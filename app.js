'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connect = require('./database/conn')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// set the view engine to ejs
app.set('view engine', 'ejs')

// routes
app.use('/', require('./routes')())

// handle errors
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({
        message: err.message,
    })
})

// connect to database
connect()
    .then(() => {
        try {
            // start server
            app.listen(port, () => {
                console.log(`Server listening on port ${port}`)
            })
        } catch (err) {
            console.error(`Error starting server: ${err}`)
        }
    })
    .catch((err) => {
        console.error(`Error connecting to database: ${err}`)
    })
