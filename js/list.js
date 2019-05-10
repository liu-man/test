

function Goods(options){

    this.list = options.list;
    this.url = options.url;
    this.num = options.num;
    this.index = options.index;

    //请求数据
    this.load()
}


Goods.prototype.load = function(){
   
    ajaxGet(this.url,(res)=>{
       
        //把字符转成为对象
        this.res = JSON.parse(res)
        
        //渲染商品列表
        this.display()
    })
}

Goods.prototype.display = function(){


    //渲染页面的功能
    var str = "";
    for (var i = this.num*this.index;i < this.num*this.index+this.num;i++){
        if(i<this.res.length){    
            str += ` <div class = "tag">
                        <img src = "${this.res[i].url}" >
                        <p class = "info">${this.res[i].name}</p>
                        <p class = "price">${this.res[i].price}</p>
                        <em class="add">加入购物车</em>
                    </div>`           
        }
    }
    this.list.innerHTML = str;
}

new Goods({
    url:"http://localhost/xiaomi/js/list.json",
    list:document.getElementById("list"),
    num:10000000,
    index:0
    
})



