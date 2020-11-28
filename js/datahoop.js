var token = 'JWT' + window.sessionStorage.token;
$(function () {
// banner轮播封装
	function lunbo (arr,obj,obj2,obj0,tid_name) {
		var n = 1
		var w = $(obj0).width();
		console.log(w)
		for (var i = 0; i < arr.length; i++) {
			var li = document.createElement('li');
			var li_b = document.createElement('li')
			var img = document.createElement('img');
			$(img).attr('src',url_ip + arr[i].url);
			$(li).attr('data-type', arr[i].classify)
			$(li).append(img)
			obj.append(li)
			obj2.append(li_b)
		}
		var li0 = document.createElement('li')
		var img0 = document.createElement('img')
		$(img0).attr('src',url_ip + arr[arr.length - 1].url)
		$(li0).append(img0)
		obj.prepend(li0)
		var li2 = document.createElement('li')
		var img2 = document.createElement('img')
		$(img2).attr('src', url_ip + arr[0].url)
		$(li2).append(img2)
		obj.append(li2)
		$(obj).css({left:-n*w+'px',width:(arr.length+2)*w})
		$(obj).children('li').css('width',w+'px')
		$(obj2).children('li')[n-1].classList.add('on')
		tid_name = setInterval(function () {
			n++
			if (n > arr.length) {
				$(obj2).children('li').removeClass('on')
				$(obj2).children('li')[0].classList.add('on')
				$(obj).stop(true).animate({left:-n*w+'px'},1000,function () {
					n = 1;
					$(obj).css('left',-n*w+'px')
				})
			} else {
				$(obj2).children('li').removeClass('on')
				$(obj2).children('li')[n-1].classList.add('on')
				$(obj).stop(true).animate({left:-n*w+'px'},1000)
			}
		},8000)
		var arr2 = $(obj2).children('li')
		$(obj2).delegate('li','click',function () {
			n = $(this).index() + 1;
			$(obj2).children('li').removeClass('on')
			$(obj2).children('li')[n-1].classList.add('on')
			$(obj).stop(true).animate({left:-n*w+'px'},1000)
			clearInterval(tid_name);
			tid_name = setInterval(function () {
				n++
				if (n > arr.length) {
					$(obj2).children('li').removeClass('on')
					$(obj2).children('li')[0].classList.add('on')
					$(obj).stop(true).animate({left:-n*w+'px'},1000,function () {
						n = 1;
						$(obj).css('left',-n*w+'px')
					})
				} else {
					$(obj2).children('li').removeClass('on')
					$(obj2).children('li')[n-1].classList.add('on')
					$(obj).stop(true).animate({left:-n*w+'px'},1000)
				}
			},5000)
		})
		//暂停-打开
		$(obj0).on({
			mouseover: function () {
				clearInterval(tid_name);
			},
			mouseout: function () {
				clearInterval(tid_name);
				tid_name = setInterval(function () {
					n++
					if (n > arr.length) {
						$(obj2).children('li').removeClass('on')
						$(obj2).children('li')[0].classList.add('on')
						$(obj).stop(true).animate({left:-n*w+'px'},1000,function () {
							n = 1;
							$(obj).css('left',-n*w+'px')
						})
					} else {
						$(obj2).children('li').removeClass('on')
						$(obj2).children('li')[n-1].classList.add('on')
						$(obj).stop(true).animate({left:-n*w+'px'},1000)
					}
				},5000)
			}
		})
	}
// 官站轮播渲染
	var lbTid;
	$.ajax({
		url:url_ip + '/operatorsettings/banners/',
		type:'GET',
		data:{},
		dataType:'json',
		success:function (data) {
			console.log(data)
			if (data.status) {
				// lunbo(data.data,$('.banner_box'),$('.banner_btn'),$('.banner'),lbTid);
			}
		},
		error:function (data) {
			console.log(data)
		}
	})
})