// var token = "JWT " + window.sessionStorage.token;
var _tid;
$(function(){
	var l_fgf = '';
	var name = '';
	var file = {};
	$('.textfile ul li i').live('click',function(){
		l_fgf = ''
		file = {};
		var file_c = $(this).next().children('.file').children('input[type=file]')
		$(this).next().children('ol').children('li:eq(0) input').attr('checked',true)
		console.log($(this).next().children('ol').children('li:eq(0) input'))
		$('.ww').val('')
		$('.separator').hide();
		$('.mu').show()
		$(this).next().show();
		$('.filename').html('未选择任何文件')
		if ($(file_c)[0].files.length != '0') {
			$('.file input').val("");
		};
	});
	$('.separator b').live('click',function () {
		$('.mu').hide()
		$('.separator').hide();
	})
	$('.file input').live('change',function () {
		name = $(this)[0].files[0].name;
		$(this).parent().next().html(name);
		file = $(this)[0].files[0];
	})
	// 点击单选框选择分隔符
	$('.separator ol li input').click(function () {
		if ($(this).next().html() == '逗号( , )') {
			l_fgf = ',';
			$('.w').children('input').val('');
		} else if ($(this).next().html() == '分号( ; )') {
			l_fgf = ';';
			$('.w').children('input').val('');
		} else if ($(this).next().html() == '竖线( | )') {
			l_fgf = '|';
			$('.w').children('input').val('');
		} else {
			$('input[type=radio]').attr('checked',false)
			l_fgf = '';
		}
	})
	// 点击确定上传文件
	$('.ok').live('click',function () {
		console.log($(this).parent().next().children('input'))
		var is_header = 0;
		if (l_fgf == '') {
			if ($(this).parent().prev().children('.w').children('.ww').val() != '') {
				l_fgf = $(this).parent().prev().children('.w').children('.ww').val();
			} else {
				l_fgf = ',';
			}
		}
		if ($(this).prev().prev().is(':checked')) {
			is_header = 1;
		};
		var formData = new FormData();
		formData.append("user",'1');
		formData.append("file_name",file);
		formData.append("label",'1');
		formData.append("is_header",is_header);
		formData.append("column_delimiter",l_fgf);
		console.log(formData)
		$.ajax({
			type:'POST',
			url:url_ip+'/files/judge/',
			cache:false,
			data:{name:name},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				console.log(data)
				if (data.status) {
					$.ajax({ 
						type:'POST',
						url:url_ip+'/files/',
						cache:false,
						data:formData,
						datatype:"json",
						processData:false, /*告诉jQuery不要去处理发送的数据*/
						contentType:false, /*告诉jQuery不要去设置Content-Type请求头*/
						headers:{"Authorization":token},
						beforeSend:function(){
							$('.mu').show();
							$('.loading').show();
							clearInterval(_tid)
							var a = 0;
							_tid = setInterval(function () {
								a += 22.5
								$('.loading').css('transform','rotate(' + a + 'deg)')
							},100)
						},
						success:function (data) {
							console.log(data)
							if (data.status) {
								alertmsg(data.msg,'',1);
							} else {
								alertmsg(data.msg,'',0);
							}
						}, 
						error:function(data) {
							console.log(data)
							alertmsg('程序出错了',touch_us,0);
						},
						complete:function(){
							$('.separator').hide();
							clearInterval(_tid);
							$('.loading').hide();
							$('.mu').hide();
						}
					});	
				}else{
					$('.separator').hide();
					var msg = data.msg
					alertmsg(msg,'',0);
					$('.mu').hide();
				}
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
					$('.shade').show()
				} else {
					alertmsg('程序出错了',touch_us,0);
				}
			}
		})
	})
	// 数据库1上传文件
	$('.sql1').live('change',function () {
		var _this = $(this)
		console.log(_this)
		var name2 = $(this)[0].files[0].name;
		var file2 = $(this)[0].files[0];
		var formData = new FormData();
		formData.append("user",'1');
		formData.append("file_name",file2);
		formData.append("label",'1');
		$.ajax({
			type:'POST',
			url:url_ip+'/files/judge/',
			cache:false,
			data:{name:name2},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				console.log(data)
				if (data.status) {
					$.ajax({ 
						type:'POST',
						url:url_ip+'/files/',
						cache:false,
						data:formData,
						datatype:"json",
						processData:false, /*告诉jQuery不要去处理发送的数据*/
						contentType:false, /*告诉jQuery不要去设置Content-Type请求头*/
						headers:{"Authorization":token},
						beforeSend:function(){
							$('.mu').show();
							$('.loading').show();
							clearInterval(_tid)
							var a = 0;
							_tid = setInterval(function () {
								a += 22.5
								$('.loading').css('transform','rotate(' + a + 'deg)')
							},100)
						},
						success:function (data) {
							console.log(data)
							if (data.status) {
								alertmsg(data.msg,'',1);
							} else {
								alertmsg(data.msg,'',0);
							}
						}, 
						error:function(data) { 
							alertmsg('程序出错了',touch_us,0);
						},
						complete:function(){
							$('.separator').hide();
							clearInterval(_tid);
							$('.loading').hide();
							$('.mu').hide();
						}
					});	
				}else {
					alertmsg(data.msg,'',0);
				}
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
					$('.shade').show()
				} else {
					alertmsg('程序出错了',touch_us,0);
				}
			}
		})
	})
	// 数据库2上传文件
	$('.sql2').live('change',function () {
		var name3 = $(this)[0].files[0].name;
		var file3 = $(this)[0].files[0];
		var formData = new FormData();
		formData.append("user",'1');
		formData.append("file_name",file3);
		formData.append("label",'1');
		$.ajax({
			type:'POST',
			url:url_ip+'/files/judge/',
			cache:false,
			data:{name:name3},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				console.log(data)
				if (data.status) {
					$.ajax({ 
						type:'POST',
						url:url_ip+'/files/',
						cache:false,
						data:formData,
						datatype:"json",
						processData:false, /*告诉jQuery不要去处理发送的数据*/
						contentType:false, /*告诉jQuery不要去设置Content-Type请求头*/
						headers:{"Authorization":token},
						beforeSend:function(){
							$('.mu').show();
							$('.loading').show();
							clearInterval(_tid)
							var a = 0;
							_tid = setInterval(function () {
								a += 22.5
								$('.loading').css('transform','rotate(' + a + 'deg)')
							},100)
						},
						success:function (data) {
							console.log(data)
							if (data.status) {
								alertmsg(data.msg,'',1);
							} else {
								alertmsg(data.msg,'',0);
							}
						}, 
						error:function(data) {
							alertmsg('程序出错了',touch_us,0);
						},
						complete:function(){
							$('.separator').hide();
							clearInterval(_tid);
							$('.loading').hide();
							$('.mu').hide();
						}
					});	
				}else {
					alertmsg(data.msg,'',0);
				}
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
					$('.shade').show()
				} else {
					alertmsg('程序出错了',touch_us,0);
				}
			}
		})
	})
	// 联系我们
	var touch_us = document.createElement('a');
	$(touch_us).html('请联系我们，反馈这个错误')
	$(touch_us).attr({href:'feedback.html'})
	// 消息提示msgbox
	function alertmsg (msg,tag,num) {
		var top = $('.msgbox').offset().top + 331
		var timeout;
		$('.msgbox').css('top',top)
		$('.mu2').show();
		$('.msgbox img').removeClass('on')
		if (num == 1) {
			$('.success').addClass('on')
			$('.msgbox span').css('color','#06415E')
			clearTimeout(timeout)
			$('.msgbox span').html(msg);
			$('.msgbox').fadeIn();
			timeout = setTimeout(function () {
				$('.msgbox').fadeOut();
				$('.mu2').hide();
			},1000)
		} else {
			$('.fail').addClass('on')
			$('.msgbox span').css('color','#DC1010')
			clearTimeout(timeout)
			$('.msgbox span').html(msg);
			$('.msgbox').fadeIn();
			timeout = setTimeout(function () {
				$('.msgbox').fadeOut();
				$('.mu2').hide();
			},3000)
		}
	}
	//返回上一页
	$('.go ul li:nth-child(1)').click(function(){
		history.back();
	});
	var l = 0;
	var aaaa = setInterval(function () {
		if (l < 16838) {
			l+=51;
		} else {
			l = 16838
		}
		$('#rfv').html(l)
	},1)
	
	
	
	
	
	lkwIsLoginPage(); //登录验证盒子
	$('.goPerscenter').on('click', function () {
		if (token != 'JWT undefined' && token != 'JWT null') {
			window.location.href = "perscen-zy.html";
		} else {
			$('.msg-box-wraper.login-alert').fadeIn();
			document.body.style.overflow = 'hidden'; 
		}
	})
	$('.lkw-msg-box-close').on('click', function() {
			$('.msg-box-wraper').fadeOut();
			document.body.style.overflow = 'auto';
		})
	
	
	
	
	$(document).on('click', function () {
		$('.love_from_nav').removeClass('active');
	})
	var needParam = (GetQueryString('cm')).toLowerCase();
	if($.inArray(needParam, ['excel', 'txt', 'csv']) == -1) {
		$('.love_from_nav[data-item="'+needParam+'"]').addClass('active');
		var sb_FileInput = setTimeout(function () {
			$('.love_from_nav[data-item="'+needParam+'"]').removeClass('active');
		},8000)
		// $('.asasa').click();
		// $('.('.love_from_nav').eq(4).trigger('click');
		// $('.uploading_content').find('.love_from_nav[data-item="'+needParam+'"]').trigger("click");
	} else {
		$('.love_from_nav[data-item="'+needParam+'"]').click();
	}
	
	
})
