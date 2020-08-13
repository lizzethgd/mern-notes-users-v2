const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

// settings
app.set('port', process.env.PORT || 5000)

// Serving static files in express
app.use(express.static('public'))
// serving static files
app.use(express.static('public/assets'))

// middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, '../build')))
app.use(cors())

// routes
app.use('/api/users', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

module.exports = app


