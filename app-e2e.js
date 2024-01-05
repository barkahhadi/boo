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

module.exports = app
