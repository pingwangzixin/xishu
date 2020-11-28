window.onload = function() {
    if(location.search.search('backurl') !== -1) {
        $('title').html('中国数据分析学习网');
        $('body').css({
            'background': 'url(img/bglogin.png)'
        });
        $('.logoFoo').empty();
        $('.logoFoo').css({
            'background': 'url(img/cpda.png) no-repeat',
            'background-size': 'contain',
            'height': '35px'
        })
        $('.zc_box').css({
            'background': 'rgba(0,0,0,.2)'
        })
        $('#zhuce').css({
            'background': '#BA1B20'
        })
        $('.quick_box').hide();
    }
    // 选择框
    var zc_check = document.getElementById('zc_check');
    var duigou = document.getElementById('duigou');
    var check = document.getElementById('check');
    zc_check.onclick = function() {
            if (zc_check.checked == true) {
                check.style.background = "#fff";
                duigou.style.display = 'block';
            } else {
                check.style.background = "";
                duigou.style.display = 'none';
            }
        }
        //协议文本
    $('#xieyi .xieyiCont').html(xieyiHtml);
    $('#xieyi .yinsiCont').html(yinsiHtml);
    //显示隐私权益
    $('#showYinsi').on('click', function() {
            $('.yonghu').hide();
            $('.yinsi').show();
        })
        // 协议弹窗
    var datahoop = document.getElementById('datahoop');
    var xieyi = document.getElementById('xieyi');
    var xieyi_close = document.getElementById('xieyi_close');
    var xieyi_jixu = document.getElementById('xieyi_jixu');
    datahoop.onclick = function() {
        xieyi.style.display = "block";
    }
    xieyi_close.onclick = function() {
        xieyi.style.display = "none";
        $('.yonghu').show();
        $('.yinsi').hide();
    }
    xieyi_jixu.onclick = function() {
            xieyi.style.display = "none";
            zc_check.checked = true;
            check.style.background = "#06415e";
            duigou.style.display = 'block';
        }
        // 正则验证
    var a = /^((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(18[0-9])|(19[89]))\d{8}$/;
    var b = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    var c = /^\d{6}$/;
    var d = /^[0-9A-Za-z]{6,20}$/;
    var t = 60;
    // 提示信息消失
    var tid;

    function xiaoshi() {
        clearTimeout(tid);
        tid = setTimeout(function() {
            $('.tishi_msg').html('');
        }, 5000)
    }
    // 输入框
    $('input').focus(function() {
        $(this).parent().css('border-color', '#eee');
    });
    $('input').blur(function() {
        $(this).parent().css('border-color', '');
        $('.tishi_msg').html('');
        $('.tishi_msg').css('color', '#ff0000');
    });
    // 输入提示信息
    $('#phone').focus(function() {
        $('.phoneTip').html('*中国大陆通用手机号码')
        $('.phoneTip').css('color', '#eee');
        xiaoshi();
    })
    $('#phone').blur(function() {
        $('.phoneTip').css('color', '#ff0000');
        if ($('#phone').val() != '') {
            if (!a.test($('#phone').val())) {
                $('.phoneTip').html('*该手机号不存在')
            } else {
                $.ajax({
                    async: false, //同步
                    type: "POST",
                    cache: false, //不缓存
                    url: url_ip + "/exist/", //注意路径
                    data: { "username": $('#phone').val() },
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        if (data.status) {
                            $('.phoneTip').html('*该手机号已被注册')
                        }
                    },
                    error: function(data) {
                        console.log(data)
                    }
                })
            }
        }
    })
    $('#phone_yz').focus(function() {
        $('.yz_phoneTip').html('*有效时长为10分钟')
        $('.yz_phoneTip').css('color', '#eee');
        xiaoshi();
    })
    $('#phone_yz').blur(function() {
        $('.yz_phoneTip').css('color', '#ff0000');
        if ($('#phone_yz').val() != '' && !c.test($('#phone_yz').val())) {
            $('.yz_phoneTip').html('*验证码长度错误')
        }
    })
    $('#pic_yz').focus(function() {
        $('.yzTip').html('*不小于6位、可以为数字、字母或数字与字母的组合')
        $('.yzTip').css('color', '#eee');
        xiaoshi();
    })
    $('#pic_yz').blur(function() {
        $('.yzTip').css('color', '#ff0000');
        if ($('#pic_yz').val() != '') {
            $.ajax({
                async: false, //同步
                type: "POST",
                cache: false, //不缓存
                url: url_ip + "/exist/", //注意路径
                data: { "username": $('#pic_yz').val() },
                dataType: "json",
                success: function(data) {
                    console.log(data);
                    if (data.status) {
                        $('.yzTip').html('*该用户名已被使用')
                    }
                },
                error: function(data) {
                    console.log(data)
                }
            })
        }
    })
    $('#pwd').focus(function() {
        $('.pwdTip').html('*6到16位、数字字母与下划线的组合')
        $('.pwdTip').css('color', '#eee');
        xiaoshi();
    })
    $('#pwd').blur(function() {
        $('.pwdTip').css('color', '#ff0000');
        if ($('#pwd').val() != '' && !b.test($('#pwd').val())) {
            $('.pwdTip').html('*密码格式不正确')
        }
    })
    $('#repet_pwd').focus(function() {
        $('.repet_pwdTip').html('*请与设置密码保持一致')
        $('.repet_pwdTip').css('color', '#eee');
        xiaoshi();
    })
    $('#repet_pwd').blur(function() {
            $('.repet_pwdTip').css('color', '#ff0000');
            if ($('#repet_pwd').val() != '' && $('#repet_pwd').val() != $('#pwd').val()) {
                $('.repet_pwdTip').html('*两次输入的密码不一致')
            }
        })
        // 点击发送验证码
    $('.zc_send').click(function() {
            if ($('#phone').val() == '') {
                $('.phoneTip').html('*手机号不能为空')
                xiaoshi()
            } else {
                $.ajax({
                    async: false, //同步
                    type: "POST",
                    cache: false, //不缓存
                    url: url_ip + "/send_code/", //注意路径
                    data: { "mobile": $('#phone').val(), "type": 1 },
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        $('.zc_send').html(t + 's');
                        clearInterval(tid);
                        tid = setInterval(function() {
                            t--;
                            if (t >= 0) {
                                $('.zc_send').html(t + 's');
                            } else if (t <= 0) {
                                clearInterval(tid);
                                $('.zc_send').html('获取验证码');
                            }
                        }, 1000)
                    },
                    error: function(data) {
                        alert('发送失败');
                    }
                });
            }
        })
        // 点击登录
    $('#zhuce').click(function() {
        if ($('#phone').val() == '') {
            $('.phoneTip').html('*手机号不能为空');
            xiaoshi()
        } else if (!a.test($('#phone').val())) {
            $('.phoneTip').html('*请输入正确的手机号');
            xiaoshi()
        } else if ($('#phone_yz').val() == '') {
            $('.yz_phoneTip').html('*短信验证码不能为空');
            xiaoshi()
        } else if ($('#pic_yz').val() == '') {
            $('.yzTip').html('*请输入用户名');
            xiaoshi()
        } else if (!d.test($('#pic_yz').val())) {
            $('.yzTip').html('*用户名格式错误')
            xiaoshi()
        } else if ($('#pwd').val() == '') {
            $('.pwdTip').html('*请设置密码');
            xiaoshi()
        } else if (!b.test($('#pwd').val())) {
            $('.pwdTip').html('*密码格式不正确');
            xiaoshi()
        } else if ($('#repet_pwd').val() == '') {
            $('.repet_pwdTip').html('*请再次输入密码');
            xiaoshi()
        } else if ($('#repet_pwd').val() != $('#pwd').val()) {
            $('.repet_pwdTip').html('*两次输入的密码不一致');
            xiaoshi()
        } else if ($('#zc_check').is(':checked') == false) {
            alert('请阅读并同意Datahoop2.0用户协议')
        } else {
            $.ajax({
                async: false, //同步
                type: "POST",
                cache: false, //不缓存
                url: url_ip + "/users/", //注意路径
                data: { "username": $('#pic_yz').val(), "code": $('#phone_yz').val(), "mobile": $('#phone').val(), "password": $('#pwd').val() },
                dataType: "json",
                success: function(data) {
                    // console.log(data)
                    alert('注册成功');
                    if(location.search.search('backurl') !== -1) {
                        $.ajax({
                            url: url_ip + '/userinfo/',
                            type: 'GET',
                            cache: false,
                            async: false,
                            data: {},
                            dataType: 'json',
                            headers: { 'Authorization': "JWT " + data.token },
                            success: function(res) {
                                user_img = url_ip + res.header;
                                token_id = res.user_id;
                                user_name_ = res.name;
                                window.location.href= `http://www.cpda.cn/login/?useinfo={"username":"${user_name_}","token":"${data.token}","user_img": "${user_img}","token_id": "${token_id}"}&${location.search.substr(1)}`
                            },
                            error: function(err) {
                                console.log(err)
                            }
                        })
                    }
                    else {
                        sessionStorage.setItem('token', data.token);
                        window.location.href = "index.html";
                    }
                },
                error: function(data) {
                    console.log(data)
                    var data2 = JSON.parse(data.responseText)
                    if (data2.username) {
                        alert(data2.username);
                    } else if (data2.code) {
                        alert(data2.code)
                    }
                    window.location.reload();
                }
            });
            // alert('很抱歉,平台测试维护中,暂不支持注册新用户功能。给您造成的不便尽请谅解')
        }
    })
}