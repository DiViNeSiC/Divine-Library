const Author = require('../models/Author')

async function renderFormPage(res, book, form, hasError = false) {
    try {
        const authors = await Author.find()
        const params = { 
            authors,
            book
        }
        if (hasError && form === 'new') params.errorMessage = 'Error Creating Book'
        if (hasError && form === 'edit') params.errorMessage = 'Error Updating Book'
        res.render(`books/${form}`, params)
    } catch (err) {
        res.redirect('/books')
    }
}

module.exports = renderFormPage