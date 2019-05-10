

;(function($){
    "use strict";
    //没有操作页面，只是实现了某个功能，比如ajax，cookie，这种适合JQ的全局方法
    //$.extend()
    //$.liyang = function(){}

    //有操作到页面，比如长沙市，load，attr，width，这种适合jq的局部（dom）方法
    //$.fn.extend()
    //$.fn.liyang = function(){}

    $.fn.extend({
        banner:function(options){
            //当前被绑定到JQ的DOM对象上的方法内的THIS,指向当前方法被调用时，选择的
            // jq的DOM元素
            //console.log(this)

            var bannerObj = {
                index:0,
                iPrev:options.items.length-1
            };
            //options.items
            //left和right不用处理默认参数。有就做，没有就不做
            if(options.list == undefined || options.list == true){
               
                bannerObj.list = true;
            }else{
                bannerObj.list = false;
            }

            if(options.autoPlay == undefined ||options.autoPlay == true){
                bannerObj.autoPlay = true;
                
            }else{
                bannerObj.autoPlay = false;
            }

            bannerObj.delayTime = options.deleayTime || 2000;
            bannerObj.moveTime = options.moveTime || 200;

            //list的功能
            if(bannerObj.list){
                //l1.生成布局
                var $ul = $("<ul>");
                $ul.addClass('list');
                for(var i = 0;i<options.items.length;i++){
                $ul.append($("<li>"+"</li>"))
                }
                this.append($ul)
                $ul.css({
                    width:"100%",
                    height:"10px",
                    lineHeight:"10px",
                    display:"flex",
                    position:"absolute",
                    bottom:"10px",
                    left:"400px",
                    // background:"rgba(200,200,200,0.6)",
                    margin:0,
                    padding:0,
                    
                }).children("li").css({
                    width:"10px",
                    height:"10px",
                    borderRadius:"50%",
                    // border-radius:"50%",
                    // flex:"1",
                    textAlign:"center",
                    listStyle:"none",
                    // borderLeft:"solid 1px black",
                    // borderRight:"solid 1px black"
                }).eq(bannerObj.index).css({
                    background:"#e7e7e7",
                })

                //L2给list的li绑定事件
                $ul.children("li").on("click",function(){
                    //l3-1点击的比当前大 左
                    if($(this).index() > bannerObj.index){
                        console.log($(this).index())
                        bannerObj.listMove($(this).index(),1)
                    }
                    if($(this).index() < bannerObj.index){
                        bannerObj.listMove($(this).index(),-1)
                    }

                    //L5一次点击之后，本次点击的就是下次的当前
                    bannerObj.index = $(this).index();
                    //L6设置当前li 的当前项
                    $(this).css({
                        background:"#333",
                    }).siblings().css({
                       background:""
                    })
                })
                //list的move功能
                bannerObj.listMove = function(iNow,type){
                    options.items.eq(bannerObj.index).css({
                        left:0
                    }).stop().animate({
                        left:-options.items.eq(0).width() * type
                    },bannerObj.moveTime)

                    options.items.eq(iNow).css({
                        left:options.items.eq(0).width() * type
                    }).stop().animate({
                        left:0
                    },bannerObj.moveTime)
                }
            }
                function rightClick(){
                    
                    //B3-2计算索引，要走的和要进来的
                    if(bannerObj.index == options.items.length-1){
                        
                        bannerObj.index = 0;
                        bannerObj.iPrev = options.items.length -1; 
                    }else{
                        bannerObj.index++
                        bannerObj.iPrev = bannerObj.index - 1
                    }
                    //b4-2 开始移动向左移动
                    bannerObj.btnMove(1)
                }

            

                function leftClick(){
                    if(bannerObj.index == 0){
                        
                        bannerObj.index = options.items.length-1;
                        bannerObj.iPrev = 0
                    }else{
                        bannerObj.index--;
                        bannerObj.iPrev =bannerObj.index + 1;
                    }
                    bannerObj.btnMove(-1)
                }
                //btn的移动功能
                bannerObj.btnMove = function(type){  
                    options.items.eq(bannerObj.iPrev).css({
                        left:0
                    }).stop().animate({
                        left:-options.items.eq(0).width() * type
                    },bannerObj.moveTime)
                    options.items.eq(bannerObj.index).css({
                        left:options.items.eq(0).width() * type
                    }).stop().animate({
                        left:0
                    },bannerObj.moveTime) 
                    
                    if(bannerObj.list){
                        //设置li 的当前项
                        $ul.children("li").css({
                            background:""
                        }).eq(bannerObj.index).css({
                            background:"#333"
                        })
                    }
                }

                //B1.判断是否传入左右按钮
                if(options.left != undefined && options.right.length !=0 && options.right != undefined && options.right.length != 0  ){
                    //B2-1.绑定事件
                    options.left.on("click",leftClick)
                    //B2-2.绑定事件
                    options.right.on("click",rightClick)
                }

                //A1判断是否自动播放
                if(bannerObj.autoPlay){
                    //A2开启计时器，模拟右键执行，实现自动播放
                    bannerObj.timer = setInterval(() => {
                        rightClick()
                    },bannerObj.delayTime);
                    //A3给大框添加鼠标进入和离开事件，进入停止，离家继续
                    this.hover(function(){
                        clearInterval(bannerObj.timer)
                    },function(){
                        bannerObj.timer = setInterval(() =>{
                            rightClick()
                        },bannerObj.delayTime);
                    })
                }
        }
    })


})(jQuery);