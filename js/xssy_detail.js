// var token = "JWT " + window.sessionStorage.token;
var tid;
var label_toggle = true;/*判断label开关的变量*/
var _id;
var data_algo = 'course';
var id = window.location.search;
var tid2;/*倒计时计时器*/
id = id.substr(1)
_id = id
//console.log(id)
$(function () {
	$.ajax({
		type:'GET',
		url:url_ip + '/files/course/?course_id='+id,
		cache:true,
		data:{},
		datatype:'json',
		success:function (data) {
			//console.log(data)
			if (data.status) {
				var time_end = new Date(data.data1[0].activity_end).getTime();
				var time_begin = new Date().getTime();
				var time = time_end - time_begin
				time = Math.floor(time / 1000);
				tid2 = setInterval(function () {
					time --;
					var hours = (parseInt(time/3600) < 10 ? '0'+parseInt(time/3600) : parseInt(time/3600))
					var minutes = (parseInt((time%3600)/60) < 10 ? '0'+parseInt((time%3600)/60) : parseInt((time%3600)/60))
					var seconds = ((time%3600)%60 < 10 ? '0'+(time%3600)%60 : (time%3600)%60)
					if (time <= 0) {
						$('.hours').html('00')
						$('.minutes').html('00')
						$('.seconds').html('00')
					} else {
						$('.hours').html(hours)
						$('.minutes').html(minutes)
						$('.seconds').html(seconds)	
					}
				},1000)
				if (data.data1[0].teacher_name != '') {
					$('.detail_top h1').html(data.data1[0].name+'——'+data.data1[0].teacher_name)
				} else {
					$('.detail_top h1').html(data.data1[0].name)
				}
				for (var k = 0; k < data.data1[0].label.length; k++) {
					var li = document.createElement('li')
					$(li).html(data.data1[0].label[k]);
					$('.label ul').append(li)
				}
				$('.numb span').html(data.data1[0].chapter)
				$('.date span').html(data.data1[0].term)
				$('.msg img').attr('src',url_ip+data.data1[0].cover)
				for (var i = 0; i < data.data2.length; i++) {
					if (data.data2[i].data3) {
						var html = '<tr class="tr3">'+
										'<td><div></div></td>'+
										'<td></td>'+
										'<td></td>'+
										'<td></td>'+
										'<td></td>'+
										'<td></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr class="tr">'+
										'<td class="noborder1">'+data.data2[i].catalog+'.</td>'+
			                            '<td>'+data.data2[i].nameS+'<a href="'+data.data2[i].url+'" class="'+data.data2[i].listen+'"><img src="img/play.jpg">试听</a></td>'+
			                            '<td>全部<div class="td_label'+i+'"></div></td>'+
			                            '<td>'+data.data2[i].create_time+'</td>'+
			                            '<td>'+data.data2[i].duration+'分钟</td>'+
			                            // '<td>￥'+data.data2[i].price+'</td>'+
			                            // '<td><i id="'+data.data2[i].id+'" class="i1 '+data.data2[i].is_sell+'"></i></td>'+
										'<td style="display: none important;><i id="'+data.data2[i].id+'" class="i1"></i></td>'+
			                        '</tr>'
		            	$('.li_box:eq(0) table').append(html)
		            	for (var k = 0; k < data.data2[i].data3.length; k++) {
		            		if (k != data.data2[i].data3.length - 1) {
			            		var html2 = '<tr class="tr tr2">'+
												'<td  class="noborder2"></td>'+
					                            '<td>'+data.data2[i].data3[k].catalog+' '+data.data2[i].data3[k].nameT+'<a href="'+data.data2[i].data3[k].url+'" class="'+data.data2[i].data3[k].listen+'"><img src="img/play.jpg">试听</a></td>'+
					                            '<td>全部<div class="td_label_'+i+k+'"></div></td>'+
					                            '<td>'+data.data2[i].data3[k].create_time+'</td>'+
					                            '<td>'+data.data2[i].data3[k].duration+'分钟</td>'+
					                            // '<td>￥'+data.data2[i].data3[k].price+'</td>'+
					                            '<td><i id="'+data.data2[i].data3[k].id+'" class="i2 '+data.data2[i].data3[k].is_sell+'"></i></td>'+
					                        '</tr>'	
		                    } else {
		                    	//console.log(333)
		                    	var html2 = '<tr class="tr tr2">'+
												'<td  class="noborder3"></td>'+
					                            '<td>'+data.data2[i].data3[k].catalog+' '+data.data2[i].data3[k].nameT+'<a href="'+data.data2[i].data3[k].url+'" class="'+data.data2[i].data3[k].listen+'"><img src="img/play.jpg">试听</a></td>'+
					                            '<td>全部<div class="td_label_'+i+k+'"></div></td>'+
					                            '<td>'+data.data2[i].data3[k].create_time+'</td>'+
					                            '<td>'+data.data2[i].data3[k].duration+'分钟</td>'+
					                            // '<td>￥'+data.data2[i].data3[k].price+'</td>'+
					                            '<td><i id="'+data.data2[i].data3[k].id+'" class="i2 '+data.data2[i].data3[k].is_sell+'"></i></td>'+
					                        '</tr>'	
		                    }
				            $('.li_box:eq(0) table').append(html2)
				            for (var l = 0; l < data.data2[i].data3[k].label.length; l++) {
				            	var	span = document.createElement('span');
				            	$(span).html(data.data2[i].data3[k].label[l])
				            	$('.td_label_'+i+k).append(span)
				            }
		            	}
					} else {
						var html = '<tr class="tr3">'+
										'<td><div></div></td>'+
										'<td></td>'+
										'<td></td>'+
										'<td></td>'+
										'<td></td>'+
										'<td></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr class="tr">'+
										'<td>'+data.data2.catalog+'.</td>'+
			                            '<td>'+data.data2[i].nameS+'<a href="'+data.data2[i].url+'" class="'+data.data2[i].listen+'"><img src="img/play.jpg">试听</a></td>'+
			                            '<td>全部<div class="td_label'+i+'"></div></td>'+
			                            '<td>'+data.data2[i].create_time+'</td>'+
			                            '<td>'+data.data2[i].duration+'分钟</td>'+
			                            '<td>￥'+data.data2[i].price+'</td>'+
			                            '<td"><i id="'+data.data2[i].id+'" class="i1 '+data.data2[i].is_sell+'"></i></td>'+
			                        '</tr>'	
		            	$('.li_box:eq(0) table').append(html)
					}
		            for (var j = 0; j < data.data2[i].label.length; j++) {
		            	var	span = document.createElement('span');
		            	$(span).html(data.data2[i].label[j])
		            	$('.td_label'+i).append(span)
		            }
				}
				$('.li_box:eq(1)').html(data.data1[0].content)
				$('.li_box:eq(2)').html(data.data1[0].feature)
				$('.li_box:eq(3)').html(data.data1[0].teacher)
				$('.all_comment2 span').html(data.data1[0].comment_num)	
			} else {
				$('.li_box:eq(1)').html(data.msg)
			}
		},
		error:function (data) {
			//console.log(data)
		}
	})
	$('.label em').live('click',function () {
		if (label_toggle) {
			$(this).prev().children('li').show();
			$(this).css('transform','rotate(180deg)')
		} else {
			$(this).prev().children('li').hide();
			$(this).prev().children('li:lt(4)').show();
			$(this).css('transform','rotate(0deg)')
		}
		label_toggle = !label_toggle
	})
	$('.li_btn').click(function () {
		$('.li_btn').removeClass('on');
		$(this).addClass('on');
		$('.li_box').removeClass('on')
		if ($(this).html() == '章节资源') {
			$('.li_box:eq(0)').addClass('on')
		} else if ($(this).html() == '课程介绍') {
			$('.li_box:eq(1)').addClass('on')
		} else if ($(this).html() == '课程特色') {
			$('.li_box:eq(2)').addClass('on')
		} else if ($(this).html() == '授课老师') {
			$('.li_box:eq(3)').addClass('on')
		} else {
			$('.li_box:eq(4)').addClass('on')
		}
	})
	$('.li_box .tr').live('mouseenter',function () {
		$(this).addClass('on')
	})
	$('.li_box .tr').live('mouseleave',function () {
		$('.li_box .tr').removeClass('on')
	})
	// $('.tr td .i1.on').live('click',function () {
	$('.tr td .i1').live('click',function () {
		var id = $(this)[0].id
		//console.log(id)
		$.ajax({
			type:'POST',
			// type:'GET',
			url:url_ip + '/pay/addmycart/',
			cache:true,
			data:{goods:'wecourses',goods_id:id},
			datatype:'json',
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
				if (data.status) {
					$('.alertMsg').showMsg({isImg: 'isOk', h2txt: data.msg});
					lkwStorage()
				} else {
					$('.alertMsg').showMsg({isImg: 'isNo', h2txt: data.msg});
				}
			},
			error:function (data) {
				if(token != 'JWT undefined' && token != 'JWT null'){
					
				}else{
					$('.shade').showMsg();
				}
				//console.log(data)
			}
		})
	})
	$('.tr td .i2.on').live('click',function () {
		var id = $(this)[0].id
		//console.log(id)
		$.ajax({
			type:'POST',
			// type:'get',
			url:url_ip + '/pay/addmycart/',
			cache:true,
			data:{goods:'wecourset',goods_id:id},
			datatype:'json',
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
				if (data.status) {
					$('.alertMsg').showMsg({isImg: 'isOk', h2txt: data.msg});
					lkwStorage()
				} else {
					$('.alertMsg').showMsg({isImg: 'isNo', h2txt: data.msg});
				}
			},
			error:function (data) {
				//console.log(data)
			}
		})
	})
	$('.btn .add').live('click',function () {
		$.ajax({
			type:'POST',
			// type:'get',
			url:url_ip + '/pay/addmycart/',
			cache:true,
			data:{goods:'wecourse',goods_id:id},
			datatype:'json',
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
				if (data.status) {
					$('.alertMsg2').showMsg({
						isImg: 'isOk',
						h2txt: '添加成功',
						ptxt: '请到个人中心>我的收纳查看, <a href="perscen-sn.html" style="color: #496FFF;text-decoration:underline">查看</a>',
						setTime: 1500
					});
					lkwStorage()
				} else {
					$('.alertMsg').showMsg({isImg: 'isNo', h2txt: data.msg, setTime: 3000});
				}
			},
			error:function (data) {
				//console.log(data)
				if (data.status == 401) {
					$('.shade').showMsg();
				}
			}
		})
	})
	function get_shouna () {
		$.ajax({
			type:'GET',
			url:url_ip + '/pay/mycart/',
			data:{},
			dataType:'json',
			headers:{'Authorization':token},
			success:function (data) {
				//console.log(data)
				if (data.status) {
					$('.shouna_weike ul').empty()
					$('.shouna_algo ul').empty()
					$('.shouna_data ul').empty()
					var nb = 0;
					for (var i = 0; i < data.cart.length; i++) {
						if (data.cart[i].category == '微课') {
							var html = '<li class="'+data.cart[i].id+'" name="wecourse"><em>'+data.cart[i].selected+'节</em><span>'+data.cart[i].name+'</span><i>-</i></li>'
							$('.shouna_weike ul').append(html)
						} else if (data.cart[i].category == '算法') {
							var html = '<li class="'+data.cart[i].id+'" name="algorithm"><em>'+data.cart[i].num+'</em><span>'+data.cart[i].name+'</span><i>-</i></li>'
							$('.shouna_algo ul').append(html)
						} else if (data.cart[i].category == '数据') {
							nb++;
							var html = '<li class="'+data.cart[i].id+'" name="data"><em>'+nb+'.</em><span>'+data.cart[i].name+'</span><i>-</i></li>'
							$('.shouna_data ul').append(html)
						}
					}
					$('.shouna_weike h3 i').html($('.shouna_weike li').length)
					$('.shouna_algo h3 i').html($('.shouna_algo li').length)
					$('.shouna_data h3 i').html($('.shouna_data li').length)
					$('.shouna_box p span').html(Number($('.shouna_weike h3 i').html()) + Number($('.shouna_algo h3 i').html()) + Number($('.shouna_data h3 i').html()))
					$('.fixed_shouna>em').html($('.shouna_box p span').html())
				} else {
					$('.alertMsg').showMsg({isImg: 'isNo', h2txt: data.msg});
				}
			},
			error:function (data) {
				//console.log(data)
			}
		})
	}
	function alertmsg (msg,tag,num) {
		// var top = $('.msgbox').offset().top + 331
		// //console.log(top)
		// $('.msgbox').css('top',top)
		$('.mu').show();
		$('.msgbox img').removeClass('on')
		if (num == 1) {
			$('.success').addClass('on')
			$('.msgbox span').css('color','#06415E')
		} else {
			$('.fail').addClass('on')
			$('.msgbox span').css('color','#DC1010')
		}
		$('.msgbox span').html(msg);
		$('.msgbox').fadeIn();
		var timeout
		clearTimeout(timeout)
		timeout = setTimeout(function () {
			$('.msgbox').fadeOut();
			$('.mu').hide();
		},2000)
	}
})