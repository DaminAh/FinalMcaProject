const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  c_id: { type: Number, required: true },
  users_data: [
    {
      name: { type: String, required: true, default: "no name" },
      email: { type: String, required: true },
      review: { type: String, required: true },
      stars: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5],
        default: 1,
      },
      date: { type: Date, default: new Date() },
    },
  ],
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
