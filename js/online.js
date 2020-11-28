// var token = "JWT " + window.sessionStorage.token;
////console.log(url_ip)
////console.log(token)
/* lkw 20181030 S */
// function calH() {
//     var index_conUlH = $('.online_index').outerHeight() - $('.index_title').outerHeight() - $('.index_inputBox').outerHeight() - $('.index_con h2').outerHeight();
//     $('.index_con ul').outerHeight(index_conUlH);
// }

function newUlchildFn() {
    $('.mb_content .mb_yy').children("div").remove();
    $.ajax({
        async: true,
        type: "GET",
        cache: false,
        url: url_ip + '/examine/showtemplates/',
        data: {},
        dataType: "json",
        headers: { "Authorization": token },
        success: function(res) {
            // console.log(res)
            if (res.status) {
                // var oHtml1 = '';
                // var oHtml2 = '';
                // for (var i = 0; i < res.data1.length; i++) {
                //     oHtml1 += '<li><div><img src="../img/online_jd.png"></div><span>' + res.data1[i].tem_name + '</span><b style="display: none;">' + res.data1[i].contetn + '</b></li>'
                // }
                // for (var j = 0; j < res.data2.length; j++) {
                //     oHtml2 += '<li><div><img src="../img/online_fjd.png"></div><span>' + res.data2[j].tem_name + '</span><b style="display: none;">' + res.data2[j].contetn + '</b></li>'
                // }
                // $('.index_con ul').append(oHtml1 + oHtml2)
                var oHtml1 = '';
                var oHtml2 = '';
                for (var i = 0; i < res.data1.length; i++) {
                    oHtml1 += '<div><img src="../img/sf_is_jd' + i + '.png"><p>' + res.data1[i].tem_name + '</p><b>' + res.data1[i].contetn + '</b></div>'
                }
                for (var j = 0; j < res.data2.length; j++) {
                    oHtml2 += '<div><img src="../img/sf_xj.png"><p>' + res.data2[j].tem_name + '</p><b>' + res.data2[j].contetn + '</b></div>'
                }
                $('.mb_content .mb_yy').append(oHtml1 + oHtml2);
            } else {
                // alertmsg(res.msg, '', 0);
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: res.msg,
                    ptxt: '',
                    setTime: 2000
                });
            }
        },
        error: function(err) {
            //console.log(err)
        }
    })
}
/* lkw 20181030 N */
// 新弹窗获取新值
function getNewJson() {
    var labels = {
        alg_labels: { key1: [], key2: [], key3: [] },
        ids_labels: { key1: [], key2: [], key3: [] },
        allChoiseTxtArr: []
    };
    let arr1 = [];
    var oul_01Html = $('.sf_save_boxcd3_bq');
    if (oul_01Html.children('div.on').length != 0) {
        for (var i = 0; i < oul_01Html.children('div.on').length; i++) {
            labels.allChoiseTxtArr.push(oul_01Html.children('div.on').eq(i).attr('data-id'));
            // labels.allChoiseTxtArr.push(oul_01Html.children('li').eq(i).find('span').text());
            // var needType = oul_01Html.children('li').eq(i).attr('data-type') - 0; // 1.算法 2.数据 3.用户
            // var needI = oul_01Html.children('li').eq(i).attr('data-i') - 0;
            // var needId = oul_01Html.children('li').eq(i).attr('data-id') - 0;
            // if(needType == 1) {
            // 	if(needI == 0) {
            // 		labels.alg_labels.key1.push(needId)
            // 	} else if(needI == 1) {
            // 		labels.alg_labels.key2.push(needId)
            // 	} else if(needI == 2) {
            // 		labels.alg_labels.key3.push(needId)
            // 	}
            // } else if(needType == 2) {
            // 	if(needI == 0) {
            // 		labels.ids_labels.key1.push(needId)
            // 	} else if(needI == 1) {
            // 		labels.ids_labels.key2.push(needId)
            // 	} else if(needI == 2) {
            // 		labels.ids_labels.key3.push(needId)
            // 	}
            // }
        }
    }
    let arr2 = [];
    var ou2_01Html = $('.sf_save_boxcd4_zbq');
    if (ou2_01Html.children('div').length != 0) {
        for (var i = 0; i < ou2_01Html.children('div').length; i++) {
            arr2.push(ou2_01Html.children('div').eq(i).attr('data-txt'))
        }
    }
    // labels.three_label = JSON.stringify(arr1);
    var custom_label = JSON.stringify(arr2);
    var labels = JSON.stringify(labels);
    return { labels: labels, custom_label: custom_label };
}
// 顶部导航栏
$(function() {
    /* lkw 20181030 S */
    // calH();
    newUlchildFn()
        /* lkw 20181030 N */
        /* lkw20181225登录页 */
    $('.shade .lkw-msg-box-btn span.ok a').attr('href', '../login.html');
    $('.shade .lkw-msg-box-btn span.no a').attr('href', '../register.html');
    if (token == 'JWT undefined' || token == 'JWT null') {
        $('.shade').show();
    }
    $('.hint_logo_cancel').on('click', function() {
        $('.mu').hide();
        $('#hint_login').hide();
        window.location.href = '../index.html'
    })
    var num = 4;
    var nob = 1;
    var _tid;
    var data_result;
    var test = 0
    var adopt = 1
    var configuration = {};
    var is_jiandu; /*判断是否为监督学习*/
    var code_html = ''; /*获取到的原始代码，用以判断是否更改代码*/
    test = window.location.search.substr(3)
    adopt = window.location.search.substr(1, 1);
    // 判断是否修改
    if (test != 0) {
        $('.create_mask').hide()
        if (adopt == 0) {
            $('.progress_c i').remove('on', 'no')
            $('.progress_c span').remove('on', 'no')
            $('.progress_c i:lt(3)').addClass('on')
            $('.progress_c span:lt(2)').addClass('on')
            $('.progress_c i:eq(3)').addClass('no')
            $('.progress_c i:eq(3) b').html('未通过')
            $('.progress_c span:eq(2)').addClass('no')
        } else if (adopt == 1) {
            $('.progress_c i').remove('on', 'no')
            $('.progress_c span').remove('on', 'no')
            $('.progress_c i').addClass('on')
            $('.progress_c span').addClass('on')
            $('.progress_c i:eq(3) b').html('通过')
        } else if (adopt == 2) {
            $('.progress_c i').remove('on', 'no')
            $('.progress_c span').remove('on', 'no')
            $('.progress_c i:lt(3)').addClass('on')
            $('.progress_c span:lt(2)').addClass('on')
        }
        var backupData;
        $.ajax({
            type: "GET",
            url: url_ip + "/examine/upalgocrud/?id=" + test + "&adopt=" + adopt,
            async: false,
            data: {},
            dataType: "json",
            headers: { "Authorization": token },
            beforeSend: function() {
                $('.mu').show();
                $('.loading').show();
                clearInterval(_tid)
                var a = 0;
                _tid = setInterval(function() {
                    a += 22.5
                    $('.loading').css('transform', 'rotate(' + a + 'deg)')
                }, 100)
            },
            success: function(data) {
                // console.log(data)
                if (data.status) {
                    var a = Base64.decode(data.data.objid)
                    code_html = a;
                    setCodeTxt(a);
                    data_result = data.data
                    write_list(data_result)
                    write_baocun(data_result)
                    configuration.csin = data.data.configuration.csin;
                    backupData = data.data;
                }
            },
            error: function(data) {
                //console.log(data)
            },
            complete: function() {
                if(backupData.selflabels.length) {
                    var selfdiv = '';
                    for(var i = 0; i < backupData.selflabels.length; i++) {
                        var slabels = `
                            <div data-txt="${backupData.selflabels[i].name}">${backupData.selflabels[i].name}<i></i></div>
                        `
                        selfdiv += slabels;
                    }
                    $('.sf_save_boxcd4_zbq').append(selfdiv);
                }
                clearInterval(_tid)
                $('.loading').hide();
                $('.mu').hide();
            }
        })
    }
    // 模板选择界面关闭
    // $('.index_close').click(function() {
    //     $('.online_index').fadeOut();
    // });
    $(".mb_title_close").on("click", function() {
        $(this).parents(".create_mask").fadeOut();
    });
    // 模板图标渲染
    var index_conliHtml = '';
    for (var i = 2; i <= 100; i++) {
        index_conliHtml += '<li name="ZJ_img1/ZJ' + i + '.fw.png"><img src="../ZJ_img1/ZJ' + i + '.fw.png"></li>'
    }
    $('.cun_model_tab').append(index_conliHtml);
    // 模板选择
    $('.mb_xj,.mb_yy').on('click', 'div', function() {
            var code = Base64.decode($(this).find('b').html());
            test = 0;
            adopt = 1;
            $(".progress_c i").removeClass("on");
            $(".progress_c span").removeClass("on");
            $(".progress_c i").eq(0).addClass("on");
            $('.cun_model_name input').val('')
            $('.cun_model_txt textarea').val('')
                // $('.cun_model_title2 input').val('')
            $('.cun_model_tab li').removeClass('on')
            $('.cun_model_tab li:eq(0)').addClass('on')
            $('.cun_model select').val('')
            $('.list_con1 input').val('')
            $('.list_con1 textarea').val('')
            $('.list_con2 div').remove()
            nob = 1
            add_list(nob);
            configuration = {}
            $('#moren').prop('checked', true);
            $('#tubiao').prop('checked', false);
            if ($(this).find('p').html() == '新建空白模板') {
                $('.create_mask').fadeOut()
                is_jiandu = true;
                setCodeTxt('')
            } else if ($(this).find('p').html() == '非监督学习模板') {
                $('.create_mask').fadeOut()
                is_jiandu = false;
                $('#oldbox .check1').removeClass('on')
                $('#oldbox .check2').removeClass('on')
                setCodeTxt(code)
            } else {
                $('.create_mask').fadeOut()
                is_jiandu = true;
                $('#oldbox .check1').removeClass('on')
                $('#oldbox .check2').removeClass('on')
                setCodeTxt(code)
            }
        })
        // 关键词点击
    $('.index_inputBox p i').click(function() {
            $('.index_inputBox input').val($(this).html())
        })
        // 搜索事件
    $('.index_input img').click(function() {
            $('.index_con li').hide()
            $('.index_con li span:contains(' + $('.index_input input').val() + ')').parent().show()
        })
        // 导航添加logo 
    $('nav').html('<div class="nav_cont" style="width:100%"><a href="../index.html" class="fl" style="margin-left:15px; line-height: 57px;"><img src="../img/logo_niu.png" style="display: inline-block; vertical-align: middle;"><span class="nav_logo_text">算法 Studio</span></a></div>')
        // 导航按钮点击样式变换事件
    $('.online_btn2').mousedown(function() {
        $('.online_btn2').removeClass('on')
        $(this).addClass('on')
    })
    $('.online_btn2').mouseup(function() {
            $('.online_btn2').removeClass('on')
        })
        // 草稿点击
    $('#draft').click(function () {
        $("#draftid").val("");
        $(".save_draft").show();

    });
    // 草稿弹窗关闭
    $(".save_draft_box>i").on("click", function() {
        $(this).parents(".save_draft").hide();
    });
    // 草稿弹窗取消
    $(".save_draft_box>div>button:first").on("click", function() {
        $(".save_draft_box>i").click();
    });
    $(".save_draft_box>div>button:last").on("click", function() {
        var value = $('#draftid').val()
        var content = Base64.encode(getCodeTxt())
        if (value == '') {
            // alertmsg('请输入模板名称', '', 0);
            $(".save_draft_box>i").click();
            $('.alertMsg').showMsg({
                isImg: 'isNo',
                h2txt: '请输入模板名称',
                ptxt: '',
                setTime: 2000
            });
            return;
        }
        if (content == '') {
            // alertmsg('您的代码为空', '', 0);
            $(".save_draft_box>i").click();
            $('.alertMsg').showMsg({
                isImg: 'isNo',
                h2txt: '您的代码为空',
                ptxt: '',
                setTime: 2000
            });
            return;
        }
        // alert(value)
        $.ajax({
            async: true,
            type: "POST",
            cache: false,
            url: url_ip + '/examine/savetemplates/',
            data: { name: value, content: content },
            dataType: "json",
            headers: { "Authorization": token },
            success: function(res) {
                if (res.status) {
                    $('.mu').hide();
                    $('.cun_model').hide();
                    $('.cun_model_name input').val('');
                    // alertmsg(res.msg, '', 1);
                    $(".save_draft_box>i").click();
                    $('.alertMsg').showMsg({
                        isImg: 'isOk',
                        h2txt: res.msg,
                        ptxt: '',
                        setTime: 2000
                    });
                } else {
                    // alertmsg(res.msg, '', 0);
                    $(".save_draft_box>i").click();
                    $('.alertMsg').showMsg({
                        isImg: 'isNo',
                        h2txt: res.msg,
                        ptxt: '',
                        setTime: 2000
                    });
                }
            },
            error: function(err) {
                //console.log(err)
            }
        })
    });

    $('#yiyou').click(function() {
            closeAllBox()
            $('.yicun>img').show()
            $('.yicun').css('right', '0');
            $('.yicun table').find("tr:eq(0)").nextAll().remove();
            // 已存算法列表获取
            var adopt_arr = ['未通过', '已通过', '审核中', '未提交']
            $.ajax({
                url: url_ip + '/examine/getuseralgo/',
                type: 'GET',
                cache: false,
                async: true,
                data: {},
                datatype: 'json',
                headers: {
                    "Authorization": token
                },
                success: function(data) {
                    // console.log(data)
                    if (data.status) {
                        for (var i = 0; i < data.data.length; i++) {
                            $('.yicun table').append('<tr adopt="' + data.data[i].adopt + '" data_id="' + data.data[i].id + '">' +
                                '<td><img src="../' + data.data[i].img + '"><span>' + data.data[i].name + '</span></td>' +
                                '<td>' + data.data[i].add_time.substr(0, data.data[i].add_time.indexOf(' ')) + '</td>' +
                                '<td><i class="status' + data.data[i].adopt + '">' + adopt_arr[data.data[i].adopt] + '</i></td>' +
                                '<td class="yicun_td_del">删除</td>' +
                                '</tr>')
                        }
                    }
                },
                error: function(data) {
                    //console.log(data)
                }
            })
        })
        // 已存算法列表关闭
    $('.yicun>p>i').click(function() {
            closeAllBox()
        })
        // 已存算法点击
    $('.yicun table').on('click', 'tr:gt(0)', function() {
        if (getCodeTxt() != '' && getCodeTxt() != code1 && getCodeTxt() != code2 && getCodeTxt() != code3 && getCodeTxt() != code4 && getCodeTxt() != code_html) {
            var a = confirm('检测到您有已编辑的代码未保存，是否先进行保存？')
            if (a) {
                $('#select_canshu').click()
            } else {
                window.location.href = "python_online.html?" + $(this).attr('adopt') + '&' + $(this).attr('data_id')
            }
        } else {
            window.location.href = "python_online.html?" + $(this).attr('adopt') + '&' + $(this).attr('data_id')
        }
    });

    // 已保存算法点击删除出现弹窗
    var thatsf;
    $(".yicun table").on("click", 'tr .yicun_td_del', function(evt) {
        evt.stopPropagation();
        $(".sf_delete_mask").show();
        thatsf = this;
    });
    // 关闭删除弹窗
    $(".sf_delete_box>i").on("click", function() {
        $(this).parents(".sf_delete_mask").hide();
    });
    // 取消删除
    $(".sf_delete_box>div>button:first").on("click", function() {
        $(".sf_delete_box>i").click();
    });
    // 确认删除
    $(".sf_delete_box>div>button:last").on("click", function() {
        var sf_name = $(thatsf).parent("tr").find("td:first>span").text();
        var sf_id = $(thatsf).parent("tr").attr("data_id");
        var sf_type = $(thatsf).parent("tr").attr("adopt");
        var sf_type2;
        switch (sf_type) {
            case "0":
                sf_type2 = "未通过";
                break;
            case "1":
                sf_type2 = "已通过";
                break;
            case "2":
                sf_type2 = "审核中";
                break;
            case "3":
                sf_type2 = "未提交";
                break;
        }
        $.ajax({
            type: "GET",
            url: url_ip + "/examine/delete_func",
            data: {
                algoname: sf_name,
                id: sf_id,
                type: sf_type2
            },
            dataType: "json",
            headers: {
                "Authorization": token
            },
            success: function(res) {
                // console.log(res);
                if (res.status) {
                    $(thatsf).parents("tr").remove();
                    $(".sf_delete_mask").hide();
                }
            }
        });
    });

    // 渲染模板代码
    // 监督学习空白模板
    var code1 = "# 监督学习读取数据模板\n" +
        "import pandas as pd\n" +
        "\n" +
        "\n" +
        "def FirstFunction(datax, datay, parameter1, parameter2):\n" +
        "    # 读取数值列和标签列的列名\n" +
        "    xcol = datax[0]\n" +
        "    ycol = datay[0]\n" +
        "\n" +
        "    # 将读入的数据转化为DataFrame格式\n" +
        "    datax = pd.DataFrame(datax[1:], columns=xcol, dtype=float)\n" +
        "    datay = pd.DataFrame(datay[1:], columns=ycol, dtype=float)\n" +
        "\n" +
        "    # 以下为自建算法逻辑区域，用户可自主编写算法功能\n" +
        "\n" +
        "    # --------------------------------------\n" +
        "\n" +
        "    #         算法逻辑区域\n" +
        "\n" +
        "    # --------------------------------------\n" +
        "\n" +
        "    # 若有图片输出,则需要编写如下代码保证图片转为字节流\n" +
        "    fig = plt.figure()\n" +
        "    plt.imshow(wc)\n" +
        "    canvas = fig.canvas\n" +
        "    buffer = io.BytesIO()\n" +
        "    canvas.print_png(buffer)\n" +
        "    ex_img = buffer.getvalue()\n" +
        "    buffer.close()\n" +
        "\n" +
        "    # 输出部分，建立名为output的空字典\n" +
        "    output = {}\n" +
        "    # 若输出的是结构化数据，则该字典的键命名为：output['data_xxxx'] = ...\n" +
        "    # 若输出的是图片数据，则该字典的键命名为：output['img_xxxx'] = ...\n" +
        "    # 假设要将一个DataFrame格式的数据result_data输出，则代码如下：\n" +
        "    # output['data_模型结果'] = [result_data.columns.tolist()] + result_data.values.tolist()\n" +
        "    # output['img_模型图片'] = ex_img\n" +
        "    return output\n" +
        "\n" +
        "\n" +
        'if __name__ == "__main__":\n' +
        "    # 监督学习读取数值列、标签列数据\n" +
        "    # 此时datax, datay数据为嵌套list格式\n" +
        "    # 以鸢尾花数据为例，此时读入数据的格式如下所示\n" +
        "    # datax = [['萼片长(cm)', '萼片宽(cm)', '花瓣长(cm)', '花瓣宽(cm)'], [5.7, 2.8, 4.5, 1.3],...]\n" +
        "    # datay = [['类型_num'], [1],...]\n" +
        "    # 调用2.0数据接口\n" +
        "    datax, datay = supervision_read_data()\n" +
        "    # 调用所编写函数并打印\n" +
        '    print(FirstFunction(datax, datay, "parameter1", "parameter2"))\n' +
        "    "
        // 非监督学习空白模板
    var code2 = "# 无监督学习读取数据模板\n" +
        "import pandas as pd\n" +
        "\n" +
        "\n" +
        "def FirstFunction(datax, parameter1, parameter2):\n" +
        "    # 读取数值列的列名\n" +
        "    col = datax[0]\n" +
        "    # 将读入的数据转化为DataFrame格式\n" +
        "    data = pd.DataFrame(datax[1:], columns=col, dtype=float)\n" +
        "\n" +
        "    # 以下为自建算法逻辑区域，用户可自主编写算法功能\n" +
        "\n" +
        "    # --------------------------------------\n" +
        "\n" +
        "    #         算法逻辑区域\n" +
        "\n" +
        "    # --------------------------------------\n" +
        "\n" +
        "    # 若有图片输出,则需要编写如下代码保证图片转为字节流\n" +
        "    fig = plt.figure()\n" +
        "    plt.imshow(wc)\n" +
        "    canvas = fig.canvas\n" +
        "    buffer = io.BytesIO()\n" +
        "    canvas.print_png(buffer)\n" +
        "    ex_img = buffer.getvalue()\n" +
        "    buffer.close()\n" +
        "\n" +
        "    # 输出部分，建立名为output的空字典\n" +
        "    output = {}\n" +
        "    # 若输出的是结构化数据，则该字典的键命名为：output['data_xxxx'] = ...\n" +
        "    # 若输出的是图片数据，则该字典的键命名为：output['img_xxxx'] = ...\n" +
        "    # 假设要将一个DataFrame格式的数据result_data输出，则代码如下：\n" +
        "    # output['data_模型结果'] = [result_data.columns.tolist()] + result_data.values.tolist()\n" +
        "    # output['img_模型图片'] = ex_img\n" +
        "    return output\n" +
        "\n" +
        "\n" +
        'if __name__ == "__main__":\n' +
        "    # 无监督学习读取数值列数据\n" +
        "    # 此时datax数据为嵌套list格式\n" +
        "    # 以鸢尾花数据为例，此时读入数据的格式如下所示\n" +
        "    # datax = [['萼片长(cm)', '萼片宽(cm)', '花瓣长(cm)', '花瓣宽(cm)'], [5.7, 2.8, 4.5, 1.3],...]\n" +
        "    # 调用2.0的数据接口\n" +
        "    datax = nosupervision_read_data()\n" +
        "    # 调用所编写函数并打印\n" +
        '    print(FirstFunction(datax, "parameter1", "parameter2"))'
        // 监督学习实例模板
    var code3 = '# 监督学习实例模板\n' +
        'import pandas as pd, io\n' +
        'from sklearn.linear_model import LogisticRegression\n' +
        'import matplotlib\n' +
        'matplotlib.use("Agg")\n' +
        'import matplotlib.pyplot as plt\n' +
        'from sklearn import model_selection\n' +
        '\n' +
        '# 调用2.0数据接口 \n' +
        'datax,datay = supervision_read_data()\n' +
        '\n' +
        '# 逻辑回归\n' +
        'def logic(datax, datay, test_size, random_state):\n' +
        '    NAME = "logic_func"\n' +
        '    CLASS = "Supervised"\n' +
        '\n' +
        '    datax = pd.DataFrame(datax[1:], columns=datax[0],dtype=float)\n' +
        '    datay = pd.DataFrame(datay[1:], columns=datay[0],dtype=float)\n' +
        '\n' +
        '    # 将数据分按比例划分测试集合训练集\n' +
        '    X_train, X_test, y_train, y_test = model_selection.train_test_split(\n' +
        '        datax, datay, test_size=test_size,random_state=random_state)\n' +
        '    # 实例化逻辑回归类\n' +
        '    model = LogisticRegression()\n' +
        '    # 训练逻辑回归模型\n' +
        '    model.fit(X_train, y_train)\n' +
        '    # 预测y的值\n' +
        '    y_pred = model.predict(X_test)\n' +
        '    # 查看测试结果\n' +
        '\n' +
        '    X_test.insert(X_test.shape[1], "y_correct", y_test)\n' +
        '    X_test.insert(X_test.shape[1], "y_pred", y_pred)\n' +
        '\n' +
        '    # 观察训练数据的分布情况,将图片转化成btyps\n' +
        '    fig = plt.figure()\n' +
        '    plt.scatter(X_train.values, X_train.values, marker="o")\n' +
        '    canvas = fig.canvas\n' +
        '    buffer = io.BytesIO()\n' +
        '    canvas.print_png(buffer)\n' +
        '    data1 = buffer.getvalue()\n' +
        '    buffer.close()\n' +
        '\n' +
        '    # 观察测试数据的分布情况,将图片转化成btyps\n' +
        '    fig1 = plt.figure()\n' +
        '    plt.scatter(y_train.values, y_train.values,marker="o")\n' +
        '    canvas1 = fig1.canvas\n' +
        '    buffer1 = io.BytesIO()\n' +
        '    canvas1.print_png(buffer1)\n' +
        '    data2 = buffer1.getvalue()\n' +
        '    buffer1.close()\n' +
        '\n' +
        '\n' +
        '    output = {}\n' +
        '    output["dataTable_predict"] = [list(X_test.columns)\n' +
        '        ] + X_test.values.tolist()\n' +
        '    output["dataTable_trainData"] = [list(X_train.columns)\n' +
        '        ] + X_train.values.tolist()\n' +
        '    output[u"dataChart_训练数据分布情况"] = data1\n' +
        '    output[u"dataChart_预测数据分布情况"] = data2\n' +
        '    output["function_name"] = NAME\n' +
        '    output["function_class"] = CLASS\n' +
        '    return output\n' +
        '    \n' +
        'print(logic(datax,datay,0.2, 1))'
    var code4 = '# 非监督学习实例模板\n' +
        'import pandas as pd,io\n' +
        'import numpy as np\n' +
        'import matplotlib\n' +
        'matplotlib.use("Agg")\n' +
        'import matplotlib.pyplot as plt\n' +
        'import scipy.spatial.distance as dist\n' +
        'import scipy.cluster.hierarchy as sch\n' +
        '\n' +
        '# 调用2.0的数据接口  \n' +
        'datax = nosupervision_read_data()\n' +
        '\n' +
        '# 标签编码\n' +
        'def Hcluster(data1, metric, method):\n' +
        '    NAME = "Hcluster_func"\n' +
        '    CLASS = "Clustering"\n' +
        '\n' +
        '    data = pd.DataFrame(data1[1:], columns=data1[0])\n' +
        '    dataMatrix = np.array(data.values)\n' +
        '    distMatrix = dist.pdist(dataMatrix, metric, 2)\n' +
        '    distSquareMatrix = dist.squareform(distMatrix)\n' +
        '    Z = sch.linkage(distSquareMatrix, method)\n' +
        '\n' +
        '    # 将图片转化成btype\n' +
        '    Dendrogram = plt.figure(figsize=(10, 5))\n' +
        '    sch.dendrogram(Z)\n' +
        '    canvas = Dendrogram.canvas\n' +
        '    buffer = io.BytesIO()\n' +
        '    canvas.print_png(buffer)\n' +
        '    # 训练集决策边界图\n' +
        '    dendrogram_data = buffer.getvalue() \n' +
        '    buffer.close()\n' +
        '\n' +
        '    # 根据linkage matrix Z得到聚类结果:\n' +
        '    cluster = sch.fcluster(Z, t=0.8, criterion="inconsistent")\n' +
        '    data.insert(1, "cluster", cluster)\n' +
        '    title = [list(data.columns)]\n' +
        '    output = {}\n' +
        '    output[u"dataChart_树状图"] = dendrogram_data\n' +
        '    output[u"dataTable_平方距离矩阵"] = distSquareMatrix.tolist()\n' +
        '    output["dataTable_1"] = title + data.values.tolist()\n' +
        '    output["function_name"] = NAME\n' +
        '    output["function_class"] = CLASS\n' +
        '\n' +
        '    return output\n' +
        'print(Hcluster(datax,"braycurtis","single"))'
        /*关闭所有弹窗操作*/
    function closeAllBox() {
        $('.CodeMirror').css({ height: 'calc(100vh - 60px)' })
        $('#oldbox').css('right', '-300px')
        $('#code1').css('right', '-50%')
        $('#code2').css('right', '-50%')
        $('.list').css('right', '-100%');
        $('.code img').hide()
        $('.yicun').css('right', '-345px');
        $('.yicun>img').hide();
        $('#lkw_trydo').css({ height: 0, width: 0, padding: 0 }); //lkw 201812311733 关闭底部上划弹窗
    }
    // 示例code点击事件
    $('#txt').click(function() {
            closeAllBox();
            // if (is_jiandu) {
            $('#code1').css('right', '0');
            //     $('.code_img1').show()
            // } else {
            //     $('#code2').css('right', '0')
            //     $('.code_img2').show()
            // }
        })
        // 示例Code关闭事件
    $('.code>div>i').click(function() {
            closeAllBox();
        })
        // 示例code下拉
    $(".yicun_demo_xl>p").on("click", "b", function() {
            if ($(".yicun_demo_xl>ul").css("display") == "none") {
                $(".yicun_demo_xl>ul").show();
            } else {
                $(".yicun_demo_xl>ul").hide();
            }
        })
        // 示例code选择
    $(".yicun_demo_xl>ul>li").on("click", function() {
            $(".yicun_demo_xl>p").html($(this).text() + "<b></b>");
            $(".yicun_demo_xl>ul").hide();
            $(".yicun_code>div").eq($(this).index()).show().siblings().hide();
        })
        // “新建”点击事件
    $('#new').click(function() {
            if (getCodeTxt() != '' && getCodeTxt() != code1 && getCodeTxt() != code2 && getCodeTxt() != code3 && getCodeTxt() != code4 && getCodeTxt() != code_html) {
                var a = confirm('检测到您有已编辑的代码未保存，是否先进行保存？')
                if (a) {
                    $('#select_canshu').click()
                } else {
                    $('.create_mask').fadeIn()
                }
            } else {
                $('.create_mask').fadeIn()
            }
            /* 20181030 lkw s */
            newUlchildFn();
            /* 20181030 lkw N */
        })
        // 修改时的参数列表渲染封装
    function write_list(data) {
        // console.log(data)
        if (data.configuration.defname) {
            $('.defname').val(data.configuration.defname)
        }
        if (data.configuration.x_msg) {
            $('.x_msg').val(data.configuration.x_msg)
        }
        if (data.configuration.y_msg) {
            if (data.configuration.y_msg != ' ') {
                $('.y_msg').val(data.configuration.y_msg)
            } else {
                $('.y_msg').val('')
            }
            $('#is_jiandu').prop('checked', true)
            is_jiandu = true
        } else {
            $('.y_msg').val('')
            $('#is_jiandu').prop('checked', false)
            is_jiandu = false;
        }
        if (data.configuration.csin && data.configuration.csin.length != 0) {
            $('.list_con2').empty();
            nob = data.configuration.csin.length;
            for (var i = 0; i < data.configuration.csin.length; i++) {
                var div = document.createElement('div');
                var j = i + 1;
                if (!data.configuration.csin[i].parameter) {
                    data.configuration.csin[i].parameter = '匹配失败'
                }
                if (!data.configuration.csin[i].first) {
                    data.configuration.csin[i].first = '-∞';
                }
                if (!data.configuration.csin[i].last) {
                    data.configuration.csin[i].last = '+∞';
                }
                var html1 = '<i>No.<b>' + j + '</b></i>' +
                    '<div style="overflow:hidden;"><span>参数名设置 : </span><input type="text" placeholder="请输入算法参数名" value="' + data.configuration.csin[i].name + '"><b class="marry">对应参数变量：<s>' + data.configuration.csin[i].parameter + '</s></b></div>' +
                    '<div style="overflow:hidden;"><span>参数的说明 : </span><input type="text" placeholder="非必填项,可为空" value="' + data.configuration.csin[i].describe + '" class="long_input"></div>'
                $(div).append(html1);
                var html2;
                if (data.configuration.csin[i].type == 'string') {
                    html2 = '<div style="overflow:hidden;"><span>参数值类型 : </span><input type="radio" name="type' + j + '" value="string" checked><span>string(字符型)</span> <input type="radio" name="type' + j + '" value="int"><span>int(数值型)</span> <input type="radio" name="type' + j + '" value="float"><span>float(浮点型)</span> <input type="radio" name="type' + j + '" value="boolean"><span>boolean(布尔型)</span></div>'
                } else if (data.configuration.csin[i].type == 'int') {
                    html2 = '<div style="overflow:hidden;"><span>参数值类型 : </span><input type="radio" name="type' + j + '" value="string"><span>string(字符型)</span> <input type="radio" name="type' + j + '" value="int" checked><span>int(数值型)</span> <input type="radio" name="type' + j + '" value="float"><span>float(浮点型)</span> <input type="radio" name="type' + j + '" value="boolean"><span>boolean(布尔型)</span></div>'
                } else if (data.configuration.csin[i].type == 'float') {
                    html2 = '<div style="overflow:hidden;"><span>参数值类型 : </span><input type="radio" name="type' + j + '" value="string"><span>string(字符型)</span> <input type="radio" name="type' + j + '" value="int"><span>int(数值型)</span> <input type="radio" name="type' + j + '" value="float" checked><span>float(浮点型)</span> <input type="radio" name="type' + j + '" value="boolean"><span>boolean(布尔型)</span></div>'
                } else if (data.configuration.csin[i].type == 'boolean') {
                    html2 = '<div style="overflow:hidden;"><span>参数值类型 : </span><input type="radio" name="type' + j + '" value="string"><span>string(字符型)</span> <input type="radio" name="type' + j + '" value="int"><span>int(数值型)</span> <input type="radio" name="type' + j + '" value="float"><span>float(浮点型)</span> <input type="radio" name="type' + j + '" value="boolean" checked><span>boolean(布尔型)</span></div>'
                }
                $(div).append(html2);
                var html3;
                if (data.configuration.csin[i].option && data.configuration.csin[i].option.code == '1001') {
                    html3 = '<h3>参数值设置 : </h3>' +
                        '<div style="overflow:hidden;">' +
                        '<input type="radio" name="suanfa_type' + j + '" value="1001" checked><span>手动输入</span>' +
                        '<div class="list_zhi" id="1001">' +
                        '<input type="text" placeholder="设置默认参数值(可为空)" value="' + data.configuration.csin[i].default+'">' +
                        '<p class="fanwei"><b>取值范围</b><s contenteditable="true">' + data.configuration.csin[i].first + '</s>—<s contenteditable="true">' + data.configuration.csin[i].last + '</s></p>' +
                        '</div>' +
                        '</div>' +
                        '<div style="overflow:hidden;">' +
                        '<input type="radio" name="suanfa_type' + j + '" value="1002"><span>下拉选择</span>' +
                        '<div class="list_zhi" id="1002">' +
                        '<div><input type="text" placeholder="设置参数值1(不可为空)"><em></em></div>' +
                        '<div><input type="text" placeholder="设置参数值2(不可为空)"><em></em></div>' +
                        '<img src="../img/add_input.png" class="add_zhi">' +
                        '</div> ' +
                        '</div>' +
                        '<div style="overflow:hidden;">' +
                        '<input type="radio" name="suanfa_type' + j + '" value="1003"><span>条件输入</span>' +
                        '<div class="list_zhi" id="1003">' +
                        '<input type="text" placeholder="设置条件1">' +
                        '<input type="text" placeholder="设置条件1的默认值">' +
                        '<input type="text" placeholder="设置条件2">' +
                        '<input type="text" placeholder="设置条件2的默认值"> ' +
                        '</div>' +
                        '</div>'
                    $(div).append(html3);
                } else if (data.configuration.csin[i].option &&data.configuration.csin[i].option.code == '1003') {
                    html3 = '<h3>参数值设置 : </h3>' +
                        '<div style="overflow:hidden;">' +
                        '<input type="radio" name="suanfa_type' + j + '" value="1001" checked><span>手动输入</span>' +
                        '<div class="list_zhi" id="1001">' +
                        '<input type="text" placeholder="设置默认参数值(可为空)">' +
                        '<p class="fanwei"><b>取值范围</b><s contenteditable="true"></s>—<s contenteditable="true"></s></p>' +
                        '</div>' +
                        ' </div>' +
                        '<div style="overflow:hidden;">' +
                        '<input type="radio" name="suanfa_type' + j + '" value="1002"><span>下拉选择</span>' +
                        '<div class="list_zhi" id="1002">' +
                        '<div><input type="text" placeholder="设置参数值1(不可为空)"><em></em></div>' +
                        '<div><input type="text" placeholder="设置参数值2(不可为空)"><em></em></div>' +
                        '<img src="../img/add_input.png" class="add_zhi">   ' +
                        '</div> ' +
                        '</div>' +
                        '<div style="overflow:hidden;">' +
                        '<input type="radio" name="suanfa_type' + j + '" value="1003" checked><span>条件输入</span>' +
                        '<div class="list_zhi" id="1003">' +
                        '<input type="text" placeholder="设置条件1" value="' + data.configuration.csin[i].option.content[0].a1 + '">' +
                        '<input type="text" placeholder="设置条件1的默认值" value="' + data.configuration.csin[i].option.content[0].a2 + '">' +
                        '<input type="text" placeholder="设置条件2" value="' + data.configuration.csin[i].option.content[1].b1 + '">' +
                        '<input type="text" placeholder="设置条件2的默认值" value="' + data.configuration.csin[i].option.content[1].b2 + '"> ' +
                        '</div>' +
                        '</div>'
                    $(div).append(html3);
                } else if (data.configuration.csin[i].option &&data.configuration.csin[i].option.code == '1002') {
                    var html4 = '<h3>参数值设置 : </h3>' +
                        '<div style="overflow:hidden;">' +
                        '<input type="radio" name="suanfa_type' + j + '" value="1001" checked><span>手动输入</span>' +
                        '<div class="list_zhi" id="1001">' +
                        '<input type="text" placeholder="设置默认参数值(可为空)">' +
                        '<p class="fanwei"><b>取值范围</b><s contenteditable="true"></s>—<s contenteditable="true"></s></p>' +
                        '</div>' +
                        '</div>'
                    var html5 = '<div style="overflow:hidden;">' +
                        '<input type="radio" name="suanfa_type' + j + '" value="1003"><span>条件输入</span>' +
                        '<div class="list_zhi" id="1003">' +
                        '<input type="text" placeholder="设置条件1">' +
                        '<input type="text" placeholder="设置条件1的默认值">' +
                        '<input type="text" placeholder="设置条件2">' +
                        '<input type="text" placeholder="设置条件2的默认值"> ' +
                        '</div>'
                    var div0 = document.createElement('div');
                    $(div0).css({ overflow: 'hidden' });
                    var html6 = '<input type="radio" name="suanfa_type' + j + '" value="1002" checked><span>下拉选择</span>'
                    var div1 = document.createElement('div')
                    $(div1).addClass('list_zhi');
                    $(div1).attr('id', '1002')
                    for (var k = 0; k < data.configuration.csin[i].option.content.length; k++) {
                        var z = k + 1;
                        var html = '<div><input type="text" placeholder="设置参数值' + z + '(不可为空)" value="' + data.configuration.csin[i].option.content[k] + '"><em></em></div>'
                        $(div1).append(html)
                    }
                    var html7 = '<img src="../img/add_input.png" class="add_zhi">'
                    $(div1).append(html7)
                    $(div0).append(html6)
                    $(div0).append(div1)
                    $(div).append(html4)
                    $(div).append(div0)
                    $(div).append(html5)
                }
                $('.list_con2').append(div)
            }
        }
        if (data.configuration.resultArr) {
            $('.list_con3 ul').empty()
            var data = data.configuration.resultArr
                //console.log(data)
            for (var i = 0; i < data.length; i++) {
                $('.list_con3 ul').append('<li><input type="checkbox" id="check' + i + '"><label for="check' + i + '">' + data[i].name + '</label><div data-d="' + data[i].d_r + '" data-x="' + data[i].x_r + '" data-y="' + data[i].y_r + '">结果配置</div></li>')
            }
        }
    }
    // 修改时的保存弹窗封装
    // function write_baocun(data) {
    //     $('.cun_model_name input').val(data.name)
    //     $('.cun_model_txt textarea').val(data.abstract)
    //         // $('.cun_model_title2 input').val(data.title)
    //     $('.cun_model_tab li').removeClass('on')
    //     $('.cun_model_tab li[name="' + data.algoimg + '"]').addClass('on')
    //     $('.cun_model select').val(data.classify)
    //     if (data.classify == '文本分析' || data.classify == '机器学习' || data.classify == '计算机视觉' || data.classify == '深度学习') {
    //         $('.cun_model select').css('color', '#000')
    //     } else {
    //         $('.cun_model select').css('color', '#999')
    //     }
    // }

    function write_baocun(data) {
        $('.sf_save_boxcd1>div:eq(0)>input').val(data.name)
        $('.sf_save_boxcd2>textarea').val(data.abstract)
            // $('.cun_model_title2 input').val(data.title)
            // $('.cun_model_tab li').removeClass('on')
            // $('.cun_model_tab li[name="' + data.algoimg + '"]').addClass('on')
        $('.sf_save_boxcd1>div:eq(1)>input').val(data.classify);
        // if (data.classify == '文本分析' || data.classify == '机器学习' || data.classify == '计算机视觉' || data.classify == '深度学习') {
        //     $('.cun_model select').css('color', '#000')
        // } else {
        //     $('.cun_model select').css('color', '#999')
        // }
    }
    // 打开参数列表弹窗
    function addQc(arr, index) { /*去重添加*/
        for (var j = 0; j < arr.length; j++) {
            if (arr[j] == index) {
                return false
            }
        }
        return true
    }
    $('#select_canshu').click(function() {
            closeAllBox()
            var html = getCodeTxt()
            if (!configuration.csin) {
                if (html != '') {
                    var data = {};
                    data.configuration = {};
                    var key = html.match(/def\s(\S*)\(datax/)
                    if (key) {
                        var defname = key[1]
                    }
                    if (defname) {
                        data.configuration.defname = defname
                        var re = new RegExp("def\\s" + defname + "\\((\.*)\\)");
                        var key2 = html.match(re)
                        if (key2) {
                            var re2 = new RegExp(" ", "g")
                            key2 = key2[1].replace(re2, '')
                            var csin = key2.split(',')
                        }
                        //console.log(csin)
                        if (csin && csin.length != 0) {
                            data.configuration.csin = [];
                            if (csin[1] == 'datay') {
                                data.configuration.y_msg = ' ';
                                for (var i = 2; i < csin.length; i++) {
                                    var json = {
                                        'name': '',
                                        'parameter': csin[i],
                                        'describe': '',
                                        'type': 'string',
                                        'default': '',
                                        'first': '',
                                        'last': '',
                                        'option': {
                                            'code': '1001',
                                            'content': []
                                        }
                                    }
                                    data.configuration.csin.push(json)
                                }
                            } else {
                                for (var i = 1; i < csin.length; i++) {
                                    var json = {
                                        'name': '',
                                        'parameter': csin[i],
                                        'describe': '',
                                        'type': 'string',
                                        'default': '',
                                        'first': '',
                                        'last': '',
                                        'option': {
                                            'code': '1001',
                                            'content': []
                                        }
                                    }
                                    data.configuration.csin.push(json)
                                }
                            }
                        }
                    } else {
                        data.configuration.defname = '';
                    }
                    data.configuration.x_msg = '';
                    data.configuration.resultArr = [];
                    var ra = html.match(/output/g)
                    if (ra) {
                        for (var i = 0; i < ra.length; i++) {
                            var ra1 = ra[i].substring(ra[i].indexOf('"') + 1, ra[i].lastIndexOf('"'))
                                //console.log(ra1)
                            if (ra1.substr(0, 4) == 'data' || ra1.substr(0, 4) == 'Data') {
                                if (addQc(data.configuration.resultArr, ra1)) {
                                    data.configuration.resultArr.push({
                                        'name': ra1,
                                        'd_r': '',
                                        'x_r': '',
                                        'y_r': ''
                                    })
                                }
                            }
                        }
                        // console.log(data)
                        write_list(data)
                            // $('.CodeMirror').css({
                            //     width: 'calc(100% - 800px)'
                            // })
                        $('.list').css('right', 0);
                    } else {
                        // alertmsg('算法标准化需要结果输出“output”,格式请参考示例code', 0)
                        $('.alertMsg').showMsg({
                            isImg: 'isNo',
                            h2txt: '算法标准化需要结果输出“output”,格式请参考示例code',
                            ptxt: '',
                            setTime: 2000
                        });
                    }
                } else {
                    // alertmsg('请输入算法标准化！', 0)
                    $('.alertMsg').showMsg({
                        isImg: 'isNo',
                        h2txt: '无法标准化',
                        ptxt: '请参照示例code编写算法后再进行标准化',
                        setTime: 2000
                    });
                }
            } else {
                // $('.CodeMirror').css({ width: 'calc(100% - 800px)' })
                $('.list').css('right', 0);
            }
            /*lkw 20181030 N*/
            if (is_jiandu) {
                $('#is_jiandu').prop('checked', true)
            } else {
                $('#is_jiandu').prop('checked', false)
            }
            num = 4;
        })
        // 关闭参数列表弹窗
    $('.list>p>i').click(function() {
        // $('.CodeMirror').css('width', '')
        $('.list').css('right', '-100%');
    });
    // 参数列表中下拉选项时+号的功能
    $('.list').on('click', '.add_zhi', function() {
            var a_num = $(this).prev().children('input').attr('placeholder').indexOf('(');
            num = $(this).prev().children('input').attr('placeholder').substr(a_num - 1, 1)
            num++;
            //console.log(num)
            var div = document.createElement('div');
            var input = document.createElement('input');
            $(input).attr({ type: 'text', placeholder: '设置参数值' + num + '(可为空)' });
            var em = document.createElement('em');
            $(div).append(input)
            $(div).append(em)
            $(this).before(' ')
            $(this).before(div)
        })
        // 参数列表中下拉选项时-号功能
    $('.list_con').on('click', 'em', function() {
            var that = $(this).parent().next();
            $(this).parent().remove();
            var num = that.parent().children('div').length
            for (var i = 0; i < num; i++) {
                var j = i + 1
                if (j <= 2) {
                    $(that).parent().children('div')[i].children[0].setAttribute('placeholder', "设置参数值" + j + "(不可为空)")
                } else {
                    $(that).parent().children('div')[i].children[0].setAttribute('placeholder', "设置参数值" + j + "(可为空)")
                }
            }
        })
        // 参数列表中的删除功能
    $('.list_con').on('click', 'div i', function() {
        var test = $(this)
        $(".parmas_delete").show()
        if ($(".parmas_delete_box>i").on("click", function f() {
            $(".parmas_delete").hide();
        }));
        if ($(".parmas_delete_box>div>button:first").on("click", function f() {
            $(".parmas_delete").hide();
        }));
        if ($(".parmas_delete_box>div>button:last").on("click", function f() {
            test.parent().remove();
            $(".parmas_delete").hide();
            nob = $('.list_con>div').length - 1;
            for (var i = 0; i < $('.list_con>div').length - 1; i++) {
                var j = i + 1;
                $('.list_con2>div')[i].children[0].children[0].innerHTML = j
            }
        }));
        })
        // 增加参数配置项封装
    function add_list(nobb) {
        var html = `<div>
                <i>No.<b>` + nobb + `</b></i>
                <div style="overflow:hidden;"><span>参数名设置 : </span><input type="text" placeholder="请输入算法参数名"><b class="marry">对应参数变量：<s>暂无</s></b></div>
                <div style="overflow:hidden;"><span>参数的说明 : </span><input type="text" placeholder="非必填项,可为空" class="long_input"></div>
                <div style="overflow:hidden;"><span>参数值类型 : </span><input type="radio" name="type` + nobb + `" value="string" checked><span>string(字符型)</span> <input type="radio" name="type` + nobb + `" value="int"><span>int(数值型)</span> <input type="radio" name="type` + nobb + `" value="float"><span>float(浮点型)</span> <input type="radio" name="type` + nobb + `" value="boolean"><span>boolean(布尔型)</span></div>
                <h3>参数值设置 : </h3>
                <div style="overflow:hidden;">
                    <input type="radio" name="suanfa_type` + nobb + `" value="1001" checked><span>手动输入</span>
                    <div class="list_zhi" id="1001">
                        <input type="text" placeholder="设置默认参数值(可为空)">
                        <p class="fanwei"><b>取值范围</b><s contenteditable="true"></s>—<s contenteditable="true"></s></p>
                    </div>
                </div>
                <div style="overflow:hidden;">
                    <input type="radio" name="suanfa_type` + nobb + `" value="1002"><span>下拉选择</span>
                    <div class="list_zhi" id="1002">
                        <div><input type="text" placeholder="设置参数值1(不可为空)"><em></em></div>
                        <div><input type="text" placeholder="设置参数值2(不可为空)"><em></em></div>
                        <img src="../img/add_input.png" class="add_zhi">   
                    </div> 
                </div>
                <div style="overflow:hidden;">
                    <input type="radio" name="suanfa_type` + nobb + `" value="1003"><span>条件输入</span>
                    <div class="list_zhi" id="1003">
                        <input type="text" placeholder="设置条件1">
                        <input type="text" placeholder="设置条件1的默认值">
                        <input type="text" placeholder="设置条件2">
                        <input type="text" placeholder="设置条件2的默认值"> 
                    </div>
                </div>
            </div>`
        $('.list_con2').append(html)
    }
    // 增加参数项
    $('.add_set').click(function() {
            nob++;
            add_list(nob);
        })
        /*点击结果配置*/
    $('.list_con3 ul').on('click', 'li div', function(evt) {
            var evt = evt || window.event
            var Left = evt.target.offsetLeft - 308
            var Top = evt.target.offsetTop
            if (Top >= $(window).height() - 380) {
                Top = $(window).height() - 380
            }
            $('.paramSet').css({ left: Left + 'px', top: Top + 'px' })
            $('.paramSet')[0].res_name = $(this).prev().html()
            $('.paramSet input:eq(0)').val($(this).attr('data-d'))
            $('.paramSet input:eq(1)').val($(this).attr('data-x'))
            $('.paramSet input:eq(2)').val($(this).attr('data-y'))
            $('.paramSet').show()
        })
        /*预览*/
    function checkText(txt) {
        var arr = txt.split('')
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != '+' && arr[i] != '-' && arr[i] != '*' && arr[i] != '/' && isNaN(arr[i])) {
                return false;
            }
        }
        return true
    }
    $('.button_yl').click(function() {
            var r1 = $('.paramSet input:eq(0)').val()
            var r2 = $('.paramSet input:eq(1)').val()
            var r3 = $('.paramSet input:eq(2)').val()
            if (isNaN(r2)) {
                var rt2 = r2.replace('x', 1)
            } else {
                var rt2 = r2
            }
            if (isNaN(r3)) {
                var rt3 = r3.replace('y', 1)
            } else {
                var rt3 = r3
            }
            var data_result = Number(r1)
            if (isNaN(data_result)) {
                // alertmsg('无关"输入列"字段设置不可为非数值型', '', 0)
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '无关"输入列"字段设置不可为非数值型',
                    ptxt: '',
                    setTime: 2000
                });
            } else if (data_result < 0) {
                // alertmsg('无关"输入列"字段设置不可小于零', '', 0)
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '无关"输入列"字段设置不可小于零',
                    ptxt: '',
                    setTime: 2000
                });
            } else if (!checkText(rt2)) {
                // alertmsg('相关"数值列x"字段设置格式不正确', '', 0)
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '相关"数值列x"字段设置格式不正确',
                    ptxt: '',
                    setTime: 2000
                });
            } else if (!checkText(rt3)) {
                // alertmsg('相关"分组列y"字段设置格式不正确', '', 0)
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '相关"分组列y"字段设置格式不正确',
                    ptxt: '',
                    setTime: 2000
                });
            } else {
                var x_result = eval(rt2)
                var y_result = eval(rt3)
                var all = data_result + x_result + y_result
                $('.ylTable table').empty()
                var tr = document.createElement('tr');
                for (var i = 0; i < data_result; i++) {
                    var td = document.createElement('td')
                    var a = i + 1
                    $(td).html('data_result' + a)
                    $(tr).append(td)
                }
                for (var i = 0; i < x_result; i++) {
                    var td = document.createElement('td')
                    var a = i + 1
                    $(td).html('x_result' + a)
                    $(tr).append(td)
                }
                for (var i = 0; i < y_result; i++) {
                    var td = document.createElement('td')
                    var a = i + 1
                    $(td).html('y_result' + a)
                    $(tr).append(td)
                }
                $('.ylTable table').append(tr)
                for (var j = 0; j < 9; j++) {
                    var tr2 = document.createElement('tr')
                    for (var k = 0; k < all; k++) {
                        var td2 = document.createElement('td')
                        $(td2).html('--')
                        $(tr2).append(td2)
                    }
                    $('.ylTable table').append(tr2)
                }
                $('.ylTable').fadeIn()
            }
        })
        // 预览弹窗关闭
    $('.ylTable img').click(function() {
            $('.ylTable').fadeOut()
        })
        // 结果设置取消
    $('.button_qx').click(function() {
            $('.paramSet').hide()
        })
        // 结果设置确定
    function checkContain(object, text) {
        for (var i = 0; i < object.length; i++) {
            if (object[i].innerHTML == text) {
                return object[i]
            }
        }
    }
    $('.button_qd').click(function() {
            var res_name = $(this).parent().parent()[0].res_name
            var r1 = $('.paramSet input:eq(0)').val()
            var r2 = $('.paramSet input:eq(1)').val()
            var r3 = $('.paramSet input:eq(2)').val()
            if (isNaN(r2)) {
                var rt2 = r2.replace('x', 1)
            } else {
                var rt2 = r2
            }
            if (isNaN(r3)) {
                var rt3 = r3.replace('y', 1)
            } else {
                var rt3 = r3
            }
            var data_result = Number(r1)
            if (isNaN(data_result)) {
                // alertmsg('无关"输入列"字段设置不可为非数值型', '', 0)
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '无关"输入列"字段设置不可为非数值型',
                    ptxt: '',
                    setTime: 2000
                });
            } else if (data_result < 0) {
                // alertmsg('无关"输入列"字段设置不可小于零', '', 0)
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '无关"输入列"字段设置不可小于零',
                    ptxt: '',
                    setTime: 2000
                });
            } else if (!checkText(rt2)) {
                // alertmsg('相关"数值列x"字段设置格式不正确', '', 0)
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '相关"数值列x"字段设置格式不正确',
                    ptxt: '',
                    setTime: 2000
                });
            } else if (!checkText(rt3)) {
                // alertmsg('相关"分组列y"字段设置格式不正确', '', 0)
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '相关"分组列y"字段设置格式不正确',
                    ptxt: '',
                    setTime: 2000
                });
            } else {
                var obj = checkContain($('.list_con3 li label'), res_name)
                $(obj).next().attr('data-d', r1)
                $(obj).next().attr('data-x', r2)
                $(obj).next().attr('data-y', r3)
                $('.paramSet').fadeOut()
            }
        })
        // 参数列表取消
    $('.list_no').click(function() {
        if (!test) {
            $('.list_con2 div').remove()
            nob = 1
            add_list(nob);
            $('.list_con1')[0].reset()
            $('.list_con3')[0].reset()
            configuration = {}
        } else {
            write_list(data_result)
            configuration = {}
        }
    })
    var quchong_name = ''; /*传给后台用来defname去重*/
    // 参数列表确定
    $('.list_ok').click(function() {
            quchong_name = $('.defname').val();
            configuration.defname = $('.defname').val();
            configuration.x_msg = $('.x_msg').val();
            if ($('#is_jiandu').is(':checked')) {
                configuration.y_msg = $('.y_msg').val() + ' ';
            }
            configuration.csin = [];
            var arr = $('.list_con2>div')
                //console.log(arr)
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].children[1].children[1].value != '') {
                    var list = {};
                    list.name = arr[i].children[1].children[1].value;
                    list.parameter = arr[i].children[1].children[2].children[0].innerHTML
                    list.describe = arr[i].children[2].children[1].value;
                    var a = i + 1
                    list.type = $(arr[i]).children('div').children('input[name=type' + a + ']:checked').val();
                    if ($(arr[i]).children('div').children('input[name=suanfa_type' + a + ']:checked').val() == 1001) {
                        list.default = arr[i].children[5].children[2].children[0].value;
                        //console.log(arr[i].children[5].children[2].children[1].children[1])
                        list.first = arr[i].children[5].children[2].children[1].children[1].innerHTML;
                        list.last = arr[i].children[5].children[2].children[1].children[2].innerHTML;
                        list.option = {}
                        list.option.code = 1001;
                        list.option.content = [];
                    } else if ($(arr[i]).children('div').children('input[name=suanfa_type' + a + ']:checked').val() == 1002) {
                        list.default = arr[i].children[6].children[2].children[0].value;
                        list.option = {}
                        list.option.code = 1002;
                        list.option.content = [];
                        for (var j = 0; j < arr[i].children[6].children[2].children.length - 1; j++) {
                            list.option.content.push(arr[i].children[6].children[2].children[j].children[0].value)
                        }
                    } else if ($(arr[i]).children('div').children('input[name=suanfa_type' + a + ']:checked').val() == 1003) {
                        list.default = '';
                        list.option = {}
                        list.option.code = 1003;
                        list.option.content = [];
                        var a1 = arr[i].children[7].children[2].children[0].value
                        var a2 = arr[i].children[7].children[2].children[1].value
                        var b1 = arr[i].children[7].children[2].children[2].value
                        var b2 = arr[i].children[7].children[2].children[3].value
                        list.option.content.push({ a1, a2 })
                        list.option.content.push({ b1, b2 })
                    }
                    configuration.csin.push(list)
                }
            }
            configuration.resultArr = [];
            var data = $('.list_con3 li input:checked')
            for (var i = 0; i < data.length; i++) {
                configuration.resultArr.push({ 'name': $(data[i]).next().html(), 'd_r': $(data[i]).nextAll('div').attr('data-d'), 'x_r': $(data[i]).nextAll('div').attr('data-x'), 'y_r': $(data[i]).nextAll('div').attr('data-y') })
            }
            //console.log(configuration)
            $('.list>p>i').click();
            // $('#baocun_suanfa').click();
            baocun_suanfa();
        })
        // 打开保存弹窗函数
    function baocun_suanfa() {
        var AF_name = /^[A-Za-z_]+$/;
        if ($(".defname").val() == "") {
            // alertmsg('算法标准化的算法函数名不能为空', '', 0);
            $('.alertMsg').showMsg({
                isImg: 'isNo',
                h2txt: '标准化失败',
                ptxt: '请参照提示输入算法函数名',
                setTime: 2000
            });
        } else if (!AF_name.test($(".defname").val())) {
            // alertmsg('算法标准化的算法函数名只能是大小写英文和下划线', '', 0);
            $('.alertMsg').showMsg({
                isImg: 'isNo',
                h2txt: '算法标准化的算法函数名只能是大小写英文和下划线',
                ptxt: '',
                setTime: 2000
            });
        } else {
            quchong_name = $(".defname").val();
            // $('.mu').show();
            // $('.cun_model').show();
            $(".sf_save_mask").show();
            // 加载一级标签
            cun_modelTR_tDataFn('', 0);
        }
    }
    // // 打开保存弹窗
    // $('#baocun_suanfa').click(function() {
    //         var AF_name = /^[A-Za-z_]+$/;
    //         if ($(".defname").val() == "") {
    //             // alertmsg('算法标准化的算法函数名不能为空', '', 0);
    //             $('.alertMsg').showMsg({
    //                 isImg: 'isNo',
    //                 h2txt: '算法提交失败',
    //                 ptxt: '请参照提示输入算法函数名',
    //                 setTime: 2000
    //             });
    //         } else if (!AF_name.test($(".defname").val())) {
    //             // alertmsg('算法标准化的算法函数名只能是大小写英文和下划线', '', 0);
    //             $('.alertMsg').showMsg({
    //                 isImg: 'isNo',
    //                 h2txt: '算法标准化的算法函数名只能是大小写英文和下划线',
    //                 ptxt: '',
    //                 setTime: 2000
    //             });
    //         } else {
    //             quchong_name = $(".defname").val();
    //             $('.mu').show();
    //             $('.cun_model').show();
    //             // 加载一级标签
    //             cun_modelTR_tDataFn('', 0);
    //         }
    //     })
    // 关闭保存弹窗
    $('.cun_model_title i').click(function() {
        $('.mu').hide();
        $('.cun_model').hide();
    })
    $(".sf_save_boxt>i").on("click", function() {
        $('.mu').hide();
        $(".sf_save_mask").hide();
    });
    // 选择图标
    $('.cun_model_tab').on('click', 'li', function() {
            $('.cun_model_tab li').removeClass('on')
            $(this).addClass('on')
        })
        // 选择算法分类
    $('.cun_model select').click(function() {
            if ($(this).val() == '请选择算法分类...') {
                $(this).css('color', '#999')
            } else {
                $(this).css('color', '#000')
            }
        })
        // 模板保存 lkw 20181030 S
    $('.model_model').on('click', function() {
            var oname = $('.cun_model_name input').val();
            var content = Base64.encode(getCodeTxt());

            if (oname == '') {
                // alertmsg('请输入模板名称', '', 0);
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '请输入模板名称',
                    ptxt: '',
                    setTime: 2000
                });
                return;
            }
            if (content == '') {
                // alertmsg('您的代码为空', '', 0);
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '您的代码为空',
                    ptxt: '',
                    setTime: 2000
                });
                return;
            }

            $.ajax({
                async: true,
                type: "post",
                cache: false,
                url: url_ip + '/examine/savetemplates/',
                data: { name: oname, content: content },
                dataType: "json",
                headers: { "Authorization": token },
                success: function(res) {
                    if (res.status) {
                        $('.mu').hide();
                        $('.cun_model').hide();
                        $('.cun_model_name input').val('');
                        // alertmsg(res.msg, '', 1);
                        $('.alertMsg').showMsg({
                            isImg: 'isOk',
                            h2txt: res.msg,
                            ptxt: '',
                            setTime: 2000
                        });
                    } else {
                        // alertmsg(res.msg, '', 0);
                        $('.alertMsg').showMsg({
                            isImg: 'isNo',
                            h2txt: res.msg,
                            ptxt: '',
                            setTime: 2000
                        });
                    }
                },
                error: function(err) {
                    //console.log(err)
                }
            })
        })
        // 模板保存 lkw 20181030 N
    var zctj;
    // 点击保存弹窗暂存按钮进行算法暂存操作
    // 算法暂存
    $('.model_cun').click(function() {
        var html = getCodeTxt();
        html = Base64.encode(html);
        var stdin = $('#stdin').val();
        var langid = 20;
        var json = {
            objid: html,
            configuration: JSON.stringify(configuration),
            name: $('.cun_model_name input').val(),
            funcname: quchong_name,
            type: 2,
            user: 1,
            // title:$('.cun_model_title2 input').val(),
            img: $('.cun_model_tab li.on').attr('name'),
            abstract: $('.cun_model_txt textarea').val(),
            id: test,
            adopt: adopt,
            submit: 0,
            classify: $('.cun_model select').val(),

        };
        json = $.extend(json, getNewJson()); // 合并对象
        //console.log(json)
        $.ajax({
            type: "POST",
            url: url_ip + "/examine/upalgocrud/",
            async: false,
            data: json,
            dataType: "json",
            headers: { "Authorization": token },
            beforeSend: function() {
                $('.mu').show();
                $('.loading').show();
                clearInterval(_tid)
                var a = 0;
                _tid = setInterval(function() {
                    a += 22.5
                    $('.loading').css('transform', 'rotate(' + a + 'deg)')
                }, 100)
            },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    // alertmsg(data.msg, '', 1);
                    $('.alertMsg').showMsg({
                        isImg: 'isOk',
                        h2txt: data.msg,
                        ptxt: '',
                        setTime: 2000
                    });
                    $('.cun_model').hide();
                    $('.mu').hide();
                } else {
                    // alertmsg(data.msg, '', 0);
                    if (data.msg == "算法名称重复") {
                        $(".sfzt_delete_mask").show();
                        zctj = 0;
                    } else {
                        $('.alertMsg').showMsg({
                            isImg: 'isNo',
                            h2txt: data.msg,
                            ptxt: '',
                            setTime: 2000
                        });
                    }
                }
            },
            error: function(data) {
                //console.log(data)
                // alertmsg('保存失败', '', 0)
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '保存失败',
                    ptxt: '',
                    setTime: 2000
                });
            },
            complete: function() {
                clearInterval(_tid)
                $('.loading').hide();
            }
        })
    })
    $('.sf_save_boxb_zc').click(function() {
        if (test == "" || adopt == "") {
            test = 0;
            adopt = 1;
        }
        var html = getCodeTxt();
        html = Base64.encode(html);
        var stdin = $('#stdin').val();
        var langid = 20;
        var json = {
            objid: html,
            configuration: JSON.stringify(configuration),
            name: $('.sf_save_boxcd1>div:eq(0)>input').val(),
            funcname: quchong_name,
            type: 2,
            user: 1,
            // title:$('.cun_model_title2 input').val(),
            img: "ZJ_img1/ZJ" + Math.floor(Math.random() * 100 + 1) + ".fw.png",
            abstract: $('.sf_save_boxcd2>textarea').val(),
            id: test,
            adopt: adopt,
            submit: 0,
            classify: $('.sf_save_boxcd1>div:eq(1)>input').val(),
        };
        json = $.extend(json, getNewJson()); // 合并对象
        //console.log(json)
        $.ajax({
            type: "POST",
            url: url_ip + "/examine/upalgocrud/",
            async: false,
            data: json,
            dataType: "json",
            headers: {
                "Authorization": token
            },
            beforeSend: function() {
                $('.mu').show();
                $('.loading').show();
                clearInterval(_tid)
                var a = 0;
                _tid = setInterval(function() {
                    a += 22.5
                    $('.loading').css('transform', 'rotate(' + a + 'deg)')
                }, 100)
            },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    // alertmsg(data.msg, '', 1);
                    $('.alertMsg').showMsg({
                        isImg: 'isOk',
                        h2txt: data.msg,
                        ptxt: '',
                        setTime: 2000
                    });
                    // $('.cun_model').hide();
                    $('.mu').hide();
                    $(".sf_save_mask").hide();
                    // $(".sf_save_boxcd1>div:eq(0)>input").val("");
                    // $(".sf_save_boxcd1>div:eq(1)>input").val("文本分析");
                    // $(".sf_save_boxcd2>textarea").val("");
                    // $(".sf_save_boxcd3_bq>div").removeClass("on");
                    // $(".sf_save_boxcd3_bq>div>i").removeClass("on");
                    // $(".sf_save_boxcd4_zbq>div").remove();
                } else {
                    // alertmsg(data.msg, '', 0);
                    if (data.msg == "算法名称重复") {
                        $(".sfzt_delete_mask").show();
                        zctj = 0;
                    } else {
                        $('.alertMsg').showMsg({
                            isImg: 'isNo',
                            h2txt: data.msg,
                            ptxt: '',
                            setTime: 2000
                        });
                    }
                }
            },
            error: function(data) {
                //console.log(data)
                // alertmsg('保存失败', '', 0)
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '保存失败',
                    ptxt: '',
                    setTime: 2000
                });
            },
            complete: function() {
                clearInterval(_tid)
                $('.loading').hide();
            }
        })
    })






    // 点击保存弹窗提交按钮进行算法提交操作
    // 算法提交
    $('.model_sure').click(function() {
        var algorithm_name = /^[\u4e00-\u9fa5A-Za-z0-9]+$/;
        var html = getCodeTxt();
        html = Base64.encode(html);
        var stdin = $('#stdin').val();
        var langid = 20;
        if ($('.cun_model_name input').val() == "") {
            // alertmsg('算法名字不能为空', '', 0);
            $('.alertMsg').showMsg({
                isImg: 'isNo',
                h2txt: '算法名字不能为空',
                ptxt: '',
                setTime: 2000
            });
        } else if (!algorithm_name.test($('.cun_model_name input').val())) {
            // alertmsg('算法名字只能是中英文数字组成', '', 0);
            $('.alertMsg').showMsg({
                isImg: 'isNo',
                h2txt: '算法名字只能是中英文数字连接符组成',
                ptxt: '',
                setTime: 2000
            });
        } else {
            var json = {
                objid: html,
                configuration: JSON.stringify(configuration),
                name: $('.cun_model_name input').val(),
                funcname: quchong_name,
                type: 2,
                user: 1,
                // title:$('.cun_model_title2 input').val(),
                img: $('.cun_model_tab li.on').attr('name'),
                abstract: $('.cun_model_txt textarea').val(),
                id: test,
                adopt: adopt,
                submit: 1,
                classify: $('.cun_model select').val()
            };
            var jsonOhter = getNewJson();
            json = $.extend(json, jsonOhter); // 合并对象
            $.ajax({
                type: "POST",
                url: url_ip + "/examine/upalgocrud/",
                async: false,
                data: json,
                dataType: "json",
                headers: {
                    "Authorization": token
                },
                beforeSend: function() {
                    $('.mu').show();
                    $('.loading').show();
                    clearInterval(_tid)
                    var a = 0;
                    _tid = setInterval(function() {
                        a += 22.5
                        $('.loading').css('transform', 'rotate(' + a + 'deg)')
                    }, 100)
                },
                success: function(data) {
                    // console.log(data)
                    if (data.status) {
                        // alertmsg(data.msg, '', 1);
                        $('.alertMsg').showMsg({
                            isImg: 'isOk',
                            h2txt: data.msg,
                            ptxt: '',
                            setTime: 2000
                        });
                        $('.cun_model').hide();
                        $('.mu').hide();
                    } else {
                        // alertmsg(data.msg, '', 0)
                        if (data.msg == "算法名称重复") {
                            $(".sfzt_delete_mask").show();
                            zctj = 1;
                        } else {
                            $('.alertMsg').showMsg({
                                isImg: 'isNo',
                                h2txt: data.msg,
                                ptxt: '',
                                setTime: 2000
                            });
                        }
                    }
                },
                error: function(data) {
                    //console.log(data)
                    // alertmsg('保存失败', '', 0)
                    $('.alertMsg').showMsg({
                        isImg: 'isNo',
                        h2txt: '保存失败',
                        ptxt: '',
                        setTime: 2000
                    });
                },
                complete: function() {
                    clearInterval(_tid)
                    $('.loading').hide();
                }
            })
        }
    });
    $('.sf_save_boxb_tj').click(function() {
        var algorithm_name = /^[\u4e00-\u9fa5A-Za-z0-9-]+$/;
        var html = getCodeTxt();
        html = Base64.encode(html);
        var stdin = $('#stdin').val();
        var langid = 20;
        if ($('.sf_save_boxcd1>div:eq(0)>input').val() == "") {
            // alertmsg('算法名字不能为空', '', 0);
            $('.alertMsg').showMsg({
                isImg: 'isNo',
                h2txt: '算法名字不能为空',
                ptxt: '',
                setTime: 2000
            });
        } else if (!algorithm_name.test($('.sf_save_boxcd1>div:eq(0)>input').val())) {
            // alertmsg('算法名字只能是中英文数字组成', '', 0);
            $('.alertMsg').showMsg({
                isImg: 'isNo',
                h2txt: '算法名称只能是中英文数字组成',
                ptxt: '',
                setTime: 2000
            });
        } else {
            if (test == "" || adopt == "") {
                test = 0;
                adopt = 1;
            }
            var json = {
                objid: html,
                configuration: JSON.stringify(configuration),
                name: $('.sf_save_boxcd1>div:eq(0)>input').val(),
                funcname: quchong_name,
                type: 2,
                user: 1,
                // title:$('.cun_model_title2 input').val(),
                img: "ZJ_img1/ZJ" + Math.floor(Math.random() * 100 + 1) + ".fw.png",
                abstract: $('.sf_save_boxcd2>textarea').val(),
                id: test,
                adopt: adopt,
                submit: 1,
                classify: $('.sf_save_boxcd1>div:eq(1)>input').val()
            };
            var jsonOhter = getNewJson();
            json = $.extend(json, jsonOhter); // 合并对象
            $.ajax({
                type: "POST",
                url: url_ip + "/examine/upalgocrud/",
                async: false,
                data: json,
                dataType: "json",
                headers: {
                    "Authorization": token
                },
                beforeSend: function() {
                    $('.mu').show();
                    $('.loading').show();
                    clearInterval(_tid)
                    var a = 0;
                    _tid = setInterval(function() {
                        a += 22.5
                        $('.loading').css('transform', 'rotate(' + a + 'deg)')
                    }, 100)
                },
                success: function(data) {
                    // console.log(data)
                    if (data.status) {
                        $('.sf_name').val('');
                        // alertmsg(data.msg, '', 1);
                        $('.alertMsg').showMsg({
                            isImg: 'isOk',
                            h2txt: data.msg,
                            ptxt: '',
                            setTime: 2000
                        });
                        // $('.cun_model').hide();
                        $('.mu').hide();
                        $(".sf_save_mask").hide();
                        // $(".sf_save_boxcd1>div:eq(0)>input").val("");
                        // $(".sf_save_boxcd1>div:eq(1)>input").val("文本分析");
                        // $(".sf_save_boxcd2>textarea").val("");
                        // $(".sf_save_boxcd3_bq>div").removeClass("on");
                        // $(".sf_save_boxcd3_bq>div>i").removeClass("on");
                        // $(".sf_save_boxcd4_zbq>div").remove();
                    } else {
                        // alertmsg(data.msg, '', 0)
                        if (data.msg == "算法名称重复") {
                            $(".sfzt_delete_mask").show();
                            zctj = 1;
                        } else {
                            $('.alertMsg').showMsg({
                                isImg: 'isNo',
                                h2txt: data.msg,
                                ptxt: '',
                                setTime: 2000
                            });
                        }
                    }
                },
                error: function(data) {
                    //console.log(data)
                    // alertmsg('保存失败', '', 0)
                    $('.alertMsg').showMsg({
                        isImg: 'isNo',
                        h2txt: '保存失败',
                        ptxt: '',
                        setTime: 2000
                    });
                },
                complete: function() {
                    clearInterval(_tid)
                    $('.loading').hide();
                    
                }
            })
        }
    });
    // 关闭弹窗
    $(".sfzt_delete_box>i").on("click", function() {
        $(this).parents(".sfzt_delete_mask").hide();
    });
    // 取消覆盖
    $(".sfzt_delete_box>div>button:first").on("click", function() {
        $(".sfzt_delete_box>i").click();
    });
    // 确定覆盖
    $(".sfzt_delete_box>div>button:last").on("click", function() {
        var html = getCodeTxt();
        html = Base64.encode(html);
        var json;
        if (test == 0 || adopt == 1) {
            $.ajax({
                url: url_ip + '/examine/getuseralgo/',
                type: 'GET',
                cache: false,
                async: false,
                data: {},
                datatype: 'json',
                headers: {
                    "Authorization": token
                },
                success: function(data) {
                    // console.log(data)
                    if (data.status) {
                        for (var i = 0; i < data.data.length; i++) {
                            if (data.data[i].name == $('.sf_save_boxcd1>div:eq(0)>input').val()) {
                                test = data.data[i].id;
                                adopt = data.data[i].adopt;
                                json = {
                                    code: html,
                                    configuration: JSON.stringify(configuration),
                                    name: $('.sf_save_boxcd1>div:eq(0)>input').val(),
                                    funcname: quchong_name,
                                    type: 2,
                                    user: 1,
                                    // title:$('.cun_model_title2 input').val(),
                                    img: "ZJ_img1/ZJ" + Math.floor(Math.random() * 100 + 1) + ".fw.png",
                                    abstract: $('.sf_save_boxcd2>textarea').val(),
                                    id: test,
                                    adopt: adopt,
                                    submit: zctj,
                                    classify: $('.sf_save_boxcd1>div:eq(1)>input').val()
                                }
                            }
                        }
                    }
                },
                error: function(data) {
                    //console.log(data)
                }
            })
        } else {
            json = {
                code: html,
                configuration: JSON.stringify(configuration),
                name: $('.sf_save_boxcd1>div:eq(0)>input').val(),
                funcname: quchong_name,
                type: 2,
                user: 1,
                // title:$('.cun_model_title2 input').val(),
                img: "ZJ_img1/ZJ" + Math.floor(Math.random() * 100 + 1) + ".fw.png",
                abstract: $('.sf_save_boxcd2>textarea').val(),
                id: test,
                adopt: adopt,
                submit: zctj,
                classify: $('.sf_save_boxcd1>div:eq(1)>input').val()
            }
        }
        var jsonOhter = getNewJson();
        json = $.extend(json, getNewJson());
        $.ajax({
            type: "PUT",
            url: url_ip + "/examine/upalgocrud/",
            data: json,
            dataType: "json",
            headers: {
                "Authorization": token
            },
            success: function(res) {
                // console.log(res)
                if (res.status) {
                    $('.alertMsg').showMsg({
                        isImg: 'isOk',
                        h2txt: res.msg,
                        ptxt: '',
                        setTime: 2000
                    });
                    $(".sfzt_delete_mask").hide();
                    $(".sf_save_mask").hide();
                    $(".mu").hide();
                    // $(".sf_save_boxcd1>div:eq(0)>input").val("");
                    // $(".sf_save_boxcd1>div:eq(1)>input").val("文本分析");
                    // $(".sf_save_boxcd2>textarea").val("");
                    // $(".sf_save_boxcd3_bq>div").removeClass("on");
                    // $(".sf_save_boxcd3_bq>div>i").removeClass("on");
                    // $(".sf_save_boxcd4_zbq>div").remove();
                }
            }
        });
    });

    /*取消编辑*/
    $('.model_nosure').click(function() {
        $('.mu').hide();
        $('.cun_model').hide();
    })
    $(".sf_save_boxb_qx").on("click", function() {
        $(".sf_save_boxt>i").click();
    });
    // 打开数据弹窗
    $('#btn').click(function() {
        closeAllBox()
        $('#oldbox').css('right', 0)
            // if (is_jiandu) {
        $('#oldbox dt .data_y').css('opacity', '1')
        $('#oldbox dd .check2').css('opacity', '1')
            // } else {
            // $('#oldbox dt .data_y').css('opacity', '0')
            // $('#oldbox dd .check2').css('opacity', '0')
            // }
    });
    // 关闭数据弹窗
    $('#oldbox>p>i').click(function() {
        $('#oldbox').css('right', '-300px')
    })

    // 数据弹窗执行
    var file_name = 'none';
    var cn_list = {};
    $('#oldbox .do').click(function() {
            file_name = 'none';
            cn_list = {};
            closeAllBox();
            $('#lkw_trydo').css({ height: 200, width: '100%', padding: '0 10px' }); //lkw 201812131540 底部上划
            if ($('#oldbox li>div.on').children('label').html()) {
                file_name = $('#oldbox li>div.on').children('label').html()
            }
            if (is_jiandu) {
                cn_list.x = [];
                cn_list.y = [];
                if ($('#oldbox li>div.on').next('dl').find('.check1.on')[0]) {
                    for (var i = 0; i < $('#oldbox li>div.on').next('dl').find('.check1.on').length; i++) {
                        cn_list.x.push($('.check1.on')[i].parentNode.id)
                    }
                }
                if ($('#oldbox li>div.on').next('dl').find('.check2.on')[0]) {
                    cn_list.y = [$('.check2.on')[0].parentNode.id];
                }
            } else {
                cn_list.x = [];
                if ($('#oldbox li>div.on').next('dl').find('.check1.on')[0]) {
                    for (var i = 0; i < $('#oldbox li>div.on').next('dl').find('.check1.on').length; i++) {
                        cn_list.x.push($('.check1.on')[i].parentNode.id)
                    }
                }
            }
            //console.log(file_name,JSON.stringify(cn_list));
            runcodenew(file_name, JSON.stringify(cn_list));
            $('.CodeMirror').css({ "height": "calc(100vh - 260px)" });
        })
        //     // 数据弹窗查看
        // $('#oldbox .look').click(function() {
        //         $('#lkw_trydo').css({ height: 0, width: 0, padding: 0 })
        //         $('#editor').css({ height: 'calc(100vh - 260px)' });
        //     })
        // 确定退出
    $('.sure_quit').click(function() {
        sessionStorage.removeItem('token');
        window.location.href = '../index.html';
    });
    // 数据导入点击操作
    $('.online_upload').mousedown(function() {
        $(this).addClass('on')
    })
    $('.online_upload').mouseup(function() {
        $(this).removeClass('on')
    })
    $('input[type="file"]').on('change', function() {
        var formData = new FormData();
        var filename = $(this)[0].files[0].name
        formData.append('file', $(this)[0].files[0]);
        $('.loading').show();
        $.ajax({
            url: url_ip + '/examine/getuserdatalabel/',
            type: 'POST',
            data: formData,
            dataType: 'json',
            processData: false,
            /*告诉jQuery不要去处理发送的数据*/
            contentType: false,
            /*告诉jQuery不要去设置Content-Type请求头*/
            headers: { "Authorization": token },
            success: function(data) {
                // console.log(data)
                if (data.status) {
                        $.ajax({
            url: url_ip + '/examine/getuserdata/',
            type: 'GET',
            data: {},
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function(data) {
                console.log(data)
                if (data.status) {
                    $.ajax({
                        url: url_ip + '/examine/getuserdata/',
                        type: 'GET',
                        data: {},
                        dataType: 'json',
                        headers: { 'Authorization': token },
                        success: function(data) {
                            console.log(data)
                            if (data.status) {
                                $('#oldbox ul').empty()
                                for (var i = 0; i < data.data.length; i++) {
                                    var index = i;
                                    var li_html = '<li>' +
                                        '<div><div class="radio"></div><label>' + data.data[i] + '</label><div class="data_opt"><button class="data_look">查看</button><button class="data_delete">删除</button></div></div>' +
                                        '<dl>' +
                                        '<dt><span>X</span><span class="data_y">Y</span><i>字段</i></dt>' +
                                        '<dd><div class="check check0"></div></dd>' +
                                        '</dl>' +
                                        '</li>'
                                    $('#oldbox ul').append(li_html);
                                    var data_name = $("#oldbox").find("li:eq(" + i + ") label").text();
            
                                    if (data_name.substr(data_name.length - 4) == ".csv" || data_name.substr(data_name.length - 4) == ".CSV") {
                                        $("#oldbox li:eq(" + i + ") .data_look").css({
                                            "visibility": "inherit"
                                        });
                                    } else {
                                        $("#oldbox li:eq(" + i + ") .data_look").css({
                                            "visibility": "hidden"
                                        });
                                        $(".data_look").eq(i).parents("li").hide();
                                    }
                                    $.ajax({
                                        url: url_ip + '/examine/getuserdatalabel/',
                                        type: 'GET',
                                        async: false,
                                        data: { name: data.data[i] },
                                        dataType: 'json',
                                        headers: { 'Authorization': token },
                                        success: function(result) {
                                            //console.log(result)
                                            if (result.status) {
                                                for (var j = 0; j < result.label.length; j++) {
                                                    var dd_html = '<dd id=' + j + '>' +
                                                        '<div class="check check1"></div>' +
                                                        '<div class="check check2"></div>' +
                                                        '<b>' + result.label[j] + '</b>' +
                                                        '</dd>'
                                                    $('#oldbox ul li:eq(' + index + ') dl').append(dd_html)
                                                }
                                                $('.loading').hide();
                                            }
                                        },
                                        error: function(result) {
                                            //console.log(result)
                                        }
                                    })
                                }
                            } else {
                                // alertmsg(data.msg, '', 2)
                                $('.alertMsg').showMsg({
                                    isImg: 'isNo',
                                    h2txt: data.msg,
                                    ptxt: '',
                                    setTime: 2000
                                });
                            }
                        },
                        error: function(data) {
                            //console.log(data)
                        }
                    })
                    // for (var i = 0; i < data.data.length; i++) {
                    //     var index = i;
                    //     var li_html = '<li>' +
                    //         '<div><div class="radio"></div><label>' + data.data[i] + '</label><div class="data_opt"><button class="data_look">查看</button><button class="data_delete">删除</button></div></div>' +
                    //         '<dl>' +
                    //         '<dt><span>X</span><span class="data_y">Y</span><i>字段</i></dt>' +
                    //         '<dd><div class="check check0"></div></dd>' +
                    //         '</dl>' +
                    //         '</li>'
                    //     $('#oldbox ul').append(li_html);
                    //     var data_name = $("#oldbox").find("li:eq(" + i + ") label").text();

                    //     if (data_name.substr(data_name.length - 4) == ".csv" || data_name.substr(data_name.length - 4) == ".CSV") {
                    //         $("#oldbox li:eq(" + i + ") .data_look").css({
                    //             "visibility": "inherit"
                    //         });
                    //     } else {
                    //         $("#oldbox li:eq(" + i + ") .data_look").css({
                    //             "visibility": "hidden"
                    //         });
                    //         $(".data_look").eq(i).parents("li").hide();
                    //     }
                    //     $.ajax({
                    //         url: url_ip + '/examine/getuserdatalabel/',
                    //         type: 'GET',
                    //         async: false,
                    //         data: { name: data.data[i] },
                    //         dataType: 'json',
                    //         headers: { 'Authorization': token },
                    //         success: function(result) {
                    //             //console.log(result)
                    //             if (result.status) {
                    //                 for (var j = 0; j < result.label.length; j++) {
                    //                     var dd_html = '<dd id=' + j + '>' +
                    //                         '<div class="check check1"></div>' +
                    //                         '<div class="check check2"></div>' +
                    //                         '<b>' + result.label[j] + '</b>' +
                    //                         '</dd>'
                    //                     $('#oldbox ul li:eq(' + index + ') dl').append(dd_html)
                    //                 }
                    //             }
                    //         },
                    //         error: function(result) {
                    //             //console.log(result)
                    //         }
                    //     })
                    // }
                } else {
                    // alertmsg(data.msg, '', 2)
                    $('.alertMsg').showMsg({
                        isImg: 'isNo',
                        h2txt: data.msg,
                        ptxt: '',
                        setTime: 2000
                    });
                }
            },
            error: function(data) {
                //console.log(data)
            }
        })
                    // alertmsg(data.msg, '', 1)
                    // $('.alertMsg').showMsg({
                    //     isImg: 'isOk',
                    //     h2txt: data.msg,
                    //     ptxt: '',
                    //     setTime: 2000
                    // });
                    // var li_html = '<li>' +
                    //     '<div><div class="radio"></div><label>' + filename + '</label><div class="data_opt"><button class="data_look">查看</button><button class="data_delete">删除</button></div></div>' +
                    //     '<dl>' +
                    //     '<dt><span>X</span><span class="data_y">Y</span><i>字段</i></dt>' +
                    //     '<dd><div class="check check0"></div></dd>' +
                    //     '</dl>' +
                    //     '</li>'
                    // $('#oldbox ul').prepend(li_html)
                    // for (var j = 0; j < data.label.length; j++) {
                    //     var dd_html = '<dd id=' + j + '>' +
                    //         '<div class="check check1"></div>' +
                    //         '<div class="check check2"></div>' +
                    //         '<b>' + data.label[j] + '</b>' +
                    //         '</dd>'
                    //     $('#oldbox ul li:eq(0) dl').append(dd_html)
                    // }
                } else {
                    // alertmsg(data.msg, '', 2)
                    $('.alertMsg').showMsg({
                        isImg: 'isNo',
                        h2txt: data.msg,
                        ptxt: '',
                        setTime: 2000
                    });
                }
            },
            error: function(data) {
                //console.log(data)
            }
        })
    });
    // 试运行数据点击
    var li_evt = '';
    $('#oldbox').on('click', 'li>div', function() {
        $('#oldbox dl').hide();
        $('#oldbox ul li>div').removeClass('on')
            // $('#oldbox li>div').find(".data_opt").hide();
        if (li_evt != $(this)[0]) {
            $(this).next().show();
            $(this).addClass('on');
            // $(this).find(".data_opt").css({ "display": "inline-block" });
            li_evt = $(this)[0]
        } else {
            li_evt = '';
        }
    });
    // 试运行数据点击查看
    $('#oldbox').on('click', 'li>div .data_look', function(evt) {
        evt.stopPropagation();
        $(".mu2,.lkw_loading_").show();
        $(".data_look_box_t").text("");
        $(".data_look_box_b table tr").remove();
        var data_name = $(this).parents("li").find("label").text();
        $.ajax({
            type: "GET",
            url: url_ip + "/examine/show_data",
            data: {
                data_name: data_name
            },
            dataType: "json",
            headers: {
                "Authorization": token
            },
            success: function(res) {
                // console.log(res);
                $(".mu2,.lkw_loading_").hide();
                if (res.status) {
                    $(".data_look_box_t").text(data_name);
                    var tr1 = $("<tr></tr>");
                    $(".data_look_box_b table thead").append(tr1);
                    for (var j = 0; j < res.data[0].length; j++) {
                        var th = $("<th>" + res.data[0][j] + "</th>");
                        $(".data_look_box_b table thead tr").append(th);
                    }
                    for (var i = 1; i < res.data.length; i++) {
                        var tr2 = $("<tr></tr>");
                        $(".data_look_box_b table tbody").append(tr2);
                        for (var j = 0; j < res.data[i].length; j++) {
                            var td = $("<td>" + res.data[i][j] + "</td>");
                            $(".data_look_box_b table tbody tr:eq(" + (i - 1) + ")").append(td);
                        }
                    }
                    $(".data_look_mask").css({ "display": "flex" });
                }
            }
        });
    });
    $(".data_look_box>i").on("click", function() {
        $(this).parents(".data_look_mask").hide();
    })
    var that;
    // 试运行数据点击删除出现弹窗
    $('#oldbox').on('click', 'li>div .data_delete', function(evt) {
        evt.stopPropagation();
        $(".data_delete_mask").show();
        that = this;
    });
    // 关闭删除弹窗
    $(".data_delete_box>i").on("click", function() {
            $(this).parents(".data_delete_mask").hide();
        })
        // 取消删除
    $(".data_delete_box>div>button:first").on("click", function() {
            $(".data_delete_box>i").click();
        })
        // 确认删除
    $(".data_delete_box>div>button:last").on("click", function() {
        var data_name = $(that).parents("li").find("label").text();
        $.ajax({
            type: "GET",
            url: url_ip + "/examine/delete_data",
            data: {
                data_name: data_name
            },
            dataType: "json",
            headers: {
                "Authorization": token
            },
            success: function(res) {
                // console.log(res)
                if (res.status) {
                    $(".data_delete_mask").hide();
                    $(that).parents("li").remove();
                }
            }
        });
    })
    $('#oldbox').on('click', '.check0', function() {
        if ($(this)[0].className == 'check check0') {
            $(this).parent().parent().find('.check1').addClass('on')
            $(this).addClass('on')
        } else {
            $(this).parent().parent().find('.check1').removeClass('on')
            $(this).removeClass('on')
        }
    })

    function is_all(evt) {
        var arr = evt.parent().parent().find('.check1')
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].className == 'check check1') {
                return false
            }
        }
        return true
    }
    $('#oldbox').on('click', '.check1', function() {
        if ($(this)[0].className == 'check check1') {
            $(this).addClass('on')
        } else {
            $(this).removeClass('on')
        }
        if (is_all($(this))) {
            $(this).parent().parent().find('.check0').addClass('on')
        } else {
            $(this).parent().parent().find('.check0').removeClass('on')
        }
    })
    var check2_evt = '';
    $('#oldbox').on('click', '.check2', function() {
            if (check2_evt != $(this)[0]) {
                $('#oldbox .check2').removeClass('on')
                $(this).addClass('on')
                check2_evt = $(this)[0]
            } else {
                $('#oldbox .check2').removeClass('on')
                check2_evt = '';
            }
            if ($(this).hasClass("on")) {
                is_jiandu = true;
            } else {
                is_jiandu = false;
            }
        })
        // 数据导入模块渲染
    $.ajax({
            url: url_ip + '/examine/getuserdata/',
            type: 'GET',
            data: {},
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function(data) {
                // console.log(data)
                if (data.status) {
                    for (var i = 0; i < data.data.length; i++) {
                        var index = i;
                        var li_html = '<li>' +
                            '<div><div class="radio"></div><label>' + data.data[i] + '</label><div class="data_opt"><button class="data_look">查看</button><button class="data_delete">删除</button></div></div>' +
                            '<dl>' +
                            '<dt><span>X</span><span class="data_y">Y</span><i>字段</i></dt>' +
                            '<dd><div class="check check0"></div></dd>' +
                            '</dl>' +
                            '</li>'
                        $('#oldbox ul').append(li_html);
                        var data_name = $("#oldbox").find("li:eq(" + i + ") label").text();

                        if (data_name.substr(data_name.length - 4) == ".csv" || data_name.substr(data_name.length - 4) == ".CSV") {
                            $("#oldbox li:eq(" + i + ") .data_look").css({
                                "visibility": "inherit"
                            });
                        } else {
                            $("#oldbox li:eq(" + i + ") .data_look").css({
                                "visibility": "hidden"
                            });
                            $(".data_look").eq(i).parents("li").hide();
                        }
                        $.ajax({
                            url: url_ip + '/examine/getuserdatalabel/',
                            type: 'GET',
                            async: false,
                            data: { name: data.data[i] },
                            dataType: 'json',
                            headers: { 'Authorization': token },
                            success: function(result) {
                                //console.log(result)
                                if (result.status) {
                                    for (var j = 0; j < result.label.length; j++) {
                                        var dd_html = '<dd id=' + j + '>' +
                                            '<div class="check check1"></div>' +
                                            '<div class="check check2"></div>' +
                                            '<b>' + result.label[j] + '</b>' +
                                            '</dd>'
                                        $('#oldbox ul li:eq(' + index + ') dl').append(dd_html)
                                    }
                                }
                            },
                            error: function(result) {
                                //console.log(result)
                            }
                        })
                    }
                } else {
                    // alertmsg(data.msg, '', 2)
                    $('.alertMsg').showMsg({
                        isImg: 'isNo',
                        h2txt: data.msg,
                        ptxt: '',
                        setTime: 2000
                    });
                }
            },
            error: function(data) {
                //console.log(data)
            }
        })
        // 联系我们
    var touch_us = document.createElement('a');
    $(touch_us).html('请联系我们，反馈这个错误')
    $(touch_us).attr({ href: 'feedback.html' })
        // 消息提示msgbox
        // function alertmsg(msg, tag, num) {
        //     var timeout;
        //     $('.mu2').show();
        //     $('.msgbox img').removeClass('on')
        //     if (num == 1) {
        //         $('.success').addClass('on')
        //         $('.msgbox span').css('color', '#06415E')
        //         clearTimeout(timeout)
        //         $('.msgbox span').html(msg);
        //         $('.msgbox').fadeIn();
        //         timeout = setTimeout(function() {
        //             $('.msgbox').fadeOut();
        //             $('.mu2').hide();
        //         }, 1000)
        //     } else {
        //         $('.fail').addClass('on')
        //         $('.msgbox span').css('color', '#DC1010')
        //         clearTimeout(timeout)
        //         $('.msgbox span').html(msg);
        //         $('.msgbox').fadeIn();
        //         timeout = setTimeout(function() {
        //             $('.msgbox').fadeOut();
        //             $('.mu2').hide();
        //         }, 3000)
        //     }
        // }
    $('.defname').click(function() {

        })
        // 关闭控制台
    $('.textarea_title img').click(function() {
            $('.CodeMirror').css('height', 'calc(100vh - 60px)')
        })
        /* lkw-20181130-算法提交S */

    //获取标签数据
    function cun_modelTR_tDataFn(needId, nowIndex, is3) {
        // $('.cun_modelTR_t').addClass('active'); //加载等待
        $(".sf_save_boxcd3_bq").addClass('active');
        $('.cun_modelTR_t3 ul').eq(nowIndex).html('');
        $.ajax({
            async: true,
            type: "GET",
            cache: false,
            url: url_ip + '/labels/all_labels/',
            data: { id: needId },
            dataType: "json",
            headers: { "Authorization": token },
            success: function(res) {
                // console.log(res);
                
                if (res.data == '') {
                    if (is3) {
                        $('.cun_modelTR_t3 ul').eq(2).hide();
                    }
                } else {
                    // var nowUlHtml = '';
                    // for (var i = 0; i < res.data.length; i++) {
                    //     nowUlHtml += '<li data-index="' + nowIndex + '" data-id="' + res.data[i].id + '" data-type="' + res.data[i].classify + '"><p><span>' + res.data[i].label_name + '</span><i></i></p></li>'
                    // }
                    // $('.cun_modelTR_t3 ul').eq(nowIndex).html(nowUlHtml);
                    var nowUlHtml = '';
                    for (var i = 0; i < res.data.length; i++) {
                        nowUlHtml += '<div data-index="' + nowIndex + '" data-id="' + res.data[i].id + '" data-type="' + res.data[i].classify + '">' + res.data[i].label_name + '<i></i></div>'
                    }
                    $('.sf_save_boxcd3_bq').html(nowUlHtml);
                    if (is3) {
                        var ul3_h = $('.cun_modelTR_t3 ul').eq(1).children('li[data-id="' + needId + '"]').offset().top - 68 + 10; //三级框定位top
                        $('.cun_modelTR_t3 ul').eq(2).css({ top: ul3_h });
                    }
                    $('.cun_modelTR_t3 ul').eq(nowIndex).show().nextAll().hide();
                }
            },
            error: function(err) {
                //console.log(err)
            },
            complete: function() {
                if(backupData.labels.length) {
                    $('.sf_save_boxcd3_bq div').map((item,value) => {
                        for(var i = 0; i < backupData.labels.length; i++) {
                            if(+$(value).attr('data-id') === +backupData.labels[i].id) {
                                $(value).addClass('on');
                                $(value).children().addClass('on')
                            }
                        }
                    })
                }
                // $('.cun_modelTR_t').removeClass('active'); //加载等待
                $(".sf_save_boxcd3_bq").removeClass('active');
            }
        })
    }
    // 点击标签内容
    $('.cun_modelTR_t3 ul').on('click', 'li', function() {
            var nowIndex = $(this).attr('data-index') - 0;
            var nowId = $(this).attr('data-id') - 0;
            if (nowIndex == 0) {
                cun_modelTR_tDataFn(nowId, nowIndex + 1);
            } else if (nowIndex == 1) {
                cun_modelTR_tDataFn(nowId, nowIndex + 1, 'alert3');
            } else {

            }
        })
        // 添加标签
    $('.cun_modelTR_t3 ul').on('click', 'li i', function() {
            var needI = $(this).closest('li').attr('data-index');
            var needId = $(this).closest('li').attr('data-id');
            var needType = $(this).closest('li').attr('data-type');
            if ($('.mine_spanDiv_chiose1 ul').children('li').length != 0 && $('.mine_spanDiv_chiose1 ul').children('li[data-id="' + needId + '"]').length != 0) {

            } else {
                var goTxt = $(this).closest('li').text();
                var goHtml = '<li data-i="' + needI + '" data-id="' + needId + '" data-type="' + needType + '"><span>' + goTxt + '</span><i>	×</i></li>';
                $('.mine_spanDiv_chiose1 ul').append(goHtml);
            }
            return false;
        })
        // 空格-回车添加自定义标签
        // $('#mine_spanDiv_keyDown').focus(function () {
    $('#mine_spanDiv_keyDown').keydown(function(e) {
        var e = e || window.event;
        if (e.keyCode == 13 || e.keyCode == 32) { //回车-空格
            e.preventDefault();
            var goTxt2 = $('#mine_spanDiv_keyDown').val().trim();
            var regTest = new RegExp(/[\\\/]+/);
            if (!regTest.test(goTxt2)) {
                if (goTxt2 == '') {

                } else {
                    if ($('.mine_spanDiv_chiose2 ul').children('li').length != 0 && $('.mine_spanDiv_chiose2 ul').children('li[data-txt="' + goTxt2 + '"]').length != 0) { //没有添加过
                        // alertmsg('标签不能重复', '', 0);
                        $('.alertMsg').showMsg({
                            isImg: 'isNo',
                            h2txt: '标签不能重复',
                            ptxt: '',
                            setTime: 2000
                        });
                    } else {
                        var goHtml2 = '<li data-txt="' + goTxt2 + '"><span>' + goTxt2 + '</span><i>	×</i></li>';
                        $('.mine_spanDiv_chiose2 ul').append(goHtml2);
                    }
                    $('#mine_spanDiv_keyDown').val('');
                }
            } else {
                // alertmsg('请输入输入文字、数字、字母', '', 0);
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '自定义标签不能带有\\或/',
                    ptxt: '',
                    setTime: 2000
                });
            }
        }

    })
    $('.sf_save_boxcd4>p>input').keydown(function(e) {
        var e = e || window.event;
        if (e.keyCode == 13 || e.keyCode == 32) { //回车-空格
            e.preventDefault();
            var goTxt2 = $('.sf_save_boxcd4>p>input').val().trim();
            var regTest = new RegExp(/[\\\/]+/);
            if (!regTest.test(goTxt2)) {
                if (goTxt2 == '') {} else {
                    if ($('.sf_save_boxcd4_zbq').children('div').length != 0 && $('.sf_save_boxcd4_zbq').children('div[data-txt="' + goTxt2 + '"]').length != 0) { //没有添加过
                        // alertmsg('标签不能重复', '', 0);
                        $('.alertMsg').showMsg({
                            isImg: 'isNo',
                            h2txt: '标签不能重复',
                            ptxt: '',
                            setTime: 2000
                        });
                    } else {
                        var goHtml2 = '<div data-txt="' + goTxt2 + '">' + goTxt2 + '<i></i></div>';
                        $('.sf_save_boxcd4_zbq').append(goHtml2);
                    }
                    $('.sf_save_boxcd4>p>input').val('');
                }
            } else {
                // alertmsg('请输入输入文字、数字、字母', '', 0);
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '自定义标签不能带有\\或/',
                    ptxt: '',
                    setTime: 2000
                });
            }
        }
    })
    $('.sf_save_boxcd4>p>button').on("click", function() {
            var goTxt2 = $('.sf_save_boxcd4>p>input').val().trim();
            var regTest = new RegExp(/[\\\/]+/);
            if (!regTest.test(goTxt2)) {
                if (goTxt2 == '') {} else {
                    if ($('.sf_save_boxcd4_zbq').children('div').length != 0 && $('.sf_save_boxcd4_zbq').children('div[data-txt="' + goTxt2 + '"]').length != 0) { //没有添加过
                        // alertmsg('标签不能重复', '', 0);
                        $('.alertMsg').showMsg({
                            isImg: 'isNo',
                            h2txt: '标签不能重复',
                            ptxt: '',
                            setTime: 2000
                        });
                    } else {
                        var goHtml2 = '<div data-txt="' + goTxt2 + '">' + goTxt2 + '<i></i></div>';
                        $('.sf_save_boxcd4_zbq').append(goHtml2);
                    }
                    $('.sf_save_boxcd4>p>input').val('');
                }
            } else {
                // alertmsg('请输入输入文字、数字、字母', '', 0);
                $('.alertMsg').showMsg({
                    isImg: 'isNo',
                    h2txt: '自定义标签不能带有\\或/',
                    ptxt: '',
                    setTime: 2000
                });
            }
        })
        // })
        // 移除选中
    $('.mine_spanDiv_chiose').on('click', 'li i', function() {
            $(this).closest('li').remove();
        })
        // 鼠标移出隐藏三级标签
    $('.cun_modelTR_t ul').eq(2).on('mouseenter', function() {
            $('.cun_modelTR_t ul').eq(2).on('mouseleave', function() { $(this).hide() })
        })
        // 算法分类下拉
    $(".sf_save_boxcd1>div:eq(1)>i").on("click", function() {
            if ($(".sf_save_boxcd1>div:eq(1)>ul").css("display") == "none") {
                $(".sf_save_boxcd1>div:eq(1)>ul").show();
            } else {
                $(".sf_save_boxcd1>div:eq(1)>ul").hide();
            }
        })
        // 算法下拉选择
    $(".sf_save_boxcd1>div:eq(1)>ul>li").on("click", function() {
        $(".sf_save_boxcd1>div:eq(1)>input").val($(this).text());
        $(".sf_save_boxcd1>div:eq(1)>ul").hide();
    })
    $(".sf_save_boxcd3_bq").on("click", "div", function() {
        $(this).toggleClass("on");
        $(this).children("i").toggleClass("on");
    })
    $(".sf_save_boxcd4_zbq").on("click", "div>i", function() {
        $(this).parent().remove();
    })
});
(function($) {
    // {isImg: isImg(isNo, isOk), h2txt: h2txt, ptxt: ptxt, cllbackFn: cllbackFn, setTime: setTime}
    // isImg: isOk(默认),isNo
    // 用法示例: $('.shade').showMsg(); $('.shade').showMsg({h2txt: '我是标题'});
    // setTime(int)延时关闭时间, 不填默认不自动关闭, 类型错误时默认3000ms
    $.fn.showMsg = function(obj) {
        $(this).fadeIn();
        $(this).find('h6').removeClass('isOk isNo');
        // $(this).find('h6').removeClass('isNo')
        if (obj) {
            obj.isImg ? $(this).find('h6').addClass(obj.isImg) : $(this).find('h6').addClass('isOk');
            obj.h2txt ? $(this).find('h2').html(obj.h2txt) : '';
            obj.ptxt ? $(this).find('p.msg-content').html(obj.ptxt) : $(this).find('p').html('');
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