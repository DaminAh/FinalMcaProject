let formOne=document.querySelector('#form-one');
console.log('working');
formOne.addEventListener('submit',async (e)=>{
  // e.preventDefault()
  // console.log('in from');
  // const c=axios.post('http://localhost:3000/test', {
  //   firstName: 'Fred',
  //   lastName: 'Flintstone'
  // }).then(function(response) {
  //   console.log(response);
  // })
  // console.log('post made')
  // console.log(c)
})

s=document.querySelector('#haha')
console.log('working')
s.addEventListener('click',e=>{
  console.log('working inside')
  console.log(" s clicked")
  axios.post('/test', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
})