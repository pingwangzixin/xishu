// var token = "JWT " + window.sessionStorage.token;
// console.log(url_ip);
var _tid
// console.log(data_algo,_id)

$(function () {
	var now_page = 1;/*二级评论当前页数*/
	var all_page;/*耳机评论总页数*/
	var pub_html;
	if ($('.pub_comment')) {
		pub_html  = '<div class="pub_comment_arrow"><img src="img/arrow.jpg"></div>'+
			'<i class="pub_comment_icon1"><img src="img/icon_write.png"></i>'+
			'<div class="pub_comment_box">'+
				'<textarea class="pub_comment_box2" placeholder="请输入您的评论（最多可输入500字）"></textarea>'+
				'<h5>最多可放5张图片</h5>'+
				'<div class="pub_comment_pic1"><img src="img/add.png"><input type="file" accept="image/*"></div>'+
				'<div class="pub_comment_pic2"><img src="img/add.png"><input type="file" accept="image/*"></div>'+
				'<div class="pub_comment_pic3"><img src="img/add.png"><input type="file" accept="image/*"></div>'+
				'<div class="pub_comment_pic3"><img src="img/add.png"><input type="file" accept="image/*"></div>'+
				'<div class="pub_comment_pic3"><img src="img/add.png"><input type="file" accept="image/*"></div>'+
			'</div>'+
			'<i class="pub_comment_icon2">'+
				'<img src="img/icon_smile.png">'+
			'</i>'+
			'<div class="pub_comment_biaoqing">'+
				'<img src="img/KX0.png" title="开心" name="/:KX0">'+
				'<img src="img/ZK0.png" title="抓狂" name="/:ZK0">'+
				'<img src="img/DK0.png" title="大哭" name="/:DK0">'+
				'<img src="img/KL0.png" title="可怜" name="/:KL0">'+
				'<img src="img/WN0.png" title="无奈" name="/:WN0">'+
				'<img src="img/XQ0.png" title="嫌弃" name="/:XQ0">'+
				'<img src="img/WQ0.png" title="委屈" name="/:WQ0">'+
				'<img src="img/JJ0.png" title="倔强" name="/:JJ0">'+
				'<img src="img/SE0.png" title="色" name="/:SE0">'+
				'<img src="img/GX0.png" title="高兴" name="/:GX0">'+
				'<img src="img/TX0.png" title="偷笑" name="/:TX0">'+
				'<img src="img/GG0.png" title="尴尬" name="/:GG0">'+
				'<img src="img/SX0.png" title="伤心" name="/:SX0">'+
				'<img src="img/QQ0.png" title="亲亲" name="/:QQ0">'+
				'<img src="img/LH0.png" title="冷汗" name="/:LH0">'+
				'<img src="img/MR0.png" title="骂人" name="/:MR0">'+
				'<img src="img/JX0.png" title="惊吓" name="/:JX0">'+
				'<img src="img/HX0.png" title="害羞" name="/:HX0">'+
				'<img src="img/LL0.png" title="流泪" name="/:LL0">'+
				'<img src="img/BZ0.png" title="闭嘴" name="/:BZ0">'+
				'<img src="img/HP0.png" title="害怕" name="/:HP0">'+
				'<img src="img/DX0.png" title="大笑" name="/:DX0">'+
			'</div>'+
			'<i class="pub_comment_icon3"><img src="img/icon_pic.png"></i>'+
			'<div class="pub_comment_submit pub_comment_submit1">发&nbsp;&nbsp;布</div>'
		for (var i = 0; i < $('.pub_comment').length; i++) {
			// console.log($('.pub_comment').length)
			var node = $('.pub_comment')[i]
			$(node).append(pub_html)
		}
	}
// 点击我要评论
	var key0 = true;
	$('.will_comment').live('click',function () {
		key1 = true;
		key2 = '';
		key3 = true;
		$('#get_comments').hide();
		if (key0) {
			$('.pub_comment').show();
			$('.pub_comment_box div:eq(0) input')[0].value = '';
			$('.pub_comment_box div:eq(1) input')[0].value = '';
			$('.pub_comment_box div:eq(2) input')[0].value = '';
			$('.pub_comment_box div:eq(3) input')[0].value = '';
			$('.pub_comment_box div:eq(4) input')[0].value = '';
			$(window).scrollTop($('.pub_comment')[0].offsetTop)
		} else {
			$('.pub_comment').hide();
		}
		key0 = !key0;
		return false;
	})
// 筛选替换文本/表情
	function filt (html) {
		var html2 = html.replace(/\<{1}/g,"&lt;")
		var html3 = html2.replace(/\>{1}/g,"&gt;")
		var html4 = html3.replace(/\/{1}\:{1}([A-Z]{2}[0-9]{1})/g,'<img src="img/$1.png">')
		return html4;
	}
	var comments1_page = 1;
// 获取评论封装
	function getcom (data_algo,_id,comments1_page) {
		$.ajax({
			url:url_ip + '/operate/comment/',
			type:'GET',
			data:{type:data_algo,id:_id,page:comments1_page,user_id:token_id},
			dataType:'json',
			async:true,
			beforeSend:function(){
				clearInterval(_tid)
				var a = 0;
				_tid = setInterval(function () {
					a += 22.5
					$('.loading2').css('transform','rotate(' + a + 'deg)')
				},100)
			},
			success:function (data) {
				// console.log(data)
				if (data.status) {
					$('#get_comments').empty();
					var html = '<div class="get_comments_title">'+
								'<span>共<b>'+data.comments_num+'</b>条评论</span>'+
								'<div class="get_comments_pub fr"><img src="img/icon_write.png">我要说一句</div>	'+
							'</div>'
					$('#get_comments').append(html)
					for (var i = 0; i < data.data.length; i++) {
						var div = document.createElement('div');
						$(div).addClass('get_comments_list')
						$(div)[0].index = data.data[i].comment_id;
						$('#get_comments').append(div)
						var html2 = '<img src="'+url_ip + '/' + data.data[i].user_img+'"><span>'+data.data[i].name+'</span><b>'+data.data[i].createtime+'</b><p>'+filt(data.data[i].content)+'</p>'
						$(div).append(html2)
						var div2 = document.createElement('div');
						$(div2).addClass('get_comments_pics')
						$(div).append(div2)
						for (var k = 0; k < data.data[i].img.length; k++) {
							if (data.data[i].img[k].url != '') {
								var Oi = document.createElement('i')
								$(div2).append(Oi)
								$(Oi).css('height',$(Oi).width())
								var img = document.createElement('img')
								$(img).attr('src',url_ip + '/' + data.data[i].img[k].url)
								$(img)[0].index_w = data.data[i].img[k].w;
								$(img)[0].index_h = data.data[i].img[k].h;
								if (data.data[i].img[k].w > data.data[i].img[k].h) {
									var w = data.data[i].img[k].w * $(Oi).width() / data.data[i].img[k].h
									var m_l = -w / 2
									$(img).css({height:'100%',left:'50%',marginLeft:m_l})
								} else {
									var h = data.data[i].img[k].h * $(Oi).width() / data.data[i].img[k].w
									var m_h = -h / 2
									$(img).css({width:'100%',top:'50%',marginTop:m_h})
								}
								$(Oi).append(img)
							}
						}
						if (data.data[i].like == 0) {
							var data_zan = '赞 '
						} else {
							var data_zan = '取消赞 '
						}
						var html3 = '<ul class="get_comments_btns">'+
										'<li class="zan_li"><img src="img/zan'+data.data[i].like+'.jpg">'+data_zan+'(<span>'+data.data[i].thumb_num+'</span>)</li>'+
										'<li class="get_li">回复(<span>'+data.data[i].second_comments_num+'</span>)</li>'+
										'<li class="li">回复</li>'+
									'</ul>'+
									'<div class="pub_comment pub_comment2" style="top:-20px;width:100%;">'+
										'<i class="pub_comment_icon1"><img src="img/icon_write.png"></i>'+
										'<div><textarea class="pub_comment_box2" placeholder="请输入您的评论（最多可输入500字）" style="height:180px;margin:20px 0 20px 6%;border:0;background:#F9FBFA;width:75%;"></textarea></div>'+
										'<i class="pub_comment_icon2" style="left:calc(90.5% - 15px);">'+
											'<img src="img/icon_smile.png">'+
										'</i>'+
										'<div class="pub_comment_biaoqing" style="width:calc(19% - 4px);left:calc(81% + 2px);">'+
											'<img src="img/KX0.png" title="开心" name="/:KX0">'+
											'<img src="img/ZK0.png" title="抓狂" name="/:ZK0">'+
											'<img src="img/DK0.png" title="大哭" name="/:DK0">'+
											'<img src="img/KL0.png" title="可怜" name="/:KL0">'+
											'<img src="img/WN0.png" title="无奈" name="/:WN0">'+
											'<img src="img/XQ0.png" title="嫌弃" name="/:XQ0">'+
											'<img src="img/WQ0.png" title="委屈" name="/:WQ0">'+
											'<img src="img/JJ0.png" title="倔强" name="/:JJ0">'+
											'<img src="img/SE0.png" title="色" name="/:SE0">'+
											'<img src="img/GX0.png" title="高兴" name="/:GX0">'+
											'<img src="img/TX0.png" title="偷笑" name="/:TX0">'+
											'<img src="img/GG0.png" title="尴尬" name="/:GG0">'+
											'<img src="img/SX0.png" title="伤心" name="/:SX0">'+
											'<img src="img/QQ0.png" title="亲亲" name="/:QQ0">'+
											'<img src="img/LH0.png" title="冷汗" name="/:LH0">'+
											'<img src="img/MR0.png" title="骂人" name="/:MR0">'+
											'<img src="img/JX0.png" title="惊吓" name="/:JX0">'+
											'<img src="img/HX0.png" title="害羞" name="/:HX0">'+
											'<img src="img/LL0.png" title="流泪" name="/:LL0">'+
											'<img src="img/BZ0.png" title="闭嘴" name="/:BZ0">'+
											'<img src="img/HP0.png" title="害怕" name="/:HP0">'+
											'<img src="img/DX0.png" title="大笑" name="/:DX0">'+
										'</div>'+
										'<div class="pub_comment_submit pub_comment_submit2" style="left:84%;width:14%;bottom:14px;">发&nbsp;&nbsp;布</div>'+
									'</div>'+
									'<div class="get_comments2"></div>'
						$(div).append(html3)
					}
					if (data.comments_num > 6) {
						var html4 = '<div class="get_comments_more"><div><i><img src="img/loading.png" class="loading2"></i>加载更多</div></div>'	
					} else if (data.comments_num > 0 && data.comments_num <= 6) {
						var html4 = '<div class="get_comments_more"><div>没有更多了</div></div>'
					} else {
						var html4 = '<div class="get_comments_more"><div>还没有评论哦</div></div>'
					}
					$('#get_comments').append(html4)
				}
			},
			error:function (data) {
				console.log(data)
			},
			complete:function () {
				clearInterval(_tid);
			}
		})
	}
// 点击所有评论
	var key1 = true; 
	$('.all_comment').live('click',function () {
		key0 = true;
		key2 = true;
		key3 = true;
		$('.pub_comment').hide();
		comments1_page = 1;
		if (key1) {
			$('#get_comments').show();
			getcom(data_algo,_id,comments1_page)
		} else {
			$('#get_comments').hide();
		}
		key1 = !key1;
		return false;
	})
	$('.all_comment2').live('click',function () {
		$('.pub_comment').hide();
		$('#get_comments').show();
		comments1_page = 1;
		getcom(data_algo,_id,comments1_page)
	})
// 懒加载评论
	var key = true
	$(window).scroll(function () {
		if ($('#get_comments').height() != 0) {
			var node = $('#get_comments').offset().top + $('#get_comments').height() - $(window).height()
		} else {
			var node = 1000;
		}
		// console.log($(document).scrollTop(),node)
		if ($(document).scrollTop() >= node) {
			if (key) {
				key = false;
				comments1_page++;
				$.ajax({
					url:url_ip + '/operate/comment/',
					type:'GET',
					data:{type:data_algo,id:_id,page:comments1_page},
					dataType:'json',
					beforeSend:function(){
						clearInterval(_tid)
						var a = 0;
						_tid = setInterval(function () {
							a += 22.5
							$('.loading2').css('transform','rotate(' + a + 'deg)')
						},100)
					},
					success:function (data) {
						// console.log(data)
						if (data.data.length != 0) {
							for (var i = 0; i < data.data.length; i++) {
								var div = document.createElement('div');
								$(div).addClass('get_comments_list')
								$(div)[0].index = data.data[i].comment_id;
								$('#get_comments .get_comments_more').before(div)
								var html2 = '<img src="'+url_ip + '/' + data.data[i].user_img+'"><span>'+data.data[i].name+'</span><b>'+data.data[i].createtime+'</b>'+
											'<p>'+filt(data.data[i].content)+'</p>'
								// console.log(html2)
								$(div).append(html2)
								var div2 = document.createElement('div');
								$(div2).addClass('get_comments_pics')
								$(div).append(div2)
								for (var k = 0; k < data.data[i].img.length; k++) {
									if (data.data[i].img[k].url != '') {
										var Oi = document.createElement('i')
										$(div2).append(Oi)
										$(Oi).css('height',$(Oi).width())
										var img = document.createElement('img')
										$(img).attr('src',url_ip + '/' + data.data[i].img[k].url)
										$(img)[0].index_w = data.data[i].img[k].w;
										$(img)[0].index_h = data.data[i].img[k].h;
										if (data.data[i].img[k].w > data.data[i].img[k].h) {
											var w = data.data[i].img[k].w * $(Oi).width() / data.data[i].img[k].h
											var m_l = -w / 2
											$(img).css({height:'100%',left:'50%',marginLeft:m_l})
										} else {
											var h = data.data[i].img[k].h * $(Oi).width() / data.data[i].img[k].w
											var m_h = -h / 2
											$(img).css({width:'100%',top:'50%',marginTop:m_h})
										}
										$(Oi).append(img)
									}
								}
								if (data.data[i].like == 0) {
									var data_zan = '赞 '
								} else {
									var data_zan = '取消赞 '
								}
								var html3 = '<ul class="get_comments_btns">'+
												'<li class="zan_li"><img src="img/zan'+data.data[i].like+'.jpg">'+data_zan+'(<span>'+data.data[i].thumb_num+'</span>)</li>'+
												'<li class="get_li">回复(<span>'+data.data[i].second_comments_num+'</span>)</li>'+
												'<li class="li">回复</li>'+
											'</ul>'+
											'<div class="pub_comment pub_comment2" style="top:-20px;width:100%;">'+
												'<i class="pub_comment_icon1"><img src="img/icon_write.png"></i>'+
												'<div><textarea class="pub_comment_box2" placeholder="请输入您的评论（最多可输入500字）" style="height:180px;margin:20px 0 20px 6%;border:0;background:#F9FBFA;width:75%;"></textarea></div>'+
												'<i class="pub_comment_icon2" style="left:calc(90.5% - 15px);">'+
													'<img src="img/icon_smile.png">'+
												'</i>'+
												'<div class="pub_comment_biaoqing" style="width:calc(19% - 4px);left:calc(81% + 2px);">'+
													'<img src="img/KX0.png" title="开心" name="/:KX0">'+
													'<img src="img/ZK0.png" title="抓狂" name="/:ZK0">'+
													'<img src="img/DK0.png" title="大哭" name="/:DK0">'+
													'<img src="img/KL0.png" title="可怜" name="/:KL0">'+
													'<img src="img/WN0.png" title="无奈" name="/:WN0">'+
													'<img src="img/XQ0.png" title="嫌弃" name="/:XQ0">'+
													'<img src="img/WQ0.png" title="委屈" name="/:WQ0">'+
													'<img src="img/JJ0.png" title="倔强" name="/:JJ0">'+
													'<img src="img/SE0.png" title="色" name="/:SE0">'+
													'<img src="img/GX0.png" title="高兴" name="/:GX0">'+
													'<img src="img/TX0.png" title="偷笑" name="/:TX0">'+
													'<img src="img/GG0.png" title="尴尬" name="/:GG0">'+
													'<img src="img/SX0.png" title="伤心" name="/:SX0">'+
													'<img src="img/QQ0.png" title="亲亲" name="/:QQ0">'+
													'<img src="img/LH0.png" title="冷汗" name="/:LH0">'+
													'<img src="img/MR0.png" title="骂人" name="/:MR0">'+
													'<img src="img/JX0.png" title="惊吓" name="/:JX0">'+
													'<img src="img/HX0.png" title="害羞" name="/:HX0">'+
													'<img src="img/LL0.png" title="流泪" name="/:LL0">'+
													'<img src="img/BZ0.png" title="闭嘴" name="/:BZ0">'+
													'<img src="img/HP0.png" title="害怕" name="/:HP0">'+
													'<img src="img/DX0.png" title="大笑" name="/:DX0">'+
												'</div>'+
												'<div class="pub_comment_submit pub_comment_submit2" style="left:84%;width:14%;bottom:14px;">发&nbsp;&nbsp;布</div>'+
											'</div>'+
											'<div class="get_comments2"></div>'
								$(div).append(html3)
							}	
						} else {
							$('.get_comments_more div').html('没有更多了')
						}
					},
					error:function (err) {
						console.log(err)
					},
					complete:function () {
						clearInterval(_tid);
						key = true;
					}
				})
			}
		}
	})
// 点击我要说一句
	$('.get_comments_pub').live('click',function () {
		key0 = true;
		$('.will_comment').click();
	})
// 赞
	$('.zan_li').live('click',function () {
		var this_li = $(this)
		var this_span = $(this).children('span')
		var this_span_num = Number($(this).children('span').html())
		var comment_id = $(this).parent().parent()[0].index
		// console.log(_id)
		$.ajax({
			url:url_ip + '/operate/click_like/',
			type:'GET',
			data:{type:data_algo,comment_id:comment_id,id:_id},
			dataType:'json',
			headers:{'Authorization':token},
			success:function (data) {
				// console.log(data)
				if (data.status) {
					if (data.msg == '点赞成功') {
						var a = this_span_num + 1
						var html = '<img src="img/zan1.jpg">取消赞 (<span>'+a+'</span>)'
						this_li.html(html)
					} else {
						var a = this_span_num - 1
						var html = '<img src="img/zan0.jpg">赞 (<span>'+a+'</span>)'
						this_li.html(html)		
					}
				}
			},
			error:function (data) {
				console.log(data)
				if (data.status == 401) {
					$('.shade').show()
				}
			}
		})
	})
// 禁止图片拖拽
	$('img').live('mousedown',function (e) {
		e.preventDefault();
	})
// 点击表情
	$('.pub_comment_biaoqing img').live('click',function () {
		var html = $(this)[0].name
		$(this).parent().parent().prev().children('textarea').val($(this).parent().parent().prev().children('textarea').val() + html)
	})
// 上传图片
	$('.pub_comment_box div input').live('change',function () {
		// console.log($(this))
		if ($(this)[0].files.length != 0) {
			$(this).next().remove();
			$(this).prev('em').remove();
			var img = document.createElement('img');
			$(img).addClass('img')
			$(this).after(img)
			var reader = new FileReader();
			reader.readAsDataURL($(this)[0].files[0]);
			reader.onload = function () {
				$(img).attr('src',reader.result)
			}
			var em = document.createElement('em');
			$(this).before(em)	
		} else {
			$(this).next().remove();
			$(this).prev('em').remove();
		}
	})
// 删除图片
	$('.pub_comment_box div em').live('click',function () {
		$(this).nextAll('input')[0].value = '';
		$(this).nextAll('.img').remove();
		$(this).remove();
	})
// 发布
	$('.pub_comment_submit1').live('click',function () {
		var txt = $('.pub_comment_box2').val();
		var pic1 = $('.pub_comment_box div:eq(0) input')[0].files[0]
		var pic2 = $('.pub_comment_box div:eq(1) input')[0].files[0]
		var pic3 = $('.pub_comment_box div:eq(2) input')[0].files[0]
		var pic4 = $('.pub_comment_box div:eq(3) input')[0].files[0]
		var pic5 = $('.pub_comment_box div:eq(4) input')[0].files[0]
		var formData = new FormData();
		formData.append('type',data_algo)
		formData.append('id',_id)
		formData.append('comment_id','')
		formData.append('content',txt)
		formData.append('photo1',pic1)
		formData.append('photo2',pic2)
		formData.append('photo3',pic3)
		formData.append('photo4',pic4)
		formData.append('photo5',pic5)
		// console.log(formData)
		$.ajax({
			url: url_ip + '/operate/comment/',
			type: 'POST',
			data: formData,
			dataType: 'json',
			headers: {'Authorization':token},
			processData: false,
			contentType : false,
			success: function (data) {
				if (data.status) {
					alertmsg(data.msg,'',1)
					$('.all_comment span').html(Number($('.all_comment span').html()) + 1)
					$('.all_comment2 span').html(Number($('.all_comment2 span').html()) + 1)
					$('.pub_comment_box2').val('')
					$('.pub_comment_box div input')[0].value = '';
					$('.pub_comment_box div .img').remove();
					$('.pub_comment_box div em').remove();
					$('.all_comment').click();
					$('.all_comment2').click();
				} else {
					alertmsg(data.msg,'',0)
				}
			},
			error: function (err) {
				console.log(err)
				if (err.status == 401) {
					$('.shade').show()
				}
			}
		})
	})
// 点击回复打开二级回复框
	var key2 = ''
	$('.li').live('click',function (evt) {
		$('.get_comments2').empty()
		key3 = '';
		var evt = evt || window.event
		$('.pub_comment2').hide()
		if (key2 != evt.target) {
			$(this).parent().next().show();
			key2 = evt.target
		} else {
			$(this).parent().next().hide();
			key2 = '';
		}
	})
	// console.log($('#get_comments').offset().top,$('#get_comments').height(),$(document).scrollTop(),$(window).height())
// esc键触发关闭
	$(document).keyup(function (event) {
		if (event.keyCode == 27) {
			$('.pub_comment').hide();
			$('#get_comments').hide();
		}
	})
// 二级评论发布
	$('.pub_comment_submit2').live('click',function () {
		var txt = $(this).prevAll('div').children('.pub_comment_box2').val();
		if (txt != '') {
			var this_span = $(this).parent().prev().children('li').eq(1).children('span')
			var comment_id = $(this).parent().parent()[0].index;
			// console.log(txt,comment_id,_id)
			var formData = new FormData();
			formData.append('type',data_algo)
			formData.append('id',_id)
			formData.append('comment_id',comment_id)
			formData.append('content',txt)
			$.ajax({
				url: url_ip + '/operate/comment/',
				type: 'POST',
				data: formData,
				dataType: 'json',
				headers: {'Authorization':token},
				processData: false,
				contentType : false,
				success: function (data) {
					// console.log(data)
					if (data.status) {
						alertmsg(data.msg,'',1)
						$('.pub_comment_box2').val('')
						var a = Number(this_span.html()) + 1;
						this_span.html(a)
						$('.get_li').click()
					} else {
						alertmsg(data.msg,'',0)
					}
				},
				error: function (err) {
					console.log(err)
					if (err.status == 401) {
						$('.shade').show();
					}
				}
			})	
		}
	})
// 回复二级评论
	$('.pub_comment_submit3').live('click',function () {
		var comments2 = $(this).parent().parent();
		var point_id = $(this).attr('data-id')
		var txt = $(this).prevAll('div').children('.pub_comment_box2').val();
		if (txt != '') {
			var this_span = $(this).parent().parent().prev().prev().children('li').eq(1).children('span')
			var comment_id = $(this).parent().attr('data-id')
			// console.log(txt,comment_id,_id,point_id)
			var formData = new FormData();
			formData.append('type',data_algo)
			formData.append('id',_id)
			formData.append('comment_id',comment_id)
			formData.append('content',txt)
			formData.append('point_id',point_id)
			$.ajax({
				url: url_ip + '/operate/comment/',
				type: 'POST',
				data: formData,
				dataType: 'json',
				headers: {'Authorization':token},
				processData: false,
				contentType : false,
				success: function (data) {
					// console.log(data)
					if (data.status) {
						alertmsg(data.msg,'',1)
						$('.pub_comment_box2').val('')
						var a = Number(this_span.html()) + 1;
						this_span.html(a)
						get_comments2(comment_id,comments2);
					} else {
						alertmsg(data.msg,'',0)
					}
				},
				error: function (err) {
					console.log(err)
					if (err.status) {
						$('.shade').show()
					}
				}
			})	
		}
	})
// 获取二级评论
	var key3 = '';
	$('.get_li').live('click',function (evt) {
		now_page = 1;
		$('.pub_comment2').hide();
		key2 = '';
		$('.get_comments2').empty();
		var evt = evt || window.event
		var comments2 = $(this).parent().next().next()
		if (key3 != evt.target) {
			var comment_id = $(this).parent().parent()[0].index;
			get_comments2(comment_id,comments2);
			key3 = evt.target	
		} else {
			comments2.empty();
			key3 = '';	
		}
	})
	// 二级评论请求封装
	function get_comments2 (comment_id,comments2) {
		$.ajax({
			url:url_ip + '/operate/etail_comment/',
			type:'GET',
			data:{type:data_algo,id:_id,page:now_page,comment_id:comment_id},
			dataType:'json',
			async:false,
			success:function (data) {
				if (data.status) {
					comments2.empty();
					for (var i = 0; i < data.data.length; i++) {
						var html = '<div class="comments2_list" data-id="'+data.data[i].comments_id+'">'+
										'<div class="comments2_list_tx"><img src="'+url_ip+'/'+data.data[i].user_img+'"></div>'+
										'<div class="comments2_list_a">'+data.data[i].name+'</div>'+
										'<span>回复</span>'+
										'<div class="comments2_list_z">'+data.data[i].point_name+'</div>'+
										'<div class="comments2_list_time">'+data.data[i].createtime+'</div>'+
										'<div class="comments2_list_up" data-id="'+data.data[i].user_id+'" data-name="'+data.data[i].name+'">回复</div>'+
										'<p>'+filt(data.data[i].content)+'</p>'+
									'</div>'
						comments2.append(html)
					}
					all_page = Math.ceil(data.comments_num / 6)
					var html2 = '<div class="ycl_page comment_page">'+
					                '<div class="first_page">首页</div>'+
					                '<div class="pre_page"><img src="img/weizuo.png"></div>'+
					                '<span class="span left_dian">...</span>'+
					                '<ul>'+
					                   '<li class="now_page">1</li>'+
					                '</ul>'+
					                '<span class="span last_dian">...</span>'+
					                '<div class="next_page"><img src="img/weiyou.png"></div>'+
					                '<div class="last_page">尾页</div>'+
					                '<p>共 <span class="all_page">'+all_page+'</span> 页</p>'+
					                '<input type="text" class="will_page">'+
					                '<div class="to_page">跳转</div>'+
					            '</div>'
					comments2.append(html2) 
				}
			},
			error:function (err) {
				console.log(err)
			},
			complete:function () {
				for (var i = 1; i < all_page; i++) {
					var oli = document.createElement('li');
					oli.innerHTML = i + 1;
					$('.comment_page ul').append(oli);
				}
			}
		})
	}
// 分页
	$('.comment_page ul li').live('click',function () {
		now_page = Number($(this).html());
		var comment_id = $(this).parents('.comment_page').parent().parent()[0].index;
		var comments2 = $(this).parents('.comment_page').parent()
		get_comments2(comment_id,comments2);
	})
	$('.comment_page .first_page').live('click',function () {
		now_page = 1;
		var comment_id = $(this).parents('.comment_page').parent().parent()[0].index;
		var comments2 = $(this).parents('.comment_page').parent()
		get_comments2(comment_id,comments2);
	})
	$('.comment_page .last_page').live('click',function () {
		now_page = all_page;
		var comment_id = $(this).parents('.comment_page').parent().parent()[0].index;
		var comments2 = $(this).parents('.comment_page').parent()
		get_comments2(comment_id,comments2);
	})
	$('.comment_page .pre_page').live('click',function () {
		if (now_page > 1) {
			now_page--;
			var comment_id = $(this).parents('.comment_page').parent().parent()[0].index;
			var comments2 = $(this).parents('.comment_page').parent()
			get_comments2(comment_id,comments2);
		}
	})
	$('.comment_page .next_page').live('click',function () {
		if (now_page < all_page) {
			now_page++;
			var comment_id = $(this).parents('.comment_page').parent().parent()[0].index;
			var comments2 = $(this).parents('.comment_page').parent()
			get_comments2(comment_id,comments2);
		}
	})
	$('.comment_page .to_page').live('click',function () {
		var a = Number($('.comment_page .will_page').val());
		if (a >= 1 && a <= all_page) {
			now_page = a;
			var comment_id = $(this).parents('.comment_page').parent().parent()[0].index;
			var comments2 = $(this).parents('.comment_page').parent()
			get_comments2(comment_id,comments2);
		}
	})
	setInterval(function() {
		if (now_page == 1 && now_page < all_page) {
			$('.comment_page .pre_page img').attr('src','img/buzuo.png')
			$('.comment_page .next_page img').attr('src','img/weiyou.png')
			$('.comment_page .first_page').addClass('noclick')
			$('.comment_page .last_page').removeClass('noclick')
			$('.comment_page ul li').removeClass('now_page');
			$('.comment_page ul li').eq(0).addClass('now_page');
		} else if (now_page == 1 && now_page == all_page) {
			$('.comment_page .pre_page img').attr('src','img/buzuo.png')
			$('.comment_page .next_page img').attr('src','img/buyou.png')
			$('.comment_page .first_page').addClass('noclick')
			$('.comment_page .last_page').addClass('noclick')
			$('.comment_page ul li').removeClass('now_page');
			$('.comment_page ul li').eq(0).addClass('now_page');
		} else if (now_page > 1 && now_page < all_page) {
			$('.comment_page .pre_page img').attr('src','img/weizuo.png')
			$('.comment_page .next_page img').attr('src','img/weiyou.png')
			$('.comment_page .first_page').removeClass('noclick')
			$('.comment_page .last_page').removeClass('noclick')
			$('.comment_page ul li').removeClass('now_page');
			$('.comment_page ul li').eq(now_page - 1).addClass('now_page');
		} else if (now_page > 1 && now_page == all_page) {
			$('.comment_page .pre_page img').attr('src','img/weizuo.png')
			$('.comment_page .next_page img').attr('src','img/buyou.png')
			$('.comment_page .first_page').removeClass('noclick')
			$('.comment_page .last_page').addClass('noclick')
			$('.comment_page ul li').removeClass('now_page');
			$('.comment_page ul li').eq(all_page - 1).addClass('now_page');
		}
	},0)
	setInterval(function() {
		if ($('.comment_page .now_page').html() <= 4) {
			$('.comment_page ul li').css('display','none');
			$('.comment_page .span').css('display','none');
			$('.comment_page ul li:lt(5)').css('display','inline-block');
			$('.comment_page .last_dian').css('display','inline-block');
		} else if ($('.comment_page .now_page').html() <= all_page - 4 && $('.comment_page .now_page').html() > 4) {
			var a1 = $('.comment_page .now_page').html() - 3;
			var a2 = $('.comment_page .now_page').html() - 2;
			var a3 = $('.comment_page .now_page').html() - 1;
			var a4 = $('.comment_page .now_page').html();
			var a5 = parseInt($('.comment_page .now_page').html()) + 1;
			$('.comment_page ul li').css('display','none');
			$('.comment_page .span').css('display','inline-block');
			$('.comment_page ul li:eq('+ a1 +')').css('display','inline-block');
			$('.comment_page ul li:eq('+ a2 +')').css('display','inline-block');
			$('.comment_page ul li:eq('+ a3 +')').css('display','inline-block');
			$('.comment_page ul li:eq('+ a4 +')').css('display','inline-block');
			$('.comment_page ul li:eq('+ a5 +')').css('display','inline-block');
		} else if ($('.comment_page .now_page').html() > all_page - 4) {
			var a6 = all_page - 6;
			$('.comment_page ul li').css('display','none');
			$('.comment_page .span').css('display','none');
			$('.comment_page ul li:gt('+ a6 +')').css('display','inline-block');
			$('.comment_page .left_dian').css('display','inline-block');
		};
	},0)
// 点击二级评论中的回复
	$('.comments2_list_up').live('click',function (evt) {
		var evt = evt || window.event;
		var name = $(this).attr('data-name')
		var comment_id = $(this).parent().attr('data-id')
		var id = $(this).attr('data-id')
		// console.log(comment_id)
		var html = '<div class="pub_comment" style="top:10px;width:116%;display:block;left:-8%;" data-id="'+comment_id+'">'+
						'<i class="pub_comment_icon1"><img src="img/icon_write.png"></i>'+
						'<div><textarea class="pub_comment_box2" placeholder="请输入您的评论（最多可输入500字）" style="height:180px;margin:20px 0 20px 6%;border:0;background:#F9FBFA;width:75%;"></textarea></div>'+
						'<i class="pub_comment_icon2" style="left:calc(90.5% - 15px);">'+
							'<img src="img/icon_smile.png">'+
						'</i>'+
						'<div class="pub_comment_biaoqing" style="width:calc(19% - 4px);left:calc(81% + 2px);">'+
							'<img src="img/KX0.png" title="开心" name="/:KX0">'+
							'<img src="img/ZK0.png" title="抓狂" name="/:ZK0">'+
							'<img src="img/DK0.png" title="大哭" name="/:DK0">'+
							'<img src="img/KL0.png" title="可怜" name="/:KL0">'+
							'<img src="img/WN0.png" title="无奈" name="/:WN0">'+
							'<img src="img/XQ0.png" title="嫌弃" name="/:XQ0">'+
							'<img src="img/WQ0.png" title="委屈" name="/:WQ0">'+
							'<img src="img/JJ0.png" title="倔强" name="/:JJ0">'+
							'<img src="img/SE0.png" title="色" name="/:SE0">'+
							'<img src="img/GX0.png" title="高兴" name="/:GX0">'+
							'<img src="img/TX0.png" title="偷笑" name="/:TX0">'+
							'<img src="img/GG0.png" title="尴尬" name="/:GG0">'+
							'<img src="img/SX0.png" title="伤心" name="/:SX0">'+
							'<img src="img/QQ0.png" title="亲亲" name="/:QQ0">'+
							'<img src="img/LH0.png" title="冷汗" name="/:LH0">'+
							'<img src="img/MR0.png" title="骂人" name="/:MR0">'+
							'<img src="img/JX0.png" title="惊吓" name="/:JX0">'+
							'<img src="img/HX0.png" title="害羞" name="/:HX0">'+
							'<img src="img/LL0.png" title="流泪" name="/:LL0">'+
							'<img src="img/BZ0.png" title="闭嘴" name="/:BZ0">'+
							'<img src="img/HP0.png" title="害怕" name="/:HP0">'+
							'<img src="img/DX0.png" title="大笑" name="/:DX0">'+
						'</div>'+
						'<div class="pub_comment_submit pub_comment_submit3" style="left:84%;width:14%;bottom:14px;" data-id="'+id+'">发&nbsp;&nbsp;布</div>'+
					'</div>'
		$(this).parent().parent().children('.pub_comment').remove();
		$(this).parent().parent().append(html)
		var a = $(this).parent().parent()[0].offsetTop + $(this).parent().parent()[0].offsetHeight
		// console.log(a)
		$(window).scrollTop(a)
	})
// 查看大图
	var index = 0;
	var img_list = [];
	$('.get_comments_pics i').live('click',function () {
		index = $(this).index()
		img_list = $(this).parent().children().children()
		$('.black_bg').show();
		big_pic();
	})
	// 大图展示封装
	function big_pic () {
		for (var i = 0; i < img_list.length; i++) {
			if (i == index) {
				var max_w = $('body').width() - 160;
				var max_h = $(window).height();
				var img = document.createElement('img');
				// console.log(img_list[i].index_w,img_list[i].index_h,max_w,max_h)
				if (img_list[i].index_w >= max_w) {
					var now_w = max_w
					var l = - max_w / 2
					var now_h = img_list[i].index_h * max_w / img_list[i].index_w
					var t = - now_h / 2
				} else if (img_list[i].index_h >= max_h) {
					var now_h = max_h
					var t = - max_h / 2
					var now_w = img_list[i].index_w * max_h / img_list[i].index_h;
					var l = - now_w / 2
				} else {
					var now_w = img_list[i].index_w
					var now_h = img_list[i].index_h
					var l = -img_list[i].index_w / 2
					var t = -img_list[i].index_h / 2
				}
				$(img).attr('src',img_list[i].src)
				$(img).css({width:now_w,height:now_h,marginLeft:l,marginTop:t})
				$('.black_bg img').remove();
				$('.black_bg').append(img)
			}
		}
	}
	// 左右按钮
	$('.black_bg .prev').live('click',function () {
		if (index >= 1) {
			index--;
			big_pic();
		}
	})
	$('.black_bg .next').live('click',function () {
		if (index <= img_list.length - 2) {
			index++;
			big_pic();
		}
	})
	// 关闭大图
	$('.black_bg .close').live('click',function () {
		$('.black_bg').hide();
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