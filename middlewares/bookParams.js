function getBookParams(req, res, next) {
    const fileName = req.file != null ? req.file.filename : null
    const {
        title,
        author,
        publishDate,
        pageCount,
        description
    } = req.body
    const book = {
        title: title,
        author: author,
        publishDate: new Date(publishDate),
        pageCount: pageCount,
        coverImage: fileName,
        description: description
    }
    req.book = book
    next()
}

module.exports = getBookParams