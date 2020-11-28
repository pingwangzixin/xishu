$(function () {

    'use strict';
    var $citypicker1 = $('#city-picker1');

    $citypicker1.citypicker();

    var $citypicker2 = $('#city-picker2');

    var $citypicker3 = $('#city-picker3');

    $('#reset').click(function () {
        $citypicker3.citypicker('reset');
    });

    $('#destroy').click(function () {
        $citypicker3.citypicker('destroy');
    });

});

(function($) {
    // {isImg: isImg(isNo, isOk), h2txt: h2txt, ptxt: ptxt, cllbackFn: cllbackFn, setTime: setTime}
    // isImg: isOk(默认),isNo
    // 用法示例: $('.shade').showMsg(); $('.shade').showMsg({h2txt: '我是标题'});
    // setTime(int)延时关闭时间, 不填默认不自动关闭, 类型错误时默认3000ms
    $.fn.showMsg = function(obj) {
        $(this).fadeIn();
        $(this).removeClass('hide')
        $(this).find('h6').removeClass('isOk isNo');
        // $(this).find('h6').removeClass('isNo')
        if (obj) {
            obj.isImg ? $(this).find('h6').addClass(obj.isImg) : $(this).find('h6').addClass('isOk');
            obj.h2txt ? $(this).find('h2').html(obj.h2txt) : '';
            obj.ptxt ? $(this).find('p').html(obj.ptxt) : $(this).find('p').html('');
            if (obj.cllbackFn) { //回调函数
                obj.cllbackFn();
            }
        }
        if (obj.setTime) {
            var _this = this;
            var _needNum = '';
            clearTimeout(_close_alertmsg);
            _close_alertmsg = setTimeout(function() {
                $(_this).fadeOut();
            }, obj.setTime)
        }
    }
})(jQuery)

