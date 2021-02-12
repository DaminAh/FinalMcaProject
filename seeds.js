const mongoose = require('mongoose');
const Course = require('./models/course');

mongoose.connect('mongodb://localhost:27017/chinarDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Mongoose connected")
  })
  .catch((err) => {
    console.log("Mongoose connection error")
    console.log(err)
  })



c.save()
  .then(x => {
    console.log(x);
  })
  .catch(err => {
    console.log(err)
  })