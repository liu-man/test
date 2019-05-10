//选择li标签
var one = document.querySelector(".one");

//选择显示的Box
var box1 = document.querySelector(".box1");

//选取第二个li标签
var two = document.querySelector(".two");

//选择显示的Box
var box2 = document.querySelector(".box2");

//选取第二个li标签
var three = document.querySelector(".three");

//选择显示的Box
var box3 = document.querySelector(".box3");

var four = document.querySelector(".four");
var box4 = document.querySelector(".box4");

var otop =  document.querySelector(".otop");
var obox =  document.querySelector(".obox");

otop.onmouseenter = function(){
    obox.style.display = "block"
}

obox.onmouseleave = function(){
    obox.style.display = "none"
}


one.onmouseenter = function(){
    box1.style.display = "block"
}

one.onmouseleave = function(){
    box1.style.display = "none"
}


two.onmouseenter = function(){
    box2.style.display = "block"
}

two.onmouseleave = function(){
    box2.style.display = "none"
}

three.onmouseenter = function(){
    box3.style.display = "block"
}

three.onmouseleave = function(){
    box3.style.display = "none"
}

four.onmouseenter = function(){
    box4.style.display = "block"
}

four.onmouseleave = function(){
    box4.style.display = "none"
}