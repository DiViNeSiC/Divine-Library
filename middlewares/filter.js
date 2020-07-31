const Book = require('../models/book')

function filter(filterMethod) {
    return (req, res, next) => {
        const {
            name,
            title,
            publishedAfter,
            publishedBefore,
        } = req.query
        switch(filterMethod) {
            case 'books':
                {
                    let query = Book.find()
                    if (title != null && title !== '') {
                        query = query.regex('title', new RegExp(title, 'i'))  
                    }
                    if (publishedAfter != null && publishedAfter !== '') {
                        query = query.gte('publishDate', publishedAfter)
                    }
                    if (publishedBefore != null && publishedBefore !== '') {
                        query = query.lte('publishDate', publishedBefore) 
                    }
                    req.bookResults = query
                    break
                }
            case 'authors':
                {
                    let searchOptions = {}
                    if (name != null && name !== '') {
                        searchOptions.name = new RegExp(name, 'i')
                    }
                    req.searchOptions = searchOptions
                    break
                }
        }
        next()
    }
    
}

module.exports = filter