import mongoose from 'mongoose'

// Define the cart schema
const shoppedDrinkSchema = new mongoose.Schema({
  drinkId: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true }
  // owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

// define model
export default mongoose.model('ShoppedDrink', shoppedDrinkSchema)
