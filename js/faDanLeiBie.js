/**
 * Created by Hello on 2016/10/6.
 */
$(function () {

    $(".hard-click").on('click', function () {
        var hight=$(this).siblings("div").height();
        if($(this).children('.down').hasClass('mui-icon-arrowdown')){
            $(this).children('.down').removeClass('mui-icon-arrowdown');
            $(this).children('.down').addClass('mui-icon-arrowup');
            $(this).parent('div').css("height",hight+51+"px");
        }else{
            $(this).children('.down').removeClass('mui-icon-arrowup');
            $(this).children('.down').addClass('mui-icon-arrowdown');
            $(this).parent('div').css("height","51px");
        }
    });
    /*$('.down').on('click',function(){
        var hight=$(this).parent('p').siblings("div").height();
        if($(this).hasClass('mui-icon-arrowdown')){
            $(this).removeClass('mui-icon-arrowdown');
            $(this).addClass('mui-icon-arrowup');
            $(this).parent('p').parent('div').css("height",hight+51+"px");
        }else{
            $(this).removeClass('mui-icon-arrowup');
            $(this).addClass('mui-icon-arrowdown');
            $(this).parent('p').parent('div').css("height","51px");
        }

    })*/
});































