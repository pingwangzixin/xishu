// var token = "JWT " + window.sessionStorage.token;

$(function () {
	var adopt_arr = ['未通过','已通过','审核中','未提交']
	var is_agree = false;
	var is_up = false;
	$.ajax({
		type:'GET',
		url:url_ip + '/examine/firstintoupalgo/',
		data:{},
		datatype:'json',
		headers:{'Authorization':token},
		success:function (data) {
			// console.log(data)
			if (data.status) {
				if (data.whether == 1) {
					$('.algo_rule').fadeIn()
				} else {
					$('.uploading1 b').addClass('on')
					is_up = true;
				}
			}
		},
		error:function (data) {
			//console.log(data)
		}
	})
	$('.algo_rule .ok').click(function () {
		$('.algo_rule').fadeOut()
		$.ajax({
			type:'POST',
			url:url_ip + '/examine/firstintoupalgo/',
			data:{whether:0},
			datatype:'json',
			headers:{'Authorization':token},
			success:function (data) {
				//console.log(data)
			},
			error:function (data) {
				//console.log(data)
			}
		})
		$('.uploading1 b').addClass('on')
		is_agree = true;
		if (is_up) {
			$('.up_algo2').show()
		}
	})
	$('.algo_rule .no').click(function () {
		$('.algo_rule').fadeOut()
	})
	$('.uploading1 p i').click(function () {
		$('.algo_rule .no').hide()
		$('.algo_rule').fadeIn()
	})
	$('.uploading1 div').click(function () {
		if (is_agree) {
			$('.up_algo2').show()
		} else {
			$('.algo_rule .no').hide()
			$('.algo_rule').fadeIn()
			is_up = true;
		}
	})
	$('.up_load2_box i').click(function () {
		$('.up_algo2').hide()
	})
	$('.uploading1 b').click(function () {
		if (is_agree) {
			$('.uploading1 b').removeClass('on')
		} else {
			$('.uploading1 b').addClass('on')
		}
		is_agree = !is_agree;
	})
	function change_w () {
		$('.upload_py>input').css('width',$('.upload_py>input')[0].scrollWidth + 'px')
	}
	$('.upload_py>input').live('input propertychange change',function () {
		change_w();
	})
	var file_name = '';
	var file = '';
	$('input[type="file"]').live('change',function () {
		file_name = $(this)[0].files[0].name
		file = $(this)[0].files[0]
		$(this).parent().next().val(file_name.substr(0,file_name.lastIndexOf('.')))
		change_w();
	})
// 选择图标
	$('.up_load2_box li').live('click',function () {
		$('.up_load2_box li').removeClass('on')
		$(this).addClass('on')
	})
// 获取用户已上传算法
	if (token != "JWT undefined" && token != "JWT null") {
		$.ajax({
			url:url_ip + '/examine/getuseralgo/',
			type:'GET',
			cache:false,
			data:{},
			datatype:'json',
			headers:{"Authorization":token},
			success:function (data) {
				//console.log(data)
				if (data.status) {
					$('.upload_fins dl dd').remove();
					for (var i = 0; i < data.data.length; i++) {
						var tr = '<tr>'+
									'<td class="table_td_name">'+
										'<img src="'+data.data[i].img+'"><span>'+data.data[i].name+'</span>'+
									'</td>'+
									'<td>上传算法</td>'+
									'<td>'+data.data[i].add_time.substr(0,data.data[i].add_time.indexOf(' '))+'</td>'+
									'<td adopt="'+data.data[i].adopt+'" data_id="'+data.data[i].id+'"><b class="look">查看</b><b class="delete">删除</b></td>'+
									'<td><i class="status'+data.data[i].adopt+'">'+adopt_arr[data.data[i].adopt]+'</i></td>'+
								'</tr>'
						$('.uploading2 table').append(tr)
					}
				}
			},
			error:function (data) {
				//console.log(data)
			}
		})
	}
	$('.uploading2').on('click','.look',function () {
		window.location.href = "python3/python_online.html?"+$(this).parent().attr('adopt')+"&"+$(this).parent().attr('data_id')
	})
	$('.uploading2').on('click','.delete',function () {
		var that = $(this)
		var a = confirm('算法删除后无法进行恢复,您确定要删除此算法吗？')
		if (a) {
			$.ajax({
				url: url_ip + '/examine/upalgocrud/',
				type: 'DELETE',
				data: {id:$(this).parent().attr('data_id'),adopt:$(this).parent().attr('adopt')},
				datatype: 'json',
				headers: {'Authorization':token},
				success: function (data) {
					//console.log(data)
					if (data.status) {
						alertmsg(data.msg,'',1)
						that.parent().parent().remove();
					}
				},
				error: function (data) {
					//console.log(data)
				}
			})	
		}
	})
	var _tid;
	$('.upload_sure').click(function () {
		var formData = new FormData();
		formData.append("py_file",file);
		formData.append("py_name",$('.upload_py input[type="text"]').val());
		formData.append("img",$('.up_load2_box ul li.on').attr('name'));
		//console.log(formData,$('.upload_py input[type="text"]').val(),$('.up_load2_box ul li.on').attr('name'))
		$.ajax({ 
			type:'POST',
			url:url_ip+'/examine/uploadpy/',
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
					alertmsg('上传成功','',1);
						$('.uploading2 table .table_title').after('<tr>'+
									'<td class="table_td_name">'+
										'<img src="'+data.data.img+'"><span>'+data.data.name+'</span>'+
									'</td>'+
									'<td>上传算法</td>'+
									'<td>'+data.data.add_time.substr(0,data.data.add_time.indexOf(' '))+'</td>'+
									'<td adopt="'+data.data.adopt+'" data_id="'+data.data.id+'"><b class="look">查看</b><b class="delete">删除</b></td>'+
									'<td><i class="status'+data.data.adopt+'">'+adopt_arr[data.data.adopt]+'</i></td>'+
								'</tr>')
				} else {
					alertmsg(data.msg,'',0);
				}
			}, 
			error:function(data) {
				//console.log(data)
				if (data.status == 401) {
					$('.shade').show()
				} else {
					alertmsg('程序出错了',touch_us,0);
				}
			},
			complete:function(){
				clearInterval(_tid);
				$('.loading').hide();
				$('.mu').hide();
				$('.up_algo2').hide()
			}
		});	
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
})
$(function () {
	/* lkw导航跳转 */
	if(GetQueryString('cm') == 'nav') {
		$('.uploading1 b').removeClass('on');is_agree = false;$('.uploading1 div').click();
	}
})