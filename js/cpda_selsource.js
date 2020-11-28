var allscore = 0;
function calcFn() {
	var scrollH = $('.sel_C').height();
	// 左侧滚动条
	$(".sel_LCont").height(scrollH).slimScroll({
		height: scrollH,
		borderRadius: "0px"
	});
	
	// 右侧滚动条
	$(".sel_RCont").slimScroll({
		height: scrollH,
		borderRadius: "0px"
	});
	//选课说明滚动条
	$('.sel_alert .sel_alertCont').slimScroll({
		height: 288,
		borderRadius: "0px"
	});
}
//引导显示
var stepI = 0;
function stepShowFn(stepI) {
	$('#yindaoye').show();
	$('#yindaoye .stepTip li').eq(stepI).show().siblings().hide();
	$('#yindaoye .stepInfo').children('p').hide();
	$('#yindaoye .stepInfo').children('p[data-step="' + (stepI + 1) + '"]').show();
}
function stepFn() {
	// 引导test
	var x1 = $('.sel_LCont li').eq(0).offset().left;
	var y1 = $('.sel_LCont li').eq(0).offset().top;
	var html1 = $('.sel_LCont li').eq(0).html();
	$('#yindaoye .step01').html(html1).css({ position: 'absolute', left: x1, top: y1 });

	var x2 = $('.sel_T .sel_TCont p').offset().left;
	var y2 = $('.sel_T .sel_TCont').offset().top;
	var html2 = $('.sel_T .sel_TCont p').html();
	$('#yindaoye .step02').html(html2).css({ position: 'absolute', left: x2, top: y2 });

	var height3 = $('.sel_R').height();
	var x3 = $('.sel_R').offset().left;
	var y3 = $('.sel_R').offset().top;
	var html3 = $('.sel_R .slimScrollDiv').html();
	$('#yindaoye .step03').html(html3).css({ height: height3, position: 'absolute', left: x3, top: y3 });
	stepShowFn(stepI)
	$('#yindaoye .btnFoo').on('click', 'span', function () {
		var nowItem = $(this).attr('data-item');
		if (nowItem == 'close') {
			$('#yindaoye').fadeOut().remove();
			stepI = 0;
		} else {
			if (stepI >= 2) {
				$('#yindaoye').fadeOut().remove();
				stepI = 0;
			} else {
				stepI++;
				stepShowFn(stepI)
			}
		}
	})
}
function isStepFn() {
	// 先判断有无引导页
	var dataObjData = get('information', 1000 * 60 * 60 * 24 * 30);//过期时间为30天
	if (dataObjData != '' && dataObjData.name == user_name_) {
		// 不需要引导
	} else {
		set('information', '{"name":"' + user_name_ + '"}');
		stepFn();
	}
}
// 计算积分
function calcScoreFn(_this, quandan) {
	if (quandan == 'dan') {
		var changeScore = $(_this).attr('data-score') - 0
		if ($(_this).hasClass('active')) {
			allscore += changeScore;
		} else {
			allscore -= changeScore;
		}
	} else if (quandan == 'quan') {
		if ($(_this).hasClass('active')) {
			allscore += changeScore;
		} else {
			allscore -= changeScore;
		}
	}
	$(_this).closest('.tabCont_det').find('ul li.active').each(function (i, ele) {
		console.log(i, ele)
	})
}
//选课说明文本
function selInstructionFn() {
	$('.sel_alert .sel_alertCont').html(selInstructionData.cont)
}
//选课tab及内容
function course_listFn() {
	$.GSHajax({
		url: '/operatorsettings/course_list/',
		dom: '.loadingGif',
		success: function (res) {
			if (res.status) {
				$('.sel_B .myScore').html(res.mycoin);
				$('.sel_L .sel_LCont').html('');
				$('.sel_R .sel_RCont').html('');
				var sel_Ltxt = '';
				for (var i = 0; i < res.data.length; i++) {
					sel_Ltxt += '<li data-id="' + res.data[i].first_title.id + '">' + (i + 1) + ' ' + res.data[i].first_title.name + '<i>&gt;</i></li>'
					$('.sel_L .sel_LCont').html(sel_Ltxt);
					$('.sel_R .sel_RCont').append('<div class="tabCont" data-item=""></div>') // 右侧每个tabCont
					var isSelTitl = '';
					for (var j = 0; j < res.data[i].second_title.length; j++) {
						var sel_Rtitl = '';
						var sel_Rtitl2 = '';
						for (var k = 0; k < res.data[i].second_title[j].course.length; k++) {
							var course_type = (res.data[i].second_title[j].course[k].course_type == 2? '必修': '选修');
							var isActive = '';
							switch(res.youxiao) {
								case 0: //默认不选必修-过期学员
									;
									break;
								case 1: //默认选必修-新学员
									if(res.data[i].second_title[j].course[k].select == 'noSel') {
										if(res.data[i].second_title[j].course[k].course_type == 2) {
											isActive = 'active';
											allscore += (res.data[i].second_title[j].course[k].integral - 0);
										}
									};
								break;
							}
							// isSelTitl = (res.data[i].second_title[j].course[k].select == 'hasSel' ? '已选过当前课程, 无需重复购买' : '');
							sel_Rtitl2 += '<li class="'+res.data[i].second_title[j].course[k].select+ ' '+isActive+'" title="'+isSelTitl+'" data-id="'+res.data[i].second_title[j].course[k].id+'" data-score="'+res.data[i].second_title[j].course[k].integral+'" data-abstract="'+res.data[i].second_title[j].course[k].abstract+'"><b class="isSel"></b><span>'+res.data[i].second_title[j].course[k].name+'</span><i>'+course_type+'</i></li>';
						}
						sel_Rtitl += '<div class="tabCont_det">' +
							'<h3 class="tabCont_titl"><i class="sel_icon"></i>' + res.data[i].second_title[j].name + '</h3>'+
							'<ul class="tabCont_ul">' +
							sel_Rtitl2 +
							'</ul>' +
						'</div>';
						$('.sel_RCont').children('.tabCont').eq(i).append(sel_Rtitl)
					}
				}
				$('.sel_B .allScore').html(allscore);
				$('.sel_L .sel_LCont').children('li').eq(0).addClass('active');
				$('.sel_R .sel_RCont').children('.tabCont').eq(0).show();
				isStepFn();
			} else {

			}
		}
	})
}
$(function () {
	//犀数币赋值
	$('.x_shu_Name').html(xs_bi_);
	if (token == 'JWT undefined' || token == 'JWT null') {
		$('.shade').showMsg();
	}
	// $('.shade').on('click', '.lkw-msg-box-close', function () {
	// 	window.history.go(-1);
	// 	setTimeout(function () {
	// 		window.location.href = 'index.html';
	// 	}, 200)
	// })
	//个性样式
	$('.sel_R .sel_RCont').on('mouseenter', 'li', function () {
		var _html = $(this).attr('data-abstract');
		$('.mytooltip').html(_html); //先填充文本, 获取盒子宽高, 判断是否超出浏览器范围
		var x1 = $(this).offset().left;
		var y1 = $(this).offset().top + 35;
		var nowIndex = $(this).index() - 0;
		if (nowIndex % 4 == 3) {
			x1 = x1 + $(this).outerWidth() - $('.mytooltip').outerWidth();
		}
		// 控制title上下位置
		var y2 = y1 + $(this).outerHeight() + 35 + $('.mytooltip').outerHeight();
		if(y2 >= $(window).height()) {
			y1 = y1 - 35 - $('.mytooltip').outerHeight() - 8;
			$('.mytooltip').addClass('top_mytooltip');
		} else {
			$('.mytooltip').removeClass('top_mytooltip');
		}
		$('.mytooltip').show().css({ left: x1, top: y1 });
		if (nowIndex % 4 == 3) {
			$('.mytooltip').addClass('mytooltipR');
		} else {
			$('.mytooltip').removeClass('mytooltipR');
		}
	})
	$('.sel_R .sel_RCont').on('mouseleave', 'li', function () {
		$('.mytooltip').hide().html('');
	})

	calcFn();
	selInstructionFn();
	course_listFn();
	// tab点击
	$('.sel_L .sel_LCont').on('click', 'li', function () {
		var nowI = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('.sel_R .sel_RCont').children('.tabCont').eq(nowI).show().siblings().hide();
	})
	// 顶部按钮
	$('.sel_T p').on('click', 'a', function () {
		var nowType = $(this).attr('data-type');
		if (nowType == 'lk') {

		} else if (nowType == 'xk') {
			$('.sel_alertMu').stop().fadeIn();
		}
	})
	//弹窗关闭
	$('.sel_alert').on('click', '.close', function () {
		$('.sel_alertMu').stop().fadeOut();
	})
	$('.selpayAlert').on('click', '.close', function () {
		$('.selpayAlertMu').stop().fadeOut();
	})
	// 全选
	$('.sel_RCont').on('click', '.sel_icon', function () {
		if($(this).closest('.tabCont_det').find('ul li.noSel').length == 0) {
			return; // 判断子集是否全不能选
		}
		// 先获取改变全选之前的积分
		var this_oldScore = 0;
		
		$(this).closest('.tabCont_det').find('ul li.noSel.active').each(function (i, ele) {
			this_oldScore += ($(ele).attr('data-score') - 0);
			
		})
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$(this).closest('.tabCont_det').find('ul li.noSel').addClass('active');
			// 全选-获取当下积分和
			var this_newScore = 0;
			$(this).closest('.tabCont_det').find('ul li.noSel.active').each(function (i, ele) {
				this_newScore += ($(ele).attr('data-score') - 0);
			})
			// 差值, 加到总积分
			allscore += (this_newScore - this_oldScore);
		} else {
			$(this).closest('.tabCont_det').find('ul li.noSel').removeClass('active');
			// 全不选, 当下积分和为0, 总积分-取消全选之前的积分和
			allscore -= this_oldScore;
		}
		$('.sel_B .allScore').html(allscore);
	})
	// 单选
	$('.sel_RCont').on('click', 'li.hasSel ', function () {
		$('.alertMsg').showMsg({isImg: 'isNo', h2txt: '您已经添加该课程<br />请去我的订单或我的课程查看', setTime: 3000});
	})
	$('.sel_RCont').on('click', 'li.noSel', function () {
		$(this).toggleClass('active');
		// 先改变选中状态, 再加减总积分
		var changeScore = $(this).attr('data-score') - 0
		if ($(this).hasClass('active')) {
			allscore += changeScore;
		} else {
			allscore -= changeScore;
		}
		$('.sel_B .allScore').html(allscore);
		if ($(this).parent('ul').children('li.noSel.active').length == $(this).siblings().length + 1) {
			$(this).closest('.tabCont_det').find('.sel_icon').addClass('active');
		} else {
			$(this).closest('.tabCont_det').find('.sel_icon').removeClass('active');
		}
	})
	//确认选择-弹出提示
	var objArr = [];
	$('.sel_B').on('click', '.btn', function () {
		objArr = [];
		$('.tabCont').find('li.active').each(function (i, ele) {
			var obj = {};
			obj.category = 'cpda';
			obj.category_id = $(ele).attr('data-id');
			obj.is_score = 'yes';
			obj.cost = $(ele).attr('data-score');
			obj.dis = {};//优惠券
			objArr.push(obj)
		})
		if (objArr.length != 0) {
			// $('.selpayAlertMu').stop().fadeIn();
			$('.selpayAlert .btn').click()
		} else {
			$('.alertMsg').showMsg({isImg: 'isNo', h2txt: '请至少选择一门课', setTime: 3000});
		}
	})
	//确认选择-支付
	var fuckClick = true;
	$('.selpayAlert').on('click', '.btn', function () {
		if(fuckClick) {
			fuckClick = false;
			if (objArr.length != 0) {
				$.GSHajax({
					url: '/pay/createorder/',
					data: { data: JSON.stringify(objArr) },
					success: function (res) {
						if (res.status) {
							$('.alertMsg').showMsg({isImg: 'isOk', h2txt: res.msg + ', 将为您跳转到订单页', setTime: 3000});
							$('.selpayAlertMu').stop().fadeOut();
							course_listFn();
							setTimeout(function () {
								window.location.href = 'perscen-dd.html'
							}, 1000)
						} else {
							$('.alertMsg').showMsg({isImg: 'isNo', h2txt: res.msg, setTime: 3000});
						}
						fuckClick = true;
					},
					error: function (err) {
						if (err.status == 401) {
							$('.shade').showMsg();
						} else {
							$('.alertMsg').showMsg({isImg: 'isNo', h2txt: '服务异常, 请联系我们'+err.status, setTime: 3000});
						}
						fuckClick = true;
					}
				})
			}
		}
	})
})
$(window).resize(function () {
	calcFn();
	var scrollH = $('.sel_C').height();
	// 左侧滚动条
	$(".sel_LCont").height(scrollH).slimScroll({
		height: scrollH,
		borderRadius: "0px"
	});
	
	// 右侧滚动条
	$(".sel_RCont").slimScroll({
		height: scrollH,
		borderRadius: "0px"
	});
});
$(function () {
	//获取当前时间 
	var date = new Date();
	var expiresDays = 10;
	//将date设置为10天以后的时间 
	date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
	//将userId和userName两个cookie设置为10天后过期 
	document.cookie = "userId=828; userName=hulk; expires=" + date.toGMTString();
})
$(window).resize(function () {
	calcFn();
});