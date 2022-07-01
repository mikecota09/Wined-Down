const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingsSchema = new Schema({
  stars: {
    type: Number,
  },
  ratingsUser: {
    type: String,
  },
  ratingsHeader: {
    type: String,
  },
  ratingsBody: {
    type: String,
  },
  itemID: Number,
});

const Ratings = mongoose.model("Ratings", RatingsSchema);

module.exports = Ratings;
