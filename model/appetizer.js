// @ts-nocheck

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appetizerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: false
    }
},
    {
        timestamps: true        // Automatically gives us a createdAt and updatedAt fields
    }
)

module.exports = mongoose.model('appetizer', appetizerSchema)