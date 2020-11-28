$(function () {
    //用户画像每个虚线框内添加一条
	$('.huaxiangAlert_scroll').on('click', '.huaxiangAlert_dash_r__add_li', function () {
        var oOption =  $('.huaxiangAlert_dash_r_li .morenOption').html();
		var preHtml = '<div class="huaxiangAlert_dash_r_li">'+
			'<select name="" id="" class="model_select fl">'+oOption+'</select>'+
			'<select name="" id="" class="model_select_symbol model_select fl">'+
                '<option value="小于">小于</option>'+
                '<option value="大于">大于</option>'+
                '<option value="等于">等于</option>'+
                '<option value="不等于">不等于</option>'+
                '<option value="包含">包含</option>'+
                '<option value="不包含">不包含</option>'+
                '<option value="介于">介于</option>'+
			'</select>'+
			'<p class="p1 model_inputFoo fl"><input type="text"></p>'+
			'<p class="p2 model_inputFoo model_inputFoo_s fl hide"><input type="text" class="fl"><span class="fl">-</span><input type="text" class="fl"></p>'+
		'</div>';
		$(this).before(preHtml);
	})
	//用户画像点击 '添加按钮'
	$('.huaxiangAlert_scroll').on('click', '.huaxiangAlert_dash_r__add_bar', function () {
        var oOption =  $('.huaxiangAlert_dash_r_li .morenOption').html();
		var preHtml = '<div class="huaxiangAlert_bar">'+
                        '<div class="huaxiangAlert_bar_titl">'+
                            '<span>条件名</span>'+
                            '<div class="huaxiangAlert_inputFoo relative fl">'+
                                '<input type="text" class="input_tjm"><i></i>'+
                                '<ul><ul>'+
                            '</div>'+
                        '</div>'+
                        '<div class="huaxiangAlert_dash">'+
                            '<div class="huaxiangAlert_dash_l"><span>且</span></div>'+
                            '<div class="huaxiangAlert_dash_r">'+
                                '<div class="huaxiangAlert_dash_r_li">'+
                                    '<select name="" id="" class="model_select fl morenOption">'+ oOption +'</select>'+
                                    '<select name="" id="" class="model_select fl model_select_symbol">'+
                                        '<option value="小于">小于</option>'+
                                        '<option value="大于">大于</option>'+
                                        '<option value="等于">等于</option>'+
                                        '<option value="不等于">不等于</option>'+
                                        '<option value="包含">包含</option>'+
                                        '<option value="不包含">不包含</option>'+
                                        '<option value="介于">介于</option>'+
                                    '</select>'+
                                    '<p class="p1 model_inputFoo fl"><input type="text"></p>'+
                                    '<p class="p2 model_inputFoo model_inputFoo_s fl hide"><input type="text" class="fl"><span class="fl">-</span><input type="text" class="fl"></p>'+
                                '</div>'+
                                '<div class="huaxiangAlert_dash_r__add_li">＋</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
		$(this).before(preHtml);
    })
    //用户画像-弹窗打开
	$('.rside_cf_sjfz').on('click', '.model_r_hx_alertBtn', function () {
        var oOption = '';
        for(var i = 0;i < $('.rside_cf_sjfz_ul1').children('li').length;i++) {
            oOption += '<option>' + $('.rside_cf_sjfz_ul1').children('li').eq(i).text() + '</option>';
        }
        $('.huaxiangAlert_dash_r_li .morenOption').html(oOption);
		$('.huaxiangAlertFoo').stop().fadeIn();
	})
	//用户画像-弹窗关闭
	$('.huaxiangAlert_close').on('click', function () {
        //关闭弹窗
        $('.huaxiangAlertFoo').stop().fadeOut();
        //清除内容
        $('.huaxiangAlert_scroll').find('.huaxiangAlert_bar').eq(0).siblings('.huaxiangAlert_bar').remove();
        $('.huaxiangAlert_scroll').find('.huaxiangAlert_dash_r_li').eq(0).siblings('.huaxiangAlert_dash_r_li').remove();
    })
    //用户画像选择数据分组
    $('.rside_cf_sjfz_ul1').on('click', 'li', function () {
        var txt = $(this).text();
        $('.rside_cf_sjfz_ul1_inputFoo input').val(txt);
        $('.rside_cf_sjfz_ul1').hide();
    })
    //用户画像选择条件(小于、大于、等于...)改变触发
    $('.huaxiangAlert_scroll').on('change', '.model_select_symbol',function () {
        var nowVal = $(this).val();
        if(nowVal != '介于') {
            $(this).nextAll('.p1').show().siblings('.p2').hide();
        } else {
            $(this).nextAll('.p1').hide().siblings('.p2').show();
        }
    })
    //用户画像, 且-或切换
    $('.huaxiangAlert_scroll').on('click', '.huaxiangAlert_dash_l span', function () {
        var nowTxt = $(this).text() == '且' ? '或': '且';
        $(this).text(nowTxt)
    })
    var sjfz_subm_obj = {obj_id: '', classify_col: '', arg_list: []}; //用户画像-提交-全局变量
    // sjfz_subm_obj.obj_id = $('.rside_cf_sjfz .rside_cf_sjfz_ul1').attr('data-obj_id');
    // sjfz_subm_obj.classify_col = $('.rside_cf_sjfz_ul1_inputFoo input').val();
    // 用户画像-弹窗-确认-取消
    $('.huaxiangAlert_submitFoo').on('click', '.huaxiangAlert_btn', function () {
        var nowType = $(this).attr('data-type');
        if(nowType == 'no') {
            //取消
            $('.huaxiangAlert_close').click();
        } else {
            //确认
            // var obj = {}; //提交参数
            var needObj = {};
            var type = $('.huaxiangAlert_name input').val(); //规则名称
            if(type == '') {
                alert('请输入规则名称');
                return;
            } else {
                needObj.type = type;//规则名称
            }
            needObj.classify = [];
            $('.huaxiangAlert_scroll').find('.huaxiangAlert_bar').each(function (i, ele) { //实心便利
                needObj.classify[i] = {};
                needObj.classify[i].id = i + 1; //第几个实心块
                var label = $(ele).find('.input_tjm').val(); //每个实心块-条件名
                if(label == '') {
                    alert('条件名不允许为空');
                    return;
                } else {
                    needObj.classify[i].label = label;//每个实心块-条件名
                }
                needObj.classify[i].info = [{}];
                var relationTxt = $(ele).find('.huaxiangAlert_dash_l span').text(); // 且-或
                needObj.classify[i].info[0].relation = (relationTxt == '且' ? 'and': 'or'); //每个实心且-或;
                needObj.classify[i].info[0].query = [];
                $(ele).find('.huaxiangAlert_dash_r .huaxiangAlert_dash_r_li').each(function (j, ele2) { //实心里面的虚心便利
                    // $(ele2).each(function (k, ele3) { //虚心里面的每一条便利
                        var huaxiangAlert_dash_r_liObj = {};
                        huaxiangAlert_dash_r_liObj.field = $(ele2).find('select').eq(0).val();
                        huaxiangAlert_dash_r_liObj.action = $(ele2).find('.model_select_symbol').val();
                        var paramArr = [];
                        if($(ele2).find('.p1').is(':visible')) {
                            paramArr[0] = $(ele2).find('.p1 input').val();
                        } else {
                            paramArr[0] = $(ele2).find('.p2 input').eq(0).val();
                            paramArr[1] = $(ele2).find('.p2 input').eq(1).val();
                        }
                        huaxiangAlert_dash_r_liObj.param = paramArr;
                        needObj.classify[i].info[0].query.push(huaxiangAlert_dash_r_liObj);
                    // })
                })
            })
            $('.yygzList').append('<li data-cont="'+JSON.stringify(needObj)+'">'+needObj.type+'</li>');//右侧已有规则append, 内容绑到标签上备用
            // for(var i = 0;i < $('.huaxiangAlert_scroll').find('.huaxiangAlert_bar'))
            // sjfz_subm_obj.arg_list = [];
            console.log(needObj);
            eval(sjfz_subm_obj.arg_list).push(needObj)
            // sjfz_subm_obj.arg_list = JSON.stringify(sjfz_subm_obj.arg_list)
            //画像弹窗-下拉赋值
        }
    })
    // 数据分组-用户画像弹窗
    $('.rside_btn_sjfz').on('click', 'button', function () {
        var nowType = $(this).attr('data-type');
        switch(nowType) {
            case 'hx':
                $('.sjfz_box').show();
                if ($('.Tabsjfz').length != 0) {
                    $('.Tabsjfz').children('div').html('数据分组')
                } else {
                    $('h1 ol').append('<li class="Tabsjfz"><div>数据分组</div><img src="img/guan2.png"></li>')
                }
                tabW();
                tabClick($('.Tabsjfz'));
                //掉数据, 获取弹窗数据 sjfz_subm_obj = {obj_id: '', classify_col: '', arg_list: []}; //用户画像-提交-全局变量
                if(sjfz_subm_obj.arg_list.length == 0) {
                    alert('您未选择任何规则')
                } else {
                    console.log(sjfz_subm_obj)
                    var submit_sjfz_subm_obj1 = sjfz_subm_obj;
                    submit_sjfz_subm_obj1.obj_id = $('.rside_cf_sjfz_ul1').attr('data-obj_id');
                    submit_sjfz_subm_obj1.classify_col = $('.rside_cf_sjfz_ul1_inputFoo input').val();
                    submit_sjfz_subm_obj1.arg_list = JSON.stringify(eval(submit_sjfz_subm_obj1.arg_list))
                    debugger
                    var obj = {
                        "obj_id": "5ca456cca1ca05230843ef69",
                        "classify_col": "F_1",
                        "arg_list": [{
                         "type": "生活水平",
                         "classify": [{
                          "id": 1,
                          "label": "中产",
                          "info": [{
                           "relation": "or",
                           "query": [{
                             "field": "人均GDP(元)",
                             "action": "大于",
                             "param": [
                              1
                             ]
                            },
                            {
                             "field": "居民消费水平（元/人）",
                             "action": "大于",
                             "param": [
                              10000
                             ]
                            }
                           ]
                          }]
                         }, {
                          "id": 2,
                          "label": "小康",
                          "info": [{
                           "relation": "and",
                           "query": [{
                             "field": "人均GDP(元)",
                             "action": "大于",
                             "param": [
                              1
                             ]
                            },
                            {
                             "field": "居民消费水平（元/人）",
                             "action": "小于",
                             "param": [
                              10000
                             ]
                            }
                           ]
                          }]
                         }]
                        },{
                         "type": "发展情况",
                         "classify": [{
                          "id": 1,
                          "label": "发展中地区",
                          "info": [{
                           "relation": "and",
                           "query": [{
                             "field": "F_1",
                             "action": "大于",
                             "param": [
                              0.5
                             ]
                            },
                            {
                             "field": "F_2",
                             "action": "大于",
                             "param": [
                              0.0001
                             ]
                            }
                           ]
                          }]
                         }, {
                          "id": 2,
                          "label": "发达地区",
                          "info": [{
                           "relation": "and",
                           "query": [{
                             "field": "F_1",
                             "action": "小于",
                             "param": [
                              10
                             ]
                            },
                            {
                             "field": "F_2",
                             "action": "小于",
                             "param": [
                              0.5
                             ]
                            }
                           ]
                          }]
                         }]
                        },{
                         "type": "生产总值",
                         "classify": [{
                          "id": 1,
                          "label": "高",
                          "info": [{
                           "relation": "or",
                           "query": [{
                             "field": "F_1",
                             "action": "大于",
                             "param": [
                              0.7
                             ]
                            },
                            {
                             "field": "F_2",
                             "action": "大于",
                             "param": [
                              0.2
                             ]
                            }
                           ]
                          }]
                         }, {
                          "id": 2,
                          "label": "低",
                          "info": [{
                           "relation": "or",
                           "query": [{
                             "field": "F_1",
                             "action": "小于",
                             "param": [
                              0.2
                             ]
                            },
                            {
                             "field": "F_2",
                             "action": "小于",
                             "param": [
                              0.5
                             ]
                            }
                           ]
                          }]
                         }]
                        }]
                       }
                    // obj.arg_list = JSON.stringify(obj.arg_list);
                    // document.write(sjfz_subm_obj + '<p>-----------分割线-----------</p>' + submit_sjfz_subm_obj)
                    $.ajax({
                        url: url_ip + '/examine/group/',
                        type: 'POST',
                        data: submit_sjfz_subm_obj1,
                        datatype: 'json',
                        headers: { 'Authorization': token },
                        success: function (res) {
                            console.log(res)
                            if(res.status) {
                                $('.sjfz_box_d3 .table').attr('data-obj_id', res.objId);
                                //表格赋值
                                var headHtml = '';
                                for(var i = 0;i < res.data[0].length;i++) {
                                    headHtml += '<td><span>'+res.data[0][i]+'</span></td>'
                                }
                                $('.sjfz_box_d3 .table thead tr').html(headHtml);
                                if(res.data[1]) {
                                    var bodyHtml = '';
                                    for(var i = 1;i < res.data.length;i++) {
                                        var bodyTdHtml = '';
                                        for(var j = 0;j < res.data[i].length;j++) {
                                            bodyTdHtml += '<td><span>'+res.data[i][j]+'</span><i>＋</i></td>'
                                        }
                                        bodyHtml += '<tr>'+ bodyTdHtml +'</tr>';
                                    }
                                    $('.sjfz_box_d3 .table tbody').html(bodyHtml);
                                }
                                //弹窗赋值
                                var FooLiHtml = '';
                                for(var key in res.screening_conditions) {
                                    var sonLiHtml = '';
                                    for(var i = 0;i < res.screening_conditions[key].length;i++) {
                                        sonLiHtml += '<li><span>'+res.screening_conditions[key][i]+'</span></li>'
                                    }
                                    FooLiHtml += '<li class="sjfz_box_head_slide1">'+
                                        '<span class="sjfz_box_head_slide1_span"><b>消费金额</b><i>&gt;</i></span>'+
                                        '<ul class="sjfz_box_head_slide2">'+ sonLiHtml +'</ul>'+
                                    '</li>';
                                }
                                $('.sjfz_box').find('.sjfz_box_head_slide').html(FooLiHtml);
                            } else {
                                console.log(res.status)
                            }
                        },
                        error: function (err) {
                            debugger
                            // var needJson = JSON.parse(err.responseText);
                            //console.log(data)
                        }
                    })
                }
        }
    })
    //用户画像-弹窗-选择分析对象下拉
    $('.sjfz_box_head .headCont ul').on('click', 'li.add_fxdx', function () {
        if($('.sjfz_box_head_slide').is(':visible')) {
            $('.sjfz_box_head_slide').hide();
        } else {
            $('.sjfz_box_head_slide').show();
            var nowPos_l = $(this).offset().left;
            var nowPos_t = $(this).offset().top - 10;
            $('.sjfz_box_head_slide').css({left: nowPos_l, top: nowPos_t});
        }
    })
    //用户画像-弹窗-选择分析对象下拉-显/隐
    $('.sjfz_box_head_slide').on('mouseover', '.sjfz_box_head_slide1', function () {
            $(this).siblings().children('ul').hide();
            $(this).children('ul').show();
        }
    )
    $('.sjfz_box_head_slide').on('mouseleave', function () {
        $(this).hide();
        return false;
    })
    //下拉耳机点击-赋值
    $('.sjfz_box_head_slide').on('click', '.sjfz_box_head_slide2 li', function () {
        var fooLiTxt = $(this).closest('.sjfz_box_head_slide1').find('.sjfz_box_head_slide1_span b').text();
        var nowLiTxt = $(this).children('span').text();
        $('.sjfz_box_head .headCont ul').find('.add_fxdx').before ('<li class="no_add_fxdx"><span>'+fooLiTxt+ '/' + nowLiTxt+'</span><i>×</i></li>');
    })
    //弹窗内容区域关闭
    $('.sjfz_box').on('click', '.close_d3', function () {
        $(this).closest('.sjfz_box_d3_qiehuan').hide();
    })
    // 画像弹窗-出图
    $('.head_btn').on('click', function () {
        var need_obj_id =  $('.sjfz_box_d3 .table').attr('data-obj_id');
        var need_arg_list = [];
        for(var i = 0;i < $('.sjfz_box_head .headCont ul').children('li.no_add_fxdx').length;i++) {
            var needTxt = $('.sjfz_box_head .headCont ul').children('li.no_add_fxdx').eq(i).children('span').text();
            var needArr = needTxt.split('/');
            var needObj = {};
            needObj[needArr[0]] = needArr[1];
            need_arg_list.push(needObj);
        }
        var submitObj = {obj_id: need_obj_id, arg_list: JSON.stringify(need_arg_list)};
        $.ajax({
            url: url_ip + '/examine/user_picture/',
            type: 'POST',
            data: submitObj,
            datatype: 'json',
            headers: { 'Authorization': token },
            success: function (res) {
                console.log(res)
                // if(res.status) {
                    var dataArr = [];
                    for(var i = 0;i < res.data.length;i++) {//先便利数组
                        for(var key1 in res.data[i]) {
                            dataArr.push(['', key1]); //'' - 一级
                            if(res.data[i][key1].length != 0) {
                                for(var j = 0;j < res.data[i][key1].length;j++) {
                                    dataArr.push([key1, res.data[i][key1][j][0]]);//一级 - 二级(二级[0])
                                    dataArr.push([res.data[i][key1][j][0], res.data[i][key1][j][1]]); // 二级 - 三级(二级[1])
                                }
                            } 
                        }
                    }
                    console.log(dataArr);
                    HchartGo(dataArr);
                    $(".sjfz_box_d3").find('.sjfz_box_d3_img').show();

                    //弹窗赋值
                // } else {
                    console.log(res.status)
                // }
            },
            error: function (err) {
                //console.log(data)
            }
        })
    })
    //鼠标经过弹窗-表格-出＋
    $('.sjfz_box_d3 tbody').on('mouseenter', 'td', function () {
        $('.sjfz_box_d3 tbody').find('td i').removeClass('active');
        $(this).find('i').addClass('active');
    })
    $('.sjfz_box_d3 tbody').on('mouseleave', 'td', function () {
        $('.sjfz_box_d3 tbody').find('td i').removeClass('active');
    })
    // 表格点击+ 给头部 "选择分析对象" 赋值
    $('.sjfz_box_d3 tbody').on('click', 'td i.active', function () {
        var nowIndex = $(this).parent('td').index();
        var headTxt = $('.sjfz_box_d3 thead').find('td').eq(nowIndex).children('span').text();
        var bodyTxt = $(this).siblings('span').text();
        $('.sjfz_box_head .headCont ul').find('.add_fxdx').before ('<li class="no_add_fxdx"><span>'+headTxt+ '/' +bodyTxt+'</span><i>×</i></li>');
    })
    // 头部"选择分析对象"删除
    $('.sjfz_box_head .headCont ul').on('click', 'li i', function () {
        $(this).parent('.no_add_fxdx').remove();
    })
})