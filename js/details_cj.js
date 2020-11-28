var cj_Needid = window.location.search.split("=")[1];
var obj_id = '';
var obj_name = '';
var token_id;

function getDetails_cjDatas() {
    $.ajax({
        url: url_ip + '/scence/' + cj_Needid,
        type: 'GET',
        data: { user_id: token_id },
        datatype: 'json',
        cache: true,
        success: function(res) {
            // console.log(res)
            token_id = res.user.id;
            obj_name = res.name;
            $('.details_title b').text(res.name) //场景名称
            $('.details_right_up img').attr('src', res.user.image) //发布者头像
            $('.details_right_up .user_name').text(res.user.username) //发布者名称
            $('.details_box .details_msg').html(res.introduce) //文档、介绍
            $('.details_box .details_example').html(res.example) //应用场景、实例
            $('.details_right_up .focus b').text(res.is_focus == 1 ? '已关注' : '关注') //0未关注, 1已关注
            $(".details_jiejian>p").html(res.abstract);
            for (var i = 0; i < res.label.length; i++) {
                var li = $("<li></li>");
                $(".details_title>ul").append(li);
                var span = $("<span></span>");
                $(li).append(span);
                $(span).text(res.label[i]);
            }
            $('.details_right_up .focus').attr('data-id', res.is_focus == 1 ? res.relation_id : res.user.id) //点击关注-取消关注需要
            obj_id = res.obj_id; //跳转到model2传参
            // 文档、介绍图片拼接
            $('.details_box .details_msg img').each(function() {
                    $(this).attr('src', url_ip + $(this).attr('src'))
                })
                // 应用场景、实例图片拼接
            $('.details_box .details_example img').each(function() {
                $(this).attr('src', url_ip + $(this).attr('src'))
            })
        },
        error: function(err) {
            console.log(err)
        }
    })
}
$(function() {
    //tab切换
    $('.xx_btn').on('click', '.xx_btn_tab', function() {
            var nowType = $(this).attr('data-type');
            $(this).addClass('on').siblings().removeClass('on');
            $('.details_box').children('.details_box_cont[data-type="' + nowType + '"]').addClass('on').siblings().removeClass('on');
        })
        //获取数据
    getDetails_cjDatas();
    //关注-取关
    $('.details_right_up').on('click', '.focus', function() {
            var nowTxt = $(this).children('b').text();
            var needId = $('.details_right_up .focus').attr('data-id');
            if (nowTxt == '关注') {
                $.ajax({
                    type: "GET",
                    url: url_ip + "/personal/add_focus",
                    data: { file_user_id: needId },
                    dataType: "json",
                    headers: { "Authorization": token },
                    success: function(res) {
                        // console.log(res)
                        if (res.status) {
                            $('.focus b').text('已关注');
                            $('.details_right_up .focus').attr('data-id', res.id);
                        }
                    },
                    error: function(err) {
                        if (err.status == 401) {
                            $('.shade').show();
                        }
                    }
                })
            } else {
                $.ajax({
                    type: "POST",
                    url: url_ip + "/personal/delete_focus",
                    data: { relation_id: needId },
                    dataType: "json",
                    headers: { "Authorization": token },
                    success: function(res) {
                        // console.log(res)
                        if (res.status) {
                            $('.focus b').text('关注');
                            $('.details_right_up .focus').attr('data-id', token_id);
                        }
                    },
                    error: function(err) {
                        if (err.status == 401) {
                            $('.shade').show();
                        }
                    }
                })
            }
        })
        //页面跳转
    $('.details_right_down').on('click', 'li', function() {
            if (token == 'JWT undefined' || token == 'JWT null') {
                $('.shade').show();
            } else {
                var nowTxt = $(this).text();
                if (nowTxt == '我的收纳') {
                    window.location.href = 'perscen-sn.html';
                } else {
                    window.location.href = 'perscen-zy.html';
                }
            }
        })
        //跳转model2
    $('.goModel2Btn').on('click', function() {
        limit('场景自建')
        .then(res => {
            if(res) {
                // window.location.href = 'model2.html?obj_id=' + obj_id + '&obj_name=' + obj_name;
                window.open('hmodel2.html?obj_id=' + obj_id + '&obj_name=' + obj_name)
            }
        })
    })
})