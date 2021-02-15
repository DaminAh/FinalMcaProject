const mongoose = require("mongoose");
const Course = require("./models/course");

mongoose
  .connect("mongodb://localhost:27017/chinarDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((err) => {
    console.log("Mongoose connection error");
    console.log(err);
  });

let c = new Course({
  c_name: "Ruby - Programming Language",
  c_des:
    "This video is one in a series of videos where we'll be looking at programming in ruby. The course is designed for new programmers, and will introduce common programming topics using the ruby language.",
  c_id: 20,
  c_no: 20,
  t_name: "Mike Dane",
  t_description:
    "Mike Dane is a developer who loves teaching! He has taught millions of people to code through popular youtube videos, lessons on codecademy.com and in person bootcamps.",
  no_videos: 5,
  urls: [
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/CIe1DxrSrhs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/FTMpGNDw1_8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/IXyPLDJDxcM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/wGlXK-gXj6Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/-AllFkNLDKk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  ],
  domain: "Programming",
  domain_id: 4,
});

c.save()
  .then((x) => {
    console.log(x);
  })
  .catch((err) => {
    console.log(err);
  });
