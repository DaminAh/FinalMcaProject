let formOne = document.querySelector('#form-one');
console.log('working again');
formOne.addEventListener('submit', async (e) => {
  // e.preventDefault();
  // try{
  // const a=await fetch("/test/45", { method: "post",body: JSON.stringify({  name: 'hello' })});
  // console.log(formOne.name.value)
  // console.log('in form body');
  // }
  // catch(e){ console.log('error occured',e)
  // }
})

console.log('heheh')

let _data = {
  title: "foo",
  body: "bar",
  userId: 1
}
formOne.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("/test/98", {
      method: "post",
      body: JSON.stringify(_data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = await response.json(); // if your server returns json.
    console.log(result)
  } catch (e) {
    console.log(e) /* handle error */
  }
})