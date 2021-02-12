const mongoose=require('mongoose');

const playlistSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  playIds:[Number]
})

const Playlist=mongoose.model('Playlist',playlistSchema);
module.exports=Playlist;