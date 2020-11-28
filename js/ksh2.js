$(function () {
/*获取图列表*/
	$.ajax({
		type:'GET',
		url:url_ip + '/visual/sortchart/',
		cache:false,
		data:{},
		datatype:'json',
		headers:{"Authorization":token},
		success:function (data) {
			//console.log(data)
			if (data.status) {
				for (var i = 0; i < data.sort.length; i++) {
					for (var j = 0; j < data.labels.length; j++) {
						if (data.labels[j].chart_name == data.sort[i].chart_name) {
							$('.more_pic').before('<li id="'+data.sort[i].chart_name+'"><img src="img/'+data.sort[i].chart_name+'.png" title="'+data.sort[i].name+'"></li>')
							$('#'+data.sort[i].chart_name)[0].parameter = data.labels[j].args
							$('#'+data.sort[i].chart_name)[0].argument = data.labels[j].explain
						}
					}
				}
				$('.select_pic li:eq(0)').click()
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
		}
	})
/*选择图类型*/
	$('.select_pic ul li').live('click',function () {
		$('.select_pic ul li').removeClass('on')
		$(this).addClass('on')
		var title = $(this).children('img').attr('title')
		var id = $(this)[0].id
		var parameter = $(this)[0].parameter
		var argument = $(this)[0].argument
		$('.dragBox span').remove()
		$('.biaoji span').remove()
		biaojiShow()
		$('.canvas>img').click()
		if($('#canvas_box')[0]) {
			$('#canvas_box').remove()
		}
		$('.canvas').append('<div id="canvas_box"></div>')
		// $('.canvas').append('<div id="canvas_box"></div>')
		$('.select_pic h4 span').html(title)
		$('.select_pic p').html(argument)
		$('.canvas')[0].type = id
		$('.canvas')[0].parameter = parameter
		$('.biaoji table tbody tr').empty()
		for (var i = 0; i < parameter.length; i++) {
			if (parameter[i] != '行' && parameter[i] != '列') {
				$('.biaoji table tbody tr').append('<td><img src="img/'+parameter[i]+'.png">'+parameter[i]+'</td>')
			}
		}
	})
/*默认显示第一个数据*/
	function promiseA () {
		var p = new Promise(function (resolve,reject) {
			$.ajax({
				type:'GET',
				url:url_ip + '/model/',
				cache:false,
				data:{},
				datatype:"json",
				headers:{"Authorization":token},
				success:function (data) {
					for (var i = 0; i < data.length; i++) {
						$('.dataBox ul').append('<li data-id="'+data[i].obj_id+'">'+data[i].file_name+'</li>')
					}
					$('.canvas').append('<div style="' +
						'height:80px;' +
						'width:200px;' +
						'font-size:30px;' +
						'padding-left:40%;' +
						'padding-top:200px;' +
						// 'color: #1a9cea' +
						'color: #333' +
						'", class="tishi">请选择文件</div>')
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
		            }
				}
			})
		})
		return p
	}
	promiseA().then(function (data) {
		prob(data)
	})
	function prob (data) {
		$('.field_box dd').remove()
		$('.tishi').hide()
		var detail = data.data
		// console.log(data)
		$('.field_box')[0].detail = detail
		var text = data.name
		$('.field_box h2').html(text)
		if (detail[1]) {
			for (var i = 0; i < detail[1].length; i++) {
				// console.log(detail[1][i])
				// $('.field_box .weidu').append('<dd data-index="'+i+'">'+detail[0][i]+'</dd>')
				if (isNaN(Number(detail[1][i]))) {
					$('.field_box .weidu').append('<dd data-index="'+i+'">'+detail[0][i]+'</dd>')
				} else {
					$('.field_box .duliang').append('<dd data-index="'+i+'">'+detail[0][i]+'</dd>')
				}
			}	
		} else {
			alertmsg('当前中间文件未实例化,重新确定文件即可进行可视化')
		}
		// var allHeight = $('.field_box')[0].offsetHeight
		// var height = (allHeight - 76) / 2
		// if ($('.field_box .weidu')[0].offsetHeight <= height) {
		// 	var oHeight = allHeight - $('.field_box .weidu')[0].offsetHeight - 76
		// 	// $('.field_box .duliang').height(oHeight + 'px')
		// } else {
		// 	if ($('.field_box .duliang')[0].offsetHeight <= height) {
		// 		var oHeight = allHeight - $('.field_box .duliang')[0].offsetHeight - 76
		// 		$('.field_box .weidu').height(oHeight + 'px')
		// 	} else {
		// 		$('.field_box .duliang').height(height + 'px')
		// 		$('.field_box .weidu').height(height + 'px')
		// 	}
		// }
	}
/*行列等拖拽区鼠标移入事件*/
	$('.makeEchars li>div').hover(function () {
		if ($(this).children('span')[0]) {
			$(this).addClass('on')
		}
	},function () {
		$(this).removeClass('on')
	})
/*标记框判断*/
	function biaojiShow () {
		if ($('.biaoji').children('span')[0]) {
			$('.biaoji table').hide()
			$('.biaoji span').show()
		} else {
			$('.biaoji table').show()
		}
	}
/*拖拽度量、维度到行列*/
	$('.field_box dd').live('mousedown',function (evt) {
		if(evt.which === 1) {
			var evt = evt || window.event
			var text = $(this).html()
			var type = $(this).parent()[0].className
			var index = $(this).attr('data-index') || 0
			var left = evt.target.offsetLeft
			var top = evt.target.offsetTop
			$('.echars_box').append('<div class="shadow_div" data-type="'+type+'" data-index="'+index+'" style="left:'+left+'px;top:'+top+'px;">'+text+'</div>')
			$(document).live('mousemove',function (evt) {
				var evt = evt || window.event
				var left = evt.clientX + 1
				var top = evt.clientY - 99
				$('.shadow_div').css({left:left + 'px',top:top + 'px'})
			})
			$('.biaoji span').hide()
			$('.biaoji table').show()
		}
	})
	$(document).mouseup(function () {
		$('.shadow_div').remove()
		$('.filter_box').hide()
		$('.filter_box2').hide()
		biaojiShow();
	})
	// $('.dragBox,.weidu,.duliang').mouseenter(function () {
	// 	if ($('.shadow_div')[0]) {
	// 		$('.shadow_div').addClass('on')
	// 	}
	// })
	$('.dragBox').mouseenter(function () {
		if ($('.shadow_div')[0]) {
			$('.shadow_div').addClass('on')
		}
	})
	function findEle (p,txt) {
		for (var i = 0; i < p.length; i++) {
			if (p[i].textContent == txt) {
				return p[i]
			}
		}
		return false
	}
	$('.dragBox').mouseup(function () {
		if ($('.shadow_div.on')[0]) {
			var text = $('.shadow_div.on').html()
			var type = $('.shadow_div.on').attr('data-type')
			var index = $('.shadow_div.on').attr('data-index')
			if (findEle($(this).children('span'),text)) {
				$(findEle($(this).children('span'),text)).remove()
			}
			$(this).append('<span data-index="'+index+'" data-type="'+type+'">'+text+'<img src="img/remove2.png" class="close"></span>')
			$('.shadow_div').remove()
			biaojiShow();
			var left = $(this).parent()[0].offsetLeft + $(this)[0].offsetLeft + $(this).children('span:contains("'+text+'")')[0].offsetLeft + 42
			var top = $(this).parent()[0].offsetTop + $(this)[0].offsetTop + $(this).children('span:contains("'+text+'")')[0].offsetTop + 22
			var maxLeft = $(window).width() - 250
			if (left >= maxLeft) {
				left = left - 250
			}
			if ($(this)[0].id == 'filter') {
				if (type == 'weidu') {
					var detail = $('.field_box')[0].detail
					$('.filter_box dl>div').empty()
					for (var i = 0; i < detail.length; i++) {
						$('.filter_box dl>div').append('<dd><input type="checkbox" id="'+i+'"><label>'+detail[i][index]+'</label></dd>')
					}
					$('.filter_box').css({left:left+'px',top:top+'px'})
					$('.filter_box').show()
					$('.filter_box2').hide()
				} else {
					$('.filter_box2').css({left:left+'px',top:top+'px'})
					$('.filter_box').hide()
					$('.filter_box2').show()
				}
			}
		}
		var type = $('.canvas')[0].type
		var detail = $('.field_box')[0].detail
		plot(type,detail,$('#canvas_box')[0])
		return false;
	})
	// 维度，度量拖拽事件
	// $('.weidu,.duliang').mouseup(function() {
	// 	var text = $('.shadow_div.on').html()
	// 	if(!text) {
	// 		return;
	// 	}
	// 	var type = $('.shadow_div.on').attr('data-type')
	// 	var index = $('.shadow_div.on').attr('data-index')
	// 	if (findEle($(this).children('dd'),text)) {
	// 		$(findEle($(this).children('dd'),text)).remove()
	// 	}
	// 	$(this).append('<dd data-index="'+index+'" data-type="'+type+'">'+text+'</dd>')
	// 	if($(this)[0].className === 'weidu') {
	// 		$(findEle($('.duliang').children('dd'),text)).remove()
	// 	}
	// 	else {
	// 		$(findEle($('.weidu').children('dd'),text)).remove()
	// 	}
	// 	$('.shadow_div').remove()
	// })
	// 阻止右击弹框默认事件
	$('.weidu,.duliang').contextmenu(function(e) {
		e.preventDefault();
	})
	// 右击转化维度、度量
	$('.weidu dd,.duliang dd').live('click',function(e){
		if($('.field_box .transition_div')[0]) {
			$('.transition_div').remove();
		}
		var text = $(this).html();
		var index = $(this).attr('data-index') || 0
		var type = $(this).parent()[0].className
		var left = e.target.offsetLeft + 126;
		var top = e.target.offsetTop
		$('.field_box').append(`
			<div class="transition_div" style="left: ${left}px; top: ${top}px" data-type="${type}">
				${type==='weidu'? '转化为度量' : '转化为维度'}
				<dd data-index="${index}">${text}</dd>
			</div>
		`)
	})
	$('body').on('click', function(e) {
		if(e.target.className === 'transition_div') {
			return;
		}
		else {
			if($('.field_box .transition_div')[0]) {
				$('.transition_div').remove();
			}
		}
	})
	// 点击转化事件
	$('.field_box .transition_div').live('click', function() {
		var text = $(this).children('dd').text();
		var replaceDom = ($(this).children('dd')[0]);
		var type = $(this).attr('data-type');
		switch (type) {
			case 'duliang':
				if (findEle($('.weidu').children('dd'),text)) {
					$(findEle($('.weidu').children('dd'),text)).remove();
				}
				$(findEle($('.duliang').children('dd'),text)).remove();
				$('.weidu').append(replaceDom)
				break;
			case 'weidu':
				if (findEle($('.duliang').children('dd'),text)) {
					$(findEle($('.duliang').children('dd'),text)).remove();
				}
				$(findEle($('.weidu').children('dd'),text)).remove();
				$('.duliang').append(replaceDom);
				break;
		}
		$('.transition_div').remove();
	})
	$('.biaoji td').live('mouseenter',function () {
		if ($('.shadow_div')[0]) {
			$('.shadow_div').addClass('on')
		}
	})
	$('.biaoji td').live('mouseup',function () {
		if ($('.shadow_div.on')[0]) {
			var text = $('.shadow_div.on').html()
			var type = $(this).index() + 1
			var index = $('.shadow_div.on').attr('data-index')
			var img = $(this).children('img').attr('src').substr(0,$(this).children('img').attr('src').indexOf('.'))
			if ($('.biaoji span[data-type="'+type+'"]')) {
				$('.biaoji span[data-type="'+type+'"]').remove()
			}
			$('.biaoji').append('<span data-index="'+index+'" data-type="'+type+'"><img src="'+img+'0.png" class="img">'+text+'<img src="img/remove2.png" class="close"></span>')
		}
		var type = $('.canvas')[0].type
		var detail = $('.field_box')[0].detail
		plot(type,detail,$('#canvas_box')[0])
	})
	$('.makeEchars li div').mouseleave(function () {
		$('.shadow_div').removeClass('on')
	})
/*筛选框li点击事件*/
	$('.filter_box>ul>li').click(function () {
		$('.filter_box>div').hide()
		if ($(this).children('span').html() == '常规') {
			$('.filter_cg').show()
		} else {
			$('.filter_tpf').show()
		}
		$('.filter_box>ul>li').removeClass('on')
		$(this).addClass('on')
	})
/*筛选框单选按钮监控事件*/
	$('.filter_cg input[name="cg"]').bind('propertychange change',function () {
		if ($('.filter_cg input[name="cg"]:checked').val() == 'select') {
			$('.filter_cg dl').show()
			$('.filter_cg .filter_search').hide()
		} else if ($('.filter_cg input[name="cg"]:checked').val() == 'self') {
			$('.filter_cg .filter_search').show()
			$('.filter_cg dl').hide()
		} else {
			$('.filter_cg dl').hide()
			$('.filter_cg .filter_search').hide()
		}
	})
/*取消筛选框的冒泡事件*/
	$('.filter_box').mouseup(function () {
		return false
	})
	$('.filter_box2').mouseup(function () {
		return false
	})
/*删除当前已选拖拽*/
	$('img.close').live('click',function () {
		$(this).parent().remove()
		biaojiShow()
		var type = $('.canvas')[0].type
		var detail = $('.field_box')[0].detail
		plot(type,detail,$('#canvas_box')[0])
	})
/*删除同类已选拖拽*/
	$('.makeEchars li>div>img').click(function () {
		$(this).parent().children('span').remove()
		biaojiShow()
	})
	$('.makeEchars li>div>img').hover(function () {
		$(this).attr('src','img/empty2.png')
	},function () {
		$(this).attr('src','img/empty.png')
	})
/*作图*/
	function plot (chartType,detail,box) {
		$('#weidu2').empty()
		$('#middle_box2').empty()
		var myChart;
	    if (myChart != null && myChart != "" && myChart != undefined) {  
	        myChart.dispose();  
	    }
		var obj = {};
		obj.legend = [];
		obj.data = [];
		if (chartType == 'pieChart') {
			obj.chart_title = "饼图";
			var color = $('.biaoji span[data-type="1"]').attr('data-index')
			var jiaodu= $('.biaoji span[data-type="2"]').attr('data-index')
			if (color && jiaodu) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][color])
					obj.data.push({'value':detail[i][jiaodu],'name':detail[i][color]})
				}
				pieChart(obj,box);
			}
		} else if (chartType == 'heatMapChart') {
			var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
			var hangIndex = [];
			for (var i = 0; i < hangArr.length; i++) {
				hangIndex.push(hangArr[i].getAttribute('data-index'))
			}
			var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
			if (lieIndex && hangIndex.length > 0) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][lieIndex])
				}
				for (var j = 0; j < hangIndex.length; j++) {
					var k = hangIndex[j]
					//console.log(k)
					var data = []
					for (var i = 1; i < detail.length; i++) {
						data.push(detail[i][k])
					}
					obj.data.push({'name':detail[0][k],'value':data})
				}
				obj.chart_title = '笛卡尔坐标系热力图'
				//console.log(obj)
				heatMapChart(obj,box);
			}
		} else if (chartType == 'scatterChart') {
			// var fenlei = $('.biaoji span[data-type="1"]').attr('data-index')
			// var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index') 
			// var hangIndex = $('.makeEchars ul li:eq(1) .dragBox span').attr('data-index')
			// if (fenlei && lieIndex && hangIndex) {
			// 	obj.legend.push(detail[0][fenlei])
			// 	for (var i = 0; i < detail.length; i++) {
			// 		obj.data.push([detail[i][lieIndex],detail[i][hangIndex],detail[i][fenlei]])
			// 	}
			// 	obj.chart_title = '散点图'
			// 	scatterChart2(obj,box)
			// }
			var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index') 
			var hangIndex = $('.makeEchars ul li:eq(1) .dragBox span').attr('data-index')
			if (lieIndex && hangIndex) {
				obj.legend.push(detail[0][fenlei])
				for (var i = 0; i < detail.length; i++) {
					obj.data.push([detail[i][lieIndex],detail[i][hangIndex]])
				}
				obj.chart_title = '散点图'
				scatterChart2(obj,box)
			}
		} else if (chartType == 'barChart') {
			var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
			var hangIndex = [];
			for (var i = 0; i < hangArr.length; i++) {
				hangIndex.push(hangArr[i].getAttribute('data-index'))
			}
			var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
			if (lieIndex && hangIndex.length > 0) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][lieIndex])
				}
				for (var j = 0; j < hangIndex.length; j++) {
					var k = hangIndex[j]
					//console.log(k)
					var data = []
					for (var i = 1; i < detail.length; i++) {
						data.push(detail[i][k])
					}
					obj.data.push({'name':detail[0][k],'value':data})
				}
				obj.chart_title = '柱状图'
				//console.log(obj)
				barChart(obj,box);
			}
		} else if (chartType == 'bubbleChart') {
			var fenlei = $('.biaoji span[data-type="2"]').attr('data-index')
			var radius = $('.biaoji span[data-type="1"]').attr('data-index')
			var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index') 
			var hangIndex = $('.makeEchars ul li:eq(1) .dragBox span').attr('data-index')
			if (fenlei && radius && lieIndex && hangIndex) {
				obj.legend.push(detail[0][fenlei])
				for (var i = 1; i < detail.length; i++) {
					obj.data.push([detail[i][lieIndex],detail[i][hangIndex],detail[i][radius],detail[i][fenlei]])
				}
				obj.chart_title = '气泡图'
				//console.log(obj)
				bubbleChart(obj,box);
			}
		} else if (chartType == 'boxChart') {
			var lieArr = $('.makeEchars ul li:eq(0) .dragBox span')
			var lieIndex = [];
			for (var i = 0; i < lieArr.length; i++) {
				lieIndex.push(lieArr[i].getAttribute('data-index'))
			}
			$('#canvas_box>div').remove()
			$('#canvas_box').append('<div style="width:100%;height:100%;overflow:auto"><table></table></div>')
			for (var i = 0; i < detail.length; i++) {
				var tr = document.createElement('tr')
				for (var j = 0; j < lieIndex.length; j++) {
					var k = lieIndex[j]
					var td = document.createElement('td')
					$(td).html(detail[i][k])
					$(tr).append(td)
				}
				$('#canvas_box table').append(tr)
			}
		} else if (chartType == 'stripUpPercentChart') {
			var lieArr = $('.makeEchars ul li:eq(0) .dragBox span')
			var lieIndex = [];
			for (var i = 0; i < lieArr.length; i++) {
				lieIndex.push(lieArr[i].getAttribute('data-index'))
			}
			var hangIndex = $('.makeEchars ul li:eq(1) .dragBox span').attr('data-index')
			if (hangIndex && lieIndex.length > 0) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][hangIndex])
				}
				for (var j = 0; j < lieIndex.length; j++) {
					var k = lieIndex[j]
					var data = []
					for (var i = 1; i < detail.length; i++) {
						data.push(detail[i][k])
					}
					obj.data.push({'name':detail[0][k],'value':data})
				}
				obj.chart_title = '百分比堆叠条状图'
				// console.log(obj)
				stripUpPercentChart(obj,box);
			}
		} else if (chartType == 'lineChart') {
			var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
			var hangIndex = [];
			for (var i = 0; i < hangArr.length; i++) {
				hangIndex.push(hangArr[i].getAttribute('data-index'))
			}
			var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
			if (lieIndex && hangIndex.length > 0) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][lieIndex])
				}
				for (var j = 0; j < hangIndex.length; j++) {
					var k = hangIndex[j]
					var data = []
					for (var i = 1; i < detail.length; i++) {
						data.push(detail[i][k])
					}
					obj.data.push({'name':detail[0][k],'value':data})
				}
				obj.chart_title = '折线图'
				//console.log(obj)
				lineChart(obj,box);
			}
		} else if (chartType == 'areaChart') {
			var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
			var hangIndex = [];
			for (var i = 0; i < hangArr.length; i++) {
				hangIndex.push(hangArr[i].getAttribute('data-index'))
			}
			var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
			if (lieIndex && hangIndex.length > 0) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][lieIndex])
				}
				for (var j = 0; j < hangIndex.length; j++) {
					var k = hangIndex[j]
					var data = []
					for (var i = 1; i < detail.length; i++) {
						data.push(detail[i][k])
					}
					obj.data.push({'name':detail[0][k],'value':data})
				}
				obj.chart_title = '面积图'
				//console.log(obj)
				areaChart(obj,box);
			}
		} else if (chartType == 'barUpChart') {
			var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
			var hangIndex = [];
			for (var i = 0; i < hangArr.length; i++) {
				hangIndex.push(hangArr[i].getAttribute('data-index'))
			}
			var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
			if (lieIndex && hangIndex.length > 0) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][lieIndex])
				}
				for (var j = 0; j < hangIndex.length; j++) {
					var k = hangIndex[j]
					var data = []
					for (var i = 1; i < detail.length; i++) {
						data.push(detail[i][k])
					}
					obj.data.push({'name':detail[0][k],'value':data})
				}
				obj.chart_title = '堆叠柱状图'
				//console.log(obj)
				barUpChart(obj,box);
			}
		} else if (chartType == 'barUpPercentChart') {
			var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
			var hangIndex = [];
			for (var i = 0; i < hangArr.length; i++) {
				hangIndex.push(hangArr[i].getAttribute('data-index'))
			}
			var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
			if (lieIndex && hangIndex.length > 0) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][lieIndex])
				}
				for (var j = 0; j < hangIndex.length; j++) {
					var k = hangIndex[j]
					var data = []
					for (var i = 1; i < detail.length; i++) {
						data.push(detail[i][k])
					}
					obj.data.push({'name':detail[0][k],'value':data})
				}
				obj.chart_title = '百分比堆叠柱状图'
				// console.log(obj)
				barUpPercentChart(obj,box);
			}
		} else if (chartType == 'stripChart') {
			var lieArr = $('.makeEchars ul li:eq(0) .dragBox span')
			var lieIndex = [];
			for (var i = 0; i < lieArr.length; i++) {
				lieIndex.push(lieArr[i].getAttribute('data-index'))
			}
			var hangIndex = $('.makeEchars ul li:eq(1) .dragBox span').attr('data-index')
			if (hangIndex && lieIndex.length > 0) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][hangIndex])
				}
				for (var j = 0; j < lieIndex.length; j++) {
					var k = lieIndex[j]
					var data = []
					for (var i = 1; i < detail.length; i++) {
						data.push(detail[i][k])
					}
					obj.data.push({'name':detail[0][k],'value':data})
				}
				obj.chart_title = '条状图'
				//console.log(obj)
				stripChart(obj,box);
			}
		} else if (chartType == 'stripUpChart') {
			var lieArr = $('.makeEchars ul li:eq(0) .dragBox span')
			var lieIndex = [];
			for (var i = 0; i < lieArr.length; i++) {
				lieIndex.push(lieArr[i].getAttribute('data-index'))
			}
			var hangIndex = $('.makeEchars ul li:eq(1) .dragBox span').attr('data-index')
			if (hangIndex && lieIndex.length > 0) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][hangIndex])
				}
				for (var j = 0; j < lieIndex.length; j++) {
					var k = lieIndex[j]
					var data = []
					for (var i = 1; i < detail.length; i++) {
						data.push(detail[i][k])
					}
					obj.data.push({'name':detail[0][k],'value':data})
				}
				obj.chart_title = '堆叠条状图'
				// console.log(obj)
				stripUpChart(obj,box);
			}
		} else if (chartType == 'barLineChart') {
			obj.data0 = [];
			var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
			var hangIndex = [];
			for (var i = 0; i < hangArr.length; i++) {
				hangIndex.push(hangArr[i].getAttribute('data-index'))
			}
			var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
			var zhexian = $('.biaoji span[data-type="1"]').attr('data-index')
			if (zhexian && lieIndex && hangIndex.length > 0) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][lieIndex])
				}
				for (var j = 0; j < hangIndex.length; j++) {
					var k = hangIndex[j]
					var data = []
					for (var i = 1; i < detail.length; i++) {
						data.push(detail[i][k])
					}
					obj.data.push({'name':detail[0][k],'value':data})
				}
				var data2 = []
				for (var i = 1; i < detail.length; i++) {
					data2.push(detail[i][zhexian])
				}
				obj.data0.push({'name':detail[0][zhexian],'value':data2})
				obj.chart_title = '折柱图'
				//console.log(obj)
				barLineChart(obj,box);
			}
		} else if (chartType == 'radarChart') {
			var fenlei = $('.biaoji span[data-type="1"]').attr('data-index')
			var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
			var hangIndex = [];
			// for (var i = 0; i < hangArr.length; i++) {
			// 	hangIndex.push(hangArr[i].getAttribute('data-index'))
			// }
			for (var i = 0; i < hangArr.length; i++) {
                hangIndex.push(hangArr[i].getAttribute('data-index'))
            }
			// if (fenlei && hangIndex.length > 0) {
			// 	for (var i = 1; i < detail.length; i++) {
			// 		obj.legend.push(detail[i][fenlei])
			// 	}
			// 	for (var j = 0; j < hangIndex.length; j++) {
			// 		var k = hangIndex[j]
			// 		var data = []
			// 		for (var i = 1; i < detail.length; i++) {
			// 			data.push(detail[i][k])
			// 		}
			// 		obj.data.push({'name':detail[0][k],'value':data})
			// 	}
			// 	obj.chart_title = '雷达图'
			// 	//console.log(obj)
			// 	radarChart(obj,box);
			// }
			if (fenlei && hangIndex.length > 0) {
                for (var i = 0; i < hangIndex.length; i++) {
                    obj.legend.push(detail[0][Number(hangIndex[i])])
                }
                for (let i = 1; i < detail.length; i++) {
                    obj.data.push({'name': detail[i][0], 'value': detail[i].slice(1)})
                }
                obj.chart_title = '雷达图'
                console.log(obj)
                radarChart(obj, box);
            }
		} else if (chartType == 'funnelChart') {
			var color = $('.biaoji span[data-type="1"]').attr('data-index')
			var daxiao = $('.biaoji span[data-type="2"]').attr('data-index')
			if (color && daxiao) {
				for (var i = 1; i < detail.length; i++) {
					obj.legend.push(detail[i][color])
					obj.data.push({'name':detail[i][color],'value':detail[i][daxiao]})
				}
				obj.chart_title = '漏斗图'
				//console.log(obj)
				funnelChart(obj,box);
			} else {
				//console.log(222)
			}
		}
		// $('.makeEchars .btn div:eq(1)')[0].data = obj
	}
/*清空当前图*/
	$('.canvas>img').click(function () {
		$('.canvas #canvas_box').remove()
	})
/*放大*/
	var parW = $('.echars_box').outerWidth();
	var parH = $('.echars_box').outerHeight();
	//console.log(parW,parH)
	var poW = parW / 2
	var poH = parH / 2
	$('.makeEchars .btn div:eq(0)').click(function () {
		$('.bigChart').addClass('on')
		$('.bigChart>div').remove()
		$('.bigChart i').before('<div></div>')
		setTimeout(function () {
			var type = $('.canvas')[0].type
			var detail = $('.field_box')[0].detail
			plot(type,detail,$('.bigChart>div')[0])
		},200)
	})
/*缩小*/
	$('.bigChart i').click(function () {
		$('.bigChart').removeClass('on')
	})
/*保存*/
	$('.makeEchars .btn>div:eq(1)').click(function () {
		$('.holdBox input').val('')
		$('.holdBox').fadeIn()
	})
/*保存弹窗确定按钮*/
	$('.holdSure').click(function () {
		if ($('.holdBox input').val() == '') {
			alertmsg('文件名不能为空',0)
		} else {
			var name = $('.holdBox input').val()
			var type = $('.canvas')[0].type
			var data = JSON.stringify($('.makeEchars .btn>div:eq(1)')[0].data)
			//console.log($('.makeEchars .btn>div:eq(1)'))
			$('#canvas_box').addClass('on')
			$('.historyChars dl').append("<dd data-type='"+type+"' data-obj='"+data+"'><span>"+name+"</span><img src='img/移除.png'></dd>")
			$('.holdBox').hide()
		}
	})
/*已存历史作图打开*/
	$('.historyChars dd').live('dblclick',function () {		
		if ($('#canvas_box.on')[0]) {
			drawChart($(this))
		} else {
			if ($('#canvas_box>div')[0]) {
				var r = confirm('检测到当前有未保存的图表,是否对其保存？')
				if (r) {
					$('.makeEchars .btn>div:eq(1)').click()
					var loop;
					var that = $(this)
					clearInterval(loop)
					loop = setInterval(function () {
						//console.log(1)
						if ($('#canvas_box.on')[0]) {
							clearInterval(loop);
							drawChart(that)
						}
					},100)
				} else {
					drawChart($(this))
				}	
			} else {
				drawChart($(this))
			}
		}
	})
/*已保存历史作图还原封装*/
	function drawChart (obj) {
		var type = obj.attr('data-type')
		$('#'+type).click()
		var data_obj = obj.attr('data-obj')
		var data = JSON.parse(data_obj)
		var name = obj.children('span').html()
		$('.makeEchars .btn>div:eq(1)')[0].data = data
		data.chart_title = name
		window[type](data,$('#canvas_box')[0])
		$('#canvas_box').addClass('on')
	}
/*删除历史作图*/
	$('.historyChars dd img').live('click',function () {
		var s = confirm('确定删除当前历史记录吗？删除后不可恢复。')
		if (s) {
			$(this).parent().remove()
		}
		return false;
	})
/*关闭保存*/
	$('.holdBox_center i').click(function () {
		$('.holdBox').fadeOut()
	})
	$('.holdNo').click(function () {
		$('.holdBox').fadeOut()
	})
/*关闭选择文件*/
	$('.dataBox h3 i').click(function () {
		$('.dataBox').hide()
	})
/*打开选择文件*/
	$('.field_box .imgspan').click(function () {
		$('.dataBox').show()
	})
/*选择文件列表点击*/
	$('.dataBox ul li').live('click',function () {
		var id = $(this).attr('data-id')
		var txt = $(this).html()
		$.ajax({
			url:url_ip + '/model/readdata/',
			type:'GET',
			data:{obj_id:id},
			datatype:'json',
			headers:{'Authorization':token},
			success:function (data) {
				// console.log(data)
				if (data.status) {
					prob({'name':txt,'data':data.data})
					$('.dataBox').hide()
					getTable(id)
				}
			},
			error:function (data) {
				console.log(data)
			}
		})
	})
	function getTable(id) {
		$.ajax({
			type: 'GET',
			url: url_ip + '/visual/get_title/?obj_id=' + id,
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
				get_data(id)
			},
			error: function (data) {
				errFn(data, touch_us);
			}
		});
	}
	// 数据获取封装
	function get_data(id) {
		arr3 = []
		for (var j = 0; j < $('#weidu2').children('td').children('b').length; j++) {
			arr3.push($('#weidu2').children('td').children('b')[j].innerText)
		}
		$('#weidu2').empty()
		//console.log(obj_id, arr3)
		$.ajax({
			type: 'GET',
			url: url_ip + '/visual/getfielddata/',
			cache: false,
			data: { obj_id: id, field: JSON.stringify(arr3) },
			datatype: 'json',
			headers: { "Authorization": token },
			success: function (data) {
				//console.log(data)
				if (data.status) {
					newdata = data.info;
					//console.log(newdata);
					if (newdata.length <= 200) {
						var Length = newdata.length
					} else {
						var Length = 200;
						// alertmsg('温馨提示：此数据数据量过大，为避免浪费您宝贵的时间，此页面只展示前200行示例数据。')
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
					// $('.weidu').css({ width: $('#middle_box2 table').width() })
				} else {
					alertmsg(data.msg)
				}
			},
			error: function (data) {
				$('.middle_box0').hide();
				$('#middle_box2').show();
				$('#middle_box2 table').empty();
				errFn(data, touch_us);
			}
		})
	}
})