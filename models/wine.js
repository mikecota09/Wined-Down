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

// Ratings 
wineSchema.virtual('avgRating')
  .get(function() { 
    //get all the ratings
    if (!this.comments.length) return 'Not rated yet'
    // define variable to map throug ratings
    const sum = this.comments.reduce((acc, curr) => {
      return acc + curr.rating
    }, 0)
    //return average of all ratings
    return (sum / this.comments.length).toFixed(2)
})


wineSchema.set('toJSON', {
    virtuals: true
  })
// define model
export default mongoose.model('Wine', wineSchema)