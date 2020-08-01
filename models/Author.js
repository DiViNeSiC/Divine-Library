const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next) {
    Book.find({ author: this.id }, (err, books) => {
        if (err) {
            return next(err)
        }
        if (books.length > 0) {
            return next(new Error('This author has books still'))
        }
        next()
    })
})

module.exports = mongoose.model('Author', authorSchema)