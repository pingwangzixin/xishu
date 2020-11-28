// var token = "JWT " + window.sessionStorage.token;
// console.log(url_ip)
// console.log(token)
var tid;
function comfromNavClick() {
	var needParm = GetQueryString('cm');
	if (needParm) {
		$('.right_context ul').children('li[data-chartname="' + needParm + '"]').click();
	}
}
function errFn(err, touch_us){
	if (err.status == 401) {
		if (token == 'JWT undefined' || token == 'JWT null') {
			$('.shade').showMsg({ptxt: '您目前还没有注册或登录~ '});
		} else {
			$('.shade').showMsg({ptxt: '系统检测,您的账号存在风险异常,请重新登录。'});
		}
	} else {
		$('.alertMsg').showMsg({isImg: 'isNo', h2txt: '未知错误'+touch_us});
	}
}
// 顶部导航栏
$(function () {
	$('nav .navs li').hover(function () {
		$(this).children('ul').eq(0).css('display', 'block');
	}, function () {
		$(this).children('ul').eq(0).css('display', 'none');
	});

	$('.sch').hover(function () {
		$(this).addClass('on');
		$('.sch .search').show();
	}, function () {
		$(this).removeClass('on');
		$('.sch .search').hide();
	});
	// 进入页面获取图标列表
	$.ajax({
		type: 'GET',
		url: url_ip + '/visual/sortchart/',
		cache: false,
		data: {},
		datatype: 'json',
		headers: { "Authorization": token },
		success: function (data) {
			//console.log(data)
			if (data.status) {
				for (var i = 0; i < data.sort.length; i++) {
					var li = document.createElement('li');
					$(li)[0].name = data.sort[i].chart_name
					var html = '<img src="img/' + data.sort[i].chart_name + '.png"><span title="' + data.sort[i].name + '">' + data.sort[i].name + '</span>'
					$(li).append(html);
					var div = document.createElement('div');
					$(div).addClass('li_hide')
					for (var j = 0; j < data.labels.length; j++) {
						if (data.labels[j].chart_name == data.sort[i].chart_name) {
							for (var k = 0; k < data.labels[j].label.length; k++) {
								var span = document.createElement('span')
								$(span).html(data.labels[j].label[k]);
								$(div).append(span)
							}
						}
					}
					$(li).append(div);
					$(li).attr({ 'data-chartname': data.sort[i].chart_name, 'data-name': data.sort[i].name });
					$('.right_context ul').append(li)
				}
				// 来自导航的爱
				comfromNavClick();
			} else {
				alertmsg(data.msg)
			}
		},
		error: function (data) {
			errFn(data, touch_us)
		}
	})
	// 进入页面获取文件列表
	var obj_id = '';
	var test = window.location.search;
	test = test.substr(1);
	test = ''; // lkw 2018-12-05注释
	//console.log(test)
	if (test != '') {
		obj_id = test;
		$.ajax({
			type: 'GET',
			url: url_ip + '/visual/get_title/?obj_id=' + test,
			cache: false,
			data: {},
			datatype: 'json',
			headers: { "Authorization": token },
			success: function (data) {
				//console.log(data)
				$('.file_name>span').html(data.name)
				$('#weidu2').empty()
				for (var i = 0; i < data.title.length; i++) {
					var li = document.createElement('li');
					$(li).html(data.title[i]);
					$('.left ul').append(li)
					var td = document.createElement('td')
					var ob = document.createElement('b');
					var em = document.createElement('em')
					$(ob).html(data.title[i]);
					$(ob)[0].msg = 'sum';
					$(ob).append(em)
					$(td).append(ob);
					$('#weidu2').append(td)
				}
				get_data()
			},
			error: function (data) {
				errFn(data, touch_us)
			}
		});
		$.ajax({
			type: 'GET',
			url: url_ip + '/visual/get_files/',
			cache: false,
			data: {},
			datatype: 'JSON',
			headers: { "Authorization": token },
			success: function (data) {
				//console.log(data)
				// 默认文件名
				// var a = data[0].file_name.lastIndexOf('/') + 1;
				// var filename = data[0].file_name.substr(a,)
				// 文件列表
				for (var j = 0; j < data.length; j++) {
					var dd = document.createElement('dd');
					var i = document.createElement('i');
					var img = document.createElement('img');
					var span = document.createElement('span');
					$(span).html(data[j][0]);
					$(span)[0].msg = data[j][1];
					$(img).attr('src', 'img/file.jpg')
					$(i).append(img);
					$(dd).append(i);
					$(dd).append(span);
					$('#file_box dl').append(dd);
				}
			},
			error: function (data) {
				errFn(data, touch_us)
			}
		})
	} else {
		$.ajax({
			type: 'GET',
			url: url_ip + '/visual/get_files/',
			cache: false,
			data: {},
			datatype: 'JSON',
			headers: { "Authorization": token },
			success: function (data) {
				//console.log(data)
				if (data.length != 0) {
					$('.file_name>span').html(data[0][0])
					obj_id = data[0][1];
					// 文件列表
					for (var j = 0; j < data.length; j++) {
						var dd = document.createElement('dd');
						var i = document.createElement('i');
						var img = document.createElement('img');
						var span = document.createElement('span');
						$(span).html(data[j][0]);
						$(span)[0].msg = data[j][1];
						$(img).attr('src', 'img/file.jpg')
						$(i).append(img);
						$(dd).append(i);
						$(dd).append(span);
						$('#file_box dl').append(dd);
					}
					$.ajax({
						type: 'GET',
						url: url_ip + '/visual/get_title/?obj_id=' + obj_id,
						cache: false,
						data: {},
						datatype: 'json',
						headers: { "Authorization": token },
						success: function (data) {
							//console.log(data)
							$('#weidu2').empty()
							for (var i = 0; i < data.title.length; i++) {
								var li = document.createElement('li');
								$(li).html(data.title[i]);
								$('.left ul').append(li)
								var td = document.createElement('td')
								var ob = document.createElement('b');
								var em = document.createElement('em')
								$(ob).html(data.title[i]);
								$(ob)[0].msg = 'sum';
								$(ob).append(em)
								$(td).append(ob);
								$('#weidu2').append(td)
							}
							get_data()
							console.log(2,obj_id)
						},
						error: function (data) {
							errFn(data, touch_us);
						}
					});
				}
			},
			error: function (data) {
				errFn(data, touch_us);
			}
		})
	}
	// 点击获取文件
	$('#file_box dl dd').live('click', function () {
		//console.log($(this).children('span'))
		obj_id = $(this).children('span')[0].msg;
		var name = $(this).children('span').html();
		//console.log(obj_id)
		$.ajax({
			type: 'GET',
			url: url_ip + '/visual/get_title/?obj_id=' + obj_id,
			cache: false,
			data: {},
			datatype: 'json',
			headers: { "Authorization": token },
			success: function (data) {
				//console.log(data)
				$('#file_box').hide();
				$('.mu').hide();
				$('.file_name>span').html(name)
				$('.left ul').empty();
				$('#weidu2').empty()
				for (var i = 0; i < data.title.length; i++) {
					var li = document.createElement('li');
					$(li).html(data.title[i]);
					$('.left ul').append(li)
					var td = document.createElement('td')
					var ob = document.createElement('b');
					var em = document.createElement('em')
					$(ob).html(data.title[i]);
					$(ob)[0].msg = 'sum';
					$(ob).append(em)
					$(td).append(ob);
					$('#weidu2').append(td)
				}
				get_data()
			},
			error: function (data) {
				errFn(data, touch_us);
			}
		})
	})
	// 搜索框搜索
	$('.left_search input').bind("input propertychange change", function () {
		if ($('.left_search input').val() != '') {
			var zz = $('.left_search input').val();
			$('.left>ul li').css('display', 'none');
			$('.left>ul li:contains("' + zz + '")').css('display', 'block')
		} else {
			$('.left>ul li').css('display', 'block');
		}
	})
	// 数据获取封装
	function get_data() {
		console.log('here')
		arr3 = []
		for (var j = 0; j < $('#weidu2').children('td').children('b').length; j++) {
			arr3.push($('#weidu2').children('td').children('b')[j].innerText)
		}
		//console.log(obj_id, arr3)
		$.ajax({
			type: 'GET',
			url: url_ip + '/visual/getfielddata/',
			cache: false,
			data: { obj_id: obj_id, field: JSON.stringify(arr3) },
			datatype: 'json',
			headers: { "Authorization": token },
			beforeSend: function () {
				$('.mu').show();
				$('.loading').show();
				clearInterval(tid)
				var a = 0;
				tid = setInterval(function () {
					a += 22.5
					$('.loading').css('transform', 'rotate(' + a + 'deg)')
				}, 100)
			},
			success: function (data) {
				//console.log(data)
				if (data.status) {
					newdata = data.info;
					//console.log(newdata);
					if (newdata.length <= 200) {
						var Length = newdata.length
					} else {
						var Length = 200;
						alertmsg('温馨提示：此数据数据量过大，为避免浪费您宝贵的时间，此页面只展示前200行示例数据。')
					}
					if (newdata != null) {
						$('.middle_box0').hide();
						$('#middle_box2').show();
						$('#middle_box2 table').empty();
						for (var i = 0; i < Length; i++) {
							var tr = document.createElement('tr');
							if (i == 0) {
								$(tr).addClass('tr_title')
							}
							for (var j = 0; j < newdata[i].length; j++) {
								var td = document.createElement('td');
								var span = document.createElement('span')
								span.innerHTML = newdata[i][j];
								$(td).append(span)
								tr.appendChild(td);
							}
							$('#middle_box2 table').append(tr)
						}
					}
					//console.log($('#middle_box2 table').width())
					$('.weidu').css({ width: $('#middle_box2 table').width() })
				} else {
					alertmsg(data.msg)
				}
			},
			error: function (data) {
				$('.middle_box0').hide();
				$('#middle_box2').show();
				$('#middle_box2 table').empty();
				errFn(data, touch_us);
			},
			complete: function () {
				clearInterval(tid)
				$('.loading').hide();
				$('.mu').hide();
				if ($('.tr_title td').length != 0) {
					var arr = $('.tr_title td')
					//console.log(arr)
					$('#weidu1').empty();
					for (var i = 0; i < arr.length; i++) {
						var td_w = arr[i].offsetWidth;
						$('#weidu2 td')[i].style.width = td_w + 'px';
						var td2 = document.createElement('td');
						$(td2).addClass('label_li')
						td2.style.width = td_w + 'px';
						$('#weidu1').append(td2)
					}
				}
			}
		})
	}
	// 拖拽文字到输入框
	var txt = '';
	var odiv;
	var this_input = '';
	$('.left li').live('mousedown', function (evt) {
		evt = evt || window.event
		if (evt.which == 1) {
			txt = $(this).html();
			odiv = document.createElement('div');
			odiv.innerHTML = txt;
			$(odiv).css({ color: '#fff' });
			$('body').append(odiv);
			// id = $(this)[0].id;
			$(document).live('mousemove', function (evt) {
				evt = evt || window.event;
				var x = evt.clientX + 5;
				var y = evt.clientY - 8;
				$(odiv).css({ color: '#ccc', position: 'absolute', left: x, top: y })
			})
		}
	})
	$('#weidu2').live('mouseenter', function () {
		this_input = this;
	})
	$('#weidu2').live('mouseleave', function () {
		this_input = '';
	});
	var arr1 = [];
	var arr3 = [];
	$(document).live('mouseup', function () {
		$(odiv).remove();
		if (this_input != '' && txt != '') {
			if ($(this_input)[0].id == 'weidu2') {
				var td = document.createElement('td')
				var ob = document.createElement('b');
				var em = document.createElement('em')
				$(ob).html(txt);
				$(ob)[0].msg = 'sum';
				$(ob).append(em)
				$(td).append(ob);
				$(this_input).append(td)
				txt = '';
				get_data();
			}
		}
		odiv = '';
		txt = '';
		id = '';
	})
	// 拖拽标签到输入框
	var txt2 = '';
	var odiv2;
	var this_input2 = '';
	$('.li_hide span').live('mousedown', function (evt) {
		evt = evt || window.event
		if (evt.which == 1) {
			txt2 = $(this).html();
			odiv2 = document.createElement('div');
			odiv2.innerHTML = txt2;
			$(odiv2).css({ color: '#fff' });
			$('body').append(odiv2);
			$(document).live('mousemove', function (evt) {
				evt = evt || window.event;
				var x = evt.clientX + 5;
				var y = evt.clientY - 8;
				$(odiv2).css({ color: '#ccc', position: 'absolute', left: x, top: y, border: '1px solid #ccc', padding: '0 8px', borderRadius: '5px' })
			})
		}
	})
	$('#weidu1>td').live('mouseenter', function () {
		this_input2 = this;
	})
	$('#weidu1>td').live('mouseleave', function () {
		this_input2 = '';
	});
	var arr1 = [];
	var arr3 = [];
	$(document).live('mouseup', function () {
		$(odiv2).remove();
		if (this_input2 != '' && txt2 != '') {
			if ($(this_input2)[0].className == 'label_li') {
				var span = document.createElement('span')
				var em = document.createElement('em')
				$(span).html(txt2)
				$(span).append(em)
				$(this_input2).empty();
				$(this_input2).append(span)
				$(this_input2).css({ background: '#F9FBFA' })
				txt2 = '';
				$('.table_title').html('');
			}
		}
		odiv2 = '';
		txt2 = '';
	})
	// 操作区滚动同步展示区滚动
	$('#middle_box2').scroll(function () {
		var table_l = $(this).scrollLeft()
		//console.log(table_l)
		$('.weidu').css('left', -table_l + 'px')
	})
	// 点击已添加字段选择计算方式
	var suo = false;
	var thisb = '';
	$('#weidu2 b').live('contextmenu', function (evt) {
		thisb = $(this);
		var evt = evt || window.event;
		if (evt.which == 3) {
			var x = evt.clientX + 10;
			var y = evt.clientY + 5;
			$('.sumtype_box').css({ left: x + 'px', top: y + 'px' })
			$('.sumtype_box').show();
			suo = true;
		}
		return false;
	})
	$('.sumtype_box div').click(function () {
		$(thisb)[0].msg = $(this).html();
		$('.sumtype_box').hide();
		return false;
	})
	$(document).click(function () {
		if (suo) {
			$('.sumtype_box').hide();
		}
	})
	// 删除已选字段
	$('#weidu2 em').live('click', function () {
		var index = $(this).parent().parent().index();
		//console.log(index)
		$(this).parent().parent().remove();
		$('#weidu1 div:eq(' + index + ')').remove();
		get_data()
	})
	// 删除已拖标签
	$('#weidu1 em').live('click', function () {
		$(this).parent().parent().css({ background: '' })
		$(this).parent().remove();
		if ($('#weidu1 td span').length == 0) {
			$('.table_title').html('数据可视化配置（指定表格各列选择配置为X轴,Y轴,指标项,标题等可视化项）');
		}
	})
	// 选择文件
	$('.xuanze').click(function () {
		$('.mu').show();
		$('#file_box').show();
	})
	$('.file_close').click(function () {
		$('.mu').hide();
		$('#file_box').hide();
	})
	// 点击图标
	var li_key = '';
	var pic_icon = '';
	$('.right_context ul li').live('click', function (evt) {
		pic_icon = $(this)[0].name
		if (pic_icon == 'boxChart') {
			$('.middle_box0').hide();
			$('#middle_box2').show();
			get_data()
			$('.li_hide').hide();
			li_key = evt.target
		} else {
			if (li_key != evt.target) {
				$('.li_hide').hide();
				$(this).children('.li_hide').show();
				li_key = evt.target
				$('#weidu1 td').empty()
				$('#weidu1 td').css({ background: '' })
			} else {
				$('.li_hide').hide();
				li_key = '';
				$('#weidu1 td').empty()
				$('#weidu1 td').css({ background: '' })
			}
		}
	})
	// 大图
	function big_pic(obj, funct) {
		$('.mu').show();
		$('.bigger_box').show();
		$('.bigger_box div').remove();
		var div2 = document.createElement('div');
		$(div2).css({ width: '100%', height: '100%' })
		$('.bigger_box').append(div2)
		funct(obj, div2);
		$('.bigger_box i').click(function () {
			$('.mu').hide();
			$('.bigger_box').hide();
		})
	}
	// 作图
	$('.plot').live('click', function () {
		$.ajax({
			url: url_ip + '/visual/clicknum/?chart_name=' + pic_icon,
			type: 'GET',
			data: {},
			datatype: 'json',
			headers: { "Authorization": token },
			success: function (data) {
				//console.log(data)
			},
			error: function (data) {
				errFn(data, touch_us);
			}
		})
		var data = [];
		var arr1 = $('#weidu1 td span')
		var data0 = [];
		for (var k = 0; k < arr1.length; k++) {
			var a = arr1[k].innerText.substr(arr1[k].innerText.indexOf('(') + 1, 1)
			data0.push(a)
		}
		data.push(data0)
		for (var j = 0; j < newdata.length; j++) {
			var data1 = [];
			for (var i = 0; i < arr1.length; i++) {
				var index = $(arr1[i]).parent().index();
				data1.push(newdata[j][index])
			}
			data.push(data1)
		}
		//console.log(data, pic_icon)
		// 查找单个元素下标
		function checkindex(arr, value) {
			for (var i = 0; i < arr.length; i++) {
				if (value == arr[i]) {
					return i;
				}
			}
			alertmsg('error：数据中缺少' + "value" + '数值')
		}
		// 查找多个元素下标
		function checkindexs(arr, value) {
			var Arr = [];
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] == value) {
					Arr.push(i)
				}
			}
			if (arr.length != 0) {
				return Arr
			} else {
				alertmsg('error：数据中缺少' + "value" + '数值')
			}
		}
		var obj = {};
		obj.legend = []
		obj.data = []
		var myChart;
		if (myChart != null && myChart != "" && myChart != undefined) {
			myChart.dispose();
		}
		//console.log(pic_icon)
		if (pic_icon == 'pieChart') {
			var x = checkindex(data[0], 'x')
			var y = checkindex(data[0], 'y')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][x])
				obj.data.push({ 'value': data[i][y], 'name': data[i][x] })
			}
			//console.log(obj)
			$('.middle_box0').hide();
			$('#middle_box').show();
			obj.chart_title = "饼图";
			//console.log(obj)
			pieChart(obj, $('#middle_box')[0]);
			$('.big').click(function () {
				big_pic(obj, pieChart);
			})
		} else if (pic_icon == 'lineChart') {
			var x = checkindex(data[0], 'x')
			var y = checkindexs(data[0], 'y')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][x])
			}
			for (var k = 0; k < y.length; k++) {
				var data_c = []
				var ka = y[k]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ka])
				}
				obj.data.push({ name: data[1][ka], value: data_c })
			}
			//console.log(obj)
			$('.middle_box0').hide();
			$('#middle_box15').show();
			obj.chart_title = "折线图";
			lineChart(obj, $('#middle_box15')[0]);
			$('.big').click(function () {
				big_pic(obj, lineChart)
			});
		} else if (pic_icon == 'areaChart') {
			var x = checkindex(data[0], 'x')
			var y = checkindexs(data[0], 'y')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][x])
			}
			for (var k = 0; k < y.length; k++) {
				var data_c = []
				var ka = y[k]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ka])
				}
				obj.data.push({ name: data[1][ka], value: data_c })
			}
			$('.middle_box0').hide();
			$('#middle_box16').show();
			obj.chart_title = "面积图";
			//console.log(obj)
			areaChart(obj, $('#middle_box16')[0]);
			$('.big').click(function () {
				big_pic(obj, areaChart)
			});
		} else if (pic_icon == 'barChart') {
			var x = checkindex(data[0], 'x')
			var y = checkindexs(data[0], 'y')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][x])
			}
			for (var k = 0; k < y.length; k++) {
				var data_c = []
				var ka = y[k]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ka])
				}
				obj.data.push({ name: data[1][ka], value: data_c })
			}
			$('.middle_box0').hide();
			$('#middle_box3').show();
			obj.chart_title = "柱状图";
			//console.log(obj)
			barChart(obj, $('#middle_box3')[0]);
			$('.big').click(function () {
				big_pic(obj, barChart)
			});
		} else if (pic_icon == 'barUpChart') {
			var x = checkindex(data[0], 'x')
			var y = checkindexs(data[0], 'y')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][x])
			}
			for (var k = 0; k < y.length; k++) {
				var data_c = []
				var ka = y[k]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ka])
				}
				obj.data.push({ name: data[1][ka], value: data_c })
			}
			$('.middle_box0').hide();
			$('#middle_box4').show();
			obj.chart_title = "堆叠柱状图";
			//console.log(obj)
			barUpChart(obj, $('#middle_box4')[0]);
			$('.big').click(function () {
				big_pic(obj, barUpChart)
			});
		} else if (pic_icon == 'barUpPercentChart') {
			var x = checkindex(data[0], 'x')
			var y = checkindexs(data[0], 'y')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][x])
			}
			for (var k = 0; k < y.length; k++) {
				var data_c = []
				var ka = y[k]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ka])
				}
				obj.data.push({ name: data[1][ka], value: data_c })
			}
			$('.middle_box0').hide();
			$('#middle_box5').show();
			obj.chart_title = "百分比堆叠柱状图";
			//console.log(obj)
			barUpPercentChart(obj, $('#middle_box5')[0]);
			$('.big').click(function () {
				big_pic(obj, barUpPercentChart)
			});
		} else if (pic_icon == 'scatterChart') {
			var x = checkindex(data[0], 'x')
			var y = checkindex(data[0], 'y')
			var c = checkindex(data[0], 'c')
			obj.legend.push(data[1][c])
			for (var i = 2; i < data.length; i++) {
				obj.data.push([data[i][x], data[i][y], data[i][c]])
			}
			$('.middle_box0').hide();
			$('#middle_box6').show();
			obj.chart_title = "散点图";
			//console.log(obj)
			scatterChart2(obj, $('#middle_box6')[0]);
			$('.big').click(function () {
				big_pic(obj, scatterChart2)
			});
		} else if (pic_icon == 'barLineChart') {
			var x = checkindex(data[0], 'x')
			var b = checkindexs(data[0], 'b')
			var l = checkindexs(data[0], 'l')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][x])
			}
			for (var k = 0; k < b.length; k++) {
				var data_c = []
				var ka = b[k]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ka])
				}
				obj.data.push({ name: data[1][ka], value: data_c })
			}
			obj.data0 = [];
			for (var j = 0; j < l.length; j++) {
				var data_c = []
				var ja = l[j]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ja])
				}
				obj.data0.push({ name: data[1][ja], value: data_c })
			}
			$('.middle_box0').hide();
			$('#middle_box7').show();
			obj.chart_title = "折柱图";
			//console.log(obj)
			barLineChart(obj, $('#middle_box7')[0]);
			$('.big').click(function () {
				big_pic(obj, barLineChart)
			});
		} else if (pic_icon == 'stripChart') {
			var x = checkindexs(data[0], 'x')
			var y = checkindex(data[0], 'y')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][y])
			}
			for (var k = 0; k < x.length; k++) {
				var data_c = []
				var ka = x[k]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ka])
				}
				obj.data.push({ name: data[1][ka], value: data_c })
			}
			$('.middle_box0').hide();
			$('#middle_box8').show();
			obj.chart_title = "条状图";
			//console.log(obj)
			stripChart(obj, $('#middle_box8')[0]);
			$('.big').click(function () {
				big_pic(obj, stripChart)
			});
		} else if (pic_icon == 'stripUpChart') {
			var x = checkindexs(data[0], 'x')
			var y = checkindex(data[0], 'y')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][y])
			}
			for (var k = 0; k < x.length; k++) {
				var data_c = []
				var ka = x[k]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ka])
				}
				obj.data.push({ name: data[1][ka], value: data_c })
			}
			$('.middle_box0').hide();
			$('#middle_box9').show();
			obj.chart_title = "堆叠条状图";
			console.log(obj)
			stripUpChart(obj, $('#middle_box9')[0]);
			$('.big').click(function () {
				big_pic(obj, stripUpChart)
			});
		} else if (pic_icon == 'stripUpPercentChart') {
			var x = checkindexs(data[0], 'x')
			var y = checkindex(data[0], 'y')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][y])
			}
			for (var k = 0; k < x.length; k++) {
				var data_c = []
				var ka = x[k]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ka])
				}
				obj.data.push({ name: data[1][ka], value: data_c })
			}
			$('.middle_box0').hide();
			$('#middle_box10').show();
			obj.chart_title = "百分比条状图";
			//console.log(obj)
			stripUpPercentChart(obj, $('#middle_box10')[0]);
			$('.big').click(function () {
				big_pic(obj, stripUpPercentChart)
			});
		} else if (pic_icon == 'radarChart') {
			var c = checkindex(data[0], 'c')
			var p = checkindexs(data[0], 'p')
			for (var k = 0; k < p.length; k++) {
				var data_c = []
				var ka = p[k]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ka])
				}
				obj.data.push({ name: data[1][ka], value: data_c, label: { normal: { show: true } } })
			}
			for (var k = 2; k < data.length; k++) {
				obj.legend.push(data[k][c])
			}
			$('.middle_box0').hide();
			$('#middle_box11').show();
			obj.chart_title = "雷达图";
			//console.log(data)
			//console.log(obj)
			radarChart(obj, $('#middle_box11')[0]);
			$('.big').click(function () {
				big_pic(obj, radarChart)
			});
		} else if (pic_icon == 'bubbleChart') {
			var x = checkindex(data[0], 'x')
			var y = checkindex(data[0], 'y')
			var r = checkindex(data[0], 'r')
			var c = checkindex(data[0], 'c')
			obj.legend.push(data[1][c])
			for (var i = 2; i < data.length; i++) {
				obj.data.push([data[i][x], data[i][y], data[i][r], data[i][c]])
			}
			$('.middle_box0').hide();
			$('#middle_box12').show();
			obj.chart_title = "气泡图";
			//console.log(obj)
			bubbleChart(obj, $('#middle_box12')[0]);
			$('.big').click(function () {
				big_pic(obj, bubbleChart)
			});
		} else if (pic_icon == 'heatMapChart') {
			var x = checkindex(data[0], 'x')
			var y = checkindexs(data[0], 'y')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][x])
			}
			for (var k = 0; k < y.length; k++) {
				var data_c = []
				var ka = y[k]
				for (var i = 2; i < data.length; i++) {
					data_c.push(data[i][ka])
				}
				obj.data.push({ name: data[1][ka], value: data_c })
			}
			$('.middle_box0').hide();
			$('#middle_box13').show();
			obj.chart_title = "热力图";
			//console.log(obj)
			heatMapChart(obj, $('#middle_box13')[0]);
			$('.big').click(function () {
				big_pic(obj, heatMapChart)
			});
		} else if (pic_icon == 'funnelChart') {
			var x = checkindex(data[0], 'x')
			var y = checkindex(data[0], 'y')
			for (var i = 2; i < data.length; i++) {
				obj.legend.push(data[i][x])
				obj.data.push({ 'value': data[i][y], 'name': data[i][x] })
			}
			$('.middle_box0').hide();
			$('#middle_box14').show();
			obj.chart_title = "漏斗图";
			//console.log(obj)
			funnelChart(obj, $('#middle_box14')[0]);
			$('.big').click(function () {
				big_pic(obj, funnelChart)
			});
		} else if (pic_icon == 'boxChart') {
		}
	})
	// msgbox信息栏
	var msgbox_toggle = true;
	$('.msgbox2').css('top', '')
	$('.msgbox2 div img:eq(0)').click(function () {
		if (msgbox_toggle) {
			$(this).css('transform', 'rotate(180deg)')
			$('.msgbox2').css({height:'144px',zIndex:99,overflow:'auto'})
			$('.msgbox3').css({bottom:'auto',top:'0px'})
		} else {
			$(this).css('transform', 'rotate(0deg)')
			$('.msgbox2').css({height:'50px',zIndex:0,overflow:'hidden'})
			$('.msgbox3').css({bottom:'0px',top:'auto'})
		}
		msgbox_toggle = !msgbox_toggle
	})
	$('.msgbox2 div img:eq(1)').live('click', function () {
		$('.msgbox2 p').remove();
	})
	// 联系我们
	var touch_us = '<a href="feedback.html">请联系我们，反馈这个错误</a>';
	// $(touch_us).html('请联系我们，反馈这个错误')
	// $(touch_us).attr({ href: 'feedback.html',  })
	function alertmsg(msg, tag) {
		var myTime = new Date();
		var h = myTime.getHours() < 10 ? '0' + myTime.getHours() : myTime.getHours();
		var m = myTime.getMinutes() < 10 ? '0' + myTime.getMinutes() : myTime.getMinutes();
		var s = myTime.getSeconds() < 10 ? '0' + myTime.getSeconds() : myTime.getSeconds();
		var nowtime = h + ':' + m + ':' + s
		var p = document.createElement('p')
		p.innerHTML = nowtime + '&nbsp;&nbsp;&nbsp;&nbsp;' + msg;
		$(p).append(tag)
		$('.msgbox3').append(p)
		$('.msgbox3').height($('.msgbox3')[0].scrollHeight)
	}
})