// var token = "JWT " + window.sessionStorage.token;
var data_algo = sessionStorage.getItem("data_algo");
var _id = window.location.search.substr(1);
var form = sessionStorage.getItem("form");

$(function() {
    //console.log(token_id)
    var now_page = 1;
    var all_page = 1;
    var fabu_id = '';
    //console.log(data_algo,form,_id)
    if (data_algo == 'algo') {
        $('.details_add_algo').show();
        $('.details_add_data').hide();
        if (form == 'index') {
            $.ajax({
                url: url_ip + '/algo/' + _id,
                type: 'GET',
                data: { user_id: token_id },
                dataType: 'json',
                success: function(data) {
                    // console.log(data)
                    fabu_id = data.user.id;
                    $('.details_title b').html(data.name)
                    $('.details_label li').remove();
                    for (var i = 0; i < data.label.length; i++) {
                        var li = document.createElement('li');
                        var span = document.createElement('span');
                        $(span).html(data.label[i]);
                        $('.details_title ul').append(li)
                        $(li).append(span)
                    }
                    $('.details_jiejian p').html(data.abstract)
                    $('.details_guankan span').html(data.view_num)
                    $('.details_xiaoxi span').html(data.comment_num)
                    $('.details_zan span').html(data.thumb_num)
                    $('.details_right_up i img').attr('src', data.user.image)
                    $('.user_name').html(data.user.username)
                    $('.details_msg').html(data.introduce)
                    $('.details_example').html(data.example)
                    $('.details_work').html(data.run)
                    if (data.is_focus == 1) {
                        $('.focus b').html('已关注')
                        $('.focus')[0].id = data.relation_id
                    } else {
                        $('.focus b').html('+关注')
                        $('.focus')[0].id = data.user.id
                    }
                    if (data.isMe == 1) {
                        $('.focus').hide();
                    }
                    if (data.isLove == 1) {
                        $('.details_zan i img').attr('src', 'img/zanhou.png')
                    }
                    $('.all_comment2 span').html(data.comment_num)
                },
                error: function(data) {
                    //console.log(data)
                },
                complete: function() {
                    $('.details_msg img').each(function() {
                        $(this).attr('src', url_ip + $(this).attr('src'))
                    })
                    $('.details_example img').each(function() {
                        $(this).attr('src', url_ip + $(this).attr('src'))
                    })
                }
            })
        } else if (form == 'personal') {
            $.ajax({
                url: url_ip + '/algodetail/' + _id,
                type: 'GET',
                data: { user_id: token_id },
                dataType: 'json',
                success: function(data) {
                    //console.log(data)
                    $('.details_title b').html(data.name)
                    $('.details_label li').remove();
                    for (var i = 0; i < data.label.length; i++) {
                        var li = document.createElement('li');
                        var span = document.createElement('span');
                        $(span).html(data.label[i]);
                        $('.details_title ul').append(li)
                        $(li).append(span)
                    }
                    $('.details_jiejian p').html(data.abstract)
                    $('.details_guankan span').html(data.view_num)
                    $('.details_xiaoxi span').html(data.comment_num)
                    $('.details_zan span').html(data.thumb_num)
                    $('.details_right_up i img').attr('src', data.user.image)
                    $('.user_name').html(data.user.username)
                    $('.details_msg').html(data.introduce)
                    $('.details_example').html(data.example)
                    $('.details_work').html(data.run)
                    if (data.is_focus == 1) {
                        $('.focus b').html('已关注')
                        $('.focus')[0].id = data.relation_id
                    } else {
                        $('.focus b').html('+关注')
                        $('.focus')[0].id = data.user.id
                    }
                    if (data.isMe == 1) {
                        $('.focus').hide();
                    }
                    if (data.isLove == 1) {
                        $('.details_zan i img').attr('src', 'img/zanhou.png')
                    }
                    $('.all_comment2 span').html(data.comment_num)
                },
                error: function(err) {
                    console.log(err)
                }
            })
        }
        $('.details_zan i').click(function() {
            $.ajax({
                type: 'GET',
                url: url_ip + '/model/ClickLove/',
                data: { id: _id, action: 2 },
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(data) {
                    // console.log(data)
                    if (data.status) {
                        if (data.msg == '喜欢成功') {
                            $('.details_zan i img').attr('src', 'img/zanhou.png')
                            $('.details_zan span').html(Number($('.details_zan span').html()) + 1)
                        } else {
                            $('.details_zan i img').attr('src', 'img/dianq.png')
                            $('.details_zan span').html(Number($('.details_zan span').html()) - 1)
                        }
                    }
                },
                error: function(err) {
                    if (err.status == 401) {
                        $('.shade').show();
                    }
                }
            })
        })

        function caculater() {
            var result = $('.power_box>div span').html() * $('.miao').html() * $('.ci').html()
                //console.log(result)
            $('.jia').html(result)
            $('.power_box p b').html(result)
        }
        $('.power_box ul li').live('click', function() {
            $('.power_box ul li').removeClass('on');
            $(this).addClass('on');
            $('.ci').html($(this).html());
            caculater()
        })
    } else if (data_algo == 'data') {
        // $('.top_bg').css('backgroundImage', 'url(img/shubj.png)')
        $('.xx_btn li[name="msg"]').html('数据介绍')
        $('.xx_btn li[name="msg"]').addClass('on')
        $('.details_box>div').removeClass('on')
        $('.details_msg').addClass('on')
        $('.xx_btn li[name="data"]').show()
        $('.xx_btn li[name="example"]').hide()
        $('.xx_btn li[name="work"]').hide();
        $('.xx_btn li[name="power"]').hide()
        $('.details_title span').html('数据')
        $('.details_right_down li:eq(1)').html('我的数据')
            // $('.details_zan img').attr('src', 'img/tianjia.png')
            // $('.details_zan b').html('添加数')
        $('.details_add_algo').hide();
        $('.details_add_data').show();
        data_zanshi(1);

        function data_zanshi(datapage) {
            $(".details_table table").empty();
            $(".details_title ul").empty();
            $.ajax({
                type: "GET",
                url: url_ip + "/files/detail/" + _id,
                data: {
                    id: token_id,
                    page: datapage
                },
                dataType: "json",
                success: function(data) {
                    // console.log(data);
                    $("#page").paging({
                        nowPage: datapage, // 当前页码
                        pageNum: data.pages, // 总页码
                        buttonNum: 7, //要展示的页码数量
                        callback: function(num) { //回调函数
                            data_zanshi(num);
                        }
                    });
                    fabu_id = data.file_user_id;
                    $('.details_title b').html(data.file_name)
                    $('.details_label li').remove();
                    all_page = Math.ceil(Number(data.row_num) / 30);
                    $('.all_page').html(all_page)
                    for (var i = 0; i < data.label.length; i++) {
                        var li = document.createElement('li');
                        var span = document.createElement('span');
                        $(span).html(data.label[i]);
                        $('.details_title ul').append(li)
                        $(li).append(span)
                    }
                    $(".details_jiejian p").html(data.abstract);
                    $('.details_guankan span').html(data.view_num)
                    $('.details_xiaoxi span').html(data.comment_num)
                    $('.details_zan span').html(data.thumb_num)
                    $('.details_right_up i img').attr('src', url_ip + '/' + data.header)
                    $('.user_name').html(data.username)
                    var html = '<div class="details_div details_time">' +
                        '<i>·</i><span>数据上传时间：</span><b>' + data.time + '</b>' +
                        '</div>' +
                        '<div class="details_div details_size">' +
                        '<i>·</i><span>数据文件大小：</span><b>' + data.size + '</b><span style="margin-left:4em">( 行数:</span><b>' + data.row_num + '</b>行<span style="margin-left:1em">列数:</span><b>' + data.column_num + '</b>列 )' +
                        '</div>' +
                        '<div class="details_div details_abstract">' +
                        '<i>·</i><span>数据简介：</span>' +
                        '<p>' + data.abstract + '</p>' +
                        '</div>'
                    $('.details_msg').html(html)
                    if (data.data.length != 0) {
                        // var table = document.createElement('table');
                        // $('.details_table').append(table)
                        var tr = document.createElement('tr')
                        $('.details_table table').append(tr)
                        for (var i = 0; i < data.bt.length; i++) {
                            var td = document.createElement('td');
                            $(tr).append(td)
                            $(td).append(data.bt[i])
                        }
                        for (var i = 0; i < data.data.length; i++) {
                            var tr = document.createElement('tr')
                            $('.details_table table').append(tr)
                            for (var k = 0; k < data.data[i].length; k++) {
                                var td = document.createElement('td');
                                $(tr).append(td)
                                $(td).append(data.data[i][k])
                            }
                        }
                    } else {
                        alertmsg('抱歉！此数据暂时不予显示详情。')
                    }
                    if (data.is_focus == 1) {
                        $('.focus b').html('已关注')
                        $('.focus')[0].id = data.relation_id
                    } else {
                        $('.focus b').html('+关注')
                        $('.focus')[0].id = data.file_user_id
                    }
                    if (data.is_me == 1) {
                        $('.focus').hide();
                    }
                    if (data.is_love == 1) {
                        $('.details_zan i img').attr('src', 'img/zanhou.png')
                    }
                    $('.all_comment2 span').html(data.comment_num)
                    for (var i = 1; i < all_page; i++) {
                        var oli = document.createElement('li');
                        oli.innerHTML = i + 1;
                        $('.details_page ul').append(oli);
                    }
                    $('.details_zan i').click(function() {
                        $.ajax({
                            type: 'GET',
                            url: url_ip + '/files/love/',
                            data: {
                                file_id: _id,
                                action: 1
                            },
                            dataType: 'json',
                            headers: {
                                'Authorization': token
                            },
                            success: function(data) {
                                // console.log(data)
                                if (data.status) {
                                    if (data.msg == '喜欢成功') {
                                        $('.details_zan i img').attr('src', 'img/zanhou.png')
                                        $('.details_zan span').html(Number($('.details_zan span').html()) + 1)
                                    } else {
                                        $('.details_zan i img').attr('src', 'img/dianq.png')
                                        $('.details_zan span').html(Number($('.details_zan span').html()) - 1)
                                    }
                                }
                            },
                            error: function(err) {
                                if (err.status == 401) {
                                    $('.shade').show();
                                }
                            }
                        })
                    })
                },
                error: function(data) {
                    console.log(data)
                },
                complete: function() {
                    $('.details_msg img').each(function() {
                        $(this).attr('src', url_ip + $(this).attr('src'))
                    })
                }
            })
        }
        $('.details_page .first_page').click(function() {
            now_page = 1;
            get_data(now_page);
        })
        $('.details_page .pre_page').click(function() {
            if (now_page > 1) {
                now_page--;
                get_data(now_page);
            }
        })
        $('.details_page ul li').live('click', function() {
            now_page = $(this).html();
            get_data(now_page);
        })
        $('.details_page .next_page').click(function() {
            if (now_page < all_page) {
                now_page++;
                get_data(now_page);
            }
        })
        $('.details_page .last_page').click(function() {
            now_page = all_page;
            get_data(now_page);
        })
        $('.details_page .to_page').click(function() {
            now_page = $('.will_page').val();
            get_data(now_page);
        })
    }

    function get_data(now_page) {
        $.ajax({
            type: "GET",
            url: url_ip + "/files/detail/" + _id,
            data: { page: now_page, id: token_id },
            dataType: "json",
            success: function(data) {
                //console.log(data)
                $('.details_table').empty();
                if (data.data.length != 0) {
                    var table = document.createElement('table');
                    $('.details_table').append(table)
                    for (var i = 0; i < data.data.length; i++) {
                        var tr = document.createElement('tr')
                        $('.details_table table').append(tr)
                        for (var k = 0; k < data.data[i].length; k++) {
                            var td = document.createElement('td');
                            $(tr).append(td)
                            $(td).append(data.data[i][k])
                        }
                    }
                } else {
                    alertmsg('没有更多数据了')
                }
            },
            error: function(data) {
                console.log(data)
            }
        })
    }
    // 分页
    setInterval(function() {
        if (now_page == 1 && now_page < all_page) {
            $('.details_page .pre_page img').attr('src', 'img/buzuo.png')
            $('.details_page .next_page img').attr('src', 'img/weiyou.png')
            $('.details_page .first_page').addClass('noclick')
            $('.details_page .last_page').removeClass('noclick')
            $('.details_page ul li').removeClass('now_page');
            $('.details_page ul li').eq(0).addClass('now_page');
        } else if (now_page == 1 && now_page == all_page) {
            $('.details_page .pre_page img').attr('src', 'img/buzuo.png')
            $('.details_page .next_page img').attr('src', 'img/buyou.png')
            $('.details_page .first_page').addClass('noclick')
            $('.details_page .last_page').addClass('noclick')
            $('.details_page ul li').removeClass('now_page');
            $('.details_page ul li').eq(0).addClass('now_page');
        } else if (now_page > 1 && now_page < all_page) {
            $('.details_page .pre_page img').attr('src', 'img/weizuo.png')
            $('.details_page .next_page img').attr('src', 'img/weiyou.png')
            $('.details_page .first_page').removeClass('noclick')
            $('.details_page .last_page').removeClass('noclick')
            $('.details_page ul li').removeClass('now_page');
            $('.details_page ul li').eq(now_page - 1).addClass('now_page');
        } else if (now_page > 1 && now_page == all_page) {
            $('.details_page .pre_page img').attr('src', 'img/weizuo.png')
            $('.details_page .next_page img').attr('src', 'img/buyou.png')
            $('.details_page .first_page').removeClass('noclick')
            $('.details_page .last_page').addClass('noclick')
            $('.details_page ul li').removeClass('now_page');
            $('.details_page ul li').eq(all_page - 1).addClass('now_page');
        }
    }, 0)
    setInterval(function() {
        if ($('.details_page .now_page').html() <= 4) {
            $('.details_page ul li').css('display', 'none');
            $('.details_page .span').css('display', 'none');
            $('.details_page ul li:lt(5)').css('display', 'inline-block');
            $('.details_page .last_dian').css('display', 'inline-block');
        } else if ($('.details_page .now_page').html() <= all_page - 4 && $('.details_page .now_page').html() > 4) {
            var a1 = $('.details_page .now_page').html() - 3;
            var a2 = $('.details_page .now_page').html() - 2;
            var a3 = $('.details_page .now_page').html() - 1;
            var a4 = $('.details_page .now_page').html();
            var a5 = parseInt($('.details_page .now_page').html()) + 1;
            $('.details_page ul li').css('display', 'none');
            $('.details_page .span').css('display', 'inline-block');
            $('.details_page ul li:eq(' + a1 + ')').css('display', 'inline-block');
            $('.details_page ul li:eq(' + a2 + ')').css('display', 'inline-block');
            $('.details_page ul li:eq(' + a3 + ')').css('display', 'inline-block');
            $('.details_page ul li:eq(' + a4 + ')').css('display', 'inline-block');
            $('.details_page ul li:eq(' + a5 + ')').css('display', 'inline-block');
        } else if ($('.details_page .now_page').html() > all_page - 4) {
            var a6 = all_page - 6;
            $('.details_page ul li').css('display', 'none');
            $('.details_page .span').css('display', 'none');
            $('.details_page ul li:gt(' + a6 + ')').css('display', 'inline-block');
            $('.details_page .left_dian').css('display', 'inline-block');
        };
    }, 0)
    $('.xx_btn li').click(function() {
        $('.xx_btn li').removeClass('on')
        $(this).addClass('on')
        var clas = $(this).attr('name')
        $('.details_box>div').removeClass('on');
        $('.details_' + clas).addClass('on')
    })
    $('.focus').click(function() {
        var id = $(this)[0].id
        if ($(this).children('b').html() == '+关注') {
            $.ajax({
                type: "GET",
                url: url_ip + "/personal/add_focus",
                data: { file_user_id: id },
                dataType: "json",
                headers: { "Authorization": token },
                success: function(data) {
                    // console.log(data)
                    if (data.status) {
                        $('.focus b').html('已关注')
                        $('.focus')[0].id = data.id
                    }
                },
                error: function(data) {
                    // console.log(data)
                    if (data.status == 401) {
                        $('.shade').show();
                    }
                }
            })
        } else {
            $.ajax({
                type: "POST",
                url: url_ip + "/personal/delete_focus",
                data: { relation_id: id },
                dataType: "json",
                headers: { "Authorization": token },
                success: function(data) {
                    // console.log(data)
                    if (data.status) {
                        $('.focus b').html('+关注')
                        $('.focus')[0].id = fabu_id
                    }
                },
                error: function(data) {
                    // console.log(data)
                    if (data.status == 401) {
                        $('.shade').show();
                    }
                }
            })
        }
    })
    $('.details_right_down li:eq(0)').click(function() {
        if (token != 'JWT undefined' && token != 'JWT null') {
            window.location.href = 'perscen-sn.html'
        } else {
            $('.shade').show();
        }
    })
    $('.details_right_down li:eq(1)').click(function() {
            if (token != 'JWT undefined' && token != 'JWT null') {
                if (data_algo == 'algo') {
                    window.location.href = 'perscen-zy.html';
                } else {
                    window.location.href = 'perscen-zy.html';
                }
            } else {
                $('.shade').show();
            }
        })
        // 收纳数据渲染封装
    function get_shouna() {
        $.ajax({
            type: 'GET',
            url: url_ip + '/pay/mycart/',
            data: {},
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    $('.shouna_weike ul').empty()
                    $('.shouna_algo ul').empty()
                    $('.shouna_data ul').empty()
                    var nb = 0;
                    for (var i = 0; i < data.cart.length; i++) {
                        if (data.cart[i].category == '微课') {
                            var html = '<li class="' + data.cart[i].id + '" name="wecourse"><em>' + data.cart[i].selected + '节</em><span>' + data.cart[i].name + '</span><i>-</i></li>'
                            $('.shouna_weike ul').append(html)
                        } else if (data.cart[i].category == '算法') {
                            var html = '<li class="' + data.cart[i].id + '" name="algorithm"><em>' + data.cart[i].num + '</em><span>' + data.cart[i].name + '</span><i>-</i></li>'
                            $('.shouna_algo ul').append(html)
                        } else if (data.cart[i].category == '数据') {
                            nb++;
                            var html = '<li class="' + data.cart[i].id + '" name="data"><em>' + nb + '.</em><span>' + data.cart[i].name + '</span><i>-</i></li>'
                            $('.shouna_data ul').append(html)
                        }
                    }
                    $('.shouna_weike h3 i').html($('.shouna_weike li').length)
                    $('.shouna_algo h3 i').html($('.shouna_algo li').length)
                    $('.shouna_data h3 i').html($('.shouna_data li').length)
                    $('.shouna_box p span').html(Number($('.shouna_weike h3 i').html()) + Number($('.shouna_algo h3 i').html()) + Number($('.shouna_data h3 i').html()))
                    $('.fixed_shouna>em').html($('.shouna_box p span').html())
                } else {
                    alertmsg(data.msg, '', 0)
                }
            },
            error: function(data) {
                console.log(data)
            }
        })
    }
    $('.details_add_algo').click(function() {
        var time = $('.ci').html();
        var all_price = $('.jia').html();
        $.ajax({
            type: 'POST',
            url: url_ip + '/pay/addmycart/',
            data: { goods: 'algorithm', goods_id: _id, num: 1000, price: 0 },
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    alertmsg(data.msg, '', 1)
                    lkwStorage();
                } else {
                    alertmsg(data.msg, '', 0)
                }
            },
            error: function(data) {
                console.log(data)
                if (data.status == 401) {
                    $('.shade').show();
                }
            }
        })
    })
    $('.details_add_data').live('click', function() {
            $.ajax({
                type: 'POST',
                url: url_ip + '/pay/addmycart/',
                data: { goods: 'data', goods_id: _id },
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(data) {
                    // console.log(data)
                    if (data.status) {
                        alertmsg(data.msg, '', 1)
                        lkwStorage()
                            // $('.details_zan span').html(Number($('.details_zan span').html()) + Number(data.is))
                    } else {
                        alertmsg(data.msg, '', 0)
                    }
                },
                error: function(data) {
                    console.log(data)
                    if (data.status == 401) {
                        $('.shade').show();
                    }
                }
            })
        })
        // 联系我们
    var touch_us = document.createElement('a');
    $(touch_us).html('请联系我们，反馈这个错误')
    $(touch_us).attr('href', 'feedback.html')
        // 消息提示msgbox
    function alertmsg(msg, tag, num) {
        $('.mu').show();
        $('.msgbox img').removeClass('on')
        if (num == 1) {
            $('.success').addClass('on')
            $('.msgbox span').css('color', '#06415E')
        } else {
            $('.fail').addClass('on')
            $('.msgbox span').css('color', '#DC1010')
        }
        $('.msgbox span').html(msg);
        $('.msgbox').fadeIn();
        var timeout
        clearTimeout(timeout)
        timeout = setTimeout(function() {
            $('.msgbox').fadeOut();
            $('.mu').hide();
        }, 2000)
    }
})