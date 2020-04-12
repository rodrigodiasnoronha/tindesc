const express = require('express')
const routes = require('./routes')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const server = express()


// DB connection
mongoose.connect('mongodb+srv://rodrigo:root@cluster0-thokq.mongodb.net/tindesc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Mid, config and routes
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan('dev'))
server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
server.use(cors())
server.use(routes)


const port = 3131
server.listen(port, () => console.log(`server running port ${port}`))