import mongoose from 'mongoose'

// define the wine schema
const wineSchema = new mongoose.Schema({
    wine: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    funFact: { type: String, maxlength: 300 }
})

// define model
export default mongoose.model('Wine', wineSchema)