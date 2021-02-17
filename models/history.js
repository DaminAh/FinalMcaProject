const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  course_array: { type: [Number], required: true },
  course_names: { type: [String], required: true },
});

const History = mongoose.model("History", historySchema);
module.exports = History;
