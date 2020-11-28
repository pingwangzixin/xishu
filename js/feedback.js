// var token = "JWT " + window.sessionStorage.token;
// console.log(url_ip)
// console.log(token)

var wtAllPage = 0;

function calc() {
    //正文盒子高
    var contBoxH = $(window).height() - $('nav').outerHeight() - ($('.fadeTitle').outerHeight()) * 2 - 10; //整体盒子高
    var textareaH = contBoxH - $('.back_box .tabFoo').outerHeight() - $('.back_box .quiz h2').outerHeight() * 2 - $('.back_box .quiz input').outerHeight() * 2 - $('.back_box .btn').outerHeight() - 50;
    $('.back_box .quiz textarea').height(textareaH); //左侧盒子textarea撑起高

    //左侧滚动条

    var scrollLH = contBoxH - $('.back_box .tabFoo').outerHeight() - $('.back_box .wt_paging').outerHeight(true) + 50 + 8;
    $(".back_box .record dt .questionPFoo").slimScroll({
        height: scrollLH,
        borderRadius: "2px"
    }).height(scrollLH - 10);

    $('.back_box .record dd .ddCont').slimScroll({
        height: scrollLH,
        borderRadius: "2px"
    });
    // $('.back_box .record dd .question,.back_box .record dd .detail').height(scrollLH / 2);
}

function caculater() {
    return
    var listH = $('.back_box .record dt').outerHeight() - 40;
    $(".back_box .record dt .questionPFoo").slimScroll({
        height: listH,
        borderRadius: "2px"
    });
    $(".back_box .record dt .questionPFoo").height(listH - 10)
    var questionH = $('.back_box .record dd .question').outerHeight() - 10;
    $(".back_box .record dd .question p").slimScroll({
        height: questionH,
        borderRadius: "2px"
    });
    var detailH = $('.back_box .record dd .detail').outerHeight() - 10;
    $(".back_box .record dd .detail p").slimScroll({
        height: detailH,
        borderRadius: "2px"
    });
}
// 问题列表ajax
function questionAjax(ajaxUrl, ajaxData, type) {
    caculater();
    $('.back_box .record dt .questionPFoo').html('努力加载中。。。');
    var type = type || 'get';
    var ajaxRes = '';
    $.ajax({
        url: url_ip + ajaxUrl,
        async: false,
        type: 'GET',
        cache: false,
        data: ajaxData,
        datatype: 'json',
        headers: { "Authorization": token },
        success: function(res) {
            ajaxRes = res;
        },
        error: function(err) {
            $('.back_box .record dt .questionPFoo').html('服务器正在维护,1');
        }
    })
    return ajaxRes;
}
//问题列表页面
function questionListPage(oData, oLiNum) {
    if (oLiNum == 1) {
        var oLiNum = oLiNum - 1
    } else {
        var oLiNum = ($('.ycl_page li.now_page').text() - 1) * 25;
    }
    var oHtml = '';
    if (oData == '') {
        oHtml = '服务器繁忙...'
    } else {
        if (oData.sum == 0) {
            oHtml = oData.msg;
        } else {
            for (var i = 0; i < oData.data.length; i++) {
                oHtml += '<p class="ellipsis" data-id="' + oData.data[i].id + '" title="' + oData.data[i].title + '">' + (oLiNum + i + 1) + '、' + oData.data[i].title + '</p>'
            }
        }
    }
    $('.back_box .record dt .questionPFoo').html(oHtml);
}
$(function() {
    calc();
    var a = /^((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(18[0-9])|(19[89]))\d{8}$/;
    var re_email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (token != 'JWT undefined') {
        $('.login_hint').hide();
        $('.login_hide').css('height', '0px');
        $('.nav_msg').click(function() {
            window.location.href = 'perscen-zh.html';
        })
    }
    $('nav .navs li').hover(function() {
        $(this).children('ul').eq(0).css('display', 'block');
    }, function() {
        $(this).children('ul').eq(0).css('display', 'none');
    });

    $('.sch').hover(function() {
        $(this).addClass('on');
        $('.sch .search').show();
    }, function() {
        $(this).removeClass('on');
        $('.sch .search').hide();
    });
    $(".m").on("click", function() {
        if ($(".m .summernote").text() == "请输入你想要的反馈的问题") {
            $(".m .summernote").text("");
            $(".m .note-editable").text("");
        }
    })
    $('.sure_btn').click(function() {
        // if(!window.sessionStorage.token) {
        // 	$('.shade').show()
        // 	return;
        // }
        var msg1 = $('.back_box input:eq(0)').val()
        var msg2 = $('.back_box .note-editable').html()
        if (msg1 == "" || msg1 == null || msg1 == undefined) {
            $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '请填写题目', setTime: 2000 });
            return;
        }
        if (msg2 == "" || msg2 == null || msg2 == undefined || msg2 == "请输入你想要的反馈的问题") {
            $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '请填写反馈内容', setTime: 2000 });
            return;
        }
        var msg3 = $("#contact").val();
        for (var i = 0; i < $(".m .note-editable img").length; i++) {
            $.ajax({
                type: "POST",
                url: url_ip + '/admins/uedimgsave/',
                async: false,
                data: {
                    cover: $(".m .note-editable img").eq(i).attr("src")
                },
                dataType: "json",
                headers: {
                    "Authorization": token
                },
                success: function(data) {
                    $(".m .note-editable img").eq(i).attr("src", data.data);
                }
            });
        }
        var msg1 = $('.back_box input:eq(0)').val()
        var msg2 = $('.back_box .note-editable').html()
        var msg3 = $('.back_box input#contact').val()
        if($('.questionClassify li.active').html() === 'DATAHOOP使用问题') {
            var types = 0
        }
        else {
            var types = 1
        }
        $.ajax({
            url: url_ip + '/personal/fellback/',
            type: 'POST',
            cache: false,
            data: { title: msg1, content: msg2, contact: msg3, types},
            datatype: 'json',
            headers: { "Authorization": token },
            success: function(res) {
                console.log(res);
                if (res.status) {
                    window.parent.postMessage('close', '*');
                    $('.back_box input:eq(0)').val('');
                    $('.back_box .note-editable').html('');
                    $("#contact").val('');
                    // $('.alertMsg').showMsg({isImg: 'isOk', h2txt: res.msg, setTime: 2000});
                    alert(res.msg);
                    history.go(0);
                } else {
                    $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: res.msg, setTime: 2000 });
                }
            },
            error: function(err) {
                console.log(err)
            }
        })
    })
    $('.no_btn').click(function() {
        window.location.href = 'index.html';
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

    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    $(document).ready(function() {
        var getArr = GetRequest();
        if (getArr.fankui == 1) {
            $('.back_box .tabFoo').find("span").eq(1).addClass('active').siblings().removeClass('active');
            $('.back_box').children('div[data-item=' + getArr.fankui + ']').show().siblings('div').hide();
            if (getArr.fankui == 1) {
                var oData = questionAjax('/personal/question', {
                    page: 1
                }, 'get');
                if (oData == '') {
                    return
                } else {
                    questionListPage(oData, 1);
                    wtAllPage = Math.ceil(oData.sum / 25);
                    pageJudgeFn(wtAllPage, 1, '.wt_paging');
                    $('.wt_paging .all_page').text(wtAllPage);
                    $('.back_box .record dt p').eq(0).click();
                }
            }
        }
    })
    //页面选项卡
    $('.back_box .tabFoo').on('click', 'span', function() {
            var nowItem = $(this).attr('data-item');
            if (nowItem == 1 && !window.sessionStorage.token) {
                window.location.href = 'login.html?back';
                return;
            }
            $(this).addClass('active').siblings().removeClass('active');

            $('.back_box').children('div[data-item=' + nowItem + ']').show().siblings('div').hide();
            if (nowItem == 1) {
                var oData = questionAjax('/personal/question', { page: 1 }, 'get');
                if (oData == '') {
                    return
                } else {
                    questionListPage(oData, 1);
                    wtAllPage = Math.ceil(oData.sum / 25);
                    pageJudgeFn(wtAllPage, 1, '.wt_paging');
                    $('.wt_paging .all_page').text(wtAllPage);
                    $('.back_box .record dt p').eq(0).click();
                }
            }
        })
        // 我的问题点击列表出详情
    $('.back_box .record dt').on('click', 'p', function() {
            $(this).addClass('active').siblings().removeClass('active');
            var nowId = $(this).attr('data-id') - 0;
            $('.back_box .record dd .question p').html('<p style="font-size: 14px;color: #333;">我的问题: </p>' + '加载中...');
            $('.back_box .record dd .detail p').html('加载中...')
            $.ajax({
                url: url_ip + '/personal/answer',
                type: 'GET',
                cache: false,
                data: { id: nowId },
                datatype: 'json',
                headers: { "Authorization": token },
                success: function(res) {
                    if (res.status) {
                        $('.back_box .record dd .question').html('<p style="margin-bottom: 10px;font-size: 14px;color: #333;">我的问题: </p><div>' + res.data.question + '</div>');
                        if (res.data.answers == '') {
                            $('.back_box .record dd .detail').html(res.msg)
                        } else {
                            $('.back_box .record dd .detail').html('<p style="font-size: 14px;color: #333;">回复(若您有其他疑问, 请继续反馈): </p><div>' + res.data.answers + '</div>')
                        }
                    } else {
                        $('.back_box .record dd .question').html('<p style="margin-bottom: 10px;font-size: 14px;color: #333;">我的问题: </p>' + '<span style="color: orange">您还未反馈过问题哦, 您的反馈是我们共同进步的源动力</span>');
                        $('.back_box .record dd .detail').html('<span style="color: orange"><span>')
                    }
                },
                error: function(err) {
                    $('.back_box .record dd .question').html('<p style="margin-bottom: 10px;font-size: 14px;color: #333;">我的问题: </p>' + '服务器正在维护, 若您有紧急反馈, 请联系客服');
                    $('.back_box .record dd .detail').html('服务器正在维护, 若您有紧急反馈, 请联系客服')
                }
            })
        })
        //问题点击页数
    $('.wt_paging').on('click', 'li', function() {
            if (wtAllPage != 0) {
                var now_page = $(this).attr('data-num') - 0;
                pageJudgeFn(wtAllPage, now_page, '.wt_paging');
                if (pageJudgeFn != '') {
                    var oData = questionAjax('/personal/question', { page: now_page }, 'get');
                    questionListPage(oData);
                    $('.back_box .record dt p').eq(0).click();
                }
            }
        })
        //问题上一页
    $('.wt_paging').on('click', '.pre_page', function() {
            if (wtAllPage != 0) {
                var old_page = $('.wt_paging li.now_page').attr('data-num') - 0;
                if (isNaN(parseInt(old_page))) {
                    return
                } else {
                    var now_page = old_page - 1
                    if (now_page == 0) {
                        return;
                    }
                    pageJudgeFn(wtAllPage, now_page, '.wt_paging');
                    var oData = questionAjax('/personal/question', { page: now_page }, 'get');
                    if (oData != '') {
                        questionListPage(oData);
                        $('.back_box .record dt p').eq(0).click();
                    }
                }
            }
        })
        //问题下一页
    $('.wt_paging').on('click', '.next_page', function() {
            if (wtAllPage != 0) {
                var old_page = $('.wt_paging li.now_page').attr('data-num') - 0;
                if (isNaN(parseInt(old_page))) {
                    return
                } else {
                    var now_page = old_page + 1;
                    if (old_page == wtAllPage) {
                        return;
                    }
                    pageJudgeFn(wtAllPage, now_page, '.wt_paging');
                    var oData = questionAjax('/personal/question', { page: now_page }, 'get');
                    if (oData != '') {
                        questionListPage(oData);
                        $('.back_box .record dt p').eq(0).click();
                    }
                }
            }
        })
        //问题页码搜索
    $('.wt_paging').on('click', '.to_page', function() {
        if (wtAllPage != 0) {
            var now_page = $('.wt_paging .will_page').val();
            if (now_page > wtAllPage) {
                return false;
            }
            if (now_page >= 1 && now_page <= wtAllPage) {
                pageJudgeFn(wtAllPage, now_page, '.wt_paging');
            }
            var oData = questionAjax('/personal/question', { page: now_page }, 'get');
            if (oData != '') {
                questionListPage(oData);
                $('.back_box .record dt p').eq(0).click();
            }
        }
    })
    // 切换问题类型
    $('.questionClassify li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    })
    // 常见问题
    $('.questionContent').on('click', 'li h4', function() {
        $(this).nextAll().toggle();
        $(this).children('span').toggleClass('rotate')
    })
    $('.questionSpan span').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('.questionContent ul').eq($(this).index()).addClass('on').siblings().removeClass('on');
        $.ajax({
            url: url_ip + '/news/FAQ/',
            type: 'GET',
            datatype: 'json',
            data: {
                classify: $(this).attr('data-id')
            },
            success: function(res) {
                if(res.status) {
                    $('.questionContent ul.on').empty();
                    var li = '';
                    for(var i = 0; i < res.data.length; i++) {
                        li += `
                        <li>
                            <h4>${res.data[i].title}：<span></span></h4>
                            ${res.data[i].content}
                        </li>
                        `
                    }
                    $('.questionContent ul.on').append(li)
                }
            }
        })
    })
    $('.questionSpan span:eq(0)').click()
})
$(window).resize(function() {
    calc();
});
$(function() {
    $(".m").on("click", ".note-insert>button:eq(1)", function() {
        $(".back_box2").css({ "position": "relative", "z-index": " 9999" });
        $(".modal-backdrop").css("opacity", "0");
    })
    $(".sure_btn").on("click", function() {
        $(".back_box2").css({
            "position": "none",
            "z-index": " 1000"
        });
    })
})
