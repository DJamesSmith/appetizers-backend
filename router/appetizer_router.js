// @ts-nocheck

const express = require('express')
const router = express.Router()
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')

const appetizerController = require('../controllers/appetizer_controllers')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// -------------------------- Multer --------------------------

router.use(express.static('public'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `../public/appetizer_uploads`), function (error, success) {
            if (error) throw error
        })
        console.log(`Appetizer_Storage_Path: ${path.join(__dirname, `../public/appetizer_uploads`)}`)
    },
    filename: function (req, file, cb) {
        const name = 'appetizer' + '_' + Date.now() + path.extname(file.originalname)
        cb(null, name, function (error1, success1) {
            if (error1) throw error1
        })
    }
})

const upload = multer({ storage: storage })

// -------------------------- Multer --------------------------

router.get('/list', appetizerController.allAppetizers)
router.post('/create', upload.single('imageURL'), appetizerController.createAppetizer)

router.get('/detail/:id', appetizerController.appetizerDetails)

router.put('/update', upload.single('imageURL'), appetizerController.updateAppetizer)
router.delete('/delete/:id', appetizerController.deleteAppetizer)

module.exports = router