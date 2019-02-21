//* Modal Window
const modalWindow=function(){let a=document.body.querySelectorAll(".our-stores .stores"),b=document.body.querySelector(".modal-window"),c=b.querySelector(".modal-close");return{openWindow:function(){return a.forEach(a=>a.addEventListener("click",c=>{let d=a.querySelector(".more"),e=a.querySelector(".img-store");(c.target==d||c.target==e)&&(document.body.style.overflowY="hidden",b.style.display="block")})),this},closeWindow:function(){c.addEventListener("click",()=>(document.body.style.overflowY="auto",b.style.display="none",this))}}}();

