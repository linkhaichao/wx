/**
 * Created by Hello on 2016/9/28.
 */
$(function () {


    var province = 0, city = 0, num = 0;
    /*
     * 下拉城市列表
     */
    var cityPicker = new mui.PopPicker({
        layer: 2
    });
    cityPicker.setData(cityData);
    $('#city').on('click', function (event) {
        getCity();
        cityPicker.setData(cityData);
        cityPicker.show(function (items) {
            $('#city').val(items[0].text + " - " + items[1].text);
            province = items[0]['value'];
            city = items[1]['value'];
        });
    });
    /*
     * 工作年限
     */
    var yearPicker = new mui.PopPicker();
    yearPicker.setData([{
        value: '0',
        text: '无经验'
    }, {
        value: '1',
        text: '1年经验'
    }, {
        value: '2',
        text: '2年经验'
    }, {
        value: '3',
        text: '3年经验'
    }, {
        value: '4',
        text: '4年经验'
    }, {
        value: '5',
        text: '5年经验'
    }, {
        value: '6',
        text: '6年经验'
    }, {
        value: '7',
        text: '7年经验'
    }, {
        value: '8',
        text: '8年经验'
    }, {
        value: '9',
        text: '9年经验'
    }, {
        value: '10',
        text: '10年经验'
    }, {
        value: '11',
        text: '十年以上'
    }]);
    $('#nianxian').on('click',function(){
        yearPicker.show(function(items) {
            $('#nianxian').val(items[0]['text']);
            num = items[0]['value'];
        });
    });
    /*
     * 选择性别
     */
    var sexPicker = new mui.PopPicker();
    sexPicker.setData([{
        value: '男',
        text: '男'
    }, {
        value: '女',
        text: '女'
    }]);
    $("#sex").on('click', function () {
        sexPicker.show(function(items) {
            $("#sex").val(items[0]['text']);
        });
    });
    /*
     * 选择生日
     */
    $('#birth').on('click', function() {
        var picker = new mui.DtPicker({"type":"date"});  //不要时间，只要日期
        picker.show(function(rs) {
            $('#birth').val(rs.text);
            picker.dispose();
        });
    });
    /*
     *提交结果验证
     */
    $('#xiugai-btn').on('click', function(event) {
        //检查登录状态
        /*if (!ssid) {
            mui.toast("未登录！");
            return true;
        }*/
        nickname = document.getElementById("nichen").value;
        if (!nickname) {
            mui.toast("未添加赏金！");
            return true;
        }
        if (!city) {
            mui.toast("未选择城市！");
            return true;
        }
        year = document.getElementById("nianxian").value;
        addr = document.getElementById("address").value;
        if (!addr) {
            mui.toast("地址不能为空！");
            return true;
        }
        truename = document.getElementById("zhenming").value;
        if (!truename) {
            mui.toast("真实姓名不能为空！");
            return true;
        }
        idcode = document.getElementById("shenfenzheng").value;
        if (!idcode) {
            mui.toast("身份证不能为空！");
            return true;
        }
        sex = document.getElementById("sex").value;
        if (!sex) {
            mui.toast("性别不能为空！");
            return true;
        }
        birth = document.getElementById("birth").value;
        if (!birth) {
            mui.toast("生日不能为空！");
            return true;
        }
        desc = document.getElementById("specialty").value;
        if (!desc) {
            mui.toast("个人特长不能为空！");
            return true;
        }
        exper = document.getElementById("experience").value;
        if (!exper) {
            mui.toast("工作经历不能为空！");
            return true;
        }
        intr = document.getElementById("profile").value;
        if (!intr) {
            mui.toast("个人简介不能为空！");
            return true;
        }
    });
    //http://120.76.215.233:8080/Helper/app/index.do
    //var url='172.28.94.28';
    var url='localhost';
    function getCity(){
        $.ajax({
            type: 'post',
            url: 'http://'+url+':8080/Helper/app/wx.do',
            data: {
                opt:10
            },
            dataType: 'json',
            timeout: 300,
            success: function(data){
                //  假设接受JSON数据
                //his.append(data.project.html)
                console.log(data.msg);
                //mui.toast(data.msg);

            },
            error: function(xhr, type){
                console.log(xhr+'..........'+type);
                console.log('Ajax error!')
            }
        })
    }
});















































