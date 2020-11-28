// var token = "JWT " + window.sessionStorage.token;

$(function() {
    var api, host, port, username, password, name, table_name = '';
    var title = $('.server_box .title').html()
    $('.long_range_servers_box').on('click', 'dd', function() {
        if ($(this).children('div').html() == 'ORACLE' || $(this).children('div').html() == 'HIVE') {
            alertmsg('敬请期待')
        } else {
            var name = $(this).children('div').html();
            $('.server_box .title').html(name)
            $('.mu').show()
            $('.server_box input').val('')
            $('.server_box').show()
        }
    })
    $('.server_box img').live('click', function() {
        $('.mu').hide();
        $('.server_box').hide();
        // 防止登录返回出弹窗
        history.pushState('', '', 'data_list.html');
    })
    $('.result_box img').live('click', function() {
            $('.mu').hide()
            $('.result_box').hide()
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
    $('.login').live('click', function() {
            var base = new Base64();
            host = $('#host').val();
            var base64_host = base.encode(host);
            port = $('#port').val();
            var base64_port = base.encode(port);
            username = $('#username').val();
            var base64_username = base.encode(username);
            password = $('#password').val();
            var base64_password = base.encode(password);
            name = $('#name').val();
            var base64_name = base.encode(name);
            table_name = $('#file_name').val();
            var base64_table_name = base.encode(table_name);
            var title = $('.server_box .title').html()
            if (title = 'MySQL') {
                api = '/model/mysql_database/'
            } else if (title = 'SQL Server') {
                api = '/model/sql_database/'
            } else if (title = 'Postgresql') {
                api = '/model/postgre_database/'
            }
            $.ajax({
                type: 'POST',
                url: url_ip + api,
                data: {
                    host: base64_host,
                    port: base64_port,
                    username: base64_username,
                    password: base64_password,
                    db_name: base64_name,
                    table_name: base64_table_name,
                    sc: 'Y',
                    coded_format: $('#coded_format').val()
                },
                datatype: 'json',
                cache: false,
                headers: { "Authorization": token },
                success: function(data) {
                    if (data.status) {
                        // for (var i = 0; i < data.data.length; i++) {
                        // 	var li = document.createElement('li');
                        // 	var html = `<div class="need"><input type="radio" name="filename"></div>`
                        // 	$(li).append(html)
                        // 	var span = document.createElement('span')
                        // 	$(span).append(data.data[i])
                        // 	$(li).append(span)
                        // 	$('.result_box ul').append(li)
                        // }
                        alertmsg(data.msg, '', 1);
                        $('.server_box,.mu').hide();
                        $('.result_box').hide();
                    } else {
                        alertmsg(data.msg, '', 2)
                    }
                },
                error: function(err) {
                    console.log(err)
                    if (err.status == 401) {
                        $('.shade').show();
                    }
                }
            })
        })
        //判断是否勾选
    var filename = '';
    $('.need input').live('click', function() {
        var checks = $(this).is(':checked');
        if (checks == true) {
            $('.need').css('background', '');
            $(this).parent().css('background', 'url(img/check.gif)');
            filename = $(this).parent().next().html();
            console.log(filename)
        } else {
            $('.need').css('background', '');
        }
    })
    $('.next').live('click', function() {
            console.log(filename, host, port, username, password, name)
            $.ajax({
                type: 'GET',
                url: url_ip + api,
                data: { name: filename, host: host, port: port, username: username, password: password, db_name: name, table_name: table_name, sc: 'Y' },
                datatype: 'json',
                cache: false,
                headers: { "Authorization": token },
                success: function(data) {
                    console.log(data)
                    alertmsg(data.msg, '', 1)
                    if (data.status) {
                        $('.result_box').hide()
                        $('.mu').hide()
                    }
                },
                error: function(data) {
                    console.log(data)
                }
            })
        })
        // 联系我们
    var touch_us = document.createElement('a');
    $(touch_us).html('请联系我们，反馈这个错误')
    $(touch_us).attr({ href: 'feedback.html' })
        // 消息提示msgbox
    function alertmsg(msg, tag, num) {
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
        } else if (num == 2) {
            $('.fail').addClass('on')
            $('.msgbox span').css('color', '#DC1010')
            clearTimeout(timeout)
            $('.msgbox span').html(msg);
            $('.msgbox').fadeIn();
            timeout = setTimeout(function() {
                $('.msgbox').fadeOut();
                $('.mu2').hide();
            }, 3000)
        } else {
            $('.tishi').addClass('on')
            $('.msgbox span').css('color', 'orange')
            $('.msgbox span').html(msg);
            $('.msgbox').fadeIn();
            timeout = setTimeout(function() {
                $('.msgbox').fadeOut();
                $('.mu2').hide();
            }, 1500)
        }
    }
})
$(function() {
    var needParam = GetQueryString('cm')
    if (needParam && needParam != 'sj') {
        needParam = needParam.toLowerCase();
        if ($.inArray(needParam, ['excel', 'txt', 'csv']) == -1) {
            $('.love_from_nav[data-item="' + needParam + '"]').click();
        }

    }
})