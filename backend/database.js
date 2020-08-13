const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI || 5000

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err)=> {
    if (err) return console.log(err)
    console.log('The server is conncected to MongoDB database')
})