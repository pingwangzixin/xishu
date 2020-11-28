function xrpage (allpage,nowpage) {
	if (allpage <= 5) {
		var html = '';
		for (var i = 0; i < allpage; i++) {
			var page = i + 1
			if (page == nowpage) {
				html += '<dd style="display:inline-block;vertical-align:top;margin:0 5px;color:#000;cursor:pointer;min-width:16px;" class="ddpage">'+page+'</dd>'
			} else {
				html += '<dd style="display:inline-block;vertical-align:top;margin:0 5px;color:#999;cursor:pointer;min-width:16px;" class="ddpage">'+page+'</dd>'
			}
		}
		return html;
	} else {
		var html = '';
		if (nowpage <= 3) {
			html += '<dt style="display:none;">...</dt>'
			for (var i = 0; i < allpage; i++) {
				var page = i + 1
				if (page == nowpage) {
					html += '<dd style="display:inline-block;vertical-align:top;margin:0 5px;color:#000;cursor:pointer;min-width:16px;" class="ddpage">'+page+'</dd>'
				} else if (page >= nowpage - 2 && page <= 5) {
					html += '<dd style="display:inline-block;vertical-align:top;margin:0 5px;color:#999;cursor:pointer;min-width:16px;" class="ddpage">'+page+'</dd>'
				} else {
					html += '<dd style="display:none;vertical-align:top;margin:0 5px;color:#999;cursor:pointer;min-width:16px;" class="ddpage">'+page+'</dd>'
				}
			}
			html += '<dt style="display:inline-block;vertical-align:top;">...</dt>'
		} else if (nowpage > 3 && nowpage < allpage - 2) {
			html += '<dt style="display:inline-block;vertical-align:top;">...</dt>'
			for (var i = 0; i < allpage; i++) {
				var page = i + 1
				if (page == nowpage) {
					html += '<dd style="display:inline-block;vertical-align:top;margin:0 5px;color:#000;cursor:pointer;min-width:16px;" class="ddpage">'+page+'</dd>'
				} else if (page >= nowpage - 2 && page <= nowpage + 2) {
					html += '<dd style="display:inline-block;vertical-align:top;margin:0 5px;color:#999;cursor:pointer;min-width:16px;" class="ddpage">'+page+'</dd>'
				} else {
					html += '<dd style="display:none;vertical-align:top;margin:0 5px;color:#999;cursor:pointer;min-width:16px;" class="ddpage">'+page+'</dd>'
				}
			}
			html += '<dt style="display:inline-block;vertical-align:top;">...</dt>'
		} else if (nowpage >= allpage - 2) {
			html += '<dt style="display:inline-block;vertical-align:top;">...</dt>'
			for (var i = 0; i < allpage; i++) {
				var page = i + 1
				if (page == nowpage) {
					html += '<dd style="display:inline-block;vertical-align:top;margin:0 5px;color:#000;cursor:pointer;min-width:16px;" class="ddpage">'+page+'</dd>'
				} else if (page >= allpage - 4 && page <= nowpage + 2) {
					html += '<dd style="display:inline-block;vertical-align:top;margin:0 5px;color:#999;cursor:pointer;min-width:16px;" class="ddpage">'+page+'</dd>'
				} else {
					html += '<dd style="display:none;vertical-align:top;margin:0 5px;color:#999;cursor:pointer;min-width:16px;" class="ddpage">'+page+'</dd>'
				}
			}
			html += '<dt style="display:none;">...</dt>'
		}
		return html;
	}
}
function xrCkeck (obj,nowpage,allpage) {
	var i1,i2,i3,i4,i5;
	if (nowpage <= 3) {
		obj.find('dd').hide()
		obj.find('dd:eq(0)').css('display','inline-block')
		obj.find('dd:eq(1)').css('display','inline-block')
		obj.find('dd:eq(2)').css('display','inline-block')
		obj.find('dd:eq(3)').css('display','inline-block')
		obj.find('dd:eq(4)').css('display','inline-block')
		obj.find('dt:eq(0)').hide()
		obj.find('dt:eq(1)').css('display','inline-block')
	} else if (nowpage > 3 && nowpage < allpage - 3) {
		i1 = nowpage - 3
		i2 = nowpage - 2
		i3 = nowpage - 1
		i4 = nowpage
		i5 = nowpage + 1
		obj.find('dd').hide()
		obj.find('dd:eq('+i1+')').css('display','inline-block')
		obj.find('dd:eq('+i2+')').css('display','inline-block')
		obj.find('dd:eq('+i3+')').css('display','inline-block')
		obj.find('dd:eq('+i4+')').css('display','inline-block')
		obj.find('dd:eq('+i5+')').css('display','inline-block')
		obj.find('dt').css('display','inline-block')
	} else if (nowpage >= allpage - 3) {
		i1 = allpage - 5
		i2 = allpage - 4
		i3 = allpage - 3
		i4 = allpage - 2
		i5 = allpage - 1
		obj.find('dd').hide()
		obj.find('dd:eq('+i1+')').css('display','inline-block')
		obj.find('dd:eq('+i2+')').css('display','inline-block')
		obj.find('dd:eq('+i3+')').css('display','inline-block')
		obj.find('dd:eq('+i4+')').css('display','inline-block')
		obj.find('dd:eq('+i5+')').css('display','inline-block')
		obj.find('dt:eq(0]').css('display','inline-block')
		obj.find('dt:eq(1]').hide()
	}
	for (var i = 0; i < obj.find('dd').length; i++) {
		if (obj.find('dd')[i].innerHTML == nowpage) {
			obj.find('dd')[i].style.color = '#000'
		} else {
			obj.find('dd')[i].style.color = '#999'
		}
	}
}
function xrPage (obj,allpage,nowpage) {
	obj.html('')
	var html;
	html = 	'<div class="lastpage" style="width:14px;height:14px;background:url(./img/weizuo.png);background-size:100%;display:inline-block;vertical-align:top;margin:3px 5px;cursor:pointer;"></div>'+
			'<dl style="display:inline-block;vertical-align:top;margin:0 5px;" data-nowpage="'+nowpage+'">'+xrpage(allpage,nowpage)+'</dl>'+
			'<div class="nextpage" style="width:14px;height:14px;background:url(./img/weiyou.png);background-size:100%;display:inline-block;vertical-align:top;margin:3px 5px;cursor:pointer;"></div>'+
			'<div style="display:inline-block;vertical-align:top;margin:0 5px;">共<span> '+allpage+' </span>页</div>'+
			'<input type="text" style="display:inline-block;vertical-align:top;box-sizing:border-box;border:1px solid #999;width:40px;height:20px;color:#000;margin:0 5px;text-align:center">'+
			'<div style="display:inline-block;vertical-align:top;cursor:pointer;" class="topage">跳转</div>'
	obj.css({'width':'100%','height':'20px','text-align':'center','line-height':'20px','box-sizing':'border-box','color':'#999','font-size':'14px','-moz-user-select':'none','-o-user-select':'none','-khtml-user-select':'none','-webkit-user-select':'none','-ms-user-select':'none','user-select':'none','-ms-overflow-style':'none'})
	obj[0].allpage = allpage
	obj.append(html)
}	
function clickPage (obj,className,page,func_name,pagenum,classify) {
	var nowpage = obj.children('dl').attr('data-nowpage')
	var allpage = obj[0].allpage
	var reg = /^\+?[1-9][0-9]*$/
	if (className == 'lastpage' && nowpage > 1) {
		nowpage--;
		obj.children('dl').attr('data-nowpage',nowpage)
		xrCkeck(obj,nowpage,allpage)
		func_name(nowpage,pagenum,classify)
	} else if (className == 'nextpage' && nowpage < allpage) {
		nowpage++;
		obj.children('dl').attr('data-nowpage',nowpage)
		xrCkeck(obj,nowpage,allpage)
		func_name(nowpage,pagenum,classify)
	} else if (className == 'ddpage') {
		nowpage = Number(page)
		obj.children('dl').attr('data-nowpage',nowpage)
		xrCkeck(obj,nowpage,allpage)
		func_name(nowpage,pagenum,classify)
	} else if (className == 'topage') {
		if (!reg.test(obj.children('input').val())) {
			alert('请输入正确的页数')
		} else {
			nowpage = Number(obj.children('input').val())
			obj.children('dl').attr('data-nowpage',nowpage)
			xrCkeck(obj,nowpage,allpage)
			func_name(nowpage,pagenum,classify)
		}
	}
}