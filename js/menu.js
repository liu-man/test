
var enter = document.querySelector(".enter");
var banner1 = document.querySelector("#banner");
var show = document.querySelector(".show");

enter.onmouseenter = function(){
    show.style.display = "block"  
}

banner1.onmouseleave = function(){
    // console.log(show) 
    show.style.display = "none"
}





