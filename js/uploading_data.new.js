// var token = "JWT " + window.sessionStorage.token;
var _tid;
$(function() {
    var l_fgf = '';
    var name = '';
    var file = {};
    $('.textfile ul li i').live('click', function() {
        if (token == 'JWT undefined' || token == 'JWT null') {
            $('.shade').showMsg({ ptxt: '您目前还没有注册或登录~ ' });
        } else {
            l_fgf = ''
            file = {};
            var file_c = $(this).next().find('.file').find('input[type=file]');
            $(this).next().children('ol').children('li:eq(0) input').attr('checked', true);
            console.log($(this).next().children('ol').children('li:eq(0) input'));
            $('.ww').val('');
            $('.separator').hide();
            $('.mu').show();
            $(this).next().show();
            $('.filename').html('未选择任何文件');
            if ($(file_c)[0].files.length != '0') {
                $('.file input').val("");
                $(this).next().find('.ok').addClass('disabled');
            };
        }
    });
    $('.separator b').live('click', function() {
        $('.mu').hide()
        $('.separator').hide();
        // 防止登录返回出弹窗
        history.pushState('', '', 'data_list.html');
    })
    $('.file input').live('change', function() {
        name = $(this)[0].files[0].name;
        $(this).parent().prev().html(name);
        file = $(this)[0].files[0];
        if(file) {
            $(this).parent().parent().parent().parent().next().children('.ok').removeClass('disabled');
        }
        })
        // 点击单选框选择分隔符
    $('.separator ol li input').click(function() {
            if ($(this).next().html() == '逗号( , )') {
                l_fgf = ',';
                $('.w').children('input').val('');
            } else if ($(this).next().html() == '分号( ; )') {
                l_fgf = ';';
                $('.w').children('input').val('');
            } else if ($(this).next().html() == '竖线( | )') {
                l_fgf = '|';
                $('.w').children('input').val('');
            } else {
                $('input[type=radio]').attr('checked', false)
                l_fgf = '';
            }
        })
        // 点击确定上传文件
    $('.ok').live('click', function() {
            console.log($(this).parent().next().children('input'))
            var is_header = 0;
            if (l_fgf == '') {
                if ($(this).parent().prev().find('.w').children('.ww').val() != '') {
                    l_fgf = $(this).parent().prev().find('.w').children('.ww').val();
                } else {
                    l_fgf = ',';
                }
            }
            if ($(this).prev().prev().is(':checked')) {
                is_header = 1;
            };
            var formData = new FormData();
            formData.append("user", '1');
            formData.append("file_name", file);
            formData.append("label", '1');
            formData.append("is_header", is_header);
            formData.append("column_delimiter", l_fgf);
            console.log(formData)
            $.ajax({
                type: 'POST',
                url: url_ip + '/files/judge/',
                cache: false,
                data: { name: name },
                datatype: "json",
                headers: { "Authorization": token },
                success: function(data) {
                    console.log(data)
                    if (data.status) {
                        $.ajax({
                            type: 'POST',
                            url: url_ip + '/files/',
                            cache: false,
                            data: formData,
                            datatype: "json",
                            processData: false,
                            /*告诉jQuery不要去处理发送的数据*/
                            contentType: false,
                            /*告诉jQuery不要去设置Content-Type请求头*/
                            headers: { "Authorization": token },
                            beforeSend: function() {
                                $('.mu').show();
                                $('.loading').show();
                                clearInterval(_tid)
                                var a = 0;
                                _tid = setInterval(function() {
                                    a += 22.5
                                    $('.loading').css('transform', 'rotate(' + a + 'deg)')
                                }, 100)
                            },
                            success: function(data) {
                                console.log(data)
                                if (data.status) {
                                    $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: `${data.msg}<a href="perscen-zh.html" style="color: #5088F8">去查看</a>&nbsp;<a style="color: #5088F8" href="javascript:void(0);" class="addContinue">继续添加</a>` });
                                } else {
                                    $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: data.msg });
                                }
                            },
                            error: function(data) {
                                console.log(data)
                                $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: touch_us });
                            },
                            complete: function() {
                                $('.separator').hide();
                                clearInterval(_tid);
                                $('.loading').hide();
                                $('.mu').hide();
                            }
                        });
                    } else {
                        $('.separator').hide();
                        var msg = data.msg
                        alertmsg(msg, '', 0);
                        $('.mu').hide();
                    }
                },
                error: function(data) {
                    console.log(data)
                    if (data.status == 401) {
                        $('.shade').showMsg({ ptxt: '您目前还没有注册或登录~ ' });
                    } else {
                        $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: touch_us });
                    }
                }
            })
        })
        $('body').on('click', '.addContinue', function() {
            $('.alertMsg .msg-close').click()
        })
        // 数据库1上传文件
    $('.sql1').live('change', function() {
            var _this = $(this)
            console.log(_this)
            var name2 = $(this)[0].files[0].name;
            var file2 = $(this)[0].files[0];
            var formData = new FormData();
            formData.append("user", '1');
            formData.append("file_name", file2);
            formData.append("label", '1');
            $.ajax({
                type: 'POST',
                url: url_ip + '/files/judge/',
                cache: false,
                data: { name: name2 },
                datatype: "json",
                headers: { "Authorization": token },
                success: function(data) {
                    console.log(data)
                    if (data.status) {
                        $.ajax({
                            type: 'POST',
                            url: url_ip + '/files/',
                            cache: false,
                            data: formData,
                            datatype: "json",
                            processData: false,
                            /*告诉jQuery不要去处理发送的数据*/
                            contentType: false,
                            /*告诉jQuery不要去设置Content-Type请求头*/
                            headers: { "Authorization": token },
                            beforeSend: function() {
                                $('.mu').show();
                                $('.loading').show();
                                clearInterval(_tid)
                                var a = 0;
                                _tid = setInterval(function() {
                                    a += 22.5
                                    $('.loading').css('transform', 'rotate(' + a + 'deg)')
                                }, 100)
                            },
                            success: function(data) {
                                console.log(data)
                                if (data.status) {
                                    $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: data.msg });
                                } else {
                                    $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: data.msg });
                                }
                            },
                            error: function(data) {
                                $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: touch_us });
                            },
                            complete: function() {
                                $('.separator').hide();
                                clearInterval(_tid);
                                $('.loading').hide();
                                $('.mu').hide();
                            }
                        });
                    } else {
                        $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: data.msg });
                    }
                },
                error: function(data) {
                    console.log(data)
                    if (data.status == 401) {
                        $('.shade').showMsg({ ptxt: '您目前还没有注册或登录~ ' });
                    } else {
                        // alertmsg('程序出错了',touch_us,0);
                        $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: touch_us });
                    }
                }
            })
        })
        // 数据库2上传文件
    $('.sql2').live('change', function() {
            var name3 = $(this)[0].files[0].name;
            var file3 = $(this)[0].files[0];
            var formData = new FormData();
            formData.append("user", '1');
            formData.append("file_name", file3);
            formData.append("label", '1');
            $.ajax({
                type: 'POST',
                url: url_ip + '/files/judge/',
                cache: false,
                data: { name: name3 },
                datatype: "json",
                headers: { "Authorization": token },
                success: function(data) {
                    console.log(data)
                    if (data.status) {
                        $.ajax({
                            type: 'POST',
                            url: url_ip + '/files/',
                            cache: false,
                            data: formData,
                            datatype: "json",
                            processData: false,
                            /*告诉jQuery不要去处理发送的数据*/
                            contentType: false,
                            /*告诉jQuery不要去设置Content-Type请求头*/
                            headers: { "Authorization": token },
                            beforeSend: function() {
                                $('.mu').show();
                                $('.loading').show();
                                clearInterval(_tid)
                                var a = 0;
                                _tid = setInterval(function() {
                                    a += 22.5
                                    $('.loading').css('transform', 'rotate(' + a + 'deg)')
                                }, 100)
                            },
                            success: function(data) {
                                console.log(data)
                                if (data.status) {
                                    $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: data.msg });
                                } else {
                                    $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: data.msg });
                                }
                            },
                            error: function(data) {
                                // alertmsg('程序出错了',touch_us,0);
                                $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: touch_us });
                            },
                            complete: function() {
                                $('.separator').hide();
                                clearInterval(_tid);
                                $('.loading').hide();
                                $('.mu').hide();
                            }
                        });
                    } else {
                        $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: data.msg });
                    }
                },
                error: function(data) {
                    console.log(data)
                    if (data.status == 401) {
                        $('.shade').showMsg({ ptxt: '您目前还没有注册或登录~ ' });
                    } else {
                        // alertmsg('程序出错了',touch_us,0);
                        $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: touch_us });
                    }
                }
            })
        })
        // 联系我们
    var touch_us = '<a href="feedback.html" style="color: #496FFF;text-decoration:underline">未知错误, 请联系我们</a>';
    // 消息提示msgbox
    function alertmsg(msg, tag, num) {
        var top = $('.msgbox').offset().top + 331
        var timeout;
        $('.msgbox').css('top', top)
        $('.mu2').show();
        $('.msgbox img').removeClass('on')
        if (num == 1) {
            $('.success').addClass('on')
            $('.msgbox span').css('color', '#06415E')
            clearTimeout(timeout)
            $('.msgbox span').html(msg);
            $('.msgbox').fadeIn();
            timeout = setTimeout(function() {
                $('.msgbox').fadeOut();
                $('.mu2').hide();
            }, 1000)
        } else {
            $('.fail').addClass('on')
            $('.msgbox span').css('color', '#DC1010')
            clearTimeout(timeout)
            $('.msgbox span').html(msg);
            $('.msgbox').fadeIn();
            timeout = setTimeout(function() {
                $('.msgbox').fadeOut();
                $('.mu2').hide();
            }, 3000)
        }
    }

    var l = 0;
    var aaaa = setInterval(function() {
        if (l < 16838) {
            l += 51;
        } else {
            l = 16838
        }
        $('#rfv').html(l)
    }, 1)





    lkwIsLoginPage(); //登录验证盒子
    $('.goPerscenter').on('click', function() {
        if (token != 'JWT undefined' && token != 'JWT null') {
            window.location.href = "perscen-zy.html";
        } else {
            $('.msg-box-wraper.login-alert').fadeIn();
            document.body.style.overflow = 'hidden';
        }
    })
    $('.lkw-msg-box-close').on('click', function() {
        $('.msg-box-wraper').fadeOut();
        document.body.style.overflow = 'auto';
    })





    var needParam = GetQueryString('cm')
    if (needParam && needParam != 'sj') {
        needParam = needParam.toLowerCase();
        if ($.inArray(needParam, ['excel', 'txt', 'csv']) != -1) {
            $('.love_from_nav[data-item="' + needParam + '"]').click();
        }

    }

    /* 20181204-S */
    // 数据跳转
    $('.dataUpLoad_oper').on('click', 'p', function() {
            if (token != 'JWT undefined' && token != 'JWT null') {
                var needType = $(this).attr('data-type');
                if (needType == 'mydata') {
                    window.location.href = "perscen-zy.html?" + token_id;
                } else if (needType == 'datawork') {
                    limit('数据加工').then(res => {
                        if (res) {
                            window.location.href = "ycl2.html";
                        }
                    })
                }
            } else {
                // 防止登录返回出弹窗
                history.pushState('', '', 'data_list.html');
                $('.shade').showMsg({ ptxt: '您目前还没有注册或登录~ ' });
            }
        })
        /* 20181204-N */
})