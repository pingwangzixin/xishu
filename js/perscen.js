// var token = "JWT " + window.sessionStorage.token;
var userNameOnly = '';
$(function() {
    // 判断非登陆状态到首页
    if (token == 'JWT undefined' || token == 'JWT null') {
        window.location.href = 'index.html'
    }
    // 判断非登陆状态到首页
    // if (token == 'JWT undefined' || token == 'JWT null') {
    // 	window.location.href = 'index.html'
    // }

    //个人中心tab赋值
    // if(location.hash.search('cpda') !== -1) {
    //     var perscenLHtml = '<div class="personInfo">' +
    //     '<p class="personInfoPhoto">' +
    //     '<img src="'+user_img+'" alt="img">' +
    //     '<input type="file" class="userImgFile" title="点击更换头像">' +
    //     '</p>' +
    //     '<h3 class="ellipsis" title="用户名用户名用户名用户名">用户名用户名用户名用户名</h3>' +
    //     // '<a href="javascript:;" class="goI">我的主页</a>' +
    //     '</div>' +
    //     '<div class="personalTap" data-item="zh">' +
    //     '<ul>' +
    //     '<li data-item="zh"><a href="perscen-zh.html#cpda">我的账号</a></li>' +
    //     // '<li data-item="vip"><a href="perscen-vip.html">我的会员</a></li>' +
    //     '<li data-item="kc"><a href="perscen-kc.html?' + token_id + '#cpda">我的课程</a></li>' +
    //     '<li data-item="zy"><a href="perscen-zy.html?' + token_id + '#cpda">我的资源</a></li>' +
    //     '<li data-item="dd"><a href="perscen-dd.html#cpda">我的订单</a></li>' +
    //     '<li data-item="sn"><a href="perscen-sn.html#cpda">我的收纳</a></li>' +
    //     '<li data-item="sz"><a href="perscen-sz.html#cpda">个人设置</a></li>' +
    //     // '<li data-item="shiyong"><a href="perscen-shiyong.html">使用须知</a></li>' +
    //     '<li data-item="tz"><a href="perscen-tz.html?' + token_id + '#cpda">我的消息</a></li>' +
    //     '<li data-item="mm"><a href="perscen-gz.html?' + token_id + '#cpda">我的关注</a></li>' +
    //     '</ul>';
    // '</div>'
    // }
    // else {
        
    // }
    var perscenLHtml = '<div class="personInfo">' +
        '<p class="personInfoPhoto">' +
        '<img src="img/morentouxiang.png" alt="img">' +
        '<input type="file" class="userImgFile" title="点击更换头像">' +
        '</p>' +
        '<h3 class="ellipsis" title="用户名用户名用户名用户名">用户名用户名用户名用户名</h3>' +
        // '<a href="javascript:;" class="goI">我的主页</a>' +
        '</div>' +
        '<div class="personalTap" data-item="zh">' +
        '<ul>' +
        '<li data-item="zh"><a href="perscen-zh.html">我的账号</a></li>' +
        // '<li data-item="vip"><a href="perscen-vip.html">我的会员</a></li>' +
        '<li data-item="kc"><a href="perscen-kc.html?' + token_id + '">我的课程</a></li>' +
        '<li data-item="zy"><a href="perscen-zy.html?' + token_id + '">我的资源</a></li>' +
        '<li data-item="dd"><a href="perscen-dd.html">我的订单</a></li>' +
        '<li data-item="sn"><a href="perscen-sn.html">我的收纳</a></li>' +
        '<li data-item="sz"><a href="perscen-sz.html">个人设置</a></li>' +
        // '<li data-item="shiyong"><a href="perscen-shiyong.html">使用须知</a></li>' +
        '<li data-item="tz"><a href="perscen-tz.html?' + token_id + '">我的消息</a></li>' +
        '<li data-item="mm"><a href="perscen-gz.html?' + token_id + '">我的关注</a></li>' +
        '</ul>';
    '</div>'
    $('.perscenL').html(perscenLHtml);
    var nowPageItem = $('.perscenL').attr('data-item');
    $('.personalTap li[data-item="' + nowPageItem + '"]').addClass('active');
    // 获取头像信息
    var userImgSrcOnly = $('.navLogin i').attr('data-img');
    userNameOnly = $('.navLogin span a').html();
    $('.userImgFile').prev('img').attr('src', userImgSrcOnly);
    $('.personInfo h3').attr('title', userNameOnly).html(userNameOnly);
    //去我的主页
    $('.personInfo').on('click', '.goI', function() {
            window.location.href = 'perscen-zy.html'
        })
        //犀数币赋值
    $('.x_shu_Name').html(xs_bi_);
    //上传头像
    $('.userImgFile').live('change', function() {
        var name = $(this)[0].files[0];
        var formData = new FormData();
        formData.append("photo", name);
        $.ajax({
            async: true, //异步
            type: "POST",
            cache: false, //不缓存
            processData: false,
            /*告诉jQuery不要去处理发送的数据*/
            contentType: false,
            /*告诉jQuery不要去设置Content-Type请求头*/
            headers: { "Authorization": token },
            url: url_ip + "/personal/header_change",
            data: formData,
            dataType: "json",
            success: function(res) {
                if (res.status) {
                    window.location.reload(); //刷新
                } else {
                    $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '文件过大,上传图片请保持在50kb以内', setTime: 1500 });
                }
            },
            error: function(err) {
                console.log(err)
            }
        })
    });
    $('.xshuBg a').click(function() {
        $('.cb-rule').toggle()
    })
})