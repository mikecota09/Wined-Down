import mongoose from "mongoose";

// comment Schema
const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 300 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    owner: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// define the drink schema
const drinkSchema = new mongoose.Schema({
  drink: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  funFact: { type: String, maxlength: 300 },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  origin: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  comments: [commentSchema], // comments field is array of comments from commentSchema,
  longitude: { type: Number },
  latitude: { type: Number },
  icon: { type: String },
});

// Ratings
drinkSchema.virtual("avgRating").get(function () {
  //get all the ratings
  if (!this.comments.length) return "Not rated yet";
  // define variable to map throug ratings
  const sum = this.comments.reduce((acc, curr) => {
    return acc + curr.rating;
  }, 0);
  //return average of all ratings
  return (sum / this.comments.length).toFixed(2);
});

drinkSchema.set("toJSON", {
  virtuals: true,
});

// define model
export default mongoose.model("Drink", drinkSchema);
