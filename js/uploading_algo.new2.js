// 上传文件
function handleFile() {
    $('#upFileName').val($('#upFile')[0].files[0].name)
    console.log($('#upFile')[0].files[0].name)
    if($('#upFile')[0].files[0].name) {
        $('.upload_sure').removeClass('disabled')
    }
}
var algAll_page = 0;
// var sf_or_sjListUrl = '/examine/useralgo/';
var sf_or_sjListUrl = '/examine/getuseralgo/';
var _newDatas = [{
    name: 'SVM算法',
    id: 179
}, {
    name: 'winter指数平滑算法',
    id: 180
}, {
    name: '主成分分析算法',
    id: 181
}, {
    name: '余弦相似度算法',
    id: 182
}, {
    name: '关联分析算法',
    id: 183
}, {
    name: '相关系数矩阵',
    id: 94
}, {
    name: 'BP神经网络算法',
    id: 158
}, {
    name: 'CNN算法',
    id: 161
}, {
    name: 'K-means算法',
    id: 170
}, {
    name: '因子分析算法',
    id: 187
}, {
    name: '岭回归算法',
    id: 194
}, {
    name: '朴素贝叶斯算法',
    id: 199
}, ]
var adopt_arr = ['未通过', '已通过', '审核中', '未提交'];
/*分页*/
// function pageJudgeFn(all_page, now_page, fooClass) {
//     $(fooClass).find('.all_page').text(all_page)
//     if (all_page > 1) {
//         $(fooClass).show();
//         $(fooClass + ' ul').html('');
//         if (all_page <= 5) { //隐藏点
//             $(fooClass).children('.left_dian,.last_dian').hide();
//             for (var i = 1; i <= all_page; i++) {
//                 $(fooClass + ' ul').append('<li class="" data-num="' + i + '">' + i + '</li>');
//             }
//         } else { //总页数大于5
//             if (now_page <= 3) { //1-3显示前5页, 隐藏之前'...';
//                 $('.left_dian').hide();
//                 $('.last_dian').show();
//                 for (var i = 1; i <= 5; i++) {
//                     $(fooClass + ' ul').append('<li class="" data-num="' + i + '">' + i + '</li>');
//                 }
//             } else if (now_page > 3 && now_page <= (all_page - 3)) { //3之后,倒数后3之前显示 n-2 ~ n+2页, 显示'...'
//                 $(fooClass).children('.left_dian,.last_dian').show();
//                 for (var i = (now_page - 2); i <= (now_page + 2); i++) {
//                     $(fooClass + ' ul').append('<li class="" data-num="' + i + '">' + i + '</li>');
//                 }
//             } else { //后3 显示后5页, 隐藏之后'...'
//                 $('.left_dian').show();
//                 $('.last_dian').hide();
//                 for (var i = (all_page - 5 + 1); i <= all_page; i++) {
//                     $(fooClass + ' ul').append('<li class="" data-num="' + i + '">' + i + '</li>');
//                 }
//             }
//         }
//         $(fooClass + ' ul li[data-num=' + now_page + ']').addClass('now_page').siblings().removeClass('now_page');
//         if (now_page == 1 && now_page != all_page) {
//             $(fooClass).find('.next_page img').attr('src', 'img/weiyou.png'); //yes
//             $(fooClass).find('.pre_page img').attr('src', 'img/buzuo.png'); //no
//         } else if (now_page == all_page && now_page != 1) {
//             $(fooClass).find('.pre_page img').attr('src', 'img/weizuo.png'); //yes
//             $(fooClass).find('.next_page img').attr('src', 'img/buyou.png'); //no
//         } else {
//             $(fooClass).find('.pre_page img').attr('src', 'img/weizuo.png'); //yes
//             $(fooClass).find('.next_page img').attr('src', 'img/weiyou.png'); //yes
//         }
//     } else {
//         $(fooClass).hide();
//     }
// }
// 横线滚屏数据
// function ScrollImgLeftDataFn() {
//     var _newHtml = '';
//     for (var i = 0; i < _newDatas.length; i++) {
//         _newHtml += '<li data-id="' + _newDatas[i].id + '"><a href="javascript:;">' + _newDatas[i].name + '</a></li>'
//     }
//     $('.newRecent #scroll_begin ul').html(_newHtml);
//     ScrollImgLeft();
// }
// 横向滚屏
function ScrollImgLeft() {
    var speed = 15;
    var scroll_begin = document.getElementById("scroll_begin");
    var scroll_end = document.getElementById("scroll_end");
    var scroll_div = document.getElementById("scroll_div");
    scroll_end.innerHTML = scroll_begin.innerHTML;

    function Marquee() {
        if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0) {
            scroll_div.scrollLeft -= scroll_begin.offsetWidth;
        } else {
            scroll_div.scrollLeft++;
        }
    }
    var MyMar = setInterval(Marquee, speed);
    scroll_div.onmouseover = function() {
        clearInterval(MyMar);
    }
    scroll_div.onmouseout = function() {
        clearInterval(MyMar);
        MyMar = setInterval(Marquee, speed);
    }
}
// 我的算法列表封装-大小图切换-弃用
function alg_listFn2(page) {
    $('.algList_loadGif').show();
    var keyword = $('.alg_listSech input').val() || '';
    $('.alg_listCont').html('');
    $.ajax({
        async: false,
        type: "GET",
        url: url_ip + sf_or_sjListUrl,
        data: {
            page: page,
            keyword: keyword
        },
        dataType: "json",
        headers: {
            'Authorization': token
        },
        success: function(res) {
            // console.log(res)
            if (res.status) {
                if (res.data.length == 0) {
                    $('.alg_listCont').html('<div style="font-size: 18px;color: #000;">' +
                        '很抱歉, 没有找到与 "<span style="color: #c00">' + keyword + '</span>" 相关的数据<br />' +
                        '<h4 style="line-height: 28px;font-size: 13px;color: #666;">温馨提示: </h4>' +
                        '<p style="line-height: 28px;padding-left: 30px;font-size:13px;font-family: "宋体";color: #333;">1. 请更换关键字试试;</p>' +
                        '<p style="line-height: 28px;padding-left: 30px;font-size:13px;font-family: "宋体";color: #333;">2. 如有任何需求, 请<a href="feedback.html" style="color: #00c;">反馈给我们</a>;</p>' +
                        '</div>');
                } else {
                    for (var i = 0; i < res.data.length; i++) {
                        var spanHtml = '';
                        if (res.data[i].label.length == 0) {
                            spanHtml = '<span>暂无标签</span>'
                        } else {
                            for (j = 0; j < res.data[i].label.length; j++) {
                                spanHtml += '<span>' + res.data[i].label[j] + '</span>'
                            }
                        }
                        var abstractTxt = res.data[i].abstractTxt ? res.data[i].abstractTxt : '暂无描述';

                        var oHtml = '<li data-id="' + res.data[i].id + '" data-where="' + res.data[i].where + '">' +
                            '<div class="alg_listShow relative">' +
                            '<div class="imgFoo"><img src="' + res.data[i].cover + '" width="100%" alt=""></div>' +
                            '<div>' +
                            '<h3><span>' + (res.data[i].file_name || "--") + '<br /><i>' + res.data[i].user_name + '</i></span><b>免费</b></h3>' +
                            '<p>' + spanHtml + '</p>' +
                            '<h4>' +
                            '<span class="view"><i></i>' + res.data[i].view_num + '</span>' +
                            '<span class="msg"><i></i>' + res.data[i].comment_num + '</span>' +
                            '<span class="praise"><i></i>' + res.data[i].thumb_num + '</span>' +
                            '</h4>' +
                            '</div>' +
                            // '<i class="addSn" title="添加到收纳"></i>'+
                            '</div>' +
                            '<div class="slideHide">' +
                            // '<i class="addSn" title="添加到收纳"></i>'+
                            '<h5>' + abstractTxt + '</h5>' +
                            '</div>' +
                            '</li>'
                        $('.alg_listCont').append(oHtml);
                    }
                }
                algAll_page = Math.ceil(res.sum / 18);
                // pageJudgeFn(algAll_page, page, '.alg_listPag');
            }
        },
        error: function(err) {
            if (err && err.status == 401) {
                $('.alg_listCont').html('<div>登陆以后查看您上传的算法</div>')
            }
        },
        complete: function() {
            $('.algList_loadGif').hide();
        }
    })
}
$(function() {
    // 获取参数判断
    var needParam = GetQueryString('cm');
    if (needParam == 'sf') {
        // 算法-数据列表
        // sf_or_sjListUrl = '/examine/useralgo/';
        sf_or_sjListUrl = '/examine/getuseralgo/'
    } else if (needParam == 'cj') {

    } else if (needParam == 'mx') {

    }


    $('.algRankCont').on('click', '.algRankCont_top i.slideDown', function() {
        $(this).closest('li').siblings().removeClass('active');
        if ($(this).parent('.algRankCont_top').next('.slideCont').is(":hidden")) {
            $(this).closest('li').addClass('active');
        } else {
            $(this).closest('li').removeClass('active');
        }

        $(this).closest('li').siblings('li').children('.slideCont').stop().slideUp(200);
        $(this).parent('.algRankCont_top').next().stop().slideToggle(200);
    })

    // ScrollImgLeftDataFn();

    // 算例排行榜
    $.ajax({
            url: url_ip + '/push/IndexRanking/',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(res) {
                // console.log(res)
                if (res.status) {
                    $('.algo_rank p').html('');
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].type == 'algo_rank') {
                            $('.newRecentFoo .algo_rank').append('<span data-id="' + res.data[i].id + '">' + res.data[i].name + '</span>')
                        }
                    }
                }
            },
            error: function(data) {
                // console.log(data)
            }
        })
        // 算例排行榜点击
    $('.newRecentFoo .algo_rank').on('click', 'span', function() {
            var algo_id = $(this).attr('data-id');
            sessionStorage.setItem("data_algo", 'algo');
            sessionStorage.setItem("form", 'index');
            window.location.href = 'details.html?' + algo_id;
        })
        //横向滚屏点击
    // $('.newRecent ul').on('click', 'li', function() {
    //     var algo_id = $(this).attr('data-id');
    //     sessionStorage.setItem("data_algo", 'algo');
    //     sessionStorage.setItem("form", 'index');
    //     window.location.href = 'details.html?' + algo_id;
    // })

    // 算法-场景列表
    MyScenes("");
    alg_listFn("");

    // 我的算法列表封装
    function alg_listFn(keyword) {
        $('.algList_loadGif').show();
        $.ajax({
            type: "GET",
            url: url_ip + sf_or_sjListUrl,
            data: {
                keyword: keyword
            },
            dataType: "json",
            headers: {
                'Authorization': token
            },
            success: function(res) {
                // console.log(res)
                if (res.status) {
                    $('.alg_listCont').empty();
                    if (res.data.length <= 0) {
                        $('.alg_listCont').html('<div class="null_data"><img src="img/empty1.png" alt=""><span>您还没有上传过算法</span></div>');
                        $(".page").hide();
                    } else {
                        $(".page").show();
                        var oHtml = '';
                        for (var i = 0; i < res.data.length; i++) {
                            oHtml += '<li>' +
                                '<p class="up_name">' +
                                '<img src="' + res.data[i].img + '"><span>' + res.data[i].name + '</span>' +
                                '</p>' +
                                '<p class="up_type">' + res.data[i].is_share + '</p>' +
                                '<p class="up_date">' + res.data[i].add_time.substr(0, res.data[i].add_time.indexOf(' ')) + '</p>' +
                                '<p class="up_operate" data-adopt="' + res.data[i].adopt + '" data-id="' + res.data[i].id + '">' +
                                '<span data-item="look">查看</span>' +
                                '<span data-item="del">删除</span>' +
                                '</p>' +
                                '<p class="up_state status' + res.data[i].adopt + '"><span>' + adopt_arr[res.data[i].adopt] + '</span></p>' +
                                '</li>'
                        }
                        $('.alg_listCont').append(oHtml);
                    }
                    // algAll_page = Math.ceil(res.sum / 18);
                    // pageJudgeFn(algAll_page, page, '.alg_listPag');
                    P.initMathod({
                        params: {
                            elemId: "#Page",
                            pageIndex: '1',
                            total: res.nums,
                            pageNum: '5',
                            pageSize: '10'
                        },
                        requestFunction: function() {
                            $(".alg_listCont>li").show();
                            $(".alg_listCont>li").eq((P.config.pageIndex - 1) * 10).prevAll().hide();
                            $(".alg_listCont>li").eq((P.config.pageIndex * 10) - 1).nextAll().hide();
                        }
                    });
                } else {
                    $('.alg_listCont').html('<div style="font-size: 18px;color: #000;">' +
                        '很抱歉, 没有找到与 "<span style="color: #c00">' + keyword + '</span>" 相关的数据<br />' +
                        '<h4 style="line-height: 28px;font-size: 13px;color: #666;">温馨提示: </h4>' +
                        '<p style="line-height: 28px;padding-left: 30px;font-size:13px;font-family: "宋体";color: #333;">1. 请更换关键字试试;</p>' +
                        '<p style="line-height: 28px;padding-left: 30px;font-size:13px;font-family: "宋体";color: #333;">2. 如有任何需求, 请<a href="feedback.html" style="color: #00c;">反馈给我们</a>;</p>' +
                        '</div>');
                }
            },
            error: function(err) {
                if (err && err.status == 401) {
                    $('.alg_listCont').html('<div>登陆以后查看您上传的算法</div>')
                }
            },
            complete: function() {
                $('.algList_loadGif').hide();
            }
        })
    }
    // 我的场景列表封装
    function MyScenes(keyword) {
        $.ajax({
            type: "GET",
            url: url_ip + "/personal/senceshow/",
            data: {
                keyword: keyword
            },
            dataType: "json",
            headers: {
                'Authorization': token
            },
            success: function(res) {
                // console.log(res);
                if (res.status) {
                    $('.alg_listCont2').empty();
                    if (res.data.length <= 0) {
                        $('.alg_listCont2').html('<div class="null_data"><img src="img/empty1.png" alt=""><span>您还没有上传过场景<a style="color: blue" href="hmodel2.html">去上传</a></span></div>');
                        $(".page2").hide();
                    } else {
                        $(".page2").show();
                        var oHtml = '';
                        for (var i = 0; i < res.data.length; i++) {
                            var lic_method;
                            if (res.data[i].is_share == 0) {
                                lic_method = "公开";
                            } else {
                                lic_method = "私有";
                            }
                            oHtml += '<li data_id="' + res.data[i].objid + '">' +
                                '<p class="up_name">' +
                                '<span>' + res.data[i].name + '</span>' +
                                '</p>' +
                                '<p class="up_type">' + lic_method + '</p>' +
                                '<p class="up_date">' + res.data[i].time + '</p>' +
                                '<p class="up_operate" data-id="' + res.data[i].id + '">' +
                                '<span class="look2" data-item="look">查看</span>' +
                                '<span class="delete2" data-item="del">删除</span>' +
                                '</p>' +
                                // '<p class="up_state status' + res.data[i].adopt + '"><span>' + adopt_arr[res.data[i].adopt] + '</span></p>' +
                                '</li>'
                        }
                        $('.alg_listCont2').append(oHtml);
                    }
                    P.initMathod({
                        params: {
                            elemId: "#Page2",
                            pageIndex: '1',
                            total: res.nums,
                            pageNum: '5',
                            pageSize: '10'
                        },
                        requestFunction: function() {
                            $(".alg_listCont2>li").show();
                            $(".alg_listCont2>li").eq((P.config.pageIndex - 1) * 10).prevAll().hide();
                            $(".alg_listCont2>li").eq((P.config.pageIndex * 10) - 1).nextAll().hide();
                        }
                    });
                } else {
                    $('.alg_listCont2').html('<div style="font-size: 18px;color: #000;">' +
                        '很抱歉, 没有找到与 "<span style="color: #c00">' + keyword + '</span>" 相关的数据<br />' +
                        '<h4 style="line-height: 28px;font-size: 13px;color: #666;">温馨提示: </h4>' +
                        '<p style="line-height: 28px;padding-left: 30px;font-size:13px;font-family: "宋体";color: #333;">1. 请更换关键字试试;</p>' +
                        '<p style="line-height: 28px;padding-left: 30px;font-size:13px;font-family: "宋体";color: #333;">2. 如有任何需求, 请<a href="feedback.html" style="color: #00c;">反馈给我们</a>;</p>' +
                        '</div>');
                }
            },
            error: function(err) {
                console.log(err.status)
                if (err && err.status == 401) {
                    $('.alg_listCont2').html('<div>登陆以后查看您上传的算法</div>')
                }
            }
        });
    }
    // 我的场景查看
    $(".alg_listCont2").on("click", ".look2", function() {
        var obj_id = $(this).parents("li").attr("data_id");
        var obj_name = $(this).parents("li").find("p:first>span").text();
        window.location.href = "hmodel2.html?obj_id=" + obj_id + "&obj_name=" + obj_name;
    });
    // 我的场景删除
    $(".alg_listCont2").on("click", ".delete2", function() {
        delConfirm()
        .then(() => {
            var obj_id = $(this).parents("li").attr("data_id");
            $.ajax({
                url: url_ip + '/model/chuanimg/',
                type: 'delete',
                data: {
                    scene_id: obj_id
                },
                dataType: 'json',
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        MyScenes("");
                    }
                }
            })
        }, function() {
            return;
        })
    });
    // 算法-场景切换
    $('.alg_list h2').on('click', 'span', function() {
        var nowType = $(this).attr('data-type');
        if (nowType == 'cj') {
            $(this).addClass('active').siblings().removeClass('active');
            $(".alg_list_sf").hide();
            $(".alg_list_cj").show();
            MyScenes("");
            $('html,body').animate({
                scrollTop: $('.alg_list').offset().top
            });
        } else {
            $(this).addClass('active').siblings().removeClass('active');
            if (nowType == 'sf') {
                $(".alg_list_sf").show();
                $(".alg_list_cj").hide();
                $('.alg_listTap li').removeClass('active');
                $('.alg_listSech input').val('');
                // sf_or_sjListUrl = '/examine/useralgo/';
                sf_or_sjListUrl = '/examine/getuseralgo/';
            } else if (nowType == 'sj') {
                sf_or_sjListUrl = '/files/';
            }
            alg_listFn("");
            $('html,body').animate({
                scrollTop: $('.alg_list').offset().top
            });
        }
    })


    // 大图小图
    $('.modeSwitch').on('click', 'i', function() {
            $(this).addClass('active').siblings().removeClass('active');
            $('.slideHide').attr('style', '')
            var nowType = $(this).attr('data-type');
            if (nowType == 'min') {
                $('.alg_listCont').addClass('alg_listContMin').removeClass('alg_listContMax');
            } else if (nowType == 'max') {
                $('.alg_listCont').addClass('alg_listContMax').removeClass('alg_listContMin');
            }
        })
        // 大图标-列表样式
    $('.alg_list').on('mouseenter', '.alg_listContMax li', function() {
        $(this).children('.slideHide').stop().animate({
            left: 0
        }, 200);
    })
    $('.alg_list').on('mouseleave', '.alg_listContMax li', function() {
            $(this).children('.slideHide').stop().animate({
                left: '-192.8px'
            }, 200);
        })
        // 小图标-列表样式
    $('.alg_list').on('mouseenter', '.alg_listContMin li', function() {
        $(this).children('.slideHide').stop().slideDown(200);
    })
    $('.alg_list').on('mouseleave', '.alg_listContMin li', function() {
        $(this).children('.slideHide').stop().slideUp(200);
    })

    // 算法-数据tab点击
    $('.alg_listTap').on('click', 'li', function() {
        $(this).toggleClass('active');
        alg_listFn("");
        $('html,body').animate({
            scrollTop: $('.alg_list').offset().top
        })
    })

    //输入框搜索
    $('.alg_listSech input').on('keyup', function(e) {
        if ($(this).val() != '' && $.trim($(this).val()).length != 0) {
            var e = e || window.event;
            var keywords = $(".alg_listSech>input").val();
            if (e.keyCode == "13") {
                if ($(".alg_list>h2>span.active").text() == "已上传算法") {
                    alg_listFn(keywords);
                } else {
                    MyScenes(keywords);
                }
                $(this).val('');
                $('html,body').animate({
                    scrollTop: $('.alg_list').offset().top
                })
            }
        }
    })
    $('.alg_listSech').on('click', 'i', function() {
            if ($(this).prev('input').val() != '' && $.trim($(this).prev('input').val()).length != 0) {
                var keywords = $(".alg_listSech>input").val();
                if ($(".alg_list>h2>span.active").text() == "已上传算法") {
                    alg_listFn(keywords);
                } else {
                    MyScenes(keywords);
                }
                $(this).prev('input').val('');
                $('html,body').animate({
                    scrollTop: $('.alg_list').offset().top
                })
            }
        })
        //     //点击页数
        // $('.alg_listPag').on('click', 'li', function() {
        //         var page = $(this).attr('data-num') - 0;
        //         alg_listFn(page);
        //         $('html,body').animate({
        //             scrollTop: $('.alg_list').offset().top
        //         })
        //     })
        //     //上一页
        // $('.alg_listPag').on('click', '.pre_page', function() {
        //         var page = $('.alg_listPag').find('li.now_page').attr('data-num') - 1;
        //         alg_listFn(page);
        //         $('html,body').animate({
        //             scrollTop: $('.alg_list').offset().top
        //         })
        //     })
        //     //下一页
        // $('.alg_listPag').on('click', '.next_page', function() {
        //         var page = $('.alg_listPag').find('li.now_page').attr('data-num') - 0 + 1;
        //         if (page >= algAll_page + 1) {
        //             return;
        //         }
        //         alg_listFn(page);
        //         $('html,body').animate({
        //             scrollTop: $('.alg_list').offset().top
        //         })
        //     })
        //     //页码搜索
        // $('.alg_listPag').on('click', '.to_page', function() {
        //     var page = $('.alg_listPag').find('.will_page').val() - 0;
        //     if (page > algAll_page) {
        //         return;
        //     }
        //     if (page >= 1 && page <= algAll_page) {
        //         alg_listFn(page);
        //     }
        //     $('html,body').animate({
        //         scrollTop: $('.alg_list').offset().top
        //     })
        // })

    // 点击进入详情页
    $('.alg_listContMin').on('click', 'img, h3', function() {
        return;
        var algo_id = $(this).closest('li').attr('data-id');
        if (sf_or_sjListUrl == '/files/') { //数据
            var where_id = $(this).closest('li').attr('data-where');
            sessionStorage.setItem("data_algo", 'data');
            sessionStorage.setItem("data_id", data_id);
            sessionStorage.setItem("where_id", where_id);
        } else {
            sessionStorage.setItem("data_algo", 'algo');
            sessionStorage.setItem("form", 'index');
        }
        window.location.href = 'details.html?' + algo_id;
    })
    $('.alg_listContMax .slideHide h5').live('click', function() {
            return;
            var algo_id = $(this).closest('li').attr('data-id');
            if (sf_or_sjListUrl == '/files/') { //数据
                var where_id = $(this).closest('li').attr('data-where');
                sessionStorage.setItem("data_algo", 'data');
                sessionStorage.setItem("data_id", algo_id);
                sessionStorage.setItem("where_id", where_id);
            } else {
                sessionStorage.setItem("data_algo", 'algo');
                sessionStorage.setItem("form", 'index');
            }
            window.location.href = 'details.html?' + algo_id;
        })
        //算法列表-查看-删除
    $('.alg_listCont').on('click', '.up_operate span', function() {
        var sf_name = $(this).parents("li").children("p:first").children("span").text();
        var nowId = $(this).parent().attr('data-id');
        var nowAdopt = $(this).parent().attr('data-adopt');
        var nowItem = $(this).attr('data-item');
        var sf_type2;
        switch (nowAdopt) {
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
        if (nowItem == 'look') {
            limit('算法自建')
                .then(res => {
                    if (res) {
                        window.location.href = 'python3/python_online.html?' + nowAdopt + '&' + nowId;
                    }
                })
        } else if (nowItem == 'del') {
            if (confirm('算法删除后无法进行恢复,您确定要删除此算法吗？')) {
                $.ajax({
                    type: "GET",
                    url: url_ip + "/examine/delete_func",
                    data: {
                        algoname: sf_name,
                        id: nowId,
                        type: sf_type2
                    },
                    dataType: "json",
                    headers: {
                        "Authorization": token
                    },
                    success: function(res) {
                        // console.log(res);
                        if (res.status) {
                            alg_listFn("");
                        }
                    }
                });
            }
        }
    });

    // 点击新建模板判断进入自建算法
    var url = window.location.search;
    if (getString(url) == "xjmb") {
        $(".creat_new").click();
    }

    function getString(str) {
        let str1 = str.slice(1, str.length);
        let str2 = str1.split('&');
        let strArr = [];
        str2.forEach(element => {
            let str3 = element.split('=')
            let a = {
                [str3[0]]: str3[1]
            };
            strArr.push(a);
        });
        if (strArr[1]) {
            if (strArr[1].cf) {
                return strArr[1].cf;
            }
        }
    }
})