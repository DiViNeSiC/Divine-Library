const saveCover = require("./saveCover")

function getBookParams(req, res, next) {
    const {
        title,
        author,
        publishDate,
        pageCount,
        description,
        cover
    } = req.body
    const book = {
        title: title,
        author: author,
        publishDate: new Date(publishDate),
        pageCount: pageCount,
        description: description
    }
    saveCover(book, cover)
    req.book = book
    next()
}

module.exports = getBookParams