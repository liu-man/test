function Car(){
    this.summarize = document.querySelector("#summarize")
    this.url = "http://localhost/xiaomi/js/list.json"
    // this.del = document.querySelector(".del")
  
    this.init()

    // 绑定事件
    this.addEvent()
}
Car.prototype.init = function (){
    var that = this;
    ajaxGet(this.url).then(function(res){
       
        that.res = JSON.parse(res)
      
        that.getCookie()
    })
}

Car.prototype.getCookie = function(){
    //判断商品是否等于空，如果不等于空，那就转成字符，不然就等于空数组
    this.goods = getCookie("goods")!= "" ? JSON.parse(getCookie("goods")):[];
    this.display()
}

Car.prototype.display = function(){
    var str = ""
    //遍历外面的商品和购物车里的商品，先遍历谁无所谓
    for(var i=0;i<this.res.length;i++){
        for(var j=0;j<this.goods.length;j++){

           

            //如果购物车里的商品ID = 外面商品的ID
            if(this.res[i].goodsId == this.goods[j].id){
                // console.log(this.res[i],this.goods[j].num)
                str += `<div class = "container  index = "${this.goods[j].id}">
                            <div class = " list clear clearfix">
                                <div class = "select">
                                    <a href="#" class = "ico icons"></a>
                                </div>
                                <div id = "tupian" ><img src="${this.res[i].url}"></div>
                                <div class = "name">
                                    <div class = "name1"><p> ${this.res[i].name}</p></div>
                                </div>
                                <div class = "price"><span>${this.res[i].price}</span></div>
                                <div class = "num1">    
                                    <input type="number" min=1 value="${this.goods[j].num}" class="num">    
                                </div>
                                <div class = "subtotal"><span>${this.res[i].price}</span></div>
                                
                                <div class = "del"><em class = "dele" id='${this.res[i].goodsId}'>删除</em></div>
                            </div>
                        </div>`;
            }

        }
    
    }
    this.summarize.innerHTML = str;
    
}


Car.prototype.addEvent = function(){
    var that = this;
    // U1事件委托绑定事件
    this.summarize.addEventListener("input",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className = "num"){
            
            //U2保存输入框的值，和点击的商品的货号
            that.num = target.value;
            
            that.id =  target.parentNode.parentNode.parentNode.getAttribute("index");
            
            //U3执行修改cookie实现修改数量操作
            that.changeCookie(function(i){
                that.goods[i].num = that.num
            })
        }
    })
    // R1事件委托绑定删除事件
    this.summarize.addEventListener("click",function(eve){
        
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "dele"){
            
            //R2存储要删除商品的货号，同时删除dom元素
            that.id = 
            target.parentNode.parentNode.parentNode.getAttribute("index");
            target.parentNode.parentNode.parentNode.remove();
            // R3执行修改cookie实现删除操作
            that.changeCookie(function(i){
                that.goods.splice(0,1)
            })
        }
    })
}
 
Car.prototype.changeCookie = function(callback){
    
    for(var i =0;i<goods.length;i++){
        if(this.goods[i].id == this.id){
            callback(i)
        }
    }
    setCookie("goods",JSON.stringify(this.goods));
}

Car.prototype.removeCookie = function(){
    for(var i=0;i<this.goods.length;i++){
        if(this.goods[i].id == this.id){
            this.goods.splice(0,1);
        }
    }
    setCookie("goods",JSON.stringify(this.goods))
}
    
new Car();