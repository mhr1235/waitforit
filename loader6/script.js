
let btn_toggle= document.querySelector(".btn-toggle");
let icon= document.querySelector(".cover");
let cyber = document.querySelector('#cyber');
let follow = document.querySelector('#follow');


setTimeout(function(){
    //console.log("Hello World");
  icon.style.zIndex = 0;
}, 4000);
 

btn_toggle.addEventListener("click", function(){
  if(btn_toggle.textContent==="+") {
    this.textContent= "-";
  } else {
    this.textContent= "+";
  }
},false);


cyber.addEventListener('click', ()=>{
  window.location.href = 'https://mhr1235.github.io/where_is_the_cyberpunk_we_were_promised/loader2/index.html';
})

follow.addEventListener('click', ()=>{
  window.location.href = 'https://mhr1235.github.io/where_is_the_cyberpunk_we_were_promised/loader1/index.html';
})