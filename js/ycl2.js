$(function() {
    $('img').on('mousedown', function(e) {
            e.preventDefault() /*禁止系统默认的图片拖拽*/
        })
		// 搜索ul li
		$('#searchInput').on('keyup', function () {
		  var content = $('.ul') // 
		  var input = $(this)
		  new Search(content, input, '#6332f6')
		})
        /*数据加工请求封装*/
    function workAjax(now_page) {
        var p = new Promise(function(resolve, reject) {
            $('.datawork_box .load').show()
            var list = []
            var type;
            var page;
            var li_L = $('.workTop_box li').length
            if (li_L <= 1) {
                type = 0
            } else {
                type = 1
            }
            if (now_page) {
                page = now_page
            } else {
                page = 1
            }
            for (var i = 0; i < li_L; i++) {
                if (i == 0) {
                    list = [
                        ['F1', $('.workTop_box li:eq(' + i + ')').attr('data-id')]
                    ]
                } else if (i == 1) {
                    var k = i - 1;
                    var j = Number($('.workTop_box li')[i].className.substr(6)) + 1
                    list[0].push('F' + j, $('.workTop_box li:eq(' + i + ')').attr('data-id'), $('.workTop_box div:eq(' + k + ')')[0].ka, $('.workTop_box div:eq(' + k + ')')[0].kz, $('.workTop_box div:eq(' + k + ')')[0].type)
                } else {
                    var k = i - 1;
                    var j = Number($('.workTop_box li')[i].className.substr(6)) + 1;
                    list.push(['', '', 'F' + j, $('.workTop_box li:eq(' + i + ')').attr('data-id'), $('.workTop_box div:eq(' + k + ')')[0].ka, $('.workTop_box div:eq(' + k + ')')[0].kz, $('.workTop_box div:eq(' + k + ')')[0].type])
                }
            }
            //console.log(list)
            $.ajax({
                url: url_ip + '/model/datalink/',
                type: 'GET',
                data: { args_list: JSON.stringify(list), type: type, page: page },
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        resolve(data.status)
                        if (data.data.length > 0) {
                            if (page == 1) {
                                var data_title = data.data[0]
                                var detail = [];
                                for (var i = 1; i < data.data.length; i++) {
                                    detail.push(data.data[i])
                                }
                                dataToTable(data_title, detail)
                            } else {
                                var data_title = []
                                var detail = [];
                                for (var i = 0; i < data.data.length; i++) {
                                    detail.push(data.data[i])
                                }
                                dataToTable(data_title, detail)
                            }
                        }
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                },
                complete: function(data) {
                    $('.datawork_box .load').hide()
                }
            })
        })
        return p
    }
    /*文件列表获取*/
    var LiNum;
    now_page = 1

    function promiseA() {
        var p = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'GET',
                url: url_ip + '/model/allfiles/',
                data: {},
                cache: false,
                datatype: "json",
                headers: { "Authorization": token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        $('.dataFile ul').empty()
                        for (var i = 0; i < data.data.length; i++) {
                            $('.dataFile ul').append('<li data-id="' + data.data[i].file_obj_id + '">' + data.data[i].file_name + '</li>')
                            $('.dataFile ul li[data-id=' + data.data[i].file_obj_id + ']')[0].data_title = data.data[i].title
                        }
                    }
                },
                error: function(data) {
                    //console.log(data)
                    if (data.status == 401) {
                        if (token == 'JWT undefined' || token == 'JWT null') {
                            $('.shade p').html('您目前还没有注册或登录~ ')
                            $('.shade').show();
                        } else {
                            $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                            $('.shade').show();
                        }
                    }
                }
            })
        })
        return p
    }
    promiseA()
        /*加工-数据列表滚动条滚动触发吸顶title事件*/
    var now_page = 1;
    var Switch = true;
    var scroll_func;
    $('.work_table').scroll(function(e) {
            // var firstTr = $('.work_table table').children('tbody').children(':first')
            // var secondTr = $($('.work_table table').children('tbody').children().get(1))
            // if ($(this).scrollTop() > 0) {
            //     for (var i = 0; i < firstTr.children().length; i++) {
            //         var w1 = firstTr.children()[i].children[0].offsetWidth
            //         var w2 = secondTr.children()[i].children[0].offsetWidth
            //         if (w1 < w2) {
            //             var w = w2
            //         } else {
            //             var w = w1
            //         }
            //         var box_w = $('.work_table')[0].scrollWidth
            //         if (box_w <= 1326) {
            //             firstTr.children()[i].style.width = w + 'px'
            //             secondTr.children()[i].style.width = w + 'px'
            //         } else {
            //             firstTr.children()[i].children[0].style.width = w + 'px'
            //             secondTr.children()[i].children[0].style.width = w + 'px'
            //         }
            //     }
            //     firstTr.css({ position: 'absolute', left: '0', top: '0' })
            //     if ($(this).scrollLeft() > 0) {
            //         var w = $(this).scrollLeft()
            //         var left = -w
            //         firstTr.css({ position: 'absolute', left: left + 'px', top: '0' })
            //     }
            //     if ($(this).scrollTop() + 460 >= $(this).children('table')[0].offsetHeight) {
            //         if (Switch) {
            //             Switch = false;
            //             now_page++;
            //             $.ajax({
            //                 type: 'GET',
            //                 url: url_ip + '/model/pageetl/',
            //                 data: { page: now_page },
            //                 datatype: 'json',
            //                 headers: { "Authorization": token },
            //                 success: function(data) {
            //                     //console.log(data)
            //                     if (data.status) {
            //                         var data_title = []
            //                         var detail = [];
            //                         for (var i = 1; i < data.data.length; i++) {
            //                             detail.push(data.data[i])
            //                         }
            //                         dataToTable(data_title, detail)
            //                         alertmsg(data.msg, 1)
            //                         Switch = true;
            //                     } else {
            //                         alertmsg(data.msg, 0)
            //                     }
            //                 },
            //                 error: function(data) {
            //                     //console.log(data)
            //                     if (data.status == 401) {
            //                         if (token == 'JWT undefined' || token == 'JWT null') {
            //                             $('.shade p').html('您目前还没有注册或登录~ ')
            //                             $('.shade').show();
            //                         } else {
            //                             $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
            //                             $('.shade').show();
            //                         }
            //                     } else {
            //                         alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
            //                     }
            //                 }
            //             })
            //         }
            //     }
            // } else {
            //     firstTr.css({ position: '', left: '', top: '' })
            // }
        })
        /*数据渲染到加工弹窗封装*/
    function dataToTable(data_title, data) {
        var tr = document.createElement('tr')
        if (data_title.length > 0) {
            for (var i = 0; i < data_title.length; i++) {
                var td = document.createElement('th')
                $(td)[0].index = i;
                $(td)[0].index_y = 0;
                $(td).html('<div>' + data_title[i] + '</div><b id="title_' + i + '"></b>')
                $(tr).append(td)
            }
            $('.component table thead').append(tr)
        }
        if (data.length > 0) {
            for (var j = 0; j < data.length; j++) {
                var tr2 = document.createElement('tr')
                for (var k = 0; k < data[j].length; k++) {
                    var td2 = document.createElement('td')
                    $(td2)[0].index = k
                    $(td2)[0].index_y = (now_page - 1) * 30 + j + 1
                    $(td2).html('<div>' + data[j][k] + '</div>')
                    $(tr2).append(td2)
                }
                $('.component table tbody').append(tr2)
            }
        }
		
		// 吸顶表头js
		$('table').each(function() {
			if($(this).find('thead').length > 0 && $(this).find('th').length > 0) {
				// Clone <thead>
				var $w	   = $(window),
					$t	   = $(this),
					$thead = $t.find('thead').clone(),
					$col   = $t.find('thead, tbody').clone();
		
				// Add class, remove margins, reset width and wrap table
				$t
				.addClass('sticky-enabled')
				.css({
					margin: 0,
					width: '100%'
				}).wrap('<div class="sticky-wrap" />');
		
				if($t.hasClass('overflow-y')) $t.removeClass('overflow-y').parent().addClass('overflow-y');
		
				// Create new sticky table head (basic)
				$t.after('<table class="sticky-thead" />');
		
				// If <tbody> contains <th>, then we create sticky column and intersect (advanced)
				if($t.find('tbody th').length > 0) {
					$t.after('<table class="sticky-col" /><table class="sticky-intersect" />');
				}
		
				// Create shorthand for things
				var $stickyHead  = $(this).siblings('.sticky-thead'),
					$stickyCol   = $(this).siblings('.sticky-col'),
					$stickyInsct = $(this).siblings('.sticky-intersect'),
					$stickyWrap  = $(this).parent('.sticky-wrap');
		
				$stickyHead.append($thead);
		
				$stickyCol
				.append($col)
					.find('thead th:gt(0)').remove()
					.end()
					.find('tbody td').remove();
		
				$stickyInsct.html('<thead><tr><th>'+$t.find('thead th:first-child').html()+'</th></tr></thead>');
				
				// Set widths
				var setWidths = function () {
						$t
						.find('thead th').each(function (i) {
							$stickyHead.find('th').eq(i).width($(this).width());
						})
						.end()
						.find('tr').each(function (i) {
							$stickyCol.find('tr').eq(i).height($(this).height());
						});
		
						// Set width of sticky table head
						$stickyHead.width($t.width());
		
						// Set width of sticky table col
						$stickyCol.find('th').add($stickyInsct.find('th')).width($t.find('thead th').width())
					},
					repositionStickyHead = function () {
						// Return value of calculated allowance
						var allowance = calcAllowance();
					
						// Check if wrapper parent is overflowing along the y-axis
						if($t.height() > $stickyWrap.height()) {
							// If it is overflowing (advanced layout)
							// Position sticky header based on wrapper scrollTop()
							if($stickyWrap.scrollTop() > 0) {
								// When top of wrapping parent is out of view
								$stickyHead.add($stickyInsct).css({
									opacity: 1,
									top: $stickyWrap.scrollTop()
								});
							} else {
								// When top of wrapping parent is in view
								$stickyHead.add($stickyInsct).css({
									opacity: 0,
									top: 0
								});
							}
						} else {
							// If it is not overflowing (basic layout)
							// Position sticky header based on viewport scrollTop
							if($w.scrollTop() > $t.offset().top && $w.scrollTop() < $t.offset().top + $t.outerHeight() - allowance) {
								// When top of viewport is in the table itself
								$stickyHead.add($stickyInsct).css({
									opacity: 1,
									top: $w.scrollTop() - $t.offset().top
								});
							} else {
								// When top of viewport is above or below table
								$stickyHead.add($stickyInsct).css({
									opacity: 0,
									top: 0
								});
							}
						}
					},
					repositionStickyCol = function () {
						if($stickyWrap.scrollLeft() > 0) {
							// When left of wrapping parent is out of view
							$stickyCol.add($stickyInsct).css({
								opacity: 1,
								left: $stickyWrap.scrollLeft()
							});
						} else {
							// When left of wrapping parent is in view
							$stickyCol
							.css({ opacity: 0 })
							.add($stickyInsct).css({ left: 0 });
						}
					},
					calcAllowance = function () {
						var a = 0;
						// Calculate allowance
						$t.find('tbody tr:lt(3)').each(function () {
							a += $(this).height();
						});
						
						// Set fail safe limit (last three row might be too tall)
						// Set arbitrary limit at 0.25 of viewport height, or you can use an arbitrary pixel value
						if(a > $w.height()*0.25) {
							a = $w.height()*0.25;
						}
						
						// Add the height of sticky header
						a += $stickyHead.height();
						return a;
					};
		
				setWidths();
		
				$t.parent('.sticky-wrap').scroll($.throttle(250, function() {
					repositionStickyHead();
					repositionStickyCol();
				}));
				
				// 滚动条样式
				$('.sticky-wrap').niceScroll({
				    cursorcolor: "#c2c2c2",//#CC0071 光标颜色
				    cursoropacitymax: .5, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
				    touchbehavior: true, //使光标拖动滚动像在台式电脑触摸设备
				    cursorwidth: "5px", //像素光标的宽度
				    cursorborder: "0", // 游标边框css定义
				    cursorborderradius: "10px",//以像素为光标边界半径
				    autohidemode: false //是否隐藏滚动条
				});
		
				$w
				.load(setWidths)
				.resize($.debounce(250, function () {
					setWidths();
					repositionStickyHead();
					repositionStickyCol();
				}))
				.scroll($.throttle(250, repositionStickyHead));
			}
		});
		
    }
    /*点击小三角出操作弹窗事件*/
    $('.work_table').live('click', function(evt) {
        var evt = evt || window.event
        var key_id = evt.target.id;
        var key = key_id.substr(0, 5)
        if (key == 'title') {
            // debugger
            var maxW = $(this).outerWidth(true);
            var scroL = $(this).scrollLeft();
            var reL = $('#' + key_id).closest('td')[0].offsetLeft;
            var needL = reL - scroL;
            if (needL < 0) {
                needL = 0;
            } else if (needL > maxW - 150) {
                needL = maxW - 150;
            }
            var y = 20
            $('.work_box')[0].txt = $(evt.target).prev().html()
            $('.work_box')[0].index = $(evt.target).parent()[0].index
            $('.work_box')[0].index_y = $(evt.target).parent()[0].index_y
                //console.log($('.work_box')[0].index,$('.work_box')[0].index_y)
            $('.work_box').css({ left: needL + 'px', top: y + 'px', display: 'block' })
        } else {
            $('.work_box').hide();
        }
        return false;
    })
    $(document).on('click', function() {
        $('.work_box').hide();
    })
    $('.work_table').scroll(function() {
            $('.work_box').hide();
        })
        /*加工——列,鼠标移入事件*/
    $('.work_box>div').hover(function() {

        var html = $(this).children('span').html()
        $(this).append('<h4><span>' + html + '</span></h4>')
        if ($(this).children('ul')) {
            var maxW = $(this).closest('.table').outerWidth(true);
            var fooL = $(this).closest('.work_box').position().left;
            if (maxW - fooL <= 200) {
                $(this).children('ul').css('left', '-134px');
            } else {
                $(this).children('ul').css('left', '119px');
            }
            $(this).children('ul').show()
        }
    }, function() {
        $(this).children('h4').remove()
        if ($(this).children('ul')) {
            $(this).children('ul').hide()
        }
    })
    $('.work_box>div ul li').hover(function() {
            var html = $(this).html()
            $(this).append('<h5>' + html + '</h5>')
        }, function() {
            $(this).children('h5').remove()
        })
        /*数据加工改变操作区大小*/
    $('.dataworkLine').mousedown(function() {
        $(document).live('mousemove', function(evt) {
            var Y = $('.dataWork').height()
            var evt = evt || window.event
            var y = evt.clientY
            if (y >= $(window).height() - 150) {
                y = $(window).height() - 150
            } else if (y <= 176) {
                y = 176
            }
            var y1 = y - 116
            var y2 = Y - y1 - 42
            $('.workTop').css('height', y1 + 'px')
            $('.table').css('height', y2 + 'px')
        })
    })
    $(document).mouseup(function() {
            $(document).unbind('mousemove')
        })
        /*数据加工文件拖拽*/
    $('.dataFile li').live('mousedown', function(evt) {
        var txt = evt.target.innerHTML
        var obj_id = $(this).attr('data-id')
        var evt = evt || window.event
        var x = evt.clientX
        var y = evt.clientY
        $('body').append('<div class="movefile" style="left:' + x + 'px;top:' + y + 'px;" data-id="' + obj_id + '">' + txt + '</div>')
        $('.movefile')[0].data_title = evt.target.data_title
        $(document).live('mousemove', function(evt) {
            var evt = evt || window.event
            var x2 = evt.clientX + 1
            var y2 = evt.clientY + 1
            $('.movefile').css({ left: x2 + 'px', top: y2 + 'px' })
        })
    })
    var litxt;
    var dataTitle;
    var objId;
    $('.workTop').mouseenter(function() {
        if ($('.movefile')[0]) {
            litxt = $('.movefile').html()
            dataTitle = $('.movefile')[0].data_title
            objId = $('.movefile').attr('data-id')
        }
    })
    $('.workTop_box').mouseup(function() {
        if (litxt) {
            if (!$('.workTop_box li')[0]) {
                $('.workTop_box').append('<li style="left:8px;top:5px;" class="workli0" data-id="' + objId + '"><span>' + litxt + '</span><img src="img/remove3.png"></li>')
                $('.workTop_box li.workli0')[0].data_title = dataTitle
                $('.workTop_box')[0].parm = []
                $('.workTop_box')[0].parm.push({ 'name': litxt, 'class': 'workli0', 'title': $('.workTop_box li.workli0')[0].data_title })
                workAjax()
                LiNum = 0;
            } else if ($('.workTop_box li').length == 1) {
                $('.workTop_box').append('<div style="left:' + 188 + 'px;top:' + 5 + 'px;" class="workdiv0" data-a="workli0" data-z="workli1"><span></span><img src="img/yuan1.png"><span></span></div>' +
                    '<li style="left:' + 368 + 'px;top:' + 5 + 'px;" class="workli1" data-id="' + objId + '"><span>' + litxt + '</span><img src="img/remove3.png"></li>')
                $('.workTop_box li.workli1')[0].data_title = dataTitle
                setWork('workdiv0', '150px', '41px', 'F2', $('.workdiv0'))
                LiNum = 1;
            } else {
                var num = $('.workli0')[0].bingArr.length
                LiNum += 1;
                var num3 = LiNum - 1
                var num4 = LiNum + 1
                var left_d = $('.workli0')[0].offsetLeft + 180
                var top_d = $('.workli0')[0].offsetTop + (num * 55)
                var left_l = $('.workli0')[0].offsetLeft + 360
                var top_l = $('.workli0')[0].offsetTop + (num * 55)
                $('.workTop_box').append('<div style="left:' + left_d + 'px;top:' + top_d + 'px;" class="workdiv' + num3 + '" data-a="workli0" data-z="workli' + LiNum + '"><span class="wan"></span><img src="img/yuan1.png"><span></span></div>' +
                    '<li style="left:' + left_l + 'px;top:' + top_l + 'px;" class="workli' + LiNum + '" data-id="' + objId + '"><span>' + litxt + '</span><img src="img/remove3.png"></li>')
                $('.workTop_box li.workli' + LiNum)[0].data_title = dataTitle
                var left_s = left_d - 38
                var top_s = top_d + 36
                setWork('workdiv' + num3, left_s, top_s, 'F' + num4, $('.workdiv' + num3))
            }
            litxt = null
        }
    })
    $(document).mouseup(function() {
        $('.movefile').remove()
    })

    function setWork(which, left, top, gz, obj) {
        $('.set_workTop').attr('data-to', which)
        $('.set_workTop').css({ left: left, top: top })
        $('.set_workTop').show()
        $('.set_workTop .set_select1 div').empty()
        for (var i = 0; i < $('.workTop_box')[0].parm.length; i++) {
            var name = $('.workTop_box')[0].parm[i].name
            var classa = $('.workTop_box')[0].parm[i].class
            var title = $('.workTop_box')[0].parm[i].title
            var k = Number(classa.substr(6)) + 1
            $('.set_workTop .set_select1 div').append('<ol data-f="' + classa + '"></ol>')
            $('.set_workTop .set_select1 div ol[data-f=' + classa + ']').append('<b>' + name + '</b>')
            for (var j = 0; j < title.length; j++) {
                $('.set_workTop .set_select1 div ol[data-f=' + classa + ']').append('<li>F' + k + '_' + title[j] + '</li>')
            }
        }
        var className = $('.' + which).attr('data-z')
        var parm2 = $('.' + className)[0].data_title
        $('.set_workTop .set_select2').empty()
        $('.set_workTop .set_select2').append('<option></option>')
        for (var i = 0; i < parm2.length; i++) {
            $('.set_workTop .set_select2').append('<option>' + gz + '_' + parm2[i] + '</option>')
        }
        if (obj.ka && obj.kz && obj.type) {
            $('.set_workTop dd').removeClass('on')
            $('.set_workTop dd[type=' + obj.type + ']').addClass('on')
            $('.set_workTop .set_select1 span').html(obj.ka)
            $('.set_workTop .set_select2').val(obj.kz)
        } else {
            $('.set_workTop dd').removeClass('on')
            $('.set_workTop dd[type=inner]').addClass('on')
            $('.set_workTop .set_select1 span').html('')
            $('.set_workTop .set_select2').val('')
        }
    }
    /*数据加工合并弹窗操作*/
    $('.set_select1').mouseup(function() {
        $(this).toggleClass('on')
    })
    $('.set_select1 li').live('mousedown', function() {
        var className0 = $(this).parent().attr('data-f')
        var className1 = $(this).parents('.set_workTop').attr('data-to')
        var className2 = $('.' + className1).attr('data-z')
        var divLink = $('.' + className1)
        if ($('.' + className0)[0].bingArr) {
            var num = $('.' + className0)[0].bingArr.length
        } else {
            var num = 0
        }
        var n_left_d = $('.' + className0)[0].offsetLeft + 180
        var n_top_d = $('.' + className0)[0].offsetTop + (num * 55)
        var n_left_l = n_left_d + 180
        var n_top_l = n_top_d
            //console.log(className0,className2,divLink,num,n_left_d,n_top_d,n_left_l,n_top_l)
        if (!$('.' + className0)[0].bingArr || num == 0) {
            divLink.children('span:eq(0)').removeClass('wan')
        } else {
            divLink.children('span:eq(0)').addClass('wan')
        }
        divLink.css({ left: n_left_d + 'px', top: n_top_d + 'px' })
        divLink.attr('data-a', className0)
        $('.' + className2).css({ left: n_left_l + 'px', top: n_top_l + 'px' })
        $('.set_select1>span').html($(this).html())
    })
    $('.setwork_no').click(function() {
        $('.set_workTop').hide()
    })
    $('.setwork_sure').click(function() {
        var className = $(this).parent().parent().attr('data-to')
        $('.' + className)[0].ka = $('.set_workTop .set_select1 span').html()
        $('.' + className)[0].kz = $('.set_workTop .set_select2').val()
        $('.' + className)[0].type = $('.set_workTop dd.on').attr('type')
        $('.work_table table').empty()
        var className1 = $('.' + className).attr('data-a')
        var className2 = $('.' + className).attr('data-z')
        if (!$('.' + className1)[0].bingArr || $('.' + className1)[0].bingArr.length == 0) {
            $('.' + className1)[0].bingArr = [className2]
        } else {
            $('.' + className1)[0].bingArr.push(className2)
        }
        var dataFile_name = $('.' + className2).children('span').html()
        var liclass = $('.' + className2)[0].className
        var data_title = $('.' + className2)[0].data_title
        workAjax().then(function(data) {
            if (data) {
                $('.workTop_box')[0].parm.push({ 'name': dataFile_name, 'class': liclass, 'title': data_title })
                    //console.log($('.workTop_box')[0].parm)
            }
        })
        $('.set_workTop').hide()
    })
    $('.workTop_box div').live('click', function() {
        var className = $(this)[0].className
        var left = $(this)[0].offsetLeft - 38
        var top = $(this)[0].offsetTop + 36
        var num = Number($(this).attr('data-z').substr(6)) + 1
        setWork(className, left, top, 'F' + num, $(this)[0])
    })
    $('.set_workTop dd').click(function() {
        $('.set_workTop dd').removeClass('on')
        $(this).addClass('on')
        var rote = $(this).children('img').attr('src')
        var className = $(this).parent().parent().attr('data-to')
        $('.' + className).children('img').attr('src', rote)
    })
    $('.workTop_box li img').live('click', function() {
            if ($(this).parent()[0].className == 'workli0') {
                $('.workTop_box').empty()
                $('.dataWork .table table').empty()
                $(".set_workTop").hide();
            } else {
                var num = $(this).parent()[0].className.substr(6) - 1
                var className_a = $('.workdiv' + num).attr('data-a')
                var className_z = $('.workdiv' + num).attr('data-z')
                var removeArr = [];
                removeArr.push(className_z)
                if ($('.' + className_z)[0].bingArr && $('.' + className_z)[0].bingArr.length != 0) {
                    var childworkli = $('.' + className_z)[0].bingArr
                    remove_add(childworkli)
                }

                function remove_add(childworkli) {
                    for (var i = 0; i < childworkli.length; i++) {
                        removeArr.push(childworkli[i])
                        if ($('.' + childworkli[i])[0].bingArr && $('.' + childworkli[i])[0].bingArr.length != 0) {
                            remove_add($('.' + childworkli[i])[0].bingArr)
                        }
                    }
                }

                function li_buju() {
                    for (var i = 0; i < LiNum + 1; i++) {
                        if (i == 0) {
                            $('.workli' + i).css({ left: '8px', top: '5px' })
                        } else {
                            var k = i - 1;
                            if ($('.workli' + i)[0]) {
                                var nameA = $('.workdiv' + k).attr('data-a')
                                var index = $('.' + nameA)[0].bingArr.indexOf('workli' + i)
                                var left_d = $('.' + nameA)[0].offsetLeft + 180
                                var left_l = $('.' + nameA)[0].offsetLeft + 360
                                var top_d = $('.' + nameA)[0].offsetTop + (index * 55)
                                var top_l = $('.' + nameA)[0].offsetTop + (index * 55)
                                $('.workli' + i).css({ left: left_l + 'px', top: top_l + 'px' })
                                $('.workdiv' + k).css({ left: left_d + 'px', top: top_d + 'px' })
                                if (index == 0) {
                                    $('.workdiv' + k).children('span:eq(0)').removeClass('wan')
                                }
                            }
                        }
                    }
                }
                if ($('.' + className_a)[0].bingArr && $('.' + className_a)[0].bingArr.indexOf(className_z) != -1) {
                    $('.' + className_a)[0].bingArr.splice($('.' + className_a)[0].bingArr.indexOf(className_z), 1)
                    for (var i = 0; i < removeArr.length; i++) {
                        for (var j = 0; j < $('.workTop_box')[0].parm.length; j++) {
                            if ($('.workTop_box')[0].parm[j].class == removeArr[i]) {
                                $('.workTop_box')[0].parm.splice(j, 1)
                                j--;
                            }
                        }
                        var num = removeArr[i].substr(6) - 1
                        $('.' + removeArr[i]).remove()
                        $('.workdiv' + num).remove()
                    }
                    li_buju()
                    var list = [];
                    for (var i = 0; i < $('.workTop_box li').length; i++) {
                        if (i == 0) {
                            list.push(['F1', $('.workTop_box li')[i].getAttribute('data-id')])
                        } else if (i == 1) {
                            var num1 = $('.workTop_box li')[i].className.substr(6) - 1
                            var num2 = Number($('.workTop_box li')[i].className.substr(6)) + 1
                                //console.log(num2)
                            list[0].push('F' + num2, $('.workTop_box li')[i].getAttribute('data-id'), $('.workdiv' + num1)[0].ka, $('.workdiv' + num1)[0].kz, $('.workdiv' + num1)[0].type)
                        } else {
                            var num1 = $('.workTop_box li')[i].className.substr(6) - 1
                            var num2 = Number($('.workTop_box li')[i].className.substr(6)) + 1
                                //console.log(num2)
                            list.push(['', '', 'F' + num2, $('.workTop_box li')[i].getAttribute('data-id'), $('.workdiv' + num1)[0].ka, $('.workdiv' + num1)[0].kz, $('.workdiv' + num1)[0].type])
                        }
                    }
                    if ($('.workTop_box li').length <= 1) {
                        var type = 0
                    } else {
                        var type = 1
                    }
                    var page = 1
                        //console.log(list)
                    $('.work_table table').empty()
                    $.ajax({
                        url: url_ip + '/model/datalink/',
                        type: 'GET',
                        data: { args_list: JSON.stringify(list), type: type, page: page },
                        dataType: 'json',
                        headers: { 'Authorization': token },
                        beforeSend: function() {
                            $('.datawork_box .load').show()
                        },
                        success: function(data) {
                            //console.log(data)
                            if (data.status) {
                                if (data.data.length > 0) {
                                    if (page == 1) {
                                        var data_title = data.data[0]
                                        var detail = [];
                                        for (var i = 1; i < data.data.length; i++) {
                                            detail.push(data.data[i])
                                        }
                                        dataToTable(data_title, detail)
                                    } else {
                                        var data_title = []
                                        var detail = [];
                                        for (var i = 0; i < data.data.length; i++) {
                                            detail.push(data.data[i])
                                        }
                                        dataToTable(data_title, detail)
                                    }
                                }
                            } else {
                                alertmsg(data.msg, 0)
                            }
                        },
                        error: function(data) {
                            //console.log(data)
                        },
                        complete: function(data) {
                            $('.datawork_box .load').hide()
                        }
                    })
                } else {
                    for (var i = 0; i < removeArr.length; i++) {
                        var num = removeArr[i].substr(6) - 1
                        $('.' + removeArr[i]).remove()
                        $('.workdiv' + num).remove()
                    }
                    $('.set_workTop').hide()
                }
            }
        })
        /*数据加工操作项*/
    $('.work_table td').live('dblclick', function() {
        $('.reset_name input').val($(this).children('div').html())
        $('.reset_name input')[0].oldname = $(this).children('div').html()
        $('.reset_name')[0].index = $(this)[0].index
        $('.reset_name')[0].index_y = $(this)[0].index_y
        $('.reset_name').show()
    })
    $('.work_box>div').click(function() {
        var type = $(this).children('span').html()
        var index = $(this).parent()[0].index
        if (type == '重命名(M)') {
            $('.reset_name input').val($(this).parent()[0].txt)
            $('.reset_name input')[0].oldname = $(this).parent()[0].txt
            $('.reset_name')[0].index = $(this).parent()[0].index
            $('.reset_name')[0].index_y = $(this).parent()[0].index_y
            $('.reset_name').show()
        } else if (type == '删除当前列(C)') {
            dataOpera(index, 0, 1, '', '', 'delete')
        } else if (type == '归类统计(S)') {
            $.ajax({
                type: 'GET',
                url: url_ip + '/model/dataetl/',
                cache: false,
                data: { axis_x: index, page: 1, my_mode: 'classify' },
                datatype: 'json',
                headers: { "Authorization": token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        alertmsg(data.msg, 1)
                        $('.classify_box')[0].index_x = index
                        $('.classify_box h2').html('当前列数据归类统计')
                        $('.classify_box table').empty()
                        $('.classify_box table').append('<tr><td>文本内容</td><td>数量</td></tr>')
                        $.each(data.data, function(key, value) {
                            $('.classify_box table').append('<tr><td><span>' + key + '</span><b>修改</b></td><td>' + value + '</td></tr>')
                        })
                        $('.classify_box').show()
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                }
            })
        } else if (type == '数据信息(I)') {
            $.ajax({
                type: 'GET',
                url: url_ip + '/model/dataetl/',
                cache: false,
                data: { axis_x: index, page: 1, my_mode: 'data_attr' },
                datatype: 'json',
                headers: { "Authorization": token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        alertmsg(data.msg, 1)
                        $('.classify_box h2').html('当前列数据信息结果')
                        $('.classify_box table').empty()
                        $('.classify_box table').append('<tr><td>最大值</td><td>' + data._max + '</td></tr><tr><td>平均值</td><td>' + data._mean + '</td></tr><tr><td>中值</td><td>' + data._median + '</td></tr><tr><td>最小值</td><td>' + data._min + '</td></tr><tr><td>标准差</td><td>' + data._std + '</td></tr><tr><td>求和</td><td>' + data._sum + '</td></tr>')
                        $('.classify_box').show()
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                }
            })
        }
    })
    $('.work_box>div ul li').click(function() {
        var type = $(this).children('h5').html()
        var index = $('.work_box')[0].index
            //console.log(index)
        if (type == '向前填充') {
            dataOpera(index, '', 1, '', '', 'x_prevfill')
        } else if (type == '向后填充') {
            dataOpera(index, '', 1, '', '', 'x_nextfill')
        } else if (type == '均值填充') {
            dataOpera(index, '', 1, '', '', 'x_meanfill')
        } else if (type == '0值填充') {
            dataOpera(index, '', 1, '', '', 'x_lingfill')
        } else if (type == '转整数型') {
            dataOpera(index, '', 1, '', '', 'int')
        } else if (type == '转浮点型') {
            dataOpera(index, '', 1, '', '', 'float')
        } else if (type == '转字符型') {
            dataOpera(index, '', 1, '', '', 'str')
        } else if (type == '转日期型') {
            dataOpera(index, '', 1, '', '', 'datetime')
        } else if (type == '全大写') {
            dataOpera(index, '', 1, '', '', 'upper')
        } else if (type == '全小写') {
            dataOpera(index, '', 1, '', '', 'lower')
        } else if (type == '首字母大写') {
            dataOpera(index, '', 1, '', '', 'title')
        } else if (type == '去除逗号') {
            dataOpera(index, '', 1, '', '', 'convert_douhao')
        } else if (type == '去除$符') {
            dataOpera(index, '', 1, '', '', 'convert_daolefu')
        } else if (type == '去除%符') {
            dataOpera(index, '', 1, '', '', 'convert_baifenhao')
        } else if (type == '向前填充(A)') {
            dataOpera('', '', 1, '', '', 'prevfill')
        } else if (type == '向后填充(A)') {
            dataOpera('', '', 1, '', '', 'nextfill')
        } else if (type == '均值填充(A)') {
            dataOpera('', '', 1, '', '', 'meanfill')
        } else if (type == '0值填充(A)') {
            dataOpera('', '', 1, '', '', 'lingfill')
        } else if (type == '去除缺失值') {
            dataOpera('', '', 1, '', '', 'de_value')
        }
    })
    $('.classify_box i').click(function() {
        $('.classify_box').hide()
    })
    $('.classify_box b').live('click', function() {
        var that = $(this)
        if ($(this).html() == '修改') {
            $(this).parent().append('<input type="text" value="' + $(this).prev().html() + '">')
            $(this).html('确定')
        } else if ($(this).html() == '确定') {
            $.ajax({
                type: 'GET',
                url: url_ip + '/model/dataetl/',
                cache: false,
                data: { my_mode: 'text', axis_x: $('.classify_box')[0].index_x, last_text: $(this).prev().html(), re_text: $(this).next().val() },
                datatype: 'json',
                headers: { "Authorization": token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        that.prev().html(that.next().val())
                        that.html('修改')
                        that.next().remove()
                        chexiao()
                        $('.work_box').hide()
                        $('.work_table table').empty()
                        var data_title = data.data[0]
                        var detail = [];
                        for (var i = 1; i < data.data.length; i++) {
                            detail.push(data.data[i])
                        }
                        dataToTable(data_title, detail)
                        alertmsg(data.msg, 1)
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                }
            })
        }
    })

    function chexiao() {
        $('.work_back').show()
    }
    /*数据加工操作项封装事件*/
    function dataOpera(x, y, page, new_text, old_text, type) {
        var json = {}
        if (x !== '') {
            json.axis_x = x
        }
        if (y !== '') {
            json.axis_y = y
        }
        json.page = page
        if (new_text !== '') {
            json.re_text = new_text
        }
        if (old_text !== '') {
            json.last_text = old_text
        }
        json.my_mode = type
            //console.log(json)
        $.ajax({
            type: 'GET',
            url: url_ip + '/model/dataetl/',
            cache: false,
            data: json,
            datatype: 'json',
            headers: { "Authorization": token },
            beforeSend: function() {
                $('.loading').show()
            },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    chexiao()
                    $('.work_box').hide()
                    $('.work_table table').empty()
                    var data_title = data.data[0]
                    var detail = [];
                    for (var i = 1; i < data.data.length; i++) {
                        detail.push(data.data[i])
                    }
                    dataToTable(data_title, detail)
                    alertmsg(data.msg, 1)
                } else {
                    alertmsg(data.msg, 0)
                }
            },
            error: function(data) {
                //console.log(data)
                if (data.status == 401) {
                    if (token == 'JWT undefined' || token == 'JWT null') {
                        $('.shade p').html('您目前还没有注册或登录~ ')
                        $('.shade').show();
                    } else {
                        $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                        $('.shade').show();
                    }
                } else {
                    alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                }
            },
            complete: function() {
                $('.loading').hide()
            }
        })
    }
    /*重命名列取消事件*/
    $('.reset_no').click(function() {
            $('.reset_name').hide()
        })
        /*重命名列确定封装*/
    $('.reset_sure').click(function() {
            var oldname = $(this).prev().children('input')[0].oldname
            var newname = $(this).prev().children('input').val()
            var index = $(this).parent().parent()[0].index
            var index_y = $(this).parent().parent()[0].index_y
            dataOpera(index, index_y, 1, newname, '', 'self_fill')
            $('.reset_name').hide()
        })
        /*数据加工弹窗取消事件*/
    $('.work_no').click(function() {
            window.location.reload()
        })
        /*数据弹窗撤销当前操作事件*/
    $('.work_back').click(function() {
            $.ajax({
                type: 'GET',
                url: url_ip + '/model/rollback/',
                cache: false,
                data: {},
                datatype: 'json',
                headers: { "Authorization": token },
                beforeSend: function() {
                    $('.loading').show()
                },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        $('.work_box').hide()
                        $('.work_table table').empty()
                        var data_title = data.data[0]
                        var detail = [];
                        for (var i = 1; i < data.data.length; i++) {
                            detail.push(data.data[i])
                        }
                        dataToTable(data_title, detail)
                        $('.datawork_box').show()
                        alertmsg(data.msg, 1)
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                    if (data.status == 401) {
                        if (token == 'JWT undefined' || token == 'JWT null') {
                            $('.shade p').html('您目前还没有注册或登录~ ')
                            $('.shade').show();
                        } else {
                            $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                            $('.shade').show();
                        }
                    } else {
                        alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                    }
                },
                complete: function() {
                    $('.loading').hide()
                }
            })
        })
        /*数据弹窗确定事件*/
    $('.work_sure').click(function() {
            $('.baocun_name input').val('')
            $('.baocun_name').show()
        })
        /*保存--确定按钮*/
    $('.baocun_sure').click(function() {
            // var id_num = $('.datawork_box')[0]._id
            // console.log(id_num)
            // var nownode = scene.findElements(function(e) {
            //     return e._id == id_num
            // })
            if ($(this).prev().children('input').val() != '') {
                $.ajax({
                    type: 'GET',
                    url: url_ip + '/model/savedata/',
                    cache: false,
                    data: { new_file: $('.baocun_name input').val() },
                    datatype: 'json',
                    headers: { "Authorization": token },
                    beforeSend: function() {
                        $('.loading').show()
                    },
                    success: function(data) {
                        //console.log(data)
                        if (data.status) {
                            // nownode[0].file = data.data
                            // nownode[0].file_data = data.result_data
                            // nownode[0].text = txtLength(data.name)
                            // nownode[0].nodetext = data.name
                            $('.baocun_name').hide()
                            promiseA()
                            // $('.Tabsjjg img').click()
                            alertmsg(data.msg, 1)
                        } else {
                            alertmsg(data.msg, 0)
                        }
                    },
                    error: function(data) {
                        //console.log(data)
                        if (data.status == 401) {
                            if (token == 'JWT undefined' || token == 'JWT null') {
                                $('.shade p').html('您目前还没有注册或登录~ ')
                                $('.shade').show();
                            } else {
                                $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                                $('.shade').show();
                            }
                        } else {
                            alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                        }
                    },
                    complete: function() {
                        $('.loading').hide()
                    }
                })
            }
        })
        /*保存--取消按钮*/
    $('.baocun_no').click(function() {
            $('.baocun_name').hide()
        })
        /*消息提示弹窗*/
    var lag;

    function alertmsg(msg, num) {
        clearTimeout(lag)
        if (num == 1) {
            $('.msg_box').html('<i class="success"></i><span>' + msg + '</span>')
        } else if (num == 0) {
            $('.msg_box').html('<i class="error"></i><span>' + msg + '</span>')
        } else {
            $('.msg_box').html('<i class="info"></i><span>' + msg + '</span>')
        }
        var h = $('.msg_box span').height() / 2
        $('.msg_box span').css('margin-top', '-' + h + 'px')
        $('.msg_box').css('right', '5px')
        lag = setTimeout(function() {
            $('.msg_box').css('right', '-340px')
        }, 2000)
    }
})