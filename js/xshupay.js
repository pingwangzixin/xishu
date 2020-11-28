var payLastDatas = {pay_coin: 0};

function payLx(num) { //payLx(payLastDatas.num)
    var NeedSrc = url_ip + '/pay/confirmpay/?num=' + payLastDatas.num + '&pay_price=' + payLastDatas.pay_price + '&pay_coin=' + payLastDatas.pay_coin + '&status=' + payLastDatas.status + '_' + new Date().getTime();
    $('#erweima .o-pay-weixin .p-w-box img').attr('src', NeedSrc);
    $('.o-pay-titl p').html('距离二维码过期还剩<i class="opaytime active">60</i>秒，过期后请刷新页面重新获取二维码。').addClass('active');
    $('.opaytime').html(60);
    var opy_time = 60; // 支付时间
    clearInterval(sss)
    var sss = setInterval(function () {
        opy_time--;
        if (opy_time <= 0) {
            clearInterval(sss);
            $('.o-pay-titl p').html('二维码已过期，<i class="opaytime">刷新</i>页面重新获取二维码。').removeClass('active');
            $('.opaytime').html('刷新');
        } else {
            $('.opaytime').html(opy_time);
            if (opy_time % 5 == 0) {
                $.GSHajax({
                    url: '/pay/check',
                    data: {num: num},
                    success: function (res) {
                        if (res.status) {
                            $('#qianpay').find('.goPayBtn').hide().siblings('.hasPay').show();
                            clearInterval(sss);
                            $('.alertMsg').showMsg({
                                isImg: 'isOk',
                                h2txt: '请到<a href="perscen-zh.html?' + token_id + '" style="color: #496FFF;">个人中心</a>查看'
                            });
                            return;
                        } else {
                            window.location.reload();
                        }
                    },
                })
            }
        }
    }, 1000)
}

$(function () {

    //犀数币赋值
    $('.x_shu_Name').html(xs_bi_);
    payLastDatas.num = GetQueryString('xsord') - 0;
    var userNameOnly = $('.navLogin span a').html();
    $('.payTitl .payOrder').html(payLastDatas.num);
    $('#xshupay .shpName ul').html('');
    $('#qianpay .shpName ul').html('');
    if (payLastDatas.num) {
        $.GSHajax({
            url: '/pay/orderinfo/',
            data: {num: payLastDatas.num},
            success: function (res) {
                if (res.status) {
                    if (res.data.data_coin.length != 0) {
                        $('#qianpay .payR').hide();
                        $('#xshupay').show();
                        $('#needXshu').html(res.data.coin);
                        for (var i = 0; i < res.data.data_coin.length; i++) {
                            var item_id = res.data.data_coin[i].id;
                            var item_type = res.data.data_coin[i].type;
                            $('#xshupay .shpName ul').append('<li><a href="javascript:void(0)" class="get_detail_url" data-id="' + item_id + '" data-type="' + item_type + '">' + res.data.data_coin[i].name + '</a></li>')
                        }
                    }
                    if (res.data.data_price.length != 0) {
                        $('#qianpay').show();
                        $('#needQian').html(res.data.price);
                        for (var i = 0; i < res.data.data_price.length; i++) {
                            $('#qianpay .shpName ul').append('<li><a href="javascript:void(0)" class="get_detail_url" data-id="' + item_id + '" data-type="' + item_type + '">' + res.data.data_price[i].name + '</a></li>')
                        }
                    }
                    $(".get_detail_url").on("click", function () {
                        var item_type = $(this).attr('data-type');
                        var item_id = $(this).attr('data-id');
                        if (item_type == "微课") {
                            sessionStorage.setItem("data_algo", 'algo');
                            sessionStorage.setItem("form", 'index');
                            window.location.href = `xssy_detail.html?${item_id}`;
                        } else if (item_type == "数据") {
                            sessionStorage.setItem("data_algo", 'data');
                            window.location.href = `details.html?${item_id}`;
                        } else if (item_type == "算法") {
                            sessionStorage.setItem("model_id_index", item_id);
                            window.location.href = `details.html?${item_id}`;
                        }

                    });
                    payLastDatas.pay_coin = res.data.coin;
                    payLastDatas.pay_price = res.data.price;
                    payLastDatas.status = res.data.status;
                    if (res.data.status == 2) { //已经支付过
                        $('.payBlock_b .goPayBtn').hide();
                        $('.payBlock_b .hasPay').show();
                    }
                }
            }
        })
    } else {
        //失败页面
    }
    //犀数币弹窗
    $('#xshupay').on('click', '.goPayBtn', function () {
        $('#xshuAlertMu').fadeIn();
        $('#xshuAlert .tip2').text('');
    })
    $('#xshuAlert').on('click', '.close', function () {
        $('#xshuAlertMu').fadeOut();
        $('#xshuAlert .tip2').text('');
        // 当点击关闭输入框里的内容需要重新输入
        $('#xshuAlert input').val('');
    })
    // 当文本内容发生改变，提示信息隐藏
    $('#xshuAlert input').bind('input propertychange', function () {
        $('#xshuAlert .tip2').text('');
    })
    //犀数币支付
    $('#xshuAlert').on('click', '.btn', function () {
        var password = $('#xshuAlert input').val();
        if (password == '') {
            $('#xshuAlert .tip2').text('请输入密码');
            return;
        }
        var that = $(this)
        if (!that.attr('data-is')) {
            $.GSHajax({
                url: '/pay/enter_password/',
                type: 'POST',
                data: {id: token_id, password: password},
                success: function (res) {
                    if (res.status) {
                        $.GSHajax({
                            url: '/pay/confirmpay/',
                            data: payLastDatas,
                            success: function (res2) {
                                that.attr('data-is', '')
                                if (res2.status) {
                                    $('.alertMsg').showMsg({
                                        isImg: 'isOk',
                                        h2txt: res2.msg,
                                        ptxt: `请到<a href="perscen-zy.html" style="color: #496FFF;">我的主页</a>查看`
                                    });
                                    $('#xshuAlertMu').hide()
                                    $('#xshupay .goPayBtn').hide().siblings('.hasPay').show();
                                } else {
                                    $('.alertMsg').showMsg({isImg: 'isOk', h2txt: res2.msg});

                                }
                            }
                        })
                    } else {
                        that.attr('data-is', '')
                        if (res.type == 0) {
                            $('.alertMsg1').show()
                        } else {
                            $('#xshuAlert .tip2').text(res.msg);
                        }
                    }
                }
            })
        }
        that.attr('data-is', true)
    })
    // 未设置密码跳转
    $('.no .no-close').click(function () {
        $('.no').css('display', 'none')
    })
    $('.no .btn').click(function () {
        var hash = location.search.substr(1);
        location.href = 'perscen-sz.html' + '#' + hash
    })

    //现金支付
    $('#qianpay').on('click', '.goPayBtn', function () {
        var _this = this;
        if (payLastDatas.pay_price == 0) {
            $.GSHajax({
                url: '/pay/confirmpay/',
                data: payLastDatas,
                success: function (res) {
                    if (res.status) {
                        $(_this).hide().siblings('.hasPay').show();
                        $('.alertMsg').showMsg({
                            isImg: 'isOk',
                            h2txt: res.msg,
                            ptxt: '请到<a href="perscen-zh.html?' + token_id + '" style="color: #496FFF;">个人中心</a>查看'
                        });
                    } else {
                        $('.alertMsg').showMsg({isImg: 'isNo', h2txt: res.msg, setTime: 1500});
                        window.location.reload();
                    }
                }
            })
        } else {
            $('#erweima').show();
            $('#erweima .o-pay .opaytime').addClass('active');
            $('#erweima .o-user').html(userNameOnly)
            $('.o-init .o-title span').html(payLastDatas.num);
            $('.o-init .o-price strong').html(payLastDatas.pay_price);
            payLx(payLastDatas.num);
        }
    })
    $('.o-pay-titl').on('click', 'p:not(.active) .opaytime', function () {
        payLx(payLastDatas.num);
    })
})
