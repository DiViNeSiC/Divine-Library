const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const Book = require('../models/book')
const filter = require('../middlewares/filter')
const getBookParams = require('../middlewares/bookParams')
const renderNewPage = require('../middlewares/renderBookPage')
const removeBookCover = require('../middlewares/removeBookCover')

const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']

const upload = multer({ 
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

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
    renderNewPage(res, new Book())
})

//Create Book Route
router.post('/', upload.single('cover'), getBookParams, async (req, res) => {
    const book = new Book(req.book)
    try {
        const newBook = await book.save()
        res.redirect('/books')
        // res.redirect(`/authors/${newBook.id}`)
    } catch (err) {
        if (book.coverImage != null) {
            removeBookCover(book.coverImage, uploadPath, path)
        }
        renderNewPage(res, book, true)
    }
})

module.exports = router