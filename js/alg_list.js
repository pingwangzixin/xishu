var algAll_page = 0;
var sf_or_sjListUrl = '/model/alglabel/';

$(function() {
    $.ajax({
        type: "GET",
        url: url_ip + "/labels/showalg",
        data: {
            classify: 1
        },
        dataType: "json",
        async: false,
        success: function(res) {
            if (res.status) {
                for (var i = 0; i < res.data.length; i++) {
                    var li = $('<li data-type="sf" data-name="' + res.data[i].label_name + '" data-id="' + res.data[i].id + '">' + res.data[i].label_name + '</li>');
                    $(".alg_listTap").append(li);
                }
            }
        }
    });
    $.ajax({
        type: "GET",
        url: url_ip + "/labels/showalg",
        data: {
            classify: 2
        },
        dataType: "json",
        async: false,
        success: function(res) {
            if (res.status) {
                for (var i = 0; i < res.data.length; i++) {
                    var li = $('<li class="hide" data-type="sj" data-name="' + res.data[i].label_name + '" data-id="' + res.data[i].id + '">' + res.data[i].label_name + '</li>');
                    $(".alg_listTap").append(li);
                }
            }
        }
    });
})

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
                for (var i = (now_page - 2); i <= (+now_page + 2); i++) {
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
// 智能推荐
function algRankFn(way) {
    $('.algRankCont').html('');
    $('.algRankCont_loadGif').show();
    $.ajax({
        type: "GET",
        url: url_ip + "/news/push/",
        data: { way: way, id: token_id },
        dataType: "json",
        success: function(res) {
            if (res.status && res.data) {
                for (var i = 0; i < res.data.length; i++) {
                    var spanHtml = '';
                    for (var j = 0; j < res.data[i].label.length; j++) {
                        if (res.data[i].label != '') {
                            spanHtml += '<span>' + res.data[i].label[j] + '</span>'
                        }
                    }
                    var oName = res.data[i].name || '--'
                    var oHtml = '<li data-id="' + res.data[i].id + '">' +
                        '<div class="algRankCont_top">' +
                        '<i class="slideDown hide"></i>' +
                        '<h3>' + oName + '</h3>' +
                        '<div class="spanFoo">' + spanHtml + '</div>' +
                        '<p class="spanData">' +
                        '<span>评论: <i>' + res.data[i].comment_num + '</i></span>' +
                        '<span>引用: <i>' + res.data[i].cite + '</i></span>' +
                        '</p>' +
                        '</div>' +
                        '<div class="slideCont">' +
                        '<h4>算法简介: </h4>' +
                        '<div>递四方速递水电费水电费</div>' +
                        '</div>' +
                        '</li>';
                    $('.algRankCont').append(oHtml);
                }
                $('.algRankCont_loadGif').hide();
            } else {
                $('.algRankCont_loadGif').addClass('err');
                $('.algRankCont_loadGif p').text(res.msg);
            }
        },
        error: function(err) {
            console.log(err);
            $('.algRankCont_loadGif').addClass('err');
            $('.algRankCont_loadGif p').text(err.status);
        }
    })
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
// 算法列表封装
function alg_listFn(page) {
    $('.algList_loadGif').stop().slideDown();
    var label_name = [];
    $('.alg_listTap li.active').each(function() {
        label_name.push($(this).attr('data-id'));
    })
    var keyword = $('.alg_listSech input').val();
    $('.alg_listCont').html('');
    $.ajax({
        async: false,
        type: "GET",
        url: url_ip + sf_or_sjListUrl,
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
                            spanHtml_every = (res.data[i].label[j] == '' ? '--' : res.data[i].label[j])
                            spanHtml += '<span>' + spanHtml_every + '</span>'
                        }
                        var titlName = '';
                        var authorName = '';
                        var isShowAddSn = '';
                        if (sf_or_sjListUrl == '/model/alglabel/') {
                            var imgUrl = url_ip + '/' + res.data[i].algo_img;
                            var abstractTxt = res.data[i].abstract;
                            titlName = res.data[i].name;
                            authorName = res.data[i].user_name;
                        } else if (sf_or_sjListUrl == '/files/') {
                            var imgUrl = url_ip + res.data[i].cover;
                            var abstractTxt = res.data[i].title;
                            titlName = res.data[i].file_name;
                            authorName = res.data[i].user;
                        } else if (sf_or_sjListUrl == '/model/sencelabel/') {
                            var imgUrl = url_ip + '/' + res.data[i].sence_img;
                            var abstractTxt = res.data[i].abstract;
                            titlName = res.data[i].name;
                            authorName = res.data[i].user_name;
                            isShowAddSn = 'hide';
                        }
                        var oHtml = '<li data-id="' + res.data[i].id + '" data-where="' + res.data[i].where + '">' +
                            '<div class="alg_listShow relative">' +
                            '<img src="' + imgUrl + '" width="100%" alt="">' +
                            '<div>' +
                            '<h3><span>' + (titlName || "--") + '<br /><i>' + authorName + '</i></span><b>' + `${res.data[i].levellabel ? res.data[i].levellabel : '免费'}` + '</b></h3>' +
                            '<p>' + spanHtml + '</p>' +
                            '<h4>' +
                            '<span class="view"><i></i>' + res.data[i].view_num + '</span>' +
                            '<span class="msg"><i></i>' + res.data[i].comment_num + '</span>' +
                            '<span class="praise"><i></i>' + res.data[i].thumb_num + '</span>' +
                            '</h4>' +
                            '</div>' +
                            '<i class="addSn ' + isShowAddSn + '" title="添加到收纳"></i>' +
                            '</div>' +
                            '<div class="slideHide">' +
                            // '<i class="addSn ' + isShowAddSn + '" title="添加到收纳"></i>' +
                            '<h5>' + abstractTxt + '</h5>' +
                            '</div>' +
                            '</li>'
                        $('.alg_listCont').append(oHtml);
                    }
                }
                algAll_page = Math.ceil(res.sum / 20);
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
    var nowSearch = window.location.search.substr(1).split('=');
    if (nowSearch[0] == 'sf') {
        // 算法-数据列表
        sf_or_sjListUrl = '/model/alglabel/';
    } else if (nowSearch[0] == 'sj') {
        // 算法-数据列表
        sf_or_sjListUrl = '/files/';
    } else if (nowSearch[0] == 'cj') {
        sf_or_sjListUrl = '/model/sencelabel/';
    }
    $('.alg_list h2 span[data-type="' + nowSearch[0] + '"]').addClass('active').siblings().removeClass('active');
    $('.alg_listTap li[data-type="' + nowSearch[0] + '"]').eq(nowSearch[1]).addClass('active').siblings().removeClass('active');
    $('.alg_listTap li[data-type="' + nowSearch[0] + '"]').show();
    $('.alg_listTap li[data-type!="' + nowSearch[0] + '"]').hide();


    $('.algRankCont').on('click', '.algRankCont_top i.slideDown', function() {
        $(this).closest('li').siblings().removeClass('active');
        if ($(this).parent('.algRankCont_top').next('.slideCont').is(":hidden")) {
            $(this).closest('li').addClass('active');
        } else {
            $(this).closest('li').removeClass('active');
        }

        $(this).closest('li').siblings('li').children('.slideCont').stop().slideUp(200);
        $(this).parent('.algRankCont_top').next().stop().slideToggle(200);
    })

    // 智能推荐
    $('.algRankTab p span[data-type="' + nowSearch[0] + '"]').addClass('active').siblings().removeClass('active');
    algRankFn($('.algRankTab p span[data-type="' + nowSearch[0] + '"]').attr('data-name'));
    // 推荐切换
    $('.algRankTab p').on('click', 'span', function() {
            var way = $(this).attr('data-name');
            $(this).addClass('active').siblings().removeClass('active');
            algRankFn(way);
        })
        // 推荐内容点击
    $('.algRankCont').on('click', 'li', function() {
        var needId = $(this).attr('data-id');
        var nowType = $('.algRankTab p span.active').attr('data-type');
        switch (nowType) {
            case 'sf':
                sessionStorage.setItem("data_algo", 'algo');
                sessionStorage.setItem("form", 'index');
                window.location.href = 'details.html?' + needId;
                break;
            case 'sj':
                var where_id = $(this).attr('data-where');;
                sessionStorage.setItem("data_algo", 'data');
                sessionStorage.setItem("where_id", where_id);
                window.location.href = 'details.html?' + needId;
                break;
            case 'cj':
                if (token != 'JWT undefined' && token != 'JWT null') {
                    sessionStorage.setItem("model_id_index", needId);
                    window.location.href = 'model.html';
                } else {
                    $('.shade').showMsg({ ptxt: '您目前还没有注册或登录~ ' });
                }
                break;
        }
    })

    ScrollImgLeft();

    // 算例排行榜
    $.ajax({
            url: url_ip + '/push/IndexRanking/',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(res) {
                if (res.status) {
                    $('.algo_rank p').html('');
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].type == 'algo_rank') {
                            $('.newRecentFoo .algo_rank').append('<span data-id="' + res.data[i].id + '">' + res.data[i].name + '</span>')
                        }
                    }
                }
            },
            error: function(data) {
                console.log(data)
            }
        })
        // 算例排行榜点击
    $('.newRecentFoo .algo_rank').on('click', 'span', function() {
        var algo_id = $(this).attr('data-id');
        sessionStorage.setItem("data_algo", 'algo');
        sessionStorage.setItem("form", 'index');
        window.location.href = 'details.html?' + algo_id;
    })

    // 首次进页面记录标签
    sessionStorage.getItem('alg_listTap_arr') ? showlistTap(sessionStorage.getItem('alg_listTap_arr')) : ''
        // 算法-数据列表 （首次进页面）
    if (sessionStorage.getItem("alg_list_page")) {
        alg_listFn(sessionStorage.getItem("alg_list_page"));
        sessionStorage.removeItem("alg_list_page");
    } else {
        alg_listFn(1);
    }
    // 为标签添加样式
    function showlistTap(val) {
        var arr = val.split(',');
        arr.forEach(value => {
            $(`.alg_listTap li[data-id=${value}]`).toggleClass('active')
        });
        sessionStorage.removeItem('alg_listTap_arr')
    }
    var gd_x = true;
    $(".alg_listClass_type>span").on("click", function() {
            if (gd_x) {
                $(".alg_listClass_type").css({
                    "height": "auto"
                });
                gd_x = false;
                $(this).children("i").css({
                    "transition": "all 0.5s",
                    "transform": "rotate(180deg)"
                })
            } else {
                $(".alg_listClass_type").css({
                    "height": "65px"
                });
                gd_x = true;
                $(this).children("i").css({
                    "transition": "all 0.5s",
                    "transform": "rotate(0)"
                })
            }
        })
        // 算法-数据切换
    $('.alg_list h2').on('click', 'span', function() {
        gd_x = true;
        $(".alg_listClass_type").css({
            "height": "65px"
        });
        $(".alg_listClass_type>span").children("i").css({
            "transition": "all 0.5s",
            "transform": "rotate(0)"
        })
        var nowType = $(this).attr('data-type');
        // if(nowType == 'cj') {
        // 	return
        // } else {
        $(this).addClass('active').siblings().removeClass('active');

        $('.alg_listTap li').removeClass('active');
        $('.alg_listSech input').val('');

        $('.alg_listTap li[data-type!="' + nowType + '"]').hide()
        $('.alg_listTap li[data-type="' + nowType + '"]').show();
        if (nowType == 'sf') {
            alg_listFn(1);
            sf_or_sjListUrl = '/model/alglabel/';
        } else if (nowType == 'sj') {
            sf_or_sjListUrl = '/files/';
        } else if (nowType == 'cj') {
            sf_or_sjListUrl = '/model/sencelabel/';
        }
        alg_listFn(1);
        $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
            // }
    })


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

    // 算法-数据tab点击
    $('.alg_listTap').on('click', 'li', function() {
        $(this).toggleClass('active');
        alg_listFn(1);
        $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
    })

    //输入框搜索
    $('.alg_listSech input').on('keyup', function(e) {
        var e = e || window.event;
        if (e.keyCode == "13") {
            alg_listFn(1);
            $(this).val('');
            $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
        }
    })
    $('.alg_listSech').on('click', 'i', function() {
            alg_listFn(1);
            $(this).prev('input').val('');
            $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
        })
        //点击页数
    $('.alg_listPag').on('click', 'li', function() {
            var page = $(this).attr('data-num') - 0;
            alg_listFn(page);
            $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
        })
        //上一页
    $('.alg_listPag').on('click', '.pre_page', function() {
            var page = $('.alg_listPag').find('li.now_page').attr('data-num');
            if (page == 1) {
                return;
            } else {
                page -= 1;
            }
            alg_listFn(page);
            $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
        })
        //下一页
    $('.alg_listPag').on('click', '.next_page', function() {
            var page = $('.alg_listPag').find('li.now_page').attr('data-num') - 0 + 1;
            if (page >= algAll_page + 1) {
                return;
            }
            alg_listFn(page);
            $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
        })
        //页码搜索
    $('.alg_listPag').on('click', '.to_page', function() {
        var page = $('.alg_listPag').find('.will_page').val() - 0;
        if (page > algAll_page) {
            return;
        }
        if (page >= 1 && page <= algAll_page) {
            alg_listFn(page);
        }
        $('html,body').animate({ scrollTop: $('.alg_list').offset().top })
    })

    // 添加到收纳-算法
    $('.alg_listCont').on('click', 'li .addSn', function() {
        var algo_id = $(this).closest('li').attr('data-id');
        if (sf_or_sjListUrl == '/files/') { //数据
            $.ajax({
                type: 'POST',
                url: url_ip + '/pay/addmycart/',
                data: { goods: 'data', goods_id: algo_id },
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(res) {
                    if (res.status) {
                        $('.alertMsg2').showMsg({
                            isImg: 'isOk',
                            h2txt: '添加成功',
                            ptxt: '请到个人中心>我的收纳查看, <a href="perscen-sn.html" style="color: #496FFF;text-decoration:underline">查看</a>',
                            setTime: 1500
                        });
                        lkwStorage()
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
        } else {
            $.ajax({
                type: 'get',
                url: url_ip + '/pay/algoargument/',
                data: { algo_id: algo_id },
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(res) {
                    if (res.status) {
                        var all_price = (res.data.price - 0) * (res.data.sample_sec - 0) * 1000;
                        $.ajax({
                            type: 'POST',
                            url: url_ip + '/pay/addmycart/',
                            data: { goods: 'algorithm', goods_id: algo_id, num: 1000, price: all_price },
                            dataType: 'json',
                            headers: { 'Authorization': token },
                            success: function(res2) {
                                if (res2.status) {
                                    $('.alertMsg2').showMsg({
                                        isImg: 'isOk',
                                        h2txt: '添加成功',
                                        ptxt: '请到个人中心>我的收纳查看, <a href="perscen-sn.html" style="color: #496FFF;text-decoration:underline">查看</a>',
                                        setTime: 1500
                                    });
                                    lkwStorage()
                                } else {
                                    $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: res2.msg, setTime: 3000 });
                                }
                            },
                            error: function(err2) {
                                console.log(err2)
                            }
                        })
                    } else {
                        $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: res.msg });
                    }
                },
                error: function(err) {
                    console.log(err)
                    if (err.status == 401) {
                        $('.shade').showMsg({ ptxt: '您目前还没有注册或登录~ ' });
                    }
                }
            })
        }
    })

    // 点击进入详情页
    $('.alg_listContMin').on('click', 'img, h3', function() {
        // 记录标签样式
        var alg_listTap_arr = [];
        $('.alg_listTap li.active').each(function() {
                alg_listTap_arr.push($(this).attr('data-id'))
            })
            // 利用es6去重
        alg_listTap_arr = [...new Set(alg_listTap_arr)]
        sessionStorage.setItem('alg_listTap_arr', alg_listTap_arr)
        sessionStorage.setItem("alg_list_page", $('.now_page').attr('data-num'));
        var algo_id = $(this).closest('li').attr('data-id');
        if (sf_or_sjListUrl == '/files/') { //数据
            var where_id = $(this).closest('li').attr('data-where');
            sessionStorage.setItem("data_algo", 'data');
            sessionStorage.setItem("data_id", algo_id);
            sessionStorage.setItem("where_id", where_id);
        } else if (sf_or_sjListUrl == '/model/alglabel/') {
            sessionStorage.setItem("data_algo", 'algo');
            sessionStorage.setItem("form", 'index');
        } else {
            sessionStorage.setItem("alg_list_page", 1);
            window.open('details_cj.html?_id=' + algo_id);
            return;
        }
        window.location.href = 'details.html?' + algo_id;
    })
    $('.alg_listContMax .slideHide h5').live('click', function() {
        var algo_id = $(this).closest('li').attr('data-id');
        if (sf_or_sjListUrl == '/files/') { //数据
            var where_id = $(this).closest('li').attr('data-where');
            sessionStorage.setItem("data_algo", 'data');
            sessionStorage.setItem("data_id", algo_id);
            sessionStorage.setItem("where_id", where_id);
        } else {
            sessionStorage.setItem("data_algo", 'algo');
            sessionStorage.setItem("form", 'index');
        }
        window.location.href = 'details.html?' + algo_id;
    })
})

//$('.alertMsg) 点击幕关闭弹窗
// $('#indexApp').on('click', '.alertMsg2', function () {
// 	debugger
// 	$(this).fadeOut();
// })
// $('#indexApp').on('click', '.alertMsg2 .msg-box', function () {
// 	return false;
// })