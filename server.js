if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const app = express()

const indexRouter = require('./routes/index')

mongoose.connect('mongodb://localhost/ss', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection

db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to the Database'))

app.set('views', './views')
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)