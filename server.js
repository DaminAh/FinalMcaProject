const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const { auth, requiresAuth } = require("express-openid-connect");
const Course = require("./models/course");
const Playlist = require("./models/playlist");
const Review = require("./models/review");
const { json } = require("express");
require("dotenv").config();

// app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view-engine", "ejs");

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

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

// Root of web On auth display home else display login
app.get("/", async (req, res) => {
  // console.log(req.oidc.isAuthenticated())
  if (req.oidc.isAuthenticated()) {
    const data = await Course.find({
      c_id: {
        $lt: 10,
      },
    });
    res.render("home-page.ejs", {
      data,
    });
  } else {
    // console.log(req.params);
    res.render("front-page.ejs");
  }
});

// To display profile
app.get("/profile", requiresAuth(), (req, res) => {
  const data = req.oidc.user;
  // console.log(data);
  res.render("profile.ejs", {
    data,
  });
});

// All courses
app.get("/courses", requiresAuth(), async (req, res) => {
  const data = await Course.find({});
  // console.log(data[0]);
  res.render("all-courses.ejs", { data });
});

app.get("/courses/browse", requiresAuth(), async (req, res) => {
  const data = await Course.find({});
  // console.log(data[0]);
  res.render("browse.ejs", { data });
});

// To display a particular course
app.get("/courses/:c_id", requiresAuth(), async (req, res) => {
  const c_id = req.params.c_id;
  // console.log(`c_id ${c_id}`);
  try {
    const data = await Course.findOne({
      c_id,
    });
    const beta = await Review.findOne({
      c_id,
    });
    let totalStars;
    if (beta != null) {
      const arr = beta.users_data;
      totalStars = 0;
      for (let x of arr) {
        totalStars = totalStars + x.stars;
      }
      len = arr.length;
      totalStars = totalStars / len;
      // console.log(`total stars ${totalStars}`);
    } else {
      totalStars = null;
    }
    await res.render("main-course.ejs", {
      data,
      beta,
      totalStars,
    });
  } catch (e) {
    console.log(e);
    console.log("error occured");
  }
});

// To display playlist of a user
app.get("/playlist", requiresAuth(), async (req, res) => {
  const { email } = req.oidc.user;
  let name = [];
  let subject = [];
  let teacher = [];
  let data = await Playlist.findOne({
    email,
  });
  if (data) {
    // console.log(data);
    const len = data.playIds.length;
    // console.log(len);
    for (let i = 0; i < len; i++) {
      let beta = await Course.findOne({ c_id: data.playIds[i] });
      // console.log(beta.c_name)
      teacher.push(beta.t_name);
      name.push(beta.c_name);
      subject.push(beta.domain);
    }
    // console.log(name, subject)
    res.render("playlist.ejs", {
      data,
      name,
      subject,
      teacher,
    });
  } else {
    console.log("came in else of '/playlist'");
    data = null;
    res.render("playlist.ejs", {
      data,
    });
  }
});

// To add a new course to the playlist
app.post("/playlist/:id", requiresAuth(), async (req, res) => {
  console.log("request recieved in playlist/id");
  console.log(req.params);
  console.log("*******************8");
  const { id } = req.params;
  const email = req.oidc.user.email;
  let userExists;
  try {
    userExists = await Playlist.findOne({
      email,
    });
  } catch (e) {
    console.log(e);
  }
  // console.log(userExists)
  // console.log(userExists);
  if (userExists) {
    const arr = userExists.playIds;
    console.log("came in else of /playlist/:id");
    index = arr.indexOf(id);
    if (index == -1) {
      arr.push(id);
      arr.reverse();
      userExists.playIds = [];
      userExists.playIds = arr;
      try {
        await userExists.save();
      } catch (e) {
        console.log(e);
      }
    }
    res.redirect(`/courses/${id}`);
  } else {
    console.log("came in else of '/playlist/id'");
    const c = new Playlist({
      email: email,
      playIds: [id],
    });
    c.save()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect(`/courses/${id}`);
  }
});

// To remove a course from playlist
app.delete("/playlist/:id", requiresAuth(), async (req, res) => {
  const email = req.oidc.user.email;
  console.log(req.params);
  const { id } = req.params;
  console.log(`id recieved ${id}`);
  const data = await Playlist.findOne({
    email: email,
  });
  // console.log(data);
  const arr = data.playIds;
  const index = arr.indexOf(id);
  arr.splice(index, 1);
  await data.save();
  console.log(arr, id);
  res.redirect("/playlist");
});

// To post a Review
app.post("/review/:id", requiresAuth(), async (req, res) => {
  // console.log(req.body);
  const { review, stars } = req.body;
  const { id } = req.params;
  const { email, name } = req.oidc.user;

  const course_exists = await Review.findOne({
    c_id: id,
  });
  if (!course_exists) {
    const first_review = new Review({
      c_id: id,
      users_data: {
        name: name,
        stars: stars,
        email: email,
        review: review,
      },
    });
    await first_review
      .save()
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  } else {
    const arr = course_exists.users_data;
    const arr_already = arr.find((element) => element.email == email);
    if (!arr_already) {
      arr.push({
        name: name,
        stars: stars,
        email: email,
        review: review,
      });
      await course_exists
        .save()
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
    } else {
      let index = arr.indexOf(arr_already);
      console.log(`found at index ${index}`);
      const removed = arr.splice(index, 1);
      console.log(`removed data is: ${removed}`);
      arr.splice(index, 0, {
        name: name,
        stars: stars,
        email: email,
        review: review,
      });
      course_exists.users_data = arr;
      await course_exists
        .save()
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
    }
  }
  res.redirect(`/courses/${req.params.id}`);
});

// app.get("/test", (req, res) => {
//   res.render("test.ejs");
// });

// app.post("/test/:id", (req, res) => {
//   console.log(req.body);
//   console.log(req.params);
//   console.log("request recieved");
//   let str = {
//     UserName: "xxx",
//     Rolename: "yyy",
//   };
//   str = JSON.stringify(str);
//   console.log(str);
//   return JSON.stringify(str);
//   res.redirect("/");
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on the port ${port}`);
});
