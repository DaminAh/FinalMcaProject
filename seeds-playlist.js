const Playlist=require('./models/playlist');
const mongoose = require('mongoose');

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

  const c= new Playlist(
    {email:'daminahmad247@gmail.com',
    playIds:[1,4,6]}
  );

  c.save()
  .then((data)=>{
    console.log(data);
  })
  .catch((e)=>{
    console.log(e)
  })
