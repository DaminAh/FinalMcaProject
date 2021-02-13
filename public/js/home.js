console.log('connected');

let _data = {title: "foo",body: "bar",userId: 1}
forms=document.querySelectorAll('.myForm');
let urlStrings=[];

// for(let i=0;i<forms.length;i++){
//   urlStrings.push(forms[i].attributes.action.value)
// }

// async function makePost(str) {
// try {
//   console.log(str)
//       const response = await fetch(str, {method: "post",body: yourData});
//       const result = await response.json(); // if your server returns json.
//   }
//   catch(e){ console.log('error') }
// }


for(let i=0;i<forms.length;i++){
  forms[i].addEventListener('submit', async function(e){
    e.preventDefault();
    this.btn.innerHTML='Added to playlist'
    setTimeout(()=>{this.btn.innerHTML='+Playlist'},2000)
    let str=this.attributes.action.value;
    try {
      const response = await fetch(str, {
        method: "post",
        body: JSON.stringify(_data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const result = await response.json(); // if your server returns json.
      console.log(result)
    } catch (e) {
      
    }
    
    // makePost(urlStrings[i])
    })
  }


  
  
  

// function pushUrl(tempForm){
//   let str= tempForm.attributes.action.value;
//   let index=urlStrings.indexOf(str)
//   if(index==-1){
//     urlStrings.push(str)
//   }}



  
