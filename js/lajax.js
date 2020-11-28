/*牛逼哄哄的懒惰大师LKW书-201812190959-含羞半敛眉,不知魂已断,空有梦相随*/
jQuery.GSHajax = function(obj) {
	var url = url_ip + obj.url;
	var data = obj.data || {};
	var type = obj.type || 'get';
	var dataType = obj.dataType || 'json';//接收数据类型
	var _async = obj._async || true;//异步请求
	var alone = obj.alone || false;//独立提交（一次有效的提交）
	var cache = obj.cache || false;//浏览器历史缓存
	var headers = obj.headers || {"Authorization":token};
	var success = obj.success || function (res) {
		console.log(res)
	}
	var error = obj.error || function (err) {
		if(err.status != 401) {
			console.log(err)
		}
	}
	// 请求
	$.ajax({
		url: url,
		data: data,
		type: type,
		dataType: dataType,
		async: _async,
		headers: headers,
		success: success,
		error: error,
		// jsonpCallback: 'jsonp' + (new Date()).valueOf().toString().substr(-4),
		beforeSend: function () {
			$(obj.dom).show(); //加载动画
		},
		complete:function () {
			$(obj.dom).hide(); //加载动画
		}
	});
}
/* 获取search某个参数, eg: GetQueryString("param"), 若无, 返回null */
function GetQueryString(param){
    var reg = new RegExp("(^|&)"+ param +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return unescape(r[2]); return null;
}
 //封装过期控制代码
function set(key,value){
	var curTime = new Date().getTime();
	localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}
function get(key,exp){
	var data = localStorage.getItem(key);
	if(!data) {
		return '';
	} else {
		var dataObj = JSON.parse(data);
		if (new Date().getTime() - dataObj.time>exp) {
			return '';
		}else{
			var dataObjDatatoJson = JSON.parse(dataObj.data)
			return dataObjDatatoJson;
		}
	}
}
/*分页*/
function pageJudgeFn(all_page, now_page, fooClass) {
	if(all_page > 1) {
		$(fooClass).show();
		$(fooClass + ' ul').html('');
		if(all_page <= 5) {//隐藏点
			$(fooClass).children('.left_dian,.last_dian').hide();
			for(var i = 1;i <= all_page;i++) {
				$(fooClass + ' ul').append('<li class="" data-num="'+i+'">'+i+'</li>');
			}
		} else { //总页数大于5
			if(now_page <= 3) {//1-3显示前5页, 隐藏之前'...';
				$('.left_dian').hide();
				$('.last_dian').show();
				for(var i = 1;i <= 5;i++) {
					$(fooClass + ' ul').append('<li class="" data-num="'+i+'">'+i+'</li>');
				}
			} else if(now_page > 3 && now_page <= (all_page - 3)) { //3之后,倒数后3之前显示 n-2 ~ n+2页, 显示'...'
				$(fooClass).children('.left_dian,.last_dian').show();
				for(var i = (now_page - 2);i <= (now_page + 2);i++) {
					$(fooClass + ' ul').append('<li class="" data-num="'+i+'">'+i+'</li>');
				}
			} else { //后3 显示后5页, 隐藏之后'...'
				$('.left_dian').show();
				$('.last_dian').hide();
				for(var i = (all_page - 5 + 1);i <= all_page;i++) {
					$(fooClass + ' ul').append('<li class="" data-num="'+i+'">'+i+'</li>');
				}
			}
		}
		$(fooClass + ' ul li[data-num='+now_page+']').addClass('now_page').siblings().removeClass('now_page');
		if(now_page == 1 && now_page != all_page) {
			$(fooClass).find('.next_page img').attr('src', 'img/weiyou.png');//yes
			$(fooClass).find('.pre_page img').attr('src', 'img/buzuo.png');//no
		} else if (now_page == all_page && now_page != 1) {
			$(fooClass).find('.pre_page img').attr('src', 'img/weizuo.png');//yes
			$(fooClass).find('.next_page img').attr('src', 'img/buyou.png');//no
		} else {
			$(fooClass).find('.pre_page img').attr('src', 'img/weizuo.png');//yes
			$(fooClass).find('.next_page img').attr('src', 'img/weiyou.png');//yes
		}
	} else {
		$(fooClass).hide();
	}
}