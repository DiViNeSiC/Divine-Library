const Author = require('../models/Author')

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find()
        const params = { 
            authors,
            book
        }
        if (hasError) params.errorMessage = 'Error Creating Book'
        res.render('books/new', params)
    } catch (err) {
        res.redirect('/books')
    }
}

module.exports = renderNewPage