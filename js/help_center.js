// var token = "JWT " + window.sessionStorage.token;
// var token = "JWT " + window.sessionStorage.token;

function caculaterFn() {
    var contH = $(window).height() - $('nav').outerHeight(true) - $('.help_banner').outerHeight('true') + 50;
    var tabAjaxAreaH = contH - $('.helpCenterL h3').outerHeight(true);
    $('.helpCenterL .tabAjaxArea').height(tabAjaxAreaH);
    $('.helpCenterR').height(contH);
}

function ajaxFn(ajaxUrl, ajaxData, type) {
    var type = type || 'get';
    var ajaxRes = '';
    $.ajax({
        type: type,
        url: url_ip + ajaxUrl,
        async: false,
        cache: false,
        data: ajaxData,
        datatype: 'json',
        success: function(res) {
            ajaxRes = res;
        },
        error: function(err) {
            console.log(err)
        }
    })
    return ajaxRes;
}

//左侧tab绑值
function tabPage(tabCont) {
    $('.tabAjaxArea').html('');
    for (var i = 0; i < tabCont.data.length; i++) {
        var tabHtml = '<h4 data-class="2" class="" data-id="' + tabCont.data[i].id + '">' + tabCont.data[i].question + '</h4><ul class="hide" data-id="' + tabCont.data[i].id + '"></ul>'
        $('.tabAjaxArea').append(tabHtml);
        ulHtml = '';
        for (var j = 0; j < tabCont.data[i].data2.length; j++) {
            ulHtml += '<li data-class="3" class="" data-id="' + tabCont.data[i].data2[j].id + '">' + tabCont.data[i].data2[j].question + '</li>'
        }
        $('.tabAjaxArea ul').last().html(ulHtml)
    }
    $('.tabAjaxArea').append('<h5 data-class="2" data-item="now_guid">新手引导</h5>');
}
//右侧搜索出标签
function labelPage(labelCont) {
    $('.labelAjaxArea').html('');
    var labelHtml = '';
    if (labelCont.data == '') {
        labelHtml = '换个搜索关键字也许能帮助您更多哦...';
    } else {
        for (var i = 0; i < labelCont.data.length; i++) {
            labelHtml += '<li data-id="' + labelCont.data[i].id + '">' + labelCont.data[i].question + '</li>'
        }
    }
    $('.labelAjaxArea').html(labelHtml);
}

$(window).resize(function() {
    caculaterFn();
})

$(function() {
    // tab二级点击
    $('.helpCenterL').on('click', 'h4', function() {
            // if ($(this).hasClass('active')) {
            // $(this).removeClass('active');
            // } else {
            $(this).addClass('active').siblings('h4,h5').removeClass('active');
            $(this).next('ul').stop().slideDown().show().siblings('ul').slideUp();
            $(this).next('ul').children('li').eq(0).click();
            // }
        })
        //新手引导-版本对比
    $('.helpCenterL').on('click', 'h5', function() {
            $('.helpCenterR').animate({　　　　　　 scrollTop: 0, 　　　　 }, 100)
            $(this).addClass('active').siblings('h4,h5').removeClass('active');
            $(this).siblings('ul').stop().siblings('ul').slideUp();

            $('.helpCenterR ul').stop().animate({ 'left': '-100%' });
            $('.helpCenterR .problemCont').show().stop().animate({ 'marginLeft': '10px' });
            $('.help_back').hide();

            $('.detailAjaxArea').html('<i class="loading_lkw"></i>');
            // now_guid compare
            var nowItem = $(this).attr('data-item');
            if (nowItem == 'now_guid') {
                var newGuid = ajaxFn('/helpcenter/guid/', '', 'get');
                $('.detailAjaxArea').html(newGuid.data);
            } else if (nowItem == 'compare') {
                var compareData = ajaxFn('/helpcenter/version/', '', 'get');
                $('.detailAjaxArea').html(compareData.data);
            }
            $('.detailAjaxArea img').each(function() {
                $(this).attr('src', url_ip + $(this).attr('src'))
            })
            if ($(".detailAjaxArea>p").css("line-height") == "18px") {
                $(".detailAjaxArea>p").css("line-height", "20px");
            }
        })
        //tab三级点击
    $('.helpCenterL').on('click', 'ul li', function() {
            $('.helpCenterR').animate({　　　　　　 scrollTop: 0, 　　　　 }, 100)
            $('.helpCenterL').find('li.active').removeClass('active');
            $(this).addClass('active');
            $('.helpCenterR ul').stop().animate({ 'left': '-100%' });
            $('.helpCenterR .problemCont').show().stop().animate({ 'marginLeft': '10px' });
            $('.help_back').hide();
            var nowId = $(this).attr('data-id');
            $('.detailAjaxArea').html('<i class="loading_lkw"></i>');
            var detailCont = ajaxFn('/helpcenter/detail/', { id: nowId }, 'get');
            $('.detailAjaxArea').html(detailCont.data);
            $('.detailAjaxArea img').each(function() {
                $(this).attr('src', url_ip + $(this).attr('src'));
                $(this).css({ margin: '0 auto', display: 'block' });
            })
        })
        //搜索
    $('#helpSearchBtn').on('click', function() {
            //左侧tab全部收起
            $('.tabAjaxArea h4,.tabAjaxArea h5,.tabAjaxArea li').removeClass('active');
            $('.tabAjaxArea ul:visible').stop().slideUp();

            var val = $('#helpSearch').val();
            $('.helpCenterR ul').stop().animate({ 'left': '15px' });
            $('.helpCenterR .problemCont').stop().animate({ 'marginLeft': '100%' }, function() {
                $(this).hide();
            });
            $('.labelAjaxArea').html('<i class="loading_lkw"></i>');
            var labelCont = ajaxFn('/helpcenter/search/', { keywords: val }, 'get');
            labelPage(labelCont);
        })
        //搜索结果点击
    $('.helpCenterR .problemLabel').on('click', 'li', function() {
            //右侧内容宽度
            var contRWidth = $('.helpCenterR').outerWidth(true);
            $('.helpCenterR ul').stop().animate({ 'left': '-100%' });
            $('.helpCenterR .problemCont').show().stop().animate({ 'marginLeft': '10px' });
            $('.help_back').show();
            //tab页全部收起
            $('.helpCenterL h4.active,.helpCenterL li.active').removeClass('active');
            $('.helpCenterL ul:visible').stop(true).slideUp();

            var nowId = $(this).attr('data-id');
            $('.detailAjaxArea').html('<i class="loading_lkw"></i>');
            var detailCont = ajaxFn('/helpcenter/detail/', { id: nowId }, 'get');
            $('.detailAjaxArea').html(detailCont.data);
            $('.detailAjaxArea img').each(function() {
                $(this).attr('src', url_ip + $(this).attr('src'));
                $(this).css({ margin: '0 auto', display: 'block' });
            })
        })
        //详情返回
    $('.help_back').on('click', function() {
            $('.helpCenterR ul').stop().animate({ 'left': '15px' });
            $('.helpCenterR .problemCont').stop().animate({ 'marginLeft': '100%' }, function() {
                $(this).hide();
            });
        })
        //左侧加载
    var tabCont = ajaxFn('/helpcenter/help/', '', 'get');
    tabPage(tabCont);
    var clickWho = window.location.href.split('?')[1];
    if (clickWho == undefined || clickWho == '') {
        $('.tabAjaxArea h4').eq(0).click();
        $('.tabAjaxArea h4').eq(0).next('ul').children('li').eq(0).click();
    } else if (clickWho === '0') {
        $('.tabAjaxArea h5[data-item="now_guid"]').click();
    } else if (clickWho === 'compare') {
        $('.tabAjaxArea h5[data-item="compare"]').click();
    } else {
        var twoClick = clickWho.split('&')[0];
        var threeClick = clickWho.split('&')[1];
        $('.tabAjaxArea h4[data-id=' + twoClick + ']').click();
        $('.tabAjaxArea h4[data-id=' + twoClick + ']').next('ul').children('li[data-id=' + threeClick + ']').click();
    }

    caculaterFn();
})