var sourceListPage = 0;
//当前页面获取标签
function GetQueryString2(){
	var searchParams = window.location.search;
	if(searchParams) {
		var r = decodeURI(window.location.search.substr(1).split('=')[1]);
	} else {
		var r = '';
	}
	
	return r;
}
//banner标签
function xssyListSpanFn() {
	for(var i = 0;i < xssyListSpanData.length;i++) {
		$('.xssy_listClass .spanFoo').append('<span>'+xssyListSpanData[i]+'</span>');
	}
}
//显示第几页
function showhopage(now_page) {
	$('.source_list .xssy_source').children('li').hide();
	$('.source_list .xssy_source').children('li[data-page="'+now_page+'"]').show();
}
//课程列表
function source_listFn(keyword, num) {
	// 搜索 or 点击标签
	var url = '';
	var obj = {};
	if(num) {
		url = '/operatorsettings/filtrate/';
		obj = {labels: JSON.stringify(keyword)};
	} else {
		url = '/files/course_search/';
		obj = {keyword: keyword};
	}
	sourceListPage = 0;
	$('.source_list .xssy_source').html('');
	$.GSHajax({
		url: url,
		data: obj,
		dom: '.algList_loadGif',
		headers: {},
		success: function (res) {
			sourceListPage = Math.ceil(res.data.length / 16);
			var sourceHtml = '';
			if(res.data.length != 0) {
				for(var i = 0;i < res.data.length;i++) {
					var sourceSpanHtml = '';
					var dataPage = 0; // 第几页的文本
					if(i == 0) {
						var dataPage = 1;
					} else {
						var dataPage = Math.ceil((i + 1) / 16);
					}
					for(var j = 0;j < res.data[i].label.length;j++) {
						sourceSpanHtml += '<span>'+res.data[i].label[j]+'</span>'
					}
					if(sourceSpanHtml == '') {
						sourceSpanHtml = '--'
					}
					sourceHtml += '<li data-id="'+res.data[i].id+'" data-page="'+dataPage+'">'+
						'<img src="'+url_ip + res.data[i].cover+'" width="100%" height="146" alt="">'+
						'<h6>'+res.data[i].name+'</h6>'+
						'<p>'+sourceSpanHtml+'</p>'+
					'</li>'
				}
			} else {
				sourceHtml = '<div style="font-size: 18px;color: #000;">'+
								'很抱歉, 没有找到与 "<span style="color: #c00">'+keyword+'</span>" 相关的数据<br />'+
								'<h4 style="line-height: 28px;font-size: 13px;color: #666;">温馨提示: </h4>'+
								'<p style="line-height: 28px;padding-left: 30px;font-size:13px;font-family: "宋体";color: #333;">1. 请更换关键字试试;</p>'+
								'<p style="line-height: 28px;padding-left: 30px;font-size:13px;font-family: "宋体";color: #333;">2. 如有任何需求, 请<a href="feedback.html" style="color: #00c;">反馈给我们</a>;</p>'+
							'</div>';
			}
			$('.source_list .xssy_source').html(sourceHtml);
			pageJudgeFn(sourceListPage, 1, '.xssyList_page');
			showhopage(1);
		},
	})
}
$(function() {
	xssyListSpanFn();
	var keyword = GetQueryString2() || '';
	if(keyword && keyword != '') {
		$('#inputSearch').val(keyword)
	} else{
		$('#inputSearch').val('');
	} 
	source_listFn(keyword);
	//课程分类标签点击-支持多选
	$('.xssy_listClass .spanFoo').on('click', 'span', function () {
		$('#inputSearch').val('');
		$(this).toggleClass('active');
		var labelsArr = [];
		$('.xssy_listClass .spanFoo').children('span.active').each(function (i, ele) {
			labelsArr.push($(ele).text());
		})
		if(labelsArr.length == 0) {
			source_listFn('');
		} else {
			source_listFn(labelsArr, 2);
		}
		
	})
	//搜索
	$('.xssy_listClass h2').on('click', '.btn', function () {
		var nowVal = $('#inputSearch').val();
		source_listFn(nowVal);
	})
	//点击页数
	$('.xssyList_page').on('click', 'li', function () {
		var now_page = $(this).attr('data-num') - 0;
		pageJudgeFn(sourceListPage, now_page, '.xssyList_page');
		showhopage(now_page);
	})
	//上一页
	$('.xssyList_page').on('click', '.pre_page', function () {
		var old_page = $('.xssyList_page li.now_page').attr('data-num') - 0;
		var now_page = old_page - 1
		if(now_page == 0) {
			return;
		}
		pageJudgeFn(sourceListPage, now_page, '.xssyList_page');
		showhopage(now_page);
	})
	//下一页
	$('.xssyList_page').on('click', '.next_page', function () {
		var old_page = $('.xssyList_page li.now_page').attr('data-num') - 0;
		var now_page = old_page + 1;
		if(old_page == sourceListPage) {
			return;
		}
		pageJudgeFn(sourceListPage, now_page, '.xssyList_page');
		showhopage(now_page);
	})
	//页码搜索
	$('.xssyList_page').on('click', '.to_page', function () {
		var now_page = $('.xssyList_page .will_page').val();
		if(now_page) {
			var reg = /^[0-9]*$/;
			if(reg.test(now_page)) {
				now_page -= 0;
				if(now_page > sourceListPage) {
					return false;
				}
				if(now_page >= 1 && now_page <= sourceListPage) {
					pageJudgeFn(sourceListPage, now_page, '.xssyList_page');
				}
				showhopage(now_page);
			}
		}
	})
	//进入详情页
	$('.source_list ul.xssy_source').on('click', 'li', function () {
		var nowId = $(this).attr('data-id');
		window.location.href = 'xssy_detail.html?' + nowId;
	})
})