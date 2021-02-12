const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

  c_name: {
    type: String,
    required: true,
  },
  c_des: {
    type: String,
    required: true,
  },
  c_id: {
    type: Number,
    required: true,
  },
  c_no: {
    type: Number,
    required: true,
  },
  t_name: {
    type: String,
    required: true,
  },
  t_description: {
    type: String,
    required: true,
  },
  no_videos: {
    type: Number,
    required: true,
  },
  urls: {
    type: [String],
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  domain_id: {
    type: Number,
    required: true,
  },
  thumbnail:String,
  review: [{

    user: {
      type: String
    },
    comment: {
      type: String
    }

  }]
})
const Course = new mongoose.model('Course', courseSchema)
module.exports = Course;