const Review = require("./models/review");
const mongoose = require("mongoose");

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

const c = new Review({
  c_id: 1,
  users_data: [
    {
      name: "theancientslayer",
      email: "theancientslayer@gmail.com",
      review:
        "Spectacular! Jonas has put so much effort into making sure that you don't just complete an assignment, but that you actually deeply understand why it works the way it does in the first place. Impossible to fault, hands down the best course I've ever bought, I've also completed his CSS masterclass which was brillian",
      stars: 5,
    },
    {
      name: "Damin Ahmad",
      email: "daminahmad@gmail.com",
      review:
        "Love the pace of this course. The instructions and guidance are clear and easy to understand. I always thought learning JavaScript would be an uphill battle, but spending an hour everyday before work watching these videos has helped me improve very quickly.",
      stars: 4,
    },
    {
      name: "daminahmad247",
      name: "daminahmad7",
      email: "daminahmad7@gmail.com",
      review:
        "This course shows how much Jonas loves what does and cares about the success of his students. It was so good, that I went ahead and purchased all of his courses. Thank you Jonas for all the value you provided in this and every course of yours.",
      stars: 3,
    },
    {
      email: "daminahmad247@gmail.com",
      review:
        "The videos are much longer compared to the other courses I took but that is because Jonas is always explaining every little detail of the process and also repeats the explanations throughout the course that helps in memory reenforcement.",
      stars: 4,
    },
  ],
});

c.save()
  .then((x) => {
    console.log(x);
  })
  .catch((err) => {
    console.log(err);
  });
