const navBar= document.querySelector('.nav-bar');
const hamburgerMenu=document.querySelector('.hamber-menu');

hamburgerMenu.addEventListener("click", ()=>{
    const visibility=navBar.getAttribute("data-visible");
    if(visibility==="false"){
        navBar.setAttribute("data-visible",true);
    }else{
        navBar.setAttribute("data-visible",false);
    }
})
