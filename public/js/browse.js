// elm = document.querySelector("[data-class='Frontend']");

// elm.addEventListener("click", () => {
//   let frontEnd = document.querySelectorAll(".Frontend");
//   let courseItems = document.querySelectorAll(".course-item");
//   for (let j = 0; j < courseItems.length; j++) {
//     courseItems[j].classList.remove("hide");
//     courseItems[j].classList.add("hide");
//     // console.log(courseItems[j]);
//   }
//   for (let i = 0; i < frontEnd.length; i++) {
//     frontEnd[i].classList.remove("hide");
//     console.log(frontEnd[i]);
//   }
// });

// plm = document.querySelector("[data-class='Algorithm']");
// plm.addEventListener("click", () => {
//   let algorithm = document.querySelectorAll(".Algorithim");
// let courseItems = document.querySelectorAll(".course-item");
// for (let i = 0; i < courseItems.length; i++) {
//   courseItems[i].classList.remove("hide");
//   courseItems[i].classList.add("hide");
//   // console.log(courseItems[i]);
// }
// for (let i = 0; i < algorithm.length; i++) {
//   algorithm[i].classList.remove("hide");
//   console.log(algorithm[i]);
// }
// });

let btnList = document.querySelectorAll(".btn-category");
let arr = [];
for (let i = 0; i < btnList.length; i++) {
  arr.push(btnList[i].getAttribute("data-class"));
}

for (let i = 0; i < btnList.length; i++) {
  btnList[i].addEventListener("click", () => {
    let divItems = document.querySelectorAll(`.${arr[i]}`);
    console.log(divItems);
    let courseItems = document.querySelectorAll(".course-item");
    for (let j = 0; j < courseItems.length; j++) {
      courseItems[j].classList.remove("hide");
      courseItems[j].classList.add("hide");
      // console.log(courseItems[i]);
    }
    for (let k = 0; k < divItems.length; k++) {
      divItems[k].classList.remove("hide");
      // console.log(divItems[k]);
    }

    let search = document.querySelector("#search");
    search.innerHTML = `${divItems.length} results found for ${arr[i]} `;
  });
}
