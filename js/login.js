class Login{
    constructor(){
        this.url = "http://www.icodeilife.cn/ctrl/login.php";
        this.btn = $("#btn");
        this.user = $(".user")[0];
        this.pass = $(".pass")[0];
        // this.span = $("span");

        this.init()
    }
    init(){
        var that = this;
        this.btn.click(function(){
            that.load()
        })
    }
    load(){
        var that = this;
        $.ajax({
            url:this.url,
            data:{
                user:this.user.value,
                pass:this.pass.value
            },
            success:function(res){
                switch(res){
                    case "0":
                        alert("用户名密码不符");break;
                        // that.span.html("用户名密码不符");break;
                    case "1":
                        alert("请重新登陆");break;
                        // that.span.html("请重新登陆");break;
                    default:
                        alert("登录成功，正在跳转");
                        // that.span.html("登录成功，正在跳转");
                        that.res = JSON.parse(res);
                        that.setCookire()
                }
            },
            beforeSend:function(){
                
            }
        })
    }
    setCookire(){
        // console.log(this.res)
        // setCookie("user",111, {expires:7})
        // document.cookie = "test1=newCookie;"
        window.location.href='./index.html'
    }
}
// 设置：
        // cookie的名字
        // cookie的值
        // cookie的有效期
        // cookie的路径
function setCookie(key,value,options){
    options = options || {};
    if(options.expires){
        var d = new Date();
        d.setDate(d.getDate() + options.expires)
        var str = ";expires="+d;
    }else{
        var str = "";
    }

    var path = options.path ? ";path="+options.path : "";
    
    document.cookie = key+"="+value + str + path;
    console.log(document.cookie)
}

new Login()