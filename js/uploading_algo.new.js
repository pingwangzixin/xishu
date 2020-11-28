// var token = "JWT " + window.sessionStorage.token;
$(function() {
    $(".up_algo2 .up_load2_box ul").slimScroll({
        height: 200,
        borderRadius: "0px"
    });
    var is_agree = false;
    var is_up = false;
    if (token == 'JWT undefined' || token == 'JWT null') {
        $('.shade .lkw-msg-box-msg').html('您目前还没有注册或登录~ ')
        $('.shade').show();
    }
    $('.lkw-msg-box-close').on('click', function() {
            window.history.go(-1);
        })
        // 获取参数判断
    var needParam = GetQueryString('cm');
    if (needParam) {
        if (needParam == 'upload_alg') {
            $.ajax({
                type: 'GET',
                url: url_ip + '/examine/firstintoupalgo/',
                data: {},
                datatype: 'json',
                headers: { 'Authorization': token },
                success: function(res) {
                    console.log(res);
                    if (res.status) {
                        if (res.whether == 1) {
                            $('.algo_rule').fadeIn();
                        } else {
                            $('.selfBuild_p .hasCheck').addClass('active');
                        }
                    }
                },
                error: function(err) {
                    console.log(err)
                }
            })
        } else if (needParam == 'uplook_alg') {

        } else if (needParam == 'build_cj') {

        }
    }
    var is_agreetype = "";
    $('.algo_rule .ok').click(function() {
        set(name, "admin");
        $('.algo_rule').fadeOut();
        if (is_agreetype == "new") {
            window.location.href = 'python3/python_online.html';
        } else if (is_agreetype == "upload") {
            $('.up_algo2').stop().fadeIn();
        }
        $.ajax({
            type: 'POST',
            url: url_ip + '/examine/firstintoupalgo/',
            data: { whether: 0 },
            datatype: 'json',
            headers: { 'Authorization': token },
            success: function(data) {
                // console.log(data);
            },
            error: function(data) {
                console.log(data)
            }
        })
        $('.uploading1 b').addClass('on')
        is_agree = true;
        if (is_up) {
            $('.up_algo2').show()
        }

    })
    $('.algo_rule .no').click(function() {
        $('.algo_rule').fadeOut()
    })
    $('.uploading1 p i').click(function() {
        $('.algo_rule .no').hide()
        $('.algo_rule').fadeIn()
    })
    $('.uploading1 div').click(function() {
        if (is_agree) {
            $('.up_algo2').show()
        } else {
            $('.algo_rule .no').hide()
            $('.algo_rule').fadeIn()
            is_up = true;
        }
    })
    $('.up_load2_box i').click(function() {
        $('.up_algo2').hide()
    })
    $('.uploading1 b').click(function() {
        if (is_agree) {
            $('.uploading1 b').removeClass('on')
        } else {
            $('.uploading1 b').addClass('on')
        }
        is_agree = !is_agree;
    })

    function change_w() {
        $('.upload_py>input').css('width', $('.upload_py>input')[0].scrollWidth + 'px')
    }
    $('.upload_py>input').live('input propertychange change', function() {
        change_w();
    })
    var file_name = '';
    var file = '';
    $('input[type="file"]').live('change', function() {
            file_name = $(this)[0].files[0].name
            file = $(this)[0].files[0]
            $(this).parent().next().val(file_name.substr(0, file_name.lastIndexOf('.')))
            change_w();
        })
        // 选择图标
    $('.up_load2_box li').live('click', function() {
        $('.up_load2_box li').removeClass('on')
        $(this).addClass('on')
    })
    $('.uploading2').on('click', '.look', function() {
        window.location.href = "python3/python_online.html?" + $(this).parent().attr('adopt') + "&" + $(this).parent().attr('data_id')
    })
    $('.uploading2').on('click', '.delete', function() {
            var that = $(this)
            var a = confirm('算法删除后无法进行恢复,您确定要删除此算法吗？')
            if (a) {
                $.ajax({
                    url: url_ip + '/examine/upalgocrud/',
                    type: 'DELETE',
                    data: { id: $(this).parent().attr('data_id'), adopt: $(this).parent().attr('adopt') },
                    datatype: 'json',
                    headers: { 'Authorization': token },
                    success: function(data) {
                        if (data.status) {
                            alertmsg(data.msg, '', 1)
                            that.parent().parent().remove();
                        }
                    },
                    error: function(data) {
                        console.log(data)
                    }
                })
            }
        })
        // 联系我们
    var touch_us = document.createElement('a');
    $(touch_us).html('请联系我们，反馈这个错误')
    $(touch_us).attr({ href: 'feedback.html' })
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
    // 自建跳转
    $('.selfBuild').on('click', '.selfBuild_btn', function() {
            // if ($(this).hasClass('creat_new')) {
            //     limit('算法自建')
            //         .then(res => {
            //             if (res && $('.selfBuild_p i.hasCheck').hasClass('active')) {
            //                     window.location.href = 'python3/python_online.html'
            //             } else if (res) {
            //                 $('.algo_rule').stop().fadeIn();
            //             }
            //         })
            //     return;
            // }
            var needType = $(this).attr('data-type');
            // var needHref = '';
            if (needType == 1) {
                // needHref = 'python3/python_online.html';
            } else if (needType == 2) {
                if ($('.selfBuild_p i.hasCheck').hasClass('active')) {
                    //已选中
                    $('.up_algo2').stop().fadeIn();
                } else {
                    // 未选中
                    is_agreetype = "upload";
                    $('.algo_rule').stop().fadeIn();
                }
                return;
            } else if (needType == 3) {
                $.ajax({
                        url: url_ip + '/vip/permissionsvalidation/',
                        type: 'GET',
                        data: {
                            name: '场景自建'
                        },
                        dataType: 'json',
                        headers: { 'Authorization': token },
                        success: function(res) {
                            if (res.status) {
                                window.location.href = 'hmodel2.html'
                            } else {
                                $('.alertMsg').showMsg({
                                    isImg: 'isNo',
                                    h2txt: `<h2 style="font-weight: 700;margin-bottom: 3px">高级用户专享<h2><h5 style="font-size: 13px">升级为高级账户即可使用，您的当前权限为${res.levlename}</h5>`
                                });
                            }
                        },
                        error: function(err) {
                            if (err.status == 401) {
                                if (token == 'JWT undefined' || token == 'JWT null') {
                                    // $('.shade p').html('您目前还没有注册或登录~ ')
                                    alert('您目前还没有注册或登录~ ')
                                    $('.shade').show();
                                } else {
                                    // $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                                    alert('系统检测,您的账号存在风险异常,请重新登录。')
                                    $('.shade').show();
                                }
                            } else {
                                // alertmsg('请检查数据及参数，若无法解决，请联系我们。',0)
                                alert('请检查数据及参数，若无法解决，请联系我们。')
                            }
                        }
                    })
                    // needHref = 'python3/python_online.html';
                return;
            } else if (needType == 4) {
                if ($('.selfBuild_p i.hasCheck').hasClass('active')) {
                    // 已选中
                    window.location.href = 'python3/python_online.html';
                } else {
                    // 未选中
                    is_agreetype = "new";
                    $('.algo_rule').stop().fadeIn();
                }
            }
            // window.location.href = needHref;
        })
        // 算法标准弹窗
    $('.selfBuild_p').on('click', 'a.hasRead', function() {
            $('.algo_rule').stop().fadeIn();
        })
        // 标准弹窗 确认-取消
    $('.rule_btn').on('click', 'div', function() {
            var needType = $(this).attr('data-type');
            if (needType == 'ok') {
                $('.selfBuild_p i.hasCheck').addClass('active');
            }
            $('.algo_rule').stop().fadeOut();
        })
        // 选中按钮
    $('.selfBuild_p').on('click', 'i.hasCheck', function() {
            $(this).toggleClass('active');
            if ($(this).hasClass("active")) {
                set(name, "admin");
            } else {
                remove(name);
            }
        })
        // 上传文件弹窗关闭
    $('.up_load2_box').on('click', '.up_load2_boxClose', function() {
            $('.up_algo2').stop().fadeOut();
        })
        // 上传文件选择图标
    $('.up_load2_box').on('click', 'li', function() {
            $(this).addClass('on').siblings().removeClass('on');
        })
        // 文件名
    function change_w() {
        $('.upload_py>input').css('width', $('.upload_py>input')[0].scrollWidth + 'px')
    }
    $('.upload_py>input').live('input propertychange change', function() {
            change_w();
        })
        // 选择文件
    var file_name = '';
    var file = '';
    $('.upload_py input[type="file"]').live('change', function() {
            file_name = $(this)[0].files[0].name
            file = $(this)[0].files[0]
            $(this).parent().next().val(file_name.substr(0, file_name.lastIndexOf('.')))
            change_w();
        })
        // 联系我们
    var touch_us = document.createElement('a');
    $(touch_us).html('请联系我们，反馈这个错误')
    $(touch_us).attr({ href: 'feedback.html' })
        // 确认上传文件
    var _tid;
    $('.upload_sure').click(function() {
        var formData = new FormData();
        formData.append("py_file", file);
        formData.append("py_name", $('.upload_py input[type="text"]').val());
        formData.append("img", "ZJ_img1/ZJ" + Math.floor(Math.random() * 100 + 1) + ".fw.png");
        // console.log(formData, $('.upload_py input[type="text"]').val(), $('.up_load2_box ul li.on').attr('name'))
        $.ajax({
            type: 'POST',
            url: url_ip + '/examine/uploadpy/',
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
                // console.log(data)
                if (data.status) {
                    alertmsg('上传成功', '', 1);
                    $('.uploading2 table .table_title').after('<tr>' +
                        '<td class="table_td_name">' +
                        '<img src="' + data.data.img + '"><span>' + data.data.name + '</span>' +
                        '</td>' +
                        '<td>上传算法</td>' +
                        '<td>' + data.data.add_time.substr(0, data.data.add_time.indexOf(' ')) + '</td>' +
                        '<td adopt="' + data.data.adopt + '" data_id="' + data.data.id + '"><b class="look">查看</b><b class="delete">删除</b></td>' +
                        '<td><i class="status' + data.data.adopt + '">' + adopt_arr[data.data.adopt] + '</i></td>' +
                        '</tr>')
                } else {
                    alertmsg(data.msg, '', 0);
                }
            },
            error: function(err) {
                console.log(err)
                if (err.status == 401) {
                    $('.shade').show()
                } else {
                    alertmsg('程序出错了', touch_us, 0);
                }
            },
            complete: function() {
                clearInterval(_tid);
                $('.loading').hide();
                $('.mu').hide();
                $('.up_algo2').hide()
            }
        });
    })
    var dataname = get(name);
    if (dataname == "admin") {
        $(".hasCheck").addClass("active");
    } else {
        $(".hasCheck").removeClass("active");
    }
    //存储
    function set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    //取出数据
    function get(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    // 删除数据
    function remove(key) {
        localStorage.removeItem(key);
    }
})
$(function() {
        /* lkw导航跳转 */
        if (GetQueryString('cm') == 'nav') {
            $('.uploading1 b').removeClass('on');
            is_agree = false;
            $('.uploading1 div').click();
        }
    })
    // base64封装
function Base64() {
    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding  
    this.encode = function(input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }
        // public method for decoding  
    this.decode = function(input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }
        // private method for UTF-8 encoding  
    _utf8_encode = function(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        }
        // private method for UTF-8 decoding  
    _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
// jutyper
$(function() {
    var base64_name;
    $.ajax({
        type: "GET",
        url: url_ip + "/examine/jupyter_login",
        data: {},
        dataType: "json",
        headers: {
            "Authorization": token
        },
        success: function(data) {
            if (data.status) {
                var base = new Base64();
                var name = data.id;
                base64_name = base.encode(name);
            }
        },
        error: function(err) {
            //console.error(err);
        }
    });
    $('.jupyter').on('click', function() {
        if (token == 'JWT undefined' || token == 'JWT null') {
            $('.msg-box-wraper.login-alert').fadeIn();
            document.body.style.overflow = 'hidden';
            return;
        }
        // 线下
        // window.open("http://172.17.0.144:8000/hub/login?id=" + base64_name, "_blank");
        // 线上
        window.open("http://jira.datahoop.cn/hub/login?id=" + base64_name, "_blank");
    })
})