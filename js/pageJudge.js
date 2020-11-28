/*分页*/
function pageJudgeFn(fooClass, all_page, now_page) {
	$(fooClass).find('.all_page').text(all_page);
	if(all_page > 1) {
		$(fooClass).show();
		$(fooClass + ' ul').html('');
		if(all_page <= 5) {//隐藏点
			$(fooClass).children('.left_dian,.last_dian').hide();
			for(var i = 1;i <= all_page;i++) {
				$(fooClass + ' ul').append('<li class="page_click " data-num="'+i+'" data-click="oli">'+i+'</li>');
			}
		} else { //总页数大于5
			if(now_page <= 3) {//1-3显示前5页, 隐藏之前'...';
				$('.left_dian').hide();
				$('.last_dian').show();
				for(var i = 1;i <= 5;i++) {
					$(fooClass + ' ul').append('<li class="page_click " data-num="'+i+'" data-click="oli">'+i+'</li>');
				}
			} else if(now_page > 3 && now_page <= (all_page - 3)) { //3之后,倒数后3之前显示 n-2 ~ n+2页, 显示'...'
				$(fooClass).children('.left_dian,.last_dian').show();
				for(var i = (now_page - 2);i <= (now_page + 2);i++) {
					$(fooClass + ' ul').append('<li class="page_click " data-num="'+i+'" data-click="oli">'+i+'</li>');
				}
			} else { //后3 显示后5页, 隐藏之后'...'
				$('.left_dian').show();
				$('.last_dian').hide();
				for(var i = (all_page - 5 + 1);i <= all_page;i++) {
					$(fooClass + ' ul').append('<li class="page_click " data-num="'+i+'" data-click="oli">'+i+'</li>');
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
//分页点击
function pageClickFn(fooClass, all_page, _this, fn, xshu_pre_count) {
  var nowClick = $(_this).attr('data-click');
  var page = 0;
  switch(nowClick) {
    case 'pre':
      page = $(fooClass).find('li.now_page').attr('data-num');
      if(page == 1) {
        page = 'noGo';
      } else {
        page -= 1;
      }
      break;
    case 'oli':
      page = $(_this).attr('data-num') - 0;
      break;
    case 'nxt':
      page = $(fooClass).find('li.now_page').attr('data-num') - 0 + 1;
      if(page >= all_page + 1) {
        page = 'noGo';
      }
      break;
    case 'go':
      page = $(fooClass).find('.will_page').val() - 0;
      if(page < 1 || page > all_page) {
        page = 'noGo';
      }
      break;
  }
  if(page == 'noGo') {
    return false;
  } else {
    fn(page, xshu_pre_count);
  }
}