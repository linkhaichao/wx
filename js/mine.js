/**
 * Created by xieman on 2016/10/4.
 */
$(function () {
    /*完善个人信息*/
    var usernameLogin=localStorage.getItem("usernameLogin");
    var mobileLogin=localStorage.getItem("mobileLogin");
    var loginStatus=localStorage.getItem("loginStatus");
    var imgSrc=localStorage.getItem('imgSrc');
    console.log(imgSrc);
    console.log(loginStatus);
    var tupian;
    if(imgSrc!="null"){
        console.log("进来");
        tupian=imgSrc;
    }else{
        tupian="../img/0.jpg";
    }
    console.log(tupian);
    if(loginStatus=="登录成功"){
        $('.imgSrc').attr('src',tupian);
        $('.usernameLogin').text(usernameLogin);
        //$('.mobileLogin').text(mobileLogin).unbind("click");
        $('.mobileLogin').text(mobileLogin);
        return ;
    }
    /*点击未登陆按钮*/
    $('.mobileLogin').on('click', function () {
        window.location.href="../login.html";
    });


   /*退出登陆*/
    $('#tuichu-btn').on('click',function(){
        window.location.href="./login.html";
    })


});
































