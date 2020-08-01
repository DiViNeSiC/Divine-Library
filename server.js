if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()

const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')
const booksRouter = require('./routes/books')

mongoose.connect(process.env.DATABASE_URL, {
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
app.use(express.static('./public'))
app.use(express.urlencoded({
    extended: false,
    limit: '10mb'
}))
app.use(methodOverride('_method'))


app.use('/', indexRouter)
app.use('/authors', authorsRouter)
app.use('/books', booksRouter)

app.listen(process.env.PORT || 3000)