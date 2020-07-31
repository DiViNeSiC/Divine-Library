const express = require('express')
const router = express.Router()
const Author = require('../models/Author')
const filterAuthors = require('../middlewares/filterAuthors')

//All Authors Route
router.get('/', filterAuthors, async (req, res) => {
    try {
        const authors = await Author.find(req.searchOptions)
        res.render('Authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch (err) {
        res.redirect('/')
    }
})

//New Author Route
router.get('/new', (req, res) => {
    res.render('Authors/new', { author: new Author() })
})

//Create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        res.redirect('/authors')
        // res.redirect(`/authors/${newAuthor.id}`)
    } catch (err) {
        res.render('Authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
        })
    }
})

module.exports = router