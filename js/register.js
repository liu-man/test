class Login{
    constructor(){
        this.url = "http://www.icodeilife.cn/ctrl/register.php";
        this.btn = $("#btn");
        this.user = $(".user")[0];
        this.pass = $(".pass")[0];
        // this.span = $("span");

        this.init()
    }
    init(){
        var that = this;
        this.btn.click(function(){
            that.load(0)
        })
    }
    load(){
        var that = this;
        $.ajax({
            url:this.url,
            data:{
                // tel:this.user.val(),
                tel:this.user.value,
                // pass:this.pass.val()
                pass:this.pass.value
            },
            success:function(res){
                switch(res){
                    case "0":
                        alert('你的手机号已被注册');break;
                        // that.span.html("你的手机号已被注册");break;
                    case "1":
                        alert('恭喜你，注册成功，3秒后跳转到登录')
                        // that.span.html("恭喜你，注册成功，3秒后跳转到登录");
                        setTimeout(() => {
                            location.href = "login.html";
                        }, 3000);
                        break;
                    case "2":
                        alert('你的数据不全');break;
                        // that.span.html("你的数据不全");break;
                }
            },
            beforeSend:function(){
                // that.span.html("<img src='loading.gif'>")
            }
        })
    }
}


new Login()