// var token = "JWT " + window.sessionStorage.token;

var head_td_col = 0;
//要展示的数据是修改以后的数据
var isChangeTab = 0;
// console.log(token);
// console.log(url_ip);

//表格页数
var tabNum = 0;

function calculater() {
    // var yclL_bH1 = $(window).height() - $('nav').outerHeight(true) - $('.ycl_banner').outerHeight(true) - $('.yclL_t').outerHeight(true) - 10;
    var yclL_bH1 = $(window).height() - $('nav').outerHeight() - $('.ycl_banner').outerHeight(true) - 10 + 90; //考虑导航和banner重合部分
    var winH_ = $(window).height();

    $('.yclL_b').css({
        'maxHeight': yclL_bH1,
        overflowY: 'scroll'
    });
    var yclR_cTabH = $('.yclL_b').outerHeight(true) - $('.yclR_c').outerHeight(true) - $('.yclR_c .ycl_page').outerHeight(true) - 20;
    if (yclR_cTabH < winH_) {
        $('.yclR_b .tab2').css({
            'minHeight': yclR_cTabH
        })
    } else {
        $('.yclR_b .tab2').css({
            'minHeight': winH_
        })
    }

}

function ajaxFn(url, obj, type) {
    // var tipTxt = '<div class="loading_lkw" style="width: 35px;height: 35px;margin: 0 auto;"><img src="img/loading.gif" width="100%" height="100%"><div>'
    $('.mu_ycl,.loading_lkw').show();
    var type = type || 'get';
    var ajaxRes = '';
    $.ajax({
        type: type,
        url: url_ip + url,
        async: false,
        cache: false,
        data: obj,
        datatype: 'json',
        headers: {
            "Authorization": token
        },
        success: function(res) {
            ajaxRes = res;
            tipDiV = '';
            setTimeout(function() {
                $('.mu_ycl,.loading_lkw').hide();
            }, 500)
        },
        error: function(err) {
            $('.mu_ycl,.loading_lkw').hide();
            console.log(err)
                // tipDiV = '<div class="loading_lkw cOrange" style="">服务器正在维护, 请稍后重试<div>';
            tipDiV = err;
            if (err.status == 401) {
                if (token == 'JWT undefined' || token == 'JWT null') {
                    $('.shade p').html('您目前还没有注册或登录~ ')
                    $('.shade').show();
                } else {
                    $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                    $('.shade').show();
                }
            } else {
                ycl_tipPage()
            }
        }
    })
    var returnData = {
        ajaxRes: ajaxRes,
        tipDiV: tipDiV
    }
    return returnData;
}

//分页判断
function pageJudgeFnNew(all_page, now_page, fooClass) {
    $(fooClass + ' .all_page').text(all_page);
    //首先判断按钮类型
    if (all_page > 1) {
        $(fooClass).show();
        $(fooClass + ' ul').html('');
        if (all_page <= 5) { //隐藏点
            $(fooClass).children('.left_dian,.last_dian').hide();
            for (var i = 1; i <= all_page; i++) {
                $(fooClass + ' ul').append('<li class="pageClickDiv" data-num="' + i + '">' + i + '</li>');
            }
        } else { //总页数大于5
            if (now_page <= 3) { //1-3显示前5页, 隐藏之前'...';
                $('.left_dian').hide();
                $('.last_dian').show();
                for (var i = 1; i <= 5; i++) {
                    $(fooClass + ' ul').append('<li class="pageClickDiv" data-num="' + i + '">' + i + '</li>');
                }
            } else if (now_page > 3 && now_page <= (all_page - 3)) { //3之后,倒数后3之前显示 n-2 ~ n+2页, 显示'...'
                $(fooClass).children('.left_dian,.last_dian').show();
                for (var i = (now_page - 2); i <= (now_page + 2); i++) {
                    $(fooClass + ' ul').append('<li class="pageClickDiv" data-num="' + i + '">' + i + '</li>');
                }
            } else { //后3 显示后5页, 隐藏之后'...'
                $('.left_dian').show();
                $('.last_dian').hide();
                for (var i = (all_page - 5 + 1); i <= all_page; i++) {
                    $(fooClass + ' ul').append('<li class="pageClickDiv" data-num="' + i + '">' + i + '</li>');
                }
            }
        }
        $(fooClass + ' ul li[data-num=' + now_page + ']').addClass('now_page').siblings().removeClass('now_page');

        if (now_page == 1 && now_page != all_page) {
            $(fooClass).find('.next_page img').attr('src', 'img/weiyou.png'); //yes
            $(fooClass).find('.pre_page img').attr('src', 'img/buzuo.png'); //no
        } else if (now_page == all_page && now_page != 1) {
            $(fooClass).find('.pre_page img').attr('src', 'img/weizuo.png'); //yes
            $(fooClass).find('.next_page img').attr('src', 'img/buyou.png'); //no
        } else {
            $(fooClass).find('.pre_page img').attr('src', 'img/weizuo.png'); //yes
            $(fooClass).find('.next_page img').attr('src', 'img/weiyou.png'); //yes
        }
    } else {
        $(fooClass).hide();
    }

}
//分页参数调用及重新渲染页面
function table_pageFn(now_pageP) {
    var obj = {};
    var fileNum = 0;
    var titleArr = [];
    for (var i = 0; i < $('.yclR_c .inputP').length; i++) {
        if ($('.yclR_c .inputP').eq(i).children('input').val() != '') {
            fileNum += 1;
        }
    }
    if (fileNum == 1) {
        obj = {
            num: now_pageP,
            click_file: $('.yclR_c .inputP').eq(0).children('input').attr('data-id')
        };
    } else if (fileNum == 2) {
        if (isChangeTab == 1) {
            obj.title1 = 'aa';
            obj.title2 = 'bb';
        } else {
            obj.title1 = $('.ylcR_cCont .flowChart[data-item="2"]').find('.selL').val();
            obj.title2 = $('.ylcR_cCont .flowChart[data-item="2"]').find('.selR').val();
        }
        obj.num = now_pageP;
        obj.file_num = fileNum - 0;
        obj.type = $('.ylcR_cCont .flowChart[data-item="2"]').find('.flowChartSlide ul li span.cBlue').attr('data-name');
        obj.click_file = $('.ylcR_cCont .inputP[data-item="1"]').children('input').attr('data-id');
        obj.click_file2 = $('.ylcR_cCont .inputP[data-item="2"]').children('input').attr('data-id');
    }
    var ajaxDataHead2 = ajaxFn('/dispose/detail/', obj, 'GET');
    if (ajaxDataHead2.tipDiV == '' || ajaxDataHead2.tipDiV == undefined) {
        if (ajaxDataHead2.ajaxRes.status) {
            pageTab(ajaxDataHead2);
            pageJudgeFnNew(tabNum, now_pageP, '.tab_paging');
        }
        ycl_tipPage(ajaxDataHead2.ajaxRes.msg)
    } else {
        ycl_tipPage();
    }
}
//右侧顶部提示信息页
function ycl_tipPage(ycl_tipTxt) {
    var ycl_tipTxt = ycl_tipTxt ||
        '发现了一个未知错误, 请<a href="feedback.html" class="cBlue" style="text-decoration: underline">联系我们</a>';
    var nowDate = new Date();
    var nowH = nowDate.getHours();
    var nowM = nowDate.getMinutes();
    var nowS = nowDate.getSeconds();
    nowH = nowH < 10 ? '0' + nowH : nowH;
    nowM = nowM < 10 ? '0' + nowM : nowM;
    nowS = nowS < 10 ? '0' + nowS : nowS;
    var nowTime = nowH + ': ' + nowM + ': ' + nowS
    $('.ycl_tipAjax').append('<p><span>' + nowTime + '</span>' + ycl_tipTxt + '</p>');
    $('.ycl_tipAjax').scrollTop($('.ycl_tipAjax')[0].scrollHeight); //默认滚动到最底部
}
//左侧列表page
function pageL(ajaxData) {
    if (ajaxData.tipDiV.status == 401) {
        $('.ajaxDivL').html('请先登录');
        $('.shade').show();
    } else {
        $('.ajaxDivL').html('');
    }
    $(ajaxData.ajaxRes.data).each(function(i, ele) {
        for (var key in ele) {
            $('.ajaxDivL').append('<li data-id="' + ele[key] + '">' + key + '</li>')
        }
    })
    calculater();
}
//右侧表格
function pageTab(ajaxDataHead2) {
    if (ajaxDataHead2.ajaxRes.amount) {
        tabNum = ajaxDataHead2.ajaxRes.amount;
    }
    $('.ajaxDivHead').html('');
    $('.ajaxDivBody').html('');
    $(ajaxDataHead2.ajaxRes.data[0])
    for (var i = 0; i < ajaxDataHead2.ajaxRes.data[0].length; i++) {
        $('.ajaxDivHead').append('<td data-row="0" data-col="' + i + '"><span>' + ajaxDataHead2.ajaxRes.data[0][i] +
            '</span></td>')
    }
    for (var j = 1; j < ajaxDataHead2.ajaxRes.data.length; j++) {
        $('.ajaxDivBody').append('<tr></tr>');
        for (var k = 0; k < ajaxDataHead2.ajaxRes.data[j].length; k++) {
            $('.ajaxDivBody tr').eq(j - 1).append('<td data-row="' + j + '" data-col="' + k + '">' + ajaxDataHead2.ajaxRes.data[
                j][k] + '</td>')
        }
    }
}
//右侧输入框侧按钮隐藏域下拉列表
function hidSelPage(hideSelData) {
    $('.yclR_c .flowChart .selL').html('');
    $('.yclR_c .flowChart .selR').html('');
    for (var i = 0; i < hideSelData.ajaxRes.title1.length; i++) {
        $('.yclR_c .flowChart .selL').append('<option value="' + hideSelData.ajaxRes.title1[i] + '">' + hideSelData.ajaxRes.title1[
            i] + '</option>')
    }
    for (var j = 0; j < hideSelData.ajaxRes.title2.length; j++) {
        $('.yclR_c .flowChart .selR').append('<option value="' + hideSelData.ajaxRes.title2[j] + '">' + hideSelData.ajaxRes.title2[
            j] + '</option>')
    }
}



$(function() {
    calculater();
    //绝对定位初始状态距离窗口顶部距离
    var fixedTop = $('nav').outerHeight(true) + $('.ycl_banner').outerHeight(true);
    //左侧列表初次渲染
    var ajaxDataL = ajaxFn('/dispose/name/', '', 'GET');
    pageL(ajaxDataL);
    //提示信息初次加载清空
    $('.ycl_tipAjax').html('');
    //左侧列表阻止右键
    $('.yclL .ajaxDivL').on("contextmenu", 'li', function() {
            return false;
        })
        //左侧列表删除
    $('.yclL .ajaxDivL').on('mousedown', 'li', function(evt) {
            var r_id = $(this).attr('data-id');
            var evt = evt || window.event;
            if (evt.which == 3) {
                var r = confirm('确认删除数据吗？')
                if (r == true) {
                    $('.mu_ycl,.loading_lkw').show();
                    $.ajax({
                        type: 'GET',
                        url: url_ip + '/dispose/del/',
                        cache: false,
                        data: {
                            file: r_id
                        },
                        datatype: 'json',
                        headers: {
                            "Authorization": token
                        },
                        success: function(data) {
                            setTimeout(function() {
                                $('.mu_ycl,.loading_lkw').hide();
                            }, 500)
                            if (data.msg == '删除成功') {
                                $(evt.target).remove();
                            }
                            ycl_tipPage(data.msg);
                        },
                        error: function(data) {
                            setTimeout(function() {
                                $('.mu_ycl,.loading_lkw').hide();
                            }, 500)
                            console.log(data)
                            if (err.status == 401) {
                                if (token == 'JWT undefined' || token == 'JWT null') {
                                    $('.shade p').html('您目前还没有注册或登录~ ')
                                    $('.shade').show();
                                } else {
                                    $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                                    $('.shade').show();
                                }
                            } else {
                                ycl_tipPage()
                            }
                        }
                    })
                }
            }
        })
        //左侧列表, 双击弹出重命名弹窗
    $('.yclL .ajaxDivL').on('dblclick', 'li', function() {
            $('.mu,#listNameAlert').stop().fadeIn();
            $('#listNameAlert input').attr('data-old', $(this).attr('data-id'));
            return false;
        })
        //左侧列表弹窗重命名确认-取消
    $('#listNameAlert .listNameAlertBtn').on('click', 'span', function() {
            var nowType = $(this).attr('data-type');
            if (nowType == 'ok') {
                var n_filename = $('#listNameAlert input').val();
                if (n_filename == '') {
                    ycl_tipPage('请为您的数据起个名字');
                    return;
                } else {
                    var obj = {}
                    obj.o_filename = $('#listNameAlert input').attr('data-old');;
                    obj.n_filename = n_filename;
                    var renameListData = ajaxFn('/dispose/upname/', obj, 'GET');
                    if (renameListData.tipDiV != '') {
                        ycl_tipPage();
                    } else {
                        if (renameListData.ajaxRes.status) {
                            $('.ajaxDivL li[data-id=' + obj.o_filename + ']').text(renameListData.ajaxRes.data);
                        } else {
                            ycl_tipPage(renameListData.ajaxRes.msg)
                        }
                        ycl_tipPage(renameListData.ajaxRes.msg);
                    }
                }

            } else {

            }
            $('#listNameAlert input').val('');
            $('#listNameAlert').stop().slideUp();
            $('.mu').stop().fadeOut();
        })
        //监听搜索框内容变化, 改变按钮状态
    $(".yclR_tSearch").keyup(function() {
        if ($(this).val() == '') {
            $('.yclR_t .saveBtn').removeClass('btn-blue').addClass('btn-black');
        } else {
            $('.yclR_t .saveBtn').removeClass('btn-black').addClass('btn-blue');
        }

    });
    //提示信息下拉收起
    $('.ycl_tip').on('click', '.ycl_tipSlide', function() {
            var fooH = $(this).closest('.ycl_tip').outerHeight();
            if (fooH == 50) {
                $(this).closest('.ycl_tip').animate({
                    height: 145
                }).addClass('active');
                $('.ycl_tipAjax').scrollTop($('.ycl_tipAjax')[0].scrollHeight); //默认滚动到最底部
                $('.ycl_banner .ycl_tip .ycl_tipSlide img').attr('src', 'img/toup3.png').css({
                    marginTop: 0
                });
            } else {
                $(this).closest('.ycl_tip').animate({
                    height: 50
                }).removeClass('active');
                $('.ycl_banner .ycl_tip .ycl_tipSlide img').attr('src', 'img/todown3.png').css({
                    marginTop: '1px'
                });
            }
        })
        //下拉列表显示
    $('.isShowSlide').on('click', function() {
            var nowItem = $(this).closest('.flowChart ').attr('data-item');
            if ($('.ylcR_cCont .inputP[data-item="' + nowItem + '"]').children('input').val() == '') {
                ycl_tipPage('请先拖拽要合并的文件');
                return
            } else {
                $('.flowChartSlide').stop().fadeOut();
                $(this).closest('span').next('.flowChartSlide').fadeIn();
                var nowSrc = $(this).attr('src');
                var i = nowSrc.split('.')[0].substr(nowSrc.split('.')[0].length - 1, 1) - 1;
                $(this).closest('span').next('.flowChartSlide').find('li').eq(i).find('img').attr('src', nowSrc);
                $(this).closest('span').next('.flowChartSlide').find('li span').removeClass('cBlue');
                $(this).closest('span').next('.flowChartSlide').find('li').eq(i).find('span').addClass('cBlue');
            }
        })
        //选择位置
    $('.flowChartSlide img').on('click', function() {
            $('.flowChartSlide li span').removeClass('cBlue');
            $(this).closest('p').next('p').children('span').addClass('cBlue');
            $('.flowChart').find('.isShowSlide').attr('data-name', $(this).closest('p').next('p').children('span').attr(
                'data-name'));
        })
        //确认位置-确认
    $('.flowChartSlide .btn-black').on('click', function() {
            isChangeTab = 0;
            var nowSrc = $(this).closest('.flowChartSlide').find('span.cBlue').parent('p').prev('p').children('img').attr(
                'src')
            $(this).closest('.flowChartSlide').prev('span').children('img').attr('src', nowSrc)
            $(this).closest('.flowChartSlide').fadeOut();
            //请求数据, 渲染table
            var obj = {};
            obj.num = 1;
            obj.file_num = $(this).closest('.flowChart').attr('data-item') - 0;
            obj.title1 = $(this).closest('.selFoo').children('.selL').val();
            obj.title2 = $(this).closest('.selFoo').children('.selR').val();
            obj.type = $(this).closest('.flowChartSlide').find('ul li span.cBlue').attr('data-name');
            obj.click_file = $('.ylcR_cCont .inputP[data-item="1"]').children('input').attr('data-id');
            obj.click_file2 = $('.ylcR_cCont .inputP[data-item="2"]').children('input').attr('data-id');
            //table重新赋值
            var ajaxDataHead2 = ajaxFn('/dispose/detail/', obj, 'GET');
            if (ajaxDataHead2.tipDiV == '' || ajaxDataHead2.tipDiV == '') {
                if (ajaxDataHead2.ajaxRes.status) {
                    tabNum = ajaxDataHead2.ajaxRes.amount;
                    pageTab(ajaxDataHead2);
                    pageJudgeFnNew(tabNum, 1, '.tab_paging');
                }
                ycl_tipPage(ajaxDataHead2.ajaxRes.msg);
                $('.yclR_c .backHand').fadeOut(); //隐藏撤销按钮
            } else {
                ycl_tipPage();
            }
        })
        //拖拽-开始
    $('.yclL_b ul').on('mousedown', 'li', function(evt) {
            var evt = evt || window.event;
            if (evt.which == 1) { //左键按下
                $(this).addClass('cBlue');
                var nowTxt = $(this).text();
                var nowId = $(this).attr('data-id');
                $('body').append('<span class="cGray dragDiv" style="position: fixed;z-index: 2;" data-id=' + nowId + '>' +
                    nowTxt + '</span>');
                $(document).on('mousemove', function(e) { //拖拽
                    var e = e || window.event;
                    var x = e.clientX + 5;
                    var y = e.clientY - 8;
                    $('.dragDiv').css({
                        left: x,
                        top: y
                    });
                })
                return false;
            }
        })
        //拖拽-终止
    $(document).live('mouseup', function() {
            $('.dragDiv').remove();
            $('.yclL_b ul li.cBlue').removeClass('cBlue');
        })
        //拖拽至指定区域 火狐-IE兼容问题, 注释
    $('.inputP').on('mouseup', function() {
            // 		if($('.yclL_b li.cBlue').length > 0) {
            // 			var nowIndex = $(this).attr('data-item') - 1;
            // 			//判断之前操作有无漏项
            // 			for(var i = 0;i < nowIndex;i++) {
            // 				if($('.inputP').eq(i).children('input').val() == '') {
            // 					ycl_tipPage('请将文件先拖至之前的框里面');
            // 					//之前有操作漏掉, 立刻停止
            // 					return;
            // 				}
            // 			}
            // 			//之前无漏项
            // 			if($(this).children('input').val() == '') {
            // 				$('.yclR_c .backHand').fadeOut(); //撤销显示
            // 				var nowTxt = $('.yclL_b ul li.cBlue').text();
            // 				var nowId = $('.yclL_b ul li.cBlue').attr('data-id');
            // 				$(this).children('input').val(nowTxt).attr('data-id', nowId);
            // 				$('.dragDiv').remove();
            // 				if($(this).attr('data-item') != 1) {
            // 					$(this).prev('.flowChart').find('span img').click()
            // 				}
            // 				//表格数据渲染 ajaxDivHead
            // 				var ajaxDataHead1 = ajaxFn('/dispose/file/', {uuid: nowId}, 'POST');
            // 				if(ajaxDataHead1.tipDiV != '') {
            // 					ycl_tipPage();
            // 					return;
            // 				}
            // 				ycl_tipPage(ajaxDataHead1.ajaxRes.msg)
            // 				if(ajaxDataHead1.ajaxRes.status) {
            // 					isChangeTab = 0;
            // 					var obj = {};
            // 					if($(this).attr('data-item') == '1') {
            // 						obj = {num: 1,click_file: nowId};
            // 						var ajaxDataHead2 = ajaxFn('/dispose/detail/', obj, 'GET');
            // 						if(ajaxDataHead2.tipDiV == '' || ajaxDataHead2.tipDiV == undefined) {
            // 							if(ajaxDataHead2.ajaxRes.status) {
            // 								pageTab(ajaxDataHead2);
            // 								pageJudgeFnNew (tabNum, 1, '.tab_paging');
            // 							}
            // 							ycl_tipPage(ajaxDataHead2.ajaxRes.msg);
            // 						} else {
            // 							ycl_tipPage();
            // 						}
            //
            // 					} else {
            // 						obj.num = 1;
            // 						obj.file_num = $(this).attr('data-item') - 0;
            // 						obj.title1 = $(this).prev('.flowChart').find('selecr.selL').val();
            // 						obj.title2 = $(this).prev('.flowChart').find('selecr.selR').val();
            // 						obj.type = $(this).prev('.flowChart').find('.flowChartSlide ul li span.cBlue').attr('data-name');
            // 						obj.click_file = $('.ylcR_cCont .inputP[data-item="1"]').children('input').attr('data-id');
            // 						obj.click_file2 = $('.ylcR_cCont .inputP[data-item="2"]').children('input').attr('data-id');
            // 						//给输入框旁隐藏域的sel赋值
            // 						var hideSelData = ajaxFn('/dispose/detail/', obj, 'GET');
            // 						if(hideSelData.tipDiV == '' || hideSelData.tipDiV == undefined) {
            // 							if(hideSelData.ajaxRes.status) {
            // 								hidSelPage (hideSelData);
            // 								pageJudgeFnNew (tabNum, 1, '.tab_paging');
            // 							}
            // 							ycl_tipPage(hideSelData.ajaxRes.msg);
            // 						} else {
            // 							ycl_tipPage();
            // 						}
            // 					}
            // 				}
            //
            // 			}
            // 		}
        })
        //鼠标经过搜索框
    $('.inputP').on('mouseover', function() {
            if ($('.yclL_b li.cBlue').length > 0) {
                var nowIndex = $(this).attr('data-item') - 1;
                //判断之前操作有无漏项
                for (var i = 0; i < nowIndex; i++) {
                    if ($('.inputP').eq(i).children('input').val() == '') {
                        ycl_tipPage('请将文件先拖至之前的框里面');
                        //之前有操作漏掉, 立刻停止
                        return;
                    }
                }

                //之前无漏项
                if ($(this).children('input').val() == '') {
                    // $('.mu_ycl,.loaingd_lkw').show();
                    $('.yclR_c .backHand').fadeOut(); //撤销显示
                    var nowTxt = $('.yclL_b ul li.cBlue').text();
                    var nowId = $('.yclL_b ul li.cBlue').attr('data-id');
                    $(this).children('input').val(nowTxt).attr('data-id', nowId);
                    $('.dragDiv').remove();
                    $('.mu_ycl,.loading_lkw').show();
                    var _this = this;
                    setTimeout(function() {
                        if ($(_this).attr('data-item') != 1) {
                            $(_this).prev('.flowChart').find('span img').click()
                        }
                        //表格数据渲染 ajaxDivHead
                        var ajaxDataHead1 = ajaxFn('/dispose/file/', {
                            uuid: nowId
                        }, 'POST');
                        if (ajaxDataHead1.tipDiV != '') {
                            ycl_tipPage();
                            return;
                        }
                        ycl_tipPage(ajaxDataHead1.ajaxRes.msg)
                        if (ajaxDataHead1.ajaxRes.status) {
                            isChangeTab = 0;
                            var obj = {};
                            if ($(_this).attr('data-item') == '1') {
                                obj = {
                                    num: 1,
                                    click_file: nowId
                                };
                                var ajaxDataHead2 = ajaxFn('/dispose/detail/', obj, 'GET');
                                if (ajaxDataHead2.tipDiV == '' || ajaxDataHead2.tipDiV == undefined) {
                                    if (ajaxDataHead2.ajaxRes.status) {
                                        pageTab(ajaxDataHead2);
                                        pageJudgeFnNew(tabNum, 1, '.tab_paging');
                                    }
                                    ycl_tipPage(ajaxDataHead2.ajaxRes.msg);
                                } else {
                                    ycl_tipPage();
                                }

                            } else {
                                obj.num = 1;
                                obj.file_num = $(_this).attr('data-item') - 0;
                                obj.title1 = $(_this).prev('.flowChart').find('selecr.selL').val();
                                obj.title2 = $(_this).prev('.flowChart').find('selecr.selR').val();
                                obj.type = $(_this).prev('.flowChart').find('.flowChartSlide ul li span.cBlue').attr('data-name');
                                obj.click_file = $('.ylcR_cCont .inputP[data-item="1"]').children('input').attr('data-id');
                                obj.click_file2 = $('.ylcR_cCont .inputP[data-item="2"]').children('input').attr('data-id');
                                //给输入框旁隐藏域的sel赋值
                                var hideSelData = ajaxFn('/dispose/detail/', obj, 'GET');
                                if (hideSelData.tipDiV == '' || hideSelData.tipDiV == undefined) {
                                    if (hideSelData.ajaxRes.status) {
                                        hidSelPage(hideSelData);
                                        pageJudgeFnNew(tabNum, 1, '.tab_paging');
                                    }
                                    ycl_tipPage(hideSelData.ajaxRes.msg);
                                } else {
                                    ycl_tipPage();
                                }
                            }
                        }
                    })
                }
            }
            if ($('.dragDiv').length > 0) {
                $(this).children('input').css({
                    'borderColor': '#09f'
                });
            }
            if ($(this).children('input').val() != '') {
                $(this).children('i').show();
            }
        })
        //鼠标移出搜索框
    $('.inputP').on('mouseleave', function() {
            $(this).children('i').hide();
            $('.inputP input').css({
                'borderColor': '#999'
            });
        })
        //清除输入框内容
    $('.inputP i').on('click', function() {
            var nowItem = $(this).closest('.inputP').attr('data-item');
            var nowIndex = nowItem - 1;
            //清除自身及之后的输入框-及下拉隐藏域的内容
            for (var i = nowIndex; i < $('.inputP').length; i++) {
                $('.inputP').eq(i).children('input').val('').attr('data-id', '');
                //清除位置隐藏域赋值的内容
                $('.ylcR_cCont .flowChart[data-item="' + nowItem + '"]').find('.isShowSlide').attr('src', 'img/yuan1.png');
                $('.ylcR_cCont .flowChart[data-item="' + nowItem + '"]').find('.flowChartSlide ul li span.cBlue').removeClass(
                    'cBlue');
                $('.ylcR_cCont .flowChart[data-item="' + nowItem + '"]').find('.flowChartSlide ul li').eq(0).find('span').addClass(
                    'cBlue');
                $('.ylcR_cCont .flowChart[data-item="' + nowItem + '"]').find('.selL,.selR').html('');
            }
            $(this).hide();
            $('.yclR_c .backHand').fadeOut(); //撤销显示
            //全部清空, 不掉接口
            if (nowItem == 1) {
                $('.ajaxDivHead').html('');
                $('.ajaxDivBody').html('');
                $('.ycl_page.tab_paging').hide();
            } else {
                //重新调用接口
                var obj = {};
                obj.num = $('.tab_paging ul li.now_page').attr('data-num');
                obj.file_num = nowIndex;
                obj.title1 = $('.ylcR_cCont .flowChart[data-item="2"]').find('.selL').val();
                obj.title2 = $('.ylcR_cCont .flowChart[data-item="2"]').find('.selR').val();
                obj.type = $('.ylcR_cCont .flowChart[data-item="2"]').find('.flowChartSlide ul li span.cBlue').attr('data-name');
                obj.click_file = $('.ylcR_cCont .inputP[data-item="1"]').children('input').attr('data-id');
                obj.click_file2 = $('.ylcR_cCont .inputP[data-item="2"]').children('input').attr('data-id');
                //table重新赋值
                var ajaxDataHead2 = ajaxFn('/dispose/detail/', obj, 'GET');
                if (ajaxDataHead2.tipDiV == '' || ajaxDataHead2.tipDiV == undefined) {
                    if (ajaxDataHead2.ajaxRes.status) {
                        tabNum = ajaxDataHead2.ajaxRes.amount;
                        pageTab(ajaxDataHead2);
                        pageJudgeFnNew(tabNum, 1, '.tab_paging')
                    }
                    ycl_tipPage(ajaxDataHead2.ajaxRes.msg);
                } else {
                    ycl_tipPage();
                }

            }
            $(".flowChartSlide").hide();
        })
        //表格表头选项卡打开
    $('.yclR_b .slideTab').on('click', 'td span', function() {
            $('.yclR_b .slideCont h4 i.active').removeClass('active');
            $('.yclR_b .slideCont .slideDownCont').slideUp();
            $('.yclR_b .slideTab td span.active').removeClass('active');
            $(this).addClass('active');
            //表头td选中
            $('.yclR_b .slideTab td.active').removeClass('active');
            $(this).closest('td').addClass('active')
            var posL = 0;
            var trW = $('.yclR_b .slideTab').outerWidth(true);
            $('.yclR_b .slideCont').show();
            // debugger
            $(this).closest('td').prevAll().each(function(i) {
                posL += ($('.yclR_b thead tr td').eq(i).outerWidth(true) - 0);
            })
            if (trW - posL <= 140) {
                posL = trW - 140;
            }
            posL = posL + 1
            $('.yclR_b .slideCont').stop(true).animate({
                'left': posL
            }).children().removeClass('c000');
            return false
        })
        //表格表头选项卡关闭
    $(document).on('click', function() {
            $('.yclR_b .slideCont .slideDownCont').hide();
            $('.yclR_b .slideCont').hide();
            $('.yclR_b .slideTab td span.active').removeClass('active');
            $('.yclR_b .slideTab td.active').removeClass('active');
        })
        //表格表头选项卡鼠标经过
    $('.yclR_b .slideCont h4').on('mouseover', function() {
            $(this).addClass('c000').siblings().removeClass('c000');
            $('.yclR_b .slideCont h4 i.active').removeClass('active');
            $(this).children('i').addClass('active');
            $('.yclR_b .slideCont .slideDownCont').hide();
            $(this).next('div').show();
        })
        //大选项卡点击
        // $('.yclR_b .slideCont p').on('click', function () {
    $('.yclR_b .slideCont .slideContClick').on('click', function() {
            $('.yclR_b .slideCont p').removeClass('c000');
            $(this).addClass('c000');
            //对应操作
            var nowItem = $(this).attr('data-item');
            switch (nowItem) {
                case 'delete':
                    var conf = confirm('确认删除数据吗？');
                    if (conf) {
                        isChangeTab = 0;
                        var obj = {};
                        obj.type = nowItem;
                        obj.my_type = '';
                        obj.num = $('.tab_paging li.now_page').attr('data-num') - 0;
                        obj.old_content = $('.ajaxDivHead').find('td.active span.active').text();
                        obj.content = '';
                        obj.index = $('.ajaxDivHead').find('td.active').attr('data-col');
                        obj.index_x = $('.ajaxDivHead').find('td.active').attr('data-row') - 0 + (obj.num - 1) * 30;
                        obj.click_file = $('.ylcR_cCont .inputP').eq(0).children('input').attr('data-id');
                        obj.click_file2 = $('.ylcR_cCont .inputP').eq(1).children('input').attr('data-id');
                        var oData = ajaxFn('/dispose/datapro/', obj, 'GET');
                        if (oData.tipDiV == '' || oData.tipDiV == undefined) {
                            if (oData.ajaxRes.status) {
                                pageTab(oData);
                                pageJudgeFnNew(tabNum, obj.num, '.tab_paging');
                                $('.mu,#reNameAlert').stop().fadeOut();
                                $('.yclR_b .slideCont .slideDownCont').fadeOut();
                                $('.yclR_b .slideCont').fadeOut();
                                $('.yclR_b .slideTab td span.active').removeClass('active');
                                $('.yclR_b .slideTab td.active').removeClass('active');
                                $('.yclR_c .backHand').fadeIn(); //撤销显示
                            }
                            ycl_tipPage(oData.ajaxRes.msg);
                        } else {
                            ycl_tipPage();
                        }
                    }
                    return false;
                    break;
                case 're_name':
                    var old_content = $('.ajaxDivHead').find('td.active span.active').text();
                    var now_row = $('.ajaxDivHead').find('td.active').attr('data-row');
                    var now_col = $('.ajaxDivHead').find('td.active').attr('data-col');
                    $('.mu,#reNameAlert').stop().fadeIn();
                    $('#reNameAlert input').attr({
                        'data-old_content': old_content,
                        'data-row': now_row,
                        'data-col': now_col
                    }).val('');
                    return false;
                    break;
                case 'classify':
                    var obj = {};
                    obj.type = nowItem;
                    obj.my_type = '';
                    obj.num = $('.tab_paging li.now_page').attr('data-num') - 0;
                    obj.old_content = $('.ajaxDivHead').find('td.active span.active').text();
                    obj.content = '';
                    obj.index = $('.ajaxDivHead').find('td.active').attr('data-col');
                    obj.index_x = $('.ajaxDivHead').find('td.active').attr('data-row') - 0 + (obj.num - 1) * 30;
                    obj.click_file = $('.ylcR_cCont .inputP').eq(0).children('input').attr('data-id');
                    obj.click_file2 = $('.ylcR_cCont .inputP').eq(1).children('input').attr('data-id');
                    obj.click_file3 = $('.ylcR_cCont .inputP').eq(2).children('input').attr('data-id');
                    var oData = ajaxFn('/dispose/datapro/', obj, 'GET');
                    if (oData.tipDiV == '' || oData.tipDiV == undefined) {
                        ycl_tipPage(oData.ajaxRes.msg);
                    } else {
                        ycl_tipPage();
                    }
                    if (oData.ajaxRes.status) {
                        $('.mu,#classfyAlert').fadeIn();
                        $('.classfyAjaxDiv').html('');
                        var oHtml = '';
                        $.each(oData.ajaxRes.data, function(key, val) {
                            oHtml += '<li class="plr5 clearfix mb5"><p><span class="relative inputFoo"><input type="text" value="' +
                                key + '" disabled data-old="' + key + '"><i>确定</i></span></p><p>' + val +
                                '</p><p><span class="hand edit">编辑</span></p></li>'
                        })
                        $('.classfyAjaxDiv').html(oHtml).attr({
                            'data-col': obj.index,
                            'data-row': obj.index_x
                        });
                        $('.yclR_c .backHand').fadeIn(); //撤销显示
                    }
                    break;
                default:
                    isChangeTab = 1
                    var obj = {};
                    obj.type = nowItem;
                    obj.my_type = '';
                    obj.num = $('.tab_paging li.now_page').attr('data-num') - 0;
                    obj.old_content = $('.ajaxDivHead').find('td.active span.active').text();
                    obj.content = '';
                    obj.index = $('.ajaxDivHead').find('td.active').attr('data-col');
                    obj.index_x = $('.ajaxDivHead').find('td.active').attr('data-row') - 0 + (obj.num - 1) * 30;
                    obj.click_file = $('.ylcR_cCont .inputP').eq(0).children('input').attr('data-id');
                    obj.click_file2 = $('.ylcR_cCont .inputP').eq(1).children('input').attr('data-id');
                    obj.click_file3 = $('.ylcR_cCont .inputP').eq(2).children('input').attr('data-id');
                    var ajaxDataHead2 = ajaxFn('/dispose/datapro/', obj, 'GET');
                    if (ajaxDataHead2.tipDiV == '' || ajaxDataHead2.tipDiV == undefined) {
                        ycl_tipPage(ajaxDataHead2.ajaxRes.msg);
                        if (ajaxDataHead2.ajaxRes.status) {
                            pageTab(ajaxDataHead2);
                            pageJudgeFnNew(tabNum, obj.num, '.tab_paging');
                            $('.yclR_c .backHand').fadeIn(); //撤销显示
                        }

                        $('.yclR_b .slideCont .slideDownCont').hide();
                        $('.yclR_b .slideCont').hide();
                        $('.yclR_b .slideTab td span.active').removeClass('active');
                        $('.yclR_b .slideTab td.active').removeClass('active');
                    } else {
                        ycl_tipPage();
                    }
            }
            return false;
        })
        //重命名确定
    $('.reNameAlertBtn').on('click', 'span', function() {
            isChangeTab = 0;
            var nowItem = $(this).attr('data-type');
            if (nowItem == 'ok') {
                $('.mu_ycl,.loading_lkw').show();
                var obj = {};
                obj.type = 'diyfill';
                obj.num = $('.tab_paging ul li.now_page').attr('data-num');
                obj.old_content = $('#reNameAlert input').attr('data-old_content');
                obj.content = $('#reNameAlert input').val();
                obj.index = $('#reNameAlert input').attr('data-col');
                obj.index_x = $('#reNameAlert input').attr('data-row');
                obj.click_file = $('.ylcR_cCont .inputP').eq(0).children('input').attr('data-id');
                obj.click_file2 = $('.ylcR_cCont .inputP').eq(1).children('input').attr('data-id');
                var oData = ajaxFn('/dispose/datapro/', obj, 'GET');
                if (oData.tipDiV == '' || oData.tipDiV == undefined) {
                    if (oData.ajaxRes.status) {
                        $('.ajaxDivHead').find('td.active span.active').text(obj.content);
                        $('.mu,#reNameAlert').stop().fadeOut();
                        $('.yclR_b .slideCont .slideDownCont').fadeOut();
                        $('.yclR_b .slideCont').fadeOut();
                        $('.yclR_b .slideTab td span.active').removeClass('active');
                        $('.yclR_b .slideTab td.active').removeClass('active');
                        //重命名表头改值
                        $('.ajaxDivHead td').eq(obj.index).children('span').text(obj.content);
                        $('.yclR_c .backHand').fadeIn(); //撤销显示
                    }
                    ycl_tipPage(oData.ajaxRes.msg)
                } else {
                    ycl_tipPage();
                }


            } else {
                $('.mu,#reNameAlert').stop().fadeOut();
            }
        })
        //文本归类-弹窗-编辑
    $('.classfyAjaxDiv').on('click', 'span.edit', function() {
            //其他窗口有编辑未保存
            if ($('.classfyAjaxDiv').find('.inputFoo.active').hasClass('active') && !$(this).closest('li').find('.inputFoo').hasClass(
                    'active')) {
                $('.classfyAlert_err').text('*上一个编辑信息还未保存哦');
                ycl_tipPage('*请先保存上一个编辑信息')
            } else {
                $('.classfyAlert_err').text('');
                $('.classfyAjaxDiv').find('.inputFoo.active').removeClass('active');
                $('.classfyAjaxDiv').find('.inputFoo.active input').attr('disabled', true);
                $(this).closest('li').find('.inputFoo').addClass('active');
                $(this).closest('li').find('input').attr('disabled', false);
            }
        })
        //文本归类-弹窗-单项确认
    $('.classfyAjaxDiv').on('click', '.inputFoo i', function() {
            //判断输入框值有无修改
            if ($(this).prev('input').attr('data-old') == $(this).prev('input').val()) {
                ycl_tipPage('命名重复');
            } else {
                $(this).closest('li').attr('data-status', '1');
            }
            $(this).closest('li').find('.inputFoo').removeClass('active');
            $(this).closest('li').find('input').attr('disabled', true);
        })
        //文本归类-弹窗-总确认
    $('.classfyAlertBtn').on('click', 'span', function() {
            var nowType = $(this).attr('data-type');
            if (nowType == 'ok') {
                var obj = {}
                    // obj.num = $('.tab_paging li.now_page').attr('data-num') - 0;
                obj.type = 'text';
                obj.click_file = $('.ylcR_cCont .inputP').eq(0).children('input').attr('data-id');
                obj.click_file2 = $('.ylcR_cCont .inputP').eq(1).children('input').attr('data-id');
                obj.index = $('.classfyAjaxDiv').attr('data-col');

                //判断是否全部保存成功
                var isOkAll = 0;
                $('.classfyAjaxDiv li[data-status="1"]').each(function() {
                    obj.old_content = $(this).find('input').attr('data-old');
                    obj.content = $(this).find('input').val();
                    var oData = ajaxFn('/dispose/datapro/', obj, 'GET');
                    if (oData.tipDiV == '' || oData.tipDiV == undefined) {
                        ycl_tipPage(oData.ajaxRes.msg);
                    } else {
                        ycl_tipPage();
                    }
                    // {ajaxRes: ajaxRes, tipDiV: tipDiV}
                    if (!oData.ajaxRes.status) {
                        $('.classfyAlert_err').text('保存失败');
                        isOkAll += 1;
                        return;
                    } else {
                        $('.classfyAlert_err').text('');
                    }
                })
                if (isOkAll == 0) { //全部保存成功
                    isChangeTab = 1; //告诉页面, 需要重新渲染修改以后的页面
                    var obj2 = {};
                    obj2.num = $('.tab_paging ul li.now_page').attr('data-num');
                    var fileNum = 0;
                    $('.ylcR_cCont .inputP').each(function() {
                        if ($(this).find('input').val() != '') {
                            fileNum += 1
                        }
                    })
                    obj2.file_num = fileNum;
                    obj2.title1 = 'aa';
                    obj2.title2 = 'bb';
                    obj2.type = $('.flowChart').find('.isShowSlide').attr('data-name');
                    obj2.click_file = $('.ylcR_cCont .inputP[data-item="1"]').children('input').attr('data-id');
                    obj2.click_file2 = $('.ylcR_cCont .inputP[data-item="2"]').children('input').attr('data-id');
                    //给输入框旁隐藏域的sel赋值
                    var ajaxDataHead2 = ajaxFn('/model/pageetl/', obj2, 'GET');
                    if (ajaxDataHead2.ajaxRes.tipDiV == '' || ajaxDataHead2.ajaxRes.tipDiV == undefined) {
                        if (ajaxDataHead2.ajaxRes.status) {
                            tabNum = ajaxDataHead2.ajaxRes.amount;
                            pageTab(ajaxDataHead2);
                            pageJudgeFnNew(tabNum, obj2.num, '.tab_paging');
                            $('.yclR_c .backHand').fadeIn(); //撤销显示
                        }
                        ycl_tipPage(ajaxDataHead2.ajaxRes.msg);
                    } else {
                        ycl_tipPage()
                    }
                    $('.alertBoxCom:visible').stop().slideUp();
                    $('.mu').stop().fadeOut();
                }
            } else {
                $('.alertBoxCom:visible').stop().slideUp();
                $('.mu').stop().fadeOut();
            }
        })
        //表格双击改名-出弹窗
    $('.ajaxDivBody').on('dblclick', 'td', function() {
            $('.mu,#tabDblNameAlert').stop().fadeIn();
            var oldTxt = $(this).text();
            var col = $(this).attr('data-col');
            var row = $(this).attr('data-row');
            $('#tabDblNameAlert input').attr({
                'data-old': oldTxt,
                'data-row': row,
                'data-col': col
            });
        })
        //表格双击确认-取消
    $('#tabDblNameAlert .tabDblNameAlertBtn').on('click', 'span', function() {
            var nowType = $(this).attr('data-type');
            var nowPageRow = $('#tabDblNameAlert input').attr('data-row') - 0;
            var newCont = $('#tabDblNameAlert input').val();
            if (nowType == 'ok') {
                if (newCont == '') {
                    ycl_tipPage('输入内容不允许为空');
                } else {
                    var obj = {};
                    obj.type = 'diyfill';
                    obj.my_type = '';
                    obj.num = $('.tab_paging ul li.now_page').attr('data-num');
                    obj.old_content = $('#tabDblNameAlert input').attr('data-old');
                    obj.content = newCont;
                    obj.index = $('#tabDblNameAlert input').attr('data-col');
                    obj.index_x = nowPageRow + (obj.num - 1) * 30;
                    obj.click_file = $('.ylcR_cCont .inputP').eq(0).children('input').attr('data-id');
                    obj.click_file2 = $('.ylcR_cCont .inputP').eq(1).children('input').attr('data-id');
                    obj.click_file3 = $('.ylcR_cCont .inputP').eq(2).children('input').attr('data-id');
                    var oData = ajaxFn('/dispose/datapro/', obj, 'GET');
                    if (oData.tipDiV == '' || oData.tipDiV == undefined) {
                        if (oData.ajaxRes.status) {
                            $('.ajaxDivBody tr').eq(nowPageRow - 1).children('td').eq(obj.index).text(obj.content);
                            $('#tabDblNameAlert').stop().slideUp();
                            $('.mu').stop().fadeOut();
                            $('.yclR_c .backHand').fadeIn(); //撤销显示
                        }
                        ycl_tipPage(oData.ajaxRes.msg);
                    } else {
                        ycl_tipPage('重命名失败');
                    }
                }
            } else {
                $('#tabDblNameAlert').stop().slideUp();
                $('.mu').stop().fadeOut();
            }

        })
        //判断滚动高度
    $(window).scroll(function() {
        //表格文本长度大于窗口, 滚动时绝对定位
        // 		var tabContH = $('.ajaxDivBody').height();
        // 		var windowsH = $(window).height();
        var posL1 = $('.yclL_b').offset().left;
        var width1 = $('.yclL_b').outerWidth(true);
        var posL2 = $('.yclR_c').offset().left;
        var width2 = $('.yclR_c').outerWidth(true);
        if ($(document).scrollTop() >= fixedTop) {
            $('.yclR_c_hide').show();
            $('.yclL_b').addClass('fixed').css({
                left: posL1,
                width: width1,
                maxHeight: $(window).height() - 10
            });
            $('.yclR_c').addClass('fixed').css({
                left: posL2,
                width: width2
            });
        } else {
            $('.yclR_c_hide').hide();
            $('.yclL_b').removeClass('fixed').css({
                left: 'auto',
                width: width1,
            });
            $('.yclR_c').removeClass('fixed').css({
                left: 'auto',
                width: width2
            });
        }
        if ($('.ycl_tip').height() != 50) {
            $('.ycl_tip').animate({
                height: 50
            }, 200).removeClass('active');
            $('.ycl_banner .ycl_tip .ycl_tipSlide img').attr('src', 'img/todown3.png').css({
                marginTop: '1px'
            });
        }
        if ($(document).scrollTop() <= fixedTop) {
            $('.yclL_b').css({
                maxHeight: $(window).height() - 190 - 10 + $(document).scrollTop(),
            })
        } else if ($(document).scrollTop() > fixedTop) {
            $('.yclL_b').css({
                maxHeight: $(window).height() - 10,
            })
        }
    });
    //点击保存出弹窗
    $('.ylcR_cCont').on('click', '.saveBtn', function() {
            $('.mu,#isSaveAs').stop().fadeIn();
        })
        //保存弹窗按钮
    $('#isSaveAs .isSaveAsBtn').on('click', 'span', function() {
            var nowType = $(this).attr('data-type');
            var nowname = $('#isSaveAs input').val();
            if (nowType == 'ok') {
                if (nowname == '') {
                    ycl_tipPage('输入内容不允许为空');
                } else {
                    var obj = {};
                    obj.old_file = $('.ylcR_cCont .inputP[data-item="1"]').children('input').attr('data-id');
                    obj.old_file2 = $('.ylcR_cCont .inputP[data-item="2"]').children('input').attr('data-id');
                    obj.old_file3 = $('.ylcR_cCont .inputP[data-item="3"]').children('input').attr('data-id');
                    obj.old_file4 = '';
                    obj.new_file = nowname;
                    var oData = ajaxFn('/dispose/upsave/', obj, 'GET');
                    if (oData.tipDiV == '' || oData.tipDiV == undefined) {
                        ycl_tipPage(oData.ajaxRes.msg);
                        //左侧列表重新渲染
                        var ajaxDataL = ajaxFn('/dispose/name/', '', 'GET');
                        pageL(ajaxDataL);
                        $('.yclR_c .backHand').fadeOut(); //撤销显示
                    } else {
                        ycl_tipPage('保存失败');
                    }
                    $('#isSaveAs').stop().slideUp();
                    $('.mu').fadeOut();
                }
            } else if (nowType == 'no') {
                $('#isSaveAs').stop().slideUp();
                $('.mu').fadeOut();
            }
        })
        //返回上一步
    $('.yclR_c').on('click', '.backHand', function() {
            // $('.mu,.loading_lkw').show();
            var nowPage = $('.tab_paging ul li.now_page').attr('data-num') - 0;
            var obj = {};
            obj.click_file = $('.ylcR_cCont .inputP').eq(0).children('input').attr('data-id');
            obj.click_file2 = $('.ylcR_cCont .inputP').eq(1).children('input').attr('data-id');
            obj.click_file3 = $('.ylcR_cCont .inputP').eq(2).children('input').attr('data-id');
            obj.click_file3 = $('.ylcR_cCont .inputP').eq(3).children('input').attr('data-id');
            var ajaxDataHead2 = ajaxFn('/dispose/cancel/', obj, 'GET');
            if (ajaxDataHead2.tipDiV == '' || ajaxDataHead2.tipDiV == undefined) {
                if (ajaxDataHead2.ajaxRes.status) {
                    pageTab(ajaxDataHead2);
                    tabNum = ajaxDataHead2.ajaxRes.amount;
                    pageJudgeFnNew(tabNum, nowPage, '.tab_paging');
                    $(this).fadeOut();
                }
                ycl_tipPage(ajaxDataHead2.ajaxRes.msg);
            } else {
                ycl_tipPage();
            }
        })
        //tab分页点击页数
    $('.tab_paging').on('click', 'li', function() {
            var now_pageP = $(this).attr('data-num') - 0;
            table_pageFn(now_pageP);
        })
        //tab分页上一页
    $('.tab_paging').on('click', '.pre_page', function() {
            var old_pageP = $('.tab_paging li.now_page').attr('data-num') - 0;
            var now_pageP = old_pageP - 1;
            if (now_pageP == 0) {
                return
            }
            table_pageFn(now_pageP);
        })
        //tab分页下一页
    $('.tab_paging').on('click', '.next_page', function() {
            var old_pageP = $('.tab_paging li.now_page').attr('data-num') - 0;
            if (old_pageP == tabNum) {
                return
            }
            var now_pageP = old_pageP + 1;
            table_pageFn(now_pageP);
        })
        //页码搜索
    $('.tab_paging').on('click', '.to_page', function() {
        var now_pageP = $('.tab_paging .will_page').val() - 0;
        var r = /^\+?[1-9][0-9]*$/; //判断是否为正整数
        if (now_pageP <= 0 || now_pageP > tabNum || !r.test(now_pageP)) {
            return
        }
        table_pageFn(now_pageP);
    })
    $('.mu,.alertBoxCom').on('click', function() {
            // return false;
        })
        //关闭弹窗
    $(document).on('click', '.alertClose', function() {
            $('.alertBoxCom:visible').stop().slideUp();
            $('.mu').stop().fadeOut();
        })
        // 登录提示框关闭事件
    $('.lkw-msg-box-close').on('click', function() {
            window.history.go(-1);
        })
        // 	$('.hint_logo_cancel').click(function () {
        // 		$('.shade').hide();
        // 		if ($('.shade p').html() == '您目前还没有注册或登录~ ') {
        // 			window.location.href = 'index.html';
        // 		}
        // 	})
})