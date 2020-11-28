// 智能推荐
function algRankFn(way) {
    // 	$('.algRankCont').html('');
    // 	$('.algRankCont_loadGif').show();
    if (way == "算法") {
        $.ajax({
            type: "GET",
            url: url_ip + "/news/push/",
            data: { way: way, id: token_id },
            dataType: "json",
            success: function(res) {
                if (res.status && res.data) {
                    for (var i = 0; i < res.data.length; i++) {
                        var spanHtml = '';
                        for (var j = 0; j < res.data[i].label.length; j++) {
                            if (j > 4) {
                                return;
                            } else {
                                spanHtml += `
									 <span>${res.data[i].label[j]}</span>
								`
                            }
                        }
                        var innerHTML = `
						<li data-id="${res.data[i].id}">
							<div class="top">
							${res.data[i].name}
							</div>
							<div class="middle">
								${spanHtml}
							</div>
							<div class="bottom">
								<span>评论：${res.data[i].comment_num}</span>
								<span>引用：${res.data[i].cite}</span>
							</div>
						</li>
						`
                        $('.section_fiveCont_sf ul').append(innerHTML)
                    }
                }
            },
            error: function(err) {
                console.log(err);
            }
        })
    } else {
        $.ajax({
            type: "GET",
            url: url_ip + "/news/push/",
            data: { way: way, id: token_id },
            dataType: "json",
            success: function(res) {
                if (res.status && res.data) {
                    for (var i = 0; i < res.data.length; i++) {
                        var innerHTML = `
						<li data-id="${res.data[i].id}">
							<div class="top">
							${res.data[i].name}
							</div>
							<div class="middle">
								<p>${res.data[i].details}</p>
							</div>
							<div class="bottom">
								<span>评论：${res.data[i].comment_num}</span>
								<span>引用：${res.data[i].cite}</span>
							</div>
						</li>
						`
                        $('.section_fiveCont_sj ul').append(innerHTML)
                    }
                }
            },
            error: function(err) {
                console.log(err);
            }
        })
    }
}
$(function() {
        var banI = 0;
        //轮播
        $.ajax({
                url: url_ip + '/operatorsettings/banners/',
                type: 'GET',
                data: {},
                dataType: 'json',
                success: function(res) {
                    if (res.status) {
                        for (var i = 0; i < res.data.length; i++) {
                            // var lunboHtml = '<div class="swiper-slide" data-type="' + res.data[i].classify + '">' +
                            var lunboHtml = `<div class="swiper-slide" data-type="${res.data[i].classify}" style="background-size: cover;background:url(${url_ip + res.data[i].url}) no-repeat center">` +
                                // '<img src="' + url_ip + res.data[i].url + '" alt="" height="100%">' +
                                '<div class="swiper-slide-abs">' +
                                '<h3>' + res.data[i].text + '</h3>' +
                                '<p>' + res.data[i].text_part + '</p>' +
                                '</div>' +
                                '</div>'
                            $('.swiper-wrapper').append(lunboHtml);
                        }
                    }
                },
                error: function(err) {
                    console.log(err)
                },
                complete: function() {
                    var mySwiper = new Swiper('.swiper-container', {
                        loop: true,
                        // autoHeight: true,
                        autoplay: 5000, //可选选项，自动滑动
                        effect: 'fade',
                        fade: {
                            crossFade: false,
                        },
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        autoplayDisableOnInteraction: false
                    })
                    $('.swiper-slide[data-type=4]').css('cursor', 'pointer');
                    // $('.swiper-container .swiper-wrapper img').each(function (i, ele) {
                    // 	if(i == $('.swiper-container .swiper-wrapper img').length) {
                    // 		$(this).onload =function() {
                    // 			var mySwiper = new Swiper('.swiper-container', {
                    // 				loop: true,
                    // 				autoplay: 5000, //可选选项，自动滑动
                    // 				effect: 'fade',
                    // 				fade: {
                    // 					crossFade: false,
                    // 				},
                    // 				pagination: '.swiper-pagination',
                    // 				paginationClickable: true,
                    // 				autoplayDisableOnInteraction: false,
                    // 			})
                    // 			/*鼠标移入停止轮播，鼠标离开 继续轮播*/
                    // 			$('.swiper-container').mouseenter(function() {
                    // 				mySwiper.stopAutoplay();
                    // 			})
                    // 			$('.swiper-container').mouseleave(function() {
                    // 				mySwiper.startAutoplay();
                    // 			})
                    // 		}

                    	// }
                    // })
                    // var mySwiper = new Swiper('.swiper-container', {
                    // 	loop: true,
                    // 	autoplay: 2000, //可选选项，自动滑动
                    // 	effect: 'fade',
                    // 	fade: {
                    // 		crossFade: false,
                    // 	},
                    // 	pagination: '.swiper-pagination',
                    // 	paginationClickable: true,
                    // 	autoplayDisableOnInteraction: false,
                    // })
                    // /*鼠标移入停止轮播，鼠标离开 继续轮播*/
                    // $('.swiper-container').mouseenter(function () {
                    // 	mySwiper.stopAutoplay();
                    // })
                    // $('.swiper-container').mouseleave(function () {
                    // 	mySwiper.startAutoplay();
                    // })
                }
            })
            // 点击轮播
        $('.swiper-wrapper').on('click', '.swiper-slide', function() {
                var nowType = $(this).attr('data-type');
                if (nowType == '2') {
                    window.location.href = 'xssy.html';
                }
            })
            // 亮点功能hover
        $('.sectionOneCont ul li').hover(function() {
                var index = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $(`.aside-img img:eq(${index})`).show().siblings().hide();
            })
            // 平台相关数字动态增加
        var person, share, alg;
        $.ajax({
            async: true,
            type: "GET",
            cache: false, //不缓存
            url: url_ip + "/news/num/",
            data: { way: '算法' },
            dataType: "json",
            success: function(res) {
                person = res.data.today_person;
                share = res.data.today_share;
                alg = res.data.today_alg;
                var platfolmNum = res.data.person || 0;
                // $('.platfolm li:eq(0) h2 i').text(res.data.today_person); //今日入住
                $('.platfolm li:eq(1) h3').text(res.data.share); //共享算法
                $('.platfolm li:eq(2) h3').text(res.data.share_alg); //共享算法
                // var platfolmtim = parseInt(5347 / 300);
                var baseNum = 0;
                var aaa = setInterval(function() {
                    if (baseNum >= platfolmNum) {
                        clearInterval(aaa);
                        $('.platfolmNum').text(platfolmNum);
                    } else {
                        baseNum += 103;
                        $('.platfolmNum').text(baseNum);
                    }
                }, 20)
                $('.platfolm li:eq(0) h2 span:eq(1)').html(`今日入驻<i>${person}</i>人`);
                $('.platfolm li:eq(1) h2 span:eq(1)').html(`今日新增<i>${share}</i>`);
                $('.platfolm li:eq(2) h2 span:eq(1)').html(`今日新增<i>${alg}</i>`);
                scroll('scroll-box', 'box1', 'box2')
                scroll('scroll-box1', 'box3', 'box4')
                scroll('scroll-box2', 'box5', 'box6')
                    // setInterval(() => {	
                    // 	if($('.platfolm li:eq(1) h2 span').html() === '持续更新中<i class="dotting"></i>') {
                    // 		$('.platfolm li:eq(0) h2 span').html(`今日入驻<i>${person}</i>人`);
                    // 		$('.platfolm li:eq(1) h2 span').html(`今日新增<i>${share}</i>`);
                    // 		$('.platfolm li:eq(2) h2 span').html(`今日新增<i>${alg}</i>`);
                    // 	}
                    // 	else {
                    // 		$('.platfolm li h2 span').html(`持续更新中<i class="dotting"></i>`);
                    // 		$('.platfolm li:eq(0) h2 span').html('持续入驻中<i class="dotting"></i>');
                    // 	}
                    // },5000)
            },
            error: function(err) {
                console.log(err);
            }
        })

        //切换电脑桌面
        $('.section_two_tab').on('mouseenter', 'li', function() {
            //自己
            $(this).addClass('active').siblings().removeClass('active');
            //图片
            var nowI = $(this).index();
            var arr = [
                [0, 1, 2],
                [1, 2, 0],
                [2, 0, 1]
            ];
            $('.section_two .sectionCont li').eq(arr[nowI][0]).css({ transform: 'translateX(0) scale(0.6)', zIndex: 1 });
            $('.section_two .sectionCont li').eq(arr[nowI][1]).css({ transform: 'translateX(190px) scale(1)', zIndex: 2 });
            $('.section_two .sectionCont li').eq(arr[nowI][2]).css({ transform: 'translateX(610px) scale(0.6)', zIndex: 1 });

            $('.section_two .sectionCont li').each(function(i, ele) {
                var oldImgName = $('.section_two .sectionCont li').eq(i).children('img').attr('src').split('.')[0];
                var useSrc;
                if (i == arr[nowI][1]) {
                    useSrc = oldImgName + '.gif';
                } else {
                    useSrc = oldImgName + '.png';
                }
                var oldImgName = $('.section_two .sectionCont li').eq(i).children('img').attr({ src: useSrc });
            })

        })
        // 待定
        // $('.section_two .sectionCont').on('mouseenter', 'li', function() {
        //     var nowI = $(this).index();
        //     $('.section_two_tab li').eq(nowI).addClass('active').siblings().removeClass('active');
        //     // if(lock) {
        //     //     $('.section_two_tab li').eq(nowI).mouseenter()
        //     //     lock = false;
        //     // }
        //     // else {
        //     //     lock = true
        //     // }

        // })
        algRankFn('算法'); //算法推荐
        algRankFn('数据'); //数据推荐
        // 算法数据点击进详情页
        $('.section_fiveCont').on('click', 'ul li', function() {
                var needId = $(this).attr('data-id');
                var nowType = $(this).parent('ul').attr('data-item');
                switch (nowType) {
                    case '算法':
                        sessionStorage.setItem("data_algo", 'algo');
                        sessionStorage.setItem("form", 'index');
                        window.location.href = 'details.html?' + needId;
                        break;
                    case '数据':
                        var where_id = $(this).attr('data-where');;
                        sessionStorage.setItem("data_algo", 'data');
                        sessionStorage.setItem("where_id", where_id);
                        window.location.href = 'details.html?' + needId;
                        break;
                    // case '模型':
                    //     if (token != 'JWT undefined' && token != 'JWT null') {
                    //         sessionStorage.setItem("model_id_index", needId);
                    //         window.location.href = 'model.html';
                    //     } else {
                    //         $('.shade').fadeIn();
                    //     }
                    //     break;
                }
            })
            // 资讯
        $.ajax({
                async: true,
                type: "GET",
                cache: false, //不缓存
                url: url_ip + '/news/new/',
                data: {},
                dataType: "json",
                success: function(res) {
                    $('.section_four li').eq(0).children('h4').html('<img src="' + url_ip + res.data1[0].cover + '" alt="维护中, 稍后重试" width="100%" height="100%">' +
                        '<p>' + res.data1[0].title + '</p>').attr('data-id', res.data1[0].id);
                    $('.section_four li').eq(1).children('h4').html('<img src="' + url_ip + res.data2[0].cover + '" alt="维护中, 稍后重试" width="100%" height="100%">' +
                        '<p>' + res.data2[0].title + '</p>').attr('data-id', res.data2[0].id);
                    $('.section_four li').eq(2).children('h4').html('<img src="' + url_ip + res.data3[0].cover + '" alt="维护中, 稍后重试" width="100%" height="100%">' +
                        '<p>' + res.data3[0].title + '</p>').attr('data-id', res.data3[0].id);
                    $('.section_four li>div').html('');
                    for (var i = 1; i < 3; i++) {
                        $('.section_four li').eq(0).children('div').append('<p data-id="' + res.data1[i].id + '">' + res.data1[i].title + '</p>');
                    }
                    for (var i = 1; i < 3; i++) {

                        $('.section_four li').eq(1).children('div').append('<p data-id="' + res.data2[i].id + '">' + res.data2[i].title + '</p>');
                    }
                    for (var i = 1; i < 3; i++) {

                        $('.section_four li').eq(2).children('div').append('<p data-id="' + res.data3[i].id + '">' + res.data3[i].title + '</p>');
                    }

                },
                error: function(err) {
                    console.log(err);
                }
            })
            // 资讯go详情页
        $('.section_four ul').on('click', 'li h4,li p', function() {
            window.location.href = 'info_detail.html?id=' + $(this).attr('data-id');
        })
        $('.swiper-wrapper img').load(function() {
        })
    })
    //图片加载结束后执行
window.onload = function() {
    // var mySwiper = new Swiper('.swiper-container', {
    //         loop: true,
    //         // autoHeight: true,
    //         autoplay: 5000, //可选选项，自动滑动
    //         effect: 'fade',
    //         fade: {
    //             crossFade: false,
    //         },
    //         pagination: '.swiper-pagination',
    //         paginationClickable: true,
    //         autoplayDisableOnInteraction: false
    //     })
        /*鼠标移入停止轮播，鼠标离开 继续轮播*/
    $('.swiper-container').mouseenter(function() {
        mySwiper.stopAutoplay();
    })
    $('.swiper-container').mouseleave(function() {
        mySwiper.startAutoplay();
    })
    // 答题
    $('body').on('click', '.swiper-slide[data-type=4]', function() {
        // window.location.href="answer.html";
        window.open('answer.html')
    })
    $('.swiper-slide[data-type=4]').css('cursor', 'pointer');
    // var answerHtml = `
    //     <div style="position:absolute;cursor:pointer;width:200px;height:60px;bottom: 120px;border: 1px solid #fff">去答题</div>
    // `
    // $('.swiper-slide[data-type=4]').each(function() {
    //     $(this).append(answerHtml)
    // })
}

function scroll(box, parent, parent2) {
    var box = document.getElementById(box)
    var parent = document.getElementsByClassName(parent)[0]
    var parent2 = document.getElementsByClassName(parent2)[0]
    parent2.innerHTML = parent.innerHTML;   /*启动定时器*/
    var timer = setInterval(autoScrollLine, 30)   /*单行向上滚动效果*/
    function autoScrollLine() {   /*判断滚动内容是否已经滚完，滚完了则滚动的值重新设置到0     否则就每隔30毫秒向上滚动1px*/   
        if (box.scrollTop >= parent.offsetHeight) {
            box.scrollTop = 0;
        } else {
            box.scrollTop++;
        }    /*判断滚动的距离刚好为一条公告的高度时停掉定时器，       隔1s之后重新启动定时器即可实现公告滚动停留效果 */
        if (box.scrollTop % box.offsetHeight == 0) {
            clearInterval(timer);
            setTimeout(() => { timer = setInterval(autoScrollLine, 30) }, 4000)
        }
    }
}