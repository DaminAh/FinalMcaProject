console.log('connected')
let btn=document.querySelectorAll('.btn-vid');
console.log(btn)
let len=btn.length;
for(let i=0;i<len;i++){
  btn[i].addEventListener('click',()=>{
    let iframe=btn[i].getAttribute("data-iframe");
    console.log(iframe);
    let iframeCont=document.querySelector('.iframe-cont');
    iframeCont.innerHTML='';
    iframeCont.innerHTML=btn[i].getAttribute("data-iframe");
  })
}
