/**
 * Created by Administrator on 2016/10/11.
 */
$(function () {
    var now=true;
    $("#jieDanSel>div").on('click', function () {
        console.log("11");
        $("#jieDanSel>div").children('.selectJie').css({
            'display':'none'
        }).children('.selectJie').find('div').css({
            'transform':'translateY(-100%)'
        });
        that=$(this);
        $(this).children('.selectJie').css({
            'display':'block'
        });
        if(now){
            setTimeout(function () {
                that.children('.selectJie').find('div').css({
                    'transform':'translateY(0)'
                });
            },100);
            now=!now;
        }else{
            that=$(this);
            that.children('.selectJie').find('div').css({
                'transform':'translateY(-100%)'
            });
            setTimeout(function () {
                that.children('.selectJie').css({
                    'display':'none'
                });
            },100);
            now=!now;
        }

    })

});