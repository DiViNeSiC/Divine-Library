function filterAuthors(req, res, next) {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    req.searchOptions = searchOptions
    next()
}

module.exports = filterAuthors