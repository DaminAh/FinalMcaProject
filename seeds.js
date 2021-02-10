const mongoose = require('mongoose');
const Jscourse = require('./models/course');

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

const c = new Jscourse({
  c_name: "Java Script Bootcamp",
  c_des: "Java script is the language of web.It is what gives behaviour to our sites and makes them dynamic.In this course we cover the basics of JS and also touch upon some advanded JS concepts.zThis course will set you up for making Java script projects",
  c_id: 1,
  c_no: 1,
  t_name: 'Hitesh Choudry',
  t_description: 'Hitesh Choudhary is a teacher and Youtuber where has taught thousands of students.He has made multiple course that cover a wide range of web development subjects but his main domain has always been Java script',
  no_videos: 5,
  urls: ['https://www.youtube.com/watch?v=2md4HQNRqJA&list=PLRAV69dS1uWSxUIk5o3vQY2-_VKsOpXLD', 'https://www.youtube.com/watch?v=papg2tsoFzg&list=PLRAV69dS1uWSxUIk5o3vQY2-_VKsOpXLD&index=2', 'https://www.youtube.com/watch?v=BMKWdLX9w3M&list=PLRAV69dS1uWSxUIk5o3vQY2-_VKsOpXLD&index=3', 'https://www.youtube.com/watch?v=7z-VseyACaE&list=PLRAV69dS1uWSxUIk5o3vQY2-_VKsOpXLD&index=4', 'https://www.youtube.com/watch?v=ycLqC41TO1U&list=PLRAV69dS1uWSxUIk5o3vQY2-_VKsOpXLD&index=5'],
  domain: "Java Script"
});

c.save()
.then(x=>{
  console.log(x);
})
.catch(err=>{
  console.log(err)
})