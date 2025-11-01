// @ts-nocheck

const fs = require('fs')

const imageToBase64 = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = { imageToBase64 }