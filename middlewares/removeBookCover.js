const fs = require('fs')

function removeBookCover(fileName, uploadPath, path) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err)
    })
}

module.exports = removeBookCover