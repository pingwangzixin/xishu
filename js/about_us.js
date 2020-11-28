// var token = "JWT " + window.sessionStorage.token;
console.log(url_ip);
// 顶部导航栏
$(function(){
	$('.about_us_box nav .navs li').hover(function(){
		$(this).children('ul').eq(0).css('display','block');
	},function(){
		$(this).children('ul').eq(0).css('display','none');
	});
});