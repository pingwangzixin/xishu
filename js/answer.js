// 映射答案选项
var mapChoice = {
    '0': 'A',
    '1': 'B',
    '2': 'C',
    '3': 'D',
    '4': 'E',
    '5': 'F'
}
// 判断是否登录
// 联系我们
// var token = "JWT " + window.sessionStorage.token;
var touch_us = '<a href="feedback.html">请联系我们，反馈这个错误</a>';
function errFn(err, touch_us){
	if (err.status == 401) {
		if (token == 'JWT undefined' || token == 'JWT null') {
			$('.shade').showMsg({ptxt: '您目前还没有注册或登录~ '});
		} else {
			$('.shade').showMsg({ptxt: '系统检测,您的账号存在风险异常,请重新登录。'});
		}
	} else {
		$('.alertMsg').showMsg({isImg: 'isNo', h2txt: '未知错误'+touch_us});
	}
}
// 题目总数，期数，试卷id
var allQuestion, periods, id;
// 请求试卷
$.ajax({
    url: url_ip + '/act/paper/',
    type: 'GET',
    dataType: 'json',
    headers: { "Authorization": token },
    data: {},
    success: function(res) {
        // console.log(res)
        if(res.status) {
            if(res.msg && res.msg === '暂无上架试卷') {
                $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: `${res.msg}`, setTime: 3000 });
            }
            else {
                periods = res.data[0].name;
                id = res.data[0].id;
                // $('.periods span').html(`(${res.data[0].add_time}期)`);
                $('.periods span').html(`${res.data[0].name}`);
                allQuestion = res.data[0].all_question;
                $('.finished span').html(`(0/${allQuestion.length})`)
                for(var i = 0; i < res.data[0].all_question.length; i++) {
                    if(res.data[0].all_question[i].course_id === 2) {
                        var inli = '';
                        for(var j = 0; j < res.data[0].all_question[i].choice.length; j++) {
                            var inLiHtml = `
                                <label class="check-choice"><input type="checkbox" value=${j} name=id${res.data[0].all_question[i].id}>${mapChoice[j]}.${res.data[0].all_question[i].choice[j]}</label>
                            `
                            inli += inLiHtml;
                        }
                        var lihtml = `
                            <li class="hideStem" data-num=${i}>
                                <div class="title"><span>${i+1}</span>、${res.data[0].all_question[i].stem}(多选)</div>
                                <ul class="answerul" data-id=${res.data[0].all_question[i].id}>
                                    ${inli}
                                </ul>
                            </li>
                        `
                        $('.part2 main .out').append(lihtml);
                    }
                    else {
                        var rainli = '';
                        for(var j = 0; j < res.data[0].all_question[i].choice.length; j++) {
                            var rainLiHtml = `
                            <label class="radio-choice"><input type="radio" value=${j} name=id${res.data[0].all_question[i].id}>${mapChoice[j]}.${res.data[0].all_question[i].choice[j]}</label>
                            `
                            rainli += rainLiHtml;
                        }
                        var ralihtml = `
                            <li class="hideStem" data-num=${i}>
                            <div class="title"><span>${i+1}</span>、${res.data[0].all_question[i].stem}(单选)</div>
                                <ul class="answerul" data-id=${res.data[0].all_question[i].id}>
                                    ${rainli}
                                </ul>
                            </li>
                        `
                        $('.part2 main .out').append(ralihtml);
                    }
                }
            }
        }
        else {
            $.ajax({
                url: url_ip + '/act/review/',
                dataType: 'json',
                headers: { "Authorization": token },
                type: 'GET',
                data: {
                    user_paper_id: res.paper_id
                },
                success: function(res) {
                    // console.log(res)
                    // $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: `已完成本期练习,请前往本期练习结果查看详情`, setTime: 3000 });
                    // 使用中
                    if(res.paper_status === 2) {
                        $('.periods span').html(`${res.paper_name}`)
                        $('.out').addClass('disabled');
                        $('.submit').hide();
                        $('.origin').hide();
                        $('.current').show();
                        $('.process li:eq(0) .circle').addClass('ok');
                        $('.process li:eq(1) .circle').addClass('ok');
                        $('.process .line:eq(0)').addClass('on')
                        $('.process .line:eq(1)').addClass('on')
                        $('.process li:eq(2) .circle').addClass('ing');
                        $('.testResult h5 span').html(`总题数: ${res.data.length}`);
                        $('.testResult .top .right_num').html(res.score);
                        $('.testResult .top .c_num').html(res.c_num);
                        $('.testResult .middle .rank').html(res.rank);
                        $('.testResult .middle .all_num').html(res.all_num);
                        $('.testResult .rf .true b').html(res.score);
                        $('.testResult .rf .false b').html(res.data.length - res.score);
                        if(res.issua.last_name && res.issua.last_name !== null) {
                            $('.current .prev').show();
                            $('.current .prev b').html(`${res.issua.last_name}`);
                            $('.current .prev').attr('data-id',`${res.issua.last_id}`)
                        }
                        else {
                            $('.current .prev').hide();
                        }
                        if(res.issua.next_name && res.issua.next_name !== null) {
                            $('.current .next').show();
                            $('.current .next b').html(`${res.issua.next_name}`);
                            $('.current .next').attr('data-id',`${res.issua.next_id}`)
                        }
                        else {
                            $('.current .next').hide();
                        }
                        // 圆环占比
                        circle(res.score,res.data);
                        // 渲染试题
                        renderTest(res.data, res.user_answer, res.true_answer)
                    }
                }
            })
        }
    },
    error: function (data) {
        errFn(data, touch_us)
    }
})
// 规则
$('.rule').hover(function() {
    $('.ruledes').toggle()
})
// 往期回顾
$.ajax({
    url: url_ip + '/act/review/',
    dataType: 'json',
    headers: { "Authorization": token },
    type: 'GET',
    data: {},
    success: function(res) {
        if(res.paper_list.length > 0) {
            var outli = ''
            for(var i = 0; i < res.paper_list.length; i++) {
                var li = `
                    <li data-id=${res.paper_list[i].paper_id}>${res.paper_list[i].add_time}期</li>
                `
                outli += li
            }
            $('.part2 .reviewlist').append(outli)
        }
        else {
            $('.part2 .reviewlist').append(`<li style="pointer-events: none">暂无往期试题</li>`)
        }
    },
    error: function (data) {
        errFn(data, touch_us)
    }
})
// 切换显影
$('.showbefore').on('mouseenter', function() {
    // $('.review').toggle();
    $('.review').show();
})
$('.reviewlist').on('mouseleave', function() {
    $('.review').hide();
})
// 点击往期试卷
$('.reviewlist').on('click', 'li', function() {
    var id = $(this).attr('data-id');
    ajaxReview(id,$(this).html().substring(0,$(this).html().length-1))
})
// 点击上一期下一期
$('.prev,.next').on('click', function() {
    ajaxReview($(this).attr('data-id'), $(this).children('b').html());
})
// 提交答案
$('.submit').on('click', function() {
    var result = []
    for(var i = 0; i < allQuestion.length; i++) {
        var obj = {id:'',answer:[]};
        $(`input[name=id${allQuestion[i].id}]:checked`).each(function() {
            obj.id = $(this).parent().parent().attr('data-id')
            obj.answer.push(+$(this).val())
        })
        if(obj.id) {
            result.push(obj);
        }
    }
    if(result.length < allQuestion.length) {
        alert('您还有题目未做答');
    }
    else {
        $.ajax({
            url: url_ip + '/act/paper/',
            type: 'POST',
            dataType: 'json',
            headers: { "Authorization": token },
            data: {
                data: JSON.stringify(result),
                name: periods,
                user_paper_id: id
            },
            success: function(res) {
                // console.log(res)
                $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: `提交成功`, setTime: 3000 });
                if(res.right_num === res.answer.length) {
                    $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: `全部答对 !恭喜您，您目前排名：${res.rank}名，您将获得以C币:${res.c_num}个，下周继续保持哦！您可前往“我的账户”进行查询`, setTime: 3000 });
                }
                setTimeout(() => {
                    location.reload();
                },2500);
                return;
                $('.out').addClass('disabled');
                $('.submit').hide();
                $('.origin').hide();
                $('.current').show();
                $('.process li:eq(1) .circle').addClass('ok');
                $('.process .line:eq(1)').addClass('on')
                $('.process li:eq(2) .circle').addClass('ing');
                $('.testResult h5 span').html(`总题数: ${res.answer.length}`);
                $('.testResult .top .right_num').html(res.right_num);
                $('.testResult .top .c_num').html(res.c_num);
                $('.testResult .middle .rank').html(res.rank);
                $('.testResult .middle .all_num').html(res.all_num);
                $('.testResult .rf .true b').html(res.right_num);
                $('.testResult .rf .false b').html(res.answer.length - res.right_num);
                $('.current .showbefore').hide();
                // 答案解析
                $('.hideStem').each(function() {
                    for(var i = 0; i < res.answer.length; i++) {
                        if(+$(this).children('.answerul').attr('data-id') === res.answer[i].id) {
                            $(this).append(`<p class="analysis">答案解析：${res.answer[i].analysis}</p>`)
                        }
                    }
                })
                // 答案重新渲染
                for(var i = 0; i < res.answer.length; i++) {
                    if(res.answer[i].answer.length > 1) {
                        var value = [];
                        $(`input[name=id${res.answer[i].id}]`).each(function() {
                            if($(this).is(':checked')) {
                                value.push(+$(this).val())
                            }
                        })
                        if(compare(value, res.answer[i].answer)) {
                            $(`input[name=id${res.answer[i].id}]:checked`).each(function() {
                                $(this).parent().addClass('show-right');
                                $(this).css('border', 'none')
                            })
                        }
                        else {
                            for(var j = 0; j < res.answer[i].answer.length; j++) {
                                $(`input[name=id${res.answer[i].id}]`).each(function() {
                                    if (+$(this).val() === +res.answer[i].answer[j] && !$(this).parent().hasClass('check-choice-on') && res.answer[i].answer.indexOf(+$(this).val()) !== -1) {
                                        $(this).parent().addClass('show-right');
                                        $(this).parent().addClass('check-choice-on');
                                    }
                                    else if(+$(this).val() !== +res.answer[i].answer[j] && $(this).parent().hasClass('check-choice-on') && res.answer[i].answer.indexOf(+$(this).val()) === -1) {
                                        $(this).parent().removeClass('check-choice-on');
                                        $(this).parent().css('color', '#F27743');
                                        $(this).parent().addClass('show-false');
                                        $(this).css('border', 'none');
                                    }
                                    else if(+$(this).val() === +res.answer[i].answer[j] && $(this).parent().hasClass('check-choice-on') && res.answer[i].answer.indexOf(+$(this).val()) !== -1) {
                                        $(this).parent().addClass('show-right');
                                    }
                                    else if(+$(this).val() === +res.answer[i].answer[j] && !$(this).parent().hasClass('check-choice-on') && res.answer[i].answer.indexOf(+$(this).val()) !== -1) {
                                        $(this).parent().addClass('show-right');
                                        $(this).parent().addClass('check-choice-on');
                                    }
                                    
                                })
                            }
                        }
                        
                    }
                    else {
                        $(`input[name=id${res.answer[i].id}]`).each(function() {
                            if(+$(this).val() === +res.answer[i].answer[0] && $(this).parent().hasClass('radio-choice-on')) {
                                $(this).parent().addClass('show-right');
                                $(this).css('border', 'none')
                            }
                            else if(+$(this).val() !== +res.answer[i].answer[0] && $(this).parent().hasClass('radio-choice-on')) {
                                $(this).parent().removeClass('radio-choice-on');
                                $(this).parent().css('color', '#F27743');
                                $(this).parent().addClass('show-false');
                                $(this).css('border', 'none');
                            }
                            else if(+$(this).val() === +res.answer[i].answer[0] && !$(this).parent().hasClass('radio-choice-on')){
                                $(this).attr('checked', true);
                                $(this).parent().addClass('radio-choice-on').siblings().removeClass('radio-choice-on');
                                $(this).parent().addClass('show-right');
                                $(this).css('border', 'none');
                            }
                        })
                    }
                }
                // 圆环图
                circle(res.right_num,res.answer);
            },
            error: function (data) {
                errFn(data, touch_us)
            }
        })
    }
})
$('body').on('click', '.check-choice', function() {
    process();
    if($(this).children().is(':checked')) {
        $(this).addClass('check-choice-on');
    }
    else {
        $(this).removeClass('check-choice-on');
    }
})
$('body').on('click', '.radio-choice', function() {
    process();
    $(this).addClass('radio-choice-on').siblings().removeClass('radio-choice-on')
});
function ajaxReview(id, number) {
    $.ajax({
        url: url_ip + '/act/review/',
        dataType: 'json',
        headers: { "Authorization": token },
        type: 'GET',
        data: {
            user_paper_id: id
        },
        success: function(res) {
            if(res.paper_status === 2) {
                $('.out').addClass('disabled');
                $('.submit').hide();
                $('.origin').hide();
                $('.current').show();
                $('.formerly').hide();
                $('.process li:eq(0) .circle').addClass('ok');
                $('.process li:eq(1) .circle').addClass('ok');
                $('.process .line:eq(0)').addClass('on')
                $('.process .line:eq(1)').addClass('on')
                $('.process li:eq(2) .circle').addClass('ing');
                $('.testResult h5 span').html(`总题数: ${res.data.length}`);
                $('.testResult .top .right_num').html(res.score);
                $('.testResult .top .c_num').html(res.c_num);
                $('.testResult .middle .rank').html(res.rank);
                $('.testResult .middle .all_num').html(res.all_num);
                $('.testResult .rf .true b').html(res.score);
                $('.testResult .rf .false b').html(res.data.length - res.score);
                if(res.issua.last_name) {
                    $('.current .prev').show();
                    $('.current .prev b').html(`${res.issua.last_name}`);
                    $('.current .prev').attr('data-id',`${res.issua.last_id}`)
                }
                else {
                    $('.current .prev').hide();
                }
                if(res.issua.next_name) {
                    $('.current .next').show();
                    $('.current .next b').html(`${res.issua.next_name}`);
                    $('.current .next').attr('data-id',`${res.issua.next_id}`)
                }
                else {
                    $('.formerly .next').hide();
                }
                // 圆环占比
                circle(res.score,res.data);
                // 渲染试题
                renderTest(res.data, res.user_answer, res.true_answer)
            }
            else {
                $('.formerly').show();
                $('.origin').hide();
                $('.current').hide();
                $('.formerly h2 span').html(`${number}`);
                $('.formerly h5 span').html(`总题数: ${res.data.length}`);
                $('.formerly .top .right_num').html(res.score);
                $('.testResult .top .c_num').html(res.c_num);
                $('.formerly .middle .true b').html(res.score);
                $('.formerly .middle .false b').html(res.data.length - res.score);
                $('.formerly .statistics .rank').html(res.rank);
                $('.formerly .statistics .all_num').html(res.all_num);
                if(res.c_num > 0) {
                    $('.formerly .bottom').html(`答对${res.score}道题，您本次获得C币：${res.c_num}个，您目前排名：${res.rank}名，下周继续加油哦！您可前往“我的账户”进行查询。`)
                }
                else {
                    $('.formerly .bottom').html('很遗憾，这次发挥得不太好，没能得到C币，下周继续努力哦！')
                }
                if(res.issua.last_name) {
                    $('.formerly .prev').show();
                    $('.formerly .prev b').html(`${res.issua.last_name}`);
                    $('.formerly .prev').attr('data-id',`${res.issua.last_id}`)
                }
                else {
                    $('.formerly .prev').hide();
                }
                if(res.issua.next_name) {
                    $('.formerly .next').show();
                    $('.formerly .next b').html(`${res.issua.next_name}`);
                    $('.formerly .next').attr('data-id',`${res.issua.next_id}`)
                }
                else {
                    $('.formerly .next').hide();
                }
            }
        },
        error: function (data) {
			errFn(data, touch_us)
		}
    })
}
// 答题进度
function process(){
    var result = []
    for(var i = 0; i < allQuestion.length; i++) {
        var obj = {id:'',answer:[]};
        $(`input[name=id${allQuestion[i].id}]:checked`).each(function() {
            obj.id = $(this).parent().parent().attr('data-id');
            obj.answer.push(+$(this).val());
        })
        if(obj.id) {
            result.push(obj);
        }
    }
    $('.finished span').html(`(${result.length}/${allQuestion.length})`);
    if(result.length === allQuestion.length) {
        $('.process li:eq(0) .circle').addClass('ok').removeClass('ing');
    }
    else if(0 < result.length && result.length < allQuestion.length) {
        $('.process .line:eq(0)').addClass('on');
        $('.process li:eq(0) .circle').addClass('ing').removeClass('ok');
    }
    else if(+result.length === 0) {
        $('.process .line:eq(0)').removeClass('on');
        $('.process li:eq(0) .circle').removeClass('ing').removeClass('ok');
    }
}
// 比较答案是否相同
function compare(own, right) {
    if(own.length !== right.length) {
        return false;
    }
    else {
        for(var i in right) {
            if(right[i] !== own[i]) {
                return false;
            }
            else {
                return true
            }
        }
    }
}
// 圆环占比图
function circle(right_num,answer) {
    //先是leftContent旋转角度从0增加到180度，
    //然后是rightContent旋转角度从0增加到180度
    var angle = right_num/answer.length*360;
    // console.log(right_num,answer)
    // angle = 126;
    // console.log(angle)
    var timerId = setInterval(function(){
        if(angle < 180 && angle > 0){
            $('.con .left').css('transform', `rotate(${180}deg)`);
            $('.con .right').css('transform', `rotate(${angle-180}deg)`);
            clearInterval(timerId);
        }else if(+angle === 0){
            $('.con .left').css('transform', `rotate(${angle-180}deg)`);
            $('.con .right').css('transform', `rotate(${angle+180}deg)`);
        }
        else {
            $('.con .left').css('transform', `rotate(${angle}deg)`);
            clearInterval(timerId);
        }
        setPercent(right_num, answer.length);
    },500);
    function setPercent(right,allQuestion){
        $(".con .cover .per").html(`${parseInt(right*100/allQuestion)}%`)
    }
}
// 循环渲染已完成试题(试题、用户答案、正确答案)
function renderTest(test, userA, rightA) {
    $('.part2 main .out').empty();
    // 先渲染题目
    for(var i = 0; i < test.length; i++) {
        if(test[i].course_id === 2) {
            var inli = '';
            for(var j = 0; j < test[i].choice.length; j++) {
                var inLiHtml = `
                    <label class="check-choice"><input type="checkbox" value=${j} name=id${test[i].id}>${mapChoice[j]}.${test[i].choice[j]}</label>
                `
                inli += inLiHtml;
            }
            var lihtml = `
                <li class="hideStem" data-num=${i}>
                    <div class="title"><span>${i+1}</span>、${test[i].stem}(多选)</div>
                    <ul class="answerul" data-id=${test[i].id}>
                        ${inli}
                    </ul>
                </li>
            `
            $('.part2 main .out').append(lihtml);
        }
        else {
            var rainli = '';
            for(var j = 0; j < test[i].choice.length; j++) {
                var rainLiHtml = `
                <label class="radio-choice"><input type="radio" value=${j} name=id${test[i].id}>${mapChoice[j]}.${test[i].choice[j]}</label>
                `
                rainli += rainLiHtml;
            }
            var ralihtml = `
                <li class="hideStem" data-num=${i}>
                <div class="title"><span>${i+1}</span>、${test[i].stem}(单选)</div>
                    <ul class="answerul" data-id=${test[i].id}>
                        ${rainli}
                    </ul>
                </li>
            `
            $('.part2 main .out').append(ralihtml);
        }
    }
    // 渲染解析
    $('.hideStem').each(function() {
        for(var i = 0; i < test.length; i++) {
            if(+$(this).children('.answerul').attr('data-id') === test[i].id) {
                if($(this).find('.analysis').length === 0) {
                    $(this).append(`<p class="answer_show"><span>正确答案:&nbsp;${transformAnswer(rightA)[i]}</span><span>您的答案:&nbsp;${transformAnswer(userA)[i]}</span></p>`)
                    $(this).append(`<p class="analysis">答案解析：${test[i].analysis}</p>`)
                }
            }
        }
    })
    function transformAnswer(answer) {
        var newArray = [];
        for(var i = 0; i<answer.length; i++) {
            if(answer[i].length === 1) {
                newArray.push(mapChoice[answer[i]])
            }
            else {
                var backup = []
                for(var j = 0; j < answer[i].length; j++) {
                    backup.push(mapChoice[answer[i][j]])
                }
                newArray.push(backup)
            }
        }
        return newArray;
    }
    // 渲染用户答案
    if(userA.length === 0) {
        return;
    }
    else {
        for(var i = 0; i < userA.length; i++) {
            $('.hideStem').eq(i).each(function() {
                if(userA[i].length === 1) {
                    $(this).find('input').each(function() {
                        if(+$(this).val() === userA[i][0]) {
                            $(this).attr('checked', true);
                            $(this).parent().addClass('radio-choice-on').siblings().removeClass('radio-choice-on')
                        }
                    })
                }
                else {
                    for(var j = 0; j < userA[i].length; j++) {
                        $(this).find('input').each(function() {
                            if(+$(this).val() === userA[i][j]) {
                                $(this).attr('checked', true);
                                $(this).parent().addClass('check-choice-on');
                            }
                        })
                    }
                }
            })
        }
    }
    // 渲染标准答案
    for(var i = 0; i < test.length; i++) {
        if(test[i].answer.length > 1) {
            var value = [];
            $(`input[name=id${test[i].id}]`).each(function() {
                if($(this).is(':checked')) {
                    value.push(+$(this).val())
                }
            })
            if(compare(value, test[i].answer)) {
                $(`input[name=id${test[i].id}]:checked`).each(function() {
                    $(this).parent().addClass('show-right');
                    $(this).css('border', 'none')
                })
            }
            else {
                for(var j = 0; j < test[i].answer.length; j++) {
                    $(`input[name=id${test[i].id}]`).each(function() {
                        if(test[i].answer.indexOf(+$(this).val()) >= 0 || test[i].answer.indexOf($(this).val()) >= 0) {
                            $(this).parent().addClass('show-right');
                            $(this).parent().addClass('check-choice-on');
                        }
                        else if (test[i].answer.indexOf(+$(this).val()) < 0 && userA[i].indexOf(+$(this).val()) >= 0) {
                            $(this).parent().removeClass('check-choice-on');
                            $(this).parent().removeClass('radio-choice-on');
                            $(this).parent().css('color', '#F27743');
                            $(this).parent().addClass('show-false');
                            $(this).css('border', 'none');
                        }
                    })
                }
            }
        }
        else {
            $(`input[name=id${test[i].id}]`).each(function() {
                if(+$(this).val() === +test[i].answer[0] && $(this).parent().hasClass('radio-choice-on')) {
                    $(this).parent().addClass('show-right');
                    $(this).css('border', 'none')
                }
                else if(+$(this).val() !== +test[i].answer[0] && userA[i].indexOf(+$(this).val()) !== -1) {
                    $(this).parent().removeClass('radio-choice-on');
                    $(this).parent().css('color', '#F27743');
                    $(this).parent().addClass('show-false');
                    $(this).css('border', 'none');
                }
                else if(+$(this).val() === +test[i].answer[0] && !$(this).parent().hasClass('radio-choice-on')){
                    $(this).parent().addClass('radio-choice-on').siblings().removeClass('radio-choice-on');
                    $(this).parent().addClass('show-right');
                    $(this).css('border', 'none');
                }
            })
        }
    }
}

// 退出登录
$('.login-alert[data-to=back]').on('click', '.msg-close', function() {
    window.location.href = 'index.html';
})