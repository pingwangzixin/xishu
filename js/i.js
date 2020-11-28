//401处理
function i_isGoLogin(err) {
    if (err.status == 401) {
        if (token == 'JWT undefined' || token == 'JWT null') {
            $('.shade p').html('您目前还没有注册或登录~ ')
            $('.shade').show();
        } else {
            $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
            $('.shade').show();
        }
    }
}
var custom = [];
$(function() {
    /*查看资料详情*/
    $('.iMsg .more').click(function() {
            if ($(this).html() == '查看详细资料') {
                $('.iMsgRight ol').css('height', $('.iMsgRight ol')[0].scrollHeight + 'px')
                $('.iMsgRight dl dt').hide()
                $('.iMsgRight dl dd').show()
                $('.iMsgRight dl').css('height', $('.iMsgRight dl')[0].scrollHeight + 'px')
                $(this).html('收起详细资料')
            } else {
                $('.iMsgRight ol').css('height', 35 + 'px')
                $('.iMsgRight dl').css('height', 20 + 'px')
                $('.iMsgRight dl dt').show()
                $('.iMsgRight dl dd').hide()
                $(this).html('查看详细资料')
            }
        })
        /*大选项卡点击*/
    $('#iNav li').click(function() {
            $('#iNav li').removeClass('on')
            $(this).addClass('on')
            $('#icontxt .icenter>div').fadeOut()
            $('#icontxt .icenter>div:eq(' + $(this).index() + ')').fadeIn()
            if ($('#icontxt .icenter>div:eq(' + $(this).index() + ')')[0].className != 'liuyan') {
                boxShow($('#icontxt .icenter>div:eq(' + $(this).index() + ')'))
            } else {
                liuyan(1)
            }
        })
        // 等级标签
    $.ajax({
        type: 'GET',
        url: url_ip + '/labels/showalg',
        data: {
            classify: 5
        },
        dataType: 'json',
        async: false,
        success: function(res) {
            if (res.status) {
                for (var i = 0; i < res.data.length; i++) {
                    $('.levellabel').append(`<option value="${res.data[i].id}">${res.data[i].label_name}</option>`)
                }
            }
        }
    })
    var all_height = $('#icontxt .box:eq(0)').height()
    for (var i = 0; i < $('#icontxt .box').length; i++) {
        var dom = $('#icontxt .box')[i]
        var height_one = Number($(dom).attr('data-height'))
        var top = Number($(dom).attr('data-top'))
        var pagenum = Math.ceil((all_height - top) / height_one)
        if (height_one == 184) {
            pagenum = pagenum * 6
        }
        $(dom).attr('data-num', pagenum)
    }
    /*数据中选项卡点击*/
    function boxShow(obj) {
        var name = obj.children('ul').children('.on').attr('data-to')
        $('.' + name).show()
        var classify = $('.' + name).attr('data-type')
        var pagenum = $('.' + name).attr('data-num')
        if (name == 'allKeBox' || name == 'txKeBox') {
            if ($('.' + name + ' dl').html() == '') {
                $('.' + name + ' .emptyBox').hide()
                XrData(1, pagenum, classify)
            }
        } else {
            if ($('.' + name + ' ol').html() == '') {
                $('.' + name + ' .emptyBox').hide()
                XrData(1, pagenum, classify)
            }
        }
    }
    $('#icontxt ul li').click(function() {
            $(this).parent().children('li').removeClass('on')
            $(this).addClass('on')
            $('#icontxt .box').hide()
            boxShow($(this).parent().parent())
        })
        /*渲染主页个人信息*/
    function xrIsme(num, sex) {
        var who = '他';
        if (sex == '女') {
            who = '她';
        }
        if (num == 0) {
            $('#iNav li:eq(0)').html(who + '的数据')
            $('#iNav li:eq(1)').html(who + '的算法')
            $('#iNav li:eq(2)').html(who + '的模型')
            $('#iNav li:eq(3)').html(who + '的课程')
            $('#icontxt li[data-to="focusBoX"]').html(who + '的关注')
            $('#icontxt li[data-to="fansBox"]').html(who + '的粉丝')
            $('.liuyanTitle').html('给' + who + '留言')
        }
    }
    var owner = window.location.search.substr(1)
        // var userForm = ['', '网站注册', 'CPDA', 'CDA', '微课']
        //console.log(owner)
    $.ajax({
            url: url_ip + '/personal/homepage/',
            type: 'GET',
            data: { other_id: owner },
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function(data) {
                if (data.status) {
                    xrIsme(data.data.is_me, data.data.sex)
                    $('.iHandle p').hide()
                    $('.iMsgLeft i').append('<img src="' + url_ip + data.data.img + '">')
                    $('.iMsgRight h2 span').html(data.data.username)
                    if (data.data.sex == '男') {
                        $('.iMsgRight h2').append('<b class="nan"></b>')
                    } else {
                        $('.iMsgRight h2').append('<b class="nv"></b>')
                    }
                    $('.iMsgRight ol').append('<li class="on">' + data.data.origin + '</li>')
                    for (var i = 0; i < data.data.labels.length; i++) {
                        $('.iMsgRight ol').append('<li>' + data.data.labels[i] + '</li>')
                    }
                    $('.abstract').html(data.data.detail)
                    $('.abstract2 b').html(data.data.detail)
                    $('.jifen').html(data.data.integral)
                    $('.fans').html(data.data.fans)
                    $('.focus').html(data.data.myattention)
                    if (data.data.name != '') {
                        $('.name i').html(data.data.name)
                    }
                    if (data.data.birthday != '') {
                        $('.brith i').html(data.data.birthday)
                    }
                    if (data.data.industy != '') {
                        $('.industy i').html(data.data.industy)
                    }
                    if (data.data.job != '') {
                        $('.job i').html(data.data.job)
                    }
                    if (data.data.province != '') {
                        $('.province i').html(data.data.province)
                    }
                    if (data.data.weibo != '') {
                        $('.lianxi b:eq(0)').html(data.data.weibo)
                    }
                    if (data.data.email != '') {
                        $('.lianxi b:eq(1)').html(data.data.email)
                    }
                    if (data.data.weiix != '') {
                        $('.lianxi b:eq(2)').html(data.data.weiix)
                    }
                    if (data.data.qq != '') {
                        $('.lianxi b:eq(3)').html(data.data.qq)
                    }
                    if (data.data.is_me == '1') {
                        $('.operato1').show()
                        $('.liuyanTitle').hide()
                        $('.huifu1').hide()
                    } else if (data.data.is_me == '0' && data.data.is_gz == '0') {
                        $('.operato2').show()
                        $('.liuyanTitle').show()
                        $('.huifu1').show()
                    } else if (data.data.is_me == '0' && data.data.is_gz == '1') {
                        $('.operato3').show()
                        $('.operato3')[0].id = data.data.author_id
                        $('.liuyanTitle').show()
                        $('.huifu1').show()
                    }
                }
            },
            error: function(err) {
                i_isGoLogin(err);
            }
        })
        /*个人中心 || 关注*/
    $('.operato1').click(function() {
        window.location.href = 'perscen-zh.html'
    })
    $('.operato2').click(function() {
        $.ajax({
            type: "GET",
            url: url_ip + "/personal/add_focus",
            data: { file_user_id: owner },
            dataType: "json",
            headers: { "Authorization": token },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    $('.operato2').hide()
                    $('.operato3').show()
                    $('.operato3')[0].id = data.id
                }
            },
            error: function(err) {
                i_isGoLogin(err);
            }
        })
    })
    $('.operato3').hover(function() {
        $(this).css('background', '#496FFF')
        $(this).html('取消关注')
    }, function() {
        $(this).css('background', '#999')
        $(this).html('已关注')
    })
    $('.operato3').click(function() {
            //console.log($(this)[0].id)
            $.ajax({
                type: "POST",
                url: url_ip + "/personal/delete_focus",
                data: { relation_id: $(this)[0].id },
                dataType: "json",
                headers: { "Authorization": token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        $('.operato3').hide()
                        $('.operato2').show()
                    }
                },
                error: function(err) {
                    i_isGoLogin(err);
                }
            })
        })
        /*渲染主页其他数据*/
    var buydata_pagenum = $('.buyDataBox').attr('data-num')
    XrData(1, buydata_pagenum, 'buydata')

    function xrLabel(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += '<b data-id="' + data[i].id + '">' + data[i].name + '<span class="bq_del"></span></b>'
        }
        return html
    }
    var xr_label;

    function xrLabel2(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += '<b data-id="' + data[i].id + '">' + data[i].name + '</b>'
        }
        return html
    }

    function xrLabel3(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += '<b>' + data[i] + '</b>'
        }
        return html
    }

    function xrOperat(num) {
        if (num == 1) {
            return '<div class="see">查看</div><div class="cancle">删除</div><div class="set">设置</div>'
        } else {
            return '<div class="see">查看</div>'
        }
    }

    function xrOperat2(num1, idata) {
        if (num1 == 1) {
            if (idata == 2) {
                return '<span class="see">查看</span><span class="cancle">删除</span><span class="set">设置</span><span class="export"><a>导出</a></span>'
            } else {
                return '<span class="see">查看</span><span class="cancle">删除</span><span class="set">设置</span>'
            }
        } else {
            return '<span class="see">查看</span>'
        }
    }

    function xrZt(num) {
        if (num == 0) {
            return '公开';
        } else {
            return '私有';
        }
    }

    function xrOperat3(num1, num2) {
        if (num1 == 1 && num2 == 0) {
            return '<div class="operat"><div class="suggest">课程介绍</div><br><a class="study" target="_blank">开始学习</a></div>'
        } else if (num1 == 1 && num2 == 1) {
            return '<div class="operat"><a style="margin:25px 0;" class="study" target="_blank">课程学习</a></div>'
        } else if (num1 == 0 && num2 == 0) {
            return '<div class="operat"><div style="margin:25px 0;" class="suggest">课程介绍</div></div>'
        } else {
            return ''
        }
    }

    function xrSex(data) {
        if (data == '男') {
            return '<b class="nan"></b>'
        } else if (data == '女') {
            return '<b class="nv"></b>'
        }
    }

    function xrGz(num, num2) {
        if (num == 1) {
            return '<div class="btn2 followed" style="background:#999;" data-id="' + num2 + '">已关注</div>'
        } else if (num == 0) {
            return '<div class="btn2 follow">关注</div>'
        } else {
            return '';
        }
    }

    function xrEmpty(obj, data) {
        if (data.is_me == 0) {
            obj.children('a').hide()
        }
        obj.show()
    }
    var statu = ['未通过', '已通过', '审核中', '未提交']

    function XrData(nowpage, pagenum, classify) {
        $.ajax({
            url: url_ip + '/personal/personal_info/',
            type: 'GET',
            data: { page: nowpage, pagenum: pagenum, keyword: classify, other_id: owner },
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function(data) {
                // console.log(data)
                if (data.status) {
                    var res = data.data
                    if (classify == 'buydata') {
                        $('.buyDataBox ol').empty()
                        if (res.length == 0) {
                            if (nowpage > 1) {
                                nowpage--;
                                XrData(nowpage, pagenum, classify)
                            } else {
                                xrEmpty($('.buyDataBox .emptyBox'), data)
                            }
                        } else {
                            for (var i = 0; i < res.length; i++) {
                                xr_label = xrLabel(res[i].label);
                                $('.buyDataBox ol').append('<li data-id="' + res[i].id + '" data-lei="' + res[i].classify + '">' +
                                    '<i><img src="' + url_ip + res[i].img + '"></i>' +
                                    '<div class="msg">' +
                                    '<h2>' + res[i].name + '</h2>' +
                                    '<div class="label">' + xrLabel2(res[i].label) + '</div>' +
                                    '</div>' +
                                    '<div class="abs"><span>' + res[i].abstract + '</span></div>' +
                                    '<div class="zt">公开</div>' +
                                    '<div class="btn">' + xrOperat(data.is_me) + '</div>' +
                                    '</li>')
                            }
                            if (data.num > pagenum) {
                                xrPage($('#buyPage_d'), Math.ceil(data.num / pagenum), nowpage)
                            }
                        }
                    } else if (classify == 'updata') {
                        var idata = "2";
                        $('.uploadDataBoX ol').empty()
                        if (res.length == 0) {
                            if (nowpage > 1) {
                                nowpage--;
                                XrData(nowpage, pagenum, classify)
                            } else {
                                xrEmpty($('.uploadDataBoX .emptyBox'), data)
                            }
                        } else {
                            $('.uploadDataBoX ol').append('<table>' +
                                '<tr>' +
                                '<td>数据名称</td>' +
                                '<td>添加时间</td>' +
                                '<td>状态</td>' +
                                '<td>功能</td>' +
                                '</tr>' +
                                '</table>')
                            for (var i = 0; i < res.length; i++) {
                                $('.uploadDataBoX ol table').append("<tr data-id='" + res[i].id + "' data-label='" + JSON.stringify(res[i].label) + "' data-abs='" + res[i].abstract + "' data-lei='" + res[i].classify + "'>" +
                                    "<td>" + res[i].name + "</td>" +
                                    "<td>" + res[i].time.substr(0, res[i].time.indexOf('T')) + "</td>" +
                                    "<td><b class='zt'>" + xrZt(res[i].is_share) + "</b></td>" +
                                    "<td>" + xrOperat2(data.is_me, idata) + "</td>" +
                                    "</tr>")
                            }
                            if (data.num > pagenum) {
                                xrPage($('#uploadPage_d'), Math.ceil(data.num / pagenum), nowpage)
                            }
                        }
                    } else if (classify == 'buyalg') {
                        var idata = 1;
                        $('.buyAlgoBox ol').empty()
                        if (res.length == 0) {
                            if (nowpage > 1) {
                                nowpage--;
                                XrData(nowpage, pagenum, classify)
                            } else {
                                xrEmpty($('.buyAlgoBox .emptyBox'), data)
                            }
                        } else {
                            for (var i = 0; i < res.length; i++) {
                                xr_label = xrLabel(res[i].label);
                                $('.buyAlgoBox ol').append('<li data-id="' + res[i].id + '" data-lei="' + res[i].classify + '" data-level="' + res[i].levellabel.id + '">' +
                                    '<i><img src="' + url_ip + res[i].img + '"></i>' +
                                    '<div class="msg">' +
                                    '<h2>' + res[i].name + '</h2>' +
                                    '<div class="label">' + xrLabel2(res[i].label) + '</div>' +
                                    '</div>' +
                                    '<div class="abs"><span>' + res[i].abstract + '</span></div>' +
                                    '<div class="zt">公开</div>' +
                                    '<div class="btn">' + xrOperat(data.is_me, idata) + '</div>' +
                                    '</li>')
                            }
                            if (data.num > pagenum) {
                                xrPage($('#buyPage_a'), Math.ceil(data.num / pagenum), nowpage)
                            }
                        }
                    } else if (classify == 'myalg') {
                        var idata = 1;
                        $('.uploadAlgoBoX ol').empty()
                        if (res.length == 0) {
                            if (nowpage > 1) {
                                nowpage--;
                                XrData(nowpage, pagenum, classify)
                            } else {
                                xrEmpty($('.uploadAlgoBoX .emptyBox'), data)
                            }
                        } else {
                            $('.uploadAlgoBoX ol').append('<table>' +
                                '<tr>' +
                                '<td>算法名称</td>' +
                                '<td>添加时间</td>' +
                                '<td>状态</td>' +
                                '<td>功能</td>' +
                                '</tr>' +
                                '</table>')
                            for (var i = 0; i < res.length; i++) {
                                var num = res[i].type
                                $('.uploadAlgoBoX ol table').append("<tr data-id='" + res[i].id + "' data-adopt='" + res[i].type + "' data-label='" + JSON.stringify(res[i].label) + "' data-abs='" + res[i].abstract + "' data-lei='" + res[i].classify + "' data-level='" + res[i].levellabel.id + "'>" +
                                    "<td>" + res[i].name + "</td>" +
                                    "<td>" + res[i].time.substr(0, res[i].time.indexOf('T')) + "</td>" +
                                    "<td><b class='status" + res[i].type + "'>" + statu[res[i].type] + "</b><b class='zt'>" + xrZt(res[i].is_share) + "</b></td>" +
                                    "<td>" + xrOperat2(data.is_me, idata) + "</td>" +
                                    "</tr>")
                            }
                            if (data.num > pagenum) {
                                xrPage($('#uploadPage_a'), Math.ceil(data.num / pagenum), nowpage)
                            }
                        }
                    } else if (classify == 'addscene') {
                        $('.buySceneBox ol').empty()
                        if (res.length == 0) {
                            if (nowpage > 1) {
                                nowpage--;
                                XrData(nowpage, pagenum, classify)
                            } else {
                                xrEmpty($('.buySceneBox .emptyBox'), data)
                            }
                        } else {
                            for (var i = 0; i < res.length; i++) {
                                xr_label = xrLabel(res[i].label);
                                $('.buySceneBox ol').append('<li data-id="' + res[i].id + '" data-objid="' + res[i].objid + '" data-is="' + res[i].is_new + '" data-lei="' + res[i].classify + '">' +
                                    '<i><img src="' + (res[i].is_new == 1 ? res[i].img : url_ip + res[i].img) + '" style="background:#000"></i>' +
                                    '<div class="msg">' +
                                    '<h2>' + res[i].name + '</h2>' +
                                    '<div class="label">' + xrLabel2(res[i].label) + '</div>' +
                                    '</div>' +
                                    '<div class="abs"><span>' + res[i].abstract + '</span></div>' +
                                    '<div class="zt">公开</div>' +
                                    '<div class="btn">' + xrOperat(data.is_me) + '</div>' +
                                    '</li>')
                            }
                            if (data.num > pagenum) {
                                xrPage($('#buyPage_s'), Math.ceil(data.num / pagenum), nowpage)
                            }
                        }
                    } else if (classify == 'myscene') {
                        $('.uploadSceneBoX ol').empty()
                        if (res.length == 0) {
                            if (nowpage > 1) {
                                nowpage--;
                                XrData(nowpage, pagenum, classify)
                            } else {
                                xrEmpty($('.uploadSceneBoX .emptyBox'), data)
                            }
                        } else {
                            $('.uploadSceneBoX ol').append('<table>' +
                                '<tr>' +
                                '<td>数据名称</td>' +
                                '<td>添加时间</td>' +
                                '<td>状态</td>' +
                                '<td>功能</td>' +
                                '</tr>' +
                                '</table>')
                            for (var i = 0; i < res.length; i++) {
                                $('.uploadSceneBoX ol table').append("<tr data-id='" + res[i].id + "' data-objid='" + res[i].objid + "' data-is='" + res[i].is_new + "' data-label='" + JSON.stringify(res[i].label) + "' data-abs='" + res[i].abstract + "' data-lei='" + res[i].classify + "'>" +
                                    "<td>" + res[i].name + "</td>" +
                                    "<td>" + res[i].time.substr(0, res[i].time.indexOf('T')) + "</td>" +
                                    "<td><b class='zt'>" + xrZt(res[i].is_share) + "</b></td>" +
                                    "<td>" + xrOperat2(data.is_me) + "</td>" +
                                    "</tr>")
                            }
                            if (data.num > pagenum) {
                                xrPage($('#uploadPage_s'), Math.ceil(data.num / pagenum), nowpage)
                            }
                        }
                    } else if (classify == 'all') {
                        $('.allKeBox dl').empty()
                        if (res.length == 0) {
                            if (nowpage > 1) {
                                nowpage--;
                                XrData(nowpage, pagenum, classify)
                            } else {
                                xrEmpty($('.allKeBox .emptyBox'), data)
                            }
                        } else {
                            for (var i = 0; i < res.length; i++) {
                                $('.allKeBox dl').append('<dd data-id="' + res[i].id + '" data-mid="' + res[i].mid + '">' + xrOperat3(data.is_me, res[i].is_cpda) +
                                    '<div class="gq' + res[i].status + '"></div>' +
                                    '<img src="' + url_ip + res[i].img + '">' +
                                    '<h2>' + res[i].name + '</h2>' +
                                    '<div class="label">' + xrLabel3(res[i].label) + '</div>' +
                                    '<p><span>' + res[i].end_time.substr(0, res[i].end_time.indexOf('T')) + '</span>到期</p>' +
                                    '</dd>')
                            }
                            if (data.num > pagenum) {
                                xrPage($('#allPage_k'), Math.ceil(data.num / pagenum), nowpage)
                            }
                        }
                    } else if (classify == 'cpda') {
                        $('.txKeBox dl').empty()
                        if (res.length == 0) {
                            if (nowpage > 1) {
                                nowpage--;
                                XrData(nowpage, pagenum, classify)
                            } else {
                                xrEmpty($('.txKeBox .emptyBox'), data)
                            }
                        } else {
                            for (var i = 0; i < res.length; i++) {
                                $('.txKeBox dl').append('<dt>' + res[i].title + '</dt>')
                                for (var j = 0; j < res[i].data.length; j++) {
                                    $('.txKeBox dl').append('<dd data-id="' + res[i].data[j].id + '" data-mid="' + res[i].data[j].mid + '">' + xrOperat3(data.is_me, 1) +
                                        '<div class="gq' + res[i].data[j].status + '"></div>' +
                                        '<img src="' + url_ip + res[i].data[j].img + '">' +
                                        '<h2>' + res[i].data[j].name + '</h2>' +
                                        '<div class="label">' + xrLabel3(res[i].data[j].label) + '</div>' +
                                        '<p><span>' + res[i].data[j].end_time.substr(0, res[i].data[j].end_time.indexOf('T')) + '</span>到期</p>' +
                                        '</dd>')
                                }
                            }
                        }
                    } else if (classify == 'foaus') {
                        $('.focusBoX ol').empty()
                        if (res.length == 0) {
                            if (nowpage > 1) {
                                nowpage--;
                                XrData(nowpage, pagenum, classify)
                            } else {
                                xrEmpty($('.focusBoX .emptyBox'), data)
                            }
                        } else {
                            for (var i = 0; i < res.length; i++) {
                                $('.focusBoX ol').append('<li data-id="' + res[i].id + '">' +
                                    '<s><img src="' + url_ip + res[i].img + '" class="see"></s>' +
                                    '<div class="msg2">' +
                                    '<h2><span>' + res[i].name + '</span>' + xrSex(res[i].sex) + '</h2>' +
                                    '<h3>' + res[i].job + '</h3>' +
                                    '</div>' +
                                    '<p>' + res[i].detail + '</p>' + xrGz(res[i].is_gz, res[i].author_id) +
                                    '</li>')
                            }
                            if (data.num > pagenum) {
                                xrPage($('#foucsPage'), Math.ceil(data.num / pagenum), nowpage)
                            }
                        }
                    } else if (classify == 'fance') {
                        $('.fansBox ol').empty()
                        if (res.length == 0) {
                            if (nowpage > 1) {
                                nowpage--;
                                XrData(nowpage, pagenum, classify)
                            } else {
                                xrEmpty($('.fansBox .emptyBox'), data)
                            }
                        } else {
                            for (var i = 0; i < res.length; i++) {
                                $('.fansBox ol').append('<li data-id="' + res[i].id + '">' +
                                    '<s><img src="' + url_ip + res[i].img + '" class="see"></s>' +
                                    '<div class="msg2">' +
                                    '<h2><span>' + res[i].name + '</span>' + xrSex(res[i].sex) + '</h2>' +
                                    '<h3>' + res[i].job + '</h3>' +
                                    '</div>' +
                                    '<p>' + res[i].detail + '</p>' + xrGz(res[i].is_gz, res[i].author_id) +
                                    '</li>')
                            }
                            if (data.num > pagenum) {
                                xrPage($('#fansPage'), Math.ceil(data.num / pagenum), nowpage)
                            }
                        }
                    }
                    for (var i = 0; i < $('.abs span').length; i++) {
                        if ($('.abs span')[i].offsetWidth < 512) {
                            $($('.abs span')[i]).parent().addClass('on')
                        }
                    }
                }
            },
            error: function(err) {
                i_isGoLogin(err);
            }
        })
    }
    /*留言*/
    function liuyan(page) {
        $.ajax({
            url: url_ip + '/model/liuyan/',
            type: 'GET',
            data: { owner: owner, page: page },
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    $('.liuyan ol>li').remove()
                    var res = data.data
                    for (var i = 0; i < res.length; i++) {
                        $('.liuyan ol').append('<li data-id="' + res[i].plid + '">' +
                            '<div class="grade1">' +
                            '<i data-id="' + res[i].hfqid + '" class="to_i"><img src="' + url_ip + res[i].hfqtx + '"></i>' +
                            '<h2><span data-id="' + res[i].hfqid + '" class="to_i">' + res[i].hfqname + '</span><b>' + res[i].time + '</b></h2>' +
                            '<p>' + res[i].liuyan + '</p>' +
                            '<h3 class="re_yiji"><img src="img/icon_msg_reply.png">回复 (' + res[i].erji_count + ')</h3>' +
                            '</div>' +
                            '<div class="grade2_box">' +
                            '<div id="lyerPage' + res[i].plid + '" class="Page" style="position:static;"></div>' +
                            '<div class="huifu2"><textarea></textarea><span data-id="' + res[i].plid + '" data-id2="' + res[i].hfqid + '">回复</span></div>' +
                            '</div>' +
                            '</li>')
                    }
                    if (data.amount > 15) {
                        xrPage($('#liuyanPage'), Math.ceil(data.amount / 15), page)
                    }
                }
            },
            error: function(err) {
                i_isGoLogin(err);
            }
        })
    }

    function xrName(id1, id2, name) {
        if (id1 == id2) {
            return ''
        } else {
            return name
        }
    }

    function liuyan2(page, obj) {
        var yijiid = Number(obj.attr('data-id'))
        var userid = obj.children('.grade1').children('h2').children('span').attr('data-id')
            //console.log(obj,yijiid,userid,page)
        $.ajax({
            url: url_ip + '/model/liuyaner',
            type: 'GET',
            data: { owner: owner, first_id: yijiid, page: page },
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    var res = data.data
                    obj.children('.grade1').children('.re_yiji').html('<img src="img/icon_msg_reply.png">回复 (' + data.amount + ')')
                    obj.children('.grade2_box').children('.grade2').remove()
                    obj.children('.grade2_box').show()
                    for (var i = res.length - 1; i > -1; i--) {
                        obj.children('.grade2_box').prepend('<div class="grade2" data-id="' + res[i].plid + '">' +
                            '<i data-id="' + res[i].hfqid + '" class="to_i"><img src="' + url_ip + res[i].hfqtx + '"></i>' +
                            '<p><span><a data-id="' + res[i].hfqid + '" class="to_i">' + res[i].hfqname + '</a>回复<a>' + xrName(userid, res[i].hfhid, res[i].hfhname) + '</a> :</span>' + res[i].liuyan + '</p>' +
                            '<h3><b>' + res[i].time + '</b><a class="re_erji">回复</a></h3>' +
                            '</div>')
                    }
                    if (data.amount > 6) {
                        xrPage($('#lyerPage' + yijiid), Math.ceil(data.amount / 6), page)
                    }
                }
            },
            error: function(err) {
                i_isGoLogin(err);
            }
        })
    }
    /*一级留言*/
    $('#liuyan').live('click', function() {
            var html = $('.huifu1 textarea').val()
            $.ajax({
                url: url_ip + '/model/liuyan/',
                type: 'POST',
                data: { owner: owner, text: html },
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        $('.huifu1 b').html('500')
                        $('.huifu1 textarea').val('')
                        liuyan(1)
                    }
                },
                error: function(err) {
                    i_isGoLogin(err);
                }
            })
        })
        /*跳个人主页*/
    $('.to_i').live('click', function() {
            var id = $(this).attr('data-id')
            window.location.href = 'perscen-zy.html'
        })
        /*回复二级*/
    $('.re_erji').live('click', function() {
            var id = $(this).parent().parent().parent().parent().attr('data-id')
            var name = $(this).parent().prev().children('span').children('a:eq(0)').html()
            var id2 = $(this).parent().prev().children('span').children('a:eq(0)').attr('data-id')
            $(this).parents('.grade2_box').children('.huifu2').children('textarea').attr('placeholder', '回复 ' + name + ':')
            $(this).parents('.grade2_box').children('.huifu2').children('span').attr('data-id', id)
            $(this).parents('.grade2_box').children('.huifu2').children('span').attr('data-id2', id2)
        })
        /*二级回复按钮点击*/
    $('.huifu2 span').live('click', function() {
            var html = $(this).prev().val()
            var that = $(this)
                //console.log(owner,html,$(this).attr('data-id'),$(this).attr('data-id2'))
            $.ajax({
                url: url_ip + '/model/liuyan/',
                type: 'POST',
                data: { owner: owner, text: html, parent_id: $(this).attr('data-id'), hf_user: $(this).attr('data-id2') },
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        that.prev().val('')
                        var obj = that.parent().parent().parent();
                        var page = obj.children('.grade2_box').children('.Page').children('dl').attr('data-nowpage')
                        liuyan2(page, obj)
                    }
                },
                error: function(err) {
                    i_isGoLogin(err);
                }
            })
        })
        /*回复一级*/
    $('.re_yiji').live('click', function() {
            var obj = $(this).parent().parent()
            var page = obj.children('.grade2_box').children('.page').children('dl').attr('data-nowpage') || 1
            liuyan2(page, obj)
        })
        /*留言框长度检测*/
    $('.huifu1 textarea').on('input propertychange change', function() {
            if ($(this).val().length >= 500) {
                $(this).val($(this).val().substr(0, 500))
                $('.huifu1 b').html(0)
            } else {
                $('.huifu1 b').html(Number($('.huifu1 b').html()) - 1)
            }
        })
        /*分页*/
    $('.Page').live('click', function(evt) {
            var id = $(this)[0].id
            var target = evt.target
            var className = target.className
            var page = target.innerHTML
            var pagenum = $(this).parent().attr('data-num')
            var classify = $(this).parent().attr('data-type')
            if (classify) {
                clickPage($('#' + id), className, page, XrData, pagenum, classify)
            } else if (id == 'liuyanPage') {
                clickPage($('#' + id), className, page, liuyan, pagenum, classify)
            } else if (id.substr(0, 8) == 'lyerPage') {
                var pagenum = $(this).parent().parent()
                clickPage($('#' + id), className, page, liuyan2, pagenum, classify)
            }
        })
        /*查看*/
    $('.see').live('click', function() {
            var classify = $(this).parents('ol').parent().attr('data-type')
            var id = $(this).parent().parent().attr('data-id')
            if (classify == 'buydata' || classify == 'updata') {
                window.sessionStorage.setItem("form", "index")
                window.sessionStorage.setItem("data_algo", "data")
                window.open('details.html?' + id)
            } else if (classify == 'buyalg') {
                window.sessionStorage.setItem("form", "personal")
                window.sessionStorage.setItem("data_algo", "algo")
                window.open('details.html?' + id)
            } else if (classify == 'myalg') {
                limit('算法自建')
                    .then(res => {
                        if (res) {
                            var type = $(this).parent().prev().children('b')[0].className.substr(6)
                            window.open('python3/python_online.html?' + type + '&' + id)
                        }
                    })
            } else if (classify == 'addscene') {
                var isnew = $(this).parent().parent().attr('data-is')
                var title = encodeURI($(this).parents('li').children('.msg').children('h2').html())
                var obj_id = $(this).parent().parent().attr('data-objid')
                if (isnew == 1) {
                    window.open('model2.html?' + obj_id + '&' + title)
                } else {
                    sessionStorage.setItem("model_id_index", id)
                    window.open('model.html')
                }
            } else if (classify == 'myscene') {
                var isnew = $(this).parent().parent().attr('data-is')
                var title = encodeURI($(this).parent().prev().prev().html())
                var obj_id = $(this).parent().parent().attr('data-objid')
                if (isnew == 1) {
                    limit('场景自建')
                        .then(res => {
                            if (res) {
                                window.open('model2.html?' + obj_id + '&' + title)
                            }
                        })
                } else {
                    limit('场景自建')
                        .then(res => {
                            if (res) {
                                sessionStorage.setItem("model_id_index", id)
                                window.open('model.html')
                            }
                        })
                }
            } else if (classify == 'foaus' || classify == 'fance') {
                window.open('perscen-zy.html')
            } else if (classify == 'liuyan') {
                var id = $(this).attr('data-id')
                window.open('perscen-zy.html')
            }
        })
        /*删除*/
    $('.cancle').live('click', function() {
            var classify = $(this).parents('ol').parent().attr('data-type')
            var pagenum = $(this).parents('ol').parent().attr('data-num')
            var nowpage = $(this).parents('ol').nextAll('.Page').children('dl').attr('data-nowpage') || 1
            var id = $(this).parent().parent().attr('data-id')
            var objid = $(this).parent().parent().attr('data-objid')
            if (classify == 'buydata' || classify == 'updata') {
                $.ajax({
                    url: url_ip + '/personal/delete_data',
                    type: 'GET',
                    data: { file_id: id },
                    dataType: 'json',
                    success: function(data) {
                        if (data.status) {
                            XrData(nowpage, pagenum, classify)
                        }
                    },
                    error: function(err) {
                        i_isGoLogin(err);
                    }
                })
            } else if (classify == 'buyalg' || classify == 'myalg') {
                var sf_type = $(this).parent().parent().attr('data-adopt');
                var sf_name = $(this).parents("tr").children("td:first").text();
                var sf_type2;
                switch (sf_type) {
                    case "0":
                        sf_type2 = "未通过";
                        break;
                    case "1":
                        sf_type2 = "已通过";
                        break;
                    case "2":
                        sf_type2 = "审核中";
                        break;
                    case "3":
                        sf_type2 = "未提交";
                        break;
                }
                $.ajax({
                    type: "GET",
                    url: url_ip + "/examine/delete_func",
                    data: {
                        algoname: sf_name,
                        id: id,
                        type: sf_type2
                    },
                    dataType: "json",
                    headers: {
                        "Authorization": token
                    },
                    success: function(res) {
                        // console.log(res);
                        if (res.status) {
                            XrData(nowpage, pagenum, classify)
                        }
                    },
                    error: function(err) {
                        i_isGoLogin(err);
                    }
                });
            } else if (classify == 'addscene' || classify == 'myscene') {
                if ($(this).parent().parent().attr('data-is') == '1') {
                    $.ajax({
                        url: url_ip + '/model/chuanimg/',
                        type: 'delete',
                        data: {
                            scene_id: objid
                        },
                        dataType: 'json',
                        success: function(data) {
                            //console.log(data)
                            if (data.status) {
                                XrData(nowpage, pagenum, classify)
                            }
                        },
                        error: function(err) {
                            i_isGoLogin(err);
                        }
                    })
                } else {
                    $.ajax({
                        url: url_ip + '/personal/model_delete',
                        type: 'get',
                        data: { file_id: id },
                        dataType: 'json',
                        success: function(data) {
                            //console.log(data)
                            if (data.status) {
                                XrData(nowpage, pagenum, classify)
                            }
                        },
                        error: function(err) {
                            i_isGoLogin(err);
                        }
                    })
                }
            }
        })
        /*设置*/
    $('.set').live('click', function() {
            $('.labelfold').hide()
            $('.labelfold .labelEr').empty()
            $('.labelfold .labelEr').hide()
            var classify = $(this).parents('.box').attr('data-type')
            var id = $(this).parent().parent().attr('data-id')
            var arr = ["商业", "文化", "环境", "生活", "社会", "体育", "教育", "科技", "时政"]
            var art = ["机器学习", "文本分析", "计算机视觉", "文本分析"]
            var ary = ["场景"]
            if (classify == 'buydata') {
                var name = $(this).parent().parent().children('.msg').children('h2').html()
                var index = $(this).parent().parent().attr('data-lei') - 1
                var label = xr_label;
                var abstrac = $(this).parent().parent().children('.abs').children('span').html()
                var levellabel = $(this).parent().parent().attr('data-level')
                $('.setCenter .classify').html('数据')
                $('.setCenter .name').val(name)
                $('.setCenter .lei').empty()
                for (var i = 0; i < arr.length; i++) {
                    $('.setCenter .lei').append('<option>' + arr[i] + '</option>')
                }
                $('.setCenter .lei').val(arr[index])
                $('.setCenter .zhuangt').empty()
                $('.setCenter .zhuangt').append('<option>公开</option>')
                $('.setCenter .lab b').remove()
                $('.setCenter .lab').prepend(label)
                $('.setCenter .levellabel').val(levellabel)
                $('.setCenter .set_abstrac').val(abstrac)
                $('.setBox').attr('data-type', classify)
                $('.setBox .bc').attr('data-id', id)
                $('.setBg').show()
            } else if (classify == 'updata') {
                var name = $(this).parent().prev().prev().prev().html()
                var index = $(this).parent().parent().attr('data-lei') - 1
                var zt = $(this).parent().prev().children('b').html()
                var label1 = $(this).parent().parent().attr('data-label')
                    //console.log(label1)
                var label = JSON.parse(label1)
                var abstrac = $(this).parent().parent().attr('data-abs')
                var levellabel = $(this).parent().parent().attr('data-level')
                $('.setCenter .classify').html('数据')
                $('.setCenter .name').val(name)
                $('.setCenter .lei').empty()
                for (var i = 0; i < arr.length; i++) {
                    $('.setCenter .lei').append('<option>' + arr[i] + '</option>')
                }
                $('.setCenter .lei').val(arr[index])
                $('.seetCenter .levellabel').val(levellabel)
                $('.setCenter .zhuangt').empty()
                $('.setCenter .zhuangt').append('<option>公开</option><option>私有</option>')
                $('.setCenter .zhuangt').val(zt)
                $('.setCenter .levellabel').val(levellabel)
                $('.setCenter .lab b').remove()
                for (var i = 0; i < label.length; i++) {
                    $('.setCenter .lab i').before('<b data-id="' + label[i].id + '">' + label[i].name + '<span class="bq_del"></span></b>')
                }
                $('.setCenter .set_abstrac').val(abstrac)
                $('.setBox').attr('data-type', classify)
                $('.setBox .bc').attr('data-id', id)
                $('.setBg').show()
            } else if (classify == 'buyalg') {
                var name = $(this).parent().parent().children('.msg').children('h2').html()
                var index = $(this).parent().parent().attr('data-lei')
                var label = xr_label;
                var abstrac = $(this).parent().parent().children('.abs').children('span').html()
                var levellabel = $(this).parent().parent().attr('data-level')
                $('.setCenter .classify').html('算法')
                $('.setCenter .name').val(name)
                $('.setCenter .lei').empty()
                for (var i = 0; i < art.length; i++) {
                    $('.setCenter .lei').append('<option>' + art[i] + '</option>')
                }
                $('.setCenter .lei').val(index)
                $('.setCenter .levellabel').val(levellabel)
                $('.setCenter .zhuangt').empty()
                $('.setCenter .zhuangt').append('<option>公开</option>')
                $('.setCenter .lab b').remove()
                $('.setCenter .lab').prepend(label)
                $('.setCenter .set_abstrac').val(abstrac)
                $('.setBox').attr('data-type', classify)
                $('.setBox .bc').attr('data-id', id)
                $('.setBox .bc').attr('data-new', 'pass')
                $('.setBg').show()
            } else if (classify == 'myalg') {
                var name = $(this).parent().prev().prev().prev().html()
                var index = $(this).parent().parent().attr('data-lei')
                var zt = $(this).parent().prev().children('b:eq(1)').html()
                var ispass = $(this).parent().prev().children('b:eq(0)').html()
                var label1 = $(this).parent().parent().attr('data-label')
                var label = JSON.parse(label1)
                var abstrac = $(this).parent().parent().attr('data-abs')
                var levellabel = $(this).parent().parent().attr('data-level')
                if (ispass == '已通过') {
                    $('.setBox .bc').attr('data-new', 'pass')
                } else {
                    $('.setBox .bc').attr('data-new', 'nopass')
                }
                $('.setCenter .classify').html('算法')
                $('.setCenter .name').val(name)
                $('.setCenter .lei').empty()
                for (var i = 0; i < art.length; i++) {
                    $('.setCenter .lei').append('<option>' + art[i] + '</option>')
                }
                $('.setCenter .lei').val(index)
                $('.seetCenter .levellabel').val(levellabel)
                $('.setCenter .zhuangt').empty()
                $('.setCenter .zhuangt').append('<option>公开</option><option>私有</option>')
                $('.setCenter .zhuangt').val(zt)
                $('.setCenter .lab b').remove()
                for (var i = 0; i < label.length; i++) {
                    $('.setCenter .lab i').before('<b data-id="' + label[i].id + '">' + label[i].name + '<span class="bq_del"></span></b>')
                }
                $('.setCenter .set_abstrac').val(abstrac)
                $('.setBox').attr('data-type', classify)
                $('.setBox .bc').attr('data-id', id)
                $('.setBg').show()
            } else if (classify == 'addscene') {
                var name = $(this).parent().parent().children('.msg').children('h2').html()
                var index = $(this).parent().parent().attr('data-lei')
                var label = xr_label;
                var abstrac = $(this).parent().parent().children('.abs').children('span').html()
                var isnew = $(this).parent().parent().attr('data-is')
                if (isnew == 1) {
                    $('.setBox .bc').attr('data-new', 'new')
                } else {
                    $('.setBox .bc').attr('data-new', 'old')
                }
                $('.setCenter .classify').html('场景')
                $('.setCenter .name').val(name)
                $('.setCenter .lei').empty()
                for (var i = 0; i < ary.length; i++) {
                    $('.setCenter .lei').append('<option>' + ary[i] + '</option>')
                }
                $('.setCenter .lei').val(index)
                $('.setCenter .zhuangt').empty()
                $('.setCenter .zhuangt').append('<option>公开</option>')
                $('.setCenter .lab b').remove()
                $('.setCenter .lab').prepend(label)
                $('.setCenter .set_abstrac').val(abstrac)
                $('.setBox').attr('data-type', classify)
                $('.setBox .bc').attr('data-id', id)
                $('.setBg').show()
            } else if (classify == 'myscene') {
                var name = $(this).parent().prev().prev().prev().html()
                var index = $(this).parent().parent().attr('data-lei')
                var zt = $(this).parent().prev().children('b').html()
                var label1 = $(this).parent().parent().attr('data-label')
                var label = JSON.parse(label1)
                var abstrac = $(this).parent().parent().attr('data-abs')
                var levellabel = $(this).parent().parent().attr('data-level')
                var isnew = $(this).parent().parent().attr('data-is')
                if (isnew == 1) {
                    $('.setBox .bc').attr('data-new', 'new')
                } else {
                    $('.setBox .bc').attr('data-new', 'old')
                }
                $('.setCenter .classify').html('场景')
                $('.setCenter .name').val(name)
                $('.setCenter .lei').empty()
                for (var i = 0; i < ary.length; i++) {
                    $('.setCenter .lei').append('<option>' + ary[i] + '</option>')
                }
                $('.setCenter .lei').val(ary[index])
                $('.seetCenter .levellabel').val(levellabel)
                $('.setCenter .zhuangt').empty()
                $('.setCenter .zhuangt').append('<option>公开</option><option>私有</option>')
                $('.setCenter .zhuangt').val(zt)
                $('.setCenter .lab b').remove()
                for (var i = 0; i < label.length; i++) {
                    $('.setCenter .lab i').before('<b data-id="' +
                        label[i].id + '">' + label[i].name + '<span class="bq_del"></span></b>')
                }
                $('.setCenter .set_abstrac').val(abstrac)
                $('.setBox').attr('data-type', classify)
                $('.setBox .bc').attr('data-id', id)
                $('.setBg').show()
            }
        })
        // 我的上传数据导出
    $('.export').live("click", function() {
            var id = $(this).parents("tr").attr("data-id");
            $('.export a').attr('href', url_ip + "/dispose/download?click_file=" + id);
        })
        /*设置弹窗关闭*/
    $('.setBox h3').click(function() {
            $('.setBg').hide()
        })
        /*设置弹窗标签*/
    $('.setCenter .lab i').click(function() {
        $(this).parent().parent().css('margin-bottom', '10px')
        var type = $('.setBox').attr('data-type')
        if (type == 'buydata' || type == 'updata' || type == 'addscene' || type == 'myscene') {
            $.ajax({
                url: url_ip + '/labels/data_labels/',
                type: 'GET',
                data: {},
                dataType: 'json',
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        $('.labelfold>b').remove()
                        for (var i = 0; i < data.data.length; i++) {
                            $('.labelfold .labelEr').before("<b data-label='" + JSON.stringify(data.data[i].next) + "' data-id='" + data.data[i].id + "'>" + data.data[i].name + "<span> + </span></b>")
                        }
                    }
                },
                error: function(data) {
                    // console.log(data)
                }
            })
        } else if (type == 'buyalg' || type == 'myalg') {
            $.ajax({
                url: url_ip + '/labels/alg_labels/',
                type: 'GET',
                data: {},
                dataType: 'json',
                success: function(data) {
                    // console.log(data)
                    if (data.status) {
                        $('.labelfold>b').remove()
                        for (var i = 0; i < data.data.length; i++) {
                            $('.labelfold .labelEr').before("<b data-label='" + JSON.stringify(data.data[i].next) + "' data-id='" + data.data[i].id + "'>" + data.data[i].name + "<span> + </span></b>")
                        }
                    }
                },
                error: function(data) {
                    // console.log(data)
                }
            })
        }
        $('.labelfold').show()
    })
    $('.labelfold h5').click(function() {
        $(this).parent().parent().css('margin-bottom', '26px')
        $('.labelfold').hide()
    })
    $('.labelfold>b').live('click', function() {
        $('.labelEr').empty()
        if ($(this).attr('data-label')) {
            var label = $(this).attr('data-label')
            var arr = JSON.parse(label)
            for (var i = 0; i < arr.length; i++) {
                $('.labelEr').append("<b data-label='" + JSON.stringify(arr[i].next) + "' data-id='" + arr[i].id + "'>" + arr[i].name + "<span> + </span><div class='labelThree'></div></b>")
            }
        }
        $('.labelEr').show()
    })
    $('.labelEr>b').live('mouseenter', function() {
        var left = -$(this)[0].offsetLeft + 115
        $(this).children('.labelThree').css('left', left + 'px')
        var label = $(this).attr('data-label')
        var arr = JSON.parse(label)
        $(this).children('.labelThree').empty()
        for (var i = 0; i < arr.length; i++) {
            $(this).children('.labelThree').append("<b data-id='" + arr[i].id + "'>" + arr[i].name + "<span> + </span></b>")
        }
        $(this).children('.labelThree').show()
    })
    $('.labelEr>b').live('mouseleave', function() {
        $(this).children('.labelThree').hide()
    })
    $('.labelfold b span').live('click', function() {
        var name = $(this).parent()[0].textContent
        var id = $(this).parent().attr("data-id")
        name = name.substr(0, name.indexOf(' + '))
        $('.setCenter .lab i').before('<b data-id="' + id + '">' + name + '<span class="bq_del"></span></b>')
    })
    $('.labelfold input').keydown(function(event) {
        if (event.keyCode == 32) {
            if ($(this).val() != '' && $(this).val() != ' ') {
                var name = $(this).val()
                $('.setCenter .lab i').before('<b>' + name + '<span class="bq_del"></span></b>')
                custom.push($(this).val());
            }
            $(this).val('')
        }
    });
    /*设置弹窗保存*/
    $('.setBg .bc').click(function() {
        var id = $(this).attr('data-id')
        var way = $(this).attr('data-new')
        var classify = $('.setBox').attr('data-type')
        var name = $('.setBg .name').val()
        var lei = $('.setBg .lei').val()
        var zhuangt = $('.setBg .zhuangt').val() == '公开' ? 1 : 0
        var label = [];
        for (var i = 0; i < $('.lab b').length; i++) {
            if ($('.lab b').eq(i).attr("data-id")) {
                label.push($('.lab b').eq(i).attr("data-id"))
            }
        }
        var abs = $('.setBg .set_abstrac').val()
            // console.log(id, way, classify, name, lei, zhuangt, label, abs)
        if (classify == 'buydata' || classify == 'updata') {
            var type = '数据'
        } else if (classify == 'buyalg' || classify == 'myalg') {
            var type = '算法'
        } else if (classify == 'addscene' || classify == 'myscene') {
            var type = '场景'
        }
        if ($('.zhuangt').val() == '公开') {
            if (name == '' || abs == '' || (label.length == 0 && custom.length == 0)) {
                $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: '若要公开' + type + ',请完善基本信息', setTime: 2000 });
            } else {
                bcSet(type, id, way, name, lei, zhuangt, label, abs, custom)
            }
        } else {
            bcSet(type, id, way, name, lei, zhuangt, label, abs, custom)
        }
    })

    function bcSet(type, id, way, name, lei, zhuangt, label, abs, custom) {
        if (type == '数据') {
            $.ajax({
                url: url_ip + '/personal/data_share/',
                type: 'POST',
                data: {
                    data_id: id,
                    abstract: abs,
                    name: name,
                    label: JSON.stringify(label),
                    custom: JSON.stringify(custom),
                    classify: lei,
                    is_share: zhuangt
                },
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(data) {
                    if (data.status) {
                        $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: data.msg, setTime: 2000 });
                        $('.setBg').hide()
                        setTimeout(function() {
                            window.location.reload(); //页面刷新
                        }, 1000);
                    } else {
                        $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: data.msg, setTime: 2000 });
                    }
                },
                error: function(err) {
                    i_isGoLogin(err);
                }
            })
        } else if (type == '算法') {
            var json = {}
            if (way == 'pass') {
                json.alg_id = id
                json.alg2_id = ''
            } else {
                json.alg_id = ''
                json.alg2_id = id
            }
            json.name = name;
            json.abstract = abs;
            json.label = JSON.stringify(label);
            json.custom = JSON.stringify(custom);
            json.classify = lei;
            json.is_share = zhuangt;
            json.levellabel = $('.levellabel').val();
            $.ajax({
                url: url_ip + '/personal/alg_share/',
                type: 'POST',
                data: json,
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(data) {
                    if (data.status) {
                        $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: data.msg, setTime: 2000 });
                        $('.setBg').hide()
                        setTimeout(function() {
                            window.location.reload(); //页面刷新
                        }, 1000);
                    } else {
                        $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: data.msg, setTime: 2000 });
                    }
                },
                error: function(err) {
                    i_isGoLogin(err);
                }
            })
        } else if (type == '场景') {
            var json = {}
            if (way == 'new') {
                json.scene_id = id
                json.model_id = ''
            } else {
                json.scene_id = ''
                json.model_id = id
            }
            json.name = name;
            json.abstract = abs;
            json.label = JSON.stringify(label);
            json.custom = JSON.stringify(custom);
            json.classify = lei;
            json.is_share = zhuangt;
            $.ajax({
                url: url_ip + '/personal/scene_share/',
                type: 'POST',
                data: json,
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: data.msg, setTime: 2000 });
                        $('.setBg').hide()
                        setTimeout(function() {
                            window.location.reload(); //页面刷新
                        }, 1000);
                    } else {
                        $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: data.msg, setTime: 2000 });
                    }
                },
                error: function(err) {
                    i_isGoLogin(err);
                }
            })
        }
    }
    /*课程介绍*/
    $('.suggest').live('click', function() {
            var id = $(this).parent().parent().attr('data-id')
            window.open('xssy_detail.html?' + id)
        })
        /*开始学习*/
    $('.study').live('mousedown', function() {
            var id = $(this).parent().parent().attr('data-mid')
            var that = $(this)
            $.ajax({
                url: url_ip + "/chaox/",
                type: "GET",
                data: { course_id: id },
                dataType: "json",
                headers: { "Authorization": token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        that.attr('href', 'http://chinacpda.fanya.chaoxing.com/sso/login3?uid=' + data.uid + '&d=' + data.d + '&backurl=' + 'http://mooc1.chaoxing.com/course/' + data.cxid + '.html')
                    }
                },
                error: function(err) {
                    i_isGoLogin(err);
                }
            })
        })
        /*关注*/
    $('.follow').live('click', function() {
        var nowpage = $(this).parents('ol').nextAll('.Page').children('dl').attr('data-nowpage') || 1
        var pagenum = $(this).parents('ol').parent().attr('data-num')
        var classify = $(this).parents('ol').parent().attr('data-type')
        var id = $(this).parent().attr('data-id')
        $.ajax({
            type: "GET",
            url: url_ip + "/personal/add_focus",
            data: { file_user_id: id },
            dataType: "json",
            headers: { "Authorization": token },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    XrData(nowpage, pagenum, classify)
                }
            },
            error: function(err) {
                i_isGoLogin(err);
            }
        })
    })
    $('.followed').live('mouseenter', function() {
        $(this).css('background', '#496FFF')
        $(this).html('取消关注')
    })
    $('.followed').live('mouseleave', function() {
        $(this).css('background', '#999')
        $(this).html('已关注')
    })
    $('.followed').live('click', function() {
            var nowpage = $(this).parents('ol').nextAll('.Page').children('dl').attr('data-nowpage') || 1
            var pagenum = $(this).parents('ol').parent().attr('data-num')
            var classify = $(this).parents('ol').parent().attr('data-type')
            $.ajax({
                type: "POST",
                url: url_ip + "/personal/delete_focus",
                data: { relation_id: $(this).attr('data-id') },
                dataType: "json",
                headers: { "Authorization": token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        XrData(nowpage, pagenum, classify)
                    }
                },
                error: function(err) {
                    i_isGoLogin(err);
                }
            })
        })
        /**
         * lkw
         * 2019-03-12
         * JIRA
         * 右上角 '粉丝'-'关注'
         * 添加点击定位
         */
    $('.iHandle div').on('click', function() {
        $('#iNav li[data-type="focus"]').click();
        if ($(this).attr('data-type') == 'fans') {
            $('#icontxt .icenter>div ul li[data-to="fansBox"]').click();
        } else {
            $('#icontxt .icenter>div ul li[data-to="focusBoX"]').click();
        }
    });
    // 标签删除
    $(".bq_del").live("click", function() {
        $(this).parent("b").remove();
    })
})