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

    $('#pass-btn').on('click', function () {
        var oldPassword=$('#oldPassword').val();
        var newPassword=$('#newPassword').val();
        var okPassword=$('#okPassword').val();
        /*提醒框3后自动消失*/
        setTimeout(function () {
            $("#toast").css('opacity','0');
        },3000);
        if (oldPassword.length==0||newPassword.length==0||okPassword==0){
            $("#toast").html("密码不能为空");
        }else if (oldPassword.length<6||oldPassword.length>18||newPassword.length<6||newPassword.length>18||okPassword.length<6||okPassword.length>18){
            //console.log('密码应在6位-18位');
            $("#toast").html("密码应在6位-18位");
        }else if(oldPassword===newPassword){
            $("#toast").html("原密码和新密码应该不一样,请重新输入");
        }else if(newPassword!=okPassword){
            $("#toast").html("两次输入的密码不一致,请重新输入");
        }else{
            /*以下功能需完善*/
            modifyPassFn(oldPassword,newPassword)
        }
        var $widthToast=$("#toast").width();
        $('#toast').css('marginLeft',(-1)*$widthToast/2+'px');
        $('#toast').show();
    })

    /*修改密码ajax*/
    var url='localhost'
    function modifyPassFn(oldPassword,newPassword){
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
                }
                window.location.href='http://localhost:8080/Helper/NiuRenBang/index.html'

            },
            error: function(xhr, type){
                alert('Ajax error!')
            }
        })
    }

});































