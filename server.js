const express=require('express');
const app=express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const { auth, requiresAuth } = require('express-openid-connect');
const Course = require('./models/course');
require('dotenv').config();

// app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'ejs');


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

app.use(
  auth({
    authRequired:false,
    auth0Logout:true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL:  process.env.BASE_URL,
    clientID:process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);



app.get('/', async (req,res)=>{
  // console.log(req.oidc.isAuthenticated())
  if(req.oidc.isAuthenticated()){
    const data= await Course.find({c_id:{$lt:10}});
    res.render('home-page.ejs',{data})
  }
  else{
    console.log(req.params)
    res.render('front-page.ejs')
  }
})

app.get('/profile',requiresAuth(),(req,res)=>{
  const data=req.oidc.user;
  console.log(data);
  res.render('profile.ejs',{data})
  // res.send(JSON.stringify(req.oidc.user))
})

app.get('/courses/:c_id',requiresAuth(), async(req,res)=>{
  console.log("recieved in /courses/c:id");
  console.log(req.params)
  const c_id=req.params.c_id;
  console.log(`c_id ${c_id}`)
  try{
    const data = await Course.findOne({c_id});
    res.render('main-course.ejs',{data})
  }catch(e){
    console.log('error occured');
    // console.log(e)
  }
})

app.get('/test',(req,res)=>{
  res.render('test.ejs');
})

app.post('/test/:id',(req,res)=>{
  console.log(req.body)
  console.log(req.params)
  console.log("request recieved")
  res.send("test successful");
})

const port =process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`Listening on the port ${port}`)
})


