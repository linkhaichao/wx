/**
 * Created by Hello on 2016/9/20.
 */
$(function () {

    /*检查是否是微信*/
/*    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (!isWeixin) {
        document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/connect/zh_CN/htmledition/style/wap_err1a9853.css">';
        document.body.innerHTML = '<div class="page_msg"><div class="inner"><span class="msg_icon_wrp"><i class="icon80_smile"></i></span><div class="msg_content">请在微信客户端打开链接</div></div></div>';
    }*/
    localStorage.setItem("loginStatus",null);
    localStorage.setItem("mobileLogin",null);
    localStorage.setItem("usernameLogin",null);
    localStorage.setItem("imgSrc",null);
    $('#login-btn').on('click', function () {
        var haoma=$('#haoma').val();
        var password=$('#password').val();
        /*提醒框3后自动消失*/
        setTimeout(function () {
            $("#toast").css('opacity','0');
        },3000)
        if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(haoma))
        {
            //console.log('手机格式不对');
            $("#toast").html("手机格式不对");
        }else if (password.length<6||password.length>18){
            //console.log('密码应在6位-18位');
            $("#toast").html("密码应在6位-18位");
        }else{
            loginFn(haoma,password);
        }
        var $widthToast=$("#toast").width();
        $('#toast').css('marginLeft',(-1)*$widthToast/2+'px');
        $('#toast').show();
    })
    /*登陆ajax*/
    var url='localhost'
    function loginFn(mobile,password){
        $.ajax({
            type: 'post',
            url: 'http://'+url+':8080/Helper/app/wx.do',
            data: {
                mobile:mobile,
                opt:'2',
                pwd:password
            },
            dataType: 'json',
            timeout: 300,
            context: $('body'),
            success: function(data){
                //  假设接受JSON数据
                //his.append(data.project.html)
                console.log(data);
                if(data.state==0){
                    $("#toast").html(data.msg);
                    var $widthToast=$("#toast").width();
                    $('#toast').css('marginLeft',(-1)*$widthToast/2+'px');
                    $('#toast').show();

                    mobileLogin=data.mobile;
                    usernameLogin=data.username;
                    localStorage.setItem("loginStatus",data.msg);
                    localStorage.setItem("mobileLogin",data.mobile);
                    localStorage.setItem("usernameLogin",data.username);
                    localStorage.setItem("imgSrc",data.icon);
                    setTimeout(function () {
                        window.location.href=document.referrer;
                    },2000)
                }else{
                    $("#toast").html(data.msg);
                    var $widthToast=$("#toast").width();
                    $('#toast').css('marginLeft',(-1)*$widthToast/2+'px');
                    $('#toast').show();
                }
                //window.location.href='http://localhost:8080/Helper/NiuRenBang/index.html'
            },
            error: function(xhr, type){
                alert('Ajax error!')
            }
        })
    }
});































