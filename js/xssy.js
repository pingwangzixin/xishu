// var token = "JWT " + window.sessionStorage.token;
var tid;
$(function () {
	// 联系我们
	var touch_us = document.createElement('a');
	$(touch_us).html('请联系我们，反馈这个错误')
	$(touch_us).attr('href','feedback.html')
	// 消息提示msgbox
	function alertmsg (msg,tag,num) {
		var top = $('.msgbox').offset().top + 331
		// console.log(top)
		$('.msgbox').css('top',top)
		var h = $('body').height();
		$('.mu2').css('height',h)
		$('.mu2').show();
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
			$('.mu2').hide();
		},2000)
	}
	// 分页
	var now_page = 1;
	var all_page;
	var now_page2 = 1;
	var all_page2;
	$('.ycl_page ul li').css('display','none');
	$('.ycl_page ul span').css('display','none');
	$('.ycl_page ul li:lt(5)').css('display','inline-block');
	$('.last_dian').css('display','inline-block');
	// 分页1
	$('.course1 ul li').live('click',function () {
		now_page = Number($(this).html());
	})
	$('.course1 .first_page').live('click',function () {
		now_page = 1;
	})
	$('.course1 .last_page').live('click',function () {
		now_page = all_page;
	})
	$('.course1 .pre_page').live('click',function () {
		if (now_page > 1) {
			now_page--;
		}
	})
	$('.course1 .next_page').live('click',function () {
		if (now_page < all_page) {
			now_page++;
		}
	})
	$('.course1 .to_page').live('click',function () {
		var a = Number($('.course1 .will_page').val());
		if (a >= 1 && a <= all_page) {
			now_page = a;
		}
	})
	setInterval(function() {
		if (now_page == 1) {
			// $('.course1 .next_page').css({color:'#174E69',borderColor:'#06415E'})
			// $('.course1 .pre_page').css({color:'#ccc',borderColor:'#ccc'})
			$('.course1 .pre_page img').attr('src', 'img/buzuo.png'); //lkw1012修改
			$('.course1 .next_page img').attr('src', 'img/weiyou.png'); //lkw1012修改
			$('.course1 ul li').removeClass('now_page');
			$('.course1 ul li').eq(0).addClass('now_page');
		} else if (now_page > 1 && now_page < all_page) {
			// $('.course1 .pre_page').css({color:'#174E69',borderColor:'#06415E'})
			$('.course1 .pre_page img').attr('src', 'img/weizuo.png'); //lkw1012修改
			$('.course1 .next_page img').attr('src', 'img/weiyou.png'); //lkw1012修改
			// $('.course1 .next_page').css({color:'#174E69',borderColor:'#06415E'})
			$('.course1 ul li').removeClass('now_page');
			$('.course1 ul li').eq(now_page - 1).addClass('now_page');
		} else if (now_page == all_page) {
			// $('.course1 .pre_page').css({color:'#174E69',borderColor:'#06415E'})
			$('.course1 .pre_page img').attr('src', 'img/weizuo.png'); //lkw1012修改
			$('.course1 .next_page img').attr('src', 'img/buyou.png'); //lkw1012修改
			// $('.course1 .next_page').css({color:'#ccc',borderColor:'#ccc'})
			$('.course1 ul li').removeClass('now_page');
			$('.course1 ul li').eq(all_page - 1).addClass('now_page');
		}
	},0)
	setInterval(function() {
		if ($('.course1 .now_page').html() <= 4) {
			$('.course1 ul li').css('display','none');
			$('.course1 .span').css('display','none');
			$('.course1 ul li:lt(5)').css('display','inline-block');
			$('.course1 .last_dian').css('display','inline-block');
		} else if ($('.course1 .now_page').html() <= all_page - 4 && $('.course1 .now_page').html() > 4) {
			var a1 = $('.course1 .now_page').html() - 3;
			var a2 = $('.course1 .now_page').html() - 2;
			var a3 = $('.course1 .now_page').html() - 1;
			var a4 = $('.course1 .now_page').html();
			var a5 = parseInt($('.course1 .now_page').html()) + 1;
			$('.course1 ul li').css('display','none');
			$('.course1 .span').css('display','inline-block');
			$('.course1 ul li:eq('+ a1 +')').css('display','inline-block');
			$('.course1 ul li:eq('+ a2 +')').css('display','inline-block');
			$('.course1 ul li:eq('+ a3 +')').css('display','inline-block');
			$('.course1 ul li:eq('+ a4 +')').css('display','inline-block');
			$('.course1 ul li:eq('+ a5 +')').css('display','inline-block');
		} else if ($('.course1 .now_page').html() > all_page - 4) {
			var a6 = all_page - 6;
			$('.course1 ul li').css('display','none');
			$('.course1 .span').css('display','none');
			$('.course1 ul li:gt('+ a6 +')').css('display','inline-block');
			$('.course1 .left_dian').css('display','inline-block');
		};
	},0)
	// 分页2
	$('.course2 ul li').live('click',function () {
		now_page2 = Number($(this).html());
	})
	$('.course2 .first_page').live('click',function () {
		now_page2 = 1;
	})
	$('.course2 .last_page').live('click',function () {
		now_page2 = all_page2;
	})
	$('.course2 .pre_page').live('click',function () {
		if (now_page2 > 1) {
			now_page2--;
		}
	})
	$('.course2 .next_page').live('click',function () {
		if (now_page2 < all_page2) {
			now_page2++;
		}
	})
	$('.course2 .to_page').live('click',function () {
		var a = Number($('.course2 .will_page').val());
		if (a >= 1 && a <= all_page2) {
			now_page2 = a;
		}
	})
	setInterval(function() {
		if (now_page2 == 1) {
			$('.course2 .next_page').css({color:'#174E69',borderColor:'#06415E'})
			$('.course2 .pre_page').css({color:'#ccc',borderColor:'#ccc'})
			$('.course2 ul li').removeClass('now_page');
			$('.course2 ul li').eq(0).addClass('now_page');
		} else if (now_page2 > 1 && now_page2 < all_page2) {
			$('.course2 .pre_page').css({color:'#174E69',borderColor:'#06415E'})
			$('.course2 .next_page').css({color:'#174E69',borderColor:'#06415E'})
			$('.course2 ul li').removeClass('now_page');
			$('.course2 ul li').eq(now_page2 - 1).addClass('now_page');
		} else if (now_page2 == all_page2) {
			$('.course2 .pre_page').css({color:'#174E69',borderColor:'#06415E'})
			$('.course2 .next_page').css({color:'#ccc',borderColor:'#ccc'})
			$('.course2 ul li').removeClass('now_page');
			$('.course2 ul li').eq(all_page2 - 1).addClass('now_page');
		}
	},0)
	setInterval(function() {
		if ($('.course2 .now_page').html() <= 4) {
			$('.course2 ul li').css('display','none');
			$('.course2 .span').css('display','none');
			$('.course2 ul li:lt(5)').css('display','inline-block');
			$('.course2 .last_dian').css('display','inline-block');
		} else if ($('.course2 .now_page').html() <= all_page2 - 4 && $('.course2 .now_page').html() > 4) {
			var a1 = $('.course2 .now_page').html() - 3;
			var a2 = $('.course2 .now_page').html() - 2;
			var a3 = $('.course2 .now_page').html() - 1;
			var a4 = $('.course2 .now_page').html();
			var a5 = parseInt($('.course2 .now_page').html()) + 1;
			$('.course2 ul li').css('display','none');
			$('.course2 .span').css('display','inline-block');
			$('.course2 ul li:eq('+ a1 +')').css('display','inline-block');
			$('.course2 ul li:eq('+ a2 +')').css('display','inline-block');
			$('.course2 ul li:eq('+ a3 +')').css('display','inline-block');
			$('.course2 ul li:eq('+ a4 +')').css('display','inline-block');
			$('.course2 ul li:eq('+ a5 +')').css('display','inline-block');
		} else if ($('.course2 .now_page').html() > all_page2 - 4) {
			var a6 = all_page2 - 6;
			$('.course2 ul li').css('display','none');
			$('.course2 .span').css('display','none');
			$('.course2 ul li:gt('+ a6 +')').css('display','inline-block');
			$('.course2 .left_dian').css('display','inline-block');
		};
	},0)
	// 个性化课程
	function showKc(obj) {
		$('.course1 h3').show();
		$('.course1 h3').children('i').css({transform:'rotate(0deg)'})
		// $('.course1').css('height','16.4vw')
		$('.course1').css('height','225px')
		$('.course1').next().hide();
		$.ajax({
			type:'GET',
			// url:url_ip + '/files/course/',
			url:url_ip + '/files/course_search/',
			cache:true,
			data: obj,
			datatype:'json',
			success:function (data) {
				console.log(data)
				if (data.status) {
					if(data.data != '') {
						$('.course1').children('li').remove();
						all_page = Math.ceil(data.data.length / 8)
						for (var i = 0; i < data.data.length; i++) {
							var li = document.createElement('li')
							$(li)[0].index = data.data[i].id
							var div = document.createElement('div');
							$(div).addClass('label2')
							$(div).append('<img src="img/tabel22.png">')
							var html = '<img src="'+url_ip+data.data[i].cover+'" class="cover">'+
								'<h2>'+data.data[i].name+'</h2>'+
								'<div class="label1">'+
									'<img src="img/tabel11.png">'+
									'<span>CPDA在读</span>'+
								'</div>'
							$(li).append(html);
							var label_1 = data.data[i].label;
							for (var k = 0; k < label_1.length; k++) {
								var span = document.createElement('span');
								$(span).html(label_1[k])
								$(div).append(span)
							}
							$(li).append(div)
							$('.course1 h3').before(li)
						}
						$('.course1 .all_page').html(all_page);
						$('.course1 .ycl_page ul').html('');
						for (var i = 0; i < all_page; i++) {
							var oli = document.createElement('li');
							oli.innerHTML = i + 1;
							$('.course1 .ycl_page ul').append(oli);
						}
						if(all_page <= 1) {
							$('.course1 h3').hide();
						} else {
							$('.course1 h3').show();
						}
					} else {
						$('.course1 h3').hide();
						$('.course1').children('li').remove();
						$('.course1 h3').before('<li>'+data.msg+'</li>');
					}
				}
			},
			error:function (data) {
				console.log(data)
			}
		})
	}
	showKc({keyword: ''});
	$('.wkSearch').on('click', 'i', function () {
		var keyword = $('.wkSearch input').val();
		if(keyword == '') {
			alert('您未输入任何问题, 默认展示全部');
			showKc({keyword: ''});
		} else {
			showKc({keyword});
		}
	})
	
	
	// 个性化资料
	// $.ajax({
	// 	type:'GET',
	// 	url:url_ip + '/files/ebook/',
	// 	cache:true,
	// 	data:{},
	// 	datatype:'json',
	// 	success:function (data) {
	// 		console.log(data)
	// 		if (data.status) {
	// 	        $('.course2').children('li').remove();
	// 	        all_page2 = Math.ceil(data.data.length / 8)
	// 			for (var i = 0; i < data.data.length; i++) {
	// 				var li = document.createElement('li')
	// 				$(li)[0].index = data.data[i].file
	// 	            var div = document.createElement('div');
	// 	            $(div).addClass('label2')
	// 	            $(div).append(`<img src="img/tabel2.gif">`)
	// 				var html = `
	// 	                <img src="`+url_ip+data.data[i].cover+`" class="cover">
	// 	                <h2>`+data.data[i].name+`</h2>
	// 	                <div class="label1">
	// 	                    <img src="img/tabel1.gif">
	// 	                    <span>`+data.data[i].is_buy+`</span>
	// 	                </div>
	// 	            `
	// 	            $(li).append(html);
	// 				var label_1 = data.data[i].label;
	// 				for (var k = 0; k < label_1.length; k++) {
	// 					var span = document.createElement('span');
	// 					$(span).html(label_1[k])
	// 					$(div).append(span)
	// 				}
	// 				$(li).append(div)
	//             	$('.course2 h3').before(li)
	// 			}
	//             $('.course2 .all_page').html(all_page2);
	// 			for (var i = 1; i < all_page2; i++) {
	// 				var oli = document.createElement('li');
	// 				oli.innerHTML = i + 1;
	// 				$('.course2 .ycl_page ul').append(oli);
	// 			}
	// 		}
	// 	},
	// 	error:function (data) {
	// 		console.log(data)
	// 	}
	// })
	$('.course h3').toggle(function () {
		$(this).children('i').css({transform:'rotate(180deg)'})
		$(this).parent().css('height','508px')
		$(this).next().show();
		return true;
	},function () {
		$(this).children('i').css({transform:'rotate(0deg)'})
		$(this).parent().css('height','225px')
		$(this).next().hide();
		return true;
	})
	// 个性化资料
	all_page2 = Math.ceil($('.course2>li').length / 8)
	$('.xssy_page2 .all_page').html(all_page2)
	for (var i = 1; i < all_page2; i++) {
		var oli = document.createElement('li');
		oli.innerHTML = i + 1;
		$('.xssy_page2 ul').append(oli);
	}
	// 分页数据
	$(document).live('click',function () {
		var a = (now_page - 1) * 8;
		var z = now_page * 8;
		$('.course1>li').hide();
		$('.course1>li').slice(a,z).show();
		var a2 = (now_page2 - 1) * 8;
		var z2 = now_page2 * 8;
		$('.course2>li').hide();
		$('.course2>li').slice(a2,z2).show();	
	})
	// 点击每一个li跳转
	$('.course1>li').live('click',function () {
		id = $(this)[0].index
		window.location.href = 'xssy_detail.html?'+id
	})
	$('.course2>li').live('click',function () {
		id = $(this)[0].index
		window.open(url_ip+id)
	})
	$.ajax({
		url:url_ip+'/operatorsettings/resourceshare/',
		type:'GET',
		data:{},
		datatype:'json',
		cache:true,
		success:function (data) {
			console.log(data)
			if (data.status) {
				$('.resource_top img').attr('src',url_ip+data.data.cover)
				$('.resource_top h2').html(data.data.title)
				$('.resource_top p').html(data.data.content)
				for (var i = 0; i < data.data.orientation.length; i++) {
					var option = document.createElement('option')
					$(option).html(data.data.orientation[i])
					$(option).val(data.data.orientation[i])
					$('.resource_middle select').append(option)
				}
			}
		},
		error:function (data) {
			console.log(data)
		}
	})
	// 点击资源管理
	$('.to_resource').click(function () {
		$('.resource').show();
		$('.mu').show()
		$('.resource_top img').css('height',$('.resource_top img').width() * 1 / 3)
		$('.resource_middle form select').css('width',$('.resource_middle form input').width())
		console.log($('.resource')[0].clientHeight)
		$('.resource').css('marginTop', - $('.resource')[0].clientHeight / 2)
	})
	$('.resource i').click(function () {
		$('.resource').hide();
		$('.mu').hide()
	})
	$('.resource button').live('click',function () {
		if ($('.name').val() != '' && $('.phone').val() != '' && $('.type').val() != '' && $('.job').val() != '' && $('.resource_middle select').html() != '' && $('.resource_middle textarea').val() != '') {
			$.ajax({
				url:url_ip + '/operatorsettings/resourceback/',
				type:'POST',
				data:{name:$('.name').val(),contact:$('.phone').val(),industry:$('.type').val(),position:$('.job').val(),orientation:$('.resource_middle select').val(),teaching:$('input[name=type]').val(),abstract:$('.resource_middle textarea').val()},
				datatype:'json',
				headers:{'Authorization':token},
				success:function (data) {
					console.log(data)
					if (data.status) {
						alertmsg(data.msg,'',1)
						$('.resource_middle form')[0].reset();
					} else {
						alertmsg(data.msg,'',0)
					}
				},
				error:function (data) {
					console.log(data)
					if (data.status == 401) {
						$('.shade').show();
					}
				}
			})
		} else {
			alertmsg('信息填写不能为空','',0)
		}
	})
})