/**
 * Created by Hello on 2016/9/29.
 */
$(function () {
    var cityDataResult=[];/*城市列表*/
    $('#fadan-nav span').on('click', function () {
        console.log('11');
        $('#fadan-nav span').removeClass('bgc');
        $(this).addClass('bgc');
    });

        /*产品列表删除事件*/
    $('#proList').on('click','#proList .proListCon > span',function () {
        that=$(this);
        var btnArr=["取消","确认"];
        mui.confirm( "您要删掉这个产品信息?", "删除产品", btnArr, function (e) {
            if(e.index=="1"){
                that.parent('.proListCon').remove();
            }
        })

    });


    /*日期下拉列表*/
    var dtPicker = new mui.DtPicker({
        type:'datetime'
    });
    $("#startTime").on('click', function () {
        dtPicker.show(function (selectItems) {
            console.log(selectItems.text);
            $("#startTime").val(selectItems.text);
        })
    });
    $("#endTime").on('click', function () {
        dtPicker.show(function (selectItems) {
            console.log(selectItems.text);
            $("#endTime").val(selectItems.text);
        })
    });

    /*打开第二个页面*/
    $('#plusFaDan-btn').on('click', function () {
        $('#step1').css('left','-100%');
        $('#step2').css({
            'display':'block',
            'left':0
        });

    });
    /*打开第三个详情页面*/
    $(".yingJianChild>p").on('click', function () {
        //$('#step2').css('display','none');
        $('#step2').css('left','-100%');
        $('#step3').css('left','0');
    });
/*关闭第二个页面*/
    $('.closeSec').on('click', function () {
        $('#step1').css('left','0');
        $('#step2').css('left','100%');
    });
/*关闭第三个个页面*/
    $('.closeThree').on('click', function () {
        resetThree();
        $('#step2').css('left','0');
        $('#step3').css('left','100%');
    });
/*重置第三个页面*/
    function resetThree(){
        var bottom='<span></span>';
        $('#cunChuSheBei').html(bottom);
        var con='<span></span>'
            +'<div>'
            +'<p>服务内容</p>'
            +'</div>';
        $("#cunChuService").html(con);
    }


    /*回到首页*/
    $("#niu-fadan>div>a").on('click', function () {
        console.log("22");
        window.location.href='../index.html';
    })
    /*加载发单数据*/
    var url='localhost';
    function jiaZaiFaDan(){
        $.ajax({
            type: 'post',
            url: 'http://'+url+':8080/Helper/app/wx.do',
            data: {
                opt:'30'
            },
            dataType: 'json',
            timeout: 300,
            context: $('body'),
            success: function(data){
                //  假设接受JSON数据
                console.log(data);
                console.log(data.msg);
                if(data.msg=="太久未登录，请重新登录"){
                    alert(22);
                    window.location.href='../login.html';
                }
                //加载详情页面
                showDetailInfo(data.categoryList);
                //解析城市数据
                jieXiProvince(data.provinceList);
            },
            error: function(xhr, type){
                alert('Ajax error!')
            }
        })
    }

    /*解析城市列表数据函数*/
    function  jieXiProvince(provinceList){
        var cityData=[];
        for(var c=0;c<provinceList.length;c++){
            var cityJson={};
            cityJson['value']=provinceList[c]['id'];
            cityJson['text']=provinceList[c]['province_name'];
            var childrens=[];
            for(var d=0;d<provinceList[c]['cities'].length;d++){
                var object={};
                object['value']=provinceList[c].cities[d]['id'];
                object['text']=provinceList[c].cities[d]['city_name'];
                childrens.push(object);
            }
            cityJson['children']=childrens;
            cityData.push(cityJson);
        }
        cityPicker.setData(cityData);
        //return cityData;
    }


    /*
     * 下拉城市列表
     */

    var province = 0, city = 0, num = 0;
    var cityPicker = new mui.PopPicker({
        layer: 2
    });
    $('#areaFaDan').on('click', function (event) {
        cityPicker.show(function (items) {
            $('#areaFaDan').val(items[0].text + " - " + items[1].text);
            province = items[0]['value'];
            city = items[1]['value'];

        });
    });



    jiaZaiFaDan();
    //存放选择框的数据
    var pickerArray=[];
    var cunChuPicker = new mui.PopPicker({
        layer: 1
    });
    function showDetailInfo(list){
        console.log(list);
        var yingjianName=list[0].subs[0].name;
        setSelectData(list);
        /*点击硬件*/
        $('.yingJianChild p').on('click', function () {
            for(var i=0;i<list.length;i++){
                for(var j=0;j<list[i].subs.length;j++){
                    var id=list[i].subs[j].id;
                    if($(this).text()==list[i].subs[j].name){
                        var items=list[i].subs[j].items;
                        var services=list[i].subs[j].services;
                        addDetailCon(id,items,$(this).text(),$("#cunChuSheBei"),services,$('#cunChuService'));
                        //各选项的初始化；
                        return ;
                    }
                }
            }
        })
    }
//各选项的初始化；
    function chuShiHua(types){
        var arr=[];
        for(var i=0;i<types.length;i++){
            var con=new Object();
            con['value']=types[i].id;
            con['text']=types[i].name;
            arr.push(con);
        }
        pickerArray.push(arr);
        //return arr;
    }
    //var selectCun;
    function setSelectData(list){
        for(var i=0;i<list.length;i++){
            for(var j=0;j<list[i].subs.length;j++){
                var items=list[i].subs[j].items;
                for(var y=0;y<items.length;y++){
                    chuShiHua(items[y].types)
                }
            }
        }
    }
    /*详情内容序列化*/
    function addDetailCon(id,items,txt,distTop,services,distBottom){
        var sourcehead='<div>'
            +'<p data-id="'+id+'">'+txt+'</p>'
            +'</div>';
        distTop.append(sourcehead);
        for(var k=0;k< items.length;k++){
            var sourceTop='<div>'
                +'<p>'
                +' <label>'+items[k].name+'</label>'
                +' <input type="text" id="cunPro'+items[k].id+'" placeholder="请选择" data-id="'+(items[k].id-1)+'">'
                +'</p>'
                +'</div>';
            distTop.append(sourceTop);
        }
        for(var h=0;h<services.length;h++){
            var sourceBottom='<div class="mui-input-row mui-checkbox mui-left checkboxFaDan" data-id="'+h+'">'
                +'<label>'+services[h].name+'</label>'
                +' <input name="checkbox1" value="'+services[h].name+'" data-select="1" type="checkbox" checked data-id="'+(h+1)+'">'
                +'</div>';
           distBottom.append(sourceBottom);
        }
    }
    /*
     * 下拉存储设备列表
     */
    $('#cunChuSheBei').on('click','input', function (event) {
        that=$(this);
        var pid=$(this).data('id');
        var dataPicker=new mui.PopPicker({
            layer: 1
        });
        dataPicker.setData(pickerArray[pid]);
        dataPicker.show(function (items) {
            that.attr('data-id',items[0]['value']);
            that.val(items[0].text);
        });
    });

    $('#cunChuService').on('click','.checkboxFaDan', function () {
        console.log("11");
        if($(this).children('input').attr("checked")){
            $(this).children('input').removeAttr("checked");
        }else{
            $(this).children('input').attr("checked","true");

        }
        if($(this).children('input').attr("checked")){
            $(this).children('input').attr("data-select","0");
        }else{
            $(this).children('input').attr("data-select","1");

        }
        //now=!now;
    });

    /*添加产品按钮*/
    $('#addFaDan-btn>a').on('click', function () {
        var selectCun;
        /*产品信息*/
        var strPro='';
        /*服务内容*/
        var strService='';
        /*判断是否选择产品*/
        var now=true;
        var category='';
        var categoryId='';
        $("#cunChuSheBei>div").each(function (index,elem) {
            if(index==0){
                category=$(this).find('p').text();
                categoryId=$(this).find('p').data('id');
            }
            if(index>0){
                if(!$(this).find('input').val()){
                    //mui.toast("请选择产品");
                    now=false;
                }
            }
            if(index==1){
                selectCun='<h4 data-id="'+$(this).find('input').data('id')+'" data-name="'+$(this).find('label').text()+'" class="listCon">'+$(this).find('input').val()+'</h4>';
            }
            if(index>1){
                strPro+='<p data-id="'+index+'" class="listCon" data-name="'+$(this).find('label').html()+'">'+$(this).find('label').html()+': <span data-id="'+$(this).find('input').data('id')+'">'+$(this).find('input').val()+'</span></p>';
            }
        });

        $('#cunChuService>div').each(function (index, elem) {
            if(index>0){
                if($(this).find('input').attr("data-select")=="1"){
                    strService+='<p data-id="'+$(this).find('input').data('id')+'" class="listService">'+index+'.<span>'+$(this).find('label').html()+'</span></p>'
                }
            }
        });
        var str='<section class="proListCon" data-name="'+category+'" data-id="'+categoryId+'">'
        +' <div>'
            +selectCun
            +strPro
            +'<p>数量：<span class="num">'+$('#cunNum input').val()+'</span>台(套)</p>'
            +'<h5>服务内容</h5>'
            +strService
        +'</div>'
        +'<span class="mui-icon mui-icon-close"></span>'
        +'</section>';
        if(now){
            $('.proListTop').after(str);
            resetThree();
            $('#step3').css('left','100%');
            $('#step2').css('left','100%');
            $('#step1').css('left','0');
        }else{
            mui.toast("请选择产品");
        }

        //window.location.href='../faDan/faDan.html';
    });
    /*发单产品列表的json串*/
    function faDanJson(){
        var faDanJson=[];
        for(var y=0;y<$('.proListCon').length;y++){
            var object=$('.proListCon').eq(y);
            var json={};
            var itemsArr=[];
            var serviceArr=[];
            var listId=2;
            for(var b=0;b<object.find('.listCon').length;b++){
                var listJson={};
                var arr=[];
                var arrJson={};
                listJson['id']=listId+b;
                if(b==0){
                    listJson['name']=object.find('.listCon').eq(b).data('name');
                    arrJson['id']=object.find('.listCon').eq(b).data('id');
                    arrJson['name']=object.find('.listCon').eq(b).html();
                }else{
                    listJson['name']=object.find('.listCon').eq(b).data('name');
                    arrJson['id']=object.find('.listCon').eq(b).children('span').data('id');
                    arrJson['name']=object.find('.listCon').eq(b).children('span').html();
                }
                arr.push(arrJson);
                listJson['types']=arr;
                itemsArr.push(listJson);
            }
            for(var a=0;a<object.find('.listService').length;a++){
                var serviceJson={};
                serviceJson['id']=object.find('.listService').eq(a).data('id');
                serviceArr.push(serviceJson);
            }
            json['items']=itemsArr;
            json['num']=object.find('.num').text();
            json['services']=serviceArr;
            json['id']=object.data('id');
            json['name']=object.data('name');
            faDanJson.push(json);
        }
        console.log(JSON.stringify(faDanJson));
        //alert(faDanJson);
        //return faDanJson;
        return JSON.stringify(faDanJson);
    }

        /*发单按钮*/
    $('#faDan-btn>a').on('click', function () {
        console.log("11");
        var address=$("#detailAddressFaDan").val();
        var city_id=city;
        var end_date=$("#endTime").val();
        var start_date=$('#startTime').val();
        var pay=$('#shangJin').val();
        var sendSheet=false;
        if($('.mui-switch').hasClass('mui-active')){
            sendSheet=true;
        }
        var products=faDanJson();
        var operation_id=1;
        $("#fadan-nav span").each(function (index) {
            if($(this).hasClass('bgc')){
                operation_id=$(this).data('opid');
            }
        });
        var note=$('#proFaDanInfo').val();

        if($('.proListCon').length==0){
            mui.toast("请添加产品");
            return ;
        }
        if(!$('#shangJin').val()){
            mui.toast("请添加赏金");
            return ;
        }
        if(!$('#startTime').val()){
            mui.toast("请选择开始时间");
            return ;
        }
        if(!$('#endTime').val()){
            mui.toast("请选择终止时间");
            return ;
        }
        if(!$('#areaFaDan').val()){
            mui.toast("请选择发单城市");
            return ;
        }
        if(!$('#detailAddressFaDan').val()){
            mui.toast("请填写详细的发单地址");
            return ;
        }
        console.log($('.mui-switch').hasClass('mui-active'));
        if(!$('.mui-switch').hasClass('mui-active')){
            mui.toast("请填写需要验收单");
            return ;
        }
        faDanAjax(address,city_id,end_date,operation_id,pay,products,sendSheet,start_date,note);
    });

    /*发单Ajax*/
    function faDanAjax(address,city_id,end_date,operation_id,pay,products,sendSheet,start_date,note){
        console.log(pay);
        console.log(city_id);
        $.ajax({
            type: 'post',
            url: 'http://'+url+':8080/Helper/app/wx.do',
            data: {
                address:address,
                city_id:city_id,
                end_date:end_date,
                operation_id:operation_id,
                opt:'31',
                pay:pay,
                products:products,
                sendSheet:sendSheet,
                start_date:start_date,
                note:note
            },
            dataType: 'json',
            timeout: 300,
            context: $('body'),
            success: function(data){
                //  假设接受JSON数据
                //his.append(data.project.html)
                console.log(data);
                //mui.toast(data.msg);
                if(data.msg=="太久未登录，请重新登录"){
                    alert(22);
                    window.location.href='../login.html';
                }
                if(data.state==0){
                     mui.toast(data.msg);
                }else if(data.state==-1){
                    mui.toast(data.msg);
                }
            },
            error: function(xhr, type){
                alert('Ajax error!')
            }
        })
    }
});
















































