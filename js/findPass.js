/**
 * Created by Hello on 2016/9/29.
 */
$(function () {
    $('#findPass-btn').on('click', function () {
        haoma=$('#haoma').val();
        var verify=$('#verify').val();
        /*提醒框3后自动消失*/
        setTimeout(function () {
            $("#toast").css('opacity','0');
        },3000);
        if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(haoma))
        {
            $("#toast").html("手机格式不对");
        }else if(verify.length!=4){
            $("#toast").html("验证码输入错误");
        }else{
            sendAjax(haoma,verify);
            /*if(data['state']=='-1'){
             $("#toast").html("该手机号码已注册");
             }
             else
             $("#toast").html("注册成功");*/
        }
        var $widthToast=$("#toast").width();
        $('#toast').css('marginLeft',(-1)*$widthToast/2+'px');
        $('#toast').show();
    })
    $('#getCode').on('click', function () {
        haoma=$('#haoma').val()
        getCode(haoma);

    });
    //var url='172.28.94.28';
    var url='localhost';
    function getCode(mobile){
        $.ajax({
            type: 'post',
            url: 'http://'+url+':8080/Helper/app/wx.do',
            data: {
                mobile:mobile,
                opt:'0'
            },
            dataType: 'json',
            timeout: 300,
            context: $('body'),
            success: function(data){
                //  假设接受JSON数据
                console.log(data);
            },
            error: function(xhr, type){
                console.log('Ajax error!')
            }
        })
    }
    function sendAjax(mobile,code){
        $.ajax({
            type: 'post',
            url: 'http://'+url+':8080/Helper/app/wx.do',
            data: {
                mobile:mobile,
                code:code,
                opt:'3'
            },
            dataType: 'json',
            timeout: 300,
            context: $('body'),
            success: function(data){
                //  假设接受JSON数据
                console.log(data);
                if(data['state']=='-1'){
                    $("#toast").html(data.msg);
                }
                else{
                    $("#toast").html("网络出小差啦");
                }
                var $widthToast=$("#toast").width();
                $('#toast').css('marginLeft',(-1)*$widthToast/2+'px');
                $('#toast').show();
            },
            error: function(xhr, type){
                console.log('Ajax error!')
            }
        })
    }
});