const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const filter = require('../middlewares/filter')
const getBookParams = require('../middlewares/bookParams')
const renderFormPage = require('../middlewares/renderFormPage')
const saveCover = require('../middlewares/saveCover')

//All Books Route
router.get('/', filter('books'), async (req, res) => {
    try {
        const books = await req.bookResults.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch (err) {
        res.redirect('/')
    }
})

//New Book Route
router.get('/new', async (req, res) => {
    renderFormPage(res, new Book(), 'new')
})

//Create Book Route
router.post('/create', getBookParams, async (req, res) => {
    const book = new Book(req.book)
    try {
        const newBook = await book.save()
        res.redirect(`/books/${newBook.id}`)
    } catch (err) {
        renderFormPage(res, book, 'new', true)
    }
})

//Show Book Route
router.get('/:id', async (req, res) => {
    try {
        const book = await Book
                    .findById(req.params.id)
                    .populate('author')
                    .exec()
        res.render('books/show', { book: book })
    } catch {
        res.redirect('/books')
    }
})

//Edit Book Route
router.get('/:id/edit', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        renderFormPage(res, book, 'edit')
    } catch {
        res.redirect('/books')
    }
})

//Update Book Route
router.put('/:id', async (req, res) => {
    let book
    const { 
        title,
        author,
        publishDate,
        pageCount,
        description,
        cover
    } = req.body
    try {
        book = await Book.findById(req.params.id)
        const updateMethods = {
            title: title,
            author: author,
            publishDate: new Date(publishDate),
            pageCount: pageCount,
            description: description,
        }
        if (cover != null && cover !== '') {
            saveCover(book, cover)
        }
        await book.updateOne(updateMethods)
        await book.save()
        res.redirect(`/books/${book.id}`)
    } catch {
        if (book == null) return res.redirect('/books')
        renderFormPage(res, book, 'edit', true)
    }
})

//Delete Book Route
router.delete('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id)
    try {
        await book.remove()
        res.redirect('/books')
    } catch {
        if (book == null) return res.redirect('/books')
        res.redirect(`/books/${book.id}`)
    }
})

module.exports = router