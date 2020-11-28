//彩泥喜欢
function guessloveFn(objData) {
    $.GSHajax({
        url: '/files/course_push/',
        dom: '.guesslove_load',
        type: 'post',
        data: objData,
        success: function(res) {
            var guessloveHtml = '';
            for (var i = 0; i < res.data.length; i++) {
                var guessloveSpanHtml = '';
                for (var j = 0; j < res.data[i].label.length; j++) {
                    guessloveSpanHtml += '<span>' + res.data[i].label[j] + '</span>'
                }
                guessloveHtml += '<li data-id="' + res.data[i].id + '">' +
                    '<img src="' + url_ip + res.data[i].cover + '" width="100%" height="169" alt="">' +
                    '<h6>' + res.data[i].name + '</h6>' +
                    '<p>' + guessloveSpanHtml + '</p>' +
                    '</li>'
            }
            $('.xssy_guesslove .xssy_source').html(guessloveHtml);
        }
    })
}
//行业标签滚动条
function guessSpanScrollFn() {
    var guessSpanScrollH = $('.xssy_list_alert').outerHeight() - $('.xssy_list_alert .titl').outerHeight(true) - $('.xssy_list_alert .btn').outerHeight(true) - 20; //ul上下padding、btn底部20
    $('.xssy_list_alert .xssy_list_alertUl').slimScroll({
        height: guessSpanScrollH,
        borderRadius: "0px"
    });
}
//行业标签内容
function guessSpanFn() {
    $('.xssy_list_alertMu').fadeIn();
    $.GSHajax({
        url: '/files/profession/',
        success: function(res) {
            if (res.status) {
                var guessSpan_gjHtml = '';
                for (var i = 0; i < res.data.weike_info.length; i++) {
                    guessSpan_gjHtml += '<span data-item="gj">' + res.data.weike_info[i] + '</span>';
                }
                $('.xssy_list_alertUl li[data-item="gj"] .spanFoo').html(guessSpan_gjHtml);
                var guessSpan_hyHtml = '';
                var guessSpan_zyHtml = '';
                for (var i = 0; i < res.data.weike_industry.length; i++) {
                    guessSpan_hyHtml += '<span data-item="hy">' + res.data.weike_industry[i].name + '</span>';
                    for (var j = 0; j < res.data.weike_industry[i].list.length; j++) {
                        guessSpan_zyHtml += '<span data-item="zy" data-foo="' + res.data.weike_industry[i].name + '">' + res.data.weike_industry[i].list[j] + '</span>';
                    }
                }
                $('.xssy_list_alertUl li[data-item="hy"] .spanFoo').html(guessSpan_hyHtml);
                $('.xssy_list_alertUl li[data-item="zy"] .spanFoo').html(guessSpan_zyHtml);
            } else {
                $('.xssy_list_alertMu').hide();
            }
        },
        error: function() {
            $('.xssy_list_alertMu').hide();
        }
    })
    guessSpanScrollFn();
}
//热门课程
function hotcourseFn() {
    $.GSHajax({
        url: '/operatorsettings/hotcourse/',
        dom: '.hotsource_load',
        success: function(res) {
            if (res.status) {
                var hotcourseHtml = '';
                for (var i = 0; i < res.data.length; i++) {
                    var hotcourseSpanHtml = '';
                    for (var j = 0; j < res.data[i].label.length; j++) {
                        hotcourseSpanHtml += '<span>' + res.data[i].label[j] + '</span>'
                    }
                    hotcourseHtml += '<li data-id="' + res.data[i].id + '">' +
                        '<img src="' + url_ip + res.data[i].img + '" width="100%" height="169" alt="">' +
                        '<h6>' + res.data[i].name + '</h6>' +
                        '<p>' + hotcourseSpanHtml + '</p>' +
                        '</li>'
                }
                $('.hot_source .xssy_source').html(hotcourseHtml);
            }
        }
    })
}
//资源分享
function sourceShareFn() {
    $.GSHajax({
        url: '/operatorsettings/resourceshare/',
        // dom: '.hotsource_load',
        success: function(res) {
            if (res.status) {
                var optionHtml = '';
                for (var i = 0; i < res.data.orientation.length; i++) {
                    optionHtml += '<option value="' + res.data.orientation[i] + '">' + res.data.orientation[i] + '</option>'
                }
                $('.sourceShare .shareForm p select').html(optionHtml);
            }
        }
    })
}
$(function() {
    // 判断是否可以直接进入选课中心
    if(sessionStorage.getItem('cancome')) {
        $.GSHajax({
            url: '/operatorsettings/course_list/',
            success: function(res) {
                if (!res.status) {
                    $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: res.msg });
                } else {
                    window.location.href = 'cpda_selsource.html';
                }
                sessionStorage.removeItem('cancome')
            }
        })
    }
    var objData = {};
    var isComeCpda = GetQueryString('com');
    if (isComeCpda == 'cpdanet') {
        $('html,body').animate({ scrollTop: $('.slect_source').offset().top });
        $.GSHajax({
            url: '/operatorsettings/course_list/',
            error: function(err) {
                if (err.status == 401) {
                    $('.shade').showMsg();
                } else {
                    $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '服务异常, 请刷新重试或联系我们' });
                }
            },
            success: function(res) {
                if (!res.status) {
                    $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: res.msg });
                } else {
                    window.location.href = 'cpda_selsource.html';
                }
            }
        })
    } else {
        if (token != 'JWT undefined' && token != 'JWT null') { // 已登录
            objData = get('_span_related_', 1000 * 60 * 60 * 24 * 30); //过期时间为30天
            if (objData == '') { // 已登录-且30天内未选择标签
                // $('.xssy_list_alertMu').fadeIn();
                // guessSpanFn(); //渲染行业标签
                objData = { id: token_id };
            } else { // 已登录-且30天内有选过标签
                objData.id = token_id;
                objData.tools = JSON.stringify(objData.tools.split(','))
            }
        } else {
            objData = { change: 1 }; // 没登录, 默认彩泥
        }
    }
    hotcourseFn();
    sourceShareFn();

    var objDataString = '';

    guessloveFn(objData); //加载猜你喜欢
    //彩泥喜欢-换一换
    $('.xssy_guesslove .replaces').on('click', function() {
            guessloveFn({ change: 1 })
        })
        //搜索跳转-按键
    $('.xssy_banner .inputFoo').on('click', 'span', function() {
            var nowVal = $(this).prev('input').val() || '';
            window.location.href = 'xssy_list.html?kw=' + nowVal;
        })
        //搜索跳转-回车
    $('.xssy_banner .inputFoo input').on('keyup', function(e) {
            var nowEvent = e || window.event;
            if (e.keyCode == "13") {
                // 获取聚焦的input
                var nowVal = $(this).val();
                window.location.href = 'xssy_list.html?kw=' + nowVal;
            }

        })
        //查看微课详情
    $('.xssy_source').on('click', 'li', function() {
            var neowId = $(this).attr('data-id');
            window.location.href = 'xssy_detail.html?' + neowId;
        })
        // 开始选课跳转

        $('.slect_sourceCont1 .tips h3').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
            $('.tipsContent p').eq($(this).index()).addClass('active').siblings().removeClass('active')
        })
        $('.choicebtn').on('click', function() {
            if(+$('.slect_sourceCont1 .tips h3.active').attr('data-item') === 1) {
                $.GSHajax({
                    url: '/operatorsettings/course_list/',
                    error: function(err) {
                        if (err.status == 401) {
                            sessionStorage.setItem('comeChoicelesson', true)
                            $('.shade').showMsg();
                        } else {
                            $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '服务异常, 请刷新重试或联系我们' });
                        }
                    },
                    success: function(res) {
                        if (!res.status) {
                            $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: res.msg });
                        } else {
                            window.location.href = 'cpda_selsource.html';
                        }
                    }
                })
            }
            else {
                $.GSHajax({
                    url: '/operatorsettings/cdacourselist/',
                    error: function(err) {
                        if (err.status == 401) {
                            $('.shade').showMsg();
                        } else {
                            $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '服务异常, 请刷新重试或联系我们' });
                        }
                    },
                    success: function(res) {
                        if (!res.status) {
                            $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: res.msg });
                        } else {
                            window.location.href = 'cda_selsource.html';
                        }
                    }
                })
            }
        })
    //     // 标签选择
    $('.xssy_list_alertUl .spanFoo').on('click', 'span', function() {
            var nowItem = $(this).attr('data-item');
            if (nowItem == 'gj') {
                $(this).toggleClass('active')
            } else {
                $(this).addClass('active').siblings().removeClass('active');
                if (nowItem == 'hy') {
                    $('.xssy_list_alertUl .spanFoo_zy span').css({ display: 'none' });
                    $('.xssy_list_alertUl .spanFoo_zy span[data-foo="' + $(this).text() + '"]').css({ display: 'inline-block' });
                }
            }
        })
        // 标签选择-确认
    $('.xssy_list_alert .btn').on('click', function() {
        var tools = [];
        $('.xssy_list_alertUl li[data-item="gj"] .spanFoo span.active').each(function(i, ele) {
            var nowChoise = $(ele).text();
            if (nowChoise)
                tools.push(nowChoise);
        })
        var industry = $('.xssy_list_alertUl li[data-item="hy"] .spanFoo span.active').text() || '';
        var profession = $('.xssy_list_alertUl li[data-item="zy"] .spanFoo span.active').text() || '';
        if (tools.length != 0 && industry != '' && profession != '') {
            set('_span_related_', '{"tools":"' + tools + '", "industry":"' + industry + '", "profession":"' + profession + '"}');
            $('.xssy_list_alertMu').fadeOut();
            //重新加载彩泥喜欢
            var objDataOk = get('_span_related_', 1000 * 60 * 60 * 24 * 30);
            objDataOk.id = token_id;
            objDataOk.tools = JSON.stringify(objData.tools.split(','));
            guessloveFn(objDataOk)
        } else {
            $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '请从每组标签中至少选择一个', setTime: 1500 });
        }
    })
    $('.xssy_list_alertMu .titl .close').on('click', function() {
            $('.xssy_list_alertMu').fadeOut();
        })
        //资源共享-弹层
    $('.hot_source h2 p').on('click', function() {
            if (token == 'JWT undefined' || token == 'JWT null') {
                $('.shade').showMsg();
            } else {
                $('.xssy_sourceShareMu').fadeIn();
            }
        })
        //资源共享-弹层关闭
    $('.sourceShare .shareClose').on('click', function() {
            $('.xssy_sourceShareMu').fadeOut();
        })
        //资源共享-选择授课方式
    $('.sourceShare .inputFoo').on('click', 'b', function() {
            $(this).addClass('active').siblings().removeClass('active');
        })
        //资源共享-提交
    $('.sourceShare .btn').on('click', function() {
        var teachTxt = $('.sourceShare .inputFoo b.active').text();
        if (teachTxt == '') {
            $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '请选择授课方式' });
            return false;
        }
        var isSubmit = false;
        var obj = { teaching: teachTxt };
        $('.sourceShare input,.sourceShare select,.sourceShare textarea').each(function(i, ele) {
            var nowVal = $(ele).val();
            if (nowVal == '') {
                $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '请完善信息' });
                isSubmit = false;
                return false;
            }
            isSubmit = true;
            obj[$(this).attr('data-item')] = $(this).val();
        })
        if (isSubmit) {
            $.GSHajax({
                url: '/operatorsettings/resourceback/',
                // dom: '.hotsource_load',
                type: 'post',
                data: obj,
                success: function(res) {
                    if (res.status) {
                        $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: '提交成功' });
                        $('.xssy_sourceShareMu').fadeOut();
                    } else {
                        alert(res.msg)
                    }
                },
                error: function(err) {
                    $('.xssy_sourceShareMu').fadeOut();
                    if (err.status == 401) {
                        $('.shade').showMsg();
                    }
                }
            })
        }
    })
})