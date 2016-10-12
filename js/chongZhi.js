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

    $('#btn-chongzhi').on('click', function () {
        var chongZhi=$('#chongzhi-money > div:nth-of-type(2) p input').val();
        /*提醒框3后自动消失*/
        setTimeout(function () {
            $("#toast").css('opacity','0');
        },3000)
        if(chongZhi.length==0)
        {
            $("#toast").html("输入金额不能为空,请重新输入");
        }
        else if(!$('#chongzhi-method > div:nth-of-type(2) p input').attr("checked")){
            console.log($('#chongzhi-method > div:nth-of-type(2) p input').attr("checked"));
            $("#toast").html("请选择充值方式");
        }else{
            chongZhiFn(chongZhi);

        }
        var $widthToast=$("#toast").width();
        $('#toast').css('marginLeft',(-1)*$widthToast/2+'px');
        $('#toast').show();
        /*$("#toast").html("登录成功").fadeIn();
         console.log('登录成功');*/
    })

    $('#chongzhi-method > div:nth-of-type(2) p input').on('click', function () {
        $(this).attr('checked')?$(this).removeAttr("checked"):$(this).attr('checked','checked');
        if($(this).attr('checked')){
            $(this).css({
                'backgroundImage':"url(img/checked.png)",
                'backgroundSize':"19px 19px ",
                'border':'0'
            });
        }else{
            $(this).css({
                'backgroundImage':"none",
                'border':'1px solid #B3B3B3'
            });
        }
    })

    /*充值ajax*/
    var url='localhost'
    function chongZhiFn(amount){
        $.ajax({
            type: 'post',
            url: 'http://'+url+':8080/Helper/app/wx.do',
            data: {
                amount:amount,
                opt:'51'
            },
            dataType: 'json',
            timeout: 300,
            context: $('body'),
            success: function(data){
                //  假设接受JSON数据
                //his.append(data.project.html)
                console.log(data);
                if(data){
                    if(data.state==0){
                        $("#toast").html(data.msg);

                    }
                }else{
                    $("#toast").html("服务器出小差啦！");
                }
                var $widthToast=$("#toast").width();
                $('#toast').css('marginLeft',(-1)*$widthToast/2+'px');
                $('#toast').show();
            },
            error: function(xhr, type){
                alert('Ajax error!')
            }
        })
    }

});































