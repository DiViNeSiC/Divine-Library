const express = require('express')
const router = express.Router()
const Author = require('../models/Author')
const Book = require('../models/book')
const filter = require('../middlewares/filter')

//All Authors Route
router.get('/', filter('authors'), async (req, res) => {
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
        res.redirect(`/authors/${newAuthor.id}`)
    } catch (err) {
        res.render('Authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
        })
    }
})

//Show Author Route
router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        const books = await Book.find({ author: author.id }).limit(10).exec()
        res.render('Authors/show', { author: author, booksByAuthor: books })
    } catch (err) {
        res.redirect('/authors')
    }
})

//Edit Author Route
router.get('/:id/edit', async (req, res) => {
    const author = await Author.findById(req.params.id)
    res.render('Authors/edit', { author: author })
})

//Update Author Route
router.put('/:id', async (req, res) => {
    const author = await Author.findById(req.params.id)
    try {
        await Author.findByIdAndUpdate(req.params.id, { name: req.body.name })
        res.redirect(`/authors/${author.id}`)
    } catch (err) {
        if (author == null) {
            return res.redirect('/authors')
        }
        res.render('Authors/new', {
            author: author,
            errorMessage: 'Error Updating Author'
        })
    }
})

//Delete Author Route
router.delete('/:id', async (req, res) => {
    const author = await Author.findById(req.params.id)
    try {
        await author.remove()
        res.redirect(`/authors`)
    } catch {
        if (author == null) {
            return res.redirect('/authors')
        }
        res.redirect(`/authors/${author.id}`)
    }
})


module.exports = router