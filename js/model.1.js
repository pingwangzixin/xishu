// var token = "JWT " + window.sessionStorage.token;
//console.log(url_ip)
var model_id_index = sessionStorage.getItem("model_id_index");
$(function () {
	var _tid;/*请求等待的循环调用*/
	var canshu = [];/*执行算法的参数数组*/
	$('.lkw-msg-box-close').on('click', function() {
		window.location.href = 'index.html'
	})
// 获取自建算法列表
	$.ajax({
        type: "GET",
        url: url_ip + "/examine/upalgocrud/",
        async: false,
        data: {},
        dataType: "json",
        headers:{"Authorization":token},
        success: function (data) {
        	//console.log(data)
        	if (data.status) {
	        	var arr = data.self_alg;
	        	$('.zijian_list li').remove();
	        	for (var i = 0; i < arr.length; i++) {
	        		var html = '<li class="list" data-val="'+arr[i][0]+'"><img src="' + arr[i][2] +'" title="_'+arr[i][1]+'">_'+arr[i][1]+'</li>'
	        		$('.zijian_list').append(html);
	        	}	
        	}
        },
        error: function (data) {
					console.log(data)
					if (data.status == 401) {
						if (token == 'JWT undefined' || token == 'JWT null') {
							$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
						} else {
							$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
							$('.shade').show();
						}
					} else {
						alertmsg('未知错误。',touch_us)
					}
        }
    })
// 修改工作台画布大小
	var canvas_w = $('.model_middle').width();
	var canvas_h = $('.model_middle').height();
	$('canvas').attr({width:canvas_w,height:canvas_h})
	window.onresize = function () {
		var canvas_w = $('.model_middle').width();
		var canvas_h = $('.model_middle').height();
		$('canvas').attr({width:canvas_w,height:canvas_h})
	}
// 获取公共数据
	$.ajax({
		type:'GET',
		url:url_ip + '/files/thirdry/',
		cache:false,
		data:{page:1,action:''},
		datatype:"json",
		headers:{"Authorization":token},
		success:function (data) {
			//console.log(data)
			var file = data;
			for (var i = 0; i < file.length; i++) {
				var op = document.createElement('p');
				op.innerHTML = file[i].file_name;
				op.id = file[i].id;
				$('.model_gg').append(op);
			}
		}, 
		error:function(data) {
			console.log(data)
            if (data.status == 401) {
            	if (token == 'JWT undefined' || token == 'JWT null') {
            		$('.shade p').html('您目前还没有注册或登录~ ')
					$('.shade').show();
            	} else {
            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
            		$('.shade').show();
            	}
            } else {
            	alertmsg('未知错误。',touch_us)
            }
		}
	})
// 公共数据查看
	$('.model_gg p').live('dblclick',function () {
		//console.log(this.id)
		$.ajax({
			type:'GET',
			url:url_ip + '/files/detail/' + this.id,
			cache:false,
			data:{},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				$('#msg_box').show();
				$('#msg_box div').hide();
				$('.msg_box0').show();
				$('.msg_box0').empty();
				var table = document.createElement('table')
				for (var i = 0; i < data.data.length; i++) {
					var tr = document.createElement('tr');
					for (var j = 0; j < data.data[i].length; j++) {
						var td = document.createElement('td');
						$(td).html(data.data[i][j]);
						$(tr).append(td);
					}
					$(table).append(tr);
				}
				$('.msg_box0').append(table)
			}, 
			error:function(data) {
				console.log(data)
	            if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
		})
	})
// 获取个人数据
	get_geren();
	function get_geren () {
		$('.model_geren').empty();
		$.ajax({
			type:'GET',
			url:url_ip + '/model/',
			cache:false,
			data:{},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
				for (var i = 0; i < data.length; i++) {
					var op = document.createElement('p');
					op.innerHTML = data[i].file_name;
					op.id = data[i].obj_id;
					$('.model_geren').append(op);
				}
			}, 
			error:function(data) {
				console.log(data)
	            if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
		})	
	}
// 个人数据查看
	$('.model_geren p').live('dblclick',function () {
		//console.log(this.id)
		$.ajax({
			type:'GET',
			url:url_ip + "/model/readdata/?obj_id="+this.id,
			cache:false,
			data:{},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				console.log(data.data)
				$('#msg_box').show();
				$('#msg_box div').hide();
				$('.msg_box0').show();
				$('.msg_box0').empty();
				var table = document.createElement('table')
				for (var i = 0; i < data.data.length; i++) {
					var tr = document.createElement('tr');
					for (var j = 0; j < data.data[i].length; j++) {
						var td = document.createElement('td');
						$(td).html(data.data[i][j]);
						$(tr).append(td);
					}
					$(table).append(tr);
				}
				$('.msg_box0').append(table)
			}, 
			error:function(data) {
				console.log(data)
	            if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
		})
	})
// 获取保存模板
	getmodel();
	function getmodel () {
		$(".modelNames").empty();
		$('.changjing .cj_model').remove();
		$.ajax({
			type:'GET',
			url:url_ip + '/Model/',
			cache:false,
			data:{},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data.results)
				for (var i = 0; i < data.results.length; i++) {
					var p = document.createElement('li');
					$(p)[0].mid = data.results[i].id
					$(p).html(data.results[i].ModelName)
					$(".modelNames").append(p);
					var div = document.createElement('div')
					$(div).addClass('cj_model')
					var html = '<i></i>'
								+	'<h2>' + data.results[i].ModelName + '</h2>'
								+	'<img src="img/model.png">'
								+	'<p>' + data.results[i].remark + '</p>'
								+	'<span>' + data.results[i].fav_num + '位用户</span>'
	                $(div).append(html);
				}
			}, 
			error:function(data) {
				console.log(data)
	            if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
		})	
	}
// 保存模板还原
	$(".modelNames li").live('dblclick',function () {
		huanyuan($(this)[0].mid)
	})
	$(".modelfenx p").live('dblclick',function () {
		huanyuan($(this)[0].mid)
	})
// 获取分布式算法
	$.ajax({
		type:'GET',
		url:url_ip + '/algomodelget/',
		cache:false,
		data:{},
		datatype:"json",
		headers:{"Authorization":token},
		success:function (data) {
			//console.log(data)
			//console.log(data.results);
			for (var i = 0; i < data.results.length; i++) {
				if (data.results[i].type == 1 && data.results[i].user.username == 'admin') {
					var img = document.createElement('img');
					$(img).attr('src','img/fen' + data.results[i].id + '.fw.png');
					$(img).attr('title',data.results[i].name)
					$(img)[0].obj_id = data.results[i].id
					var li = document.createElement('li');
					$(li).append(img);
					if (data.results[i].name != '数据导入') {
						$('.model_hide_ul_fenbu').append(li)
					} else {
						$('.model_hide_ul_fenbu1').append(li)
					}
				}
			}
		}, 
		error:function(data) {
			console.log(data)
			if (data.status == 401) {
            	if (token == 'JWT undefined' || token == 'JWT null') {
            		$('.shade p').html('您目前还没有注册或登录~ ')
					$('.shade').show();
            	} else {
            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
            		$('.shade').show();
            	}
            } else {
            	alertmsg('未知错误。',touch_us)
            }
		}
	})
// 左边栏展开关闭
	var a_ul = null;
	// var b_ul = null;
	$('.model_nav_li').live('click',function (evt) {
		if (a_ul == evt.target) {
			$('.model_nav_li2').stop().slideUp();
			$('.model_nav_li').removeClass('select');
			a_ul = null;
		} else {
			$('.model_nav_li2').stop().slideUp();
			$(this).next().stop().slideDown();
			$('.model_nav_li').removeClass('select');
			$(this).addClass('select');
			a_ul = evt.target;
		}
		return false;
	})
	// 此处存在BUG,当不同的两个一级文件下的各自的某一个二级文件都打开时，出现BUG
	$('.model_hide_div div').live('click',function (evt) {
		if($(this).parent().hasClass('active')) {
			$(this).next('.model_hide_ul').stop(true).slideUp();
			$(this).parent().removeClass('active');
		} else {
			$(this).next('.model_hide_ul').stop(true).slideDown();
			$(this).closest('.model_hide_div').siblings('.model_hide_div').find('.model_hide_ul').slideUp();
			$(this).parent().addClass('active').siblings().removeClass('active');
		}
		// if (b_ul == evt.target) {
		// 	$('.model_hide_ul').stop().slideUp();
		// 	$('.model_ul_icon').css('transform','rotate(0deg)')
		// 	b_ul = null;
		// } else {
		// 	$('.model_hide_ul').stop().slideUp();
		// 	$(this).next().stop().slideDown();
		// 	$('.model_ul_icon').css('transform','rotate(0deg)')
		// 	$(this).children().eq(0).css('transform','rotate(90deg)')
		// 	b_ul = evt.target;
		// }
		return false;
	})
// 上传数据
	var file1 = {};
	var file2 = {};
	var is_header;
	var fgf = '';
	// 打开上传数据弹窗
	$('.open_load').click(function () {
		$('#load_box').css('display','block');
	});
	// 打开txt选择分割符弹窗
	$('.load_exc').live('click',function () {
		$('.load_check_box').hide();
		$('.load_check_box0').show();
		// 关闭
		$('.load_check_box0 img').click(function () {
			$('.load_check_box').hide();
		})
	})
	// 打开txt选择分割符弹窗
	$('.load_txt').live('click',function () {
		$('.load_check_box').hide();
		$('.load_check_box1').show();
		// 关闭
		$('.load_check_box1 img').click(function () {
			$('.load_check_box').hide();
		})
	})
	// 打开csv选择分割符弹窗
	$('.load_csv').live('click',function () {
		$('.load_check_box').hide();
		$('.load_check_box2').show();
		// 关闭
		$('.load_check_box2 img').click(function () {
			$('.load_check_box').hide();
		})
	})
	// 点击关闭上传数据弹窗
	$('.load_top img').click(function () {
		$('#load_box').css('display','none');
	})
	// 点击选择文件
	$('.load_file_btn0 input').live('change',function () {
		name = $(this)[0].files[0].name;
		$('.load_check_box0 span').html(name)
		file0 = $(this)[0].files[0];
	})
	$('.load_file_btn1 input').live('change',function () {
		name = $(this)[0].files[0].name;
		$('.load_check_box1 span').html(name)
		file1 = $(this)[0].files[0];
	})
	$('.load_file_btn2 input').live('change',function () {
		name = $(this)[0].files[0].name;
		$('.load_check_box2 span').html(name)
		file2 = $(this)[0].files[0];
	})
	// 自定义分隔符失去光标
	$('.load_check_box0 .input input').live('blur',function () {
		if ($(this).val() != '') {
			$('.load_check_box0 input[type=radio]').attr('checked',false)
		} else {
			$('.load_check_box0 input[type=radio]:eq(1)').attr('checked',true)
		}
	})
	$('.load_check_box1 .input input').live('blur',function () {
		if ($(this).val() != '') {
			$('.load_check_box1 input[type=radio]').attr('checked',false)
		} else {
			$('.load_check_box1 input[type=radio]:eq(1)').attr('checked',true)
		}
	})
	$('.load_check_box2 .input input').live('blur',function () {
		if ($(this).val() != '') {
			$('.load_check_box2 input[type=radio]').attr('checked',false)
		} else {
			$('.load_check_box2 input[type=radio]:eq(1)').attr('checked',true)
		}
	})
	// 点击确定按钮进行上传
	$('.load_sure0').live('click',function () {
		if ($('.load_check_box0 input[type=radio]:checked').next().html() == '分号 ( ; )') {
			fgf = ';'
		} else if ($('.load_check_box0 input[type=radio]:checked').next().html() == '逗号 ( , )') {
			fgf = ','
		} else if ($('.load_check_box0 input[type=radio]:checked').next().html() == '竖线 ( | )') {
			fgf = '|'
		} else {
			fgf = $('.load_check_box0 .input input').val();
		}
		if ($('.load_check_box0 input[type=checkbox]').is(':checked')) {
			is_header = 1;
		} else {
			is_header = 0;
		}
		var formData = new FormData();
		formData.append("user",'1');
		formData.append("file_name",file0);
		formData.append("label",'1');
		formData.append("is_header",is_header);
		formData.append("column_delimiter",fgf);
		$.ajax({
			type:'POST',
			url:url_ip+'/files/judge/',
			cache:false,
			data:{name:name},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
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
							if (data.status) {
								alertmsg(data.msg,'',1);
								get_geren();
								get_datalist();
								get_fenbudata();
								$('.load_check_box').hide();	
							} else {
								alertmsg(data.msg,'',0)
							}
						}, 
						error:function(data) { 
							if(data.status == 400){
								alertmsg('<' + name + '>' + '文件的文件名格式或者文件格式不正确,上传失败','',0);
							} else if (data.status == 401) {
				            	if (token == 'JWT undefined' || token == 'JWT null') {
				            		$('.shade p').html('您目前还没有注册或登录~ ')
									$('.shade').show();
				            	} else {
				            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
				            		$('.shade').show();
				            	}
				            } else {
				            	alertmsg('未知错误。',touch_us)
				            }
						},
						complete:function(){
							$('.load_check_box1').hide();
							clearInterval(_tid);
							$('.loading').hide();
							$('.mu').hide();
						}
					});	
				}else{
					$('.load_check_box1').hide();
					var msg = data.msg
					alertmsg(msg,'',0);
				}
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
		})
	})
	$('.load_sure1').live('click',function () {
		if ($('.load_check_box1 input[type=radio]:checked').next().html() == '分号 ( ; )') {
			fgf = ';'
		} else if ($('.load_check_box1 input[type=radio]:checked').next().html() == '逗号 ( , )') {
			fgf = ','
		} else if ($('.load_check_box1 input[type=radio]:checked').next().html() == '竖线 ( | )') {
			fgf = '|'
		} else {
			fgf = $('.load_check_box1 .input input').val();
		}
		if ($('.load_check_box1 input[type=checkbox]').is(':checked')) {
			is_header = 1;
		} else {
			is_header = 0;
		}
		var formData = new FormData();
		formData.append("user",'1');
		formData.append("file_name",file1);
		formData.append("label",'1');
		formData.append("is_header",is_header);
		formData.append("column_delimiter",fgf);
		$.ajax({
			type:'POST',
			url:url_ip+'/files/judge/',
			cache:false,
			data:{name:name},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
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
							if (data.status) {
								alertmsg(data.msg,'',1);
								get_geren();
								get_datalist();
								get_fenbudata();
								$('.load_check_box').hide();	
							} else {
								alertmsg(data.msg,'',0)
							}
						}, 
						error:function(data) { 
							if(data.status == 400){
								alertmsg('<' + name + '>' + '文件的文件名格式或者文件格式不正确,上传失败','',0);
							} else if (data.status == 401) {
				            	if (token == 'JWT undefined' || token == 'JWT null') {
				            		$('.shade p').html('您目前还没有注册或登录~ ')
									$('.shade').show();
				            	} else {
				            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
				            		$('.shade').show();
				            	}
				            } else {
				            	alertmsg('未知错误。',touch_us)
				            }
						},
						complete:function(){
							$('.load_check_box1').hide();
							clearInterval(_tid);
							$('.loading').hide();
							$('.mu').hide();
						}
					});	
				}else{
					$('.load_check_box1').hide();
					var msg = data.msg
					alertmsg(msg,'',0);
				}
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
		})
	})
	// csv
	$('.load_sure2').live('click',function () {
		if ($('.load_check_box2 input[type=radio]:checked').next().html() == '分号 ( ; )') {
			fgf = ';'
		} else if ($('.load_check_box2 input[type=radio]:checked').next().html() == '逗号 ( , )') {
			fgf = ','
		} else if ($('.load_check_box2 input[type=radio]:checked').next().html() == '竖线 ( | )') {
			fgf = '|'
		} else {
			fgf = $('.load_check_box2 .input input').val();
		}
		if ($('.load_check_box2 input[type=checkbox]').is(':checked')) {
			is_header = 1;
		} else {
			is_header = 0;
		}
		var formData = new FormData();
		formData.append("user",'1');
		formData.append("file_name",file2);
		formData.append("label",'1');
		formData.append("is_header",is_header);
		formData.append("column_delimiter",fgf);
		$.ajax({
			type:'POST',
			url:url_ip+'/files/judge/',
			cache:false,
			data:{name:name},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
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
							//console.log(data)
							if (data.status) {
								alertmsg2(data.msg,'',1);
								get_geren();
								get_datalist();
								get_fenbudata();
								$('.load_check_box').hide();	
							} else {
								alertmsg2(data.msg,'',0);
							}
						}, 
						error:function(data) { 
							if(data.status == 400){
								alertmsg('<' + name + '>' + '文件的文件名格式或者文件格式不正确,上传失败','',0);
							} else if (data.status == 401) {
				            	if (token == 'JWT undefined' || token == 'JWT null') {
				            		$('.shade p').html('您目前还没有注册或登录~ ')
									$('.shade').show();
				            	} else {
				            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
				            		$('.shade').show();
				            	}
				            } else {
				            	alertmsg('未知错误。',touch_us)
				            }
						},
						complete:function(){
							$('.load_check_box2').hide();
							clearInterval(_tid);
							$('.loading').hide();
							$('.mu').hide();
						}
					});	
				}else{
					$('.load_check_box2').hide();
					var msg = data.msg
					alertmsg2(msg,'',0);
				}
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
		})
	})
	// mysql
	$('.load_wysql input').live('change',function () {
		var name2 = $(this)[0].files[0].name;
		var file3 = $(this)[0].files[0];
		var formData = new FormData();
		formData.append("user",'1');
		formData.append("file_name",file3);
		formData.append("label",'1');
		$.ajax({
			type:'POST',
			url:url_ip+'/files/judge/',
			cache:false,
			data:{name:name2},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
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
							alertmsg('上传成功','',1);
							egt_geren();
							get_datalist();
							get_fenbudata();
						}, 
						error:function(data) { 
							if(data.status == 400){
								alertmsg('<' + name + '>' + '文件的文件名格式或者文件格式不正确,上传失败','',0);
							} else if (data.status == 401) {
				            	if (token == 'JWT undefined' || token == 'JWT null') {
				            		$('.shade p').html('您目前还没有注册或登录~ ')
									$('.shade').show();
				            	} else {
				            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
				            		$('.shade').show();
				            	}
				            } else {
				            	alertmsg('未知错误。',touch_us)
				            }
						},
						complete:function(){
							clearInterval(_tid);
							$('.loading').hide();
							$('.mu').hide();
						}
					});	
				}else {
					alertmsg('文件已存在！请更改文件名后重新上传','',0);
				}
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
		})
	})
	// postgresql
	$('.load_postsql input').live('change',function () {
		var name2 = $(this)[0].files[0].name;
		var file3 = $(this)[0].files[0];
		var formData = new FormData();
		formData.append("user",'1');
		formData.append("file_name",file3);
		formData.append("label",'1');
		$.ajax({
			type:'POST',
			url:url_ip+'/files/judge/',
			cache:false,
			data:{name:name2},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
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
							alertmsg('上传成功','',1);
							get_geren();
							get_datalist();
							get_fenbudata();
						}, 
						error:function(data) { 
							if(data.status == 400){
								alertmsg('<' + name + '>' + '文件的文件名格式或者文件格式不正确,上传失败','',0);
							} else if (data.status == 401) {
				            	if (token == 'JWT undefined' || token == 'JWT null') {
				            		$('.shade p').html('您目前还没有注册或登录~ ')
									$('.shade').show();
				            	} else {
				            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
				            		$('.shade').show();
				            	}
				            } else {
				            	alertmsg('未知错误。',touch_us)
				            }
						},
						complete:function(){
							clearInterval(_tid);
							$('.loading').hide();
							$('.mu').hide();
						}
					});	
				}else {
					alertmsg('文件已存在！请更改文件名后重新上传','',0);
				}
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
		})
	})
// 点击保存按钮打开保存选项弹窗
    $('.cookie_btn').click(function () {
    	$.ajax({
    		type:'GET',
			url:url_ip + '/GetModelLabel/',
			cache:false,
			data:{},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
				$('.cun_model_tab').children('li').remove();
				for (var i = 0; i < data.results.length; i++) {
					var li = document.createElement('li');
					var div = document.createElement('div');
					var input = document.createElement('input');
					var span = document.createElement('span');
					$(span).html(data.results[i].name);
					$(span)[0].msg = data.results[i].id;
 					$(input).attr('type','checkbox');
					$(div).append(input);
					$(li).append(div);
					$(li).append(span);
					$('.cun_model_tab').append(li);
				}
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
    	})
    	$('.cun_model').show();
    })
    // 点击标签改变样式
    $('.cun_model_tab li').live('click',function () {
    	if ($(this).children('div').children('input').is(':checked') == true) {
    		$(this).children('div').css('backgroundImage','url(img/check.png)')
    	} else {
    		$(this).children('div').css('backgroundImage','')
    	}
    })
    // 点击保存弹窗确定按钮进行模型保存操作
    var modelname = '';
    var modeltxt = '';
    var list = [];
    $('.model_sure').click(function () {
    	modelname = $('.cun_model_name input').val();
    	list = [];
    	var arr = $('.cun_model_tab input')
    	//console.log(arr)
    	for (var i = 0; i < arr.length; i++) {
    		if (arr[i].checked) {
    			//console.log(222)
    			var a = $(arr[i]).parent().next()[0].msg;
    			//console.log(a);
    			list.push(a);
    		}
    	}
    	modeltxt = $('.cun_model_txt textarea').val();
	    var savenode = [];
	    var savelink = [];
	    var save = {};
    	//console.log(modelname,list,modeltxt);
    	var nodes = scene.childs.filter(function (e) {
	        return e instanceof JTopo.Node;
	    });
	    if (nodes.length > 0) {
	        for (i = 0; i < nodes.length; i++) {
	            var node = nodes[i]
	            delete node.outLinks;
	            delete node.inLinks;
	            savenode.push(node);
	        }
	    }
	    var links = scene.childs.filter(function (e) {
	        return e instanceof JTopo.Link;
	    });
	    if (links.length > 0) {
	    	for (var i = 0; i < links.length; i++) {
	    		var linkmsg = {};
	    		linkmsg.nodea = links[i].nodeA._id;
	    		linkmsg.nodez = links[i].nodeZ._id;
	    		savelink.push(linkmsg)
	    	}
	    }
	    save.nodelist = savenode;
	    save.linklist = savelink;
	    //console.log(save)
    	$.ajax({
	        type: "POST",
	        url: url_ip + "/model/modelJson/",
	        async: false,
	        data: {MJson:JSON.stringify(save),modelName:modelname,labelList:JSON.stringify(list),remark:modeltxt,from:'model'},
	        dataType: "json",
	        headers:{"Authorization":token},
			beforeSend:function () {
				$('.mu').show();
				$('.loading').show();
				clearInterval(_tid)
				var a = 0;
				_tid = setInterval(function () {
					a += 22.5
					$('.loading').css('transform','rotate(' + a + 'deg)')
				},100)
			},
	        success: function (data) {
	        	//console.log(data)
	            var model_id = data.modelid;
	            if (data.status) {
		            // var html = '<p mid="' + model_id + '">' + modelname + '</p>'
		            var p = document.createElement('li');
		            p.innerHTML = modelname;
		            $(p)[0].mid = model_id
	                $(".modelNames").append(p);	
	                alertmsg('<' + modelname + '>模型保存成功')
	                getmodel();
	                scene.clear();
	                $('.changjing').show();
    				$('.model_right_form').hide();
	                $('.cun_model').hide();
	            } else {
	            	alertmsg(data.error)
	            }
	        },
	        error: function (data) {
	            console.log(data)
	            if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('<' + modelname + '>模型保存失败')
	            }
	        },
			complete:function () {
				clearInterval(_tid)
				$('.loading').hide();
				$('.mu').hide();
			}
	    })
    })
	// 点击关闭按钮关闭保存弹窗
    $('.cun_model_title i').click(function () {
    	$('.cun_model').hide();
    })
// 点击清空，清空画布上的内容 
    $('.empty_btn').click(function () {
    	scene.clear();
    	$('.model_right_form').hide();
    })
// 保存的模板还原封装
	function huanyuan (this_id) {
		if (scene.childs && scene.childs.length > 0) {
			alertmsg('工作台中有您正在操作的其他模型，建议您清空工作台后再进行查看，以免模型交叉造成混乱')
		} else {
			var model_id = this_id;
			$.ajax({
				type:'GET',
				url:url_ip + '/model/modelJson/?modelid=' + model_id,
				cache:false,
				data:{},
				datatype:"json",
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						var json = eval('(' + data.mjson + ')')
						var nodelist = json.nodelist
						//console.log(nodelist)
						for (var i = 0; i < nodelist.length; i++) {
							var node = new JTopo.Node(nodelist[i].text);
				    		node.fontColor = "255,255,255";
				    		node.font = "10px 微软雅黑";
							node.fillColor = "#000204";
							node.setSize(nodelist[i].width,nodelist[i].height)
							node.setLocation(nodelist[i].x,nodelist[i].y);
							node.setImage(nodelist[i].img);
							node.img = nodelist[i].img;
							node.showSelected = true;
							node.objId = nodelist[i].objId;
							node.obj_id = nodelist[i].obj_id;
							node.msg = nodelist[i].msg;
							node._id = nodelist[i]._id;
							if (nodelist[i].msg2) {
								node.msg2 = nodelist[i].msg2
							}
							if (nodelist[i].obj_name) {
								node.obj_name = nodelist[i].obj_name
							}
							if (nodelist[i].canshu_x) {
								node.canshu_x = nodelist[i].canshu_x;
							}
							if (nodelist[i].canshu_y) {
								node.canshu_y = nodelist[i].canshu_y;
							}
							if (nodelist[i].objId2) {
								node.objId2 = nodelist[i].objId2;
							}
							nodeclick1(node);
							nodeclick2(node);
							scene.add(node)
						}
						var linklist = json.linklist;
						//console.log(linklist)
						for (var i = 0; i < linklist.length; i++) {
							var node_a = scene.findElements( function (e) { 
								return e._id == linklist[i].nodea; 
							});
							var node_z = scene.findElements( function (e) { 
								return e._id == linklist[i].nodez; 
							});
							//console.log(node_a[0],node_z[0])
							var link = new JTopo.Link(node_a[0],node_z[0])
							scene.add(link)
						}	
					}
					
				}, 
				error:function(data) {
					console.log(data)
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},				
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})	
		}
	}
// 画布/工作台
	var canvas = document.getElementsByTagName('canvas')[0]; /*获取画布*/
    var stage = new JTopo.Stage(canvas);/*创建舞台*/
    var scene = new JTopo.Scene(stage);/*创建场景*/
    // scene.background = 'img/hei.jpg';
    var a = null;/*图标名*/
    var b = null;/*图标图片路径*/
	var objid;/*获取图标objid*/
	var data_val = '';/*自建算法的id*/
    var links = [];
    var toggle = true;
	var aaa;
	var shuju;/*创建全局的数据变量*/
	var shuju2;
	var def_name;
	var def_num = 0;
	var path;
	var thisnode;
	var c_div;
    // 禁止拖拽画布操作
    stage.mousedrag(function(e){
		stage.setCenter(canvas_w / 2,canvas_h / 2);
	});
  // 拖拽图标到画布
    // 在图标上，当鼠标按下获取图片路径信息
    $('.model_hide_ul li img').live('mousedown',function (evt) {
    	evt = evt || window.event;
    	var x = evt.clientX - 10;
    	var y = evt.clientY - 10;
    	var srcImg = $(this).attr('src');
    	var c = srcImg.lastIndexOf('.',srcImg.lastIndexOf('.') - 1)
    	b = srcImg.substr(0,c);/*图标路径地址截取*/
    	a = $(this).attr('title');/*图标中的文字提示信息*/
    	objid = $(this)[0].obj_id
    	if ($(this).parent().attr('data-val')) {
    		data_val = $(this).parent().attr('data-val');
    	}
    	c_div = document.createElement('div')
    	$(c_div).css({left:x + 'px',top:y + 'px',width:'20px',height:'20px',position:'absolute',background:'url('+srcImg + ')',backgroundSize:'100%',opacity:0.6})
    	$('body').append(c_div)
    	$('body').css({cursor:'url(img/zq.ico),auto'});
    	$('.model_left').css({cursor:'url(img/zq.ico),auto'});
    	$('.model_hide_ul li img').css({cursor:'url(img/zq.ico),auto'});
    	return false;
    })
	$(document).live('mousemove',function (evt) {
		evt = evt || window.event;
		var x = evt.clientX -10;
		var y = evt.clientY - 10;
		$(c_div).css({top:y + 'px',left:x + 'px'})
	})
    // 除画布外，当鼠标抬起清除图片信息
    $(document).live('mouseup',function () {
    	a = null;
	    b = null;
	    objid = null;
    	$('.model_left').css({cursor:'auto'});
    	$('body').css({cursor:'auto'});
    	$('.model_hide_ul li img').css({cursor:'url(img/fk.ico),auto'})
    	$(c_div).remove()
    })
    // 连接方法
    function lianjie (aaa) {
    	if (aaa[0].text == '文件' || aaa[0].text == '数据导入') {
    		return true
    	} else if (aaa[0].text == '标准化' || aaa[0].text == '异常值检测' || aaa[0].text == '特征选择' || aaa[0].text == '变量离散化' || aaa[0].text == '多项式特征' || aaa[0].text == '标签编码' || aaa[0].text == '主成分分析' || aaa[0].text == '因子分析' || aaa[0].text == '独热编码' ) {
    		if (aaa[1].text != '文件') {
    			return true
    		}
    	} else if (aaa[0].text == 'SVM' || aaa[0].text == '神经网络' || aaa[0].text == '逻辑回归' || aaa[0].text == '决策树' || aaa[0].text == 'Adaboost' || aaa[0].text == 'GBDT' || aaa[0].text == '随机森林' || aaa[0].text == 'KNN' || aaa[0].text == '朴素贝叶斯' || aaa[0].text == 'K-Means' || aaa[0].text == 'K-Medians' || aaa[0].text == '系统聚类' || aaa[0].text == '关联分析' || aaa[0].text == '对应分析' || aaa[0].text == '移动平均' || aaa[0].text == '简单指数平滑' || aaa[0].text == 'Holt指数平滑' || aaa[0].text == 'Winter指数平滑' || aaa[0].text == '分解预测' || aaa[0].text == '线性回归' || aaa[0].text == '相关系数矩阵' || aaa[0].text == '词频统计' || aaa[0].text == 'Textrank') {
    		if (aaa[1].text == '模型结果显示' || aaa[1].text == '预测结果显示' || aaa[1].text == '预测') {
    			return true;
    		}
    	} else if (aaa[0].text == '数据集拆分') {
    		if (aaa[1].text == '逻辑回归分布式') {
    			return true;
    		}
    	} else if (aaa[0].text == '预测') {
    		if (aaa[1].text == '预测结果显示') {
    			return true;
    		}
    	} else {
    		return false
    	}
    }
// 渲染首页点击的模型
	if (model_id_index) {
		huanyuan(model_id_index)
	}
// 鼠标进入画布并抬起时触发在画布中创建节点的操作
    var x1;
    var y1;
	$(canvas).live('mouseenter',function (evt) {
		$(c_div).mouseup(function (evt) {
			var evt = evt || window.event
			x1 = $(canvas).offset().left;
			y1 = $(canvas).offset().top;
			var x = evt.clientX - x1 - 15;
			var y = evt.clientY - y1 - 15;
			if (b) {
			    var node = new JTopo.Node(a);
			    node.msg = '';
			    node.obj_id = objid;
			    node.data_val = data_val;
	    		node.fontColor = "255,255,255";
	    		node.font = "10px 微软雅黑";
				node.fillColor = "#000204";
				node.setImage(b + "-1.fw.png");
				node.img = b + "-1.fw.png";
				node.setSize(30,30);
				node.setLocation(x,y);
				node.showSelected = true;
				scene.add(node);
    			$(c_div).remove();
		    	$('.model_left').css({cursor:'auto'});
		    	$('body').css({cursor:'auto'});
		    	$('.model_hide_ul li img').css({cursor:'url(img/fk.ico),auto'})
				// 节点创建完成，a,b恢复为空
				b = null;
				a = null;
				nodeclick1(node);
				nodeclick2(node);
			}
			return false;
		})
	})
// 在画布中的图标上鼠标按下时获取位置信息
	// 判断画布中是否存在未连线节点
	function islinknonde (arr) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].text != '文件') {
				if (arr[i].inLinks == null || arr[i].inLinks.length == 0) {
					return true;
				} else if (arr[i].text == '预测' && arr[i].inLinks.length == 1) {
					return true;
				}
			}
		}
		return false;
	}
	function nodeclick1 (this_node) {
		this_node.addEventListener('mousedown',function (evt) {
			var evt = evt || window.event;
			var evtx = evt.clientX;
			var evty = evt.clientY;
			// 在画布中的图标上鼠标抬起时获取位置信息
			this_node.addEventListener('mouseup',function (evt) {
				var evt = evt || window.event;
				var evtx2 = evt.clientX;
				var evty2 = evt.clientY;
				var thisnode = this;
				if (evt.button == 2) {
					if ($(this)[0].outLinks != null && $(this)[0].outLinks.length != 0) {
						$(this)[0].outLinks[0].nodeZ.outLinks = null
					}
					scene.remove(this);
				}
				// 通过对比两次位置信息，排除拖拽节点时触发的点击事件
				if (evtx == evtx2 && evty == evty2 && evt.button == 0) {
					var Arr = scene.getDisplayedNodes();
					if (islinknonde(Arr)) {
						links.push(thisnode);/*把点击获取的当前节点添加到空数组*/
						if (links.length < 2) {
							var node2 = new JTopo.Node();
							node2.setSize(0,0);
							node2.setLocation(evtx2 - x1,evty2 - y1);
							var link = new JTopo.Link();
							link.nodeA = thisnode;
							link.nodeZ = node2;
							scene.addEventListener('mousemove',function (evt) {
								var evt = evt || window.event
								var x2 = evt.clientX - x1;
								var y2 = evt.clientY - y1;
								node2.setLocation(x2,y2);
							})
							scene.add(link);
							aaa = link;	
						}
						if (links.length >= 2) {
							scene.removeEventListener('mousemove')
							scene.remove(aaa);
							if (links[0] != links[1]) {
								if (links[1].text != '预测') {
									if (links[1].outLinks == null || links[1].inLinks.length == 0) {
										if (lianjie(links)) {
											var link2 = new JTopo.Link(links[0],links[1]);
											scene.add(link2);
											// links[1].msg = links[0].msg;
											if (link2.nodeA.msg2) {
												link2.nodeZ.msg = link2.nodeA.msg2;
											} else {
												link2.nodeZ.msg = link2.nodeA.msg;
											}
											if (link2.nodeA.msg3) {
												link2.nodeZ.msg3 = link2.nodeA.msg3;
											}
											link2.nodeZ.objId = link2.nodeA.objId2;
											link2.dbclick(function () {
												link2.nodeZ.outLinks = null;
												scene.remove(link2)
											})
											links = [];
										} else {
											alertmsg('这是一个错误连接方法1')
											links = [];
										}
									} else {
										alertmsg('这是一个错误连接方法2')
										links = [];
									}
								} else if (!links[1].inLinks || links[1].inLinks.length <= 1) {
									if (lianjie(links)) {
										var link2 = new JTopo.Link(links[0],links[1]);
										scene.add(link2);
										if (link2.nodeA.text == '文件' || link2.nodeA.text == '标准化' || link2.nodeA.text == '变量离散化' || link2.nodeA.text == '多项式特征' || link2.nodeA.text == '标签编码' || link2.nodeA.text == '主成分分析' || link2.nodeA.text == '因子分析' || link2.nodeA.text == '独热编码' || link2.nodeA.text == '异常值检测') {
											link2.nodeZ.msg = link2.nodeA.msg
										}
										link2.dbclick(function () {
											link2.nodeZ.outLinks = null;
											scene.remove(link2)
										})
										links = [];
									} else {
										alertmsg('这是一个错误连接方法3')
										links = [];
									}
								} else{
									alertmsg('这是一个错误连接方法5')
									links = [];
								}
							} else {
								links = [];
							}
						}
					}
					scene.click(function (evt) {
						if (evt.target == null) {
							if (aaa) {
								scene.remove(aaa);
							}
							links = [];
						}
					})
				}
				var this_node = this
				nodeclick2(this_node);
			})
		})
	}
// 数据文件列表的获取
	function get_datalist () {
		$('.model_right_form0>.select2').html('');
		if (thisnode && thisnode.obj_name) {
			$('.select_box input').val(thisnode.obj_name);
		} else {
			$('.select_box input').val('');
		}
		var ul = document.createElement('ul');
		$.ajax({
			type:"GET",
			url:url_ip + "/model/",
			cache:false,
			data:{},
			datatype:"json",
			headers:{"Authorization":token},
			beforeSend:function () {
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
				shuju = data;
				for (var i = 0;i < data.length;i++) {
					if (data[i].where == 'mongodb') {
						var option = document.createElement('li');
						option.innerHTML = data[i].file_name;
						$(ul).append(option);	
					}
				}
				$('.model_right_form0>.select2').html(ul);
			},
			error:function () {
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('获取文件列表失败')
	            }
			},
			complete:function () {
				clearInterval(_tid)
				$('.loading').hide();
				$('.mu').hide();
			}
		});
		if (thisnode.objId && thisnode.objId != '') {
			$.ajax({
				type:"GET",
				url:url_ip + "/model/readdata/?obj_id="+thisnode.objId,
				cache:false,
				data:{obj_id:thisnode.objId},
				datatype:"json",
				headers:{"Authorization":token},
				success:function (data) {
					shuju2 = data.data;
				},
				error:function () {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('获取"' + x[0].file_name + '"数据失败')
		            }
				}
			})
		}
	}
// 分布式文件列表的获取
	function get_fenbudata () {
		$('.model_ul2_li34 select:eq(0)').empty();
		$.ajax({
			type:"GET",
			url:url_ip + "/model/",
			cache:false,
			data:{},
			datatype:"json",
			headers:{"Authorization":token},
			beforeSend:function () {
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
				//console.log(data)
				for (var i = 0;i < data.length;i++) {
					if (data[i].where == 'hdfs') {
						var option = document.createElement('option');
						option.innerHTML = data[i].file_name;
						$(option)[0].value = data[i].format_filename
						$('.model_ul2_li34 select:eq(0)').append(option);	
					}
				}
			},
			error:function () {
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('获取"数据导入"数据列表失败')
	            }
			},
			complete:function () {
				clearInterval(_tid)
				$('.loading').hide();
				$('.mu').hide();
			}
		});
	}	
// 画布中点击图标时右侧栏显示内容
	function nodeclick2 (this_node) {
		var txt = this_node.text
		thisnode = this_node;
		//console.log(this_node)
		$('.model_right_name').html(txt)
		$('.model_right_name')[0].title = this_node._id;
		$('.model_right_name')[0].data_val = this_node.data_val;
		canshu = [];
		canshu_x = '';
		canshu_y = '';
		ycl_result = '';
		if (txt == '文件') {
			$('.model_right_form').css('display','none');
			$('.model_right_form0').css('display','block');
			get_datalist();
			// 下拉按钮
			var x;
			var sel = true;
			$('.select_box i,.select_box input').click(function () {
				if (sel) {
					$('.select2').css('display','block');
				} else {
					$('.select2').css('display','none');
				}
				sel = !sel
				return false;
			})
			// 鼠标移入变色
			$('.select2 li').live('mouseenter',function () {
				$('.select2 li').removeClass('check');
				$(this).addClass('check');
				sel = true;
			});
			// 输入框实时监听并筛选
			$('.select_box input').bind("input propertychange change",function () {
				if ($('.select_box input').val() != '') {
					var zz = $('.select_box input').val();
					$('.select2 li').css('display','none')
					$('.select2 li:contains("' + zz + '")').css('display','block')
				} else {
					$('.select2 li').css('display','block')
				}
			})
			// 点击查看事件
			$('.model_right_form0 .btn1').click(function () {
				$('.form3_box table').empty();
				$('.form3_box table').append('<tr><td>列号</td><td>字段</td></tr>')
				for (var i = 0;i < shuju2[0].length;i ++) {
					var tr = document.createElement('tr')
					var td = document.createElement('td')
					$(td).html(i)
					var td2 = document.createElement('td')
					$(td2).html(shuju2[0][i]);
					$(tr).append(td);
					$(tr).append(td2);
					$('.form3_box table').append(tr)
				};
				$('.model_right_form').css('display','none');
				$('.model_right_form2').css('display','block');
			})
			// 详情
			$('.model_right_form2 .btn2').click(function () {
				$('#msg_box').css('display','block');
				$('#msg_box div').empty();
				$('#msg_box div').hide();
				$('.msg_box0').show();
				var table0 = document.createElement('table')
				for (var j = 0;j < shuju2.length; j ++) {
					var shuju3 = shuju2[j];
					var tr = document.createElement('tr');
					$('.form3_box_txt').append($(tr));
					for (var k = 0; k < shuju3.length; k++) {
						var td = document.createElement('td');
						td.innerHTML = shuju3[k];
						$(tr).append(td);
					}
					$(table0).append(tr)
				};
				$('.msg_box0').append(table0)
				$('#msg_box .close img').click(function () {
					$('#msg_box').css('display','none');
				})
			})
			// 表格预览页返回按钮
			$('.model_right_form2 .btn1').click(function () {
				$('.model_right_form').css('display','none');
				$('.model_right_form0').css('display','block');
			});
			// 文件页重置按钮
			$('.model_right_form0 .btn2').click(function () {
				$('.select_box input').val('');
				thisnode.objId = '';
				thisnode.objId2 = '';
				thisnode.msg = '';
				$('.form3_box table').empty();
				$('#msg_box div').empty();
				$('.select2 li').css('display','block')
			})
		} else if (txt == '模型结果显示') {
			$('.model_right_form').css('display','none');
			$('.model_right_form3').css('display','block');
		} else if (txt.substr(0,1) == '_') {
			var zijian_val = this_node.data_val;
			//console.log(zijian_val)
			$('.model_right_form').css('display','none');
			$('.model_right_form8').css('display','block');
			$.ajax({
		        type: "GET",
		        url: url_ip + "/examine/upalgocrud/?id="+zijian_val+"&adopt="+1,
		        async: false,
		        data: {},
		        dataType: "json",
		        headers:{"Authorization":token},
				beforeSend:function () {
					$('.mu').show();
					$('.loading').show();
					clearInterval(_tid)
					var a = 0;
					_tid = setInterval(function () {
						a += 22.5
						$('.loading').css('transform','rotate(' + a + 'deg)')
					},100)
				},
		        success: function (data) {
		        	var arr;
		        	//console.log(data)
					def_name2 = data.data.configuration.defname;
					$('.model_right_form8 form')[0].defname = data.data.funcname
					$('.model_right_form8 form').empty();
					$('.model_right_form8 form').append('<input type="reset" style="display:none;">')
					//console.log(data.data.configuration.y_msg)
					if (data.data.configuration.y_msg) {
						var html0 = '<div class="form0_txt">x列号</div>'+
									'<input type="text" class="model_shulie" placeholder="请选择X列号/数值">'+
									'<div class="form0_txt">y列号</div>'+
									'<input type="text" class="model_fenzu" placeholder="请选择y列号/字段">'	
					} else {
						var html0 = '<div class="form0_txt">x列号</div>'+
									'<input type="text" class="model_shulie" placeholder="请选择X列号/数值">'
					}
					$('.model_right_form8 form').append(html0)
		        	if (data.data.configuration.csin) {
		        		arr = data.data.configuration.csin;
						$('.model_right_form8 form')[0].index = arr.length;
						$.each(arr,function (key,value) {
							var div = document.createElement('div');
							$(div).addClass('form0_txt');
							$(div).html(value.name)
							$('.model_right_form8 form').append(div)
							if (value.option.code == 1001) {
								var input = document.createElement('input');
								$(input).attr({type:'text',value:value.default})
								$(input).addClass(data.data.configuration.defname + key + '')
								$(input)[0].type2 = value.type;
								$('.model_right_form8 form').append(input)
							} else if (value.option.code == 1002) {
								var select = document.createElement('select');
								$(select).addClass(data.data.configuration.defname + key + '')
								$(select)[0].type2 = value.type;
								for (var i = 0; i < value.option.content.length; i++) {
									var option = document.createElement('option');
									var optionname;
									if (value.option.content[i] === true ) {
										optionname = 'true'
									} else if (value.option.content[i] === false ) {
										optionname = 'false'
									} else if (value.option.content[i] === null ) {
										optionname = 'null'
									} else {
										optionname = value.option.content[i]
									}
									$(option).attr({value:optionname});
									$(option)[0].innerHTML = optionname
									$(select).append(option)
								}
								$('.model_right_form8 form').append(select)
							} else if (value.option.code == 1003) {
								var html = '<input type="radio" name="'+ data.data.configuration.defname + key + '' +'" checked class="'+ data.data.configuration.defname + key + '' +'" type2="'+value.type+'"><span class="form0_txt">'+value.option.content[0].a1+'</span>'+
			                        '<div><input type="text" value="'+value.option.content[0].a2+'" class="_input"></div>'+
			                        '<input type="radio" name="'+ data.data.configuration.defname + key + '' +'"  class="'+ data.data.configuration.defname + key + '' +'" type2="'+value.type+'"><span class="form0_txt">'+value.option.content[1].b1+'</span>'+
			                        '<div><input type="text" value="'+value.option.content[1].b2+'" class="_input"></div>'
		                        $('.model_right_form8 form').append(html)
							}
						})
		        	}
		        },
		        error: function (data) {
		            console.log(data)
		            if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
		        },
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
		    })
		} else if (txt == '预测结果显示') {
			$('.model_right_form').css('display','none');
			$('.model_right_form4').css('display','block');
		} else if (txt == '数据导入') {
			$('.model_right_form').css('display','none');
			$('.model_right_form6').css('display','block');
			$.ajax({
				type:'GET',
				url:url_ip + '/algomodelget/' + this_node.obj_id + '/',
				cache:false,
				data:{},
				datatype:"json",
				headers:{"Authorization":token},
				success:function (data) {
					def_num = 0;
					//console.log(data)
					def_name = data.configuration.defname;
					var arr = data.configuration.csin;
					$('.model_ul2_li34').empty();
					$('.model_ul2_li34').append('<input type="reset" style="display:none;">')
					$.each(arr,function (key,value) {
						def_num++;
						var div = document.createElement('div');
						$(div).addClass('form0_txt');
						$(div).html(value.name)
						$('.model_ul2_li34').append(div)
						if (value.option.code == 1001) {
							var input = document.createElement('input');
							$(input).attr({type:'text',value:value.default})
							$(input).addClass(data.configuration.defname + key + '')
							$('.model_ul2_li34').append(input)
						} else if (value.option.code == 1002) {
							var select = document.createElement('select');
							$(select).addClass(data.configuration.defname + key + '')
							for (var i = 0; i < value.option.content.length; i++) {
								var option = document.createElement('option');
								var optionname;
								if (value.option.content[i] === true ) {
									optionname = 'true'
								} else if (value.option.content[i] === false ) {
									optionname = 'false'
								} else if (value.option.content[i] === null ) {
									optionname = 'null'
								} else {
									optionname = value.option.content[i]
								}
								$(option).attr({value:optionname});
								$(option)[0].innerHTML = optionname
								$(select).append(option)
							}
							$('.model_ul2_li34').append(select)
						} else if (value.option.code == 1003) {
							//console.log(666)
						}
					});
					//console.log(def_num)
					get_fenbudata();
				}, 
				error:function(data) {
					console.log(data)
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				}
			})
		} else if (txt == '数据集拆分' || txt == '逻辑回归分布式') {
			$('.model_right_form').css('display','none');
			$('.model_right_form7').css('display','block');
			path = thisnode.msg3;
			$.ajax({
				type:'GET',
				url:url_ip + '/algomodelget/' + this_node.obj_id + '/',
				cache:false,
				data:{},
				datatype:"json",
				headers:{"Authorization":token},
				success:function (data) {
					//console.log(data)
					var arr = data.configuration.csin;
					def_name = data.configuration.defname;
					$('.model_ul2_li35').empty();
					$('.model_ul2_li35').append('<input type="reset" style="display:none;">')
					def_num = 0;
					$.each(arr,function (key,value) {
						def_num++;
						if (value.option.code != 1000) {
							var div = document.createElement('div');
							$(div).addClass('form0_txt');
							$(div).html(value.name)
							$('.model_ul2_li35').append(div)	
						}
						if (value.option.code == 1001) {
							var input = document.createElement('input');
							$(input).attr({type:'text',value:value.default})
							$(input).addClass(data.configuration.defname + key + '')
							if (value.name == 'x列号') {
								$(input).addClass('model_shulie')
							} else if (value.name == 'y列号') {
								$(input).addClass('model_fenzu')
							}
							$(input)[0].type2 = value.type;
							$('.model_ul2_li35').append(input)
						} else if (value.option.code == 1002) {
							var select = document.createElement('select');
							$(select).addClass(data.configuration.defname + key + '')
							$(select)[0].type2 = value.type;
							for (var i = 0; i < value.option.content.length; i++) {
								var option = document.createElement('option');
								var optionname;
								if (value.option.content[i] === true ) {
									optionname = 'true'
								} else if (value.option.content[i] === false ) {
									optionname = 'false'
								} else if (value.option.content[i] === null ) {
									optionname = 'null'
								} else {
									optionname = value.option.content[i]
								}
								$(option).attr({value:optionname});
								$(option)[0].innerHTML = optionname
								$(select).append(option)
							}
							$('.model_ul2_li35').append(select)
						} else if (value.option.code == 1003) {
							//console.log(666)
						}
					})
				}, 
				error:function(data) {
					console.log(data)
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				}
			})
			if (thisnode.msg3) {
				$.ajax({
					type:'GET',
					url:url_ip + '/model/ReadHdfsData2/?hdfsName=' + thisnode.msg3[0],
					cache:false,
					data:{},
					datatype:"json",
					headers:{"Authorization":token},
					success:function (data) {
						//console.log(data)
						thisnode.msg = data.data;
					}, 
					error:function(data) {
						console.log(data)
						if (data.status == 401) {
			            	if (token == 'JWT undefined' || token == 'JWT null') {
			            		$('.shade p').html('您目前还没有注册或登录~ ')
								$('.shade').show();
			            	} else {
			            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
			            		$('.shade').show();
			            	}
			            } else {
			            	alertmsg('未知错误。',touch_us)
			            }
					}
				})	
			}
		} else {
			$('.model_right_form').css('display','none');
			$('.model_right_form1').css('display','block');
			if (txt == '标准化' || txt == '异常值检测' || txt == '特征选择' || txt == '变量离散化' || txt == '多项式特征' || txt == '标签编码' || txt == '主成分分析' || txt == '因子分析' || txt == '独热编码' ) {
				// $('.model_form1_ul1 .btn3').css('left','70%')
				$('.model_form1_ul1 .btn2').show();
			} else {
				// $('.model_form1_ul1 .btn3').css('left','55%')
				$('.model_form1_ul1 .btn2').hide();
			}
			$('.model_form1_ul1').css('display','block');
			$('.model_form1_btn.fl').click(function () {
				$('.model_form1_ul1').css('display','block');
			})
			//参数设置
			if (txt == '标准化') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li1').css('display','block')
				$('.model_ul2_li1>select').change(function () {
					if ($(this).val() == 'Binarizer') {
						$('.li1_child').css('display','block');
						$('.li1_child2').css('display','none');
					} else if ($(this).val() == 'Function') {
						$('.li1_child').css('display','none');
						$('.li1_child2').css('display','block');
					} else {
						$('.li1_child').css('display','none');
						$('.li1_child2').css('display','none');
					}
				})
			} else if (txt == '异常值检测') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li2').css('display','block')
			} else if (txt == '特征选择') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li3').css('display','block')
			} else if (txt == '变量离散化') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li4').css('display','block')
			} else if (txt == '多项式特征') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li5').css('display','block')
			} else if (txt == '标签编码') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li6').css('display','block')
			} else if (txt == '主成分分析') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li7').css('display','block')
			} else if (txt == '因子分析') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li8').css('display','block')
			} else if (txt == '独热编码') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li9').css('display','block')
			} else if (txt == 'SVM') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li10').css('display','block')
			} else if (txt == '神经网络') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li11').css('display','block')
			} else if (txt == '逻辑回归') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li12').css('display','block')
			} else if (txt == '朴素贝叶斯') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li13').css('display','block')
			} else if (txt == '决策树') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li14').css('display','block')
			} else if (txt == 'Adaboost') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li15').css('display','block')
			} else if (txt == 'GBDT') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li16').css('display','block')
			} else if (txt == '随机森林') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li17').css('display','block')
			} else if (txt == 'KNN') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li18').css('display','block')
			} else if (txt == 'K-Means') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li19').css('display','block')
			} else if (txt == 'K-Medians') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li20').css('display','block')
			} else if (txt == '系统聚类') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li21').css('display','block')
			} else if (txt == '关联分析') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li22').css('display','block')
			} else if (txt == '对应分析') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li23').css('display','block')
			} else if (txt == '移动平均') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li24').css('display','block')
			} else if (txt == '简单指数平滑') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li25').css('display','block')
			} else if (txt == 'Holt指数平滑') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li26').css('display','block')
			} else if (txt == 'Winter指数平滑') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li27').css('display','block')
			} else if (txt == '分解预测') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li28').css('display','block')
			} else if (txt == '线性回归') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li29').css('display','block')
			} else if (txt == '相关系数矩阵') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li30').css('display','block')
			} else if (txt == '词频统计') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li31').css('display','block')
			} else if (txt == 'Textrank') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li32').css('display','block')
			} else if (txt == '预测') {
				$('.model_ul2_li').css('display','none')
				$('.model_ul2_li34').css('display','block')
			}
		}
	}
	// 鼠标点击获取 
	$('.select2 li').live('click',function () {
		$('.select2').css('display','none');
		$('.select_box input').val($(this).html());
		thisnode.obj_name = $(this).html();
		x = shuju.filter(function (e) {return e.file_name == $('.select_box input').val()});
		thisnode.objId = x[0].obj_id;
		thisnode.objId2 = x[0].obj_id;
		$.ajax({
			type:"GET",
			url:url_ip + "/model/readdata/?obj_id="+thisnode.objId,
			cache:false,
			data:{obj_id:thisnode.objId},
			datatype:"json",
			headers:{"Authorization":token},
			beforeSend:function () {
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
				//console.log(data)
				shuju2 = data.data;
				thisnode.msg = shuju2;
				if (thisnode.outLinks && thisnode.outLinks.length > 0) {
					for (var i = 0; i < thisnode.outLinks.length; i++) {
						thisnode.outLinks[i].nodeZ.msg = shuju2;
						thisnode.outLinks[i].nodeZ.objId = thisnode.objId
						thisnode.outLinks[i].nodeZ.canshu_x = '';
						thisnode.outLinks[i].nodeZ.canshu_y = '';
					}
				}
			},
			error:function () {
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
					alertmsg('获取"' + x[0].file_name + '"数据失败')
	            }
			},
			complete:function () {
				clearInterval(_tid)
				$('.loading').hide();
				$('.mu').hide();
			}
		})
	})
	// 模型结果显示
	$('.form3_btn').live('click',function () {
		var nownode2 = scene.findElements( function (e) { 
			return e._id == $('.model_right_name')[0].title; 
		});
		result_show(nownode2[0].msg,nownode2[0].objId);
	})
// 结果展示封装
	function result_show (msgs,ObjId) {
		$('.model_right_form').css('display','none');
		$('#model_result_box').css('display','block');
		$('.model_result_title2>div').hide();
		$('.model_result_title2 select').val('cs')
		$('.cs_result').show();
		$('.cs_result>div').hide();
		$('.xl_result').hide();
		$('.xl_result>div').hide();
		// 下载
		$('.download').click(function () {
			$('.model_result_title2 a').attr('href',url_ip + "/model/ExportContentByJiraVersion/?obj_id=" + ObjId +"&site_name=lalala&jira_version=0");
		})
		// 关闭
		$('.model_result_title img').click(function () {
			$('#model_result_box').css('display','none');
		})
		var thismsg = msgs;
		//console.log(thismsg)
		$('.model_result_title2 input').click(function () {
			if ($(this).is(':checked')) {
				var name = $(this)[0].name
				if (name.substr(name.length - 5) == 'train') {
					$('.xl_'+name).show();
				} else {
					$('.cs_'+name).show();
				}
			} else {
				var name = $(this)[0].name
				if (name.substr(name.length - 5) == 'train') {
					$('.xl_'+name).hide();
				} else {
					$('.cs_'+name).hide();
				}
			}
		})
		var asd = $('.model_result_title2').children('.div')
		//console.log(asd)
		$.each(thismsg,function (key,val) {
			for (var i = 0; i < asd.length; i++) {
				if (key.substr(0,4) != 'trai') {
					if (key == asd[i].id) {
						$('#' + asd[i].id).show();
						var name = $('#' + asd[i].id).children('input')[0].name
						$('.cs_'+name).show();
					}
				}
			}
		})
		if (thismsg.ciyuntu) {
			$('.cs_cyt img').attr('src',url_ip+"/model/pics/?type=ciyuntu&objID="+ObjId)
		}
		if (thismsg.dyfxt) {
			$('.cs_dyfxt img').attr('src',url_ip+"/model/pics/?type=dyfxt&objID="+ObjId)
		}
		if (thismsg.test_confusion_matrix) {
			$('.cs_hxjz_test_context img').attr('src',url_ip+"/model/pics/?type="+thismsg.test_confusion_matrix+"&objID="+ObjId)	
		}
		if (thismsg.train_confusion_matrix) {
			$('.xl_hxjz_train_context img').attr('src',url_ip+"/model/pics/?type="+thismsg.train_confusion_matrix+"&objID="+ObjId)	
		}
		if (thismsg.Dendrogram_data) {
			$('.cs_SZT_context img').attr('src','');
			$('.cs_SZT_context img').attr('src',url_ip+"/model/pics/?type="+thismsg.Dendrogram_data+"&objID="+ObjId)	
		}
		if (thismsg.train_omega_matrix_fig_data) {
			var arr = thismsg.train_omega_matrix_fig_data
			//console.log(arr)
			$('.xl_hgfc_train_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.xl_hgfc_train_context table').append(tr)
			}
		}
		if (thismsg.test_omega_matrix_fig_data) {
			var arr = thismsg.test_omega_matrix_fig_data
			//console.log(arr)
			$('.cs_hgfc_test_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_hgfc_test_context table').append(tr)
			}
		}
		if (thismsg.test_result_data) {
			var arr = thismsg.test_result_data
			//console.log(arr)
			$('.cs_mxjg_test_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxjg_test_context table').append(tr)
			}
		}
		if (thismsg.train_result_data) {
			var arr = thismsg.train_result_data
			//console.log(arr)
			$('.xl_mxjg_train_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.xl_mxjg_train_context table').append(tr)
			}
		}
		if (thismsg.test_result_validation_1) {
			var arr2 = thismsg.test_result_validation_1
			//console.log(arr2);
			$('.cs_mxzb1_test_context table').empty();
			for (var i = 0; i < arr2.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr2[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr2[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxzb1_test_context table').append(tr)
			}	
		}
		if (thismsg.test_result_validation_2) {
			var arr3 = thismsg.test_result_validation_2
			//console.log(arr3);
			$('.cs_mxzb2_test_context table').empty();
			for (var i = 0; i < arr3.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr3[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr3[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxzb2_test_context table').append(tr)
			}	
		}
		if (thismsg.train_result_validation_1) {
			var arr2 = thismsg.train_result_validation_1
			//console.log(arr2);
			$('.xl_mxzb1_train_context table').empty();
			for (var i = 0; i < arr2.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr2[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr2[i][j];
					tr.appendChild(td)
				}
				$('.xl_mxzb1_train_context table').append(tr)
			}	
		}
		if (thismsg.train_result_validation_2) {
			var arr3 = thismsg.train_result_validation_2
			//console.log(arr3);
			$('.xl_mxzb2_train_context table').empty();
			for (var i = 0; i < arr3.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr3[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr3[i][j];
					tr.appendChild(td)
				}
				$('.xl_mxzb2_train_context table').append(tr)
			}	
		}
		if (thismsg.test_ROC_data) {
			$('#roc').empty();
			var arr4 = thismsg.test_ROC_data
			ROCChart(arr4,'roc');		
		}
		if (thismsg.train_ROC_data) {
			$('#roc2').empty();
			var arr4 = thismsg.train_ROC_data
			ROCChart(arr4,'roc2');		
		}
		if (thismsg.PREDICTED_TRAINING) {
			var arr = thismsg.PREDICTED_TRAINING
			//console.log(arr)
			$('.cs_mxjg_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				var td0 = document.createElement('td');
				if (i != 0) {
					$(td0).html(i)
				} else {
					$(td0).html('')
				}
				tr.appendChild(td0)
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxjg_context table').append(tr)
			}
		}
		if (thismsg.PREDICTED_RESULTS_ON_NEW_DATA) {
			var arr = thismsg.PREDICTED_RESULTS_ON_NEW_DATA
			//console.log(arr)
			$('.cs_ydpj_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				var td0 = document.createElement('td');
				if (i != 0) {
					$(td0).html(i)
				} else {
					$(td0).html('')
				}
				tr.appendChild(td0)
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_ydpj_context table').append(tr)
			}
		}
		if (thismsg.MODEL_VERIFICATION) {
			var arr = thismsg.MODEL_VERIFICATION
			//console.log(arr)
			$('.cs_mxzb1_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxzb1_context table').append(tr)
			}
		}
		if (thismsg.MODEL_VERIFICATION_2) {
			var arr = thismsg.MODEL_VERIFICATION_2
			//console.log(arr)
			$('.cs_mxzb2_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxzb2_context table').append(tr)
			}
		}
		if (thismsg.DRAW_DATA) {
			var obj = {};
			obj.chart_title = "散点图";
			obj.series = thismsg.DRAW_DATA;
			//console.log(obj)
			scatterChart(obj);		
		}
		if (thismsg.DRAW_DATA2) {
			var obj = {};
			obj.chart_title = "折线图";
			obj.legend = thismsg.DRAW_DATA2.x.value;
			obj.data = thismsg.DRAW_DATA2.Y
			//console.log(obj)
			lineChart(obj,$('#sdt2')[0]);	
		}
		if (thismsg.DRAW_DATA3) {
			var obj = {};
			obj.chart_title = "折线图";
			obj.legend = thismsg.DRAW_DATA3.x.value;
			obj.data = thismsg.DRAW_DATA3.Y
			//console.log(obj)
			lineChart(obj,$('#ZXT')[0]);		
		}
		if (thismsg.Original_Series) {
			var obj = {};
			obj.legend = thismsg.Original_Series.x.value;
			obj.data = [thismsg.Original_Series.Y]
			//console.log(obj)
			lineChart(obj,$('#YSZXT')[0]);		
		}
		if (thismsg.Random) {
			var obj = {};
			obj.legend = [];
			obj.data = [];
			for (var i = 0; i < thismsg.Random.length; i++) {
				obj.legend.push(i);
				obj.data.push(thismsg.Random[i][0])
			}
			//console.log(obj)
			lineChart2(obj,$('#SJZXT')[0]);		
		}
		if (thismsg.Season) {
			var obj = {};
			obj.legend = [];
			obj.data = [];
			for (var i = 0; i < thismsg.Season.length; i++) {
				obj.legend.push(i);
				obj.data.push(thismsg.Season[i][0])
			}
			//console.log(obj)
			lineChart2(obj,$('#JJZXT')[0]);		
		}
		if (thismsg.Trend) {
			var obj = {};
			obj.legend = [];
			obj.data = [];
			for (var i = 0; i < thismsg.Trend[3].length; i++) {
				obj.legend.push(thismsg.Trend[3][i][0]);
				obj.data.push(thismsg.Trend[3][i][1])
			}
			//console.log(obj)
			lineChart3(obj,$('#PHZXT')[0]);		
		}
		if (thismsg.trend_fitted_result) {
			var obj = {};
			obj.legend = [];
			obj.data = {};
			obj.data.y1 = [];
			obj.data.y2 = [];
			for (var i = 0; i < thismsg.trend_fitted_result.trend_fitted_result.length; i++) {
				obj.data.y1.push(thismsg.trend_fitted_result.trend_fitted_result[i][0])
				obj.data.y2.push(thismsg.trend_fitted_result.trend_result[i][0])
				obj.legend.push(i)
			}
			//console.log(obj)
			lineChart4(obj,$('#ROT')[0]);		
		}
		if (thismsg.result_validation_1) {
			var arr = thismsg.result_validation_1
			//console.log(arr)
			$('.cs_mxjgjy1_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxjgjy1_context table').append(tr)
			}
		}
		if (thismsg.result_validation_3) {
			var arr = thismsg.result_validation_3
			//console.log(arr)
			$('.cs_mxjgjy3_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxjgjy3_context table').append(tr)
			}
		}
		if (thismsg.result_validation_2) {
			var arr = thismsg.result_validation_2
			//console.log(arr)
			$('.cs_mxjgjy2_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxjgjy2_context table').append(tr)
			}
		}
		if (thismsg.result_validation_4) {
			var arr = thismsg.result_validation_4
			//console.log(arr)
			$('.cs_mxjgjy4_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxjgjy4_context table').append(tr)
			}
		}
		if (thismsg.result_data) {
			var arr = thismsg.result_data
			//console.log(arr)
			$('.cs_mxnhjg_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxnhjg_context table').append(tr)
			}
		}
		if (thismsg.text_data) {
			var arr = thismsg.text_data
			//console.log(arr)
			$('.cs_text_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				$.each(arr[i],function (key,val) {
					var td = document.createElement('td')
					$(td).html(val)
					$(tr).append(td)
				})
				$('.cs_text_context table').append(tr)
			}
		}
		if (thismsg.result_data_pred) {
			var arr = thismsg.result_data_pred
			//console.log(arr)
			$('.cs_mxycjg_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxycjg_context table').append(tr)
			}
		}
		if (thismsg.MODEL_VERIFICATION_3) {
			var arr = thismsg.MODEL_VERIFICATION_3
			//console.log(arr)
			$('.cs_mxzb3_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxzb3_context table').append(tr)
			}
		}
		if (thismsg.Square_distance_matrix) {
			var arr = thismsg.Square_distance_matrix
			//console.log(arr)
			$('.cs_jljz_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_jljz_context table').append(tr)
			}
		}
		if (thismsg.cluster) {
			var arr = thismsg.cluster
			//console.log(arr)
			$('.cs_jljg_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_jljg_context table').append(tr)
			}
		}
		if (thismsg.PREDICTED_RESULT) {
			var arr = thismsg.PREDICTED_RESULT
			//console.log(arr)
			$('.cs_mxjgzc_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxjgzc_context table').append(tr)
			}
		}
		if (thismsg.PREDICTED_RESULT_support) {
			var arr = thismsg.PREDICTED_RESULT_support
			//console.log(arr)
			$('.cs_mxjgzx_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_mxjgzx_context table').append(tr)
			}
		}
		if (thismsg.result_data_of_predict) {
			var arr = thismsg.result_data_of_predict
			//console.log(arr)
			$('.cs_yc_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_yc_context table').append(tr)
			}
		}
		if (thismsg.result_data_1) {
			var arr = thismsg.result_data_1
			//console.log(arr)
			$('.cs_GJC_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_GJC_context table').append(tr)
			}
		}
		if (thismsg.result_data_2) {
			var arr = thismsg.result_data_2
			//console.log(arr)
			$('.cs_GJCY_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_GJCY_context table').append(tr)
			}
		}
		if (thismsg.result_data_3) {
			var arr = thismsg.result_data_3
			//console.log(arr)
			$('.cs_ZY_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_ZY_context table').append(tr)
			}
		}
		if (thismsg.CORRELATION_MATRIX) {
			var arr = thismsg.CORRELATION_MATRIX
			//console.log(arr)
			$('.cs_xgxsjz_context table').empty();
			for (var i = 0; i < arr.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < arr[i].length; j++) {
					var td = document.createElement('td');
					td.innerHTML = arr[i][j];
					tr.appendChild(td)
				}
				$('.cs_xgxsjz_context table').append(tr)
			}
		}
		if (thismsg.original_data_season_decomposition) {
			var arr = thismsg.original_data_season_decomposition
			//console.log(arr)
		}
		$('.model_result_title2 select').change(function () {
			$('.model_result_title2>div').hide();
			if ($('.model_result_title2 select').val() == 'xl') {
				$('.cs_result').hide();
				$('.xl_result').show();
				$.each(thismsg,function (key,val) {
					for (var i = 0; i < asd.length; i++) {
						//console.log(key.substr(0,4))
						if (key.substr(0,4) == 'trai') {
							if (key == asd[i].id) {
								$('#' + asd[i].id).show();
								var name = $('#' + asd[i].id).children('input')[0].name
								$('.xl_'+name).show();
							}
						}
					}
				})
			} else if ($('.model_result_title2 select').val() == 'cs') {
				$('.cs_result').show();
				$('.xl_result').hide();
				$.each(thismsg,function (key,val) {
					for (var i = 0; i < asd.length; i++) {
						//console.log(key.substr(0,4))
						if (key.substr(0,4) == 'test') {
							if (key == asd[i].id) {
								$('#' + asd[i].id).show();
								var name = $('#' + asd[i].id).children('input')[0].name
								$('.cs_'+name).show();
							}
						}
					}
				})
			}
		})
	}
// 查重
	function chachong(key,arr) {
		for (var i = 0; i < arr.length; i++) {
			if (key == arr[i]) {
				return true
			}
		}
		return false;
	}
// 点击数值列弹窗
	var checknum = '';
	var childnum = '';
	var checknum2 = '';
	var childnum2 = '';
	var arr1 = '';
	var nownode;
	var canshu_x = '';
	var canshu_y = '';
	$('.model_shulie').live('click',function () {
		$('.mu').show();
		$('#shuzhi_box').css('display','block');
		$('.shuzhi_check').css('backgroundImage','');
		nownode = scene.findElements( function (e) { 
			return e._id == $('.model_right_name')[0].title; 
		});
		var arr = nownode[0].msg;
		arr1 = arr[0];
		$('.shuzhi_left').empty();
		$('.shuzhi_right').empty();
		if (nownode[0].canshu_x && nownode[0].canshu_x != '') {
			canshu_x = nownode[0].canshu_x.split(',')
			for (var i = 0; i < arr1.length; i++) {
				if (chachong(i,canshu_x)) {
					//console.log(i)
					var li = document.createElement('li');
					var span = document.createElement('span')
					var img = document.createElement('img');
					$(img).addClass('cancal');
					$(img).attr('src','img/cancle.png');
					$(span).append(arr1[i]);
					span.index = i
					$(li).append(span)
					$(li).append(img);
					$('.shuzhi_right').append(li)
				} else {
					var li = document.createElement('li');
					var div = document.createElement('div');
					var input = document.createElement('input');
					var span = document.createElement('span')
					$(div).addClass('shuzhi_check');
					$(input).attr('type','checkbox');
					$(span).append(arr1[i]);
					span.index = i;
					$(div).append(input);
					$(li).append(div);
					$(li).append(span);
					$('.shuzhi_left').append(li);
				}
			}
		} else {
			if (arr1) {
				for (var i = 0; i < arr1.length; i++) {
					var li = document.createElement('li');
					var div = document.createElement('div');
					var input = document.createElement('input');
					var span = document.createElement('span')
					$(div).addClass('shuzhi_check');
					$(input).attr('type','checkbox');
					$(span).append(arr1[i]);
					span.index = i;
					$(div).append(input);
					$(li).append(div);
					$(li).append(span);
					$('.shuzhi_left').append(li);
				}	
			}	
		}
		checknum = 0;
		childnum = $('.shuzhi_left').children().length;
	})
	// 输入框实时监听并筛选
	$('.shuzhi_search').bind("input propertychange change",function () {
		if ($(this).val() != '') {
			var zx = $(this).val();
			$('.shuzhi_left li').css('display','none')
			$('.shuzhi_left li:contains("' + zx + '")').css('display','block')
		} else {
			$('.shuzhi_left li').css('display','block')
		}
	})
	// 联动全选
	$('.shuzhi_check input').live('click',function () {
		if ($(this).parent()[0].className == 'shuzhi_check shuzhi_check0') {
			if (this.checked == true) {
				checknum = childnum;
				$('.shuzhi_check input').prop('checked',true);
				$('.shuzhi_check').css('backgroundImage','url(img/check.png)');
			} else {
				checknum = 0;
				$('.shuzhi_check input').prop('checked',false);
				$('.shuzhi_check').css('backgroundImage','');
			}
		} else {
			if (this.checked == true) {
				checknum++;
				$(this).parent().css('backgroundImage','url(img/check.png)');
				if (checknum == childnum) {
					$('.shuzhi_check0 input').prop('checked',true);
					$('.shuzhi_check0').css('backgroundImage','url(img/check.png)');
				}
			} else {
				checknum--;
				$(this).parent().css('backgroundImage','');
				if (checknum != childnum) {
					$('.shuzhi_check0 input').prop('checked',false);
					$('.shuzhi_check0').css('backgroundImage','');
				}
			}	
		}
	});
	// 点击添加添加已选字段
	$('.shuzhi_btn1').live('click',function () {
		var ab =  $('.shuzhi_left li .shuzhi_check input:checked').parent().next();
		var ul = document.createElement('ul');
		for (var i = 0; i < ab.length; i++) {
			var li = document.createElement('li');
			var img = document.createElement('img');
			$(img).addClass('cancal');
			$(img).attr('src','img/cancle.png');
			$(li).append(ab[i]);
			$(li).append(img);
			$('.shuzhi_right').append(li)
		}
		$('.shuzhi_left li .shuzhi_check input:checked').parent().parent().remove();
		childnum = $('.shuzhi_left').children().length;
		checknum = $('..shuzhi_left li .shuzhi_check input:checked').length;
		if (checknum == 0 && childnum == 0) {
			$('.shuzhi_check0 input').prop('checked',false);
			$('.shuzhi_check0').css('backgroundImage','');
		}
	});
	// 点击删除图标删除已添加字段
	$('.shuzhi_right .cancal').live('click',function () {
		var ab = $(this).prev();
		var li = document.createElement('li');
		var div = document.createElement('div');
		var input = document.createElement('input');
		$(div).addClass('shuzhi_check');
		$(input).attr('type','checkbox');
		$(div).append(input);
		$(li).append(div);
		$(li).append(ab);
		//console.log(ab,li);
		$('.shuzhi_left').append(li);
		$(this).parent().remove();
	})
	$('#shuzhi_box .close img').click(function () {
		$('.mu').hide();
		$('#shuzhi_box').css('display','none')
	})
	// 点击清空删除全部已选字段
	$('.shuzhi_btn3').live('click',function () {
		$('.shuzhi_left').empty();
		$('.shuzhi_right').empty();
		for (var i = 0; i < arr1.length; i++) {
			var li = document.createElement('li');
			var div = document.createElement('div');
			var input = document.createElement('input');
			var span = document.createElement('span')
			$(div).addClass('shuzhi_check');
			$(input).attr('type','checkbox');
			$(span).append(arr1[i]);
			span.index = i;
			$(div).append(input);
			$(li).append(div);
			$(li).append(span);
			$('.shuzhi_left').append(li);
		}
	})
	// 点击确定保存已选字段并关闭弹窗
	$('.shuzhi_btn2').live('click',function () {
		var dd = '';
		var ff = $('.shuzhi_right li span')
		for (var i = 0; i < ff.length; i++) {
			dd += ff[i].index + ',';
		}
		canshu_x = dd.substr(0,dd.length - 1);
		nownode[0].canshu_x = canshu_x;
		$("." + def_name + "1").val(canshu_x)
		$('.mu').hide();
		$('#shuzhi_box').css('display','none');
	})
// 分组列弹窗
	$('.model_fenzu').live('click',function () {
		if ($('.model_right_name').html() == 'SVM' || $('.model_right_name').html() == '神经网络' || $('.model_right_name').html() == '逻辑回归' || $('.model_right_name').html() == '朴素贝叶斯' || $('.model_right_name').html() == '决策树' || $('.model_right_name').html() == 'Adaboost' || $('.model_right_name').html() == 'GBDT' || $('.model_right_name').html() == '随机森林' || $('.model_right_name').html() == 'KNN' || $('.model_right_name').html() == '线性回归' || $('.model_right_name').html() == '逻辑回归分布式' || $('.model_right_name').html().substr(0,1) == '_') {
			$('.mu').show();
			$('#fenzu_box').css('display','block');
			$('.fenzu_check').css('backgroundImage','');
			nownode = scene.findElements( function (e) { 
				return e._id == $('.model_right_name')[0].title; 
			});
			var arr = nownode[0].msg;
			arr1 = arr[0];
			$('.fenzu_left').empty();
			$('.fenzu_right').empty();
			if (nownode[0].canshu_y && nownode[0].canshu_y != '') {
				var canshu_y = nownode[0].canshu_y.split(',')
				for (var i = 0; i < arr1.length; i++) {
					if (chachong(i,canshu_y)) {
						//console.log(i)
						var li = document.createElement('li');
						var img = document.createElement('img');
						var span = document.createElement('span');
						$(img).addClass('cancal');
						$(img).attr('src','img/cancle.png');
						$(span).append(arr1[i])
						span.index = i
						$(li).append(span);
						$(li).append(img);
						$('.fenzu_right').append(li)
					} else {
						var li = document.createElement('li');
						var div = document.createElement('div');
						var input = document.createElement('input');
						var span = document.createElement('span')
						$(div).addClass('fenzu_check');
						$(input).attr('type','checkbox');
						$(span).append(arr1[i]);
						span.index = i;
						$(div).append(input);
						$(li).append(div);
						$(li).append(span);
						$('.fenzu_left').append(li);
					}
				}
			} else {
				for (var i = 0; i < arr1.length; i++) {
					var li = document.createElement('li');
					var div = document.createElement('div');
					var input = document.createElement('input');
					var span = document.createElement('span')
					$(div).addClass('fenzu_check');
					$(input).attr('type','checkbox');
					$(span).append(arr1[i]);
					span.index = i;
					$(div).append(input);
					$(li).append(div);
					$(li).append(span);
					$('.fenzu_left').append(li);
				}	
			}
			checknum2 = 0;
			childnum2 = $('.fenzu_left').children().length;
		} else {
			alertmsg('该算法不支持分组列设置')
		}
	})
	// 输入框实时监听并筛选
	$('.fenzu_search').bind("input propertychange change",function () {
		if ($(this).val() != '') {
			var zx = $(this).val();
			$('.fenzu_left li').css('display','none')
			$('.fenzu_left li:contains("' + zx + '")').css('display','block')
		} else {
			$('.fenzu_left li').css('display','block')
		}
	})
	// 联动全选
	$('.fenzu_check input').live('click',function () {
		if ($(this).parent()[0].className == 'fenzu_check fenzu_check0') {
			if (this.checked == true) {
				checknum2 = childnum2;
				$('.fenzu_check input').prop('checked',true);
				$('.fenzu_check').css('backgroundImage','url(img/check.png)');
			} else {
				checknum2 = 0;
				$('.fenzu_check input').prop('checked',false);
				$('.fenzu_check').css('backgroundImage','');
			}
		} else {
			if (this.checked == true) {
				checknum2++;
				$(this).parent().css('backgroundImage','url(img/check.png)');
				if (checknum2 == childnum2) {
					$('.fenzu_check0 input').prop('checked',true);
					$('.fenzu_check0').css('backgroundImage','url(img/check.png)');
				}
			} else {
				checknum2--;
				$(this).parent().css('backgroundImage','');
				if (checknum2 != childnum2) {
					$('.fenzu_check0 input').prop('checked',false);
					$('.fenzu_check0').css('backgroundImage','');
				}
			}	
		}
	});
	// 点击添加添加已选字段
	$('.fenzu_btn1').live('click',function () {
		var ab =  $('.fenzu_left li .fenzu_check input:checked').parent().next();
		if (ab.length > 1 || $('.fenzu_right').children().length >= 1) {
			alertmsg('分组列只能添加一条字段')
			$('.fenzu_left li .fenzu_check input').prop('checked',false)
		} else {
			var li = document.createElement('li');
			var img = document.createElement('img');
			$(img).addClass('cancal');
			$(img).attr('src','img/cancle.png');
			$(li).append(ab);
			$(li).append(img);
			$('.fenzu_right').append(li)
			$('.fenzu_left li .fenzu_check input:checked').parent().parent().remove();
		}
		childnum2 = $('.fenzu_left').children().length;
		checknum2 = $('..fenzu_left li .fenzu_check input:checked').length;
	});
	// 点击删除图标删除已添加字段
	$('.fenzu_right .cancal').live('click',function () {
		var ab = $(this).prev();
		var li = document.createElement('li');
		var div = document.createElement('div');
		var input = document.createElement('input');
		$(div).addClass('fenzu_check');
		$(input).attr('type','checkbox');
		$(div).append(input);
		$(li).append(div);
		$(li).append(ab);
		//console.log(li);
		$('.fenzu_left').append(li);
		$(this).parent().remove();
	})
	$('#fenzu_box .close img').click(function () {
		$('.mu').hide();
		$('#fenzu_box').css('display','none')
	})
	// 点击取消删除全部已选字段
	$('.fenzu_btn3').live('click',function () {
		$('.fenzu_left').empty();
		$('.fenzu_right').empty();
		for (var i = 0; i < arr1.length; i++) {
			var li = document.createElement('li');
			var div = document.createElement('div');
			var input = document.createElement('input');
			var span = document.createElement('span')
			$(div).addClass('fenzu_check');
			$(input).attr('type','checkbox');
			$(span).append(arr1[i]);
			span.index = i;
			$(div).append(input);
			$(li).append(div);
			$(li).append(span);
			$('.fenzu_left').append(li);
		}
	})
	// 点击确定保存已选字段并关闭弹窗
	$('.fenzu_btn2').live('click',function () {
		canshu_y = $('.fenzu_right li span')[0].index + '';
		nownode[0].canshu_y = canshu_y
		$("." + def_name + "2").val(canshu_y)
		$('.mu').hide();
		$('#fenzu_box').css('display','none');
	})
// 执行数据导入
	$('.model_right_form6 .btn1').live('click',function () {
		$.ajax({
			type:'GET',
			url:url_ip + '/model/ReadHdfsData/?hdfsName=' + $('.model_ul2_li34 select:eq(0)').val(),
			cache:false,
			data:{},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
				$('#msg_box').css('display','block');
				$('.form3_box').css({width:'500px',left:'-880px',top:'112px'})
				$('#msg_box .close img').click(function () {
					$('#msg_box').css('display','none');
					// $('.form3_box').css({width:'200px',left:'',top:''})
				})
				$('#msg_box div').empty();
				$('#msg_box div').hide();
				$('.msg_box2').show();
				var table = document.createElement('table');
				$('.msg_box2').append(table)
				for (var i = 0; i < data.data.length; i++) {
					var tr = document.createElement('tr');
					for (var j = 0; j < data.data[i].length; j++) {
						var td = document.createElement('td');
						$(td).html(data.data[i][j])
						$(tr).append(td)
					}
					$(table).append(tr)
				}
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
		})
	})
	$('.model_right_form6 .btn2').live('click',function () {
		//console.log(def_num,def_name)
		var list = [];
		for (var i = 0; i < def_num; i++) {
			var zhi = $("." + def_name + i).val()
			if (zhi == 'true') {
				zhi = true
			} else if (zhi == 'null') {
				zhi = null
			}
			list.push(zhi)
		}
		//console.log(def_name,list)
		$.ajax({
			type:'GET',
			url:url_ip + '/model/SparkAlgoRpc/',
			cache:false,
			data:{defApp:def_name,cn_list:JSON.stringify(list)},
			datatype:"json",
			headers:{"Authorization":token},
			beforeSend:function () {
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
				//console.log(data)
				if (data.data.status) {
					alertmsg('该数据导入预处理执行成功');
					$(thisnode)[0].msg3 = data.data.data.file_name
				} else {
					alertmsg(data.data.error)
				}
				//console.log(thisnode)
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			},
			complete:function () {
				clearInterval(_tid)
				$('.loading').hide();
				$('.mu').hide();
			}
		})
	})
// 执行分布式算法
	var data_result = '';
	var data_result0 = '';
	$('.model_right_form7 .btn2').live('click',function () {
		//console.log(def_name,def_num,$(thisnode))
		var list = [];
		list.push(path)
		for (var i = 1; i < def_num; i++) {
			var zhi = $("." + def_name + i).val()
			if ($("." + def_name + i)[0].type2 == 'int' || $("." + def_name + i)[0].type2 == 'float') {
				zhi = Number(zhi)
			}
			if (zhi == 'true') {
				zhi = true
			} else if (zhi == 'null') {
				zhi = null
			}
			list.push(zhi)
		}
		//console.log(list)
		$.ajax({
			type:'GET',
			url:url_ip + '/model/SparkAlgoRpc/',
			cache:false,
			data:{defApp:def_name,cn_list:JSON.stringify(list)},
			datatype:"json",
			headers:{"Authorization":token},
			beforeSend:function () {
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
				//console.log(data)
				if (data.data.status) {
					if (data.data.rel_data) {
						data_result0 = data;
					}
					alertmsg('该分布式算法执行成功');
					$(thisnode)[0].msg3 = data.data.data.file_name
				} else {
					alertmsg(data.data.error)
				}
				//console.log(thisnode)
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			},
			complete:function () {
				clearInterval(_tid)
				$('.loading').hide();
				$('.mu').hide();
			}
		})
	})
	$('.model_right_form7 .btn1').live('click',function () {
		if (data_result0.data.rel_data.Test_Model_Result) {
			var data_data = data_result0.data.rel_data.Test_Model_Result
			data_result = data_data.split('],');
			for (var i = 0; i < data_result.length; i++) {
				data_result[i] = data_result[i].substr(2);
				data_result[i] = data_result[i].split(',')
			}
			$('#msg_box').css('display','block');
			$('.form3_box').css({width:'500px',left:'-880px',top:'112px'})
			$('#msg_box .close img').click(function () {
				$('#msg_box').css('display','none');
				// $('.form3_box').css({width:'200px',left:'',top:''})
			})
			$('#msg_box div').empty();
			$('#msg_box div').hide();
			$('.msg_box2').show();
			var table = document.createElement('table');
			$('.msg_box2').append(table)
			for (var i = 0; i < data_result.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < data_result[i].length; j++) {
					var td = document.createElement('td');
					$(td).html(data_result[i][j])
					$(tr).append(td)
				}
				$(table).append(tr)
			}
			var table2 = document.createElement('table');
			$('.msg_box2').append(table2)
			var html = 	'<tr><td>areaUnderPR</td><td>areaUnderROC</td></tr>'
					 +	'<tr><td>'+data_result0.data.rel_data.areaUnderPR+'</td><td>'+data_result0.data.rel_data.areaUnderROC+'</td></tr>'
			$(table2).append(html)	
		}
	})
	$('#msg_box .close img').click(function () {
		$('#msg_box').css('display','none');
		// $('.form3_box').css({width:'200px',left:'',top:''})
	})
	var def_name = '';
// 自建算法的执行和修改
	$('.model_right_form8 .btn2').click(function () {
		var nownode5 = scene.findElements( function (e) { 
			return e.data_val == $('.model_right_name')[0].data_val; 
		});
		var id = nownode5[0].data_val;
		window.open("python3/python_online.html?"+1+"&"+id)
	})
	function tobe (key,y) {
		if (key == 'int' || key == 'float') {
			y = Number(y);
		} else if (key == 'boolean') {
			if (y == 'none' || y == 'None' || y == 'null' || y == 'Null' || y == 'undefined' || y == 'Undefined' || y == 'NaN' || y == 'false' || y == 'False' || y == '否') {
				y = false;
			} else {
				y = true
			}
		} else {
			y = y + '';
		}
		return y;
	}
	$('.model_right_form8 .btn1').click(function () {
		var nownode5 = scene.findElements( function (e) { 
			return e.data_val == $('.model_right_name')[0].data_val; 
		});
		//console.log(nownode5)
		var list = [];
		list.push(nownode5[0].objId)
		var canshu_list = {};
		if (nownode5[0].canshu_x) {
			canshu_list.x = nownode5[0].canshu_x.split(',')
		} else {
			canshu_list.x = []
		}
		if (nownode5[0].canshu_y) {
			canshu_list.y = nownode5[0].canshu_y.split(',')
		}
		list.push(canshu_list)
		for (var i = 0; i < $('.model_right_form8 form')[0].index; i++) {
			var y = '';
			var x = def_name2 + i;
			if ($('.' + x).attr('type') == 'radio') {
				y = $('.' + x + '[name="'+x+'"]:checked').next().next().children('input').val();
				y = tobe($('.' + x + '[name="'+x+'"]:checked').attr('type2'),y)
			} else {
				y = $('.' + x).val();
				y = tobe($('.' + x)[0].type2,y)
			}
			list.push(y)
		}
		var defname = $(this).prev().children('form')[0].defname
		//console.log(defname,list)
		$.ajax({
			type:'GET',
			url:url_ip + '/model/selfimportRpc/',
			cache:false,
			data:{defApp:defname,cn_list:JSON.stringify(list)},
			datatype:"json",
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
				var img_objid = data.objId
				if (data.status) {
					alertmsg('自定义算法执行成功')
					$('#zjMsgBox').show();
					$('#zjMsgBox .zjMsg').empty()
					$('#zjMsgBox a').attr('href',url_ip + "/model/ExportContentByJiraVersion/?obj_id=" + img_objid +"&site_name=lalala&jira_version=0");
					$.each(data.data,function (key,value) {
						if (key.substr(0,9) == 'DataChart') {
							var img = '<img src="'+url_ip+'/model/pics/?type='+value+'&objID='+img_objid+'">'
							$('.zjMsg').append(img)
						}
						if (key.substr(0,9) == 'DataTable') {
							//console.log(value)
							var title = '<div>'+key.substr(10)+'</div>'
							var table = document.createElement('table')
							for (var i = 0; i < value.length; i++) {
								var tr = document.createElement('tr')
								$(table).append(tr)
								for (var j = 0; j < value[i].length; j++) {
									var td = document.createElement('td')
									$(td).html(value[i][j])
									$(tr).append(td)
								}
							}
							$('.zjMsg').append(title)
							$('.zjMsg').append(table)
						}
					})
				}
			}, 
			error:function(data) {
				console.log(data)
				if (data.status == 401) {
	            	if (token == 'JWT undefined' || token == 'JWT null') {
	            		$('.shade p').html('您目前还没有注册或登录~ ')
						$('.shade').show();
	            	} else {
	            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
	            		$('.shade').show();
	            	}
	            } else {
	            	alertmsg('未知错误。',touch_us)
	            }
			}
		})
	})
	$('.zjMsgClose').click(function () {
		$('#zjMsgBox').hide()
	})
// 预处理结果展示
	$('.model_right_form1 .btn2').live('click',function () {
		var nownode6 = scene.findElements( function (e) { 
			return e._id == $('.model_right_name')[0].title; 
		});
		var ycl_result = nownode6[0].ycl_result;
		$('#msg_box div').empty();
		$('#msg_box div').hide();
		$('.msg_box').show();
		$('.msg_box').append('<a style="width:56px;height:22px;border-radius:11px;background:#fff;cursor:pointer;position:fixed;right:110px;top:25px;line-height:22px;text-align:center;color:#000;z-index:1;" href="'+url_ip+'/model/ExportContentByJiraVersion/?obj_id='+ycl_result.objId+'&site_name=lalala&jira_version=0">下载</a>')
		//console.log(ycl_result)
		if (ycl_result != '') {
			$('#msg_box').show();
			if (ycl_result.result) {
				if (ycl_result.result.boxplot) {
					var box = document.createElement('div');
					$(box).addClass('screet_box')
					$('.msg_box').append(box);
					var data_json = {};
					data_json.x = ycl_result.result.boxplot[0];
					data_json.value = [];
					for (var i = 1; i < ycl_result.result.boxplot.length; i++) {
						data_json.value.push(ycl_result.result.boxplot[i])
					}
					//console.log(data_json)
					boxplotChart(data_json,box)
				}
				if (ycl_result.result.MODEL_VERIFICATION) {
					var arr1 = ycl_result.result.MODEL_VERIFICATION
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('模型检验')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}
				}
				if (ycl_result.result.MODEL_VERIFICATION_2) {
					var arr1 = ycl_result.result.MODEL_VERIFICATION_2
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('result2')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}	
				}
				if (ycl_result.result.PREDICTED_TRAINING) {
					var arr1 = ycl_result.result.PREDICTED_TRAINING
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('预测结果')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}	
				}
				if (ycl_result.result.data) {
					var arr1 = ycl_result.result.data
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('模型结果')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}
				}
				if (ycl_result.result.DRAW_DATA) {
					var box = document.createElement('div');
					$(box).addClass('screet_box')
					$('.msg_box').append(box);
					var data_json = {};
					data_json.x = ycl_result.result.DRAW_DATA.x.value
					data_json.value = ycl_result.result.DRAW_DATA.Y[0].value
					//console.log(data_json)
					screetChart(data_json,box);
				}
				if (ycl_result.result.result_validation_1) {
					var arr1 = ycl_result.result.result_validation_1
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('贡献率')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}
				}
				if (ycl_result.result.result_validation_2) {
					var arr1 = ycl_result.result.result_validation_2
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('成分(载荷)矩阵')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}
				}
				if (ycl_result.result.xuanzhuan) {
					var arr1 = ycl_result.result.xuanzhuan
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('旋转成份(载荷)矩阵')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}
				}
				if (ycl_result.result.result_validation_3) {
					var arr1 = ycl_result.result.result_validation_3
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('成份得分系数矩阵')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}
				}
				if (ycl_result.result.result_data) {
					var arr1 = ycl_result.result.result_data
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('模型结果')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}
				}
			} else {
				if (ycl_result.data.result_data) {
					var arr1 = ycl_result.data.result_data
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('result9')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						var td = document.createElement('td')
						var td2 = document.createElement('td')
						$(td).html(arr1[i].name)
						$(td2).html(arr1[i].value)
						$(tr).append(td);
						$(tr).append(td2);
						$(table1).append(tr)
					}
				}
				if (ycl_result.data.result_data_1) {
					var arr1 = ycl_result.data.result_data_1
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('result10')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}
				}
				if (ycl_result.data.result_data_2) {
					var arr1 = ycl_result.data.result_data_2
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('result11')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}
				}
				if (ycl_result.data.result_data_3) {
					var arr1 = ycl_result.data.result_data_3
					var div = document.createElement('div')
					$(div).addClass('table_title')
					$(div).html('result12')
					$('.msg_box').append(div)
					var table1 = document.createElement('table')
					$('.msg_box').append(table1);
					for (var i = 0; i < arr1.length; i++) {
						var tr = document.createElement('tr')
						for (var j = 0; j < arr1[i].length; j++) {
							var td = document.createElement('td')
							$(td).html(arr1[i][j])
							$(tr).append(td);
						}
						$(table1).append(tr)
					}
				}
			}
			$('#msg_box .close img').click(function () {
				$('#msg_box').css('display','none');
			})
		} else {
			var nownode3 = scene.findElements( function (e) { 
				return e._id == $('.model_right_name')[0].title; 
			});
			result_show(nownode3[0].msg2,nownode3[0].objId);
		}
		for (var i = 0; i < $('.msg_box .table_title').length; i++) {
			//console.log($('.msg_box .table_title')[i].nextSibling.clientWidth)
			$('.msg_box .table_title')[i].style.width = $('.msg_box .table_title')[i].nextSibling.clientWidth + 'px';
			$('.msg_box .table_title')[i].style.boxSizing = 'border-box'
		}
	})
// 传参并算法请求
	$('.model_right_form1 .btn1').live('click',function () {		
		var nownode = scene.findElements( function (e) { 
			return e._id == $('.model_right_name')[0].title; 
		});
		canshu = [];
		canshu.push(nownode[0].objId);
		canshu.push('');
		canshu.push(nownode[0].canshu_x);
		if (nownode[0].canshu_y) {
			canshu.push(nownode[0].canshu_y);
		};
		//console.log(nownode,666666)
		if ($('.model_right_name').html() == '标准化') {
			$('.model_result_title2 select.fl').hide();
			if (canshu.length == 3) {
				canshu.push($('.model_ul2_li1>select').val());
				if ($('.model_ul2_li1>select').val() == 'Binarizer') {
					canshu.push($('.model_ul2_li1 .li1_child input').val());
				} else if ($('.model_ul2_li1>select').val() == 'Function') {
					canshu.push($('.model_ul2_li1 .li1_child2 select').val());
				} else {
					canshu.push('0');
				}
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpcScaler/",
				cache:false,
				data:{defApp:'Scaler_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							nownode[0].ycl_result = data;
							alertmsg('标准化算法请求成功')
							nownode[0].msg2 = data.data;
							nownode[0].msg = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '异常值检测') {
			$('.model_result_title2 select.fl').hide();
			if (canshu.length == 3) {
				canshu.push($('.model_ul2_li2 select').val());
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpcPretreatment/",
				cache:false,
				data:{defApp:'OutliersProcessing_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							nownode[0].ycl_result = data;
							alertmsg('异常值检测算法请求成功')
							nownode[0].msg2 = data.data;
							nownode[0].msg = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					console.log(data)
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})	
		} else if ($('.model_right_name').html() == '特征选择') {
			$('.model_result_title2 select.fl').hide();
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpcPretreatment/",
				cache:false,
				data:{defApp:'',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						nownode[0].ycl_result = data;
						if (data.data != null) {
							alertmsg('特征选择算法请求成功')
							nownode[0].msg2 = data.data;
							nownode[0].msg = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})	
		} else if ($('.model_right_name').html() == '变量离散化') {
			$('.model_result_title2 select.fl').hide();
			if (canshu.length == 3) {
				canshu.push(Number($('.model_ul2_li4 input').val()));
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpcPretreatment/",
				cache:false,
				data:{defApp:'Discretization_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							nownode[0].ycl_result = data;
							alertmsg('变量离散化算法请求成功')
							nownode[0].msg2 = data.data;
							nownode[0].msg = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '多项式特征') {
			$('.model_result_title2 select.fl').hide();
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpcPretreatment/",
				cache:false,
				data:{defApp:'Polynomial_Features_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						nownode[0].ycl_result = data;
						if (data.data != null) {
							alertmsg('多项式特征算法请求成功')
							nownode[0].msg2 = data.data;
							nownode[0].msg = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '标签编码') {
			$('.model_result_title2 select.fl').hide();
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpcPretreatment/",
				cache:false,
				data:{defApp:'Label_Encoder',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						nownode[0].ycl_result = data;
						if (data.data != null) {
							alertmsg('标签编码算法请求成功')
							nownode[0].msg2 = data.data;
							nownode[0].msg = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '主成分分析') {
			$('.model_result_title2 select.fl').hide();
			if (canshu.length == 3) {
				canshu.push(Number($('.model_ul2_li7 input').val()));
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpcPretreatment/",
				cache:false,
				data:{defApp:'PCA_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						nownode[0].ycl_result = data;
						if (data.data != null) {
							alertmsg('主成分分析算法请求成功')
							nownode[0].msg2 = data.data;
							nownode[0].msg = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '因子分析') {
			$('.model_result_title2 select.fl').hide();
			if (canshu.length == 3) {
				if ($('.model_ul2_li8 input:eq(0)').attr("checked")) {
					canshu.push('Eigenvalue')
					canshu.push(Number($('.model_ul2_li8 input:eq(1)').val()))
				} else if ($('.model_ul2_li8 input:eq(2)').attr("checked")) {
					canshu.push('n_components')
					canshu.push(Number($('.model_ul2_li8 input:eq(3)').val()))
				}
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpcPretreatment/",
				cache:false,
				data:{defApp:'FactorAnalysis',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						nownode[0].ycl_result = data;
						if (data.data != null) {
							alertmsg('因子分析算法请求成功')
							nownode[0].msg2 = data.data;
							nownode[0].msg = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '独热编码') {
			$('.model_result_title2 select.fl').hide();
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpcPretreatment/",
				cache:false,
				data:{defApp:'One_Hot_Encoder',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						nownode[0].ycl_result = data;
						if (data.data != null) {
							alertmsg('独热编码算法请求成功')
							nownode[0].msg2 = data.data;
							nownode[0].msg = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == 'SVM') {
			$('.model_result_title2 select.fl').show();
			var c1 = Number($('.model_ul2_li10 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li10 input:eq(1)').val())
			var c3 = Number($('.model_ul2_li10 input:eq(2)').val())
			var c5 = Number($('.model_ul2_li10 input:eq(4)').val())
			var c6 = Number($('.model_ul2_li10 input:eq(5)').val())
			var c7 = Number($('.model_ul2_li10 input:eq(6)').val())
			var c4
			if ($('.model_ul2_li10 input:eq(3)').val() == 'auto') {
				c4 = $('.model_ul2_li10 input:eq(3)').val()
			} else {
				c4 = Number($('.model_ul2_li10 input:eq(3)').val())
			}
			if (canshu.length == 4) {
				canshu.push(c1);
				canshu.push($('.model_ul2_li10 select').val());
				canshu.push(c2);
				canshu.push(c3);
				canshu.push(c4);
				canshu.push(c5);
				canshu.push(c6);
				canshu.push(c7);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'SVM',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('SVM算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})	
		} else if ($('.model_right_name').html() == '神经网络') {
			$('.model_result_title2 select.fl').show();
			var c1 = $('.model_ul2_li11 input:eq(0)').val()
			var c2 = Number($('.model_ul2_li11 input:eq(1)').val())
			var c3 = Number($('.model_ul2_li11 input:eq(2)').val())
			var c4 = Number($('.model_ul2_li11 input:eq(3)').val())
			var c5 = Number($('.model_ul2_li11 input:eq(4)').val())
			var c6 = Number($('.model_ul2_li11 input:eq(5)').val())
			var c7 = Number($('.model_ul2_li11 input:eq(6)').val())
			if (canshu.length == 4) {
				canshu.push(c1);
				canshu.push($('.model_ul2_li11 select:eq(0)').val());
				canshu.push($('.model_ul2_li11 select:eq(1)').val());
				canshu.push(c2);
				canshu.push($('.model_ul2_li11 select:eq(2)').val());
				canshu.push(c3);
				canshu.push(c4);
				if ($('.model_ul2_li11 select:eq(3)').val() == 'False') {
					canshu.push(false);
				} else if ($('.model_ul2_li11 select:eq(3)').val() === 'True') {
					canshu.push(true);
				}
				canshu.push(c5);
				canshu.push(c6);
				canshu.push(c7);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'NeuralNetwork',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('神经网络算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '逻辑回归') {
			$('.model_result_title2 select.fl').show();
			var c1 = Number($('.model_ul2_li12 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li12 input:eq(1)').val())
			var c3 = Number($('.model_ul2_li12 input:eq(2)').val())
			if (canshu.length == 4) {
				canshu.push(c1);
				canshu.push($('.model_ul2_li12 select:eq(0)').val());
				canshu.push(c2);
				canshu.push(c3);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'LogisticRegression_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('逻辑回归算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '朴素贝叶斯') {
			$('.model_result_title2 select.fl').show();
			var c1 = Number($('.model_ul2_li13 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li13 input:eq(1)').val())
			if (canshu.length == 4) {
				canshu.push(c1);
				canshu.push(c2);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'GaussianNB_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('朴素贝叶斯算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
		        },
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '决策树') {
			$('.model_result_title2 select.fl').show();
			var c1 = Number($('.model_ul2_li14 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li14 input:eq(1)').val())
			var c3 = Number($('.model_ul2_li14 input:eq(2)').val())
			if (canshu.length == 4) {
				canshu.push($('.model_ul2_li14 select').val());
				canshu.push(c1);
				canshu.push(c2);
				canshu.push(c3);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'DecisionTree',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('决策树算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == 'Adaboost') {
			$('.model_result_title2 select.fl').show();
			var c1 = Number($('.model_ul2_li15 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li15 input:eq(1)').val())
			var c3 = Number($('.model_ul2_li15 input:eq(2)').val())
			var c4 = Number($('.model_ul2_li15 input:eq(3)').val())
			if (canshu.length == 4) {
				canshu.push(c1);
				canshu.push(c2);
				canshu.push(c3);
				canshu.push(c4);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'Adaboost_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('Adaboost算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == 'GBDT') {
			$('.model_result_title2 select.fl').show();
			var c1 = Number($('.model_ul2_li16 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li16 input:eq(1)').val())
			var c3 = Number($('.model_ul2_li16 input:eq(2)').val())
			var c4 = Number($('.model_ul2_li16 input:eq(3)').val())
			var c5 = Number($('.model_ul2_li16 input:eq(4)').val())
			if (canshu.length == 4) {
				canshu.push(c1);
				canshu.push(c2);
				canshu.push(c3);
				canshu.push(c4);
				canshu.push(c5);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'GBDT_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('GBDT算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '随机森林') {
			$('.model_result_title2 select.fl').show();
			var c1 = Number($('.model_ul2_li17 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li17 input:eq(1)').val())
			var c3 = Number($('.model_ul2_li17 input:eq(2)').val())
			var c4 = Number($('.model_ul2_li17 input:eq(3)').val())
			if (canshu.length == 4) {
				canshu.push(c1);
				canshu.push($('.model_ul2_li17 select').val());
				canshu.push(c2);
				canshu.push(c3);
				canshu.push(c4);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'RandomForest',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('随机森林算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == 'KNN') {
			$('.model_result_title2 select.fl').show();
			var c1 = Number($('.model_ul2_li18 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li18 input:eq(1)').val())
			var c3 = Number($('.model_ul2_li18 input:eq(2)').val())
			var c4 = Number($('.model_ul2_li18 input:eq(3)').val())
			if (canshu.length == 4) {
				canshu.push(c1);
				canshu.push($('.model_ul2_li18 select').val());
				canshu.push(c2);
				canshu.push(c3);
				canshu.push(c4);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'KNN_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('KNN算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})	
		} else if ($('.model_right_name').html() == 'K-Means') {
			$('.model_result_title2 select.fl').hide();
			var c1 = Number($('.model_ul2_li19 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li19 input:eq(1)').val())
			var c3 = Number($('.model_ul2_li19 input:eq(2)').val())
			if (canshu.length == 3) {
				canshu.push(c1);
				canshu.push(c2);
				canshu.push(c3);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'KMeans',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('K-Means算法请求成功')
							result_show(data.data,data.objId)
							$('.model_result_title2 select').hide();
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})	
		} else if ($('.model_right_name').html() == 'K-Medians') {
			$('.model_result_title2 select.fl').hide();
			var c1 = Number($('.model_ul2_li20 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li20 input:eq(1)').val())
			if (canshu.length == 3) {
				canshu.push(c1);
				canshu.push($('.model_ul2_li20 select').val());
				canshu.push(c2);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'KMedians',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('K-Medians算法请求成功')
							result_show(data.data,data.objId)
							$('.model_result_title2 select').hide();
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})	
		} else if ($('.model_right_name').html() == '系统聚类') {
			$('.model_result_title2 select.fl').hide();
			if (canshu.length == 3) {
				canshu.push($('.model_ul2_li21 select:eq(0)').val());
				canshu.push($('.model_ul2_li21 select:eq(1)').val());
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'Hcluster_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('系统聚类算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})	
		} else if ($('.model_right_name').html() == '关联分析') {
			$('.model_result_title2 select.fl').hide();
			var c1 = Number($('.model_ul2_li22 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li22 input:eq(1)').val())
			if (canshu.length == 3) {
				canshu.push(c1);
				canshu.push($('.model_ul2_li22 select').val());
				canshu.push(c2);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'Apriori_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('关联分析算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})	
		} else if ($('.model_right_name').html() == '对应分析') {
			$('.model_result_title2 select.fl').hide();
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'CorrespondenceAnalysis_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('对应分析算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '移动平均') {
			$('.model_result_title2 select.fl').hide();
			var c1 = Number($('.model_ul2_li24 input:eq(0)').val())
			if (canshu.length == 3) {
				canshu.push(c1);
				if ($('.model_ul2_li24 select').val() == 'False') {
					canshu.push(false);
				} else if ($('.model_ul2_li24 select').val() == 'True') {
					canshu.push(true);
				}
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'MovingAverage_func',cn_list:JSON.stringify(canshu)},
				datatype:"text",
	            // traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('移动平均算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					console.log(data)
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})	
		} else if ($('.model_right_name').html() == '简单指数平滑') {
			$('.model_result_title2 select.fl').hide();
			var c1 = Number($('.model_ul2_li25 input:eq(0)').val())
			if (canshu.length == 3) {
				canshu.push(c1);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'ExponentialSmoothing_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('简单指数平滑算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					console.log(data)
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})	
		} else if ($('.model_right_name').html() == 'Holt指数平滑') {
			$('.model_result_title2 select.fl').hide();
			var c1 = Number($('.model_ul2_li26 input:eq(0)').val())
			if (canshu.length == 3) {
				canshu.push(c1);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'Holt_ExponentialSmoothing_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('Holt指数平滑算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == 'Winter指数平滑') {
			$('.model_result_title2 select.fl').hide();
			var c1 = Number($('.model_ul2_li27 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li27 input:eq(1)').val())
			if (canshu.length == 3) {
				canshu.push($('.model_ul2_li27 select').val());
				canshu.push(c1);
				canshu.push(c2);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'Winter_ExponentialSmoothing_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('Winter指数平滑算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '分解预测') {
			$('.model_result_title2 select.fl').hide();
			var c1 = Number($('.model_ul2_li28 input:eq(0)').val())
			var c2 = Number($('.model_ul2_li28 input:eq(1)').val())
			if (canshu.length == 3) {
				canshu.push($('.model_ul2_li28 select').val());
				canshu.push(c1);
				canshu.push(c2);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'seasonal_decomposition',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('分解预测算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					console.log(data)
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '线性回归') {
			$('.model_result_title2 select.fl').hide();
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'LinearRegression_func',cn_list:JSON.stringify(canshu)},
				datatype:"text",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('线性回归算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					console.log(data)
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '相关系数矩阵') {
			$('.model_result_title2 select.fl').hide();
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'CorrelationMatrix_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('相关系数矩阵算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '词频统计') {
			$('.model_result_title2 select.fl').hide();
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'Word_Frequency_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('词频统计算法请求成功')
							result_show(data.data,data.objId)
							nownode[0].msg2 = data.result_data;
							ycl_result = data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == 'Textrank') {
			$('.model_result_title2 select.fl').hide();
			var c1 = Number($('.model_ul2_li32 input:eq(0)').val())
			if (canshu.length == 3) {
				canshu.push(c1);
			}
			//console.log(canshu);
			$.ajax({
				type:"GET",
				url:url_ip + "/model/importRpc/",
				cache:false,
				data:{defApp:'text_rank_func',cn_list:JSON.stringify(canshu)},
				datatype:"json",
	            traditional:true,
				headers:{"Authorization":token},
				beforeSend:function () {
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
					//console.log(data)
					if (data.status) {
						if (data.data != null) {
							alertmsg('Textrank算法请求成功')
							result_show(data.data,data.objId)
							ycl_result = data
							nownode[0].msg2 = data.data;
							nownode[0].objId2 = data.objId;
							if (thisnode.outLinks && thisnode.outLinks.length > 0) {
								for (var i = 0; i < thisnode.outLinks.length; i++) {
									thisnode.outLinks[i].nodeZ.msg = data.data;
									thisnode.outLinks[i].nodeZ.objId = data.objId
									thisnode.outLinks[i].nodeZ.canshu_x = '';
									thisnode.outLinks[i].nodeZ.canshu_y = '';
								}
							}
						} else {
							alertmsg('很抱歉，算法请求结果为空')
						}
					} else {
						alertmsg(data.error)
					}
				},
				error:function (data) {
					if (data.status == 401) {
		            	if (token == 'JWT undefined' || token == 'JWT null') {
		            		$('.shade p').html('您目前还没有注册或登录~ ')
							$('.shade').show();
		            	} else {
		            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
		            		$('.shade').show();
		            	}
		            } else {
		            	alertmsg('未知错误。',touch_us)
		            }
				},
				complete:function () {
					clearInterval(_tid)
					$('.loading').hide();
					$('.mu').hide();
				}
			})
		} else if ($('.model_right_name').html() == '预测') {
			$('.model_result_title2 select.fl').hide();
			//console.log(nownode)
			if (nownode[0].inLinks.length == 2) {
				for (var i = 0; i < nownode[0].inLinks.length; i++) {
					if (nownode[0].inLinks[i].nodeA.text == '文件' || nownode[0].inLinks[i].nodeA.text == '标准化' || nownode[0].inLinks[i].nodeA.text == '变量离散化' || nownode[0].inLinks[i].nodeA.text == '多项式特征' || nownode[0].inLinks[i].nodeA.text == '标签编码' || nownode[0].inLinks[i].nodeA.text == '主成分分析' || nownode[0].inLinks[i].nodeA.text == '因子分析' || nownode[0].inLinks[i].nodeA.text == '独热编码' || nownode[0].inLinks[i].nodeA.text == '异常值检测') {
						//console.log(nownode[0].inLinks[i].nodeA)
						nownode[0].obj_id1 = nownode[0].inLinks[i].nodeA.objId2
						nownode[0].msg = nownode[0].inLinks[i].nodeA.msg
					} else {
						nownode[0].obj_id2 = nownode[0].inLinks[i].nodeA.objId2
					}
				}
				var cs = [];
				cs.push(nownode[0].obj_id1,'',nownode[0].canshu_x,nownode[0].obj_id2)
				//console.log(cs)
				$.ajax({
					type:"GET",
					url:url_ip + "/model/importRpc/",
					cache:false,
					data:{defApp:'Predict',cn_list:JSON.stringify(cs)},
					datatype:"json",
		            traditional:true,
					headers:{"Authorization":token},
					beforeSend:function () {
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
						//console.log(data)
						if (data.status) {
							nownode[0].msg2 = data.data.result_data_of_predict
							$('#msg_box').show();
							$('#msg_box div').empty();
							$('#msg_box div').hide();
							$('.msg_box').show();
							var arr = data.data.result_data_of_predict
							var table = document.createElement('table')
							$('.msg_box').append(table);
							for (var i = 0; i < arr.length; i++) {
								var tr = document.createElement('tr')
								for (var j = 0; j < arr[i].length; j++) {
									var td = document.createElement('td')
									$(td).html(arr[i][j])
									$(tr).append(td);
								}
								$(table).append(tr)
							}
							var download = '<a class="yuce_download" href="'+url_ip+'/model/ExportContentByJiraVersion/?obj_id='+data.objId+'&site_name=lalala&jira_version=0">下载</a>'
							$('.msg_box').append(download)	
						} else {
							alertmsg(data.error)
						}
					},
					error:function (data) {
						if (data.status == 401) {
			            	if (token == 'JWT undefined' || token == 'JWT null') {
			            		$('.shade p').html('您目前还没有注册或登录~ ')
								$('.shade').show();
			            	} else {
			            		$('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
			            		$('.shade').show();
			            	}
			            } else {
			            	alertmsg('未知错误。',touch_us)
			            }
					},
					complete:function () {
						clearInterval(_tid)
						$('.loading').hide();
						$('.mu').hide();
					}
				})
			}
		}
	})
// 预测结果显示
	$('.form4_btn').live('click',function () {
		var nownode = scene.findElements( function (e) { 
			return e._id == $('.model_right_name')[0].title; 
		})
		var arr = nownode[0].msg
		$('#msg_box').show();
		$('#msg_box div').empty();
		$('#msg_box div').hide();
		$('.msg_box').show();
		var table = document.createElement('table')
		$('.msg_box').append(table);
		for (var i = 0; i < arr.length; i++) {
			var tr = document.createElement('tr')
			for (var j = 0; j < arr[i].length; j++) {
				var td = document.createElement('td')
				$(td).html(arr[i][j])
				$(tr).append(td);
			}
			$(table).append(tr)
		}
	})
// 重置
	$('.model_right_form1 .btn3').live('click',function () {
		var nownode = scene.findElements( function (e) { 
			return e._id == $('.model_right_name')[0].title; 
		});
		nownode[0].canshu_x = '';
		nownode[0].canshu_y = '';
		if ($('.model_right_name').html() == '标准化') {
			$('.model_ul2_li1 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '异常值检测') {
			$('.model_ul2_li2 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '变量离散化') {
			$('.model_ul2_li4 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '主成分分析') {
			$('.model_ul2_li7 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '因子分析') {
			$('.model_ul2_li8 input[type=reset]').click();
		} else if ($('.model_right_name').html() == 'SVM') {
			$('.model_ul2_li10 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '神经网络') {
			$('.model_ul2_li11 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '逻辑回归') {
			$('.model_ul2_li12 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '朴素贝叶斯') {
			$('.model_ul2_li13 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '决策树') {
			$('.model_ul2_li14 input[type=reset]').click();
		} else if ($('.model_right_name').html() == 'Adaboost') {
			$('.model_ul2_li15 input[type=reset]').click();
		} else if ($('.model_right_name').html() == 'GBDT') {
			$('.model_ul2_li16 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '随机森林') {
			$('.model_ul2_li17 input[type=reset]').click();
		} else if ($('.model_right_name').html() == 'KNN') {
			$('.model_ul2_li18 input[type=reset]').click();
		} else if ($('.model_right_name').html() == 'K-means') {
			$('.model_ul2_li19 input[type=reset]').click();
		} else if ($('.model_right_name').html() == 'K-medians') {
			$('.model_ul2_li20 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '层次聚类') {
			$('.model_ul2_li21 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '关联分析') {
			$('.model_ul2_li22 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '移动平均') {
			$('.model_ul2_li24 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '简单指数平滑') {
			$('.model_ul2_li25 input[type=reset]').click();
		} else if ($('.model_right_name').html() == 'Holt指数平滑') {
			$('.model_ul2_li26 input[type=reset]').click();
		} else if ($('.model_right_name').html() == 'Winter指数平滑') {
			$('.model_ul2_li27 input[type=reset]').click();
		} else if ($('.model_right_name').html() == '分解预测') {
			$('.model_ul2_li28 input[type=reset]').click();
		} else if ($('.model_right_name').html() == 'Textrank') {
			$('.model_ul2_li32 input[type=reset]').click();
		}
	})
	$('.model_right_form6 .btn3').live('click',function () {
		$('.model_ul2_li34 input[type=reset]').click();
	})
	$('.model_right_form7 .btn3').live('click',function () {
		//console.log(5555)
		$('.model_ul2_li35 input[type=reset]').click();
	})
	$('.model_right_form8 .btn3').live('click',function () {
		$('.model_right_form8 select').val('')
	})
	var zijian_val = '';
// 自建算法-参数列表的获取
// msgbox信息栏
	var msgbox_toggle = true;
	$('.msgbox2 img.slid').click(function () {
		if (msgbox_toggle) {
			$(this).css('transform','rotate(180deg)')
			$('.msgbox2').css({height:'101px',zIndex:999})
		} else {
			$(this).css('transform','rotate(0deg)')
			$('.msgbox2').css({height:'50px',zIndex:0})
		}
		msgbox_toggle = !msgbox_toggle
	})
	$('.msgbox2 img.del').live('click',function () {
		$('.msgbox2 p').remove();
	})
	// 联系我们
	var touch_us = document.createElement('a');
	$(touch_us).html('请反馈这个错误')
	$(touch_us).attr({href:'feedback.html'})
	function alertmsg (msg,tag) {
		var myTime = new Date();
		var h = myTime.getHours();
		var m = myTime.getMinutes();
		var s = myTime.getSeconds();
		var nowtime  = h + ':' + m + ':' + s
		var p = document.createElement('p')
		p.innerHTML = nowtime + '&nbsp;&nbsp;&nbsp;&nbsp;' + msg;
		$(p).append(tag)
		$('.msgbox2').append(p)
		var h = $('.msgbox2')[0].scrollHeight;
		$(".msgbox2").scrollTop(h)
	}
	function alertmsg2 (msg,tag,num) {
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
// 右边
	// 右边点击关闭按钮
	$('.model_close img').mouseenter(function () {
		$(this).attr('src','img/close2.png');
		$('.model_close img').mousedown(function () {
			$(this).attr('src','img/close3.png');
		});
		$('.model_close img').mouseup(function () {
			sessionStorage.removeItem('model_id_index');
			window.location.href = 'index.html'
		});
		$('.model_close img').mouseleave(function () {
			$(this).attr('src','img/close1.png');
		})
	})
	var td_length = 0;
	var pos = 0;
	$('td').live('click',function () {
		$('td').children('input').remove()
		var td_val = $(this)[0].innerText
		td_length = $(this)[0].innerText.length
		pos = td_length;
		var td_w = $(this).width()+24
		var td_h = $(this).height()
		var td_bc = $(this).parent().css('background')
		$(this).css('position','relative')
		$(this).append('<input type="text" style="position:absolute;height:'+td_h+'px;width:'+td_w+'px;top:0;left:0;outline:0;border:0;color:#D5D5D5;font-size:12px;background:'+td_bc+'" value="'+td_val+'">')
		// $('#td_input').css({"height":td_h+"px","width":td_w+"px","display":"block","top":0,"left":0,"outline":0,"border":0,"background":td_bc,"color":"#fff"})
		$(this).children('input').focus();
		$(this).children('input').bind('input propertychange change',function () {
			$(this).val(td_val)
		})
	})
})
// lkw写 2018-04-01新建
$(function () {
	//社区版-专业版切换
	var hover_changeGZTType, out_changeGZTType ; //防止误触引发显示, 影响用户体验
	$('.changeGZTType').mouseover(function () {
		clearTimeout(out_changeGZTType);
		hover_changeGZTType = setTimeout(function () {
			$('.changeGZTType').children('dd').stop(true).show();
		}, 200)
	}).mouseleave(function () {
		clearTimeout(hover_changeGZTType);
		out_changeGZTType = setTimeout(function () {
			$('.changeGZTType').children('dd').stop(true).hide();
		}, 200)
	})
	//算法-数据-模型切换(最左侧tab)
	$('.model_left_l').on('click', 'li', function () {
		var nowType = $(this).attr('data-type');
		if(nowType !== 'sj') {
			$(this).addClass('active').siblings().removeClass('active');
			$('.model_left_r').children('.model_left_nav[data-type="'+nowType+'"]').show().siblings().hide();
		}
		
	})
})
