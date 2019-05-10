function Goods(){
    this.list = document.getElementById("list");
    this.url="http://localhost/xiaomi/js/list.json";

    // console.log(this.list)

    this.init();
    //G1绑定点击加入购物车事件
    this.addEvent();

}

Goods.prototype.init = function(){
    var that = this;
    ajaxGet(this.url).then(function(res){
        // console.log(res)
       that.res = JSON.parse(res)
        that.display()
    })
}

//渲染页面
Goods.prototype.display = function(){
    // console.log(this.res)
    var str = "";
    for(var i=0;i<this.res.length;i++){
        str += ` <div class = "tag" index = "${this.res[i].goodsId}">
                    <img src = "${this.res[i].url}" class = "images">
                    <p class = "info">${this.res[i].name}</p>
                    <p class = "price">${this.res[i].price}</p>
                    <em class = "add">加入购物车</em>
                </div>`    
    }
    this.list.innerHTML = str;
}

//添加购物车事件
Goods.prototype.addEvent = function(){
    var that =this;
    this.list.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "add"){
            console.log(target.parentNode)
            that.id = target.parentNode.getAttribute("index");


            //G2.存储cookie
            that.setCookie()
            // console.log(target.className)
        }
    })
}

Goods.prototype.setCookie = function(){
    //存商品货号和对应的数量

    //怎么存：JSON，数组里面放对象，对象内至少有两个键值对，货号和数量

    this.goods = getCookie("goods");
 

    if(this.goods == ""){
        //第一次存，直接存
        this.goods = [{
            id:this.id,
            num:1
        }];
    }else{
        var onoff = true;
        //不是第一次存，先读取，字符，转对象
        this.goods = JSON.parse(this.goods)
        for(var i = 0;i<this.goods.length;i++){
            //老数据
            if(this.goods[i].id == this.id){
                this.goods[i].num++;
                onoff = false;
                break;
            }
        }
        //新数据
        if(onoff){
            //直接添加对象
            this.goods.push({
                id:this.id,
                num:1
            })
        }
    }
    // console.log(this.goods)
    setCookie("goods",JSON.stringify(this.goods))
}




new Goods();
















