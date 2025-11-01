// @ts-nocheck

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session')
const fs = require('fs')
require("dotenv").config()

const app = express()
app.use(cookieParser())

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', true)

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: false
}))

app.use(flash())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/admin'))

app.use(express.static(path.join(__dirname, 'public/appetizer_uploads')))

// Ensure upload directory exists at runtime
const uploadDir = path.join(process.cwd(), 'public', 'appetizer_uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ Created upload directory:', uploadDir);
}

// Use BodyParser for GET data from form body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

// ---------------------------------------------------------------------------

// Appetizers
const appetizerRoute = require('./router/appetizer_router')                              // Fetch All Products
app.use('/api/appetizer', appetizerRoute)

// ---------------------------------------------------------------------------

const port = process.env.PORT

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`DB & Server Connected, listening on http://localhost:${port}/api`)
        })
    }).catch(error => {
        console.log(error)
    })