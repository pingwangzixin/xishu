// var token = "JWT " + window.sessionStorage.token;
var infoDatas1 = [];

/* 随机数 */
function GetRandomNum(min, max) {
    var Range = max - min;
    var Rand = Math.random();
    return(min + Math.round(Rand * Range));
}
/* 上-左中 */
function f1_lcPage() {
	$('.f1_l').html('');
	$('.f1_c').html('');
	for(var i = 0;i < infoDatas1Length;i++) {
		if(i == 0) {
			var oHtml_l = '<div class="f_click f1_list f1_list1" data-id="'+infoDatas1[i].id+'">'+
				'<img src="'+ url_ip + infoDatas1[i].cover+'" width="100%" height="100%" alt="图图不见了, 速速顶报数据君">'+
				'<p>'+infoDatas1[i].title+'</p>'+
			'</div>'+
			'<div class="f1_list_clear"></div>';
			$('.f1_l').append(oHtml_l);
		} else if(i == 1 || i == 2) {
			var oHtml_l = '<div class="f_click f1_list f1_list2" data-id="'+infoDatas1[i].id+'">'+
				'<img src="'+ url_ip + infoDatas1[i].cover+'" width="100%" height="100%" alt="图图不见了, 速速顶报数据君">'+
				'<p>'+infoDatas1[i].title+'</p>'+
			'</div>';
			$('.f1_l .f1_list_clear').eq(0).append(oHtml_l);
		} else if(i == 3) {
			var oHtml_l = '<div class="f_click f1_list f1_list1" data-id="'+infoDatas1[i].id+'">'+
				'<img src="'+ url_ip + infoDatas1[i].cover+'" width="100%" height="100%" alt="图图不见了, 速速顶报数据君">'+
				'<p>'+infoDatas1[i].title+'</p>'+
			'</div>';
			$('.f1_l').append(oHtml_l);
		} else if(i ==4) {
			var oHtml_l = '<div class="f_click f1_list color3 f1_list4" data-id="'+infoDatas1[i].id+'">'+infoDatas1[i].title+'</div>';
			$('.f1_l').append(oHtml_l);
		} else if(i == 5 || i== 6) {
			var oHtml_l = '<div class="f_click f1_list f1_list4" data-id="'+infoDatas1[i].id+'">'+infoDatas1[i].title+'</div>';
			$('.f1_l').append(oHtml_l);
		} else if(i >= 7 && i < 26) {
			var oHtml_c = '<div class="f_click f1_list f1_list4" data-id="'+infoDatas1[i].id+'">'+infoDatas1[i].title+'</div>';
			$('.f1_c').append(oHtml_c);
			if((i - 2) % 5 === 0) {
				$('.f1_c .f1_list4:last').addClass('color3');
			}
		}
	}
}
/* 上-右热门 */
function f1_rPage() {
	$('.f1_r>div').remove();
	var arr = [];
	while (arr.length < 9) {
		var arr_i = GetRandomNum(0, infoDatas1Length - 1);
		if(arr.indexOf(arr_i) == -1) {
			arr.push(arr_i);
			if(arr.length == 1 || arr.length == 7) {
				var oHtml_r = '<div class="f_click f1_list f1_list1" data-id="'+infoDatas1[arr_i].id+'">'+
					'<img src="'+ url_ip + infoDatas1[arr_i].cover+'" width="100%" height="100%" alt="">'+
					'<p>'+infoDatas1[arr_i].title+'</p>'+
				'</div>';
				$('.f1_r').append(oHtml_r);
			} else if(arr.length == 2 || arr.length == 8) {
				var oHtml_r = '<div class="f_click f1_list color3 f1_list4" data-id="'+infoDatas1[arr_i].id+'">'+infoDatas1[arr_i].title+'</div>';
				$('.f1_r').append(oHtml_r);
			} else if(arr.length == 3 || arr.length == 9) {
				var oHtml_r = '<div class="f_click f1_list f1_list4" data-id="'+infoDatas1[arr_i].id+'">'+infoDatas1[arr_i].title+'</div>';
				$('.f1_r').append(oHtml_r);
			} else if(arr.length == 4) {
				var oHtml_r = '<div class="f_click f1_list f1_list4" data-id="'+infoDatas1[arr_i].id+'">'+infoDatas1[arr_i].title+'</div><div class="f1_list_clear"></div>';
				$('.f1_r').append(oHtml_r);
			} else if(arr.length == 5 || arr.length == 6) {
				var oHtml_r = '<div class="f_click f1_list f1_list2" style="height: auto;" data-id="'+infoDatas1[arr_i].id+'">'+
					'<div style="height: 74px;overflow: hidden;"><img src="'+ url_ip + infoDatas1[arr_i].cover+'" width="100%" alt=""></div>'+
					'<p style="height: auto;">'+infoDatas1[arr_i].title+'</p>'+
				'</div>'
				$('.f1_r .f1_list_clear').append(oHtml_r);
			}
		}
	}
}
/* 中-左-最新活动 */
function f2_lPage(data2) {
	/* 最新活动 */
	$('.f2_box[data-type="active"]').html('');
	for(var i = 0;i < 5;i++) {
		var odate = new Date(data2[i].add_time);
		var oyear = odate.getFullYear()
		var omonth = ((odate.getMonth()+1 < 9)? ('0' + (odate.getMonth()+1)): (odate.getMonth()+1));
		var oday = (odate.getDate() < 9)? ('0' + odate.getDate()): odate.getDate(); 
		var oHtml2_l = '<div>'+
			'<div class="fl">'+omonth+'/'+oday+'<br><span>'+oyear+'</span></div>'+
			'<div class="f_click fr" data-id="'+data2[i].id+'">'+
				'<h4>'+data2[i].title+'</h4>'+
				'<p>'+data2[i].desc+'</p>'+
			'</div>'+
		'</div>'
		$('.f2_box[data-type="active"]').append(oHtml2_l);
	}
	
	/* 右侧图文 */
	$('.f2_r').html('');
	for(var i = 5;i < 7;i++) {
		var oHtml2_r = '<div data-id="'+data2[i].id+'" class="f_click"><img src="'+ url_ip + data2[i].cover+'"><span>'+data2[i].title+'</span></div>';
		$('.f2_r').append(oHtml2_r);
	}
	calc_f2_l();
}
/* 适配 */
function calc_f2_l() {
	for (var i = 0; i < $('.text').length; i++) {
		$('.text:eq('+i+') h3').css('line-height',$('.text:eq('+i+') h3').height() + 'px')
		if (i != 4) {
			$('.text:eq('+i+') p').css('line-height',$('.text:eq('+i+') p').height() / 3 + 'px')
		} else {
			$('.text:eq('+i+') p').css('line-height',$('.text:eq('+i+') p').height() / 6 + 'px')
		}
	}
	var h = $('.f2_r').height();
	var h_c = (h - 28) / 5;
	$('.f2_l .active_box>div').css({height:h_c + 'px',paddingTop:h_c / 5 + 'px',paddingBottom:h_c / 5 + 'px'})
	$('.f2_l .active_box>div .fl').css('lineHeight',(h_c * 3) / 10 + 'px')
	$('.f2_l .active_box>div .fr').css('lineHeight',(h_c * 3) / 10 + 'px')
}
// 下
function f3_Page(data1) {
	
	$('.f3 ul').html('');
	for(var i = 0;i < data1.length;i++) {
		var oHtml3 = '<li class="f_click" data-id="'+data1[i].id+'">'+
			'<div class="f3_img"><img src="'+ url_ip + data1[i].cover+'"></div>'+
			'<div class="f3_txt">'+
				'<h5>'+data1[i].title+'</h5>'+
				'<p>'+data1[i].desc+'</p>'+
				'<a href="info_detail.html?id='+data1[i].id+'">详情&gt;&gt;</a>'+
			'</div>'+
		'</li>';
		$('.f3 ul').append(oHtml3);
	}
}

$(function () {
// 导航隐藏
	$('nav .nav_cont ul li').eq(0).show().siblings().hide();
	$('nav .nav_cont ul li.person_li').show();
// banner轮播封装
	function lunbo (arr,obj,obj2,obj0,tid_name) {
// 		var n = 1
// 		var w = $(obj0).width();
// 		console.log(w)
// 		for (var i = 0; i < arr.length; i++) {
// 			var li = document.createElement('li');
// 			var li_b = document.createElement('li')
// 			var img = document.createElement('img');
// 			
// 			// $(img).attr('src',arr[i])
// 			$(img).attr('src',url_ip + arr[i].url);
// 			$(li).attr('data-type', arr[i].classify)
// 			
// 			$(li).append(img)
// 			obj.append(li)
// 			obj2.append(li_b)
// 		}
// 		var li0 = document.createElement('li')
// 		var img0 = document.createElement('img')
// 		
// 		// $(img0).attr('src',arr[arr.length - 1])
// 		$(img0).attr('src', url_ip + arr[arr.length - 1].url)
// 		
// 		$(li0).append(img0)
// 		obj.prepend(li0)
// 		var li2 = document.createElement('li')
// 		var img2 = document.createElement('img')
// 		
// 		// $(img2).attr('src',arr[0])
// 		$(img2).attr('src', url_ip + arr[0].url);
// 		
// 		$(li2).append(img2)
// 		obj.append(li2)
// 		$(obj).css({left:-n*w+'px',width:(arr.length+2)*w})
// 		$(obj).children('li').css('width',w+'px')
// 		$(obj2).children('li')[n-1].classList.add('on')
// 		tid_name = setInterval(function () {
// 			n++
// 			if (n > arr.length) {
// 				$(obj2).children('li').removeClass('on')
// 				$(obj2).children('li')[0].classList.add('on')
// 				$(obj).stop(true).animate({left:-n*w+'px'},1000,function () {
// 					n = 1;
// 					$(obj).css('left',-n*w+'px')
// 				})
// 			} else {
// 				$(obj2).children('li').removeClass('on')
// 				$(obj2).children('li')[n-1].classList.add('on')
// 				$(obj).stop(true).animate({left:-n*w+'px'},1000)
// 			}
// 		},8000)
// 		var arr2 = $(obj2).children('li')
// 		$(obj2).delegate('li','click',function () {
// 			n = $(this).index() + 1;
// 			$(obj2).children('li').removeClass('on')
// 			$(obj2).children('li')[n-1].classList.add('on')
// 			$(obj).stop(true).animate({left:-n*w+'px'},1000)
// 			clearInterval(tid_name);
// 			tid_name = setInterval(function () {
// 				n++
// 				if (n > arr.length) {
// 					$(obj2).children('li').removeClass('on')
// 					$(obj2).children('li')[0].classList.add('on')
// 					$(obj).stop(true).animate({left:-n*w+'px'},1000,function () {
// 						n = 1;
// 						$(obj).css('left',-n*w+'px')
// 					})
// 				} else {
// 					$(obj2).children('li').removeClass('on')
// 					$(obj2).children('li')[n-1].classList.add('on')
// 					$(obj).stop(true).animate({left:-n*w+'px'},1000)
// 				}
// 			},5000)
// 		})
// 		//暂停-打开
// 		$(obj0).on({
// 			mouseover: function () {
// 				clearInterval(tid_name);
// 			},
// 			mouseout: function () {
// 				clearInterval(tid_name);
// 				tid_name = setInterval(function () {
// 					n++
// 					if (n > arr.length) {
// 						$(obj2).children('li').removeClass('on')
// 						$(obj2).children('li')[0].classList.add('on')
// 						$(obj).stop(true).animate({left:-n*w+'px'},1000,function () {
// 							n = 1;
// 							$(obj).css('left',-n*w+'px')
// 						})
// 					} else {
// 						$(obj2).children('li').removeClass('on')
// 						$(obj2).children('li')[n-1].classList.add('on')
// 						$(obj).stop(true).animate({left:-n*w+'px'},1000)
// 					}
// 				},5000)
// 			}
// 		})
	}
	// var tid;/*咨询页轮播循环调用变量*/
// banner数据获取
	// var img_arr = [];
// 	$.ajax({
// 		url:url_ip + '/operatorsettings/banners/',
// 		type:'GET',
// 		data:{},
// 		dataType:'json',
// 		success:function (data) {
// 			console.log(data)
// 			if (data.status) {
// // 				for (var i = 0; i < data.data.length; i++) {
// // 					img_arr.push(url_ip + data.data[i])
// // 				}
// 				lunbo(data.data,$('.banner_box'),$('.banner_btn'),$('.banner'),tid);
// 			}
// 		},
// 		error:function (data) {
// 			console.log(data)
// 		}
// 	})

	// f2选项卡点击
	$('.f2_l li').click(function () {
		$('.f2_l li').removeClass('on')
		$(this).addClass('on')
		$('.f2_box').hide();
		var name = $(this).attr('data-name')
		$('.'+name+'_box').show();
	})
	// 资讯列表页
	$.ajax({
		url:urlip + '/news/new/',
		type:'GET',
		cache:false,
		async:false,
		data:{},
		dataType:'json',
		// headers:{'Authorization':token},
		success: function (res) {
			// console.log(res)
			if(res.status) {
				infoDatas1 = res.data3;
				infoDatas1Length = res.data3.length;
				// 上左-上中
				f1_lcPage();
				// 上右
				f1_rPage();
				// 中-左最新活动-右
				f2_lPage(res.data2);
				// 下
				f3_Page(res.data1);
			}
		},
		error: function (data) {
			console.log(data)
		}
	})
	//热门推荐换一批
	$('.f1_r h3').on('click', 'span', function () {
		f1_rPage();
	})
	//进入详情页
	$('.info_center').on('click', '.f_click', function () {
		window.location.href = 'info_detail.html?id=' + $(this).attr('data-id');
	})
})