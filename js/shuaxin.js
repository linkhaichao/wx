/**
 * Created by Hello on 2016/9/19.
 */

$(function () {

    /*牛人列表刷新*/
    var url='localhost';
    var counter = 0;
    // 每页展示4个
    var num = 4;
    var pageStart = 0,pageEnd = 0;
    var url="localhost";
    // dropload
    $('#niu-engineer').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData">暂无数据</div>'
        },
        loadUpFn : function(me){
            $.ajax({
                type: 'post',
                url: 'http://'+url+':8080/Helper/app/wx.do',
                dataType: 'json',
                data:{
                    opt:'20'
                },
                success: function(data){
                    console.log(data)
                    var result = '';
                    for(var i = 0; i < data.engineers.length; i++){
                        var imgSrc=data.engineers[i].icon?data.engineers[i].icon:"./img/0.jpg";
                        var renzheng=data.engineers[i].isChecked?"已认证":"未认证";
                        var shengfen=data.engineers[i].province?data.engineers[i].province+"-":"暂无-";
                        shengfen+=data.engineers[i].city?data.engineers[i].city:"暂无";
                        var ability=data.engineers[i].ability?value.ability:"主人很懒，还没设置";
                        result+='<a>'
                            +' <img src="'+imgSrc+'" alt=""/>'
                            +'<div>'
                            +'<p>'+data.engineers[i].username+'<small>'+renzheng+'</small></p>'
                            +'<p>'+shengfen+'</p>'
                            +'<p>'+ability+'</p>'
                            +'</div>'
                            +'</a>';
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                            $('#engineer-list').html(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                        // 重置索引值，重新拼接more.json数据
                        counter = 0;
                        // 解锁
                        me.unlock();
                        me.noData(false);
                    },1000);
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        },
        loadDownFn : function(me){
            $.ajax({
                type: 'post',
                url: 'http://'+url+':8080/Helper/app/wx.do',
                dataType: 'json',
                data:{
                    opt:'20'
                },
                success: function(data){
                    console.log(data);
                    var result = '';
                     counter++;
                     pageEnd = num * counter;
                     pageStart = pageEnd - num;
                    console.log(data.engineers.length);
                    for(var i = pageStart; i < pageEnd; i++){
                        var imgSrc=data.engineers[i].icon?data.engineers[i].icon:"./img/0.jpg";
                        var renzheng=data.engineers[i].isChecked?"已认证":"未认证";
                        var shengfen=data.engineers[i].province?data.engineers[i].province+"-":"暂无-";
                        shengfen+=data.engineers[i].city?data.engineers[i].city:"暂无";
                        var ability=data.engineers[i].ability?value.ability:"主人很懒，还没设置";
                        result+='<a>'
                        +' <img src="'+imgSrc+'" alt=""/>'
                        +'<div>'
                        +'<p>'+data.engineers[i].username+'<small>'+renzheng+'</small></p>'
                        +'<p>'+shengfen+'</p>'
                        +'<p>'+ability+'</p>'
                        +'</div>'
                        +'</a>';
                        if((i + 1) >= data.engineers.length){
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            break;
                        }
                    }
                    /*console.log(result);
                    var source = '{{each engineers as value i}}'
                        +'<a>'
                        +' <img src="img/0.jpg" alt="">'
                        +'<div>'
                        +'<p>{{value.username}}<small>{{value.isChecked?"已认证":"未认证"}}</small></p>'
                        +'<p>{{value.province?value.province:"暂无"}}-{{value.city?value.city:"暂无"}}</p>'
                        +'<p>{{value.ability?value.ability:"主人很懒，还没设置"}}</p>'
                        +'</div>'
                        +'</a>'
                        +'{{/each}}';

                    var render = template.compile(source);
                    var html = render(data);*/
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                            $('#engineer-list').append(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                    },1000);
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        },
        threshold : 50
    });

});





























