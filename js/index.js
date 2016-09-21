/**
 * Created by Hello on 2016/9/19.
 */
//设置轮播图的小圆点的样式
function createYuan() {
    //轮播图小圆点的生成
    var slider = $('#slider').get(0);
    var ol = document.createElement("ol");
    slider.appendChild(ol);
    var sliderUl = slider.children[0];
    var lis = sliderUl.children;
    for (var i = 0; i < lis.length - 2; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        li.appendChild(a);
        ol.appendChild(li);
    }
    //设置轮播图的小圆点的样式
    ol.children[0].className = "active";

}
//轮播图滚动
var scrollPic = function () {
    var slider = $('#slider').get(0);
    var width = slider.offsetWidth;
    console.log(width);
    var imgBox = slider.children[0];
    var pointBox = slider.children[1];
    var index = 1;
    var timer = null;
    var $ul=$('#slider').find('ul');
    $ul.css("transform","translateX(" + index * width * (-1) + "px)");
    //imgBox.style.transform = "translateX(" + index * width * (-1) + "px)";
//    加过渡
    function addTransition() {
       // imgBox.style.transition = "all .3s ease 0s";
       // imgBox.style.webkitTransition = "all .3s ease 0s";
        $ul.css('transition',"all .3s ease 0s");
    }

//    除去过渡
    function removeTransition() {
        //imgBox.style.transition = "none";
        //imgBox.style.webkitTransition = "none";
        $ul.css('transition',"none");
    }

    //图片移动
    function setTransform(t) {
        //imgBox.style.transform = "translateX(" + t + "px)";
        //imgBox.style.webkitTransform = "translateX(" + t + "px)";
        $ul.css('transform',"translateX(" + t + "px)");
    }

    function yuanPlay(index) {
        for (var i = 0; i < pointBox.children.length; i++) {
            pointBox.children[i].className = "";
        }
        if (index > 3) {
            pointBox.children[0].className = "active";
        } else {
            pointBox.children[index - 1].className = "active";
        }
    }

    function autoPlay() {
        index++;
        addTransition();
        setTransform(-index * width);
        /*轮播图小圆点的滚动*/
        yuanPlay(index);
    }

    //定时器
    timer = setInterval(autoPlay, 3000);

    //添加每张图片过渡完成时的事件
    imgBox.addEventListener("transitionEnd", function () {
        if (index >= 4) {
            index = 1;
        } else if (index <= 0) {
            index = 3;
        }
        removeTransition();
        setTransform(-index * width);
    }, false);
    imgBox.addEventListener('webkitTransitionEnd', function () {

        if (index >= 4) {
            index = 1;
        } else if (index <= 0) {
            index = 3;
        }
        removeTransition();
        setTransform(-index * width);
    }, false);
    var startX = 0;
    var endX = 0;
    //    触摸开始
    slider.addEventListener('touchstart', function (e) {
        e.stopPropagation();
        e.preventDefault();
        //开始的坐标
        startX = e.touches[0].clientX;
        console.log(startX);
    }, false);
    //触摸移动
    imgBox.addEventListener("touchmove", function (e) {
        e.preventDefault();
        clearInterval(timer);
        //移动的坐标
        endX = e.touches[0].clientX;
        var result = startX - endX;
        removeTransition();
        //移动的距离
        setTransform(-index * width - result);
    }, false);
    //触摸结束
    imgBox.addEventListener("touchend", function (e) {
        e.preventDefault();
        var result = startX - endX;
        //移动的距离大于屏幕的三分之一时，就滚动到下一张图片，否则滚动到原来的位置
        if (Math.abs(result) > width / 3) {
            result > 0 ? index++ : index--;
        }
        addTransition();
        setTransform(-index * width); //吸附效果
        //滚动式圆点也跟着改变
        var i = index;
        if (i >= 4) {
            i = 1;
        } else if (i <= 0) {
            i = 3;
        }
        yuanPlay(i);
        //清除定时器
        clearInterval(timer);
        startX = 0;
        endX = 0;
        //开始定时器
        timer = setInterval(autoPlay, 3000);

    }, false);
};
$(function () {
    //轮播图小圆点的生成
    createYuan();
    //轮播图
    scrollPic();
});

