// @ts-nocheck

const Appetizer = require('../model/appetizer')
const { imageToBase64 } = require('../utility/base64image')

// GET all appetizers
exports.allAppetizers = async (req, res) => {
    try {
        const appetizers = await Appetizer.find()

        const data = appetizers.map(appetizer => ({
            _id: appetizer._id,
            name: appetizer.name,
            description: appetizer.description,
            protein: appetizer.protein,
            carbs: appetizer.carbs,
            calories: appetizer.calories,
            price: appetizer.price,
            status: appetizer.status,
            imageURL: appetizer.imageURL
                ? `${req.protocol}://${req.get('host')}/public/appetizer_uploads/${appetizer.imageURL}`
                : null,
            createdAt: appetizer.createdAt,
            updatedAt: appetizer.updatedAt
        }))

        res.status(200).json({
            success: true,
            status: 200,
            data: data,
            message: data.length === 0 ? 'Appetizer list empty.' : 'Appetizer list fetched successfully'
        })

    } catch (error) {
        res.status(400).json({ 
            success: false, 
            status: 400, 
            message: error.message 
        })
    }
}

exports.createAppetizer = async (req, res) => {
    try {
        const { name, description, protein, carbs, calories, price } = req.body

        let imageURL = ''

        if (req.file) {
            imageURL = req.file.filename
            const filePath = `public/appetizer_uploads/${imageURL}`
            const base64Image = await imageToBase64(filePath)
            imageURL = base64Image
        }

        const newAppetizer = await new Appetizer({
            name: name,
            description: description,
            imageURL: imageURL,
            protein: protein,
            carbs: carbs,
            calories: calories,
            price: price,
            status: true
        })

        await newAppetizer.save()

        res.status(200).json({ success: true, status: 200, message: 'Appetizer created successfully', data: newAppetizer })
    } catch (error) {
        res.status(400).json({ success: false, status: 400, message: error.message })
    }
}

exports.appetizerDetails = async (req, res) => {
    try {
        const appetizerId = req.params.id
        const appetizer = await Appetizer.findById(appetizerId)

        if (!appetizer) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Appetizer not found',
            })
        }

        res.status(200).json({
            success: true,
            status: 200,
            data: {
                _id: appetizer._id,
                name: appetizer.name,
                description: appetizer.description,
                protein: appetizer.protein,
                carbs: appetizer.carbs,
                calories: appetizer.calories,
                price: appetizer.price,
                status: appetizer.status,
                imageURL: appetizer.imageURL
                    ? `${req.protocol}://${req.get('host')}/public/appetizer_uploads/${appetizer.imageURL}`
                    : null,
                createdAt: appetizer.createdAt,
                updatedAt: appetizer.updatedAt,
            },
            message: 'Appetizer details fetched successfully',
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            status: 400,
            message: error.message,
        })
    }
}

exports.updateAppetizer = async (req, res) => {
    try {
        const appetizerId = req.body.id

        const { name, description } = req.body

        const updatedFields = {
            name: name,
            description: description
        }

        if (req.file) {
            const imageURL = req.file.filename
            const filePath = `public/appetizer_uploads/${imageURL}`
            const base64Image = await imageToBase64(filePath)
            updatedFields.imageURL = base64Image
        }

        const updatedAppetizer = await Appetizer.findByIdAndUpdate(appetizerId, updatedFields, { new: true })

        if (!updatedAppetizer) {
            return res.status(404).json({ success: false, status: 404, message: 'Appetizer not found' })
        }

        res.status(200).json({ success: true, status: 200, message: 'Appetizer updated successfully', data: updatedAppetizer })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

exports.deleteAppetizer = async (req, res) => {
    try {
        const appetizerId = req.params.id

        const deletedAppetizer = await Appetizer.findByIdAndDelete(appetizerId)

        if (!deletedAppetizer) {
            return res.status(404).json({ success: false, status: 404, message: 'Appetizer not found' })
        }

        res.status(200).json({ success: true, status: 200, message: 'Appetizer deleted successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}