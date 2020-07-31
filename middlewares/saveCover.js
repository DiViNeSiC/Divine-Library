function saveCover(book, coverFile) {
    if (coverFile == null) return
    const cover = JSON.parse(coverFile)
    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        book.coverImage = new Buffer.from(cover.data, 'base64')
        book.coverImageType = cover.type
    }
}

module.exports = saveCover