var tid = null;
$(function () {
    /* lkw测试区域 */
    $('.test .isRemPwdChk').click(function () {
        if ($('.loginCheckFoo .isRemPwdChk:checked').length != 0) {
            $('.loginCheckFoo').css({'background': '#fff'});
            $('.loginCheckFoo .isRemPwdImg').css({'display': 'block'});
        } else {
            $('.loginCheckFoo').css({'background': ''});
            $('.loginCheckFoo .isRemPwdImg').css({'display': 'none'});
        }
        sessionStorage.setItem('TestUsername', $('#username').val());
        sessionStorage.setItem('TestUsername', $('#pwd').val());
    })


    /* lkw测试区域 */
    $('input').focus(function () {
        $(this).parent().css('border-color', '#0e6eb7');
    });
    $('input').blur(function () {
        $(this).parent().css('border-color', '');
    });
})

var cookie = {
    set: function (key, val, time) {//设置cookie方法
        var date = new Date(); //获取当前时间
        var expiresDays = time;  //将date设置为n天以后的时间
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
        document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ";path=/";  //设置cookie
    },
    get: function (key) {//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips = arr[1];   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
        return tips;
    },
    delete: function (key) { //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime() - 1); //将date设置为过去的时间
        document.cookie = key + "=v;expires =" + date.toGMTString() + ";path=/";//设置cookie
    }
};

if (location.search.search('backurl') !== -1 && cookie.get('token')) {
    $.ajax({
        url: url_ip + '/userinfo/',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        dataType: 'json',
        headers: {'Authorization': "JWT " + cookie.get('token')},
        success: function (res) {
            localStorage.setItem('token', cookie.get('token'))
            user_img = url_ip + res.header;
            token_id = res.user_id;
            user_name_ = res.name;
            if (location.search.search('backurl') !== -1) {
                if (location.search.search('www.cpda.cn') !== -1) {
                    window.location.href = `http://www.cpda.cn/login/?useinfo={"username":"${user_name_}","token":"${cookie.get('token')}","user_img": "${user_img}","token_id": "${token_id}"}&${location.search.substr(1)}`;
                } else if (location.search.search('www.chinacpda.com') !== -1) {
                    window.location.href = `http://www.chinacpda.com/login/?useinfo={"username":"${user_name_}","token":"${cookie.get('token')}","user_img": "${user_img}","token_id": "${token_id}"}&${location.search.substr(1)}`;
                } else if (location.search.search('m.cpda.cn') !== -1) {
                    window.location.href = `http://m.cpda.cn/login/?useinfo={"username":"${user_name_}","token":"${cookie.get('token')}","user_img": "${user_img}","token_id": "${token_id}"}&${location.search.substr(1)}`;
                } else {
                    window.location.href = `http://m.chinacpda.com/login/?useinfo={"username":"${user_name_}","token":"${cookie.get('token')}","user_img": "${user_img}","token_id": "${token_id}"}&${location.search.substr(1)}`;
                }
            }
        },
        error: function (err) {
            if (location.search.search('backurl') !== -1) {
                var none_url = location.search.substr(1).split('backurl=')[1];
                window.location.href = none_url;
            }
        }
    })
}

$(function () {
    if (location.search.search('backurl') !== -1) {
        $('title').html('中国数据分析学习网');
        $(".out_tips").html('*可使用Datahoop平台账号直接登录')
        $('body').css({
            'background': 'url(img/bglogin.png)'
        });
        $('.logoFoo2').empty();
        $('.logoFoo2').css({
            'background': 'url(img/cpda.png) no-repeat',
            'background-size': 'contain',
            'margin-bottom': '20px'
        })
        $('.forHeight').css({
            'margin-bottom': '10px'
        })
        $('.dl_box').css({
            'background': 'rgba(0,0,0,.2)',
            'height': '350px'
        })
        $('.denglu').css({
            'background': '#BA1B20'
        })
        // $('.isRePassword').css({
        //     'margin': '10px auto 10px'
        // })
        $('.isRePassword .fl').show()
    }
    if (localStorage.getItem('userState')) {
        var obj = JSON.parse(localStorage.getItem('userState'));
        console.log(obj)
        $('#username').val(obj.name)
        $('#pwd').val(obj.pass)
    }
    if (window.location.search.substr(1) == 'cpdanet') {
        $('.logoFoo .dengluLogo1showhide').hide().siblings('.dengluLogo2showhide').show();
    } else {
        $('.logoFoo .dengluLogo2showhide').hide().siblings('.dengluLogo1showhide').show();
    }
    //logo到首页
    $('.logoFoo').on('click', '.dengluLogo1', function () {
        window.location.href = 'index.html';
    })
    var tid;

    function xiaoshi() {
        clearTimeout(tid);
        tid = setTimeout(function () {
            $('.dl_box span').html('');
        }, 5000)
    }

    $('.denglu').click(function () {
        if (document.getElementById("username").value == '' || document.getElementById("pwd").value == '') {
            alert("请输入用户名和密码");
        } else {
            var name, pass;
            name = document.getElementById("username").value;
            pass = document.getElementById("pwd").value;
            $.ajax({
                async: false, //同步
                type: "POST",
                cache: false, //不缓存
                url: url_ip + "/exist/", //注意路径
                data: {"username": name},
                dataType: "json",
                success: function (data) {
                    if (data.status) {
                        $.ajax({
                            async: false, //同步
                            type: "POST",
                            cache: false, //不缓存
                            url: url_ip + "/login/", //注意路径
                            data: {"username": name, "password": pass},
                            dataType: "json",
                            success: function (data) {
                                // console.log(data)
                                // 新用户注册只提示一次修改密码
                                sessionStorage.setItem('locklogin', true)
                                if ($('.remember input').is(':checked')) {
                                    var obj = {name, pass};
                                    localStorage.setItem('userState', JSON.stringify(obj))
                                }
                                if (data) {
                                    $('.remember input').is(':checked') ? localStorage.setItem('token', data.token) : sessionStorage.setItem('token', data.token);
                                    // cookie.set('token', data.token);

                                    $.ajax({
                                        url: url_ip + '/userinfo/',
                                        type: 'GET',
                                        cache: false,
                                        async: false,
                                        data: {},
                                        dataType: 'json',
                                        headers: {'Authorization': "JWT " + data.token},
                                        success: function (res) {
                                            localStorage.setItem('token', data.token)
                                            user_img = url_ip + res.header;
                                            token_id = res.user_id;
                                            user_name_ = res.name;

                                            cookie.set('token', data.token);
                                            cookie.set("membername", res.name);
                                            cookie.set("token_id", token_id);
                                            cookie.set("user_img", "user_img");
                                        },
                                        error: function (err) {
                                            console.log(err)
                                        }
                                    })

                                    if (window.location.search.substr(1) == 'noback') {
                                        window.location.href = 'index.html';
                                    } else if (window.location.search.substr(1) == 'cpdanet') {
                                        window.location.href = 'xssy_index.html?com=cpdanet';
                                    } else if (location.search.search('backurl') !== -1) {

                                        $.ajax({
                                            url: url_ip + '/userinfo/',
                                            type: 'GET',
                                            cache: false,
                                            async: false,
                                            data: {},
                                            dataType: 'json',
                                            headers: {'Authorization': "JWT " + data.token},
                                            success: function (res) {
                                                localStorage.setItem('token', data.token)
                                                user_img = url_ip + res.header;
                                                token_id = res.user_id;
                                                user_name_ = res.name;
                                                if (location.search.search('www.cpda.cn') !== -1) {
                                                    window.location.href = `http://www.cpda.cn/login/?useinfo={"username":"${user_name_}","token":"${data.token}","user_img": "${user_img}","token_id": "${token_id}"}&${location.search.substr(1)}`;
                                                } else if (location.search.search('www.chinacpda.com') !== -1) {
                                                    window.location.href = `http://www.chinacpda.com/login/?useinfo={"username":"${user_name_}","token":"${data.token}","user_img": "${user_img}","token_id": "${token_id}"}&${location.search.substr(1)}`;
                                                } else if (location.search.search('m.cpda.cn') !== -1) {
                                                    window.location.href = `http://m.cpda.cn/login/?useinfo={"username":"${user_name_}","token":"${data.token}","user_img": "${user_img}","token_id": "${token_id}"}&${location.search.substr(1)}`;
                                                } else {
                                                    window.location.href = `http://m.chinacpda.com/login/?useinfo={"username":"${user_name_}","token":"${data.token}","user_img": "${user_img}","token_id": "${token_id}"}&${location.search.substr(1)}`;
                                                }
                                            },
                                            error: function (err) {
                                                console.log(err)
                                            }
                                        })

                                    } else {
                                        // 进入选课中心
                                        if (sessionStorage.getItem('comeChoicelesson')) {
                                            sessionStorage.removeItem('comeChoicelesson');
                                            sessionStorage.setItem('cancome', true)
                                        }
                                        console.log(document.referrer)
                                        if (document.referrer == ''){
                                            window.location.href="https://ai.datahoop.cn";
                                        }else{
                                            window.history.go(-1); //验证成功后返回上一页
                                        }
                                        //window.history.go(-1); //验证成功后返回上一页
                                    }
                                }
                            },
                            error: function (data) {
                                $('#pwdTip').html("密码错误，请重新输入");
                                $('#pwd').val('');
                                xiaoshi();
                            }
                        });
                    } else {
                        $('#usernameTip').html(data.msg);
                        // $('#usernameTip').html('用户名不存在');
                        xiaoshi();
                    }
                },
                error: function (data) {
                    console.log(data)
                }
            })
        }
    });
    //回车登录
    $("body").live('keyup', function (event) {
        if (event.keyCode == 13) {
            $('.denglu').click();
        }
    });
    //注册提示
    $('.isRePassword').on('click', '.cWight', function () {
        //$('.alertMsg').fadeIn();
        if (location.search.search('backurl') !== -1) {
            $('#diy_register').attr('href', "https://ai.datahoop.cn/register.html?" + location.search.substr(1));
        } else {
            $('#diy_register').attr('href', "https://ai.datahoop.cn/register.html");
        }
    })
    //$('.alertMsg').on('click', '.msg-close', function () {
    //    $('.alertMsg').fadeOut();
    //})
    // 记住密码悬浮hover
    $('.remember').hover(function () {
        $('.rememberHover').toggle()
    })
    // 忘记密码
    $('.forgetPass').on('click', function () {
        if (location.search.search('backurl') !== -1) {
            window.location = `forget.html${location.search}`;
        } else {
            window.location = `forget.html`;
        }
    })
})
