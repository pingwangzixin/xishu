var algAll_page = 0;

/*分页*/
function pageJudgeFn(all_page, now_page, fooClass) {
    $(fooClass).find('.all_page').text(all_page)
    if (all_page > 1) {
        $(fooClass).show();
        $(fooClass + ' ul').html('');
        if (all_page <= 5) { //隐藏点
            $(fooClass).children('.left_dian,.last_dian').hide();
            for (var i = 1; i <= all_page; i++) {
                $(fooClass + ' ul').append('<li class="" data-num="' + i + '">' + i + '</li>');
            }
        } else { //总页数大于5
            if (now_page <= 3) { //1-3显示前5页, 隐藏之前'...';
                $('.left_dian').hide();
                $('.last_dian').show();
                for (var i = 1; i <= 5; i++) {
                    $(fooClass + ' ul').append('<li class="" data-num="' + i + '">' + i + '</li>');
                }
            } else if (now_page > 3 && now_page <= (all_page - 3)) { //3之后,倒数后3之前显示 n-2 ~ n+2页, 显示'...'
                $(fooClass).children('.left_dian,.last_dian').show();
                for (var i = (now_page - 2); i <= (now_page + 2); i++) {
                    $(fooClass + ' ul').append('<li class="" data-num="' + i + '">' + i + '</li>');
                }
            } else { //后3 显示后5页, 隐藏之后'...'
                $('.left_dian').show();
                $('.last_dian').hide();
                for (var i = (all_page - 5 + 1); i <= all_page; i++) {
                    $(fooClass + ' ul').append('<li class="" data-num="' + i + '">' + i + '</li>');
                }
            }
        }
        $(fooClass + ' ul li[data-num=' + now_page + ']').addClass('now_page').siblings().removeClass('now_page');
        if (now_page == 1 && now_page != all_page) {
            $(fooClass).find('.next_page img').attr('src', 'img/weiyou.png'); //yes
            $(fooClass).find('.pre_page img').attr('src', 'img/buzuo.png'); //no
        } else if (now_page == all_page && now_page != 1) {
            $(fooClass).find('.pre_page img').attr('src', 'img/weizuo.png'); //yes
            $(fooClass).find('.next_page img').attr('src', 'img/buyou.png'); //no
        } else {
            $(fooClass).find('.pre_page img').attr('src', 'img/weizuo.png'); //yes
            $(fooClass).find('.next_page img').attr('src', 'img/weiyou.png'); //yes
        }
    } else {
        $(fooClass).hide();
    }
}
// 横向滚屏
function ScrollImgLeft() {
    var speed = 15;
    var scroll_begin = document.getElementById("scroll_begin");
    var scroll_end = document.getElementById("scroll_end");
    var scroll_div = document.getElementById("scroll_div");
    scroll_end.innerHTML = scroll_begin.innerHTML;

    function Marquee() {
        if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0) {
            scroll_div.scrollLeft -= scroll_begin.offsetWidth;
        } else {
            scroll_div.scrollLeft++;
        }
    }
    var MyMar = setInterval(Marquee, speed);
    scroll_div.onmouseover = function() {
        clearInterval(MyMar);
    }
    scroll_div.onmouseout = function() {
        clearInterval(MyMar);
        MyMar = setInterval(Marquee, speed);
    }
}
// 数据列表封装
function data_listFn(page) {
    $('.algList_loadGif').stop().slideDown();
    var label_name = [];
    $('.alg_listTap li.active').each(function() {
        label_name.push($(this).attr('data-name'));
    })
    var keyword = $('.alg_listSech input').val();
    $('.alg_listCont').html('');
    $.ajax({
        async: false,
        type: "GET",
        url: url_ip + '/files/',
        data: { label_name: JSON.stringify(label_name), page: page, keyword: keyword },
        dataType: "json",
        success: function(res) {
            if (res.status) {
                if (res.data.length == '') {
                    $('.alg_listCont').html('<div style="font-size: 18px;color: #000;">' +
                        '很抱歉, 没有找到与 "<span style="color: #c00">' + keyword + '</span>" 相关的数据<br />' +
                        '<h4 style="line-height: 28px;font-size: 13px;color: #666;">温馨提示: </h4>' +
                        '<p style="line-height: 28px;padding-left: 30px;font-size:13px;font-family: "宋体";color: #333;">1. 请更换关键字试试;</p>' +
                        '<p style="line-height: 28px;padding-left: 30px;font-size:13px;font-family: "宋体";color: #333;">2. 如有任何需求, 请<a href="feedback.html" style="color: #00c;">反馈给我们</a>;</p>' +
                        '</div>');
                } else {
                    for (var i = 0; i < res.data.length; i++) {
                        var spanHtml = '';
                        for (j = 0; j < res.data[i].label.length; j++) {
                            spanHtml += '<span>' + res.data[i].label[j] + '</span>'
                        }
                        var oHtml = '<li data-id="' + res.data[i].id + '" data-where="' + res.data[i].where + '">' +
                            '<div class="alg_listShow relative">' +
                            '<img src="' + url_ip + res.data[i].cover + '" width="100%" alt="">' +
                            '<div>' +
                            '<h3><span>' + (res.data[i].file_name || "--") + '<br /><i>' + res.data[i].user + '</i></span><b>免费</b></h3>' +
                            '<p>' + spanHtml + '</p>' +
                            '<h4>' +
                            '<span class="view"><i></i>' + res.data[i].view_num + '</span>' +
                            '<span class="msg"><i></i>' + res.data[i].comment_num + '</span>' +
                            '<span class="praise"><i></i>' + res.data[i].thumb_num + '</span>' +
                            '</h4>' +
                            '</div>' +
                            // '<i class="addSn" title="添加到收纳"></i>'+
                            '</div>' +
                            '<div class="slideHide">' +
                            // '<i class="addSn" title="添加到收纳"></i>'+
                            '<h5>' + res.data[i].title; + '</h5>' +
                        '</div>' +
                        '</li>'
                        $('.alg_listCont').append(oHtml);
                    }
                }
                algAll_page = Math.ceil(res.sum / 18);
                pageJudgeFn(algAll_page, page, '.alg_listPag');
            }
        },
        error: function(err) {
            console.log(err);
        },
        complete: function() {
            $('.algList_loadGif').stop().slideUp();
        }
    })
}

$(function() {
    var nowSearch = GetQueryString('cm');
    var nowSearch2 = GetQueryString('sj');
    if (nowSearch2) {
        nowSearch2 = nowSearch2 - 0;
        $('.alg_listTap li').eq(nowSearch2).addClass('active').siblings().removeClass('active');
        $('html,body').animate({ scrollTop: $('.alg_list').offset().top });
    }
    $('.alg_list h2 span[data-type="' + nowSearch + '"]').addClass('active').siblings().removeClass('active');

    ScrollImgLeft();
    // 数据列表
    data_listFn(1);

    // 算法-大图小图
    $('.modeSwitch').on('click', 'i', function() {
            $(this).addClass('active').siblings().removeClass('active');
            $('.slideHide').attr('style', '')
            var nowType = $(this).attr('data-type');
            if (nowType == 'min') {
                $('.alg_listCont').addClass('alg_listContMin').removeClass('alg_listContMax');
            } else if (nowType == 'max') {
                $('.alg_listCont').addClass('alg_listContMax').removeClass('alg_listContMin');
            }
        })
        // 算法大图标-列表样式
    $('.alg_list').on('mouseenter', '.alg_listContMax li', function() {
        $(this).children('.slideHide').stop().animate({ left: 0 }, 200);
    })
    $('.alg_list').on('mouseleave', '.alg_listContMax li', function() {
            $(this).children('.slideHide').stop().animate({ left: '-192.8px' }, 200);
        })
        // 算法小图标-列表样式
    $('.alg_list').on('mouseenter', '.alg_listContMin li', function() {
        $(this).children('.slideHide').stop().slideDown(200);
    })
    $('.alg_list').on('mouseleave', '.alg_listContMin li', function() {
            $(this).children('.slideHide').stop().slideUp(200);
        })
        // 数据tab点击
    $('.alg_listTap').on('click', 'li', function() {
            $(this).toggleClass('active');
            data_listFn(1);
            $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
        })
        //输入框搜索
    $('.alg_listSech input').on('keyup', function(e) {
        var nowEvent = e || window.event;
        if (e.keyCode == "13") {
            data_listFn(1);
            $(this).val('');
            $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
        }
    })
    $('.alg_listSech').on('click', 'i', function() {
            data_listFn(1);
            $(this).prev('input').val('');
            $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
        })
        //点击页数
    $('.alg_listPag').on('click', 'li', function() {
            var page = $(this).attr('data-num') - 0;
            data_listFn(page);
            $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
        })
        //上一页
    $('.alg_listPag').on('click', '.pre_page', function() {
            var page = $('.alg_listPag').find('li.now_page').attr('data-num') - 1;
            data_listFn(page);
            $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
        })
        //下一页
    $('.alg_listPag').on('click', '.next_page', function() {
            var page = $('.alg_listPag').find('li.now_page').attr('data-num') - 0 + 1;
            if (page >= algAll_page + 1) {
                return;
            }
            data_listFn(page);
            $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
        })
        //页码搜索
    $('.alg_listPag').on('click', '.to_page', function() {
        var page = $('.alg_listPag').find('.will_page').val() - 0;
        if (page > algAll_page) {
            return;
        }
        if (page >= 1 && page <= algAll_page) {
            data_listFn(page);
        }
        $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
    })

    // 添加到收纳-数据
    $('.alg_listCont').on('click', 'li .addSn', function() {
        var algo_id = $(this).closest('li').attr('data-id');
        $.ajax({
            type: 'POST',
            url: url_ip + '/pay/addmycart/',
            data: { goods: 'data', goods_id: algo_id },
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function(res) {
                if (res.status) {
                    // lkwMessage('success', res.msg)
                    $('.alertMsg2').showMsg({
                        isImg: 'isOk',
                        h2txt: '添加成功',
                        ptxt: '请到个人中心>我的收纳查看, <a href="perscen-sn.html" style="color: #496FFF;text-decoration:underline">查看</a>',
                        setTime: 1500
                    });
                    lkwStorage();
                } else {
                    $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: res.msg, setTime: 3000 });
                }
            },
            error: function(err) {
                console.log(err)
                if (err.status == 401) {
                    $('.shade').showMsg({ ptxt: '您目前还没有注册或登录~ ' });
                }
            }
        })
    })

    // 点击进入详情页
    $('.alg_listContMin').on('click', 'img, h3', function() {
        var algo_id = $(this).closest('li').attr('data-id');
        var where_id = $(this).closest('li').attr('data-where');
        sessionStorage.setItem("data_algo", 'data');
        sessionStorage.setItem("data_id", algo_id);
        sessionStorage.setItem("where_id", where_id);
        window.location.href = 'details.html?' + algo_id;
    })
    $('.alg_listContMax .slideHide h5').live('click', function() {
        var algo_id = $(this).closest('li').attr('data-id');
        var where_id = $(this).closest('li').attr('data-where');
        sessionStorage.setItem("data_algo", 'data');
        sessionStorage.setItem("data_id", algo_id);
        sessionStorage.setItem("where_id", where_id);
        window.location.href = 'details.html?' + algo_id;
    })
})