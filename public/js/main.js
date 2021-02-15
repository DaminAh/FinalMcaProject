console.log("connected");
let btn = document.querySelectorAll(".btn-vid");
console.log(btn);
let len = btn.length;
for (let i = 0; i < len; i++) {
  btn[i].addEventListener("click", () => {
    let iframe = btn[i].getAttribute("data-iframe");
    console.log(iframe);
    let iframeCont = document.querySelector(".iframe-cont");
    iframeCont.innerHTML = "";
    iframeCont.innerHTML = btn[i].getAttribute("data-iframe");
  });
}

// Playlist Functionality Start
const form = document.querySelector("#add-playlist");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  this.btn.innerHTML = "Added to playlist";
  let str = this.attributes.action.value;
  axios
    .post(str, {
      firstName: "Fred",
      lastName: "Flintstone",
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});
// Playlist Functionality End

let bool = true;
const show = document.querySelector("#show");
show.addEventListener("click", () => {
  content = document.querySelector("#contentofsite");
  if (bool) {
    bool = false;
    content.classList.remove("hide");
  } else {
    content.classList.add("hide");
    bool = true;
  }
});

//   form.addEventListener('submit', async function(e){
//     e.preventDefault();
//     try {
//       const response = await fetch('/playlist/1', {
//         method: "post",
//         body: JSON.stringify(_data),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8"
//         }
//       });
//       console.log(str)
//       const result = await response.json(); // if your server returns json.
//       console.log(result)
//     } catch (e) {
//       console.log(e)
//     }
//     this.btn.innerHTML='Added to playlist'
//     setTimeout(()=>{this.btn.innerHTML='+Playlist'},2000)
//     let str=this.attributes.action.value;
//     })
