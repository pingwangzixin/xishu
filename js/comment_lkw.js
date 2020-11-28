/*全选*/
// function inputChecked ({fuClass: fuClass,sonClass: sonClass}) {
// 	//父选子
// 	$(document).on('click', fuClass, function () {
// 		//父选子
// 		var isTrue = $(this).prop('checked');
// 		$(fuClass).prop('checked', isTrue);
// 		$('.snBody').find(sonClass).prop('checked', isTrue);
// 	})
// 	//子影响父
// 	$(document).on('click', sonClass, function () {
// 		var sonLength = $(sonClass).length;
// 		var sonCheckLength = $(sonClass+':checked').length;
// 		if(sonLength > sonCheckLength) {
// 			$(fuClass).prop('checked', false);
// 		} else {
// 			$(fuClass).prop('checked', true);
// 		}
// 	});
// }
function alertmsg (msg,tag,num) {
	var top = $('.msgbox').offset().top + 331
	$('.msgbox').css('top',top)
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
function alertBox_lkwFn(width, height, alertContClass, zIndex) {
	$('.mu').show();
	var marginTop = -height.substr(0,height.length - 2) / 2;
	var marginLeft = -width.substr(0,width.length - 2) / 2;
	$('.alertBoxArea_lkw').show().css({width: width, height: height,zIndex: zIndex, marginTop: marginTop, marginLeft: marginLeft}).html($(alertContClass).html());
	
}
$(function () {
	//关闭弹窗
	$('.alertBoxArea_lkw').on('click', '.alertClose', function () {
		$(this).closest('.alertBoxArea_lkw').html('').slideUp();
		$('.mu').fadeOut();
	})
	
})
//地区三级联动
function changeCity (val, cityClass, defaultCity) {
	var nowVal = 0;
	switch(val) {
		case '北京': nowVal = 1; break;
		case '上海': nowVal = 2; break;
		case '天津': nowVal = 3; break;
		case '重庆': nowVal = 4; break;
		case '河北': nowVal = 5; break;
		case '山西': nowVal = 6; break;
		case '内蒙古': nowVal = 7; break;
		case '辽宁': nowVal = 8; break;
		case '吉林': nowVal = 9; break;
		case '黑龙江': nowVal = 10; break;
		case '江苏': nowVal = 11; break;
		case '浙江': nowVal = 12; break;
		case '安徽': nowVal = 13; break;
		case '福建': nowVal = 14; break;
		case '江西': nowVal = 15; break;
		case '山东': nowVal = 16; break;
		case '河南': nowVal = 17; break;
		case '湖北': nowVal = 18; break;
		case '湖南': nowVal = 19; break;
		case '广东': nowVal = 20; break;
		case '广西': nowVal = 21; break;
		case '海南': nowVal = 22; break;
		case '四川': nowVal = 23; break;
		case '贵州': nowVal = 24; break;
		case '云南': nowVal = 25; break;
		case '西藏': nowVal = 26; break;
		case '山西': nowVal = 27; break;
		case '甘肃': nowVal = 28; break;
		case '宁夏': nowVal = 29; break;
		case '青海': nowVal = 30; break;
		case '新疆': nowVal = 31; break;
		case '香港': nowVal = 32; break;
		case '澳门': nowVal = 33; break;
		case '台湾': nowVal = 34; break;
		defaule: nowVal = 0;
	}
	
	var cityArr = arr[nowVal].split(",");
	$(cityClass).html('');
	for(var i = 0;i < cityArr.length;i++) {
		var optionHtml = new Option(cityArr[i], cityArr[i]);
		$(cityClass).append(optionHtml);
	}
	if(defaultCity) {
		$(cityClass).val(defaultCity);
	}
}
//数据
var provinceArr = ["----", "北京", "上海", "天津", "重庆", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "宁夏", "青海", "新疆", "香港", "澳门", "台湾"]
var arr = new  Array();
	arr[0 ] ="----"; 
	arr[1 ] = "----,东城,西城,崇文,宣武,朝阳,丰台,石景山,海淀,门头沟,房山,通州,顺义,昌平,大兴,平谷,怀柔,密云,延庆";
	arr[2 ] = "----,黄浦,卢湾,徐汇,长宁,静安,普陀,闸北,虹口,杨浦,闵行,宝山,嘉定,浦东,金山,松江,青浦,南汇,奉贤,崇明";
	arr[3 ] = "----,和平,东丽,河东,西青,河西,津南,南开,北辰,河北,武清,红挢,塘沽,汉沽,大港,宁河,静海,宝坻,蓟县";
	arr[4 ] = "----,万州,涪陵,渝中,大渡口,江北,沙坪坝,九龙坡,南岸,北碚,万盛,双挢,渝北,巴南,黔江,长寿,綦江,潼南,铜梁,大足,荣昌,壁山,梁平,城口,丰都,垫江,武隆,忠县,开县,云阳,奉节,巫山,巫溪,石柱,秀山,酉阳,彭水,江津,合川,永川,南川";
	arr[5 ] = "----,石家庄,邯郸,邢台,保定,张家口,承德,廊坊,唐山,秦皇岛,沧州,衡水";
	arr[6 ] = "----,太原,大同,阳泉,长治,晋城,朔州,吕梁,忻州,晋中,临汾,运城";
	arr[7 ] = "----,呼和浩特,包头,乌海,赤峰,呼伦贝尔盟,阿拉善盟,哲里木盟,兴安盟,乌兰察布盟,锡林郭勒盟,巴彦淖尔盟,伊克昭盟";
	arr[8 ] = "----,沈阳,大连,鞍山,抚顺,本溪,丹东,锦州,营口,阜新,辽阳,盘锦,铁岭,朝阳,葫芦岛";
	arr[9 ] = "----,长春,吉林,四平,辽源,通化,白山,松原,白城,延边";
	arr[10] = "----,哈尔滨,齐齐哈尔,牡丹江,佳木斯,大庆,绥化,鹤岗,鸡西,黑河,双鸭山,伊春,七台河,大兴安岭";
	arr[11] = "----,南京,镇江,苏州,南通,扬州,盐城,徐州,连云港,常州,无锡,宿迁,泰州,淮安";
	arr[12] = "----,杭州,宁波,温州,嘉兴,湖州,绍兴,金华,衢州,舟山,台州,丽水";
	arr[13] = "----,合肥,芜湖,蚌埠,马鞍山,淮北,铜陵,安庆,黄山,滁州,宿州,池州,淮南,巢湖,阜阳,六安,宣城,亳州";
	arr[14] = "----,福州,厦门,莆田,三明,泉州,漳州,南平,龙岩,宁德";
	arr[15] = "----,南昌市,景德镇,九江,鹰潭,萍乡,新馀,赣州,吉安,宜春,抚州,上饶";
	arr[16] = "----,济南,青岛,淄博,枣庄,东营,烟台,潍坊,济宁,泰安,威海,日照,莱芜,临沂,德州,聊城,滨州,菏泽";
	arr[17] = "----,郑州,开封,洛阳,平顶山,安阳,鹤壁,新乡,焦作,濮阳,许昌,漯河,三门峡,南阳,商丘,信阳,周口,驻马店,济源";
	arr[18] = "----,武汉,宜昌,荆州,襄樊,黄石,荆门,黄冈,十堰,恩施,潜江,天门,仙桃,随州,咸宁,孝感,鄂州";
	arr[19] = "----,长沙,常德,株洲,湘潭,衡阳,岳阳,邵阳,益阳,娄底,怀化,郴州,永州,湘西,张家界";
	arr[20] = "----,广州,深圳,珠海,汕头,东莞,中山,佛山,韶关,江门,湛江,茂名,肇庆,惠州,梅州,汕尾,河源,阳江,清远,潮州,揭阳,云浮";
	arr[21] = "----,南宁,柳州,桂林,梧州,北海,防城港,钦州,贵港,玉林,南宁地区,柳州地区,贺州,百色,河池";
	arr[22] = "----,海口,三亚";
	arr[23] = "----,成都,绵阳,德阳,自贡,攀枝花,广元,内江,乐山,南充,宜宾,广安,达川,雅安,眉山,甘孜,凉山,泸州";
	arr[24] = "----,贵阳,六盘水,遵义,安顺,铜仁,黔西南,毕节,黔东南,黔南";
	arr[25] = "----,昆明,大理,曲靖,玉溪,昭通,楚雄,红河,文山,思茅,西双版纳,保山,德宏,丽江,怒江,迪庆,临沧";
	arr[26] = "----,拉萨,日喀则,山南,林芝,昌都,阿里,那曲";
	arr[27] = "----,西安,宝鸡,咸阳,铜川,渭南,延安,榆林,汉中,安康,商洛";
	arr[29] = "----,银川,石嘴山,吴忠,固原";
	arr[28] = "----,兰州,嘉峪关,金昌,白银,天水,酒泉,张掖,武威,定西,陇南,平凉,庆阳,临夏,甘南";
	arr[30] = "----,西宁,海东,海南,海北,黄南,玉树,果洛,海西";
	arr[31] = "----,乌鲁木齐,石河子,克拉玛依,伊犁,巴音郭勒,昌吉,克孜勒苏柯尔克孜,博 尔塔拉,吐鲁番,哈密,喀什,和田,阿克苏";
	arr[32] = "----,香港";
	arr[33] = "----,澳门";
	arr[34] = "----,台北,高雄,台中,台南,屏东,南投,云林,新竹,彰化,苗栗,嘉义,花莲,桃园,宜兰,基隆,台东,金门,马祖,澎湖";
	
//分页判断
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
// 			$(fooClass).children('.next_page').removeClass('noClick');
// 			$(fooClass).children('.pre_page').addClass('noClick');
			
			$(fooClass).find('.next_page img').attr('src', 'img/weiyou.png');//yes
			$(fooClass).find('.pre_page img').attr('src', 'img/buzuo.png');//no
		} else if (now_page == all_page && now_page != 1) {
// 			$(fooClass).children('.pre_page').removeClass('noClick');
// 			$(fooClass).children('.next_page').addClass('noClick');
			
			$(fooClass).find('.pre_page img').attr('src', 'img/weizuo.png');//yes
			$(fooClass).find('.next_page img').attr('src', 'img/buyou.png');//no
		} else {
			// $(fooClass).children('.pre_page,.next_page').removeClass('noClick');
			
			$(fooClass).find('.pre_page img').attr('src', 'img/weizuo.png');//yes
			$(fooClass).find('.next_page img').attr('src', 'img/weiyou.png');//yes
		}
	} else {
		$(fooClass).hide();
	}
}
//分页开发中...
// function pagingFn ({pageFoo: pageFoo,  nowPage: nowPage, allPage: allPage, preBtn: preBtn, nextBtn: nextBtn}) {
// 	// var all_page = allPage;
// 	
// 	//点击页码
// 	$('.sj_paging').on('click', 'li', function () {
// 		var now_page = $(this).attr('data-num') - 0;
// 		$('.sj_paging ul').html('');
// 		pageJudgeFn(allPage, now_page);
// 	})
// 	//上一页
// 	$('.sj_paging').on('click', '.pre_page', function () {
// 		var old_page = $('.sj_paging li.active').attr('data-num') - 0;
// 		var now_page = old_page - 1
// 		if(now_page == 0) {
// 			$(this).addClass('cRed');
// 			return;
// 		} else {
// 			$(this).removeClass('cRed');
// 		}
// 		$('.sj_paging ul').html('');
// 		pageJudgeFn(allPage, now_page);
// 	})
// 	//下一页
// 	$('.sj_paging').on('click', '.next_page', function () {
// 		var old_page = $('.sj_paging li.active').attr('data-num') - 0;
// 		var now_page = old_page + 1;
// 		if(old_page == allPage) {
// 			$(this).addClass('cRed');
// 			return;
// 		} else {
// 			$(this).removeClass('cRed');
// 		}
// 		$('.sj_paging ul').html('');
// 		pageJudgeFn(allPage, now_page);
// 	})
// 	$('.sj_paging').on('click', '.to_page', function () {
// 		var now_page = $('.will_page').val();
// 		if(now_page >= 1 && now_page <= allPage) {
// 			$('.sj_paging ul').html('');
// 			pageJudgeFn(allPage, now_page);
// 		}
// 	})
// }