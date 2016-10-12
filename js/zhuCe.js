/**
 * Created by Hello on 2016/9/28.
 */
$(function () {
    var rate=-1;
    var leixing=document.getElementById("leixing");
    var picker = new mui.PopPicker();
    var haoma=haoma=$('#haoma').val();
    picker.setData([{value:'0',text:'个人'},{value:'1',text:'企业'}]);

    leixing.addEventListener('click', function(event){
        //console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
        picker.show(function (selectItems) {
            leixing.innerHTML=selectItems[0]['text'];
            rate=selectItems[0]['value'];
            console.log(rate);
        })
    },false);

    $('#zhuce-btn').on('click', function () {
        haoma=$('#haoma').val();
        var password=$('#password').val();
        var verify=$('#verify').val();
        var nichen=$('#nichen').val();
        /*提醒框3后自动消失*/
        setTimeout(function () {
            $("#toast").css('opacity','0');
        },3000);
        if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(haoma))
        {
            $("#toast").html("手机格式不对");
        }else if(verify.length!=4){
            $("#toast").html("验证码输入错误");
        }else if(nichen.length==0){
            $("#toast").html("昵称不能为空");
        }else if(rate!='1'&& rate!='0'){
            $("#toast").html("请选择类型");
        }else if (password.length<6||password.length>18){
            //console.log('密码应在6位-18位');
            $("#toast").html("密码应在6位-18位");
        }else{
            sendAjax(haoma,verify,nichen,password,rate);
        }
        var $widthToast=$("#toast").width();
        $('#toast').css('marginLeft',(-1)*$widthToast/2+'px');
        $('#toast').show();
    })
    $('#getCode').on('click', function () {
        haoma=$('#haoma').val()
        console.log(haoma);
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
                //his.append(data.project.html)
                console.log(data);
                if(data['state']=='0'){
                    $("#toast").html(data.msg);
                }
                else{
                    $("#toast").html("获取验证码失败");
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
    function sendAjax(mobile,code,username,password,type){
        $.ajax({
            type: 'post',
            url: 'http://'+url+':8080/Helper/app/wx.do',
            data: {
                mobile:mobile,
                code:code,
                username:username,
                pwd:password,
                type:type,
                opt:'1'
            },
            dataType: 'json',
            timeout: 300,
            context: $('body'),
            success: function(data){
                //  假设接受JSON数据
                console.log(data);
                if(data['state']=='0'){
                    //注册成功
                    $("#toast").html(data.msg);
                    var $widthToast=$("#toast").width();
                    $('#toast').css('marginLeft',(-1)*$widthToast/2+'px');
                    $('#toast').show();
                    window.location.href='http://localhost:8080/Helper/wx/index.html'
                }
                else{
                    //已注册
                    $("#toast").html(data.msg);
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