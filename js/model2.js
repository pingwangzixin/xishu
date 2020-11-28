// var token = "JWT " + window.sessionStorage.token;
//console.log(url_ip)

$(function() {
    $('.lkw-msg-box-close').on('click', function() {
        window.location.href = 'index.html'
    })
    var search = decodeURI(window.location.search.substr(1))
    var search_id = search.substr(0, search.indexOf('&'))
    var search_title = search.substr(search.indexOf('&') + 1)
    if (search_id && search_title) {
        xrScene(search_id, search_title)
    }
    // 获取场景id
    var scene_id;
    $.ajax({
        url: url_ip + '/model/sceneid/',
        type: 'GET',
        data: {},
        datatype: 'json',
        success: function(data) {
            //console.log(data)
            if (data.status) {
                scene_id = data.data
            }
        }
    })
    var reg = /^[\u4E00-\u9FA5]+$/
        /*画布宽高自适应*/
    var canvas_width_lkw = $(window).width() - 62; //应为60, 但在浏览器缩放时, canvas会掉下去, 可能为不同浏览器缩放时对宽度解读有问题
    var canvas_height_lkw = $(window).height() - 100;
    // var canvas_lkw_tagname = document.getElementsByTagName("canvas");
    // canvas_lkw_tagname.width=canvas_width_lkw;
    // canvas_lkw_tagname.height=canvas_height_lkw;





    $('canvas').attr({ width: canvas_width_lkw, height: canvas_height_lkw });
    window.onresize = function() {
        var canvas_width_lkw = $(window).width() - 62;
        var canvas_height_lkw = $(window).height() - 100;
        $('canvas').attr({ width: canvas_width_lkw, height: canvas_height_lkw });
    }
    var canvas = document.getElementById('canvas'); /*获取画布*/
    var stage = new JTopo.Stage(canvas); /*创建舞台*/
    var scene = new JTopo.Scene(stage); /*创建场景*/
    // 禁止拖拽画布操作
    stage.mousedrag(function(e) {
        stage.setCenter($('canvas').width() / 2, $('canvas').height() / 2);
    });
    var icon_src = ''; /*图标图片路径*/
    var icon_class = null; /*图表类型*/
    var move_icon; /*移动中的图标*/
    var links = []; /*连线两端的节点集合*/
    var aaa;
    $('img').on('mousedown', function(e) {
        e.preventDefault() /*禁止系统默认的图片拖拽*/
    })
    $('.zujian img').mousedown(function(evt) {
        evt = evt || window.event;
        var x = evt.clientX - 13;
        var y = evt.clientY - 13;
        icon_src = $(this).attr('src').substr(0, $(this).attr('src').lastIndexOf('.'))
        icon_class = $(this).next().html()
        move_icon = document.createElement('div')
        $(move_icon).css({ left: x + 'px', top: y + 'px', width: '26px', height: '26px', position: 'absolute', background: 'url(' + icon_src + '.png)', backgroundSize: '100%', opacity: 0.6, zIndex: 9, cursor: 'url(img/zq2.ico),auto' })
        $('body').append(move_icon)
        $(document).live('mousemove', function(evt) {
            evt = evt || window.event;
            var x = evt.clientX - 13;
            var y = evt.clientY - 13;
            $(move_icon).css({ top: y + 'px', left: x + 'px' })
        })
    })
    $(document).live('mouseup', function() {
        icon_src = '';
        icon_class = null;
        $(move_icon).remove()
    })
    var x1;
    var y1;
    $(canvas).live('mouseenter', function() {
            $(move_icon).mouseup(function(evt) {
                var evt = evt || window.event
                x1 = $(canvas).offset().left;
                y1 = $(canvas).offset().top;
                var x = evt.clientX - x1 - 17;
                var y = evt.clientY - y1 - 17;
                if (icon_class) {
                    if (icon_class == '数 据 集') {
                        var txt = '未选择文件'
                        var type = 'sj'
                    } else if (icon_class == '数据接入') {
                        var txt = '未接入数据库'
                        var type = 'ku'
                    } else if (icon_class == '上传数据') {
                        var txt = '未上传文件'
                        var type = 'up'
                    } else if (icon_class == '数据加工') {
                        var txt = '数据加工'
                        var type = 'wk'
                    } else if (icon_class == '算 法 集') {
                        var txt = '未选择算法'
                        var type = 'sf'
                    } else if (icon_class == '结果展示') {
                        var txt = '结果展示'
                        var type = 'jg'
                    } else if (icon_class == '可 视 化') {
                        var txt = '可 视 化'
                        var type = 'ksh'
                    }
                    var node = new JTopo.Node(txt);
                    node.fontColor = "255,255,255";
                    node.font = "12px 微软雅黑";
                    node.textPosition = 'Middle_Center';
                    node.textOffsetX = 16;
                    node.setImage(icon_src + "_1.png");
                    node.img = icon_src + "_1.png";
                    node.setSize(128, 32);
                    node.setLocation(x, y);
                    node.showSelected = true;
                    node.type = type
                    node.canshu = []
                    scene.add(node);
                    if (!$('.Tabcj')[0]) {
                        $('h1 ol').append('<li class="Tabcj"><div>场景(新建场景)</div><img src="img/guan2.png"></li>')
                    }
                    tabW()
                    tabClick($('.Tabcj'))
                    $(move_icon).css({ cursor: 'auto' });
                    $(move_icon).remove();
                    icon_class = null;
                    nodeClick(node)
                }
                return false;
            })
        })
        /*判断两点之间只能连一条线*/
    function isonly(nodeArr) {
        if (nodeArr[1].inLinks) {
            for (var i = 0; i < nodeArr[1].inLinks.length; i++) {
                if (nodeArr[1].inLinks[i].nodeA == nodeArr[0]) {
                    return false
                }
            }
        }
        return true
    }
    /*判断两点之间不能互相连线*/
    function isManner(nodeArr) {
        if (nodeArr[1].outLinks) {
            for (var i = 0; i < nodeArr[1].outLinks.length; i++) {
                if (nodeArr[1].outLinks[i].nodeZ == nodeArr[0]) {
                    return false
                }
            }
        }
        return true
    }
    /*连线规则*/
    function lianjie(nodeArr) {
        if (nodeArr[0] != nodeArr[1]) {
            if (!isManner(nodeArr)) {
                return '连接错误：两点之间只能同时存在一种连接方式'
            }
            if (!nodeArr[1].inLinks || isonly(nodeArr)) {
                if (nodeArr[0].type == 'sj') {
                    if (nodeArr[1].type == 'sf' || nodeArr[1].type == 'hb' || nodeArr[1].type == 'wk' || nodeArr[1].type == 'ksh') {
                        return '正确的连接方式'
                    } else if (nodeArr[1].type == 'ku') {
                        return '连接错误：已上传文件的数据是无法赋值给数据库文件的。'
                    } else if (nodeArr[1].type == 'jg') {
                        return '连接错误：数据文件无法通过结果展示查看。'
                    } else if (nodeArr[1].type == 'up') {
                        return '连接错误'
                    }
                } else if (nodeArr[0].type == 'up') {
                    if (nodeArr[1].type == 'sf' || nodeArr[1].type == 'hb' || nodeArr[1].type == 'wk' || nodeArr[1].type == 'ksh') {
                        return '正确的连接方式'
                    } else if (nodeArr[1].type == 'ku') {
                        return '连接错误：已上传文件的数据是无法赋值给数据库文件的。'
                    } else if (nodeArr[1].type == 'jg') {
                        return '连接错误：数据文件无法通过结果展示查看。'
                    } else if (nodeArr[1].type == 'sj') {
                        return '连接错误'
                    }
                } else if (nodeArr[0].type == 'ku') {
                    if (nodeArr[1].type == 'sf' || nodeArr[1].type == 'hb' || nodeArr[1].type == 'wk') {
                        return '正确的连接方式'
                    } else if (nodeArr[1].type == 'sj') {
                        return '连接错误：数据库文件的数据是无法赋值给已上传文件的。'
                    } else if (nodeArr[1].type == 'jg') {
                        return '连接错误：数据库文件无法通过结果展示查看。'
                    } else if (nodeArr[1].type == 'up') {
                        return '连接错误'
                    }
                } else if (nodeArr[0].type == 'wk') {
                    if (nodeArr[1].type == 'sf' || nodeArr[1].type == 'hb') {
                        return '正确的连接方式'
                    } else if (nodeArr[1].type == 'sj' || nodeArr[1].type == 'ku' || nodeArr[1].type == 'jg' || nodeArr[1].type == 'up') {
                        return '连接错误：加工处理过后的数据是无法赋值给已上传文件或数据库文件的，也无法通过结果展示查看具体内容。'
                    }
                } else if (nodeArr[0].type == 'sf') {
                    if (nodeArr[1].type == 'sf' || nodeArr[1].type == 'jg' || nodeArr[1].type == 'sj' || nodeArr[1].type == 'ku') {
                        return '正确的连接方式'
                    }
                } else {
                    return '连接错误：只能由其他组件赋值给“结果展示”组件，反过来是错误的。'
                }
            } else {
                return '连接错误：任意两个组件之间只能同时存在一条连接线。。'
            }
        } else {
            return '';
        }
    }
    /*节点点击事件*/
    function nodeClick(node) {
        var evtx;
        var evty;
        node.addEventListener('mousedown', function(evt) {
            var evt = evt || window.event;
            evtx = evt.clientX;
            evty = evt.clientY;
            if (evt.button == 0) {
                $('.fun').hide()
            }
        })
        node.addEventListener('mouseup', function(evt) {
            var evt = evt || window.event;
            var evtx2 = evt.clientX;
            var evty2 = evt.clientY;
            if (evt.button == 0 && Math.abs(evtx2 - evtx) <= 10 && Math.abs(evty2 - evty) <= 10) { /*判断为非拖拽事件*/
                links.push(node)
                if (links.length < 2) {
                    var node2 = new JTopo.Node();
                    node2.setSize(0, 0);
                    node2.setLocation(evtx2 - x1, evty2 - y1);
                    var link = new JTopo.Link();
                    link.nodeA = node;
                    link.nodeZ = node2;
                    link.lineWidth = 1;
                    link.arrowsRadius = 6;
                    link.strokeColor = '255,200,20'
                    scene.addEventListener('mousemove', function(evt) {
                        var evt = evt || window.event
                        var x2 = evt.clientX - x1;
                        var y2 = evt.clientY - y1;
                        node2.setLocation(x2, y2);
                    })
                    scene.add(link);
                    aaa = link;
                } else {
                    scene.remove(aaa);
                    if (lianjie(links) == '正确的连接方式') {
                        var link2 = new JTopo.FoldLink(links[0], links[1]);
                        link2.lineWidth = 1;
                        link2.arrowsRadius = 6;
                        link2.bundleOffset = 0;
                        link2.direction = 'vertical';
                        link2.strokeColor = '255,200,20'
                        scene.add(link2);
                        link2.dbclick(function() {
                            link2.nodeZ.outLinks = null;
                            scene.remove(link2)
                        })
                        links = [];
                    } else if (lianjie(links) && lianjie(links).substr(0, 4) == '连接错误') {
                        //console.log(lianjie(links).substr(0,4))
                        alertmsg(lianjie(links), 0)
                        links = [];
                    } else {
                        links = [];
                    }
                }
            } else if (evt.button == 2) {
                $('.fun').hide()
                var top = evt.target.y + 50 - 6
                var left = evt.target.x + 124
                if (evt.target.type == 'sj') {
                    $('.sj_fun').css({ top: top + 'px', left: left + 'px' })
                    $('.sj_fun ul')[0]._id = evt.target._id
                    $('.sj_fun').show()
                } else if (evt.target.type == 'ku') {
                    $('.ku_fun').css({ top: top + 'px', left: left + 'px' })
                    $('.ku_fun ul')[0]._id = evt.target._id
                    $('.ku_fun').show()
                } else if (evt.target.type == 'up') {
                    $('.up_fun').css({ top: top + 'px', left: left + 'px' })
                    $('.up_fun ul')[0]._id = evt.target._id
                    $('.up_fun').show()
                } else if (evt.target.type == 'hb') {
                    $('.hb_fun').css({ top: top + 'px', left: left + 'px' })
                    $('.hb_fun ul')[0]._id = evt.target._id
                    $('.hb_fun').show()
                } else if (evt.target.type == 'wk') {
                    $('.wk_fun').css({ top: top + 'px', left: left + 'px' })
                    $('.wk_fun ul')[0]._id = evt.target._id
                    $('.wk_fun').show()
                } else if (evt.target.type == 'sf') {
                    $('.sf_fun').css({ top: top + 'px', left: left + 'px' })
                    $('.sf_fun ul')[0]._id = evt.target._id
                    $('.sf_fun').show()
                } else if (evt.target.type == 'jg') {
                    $('.jg_fun').css({ top: top + 'px', left: left + 'px' })
                    $('.jg_fun ul')[0]._id = evt.target._id
                    $('.jg_fun').show()
                } else if (evt.target.type == 'ksh') {
                    $('.ksh_fun').css({ top: top + 'px', left: left + 'px' })
                    $('.ksh_fun ul')[0]._id = evt.target._id
                    $('.ksh_fun').show()
                }
            }
        })
    }
    /*鼠标点击空白处触发的事件*/
    scene.click(function(evt) {
            if (evt.target == null) {
                if (aaa) {
                    scene.remove(aaa);
                }
                $('.fun').hide()
                links = [];
            }
        })
        /*控制字符串长度*/
    function txtLength(txt) {
        var txt1 = txt.split('')
        var length = 0
        var length2 = 0
        var txt2 = '';
        for (var i = 0; i < txt1.length; i++) {
            if (reg.test(txt1[i])) {
                length = length + 2
            } else {
                length++
            }
        }
        if (length <= 14) {
            return txt
        } else {
            for (var i = 0; i < txt1.length; i++) {
                if (length2 <= 12) {
                    if (reg.test(txt1[i])) {
                        length2 = length2 + 2
                    } else {
                        length2++
                    }
                    txt2 = txt2 + txt1[i]
                } else {
                    txt2 = txt2 + '...'
                    return txt2
                }
            }
        }
    }
    /*tab宽*/
    tabW()

    function tabW() {
        var tabW = ($('h1 ol').width() - 12) / $('h1 ol li').length
        $('h1 ol li').width(tabW)
    }
    /*tab切换*/
    function tabClick(job) {
        $('h1 ol li').removeClass('on')
        job.addClass('on')
        if (job.children('div').html().substr(0, 2) == '场景') {
            $('.YCCJ').hide()
            $('.fileDetail_box').hide()
            $('.datawork_box').hide()
            $('.echars_box').hide()
            $('.result_box').hide()
        } else if (job.children('div').html().substr(0, 2) == '查看') {
            $('.YCCJ').hide()
            $('.fileDetail_box').show()
            $('.datawork_box').hide()
            $('.echars_box').hide()
            $('.result_box').hide()
        } else if (job.children('div').html().substr(0, 4) == '数据加工') {
            $('.YCCJ').hide()
            $('.fileDetail_box').hide()
            $('.datawork_box').show()
            $('.echars_box').hide()
            $('.result_box').hide()
        } else if (job.children('div').html().substr(0, 3) == '可视化') {
            $('.YCCJ').hide()
            $('.fileDetail_box').hide()
            $('.datawork_box').hide()
            $('.echars_box').show()
            $('.result_box').hide()
        } else if (job.children('div').html().substr(0, 4) == '结果展示') {
            $('.YCCJ').hide()
            $('.fileDetail_box').hide()
            $('.datawork_box').hide()
            $('.echars_box').hide()
            $('.result_box').show()
        } else if (job.children('div').html().substr(0, 4) == '历史场景') {
            $('.fileDetail_box').hide()
            $('.datawork_box').hide()
            $('.echars_box').hide()
            $('.result_box').hide()
            $('.YCCJ').show()
        }
    }
    /*tab点击*/
    $('h1 li').live('click', function() {
            tabClick($(this))
        })
        /*tab删除*/
    $('h1 li img').live('click', function() {
            if ($(this).prev().html().substr(0, 2) == '查看') {
                $('.fileDetail_box').hide()
            } else if ($(this).prev().html().substr(0, 4) == '数据加工') {
                $('.datawork_box').hide()
            } else if ($(this).prev().html().substr(0, 3) == '可视化') {
                $('.echars_box').hide()
            } else if ($(this).prev().html().substr(0, 4) == '结果展示') {
                $('.result_box').hide()
            } else if ($(this).prev().html().substr(0, 2) == '场景') {
                scene.clear()
            } else if ($(this).prev().html().substr(0, 4) == '历史场景') {
                $('.YCCJ').hide()
            }
            if ($('.Tabcj')[0]) {
                tabClick($('.Tabcj'))
            }
            $(this).parent().remove()
            return false
        })
        /*历史场景获取*/
    $.ajax({
            url: url_ip + '/model/chuanimg/',
            type: 'GET',
            async: false,
            data: {},
            datatype: 'json',
            headers: { 'Authorization': token },
            success: function(data) {
                if (data.status) {
                    var result = data.data
                    for (var i = 0; i < result.length; i++) {
                        $('.YCCJ ul').append('<li data-id="' + result[i][1] + '">' +
                            '<img src="' + result[i][2] + '">' +
                            '<div>' + result[i][0] + '</div>' +
                            '<p title="' + result[i][3] + '">' + result[i][3] + '</p>' +
                            '<h3>' + result[i][4] + '</h3>' +
                            '</li>')
                    }
                }
            },
            error: function(err) {
                // console.log(err)
            }
        })
        /*历史场景点击*/
    $('.historyScene').click(function() {
            if ($('.Tablscj')[0]) {
                $('.Tablscj').children('div').html('历史场景')
            } else {
                $('h1 ol').append('<li class="Tablscj"><div>历史场景</div><img src="img/guan2.png"></li>')
            }
            tabW()
            tabClick($('.Tablscj'))
        })
        /*从历史场景新建*/
    $('.createNew').click(function() {
            if (!$('.Tabcj')[0]) {
                $('h1 ol').append('<li class="Tabcj"><div>场景(新建场景)</div><img src="img/guan2.png"></li>')
                tabW()
                tabClick($('.Tabcj'))
            } else {
                if (scene.childs && scene.childs.length > 0) {
                    var is = confirm('检测到工作台中有您正在操作的其他场景,为避免场景交叉造成混乱,是否清空之前操作并进行新建?(若不同意,请手动保存之前操作后再新建)')
                    if (is) {
                        tabClick($('.Tabcj'))
                        scene.clear()
                    }
                } else {
                    tabClick($('.Tabcj'))
                }
            }
        })
        /*查看历史场景*/
    function xrScene(id, title) {
        //console.log(id)
        $.ajax({
            url: url_ip + '/model/chuanimg/',
            type: 'GET',
            data: { obj_id: id },
            datatype: 'json',
            headers: { 'Authorization': token },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    var makeScene = false;
                    if ($('.Tabcj')[0]) {
                        if ($('.Tabcj div').html() == '场景(' + title + ')') {
                            tabClick($('.Tabcj'))
                        } else {
                            if (scene.childs && scene.childs.length > 0) {
                                var is = confirm('检测到工作台中有您正在操作的其他场景,为避免场景交叉造成混乱,是否清空之前操作并打开当前场景?(若不同意,请手动保存之前操作后再打开)')
                                if (is) {
                                    $('.Tabcj div').html('场景(' + title + ')')
                                    scene.clear()
                                    tabClick($('.Tabcj'))
                                    makeScene = true
                                }
                            } else {
                                $('.Tabcj div').html('场景(' + title + ')')
                                scene.clear()
                                tabClick($('.Tabcj'))
                                makeScene = true
                            }
                        }
                    } else {
                        $('h1 ol').append('<li class="Tabcj"><div>场景(' + title + ')</div><img src="img/guan2.png"></li>')
                        tabW()
                        tabClick($('.Tabcj'))
                        makeScene = true
                    }
                    if (makeScene) {
                        var list = data.info
                        var json = JSON.parse(list)
                        var nodelist = json.nodelist
                        for (var i = 0; i < nodelist.length; i++) {
                            //console.log(nodelist[i])
                            var node = new JTopo.Node(nodelist[i].text);
                            node.fontColor = nodelist[i].fontColor
                            node.font = nodelist[i].font;
                            node.fillColor = nodelist[i].fillColor;
                            node.setSize(nodelist[i].width, nodelist[i].height)
                            node.setLocation(nodelist[i].x, nodelist[i].y);
                            node.setImage(nodelist[i].img);
                            node.img = nodelist[i].img;
                            node.showSelected = true;
                            node.textOffsetX = nodelist[i].textOffsetX
                            node.textPosition = nodelist[i].textPosition
                            node._id = nodelist[i]._id
                            node.canshu = nodelist[i].canshu || ''
                            node.type = nodelist[i].type || ''
                            node.file = nodelist[i].file || ''
                            node.file_type = nodelist[i].file_type || ''
                            node.file_data = nodelist[i].file_data || ''
                            node.nodetext = nodelist[i].nodetext || ''
                            node.parm_x = nodelist[i].parm_x || ''
                            if (nodelist[i].parm_y) {
                                node.parm_y = nodelist[i].parm_y
                            }
                            node.parm_arr = nodelist[i].parm_arr || ''
                            node.cs = nodelist[i].cs || ''
                            node.source = nodelist[i].source || ''
                            node.base_data = nodelist[i].base_data || ''
                            node.algo_id = nodelist[i].algo_id || ''
                            node.def_name = nodelist[i].def_name || ''
                            node.isy = nodelist[i].isy || ''
                            node.isY = nodelist[i].isY || ''
                            node.result = nodelist[i].result || ''
                            node.result_id = nodelist[i].result_id || ''
                            node.resultArr = nodelist[i].resultArr || ''
                            scene.add(node)
                            nodeClick(node)
                        }
                        var linklist = json.linklist;
                        for (var i = 0; i < linklist.length; i++) {
                            var node_a = scene.findElements(function(e) {
                                return e._id == linklist[i].nodea;
                            });
                            var node_z = scene.findElements(function(e) {
                                return e._id == linklist[i].nodez;
                            });
                            var link = new JTopo.FoldLink(node_a[0], node_z[0])
                            link.lineWidth = 1;
                            link.arrowsRadius = 6;
                            link.bundleOffset = 0;
                            link.direction = 'vertical';
                            link.strokeColor = '255,200,20'
                            scene.add(link);
                            link.dbclick(function() {
                                link.nodeZ.outLinks = null;
                                scene.remove(link)
                            })
                        }
                        tabClick($('.Tabcj'))
                    }
                } else {
                    alertmsg(data.msg, 0)
                }
            },
            error: function(data) {
                //console.log(data)
            }
        })
    }
    $('.YCCJ li').live('click', function() {
            var id = $(this).attr('data-id')
            var title = $(this).children('div').html()
            xrScene(id, title)
        })
        /*鼠标经过节点操作按钮的事件*/
    $('.fun li').hover(function() {
            var num = $(this)[0].id.substr(2)
            $('.title' + num).show();
        }, function() {
            $('.fun h2 span').hide()
        })
        /*删除节点事件*/
    $('.li_cancle').click(function() {
            var id_num = $(this).parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            });
            scene.remove(nownode[0])
            $('.fun').hide()
        })
        /*选择文件*/
    function creatTable(d, x, x_num, y, y_num) {
        var data = []
        var arr = []
        for (var i = 0; i < Number(d); i++) {
            var j = i + 1
            arr.push('resulr_title' + j)
        }
        if (isNaN(x)) {
            var X = x.replace('x', x_num)
        } else {
            var X = x
        }
        var xn = eval(X)
        for (var i = 0; i < xn; i++) {
            var j = i + 1
            arr.push('resulr_x' + j)
        }
        if (isNaN(y)) {
            var Y = y.replace('y', y_num)
        } else {
            var Y = y
        }
        var yn = eval(Y)
        for (var i = 0; i < yn; i++) {
            var j = i + 1
            arr.push('resulr_y' + j)
        }
        data.push(arr)
        return data
    }
    $('.select_file').click(function(evt) {
            var id_num = $(this).parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            });
            var nownodeLeft = nownode[0].x + 86
            var nownodeTop = nownode[0].y + 46
            var maxTop = $(window).height() - 505
            var maxLeft = $(window).width() - 500
            if (nownodeTop >= maxTop) {
                nownodeTop = maxTop
            }
            if (nownodeLeft >= maxLeft) {
                nownodeLeft = nownodeLeft - 540
            }
            //console.log(nownode)
            $('.file_sure')[0]._id = id_num
            $('.fun').hide()
            if (nownode[0].inLinks && nownode[0].inLinks.length != 0) {
                var result_id = nownode[0].inLinks[0].nodeA.result_id
                if (result_id) {
                    $.ajax({
                        url: url_ip + '/model/db_field/',
                        type: 'GET',
                        data: { obj_id: result_id },
                        datatype: 'json',
                        headers: { 'Authorization': token },
                        beforeSend: function() {
                            $('.loading').show()
                        },
                        success: function(data) {
                            //console.log(data)
                            if (data.status) {
                                alertmsg(data.msg, 1)
                                $('.file_box').css({ 'left': nownodeLeft + 'px', 'top': nownodeTop + 'px' })
                                $('.file_box').show()
                                $('.file_box table').empty()
                                if (data.data.length <= 26) {
                                    for (var i = 0; i < Math.ceil(data.data.length / 2); i++) {
                                        var a = (i + 1) * 2 - 2
                                        var b = (i + 1) * 2
                                        var tr = document.createElement('tr')
                                        for (var j = a; j < b; j++) {
                                            var td = document.createElement('td');
                                            if (data.data[j]) {
                                                $(td).html(data.data[j])
                                                $(td)[0].obj_id = result_id
                                                $(td)[0].type = 'result'
                                                $(tr).append(td)
                                            } else {
                                                var td = document.createElement('td');
                                                $(td).html('--')
                                                $(tr).append(td)
                                            }
                                        }
                                        $('.file_box table').append(tr)
                                    }
                                    for (var i = 0; i < Math.floor((26 - data.data.length) / 2); i++) {
                                        var tr = document.createElement('tr')
                                        for (var j = 0; j < 2; j++) {
                                            var td = document.createElement('td');
                                            $(td).html('--')
                                            $(tr).append(td)
                                        }
                                        $('.file_box table').append(tr)
                                    }
                                } else {
                                    for (var i = 0; i < Math.ceil(data.data.length / 2); i++) {
                                        var a = (i + 1) * 2 - 2
                                        var b = (i + 1) * 2
                                        var tr = document.createElement('tr')
                                        for (var j = a; j < b; j++) {
                                            var td = document.createElement('td');
                                            if (data.data[j]) {
                                                $(td).html(data.data[j])
                                                $(td)[0].obj_id = result_id
                                                $(td)[0].type = 'result'
                                                $(tr).append(td)
                                            } else {
                                                var td = document.createElement('td');
                                                $(td).html('--')
                                                $(tr).append(td)
                                            }
                                        }
                                        $('.file_box table').append(tr)
                                    }
                                }
                            } else {
                                alertmsg(data.msg, 0)
                            }
                        },
                        error: function(data) {
                            //console.log(data)
                            if (data.status == 401) {
                                if (token == 'JWT undefined' || token == 'JWT null') {
                                    $('.shade p').html('您目前还没有注册或登录~ ')
                                    $('.shade').show();
                                } else {
                                    $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                                    $('.shade').show();
                                }
                            } else {
                                alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                            }
                        },
                        complete: function() {
                            $('.loading').hide()
                        }
                    })
                } else {
                    var resId = nownode[0].inLinks[0].nodeA._id
                    var resArr = nownode[0].inLinks[0].nodeA.resultArr
                    var x_length = nownode[0].inLinks[0].nodeA.parm_x.length
                    if (nownode[0].inLinks[0].nodeA.parm_y) {
                        var y_length = nownode[0].inLinks[0].nodeA.parm_y.length
                    } else {
                        var y_length = 0
                    }
                    var data = []
                    for (var i = 0; i < resArr.length; i++) {
                        data.push({ file_name: resArr[i].name, file_title: creatTable(resArr[i].d_r, resArr[i].x_r, x_length, resArr[i].y_r, y_length) })
                    }
                    $('.file_box').css({ 'left': nownodeLeft + 'px', 'top': nownodeTop + 'px' })
                    $('.file_box').show()
                    $('.file_box table').empty()
                    if (data.length <= 26) {
                        for (var i = 0; i < Math.ceil(data.length / 2); i++) {
                            var a = (i + 1) * 2 - 2
                            var b = (i + 1) * 2
                            var tr = document.createElement('tr')
                            for (var j = a; j < b; j++) {
                                var td = document.createElement('td');
                                if (data[j]) {
                                    $(td).html(data[j].file_name)
                                    $(td)[0].obj_id2 = resId
                                    $(td)[0].data = data[j].file_title
                                    $(td)[0].type = 'result'
                                    $(tr).append(td)
                                } else {
                                    var td = document.createElement('td');
                                    $(td).html('--')
                                    $(tr).append(td)
                                }
                            }
                            $('.file_box table').append(tr)
                        }
                        for (var i = 0; i < Math.floor((26 - data.length) / 2); i++) {
                            var tr = document.createElement('tr')
                            for (var j = 0; j < 2; j++) {
                                var td = document.createElement('td');
                                $(td).html('--')
                                $(tr).append(td)
                            }
                            $('.file_box table').append(tr)
                        }
                    } else {
                        for (var i = 0; i < Math.ceil(data.length / 2); i++) {
                            var a = (i + 1) * 2 - 2
                            var b = (i + 1) * 2
                            var tr = document.createElement('tr')
                            for (var j = a; j < b; j++) {
                                var td = document.createElement('td');
                                if (data[j]) {
                                    $(td).html(data[j].file_name)
                                    $(td)[0].obj_id2 = resId
                                    $(td)[0].data = data[j].file_title
                                    $(td)[0].type = 'result'
                                    $(tr).append(td)
                                } else {
                                    var td = document.createElement('td');
                                    $(td).html('--')
                                    $(tr).append(td)
                                }
                            }
                            $('.file_box table').append(tr)
                        }
                    }
                }
            } else {
                $.ajax({
                    type: 'GET',
                    url: url_ip + '/model/',
                    cache: false,
                    data: {},
                    datatype: "json",
                    headers: { "Authorization": token },
                    beforeSend: function() {
                        $('.loading').show()
                    },
                    success: function(data) {
                        //console.log(data)
                        alertmsg('数据文件请求成功', 1)
                        $('.file_box').css({ 'left': nownodeLeft + 'px', 'top': nownodeTop + 'px' })
                        $('.file_box').show()
                        $('.file_box table').empty()
                        if (data.length <= 26) {
                            for (var i = 0; i < Math.ceil(data.length / 2); i++) {
                                var a = (i + 1) * 2 - 2
                                var b = (i + 1) * 2
                                var tr = document.createElement('tr')
                                for (var j = a; j < b; j++) {
                                    var td = document.createElement('td');
                                    if (data[j]) {
                                        $(td).html(data[j].file_name)
                                        $(td)[0].obj_id = data[j].obj_id
                                        $(td)[0].type = 'upload'
                                        $(tr).append(td)
                                    } else {
                                        var td = document.createElement('td');
                                        $(td).html('--')
                                        $(tr).append(td)
                                    }
                                }
                                $('.file_box table').append(tr)
                            }
                            for (var i = 0; i < Math.floor((26 - data.length) / 2); i++) {
                                var tr = document.createElement('tr')
                                for (var j = 0; j < 2; j++) {
                                    var td = document.createElement('td');
                                    $(td).html('--')
                                    $(tr).append(td)
                                }
                                $('.file_box table').append(tr)
                            }
                        } else {
                            for (var i = 0; i < Math.ceil(data.length / 2); i++) {
                                var a = (i + 1) * 2 - 2
                                var b = (i + 1) * 2
                                var tr = document.createElement('tr')
                                for (var j = a; j < b; j++) {
                                    var td = document.createElement('td');
                                    if (data[j]) {
                                        $(td).html(data[j].file_name)
                                        $(td)[0].obj_id = data[j].obj_id
                                        $(td)[0].type = 'upload'
                                        $(tr).append(td)
                                    } else {
                                        var td = document.createElement('td');
                                        $(td).html('--')
                                        $(tr).append(td)
                                    }
                                }
                                $('.file_box table').append(tr)
                            }
                        }
                    },
                    error: function(data) {
                        //console.log(data)
                        if (data.status == 401) {
                            if (token == 'JWT undefined' || token == 'JWT null') {
                                $('.shade p').html('您目前还没有注册或登录~ ')
                                $('.shade').show();
                            } else {
                                $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                                $('.shade').show();
                            }
                        } else {
                            alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                        }
                    },
                    complete: function() {
                        $('.loading').hide()
                    }
                })
            }
        })
        /*文件列表点击事件*/
    $('.file_box').on('mousedown', 'td', function() {
            $('.file_box td').removeClass('on')
            $(this).addClass('on')
            $('.file_box .btn')[0].obj_id = $(this)[0].obj_id
            $('.file_box .btn')[0].obj_id2 = $(this)[0].obj_id2
            $('.file_box .btn')[0].type = $(this)[0].type
            return false
        })
        /*文件列表双击事件*/
    $('.file_box').on('dblclick', 'td', function() {
            $('.file_sure').click()
        })
        /*文件列表查看事件*/
    $('.file_look').click(function() {
            var obj_id = $(this).parent()[0].obj_id
            var type = $(this).parent()[0].type
            var name = $('.file_box td.on').html()
            if (type == 'result') {
                var filename = $('.file_box td.on').html()
            } else {
                var filename = ''
            }
            //console.log(type,obj_id,filename)
            if (obj_id) {
                $.ajax({
                    type: 'GET',
                    url: url_ip + "/model/readdata/",
                    cache: false,
                    data: { obj_id: obj_id, file_name: filename },
                    datatype: "json",
                    headers: { "Authorization": token },
                    beforeSend: function() {
                        $('.loading').show()
                    },
                    success: function(data) {
                        //console.log(data)
                        if (data.status) {
                            $('.fileDetail_box table').empty()
                            alertmsg(data.msg, 1)
                            $('.file_box input').val('')
                            if (data.data.length < 18) {
                                for (var i = 0; i < data.data.length; i++) {
                                    var tr = document.createElement('tr')
                                    for (var j = 0; j < data.data[i].length; j++) {
                                        var td = document.createElement('td')
                                        $(td).html(data.data[i][j])
                                        $(tr).append(td)
                                    }
                                    $('.fileDetail_box table').append(tr)
                                }
                                for (var a = 0; a < 18 - data.data.length; a++) {
                                    var tr = document.createElement('tr')
                                    for (var j = 0; j < data.data[0].length; j++) {
                                        var td = document.createElement('td')
                                        $(td).html('--')
                                        $(tr).append(td)
                                    }
                                    $('.fileDetail_box table').append(tr)
                                }
                            } else {
                                for (var i = 0; i < data.data.length; i++) {
                                    var tr = document.createElement('tr')
                                    for (var j = 0; j < data.data[i].length; j++) {
                                        var td = document.createElement('td')
                                        $(td).html(data.data[i][j])
                                        $(tr).append(td)
                                    }
                                    $('.fileDetail_box table').append(tr)
                                }
                            }
                            $('.fileDetail_box').show()
                            if ($('.Tabckwj')[0]) {
                                $('.Tabckwj').children('div').html('查看文件(' + name + ')')
                            } else {
                                $('h1 ol').append('<li class="Tabckwj"><div>查看文件(' + name + ')</div><img src="img/guan2.png"></li>')
                            }
                            tabW()
                            tabClick($('.Tabckwj'))
                        } else {
                            alertmsg(data.msg, 0)
                        }
                    },
                    error: function(data) {
                        //console.log(data)
                        if (data.status == 401) {
                            if (token == 'JWT undefined' || token == 'JWT null') {
                                $('.shade p').html('您目前还没有注册或登录~ ')
                                $('.shade').show();
                            } else {
                                $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                                $('.shade').show();
                            }
                        } else {
                            alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                        }
                    },
                    complete: function() {
                        $('.loading').hide()
                    }
                })
            } else {
                alertmsg('请先选择文件', 2)
            }
        })
        /*文件列表取消事件*/
    $('.file_no').click(function() {
            $('.file_box').hide()
        })
        /*文件列表确定事件*/
    $('.file_sure').click(function() {
            var id_num = $(this)[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            });
            var obj_id = $(this).parent()[0].obj_id
            var obj_id2 = $(this).parent()[0].obj_id2
            if (obj_id) {
                nownode[0].file = obj_id
                nownode[0].file_type = $('.file_box td.on')[0].type
                if (nownode[0].file_type == 'result') {
                    var filename = $('.file_box td.on').html()
                } else {
                    var filename = ''
                }
                $.ajax({
                    type: 'GET',
                    url: url_ip + "/model/readdata/",
                    cache: false,
                    data: { obj_id: nownode[0].file, file_name: filename },
                    datatype: "json",
                    headers: { "Authorization": token },
                    beforeSend: function() {
                        $('.loading').show()
                    },
                    success: function(data) {
                        //console.log(data)
                        if (data.status) {
                            alertmsg(data.msg, 1)
                            nownode[0].file_data = data.data
                            nownode[0].parm_x = [];
                            nownode[0].parm_y = [];
                        } else {
                            alertmsg(data.msg, 0)
                        }
                    },
                    error: function(data) {
                        //console.log(data)
                        if (data.status == 401) {
                            if (token == 'JWT undefined' || token == 'JWT null') {
                                $('.shade p').html('您目前还没有注册或登录~ ')
                                $('.shade').show();
                            } else {
                                $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                                $('.shade').show();
                            }
                        } else {
                            alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                        }
                    },
                    complete: function() {
                        $('.loading').hide()
                    }
                })
            } else if (obj_id2) {
                nownode[0].file_type = $('.file_box td.on')[0].type
                var filename = $('.file_box td.on').html()
                var file_data = $('.file_box td.on')[0].data
                $.ajax({
                    url: url_ip + '/model/allin/',
                    type: 'GET',
                    data: { alg_id: obj_id2, name: filename, sceneid: scene_id },
                    datatype: 'json',
                    success: function(data) {
                        //console.log(data)
                        if (data.status) {
                            nownode[0].file = obj_id2
                            nownode[0].file_data = file_data
                                //console.log(nownode[0].file)
                        }
                    },
                    error: function(data) {
                        //console.log(data)
                    }
                })
            } else {
                alertmsg('请先选择文件', 2)
            }
            nownode[0].text = txtLength($('.file_box td.on').html())
            nownode[0].nodetext = $('.file_box td.on').html()
            $('.file_box input').val('')
            $('.file_box table').empty()
            $('.file_box').hide()
        })
        /*文件列表搜索事件*/
    $('.file_box input').bind("input propertychange change", function() {
            if ($('.file_box input').val() != '') {
                var zz = $('.file_box input').val();
                $('.file_box td').css('display', 'none')
                $('.file_box td:contains("' + zz + '")').css('display', 'table-cell')
            } else {
                $('.file_box td').css('display', 'table-cell')
            }
        })
        /*文件详情弹窗点击关闭*/
    $('.fileDetail_close').click(function() {
            $('.fileDetail_box').hide()
            tabClick($('.Tabcj'))
        })
        /*查看文件*/
    $('.look_file').click(function() {
            var id_num = $(this).parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            });
            $('.fun').hide()
            if (nownode[0].file_data) {
                $('.fileDetail_box table').empty()
                var data = nownode[0].file_data
                if (data.length < 18) {
                    for (var i = 0; i < data.length; i++) {
                        var tr = document.createElement('tr')
                        for (var j = 0; j < data[i].length; j++) {
                            var td = document.createElement('td')
                            $(td).html(data[i][j])
                            $(tr).append(td)
                        }
                        $('.fileDetail_box table').append(tr)
                    }
                    for (var a = 0; a < 18 - data.length; a++) {
                        var tr = document.createElement('tr')
                        for (var j = 0; j < data[0].length; j++) {
                            var td = document.createElement('td')
                            $(td).html('--')
                            $(tr).append(td)
                        }
                        $('.fileDetail_box table').append(tr)
                    }
                } else {
                    for (var i = 0; i < data.length; i++) {
                        var tr = document.createElement('tr')
                        for (var j = 0; j < data[i].length; j++) {
                            var td = document.createElement('td')
                            $(td).html(data[i][j])
                            $(tr).append(td)
                        }
                        $('.fileDetail_box table').append(tr)
                    }
                }
                $('.fileDetail_box').show()
                if ($('.Tabckwj')[0]) {
                    $('.Tabckwj').children('div').html('查看文件(' + nownode[0].nodetext + ')')
                } else {
                    $('h1 ol').append('<li class="Tabckwj"><div>查看文件(' + nownode[0].nodetext + ')</div><img src="img/guan2.png"></li>')
                }
                tabW()
                tabClick($('.Tabckwj'))
            } else {
                alertmsg('当前为空文件', 0)
            }
        })
        /*打开数据库弹窗*/
    $('.input_data').click(function() {
            var id_num = $(this).parent()[0]._id
            $('.databaseSure')[0]._id = id_num;
            $('.database').show()
            $('.fun').hide()
        })
        // base64封装
    function Base64() {
        // private property  
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        // public method for encoding  
        this.encode = function(input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = _utf8_encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output +
                        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
                }
                return output;
            }
            // public method for decoding  
        this.decode = function(input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length) {
                    enc1 = _keyStr.indexOf(input.charAt(i++));
                    enc2 = _keyStr.indexOf(input.charAt(i++));
                    enc3 = _keyStr.indexOf(input.charAt(i++));
                    enc4 = _keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = _utf8_decode(output);
                return output;
            }
            // private method for UTF-8 encoding  
        _utf8_encode = function(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }
                return utftext;
            }
            // private method for UTF-8 decoding  
        _utf8_decode = function(utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }
    /*数据库弹窗确定事件*/
    $('.databaseSure').click(function() {
            var id_num = $(this)[0]._id
            var nownode = scene.findElements(function(e) {
                    return e._id == id_num
                })
                //console.log(id_num,nownode)
            var base = new Base64();
            var server = $('.database .v').val()
            var base64_server = base.encode(server);
            var port = $('.database .r').val()
            var base64_port = base.encode(port);
            var user = $('.database .u').val()
            var base64_user = base.encode(user);
            var password = $('.database .p').val()
            var base64_password = base.encode(password);
            var name = $('.database .n').val()
            var base64_name = base.encode(name);
            var file = $('.database .f').val()
            var base64_file = base.encode(file);
            //console.log(server,port,user,password,name,file,$('.database .c').val())
            if ($('.database .c').val() == 'MySQL') {
                var jiekou = '/model/mysql_database/'
            } else if ($('.database .c').val() == 'SQLserver') {
                var jiekou = '/model/sql_database/'
            } else if ($('.database .c').val() == 'Postgresql') {
                var jiekou = '/model/postgre_database/'
            } else if ($('.database .c').val() == 'MariaDB') {
                var jiekou = '/model/maria_database/'
            } else if ($('.database .c').val() == 'Oracle') {
                var jiekou = '/model/oracle_database/'
            }
            $.ajax({
                url: url_ip + jiekou,
                type: 'POST',
                data: {
                    host: base64_server,
                    port: base64_port,
                    username: base64_user,
                    password: base64_password,
                    db_name: base64_name,
                    table_name: base64_file
                },
                datatype: 'json',
                headers: { 'Authorization': token },
                beforeSend: function() {
                    $('.loading').show()
                },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        alertmsg(data.msg, 1)
                        $('.database').hide()
                        nownode[0].file = data.obj_id
                        nownode[0].file_data = data.data
                        nownode[0].text = txtLength(data.file_name)
                        nownode[0].nodetext = data.file_name
                        $('.fileDetail_box h2').html(data.file_name)
                        var data = data.data
                        if (data.length < 18) {
                            for (var i = 0; i < data.length; i++) {
                                var tr = document.createElement('tr')
                                for (var j = 0; j < data[i].length; j++) {
                                    var td = document.createElement('td')
                                    $(td).html(data[i][j])
                                    $(tr).append(td)
                                }
                                $('.fileDetail_box table').append(tr)
                            }
                            for (var a = 0; a < 18 - data.length; a++) {
                                var tr = document.createElement('tr')
                                for (var j = 0; j < data[0].length; j++) {
                                    var td = document.createElement('td')
                                    $(td).html('--')
                                    $(tr).append(td)
                                }
                                $('.fileDetail_box table').append(tr)
                            }
                        } else {
                            for (var i = 0; i < data.length; i++) {
                                var tr = document.createElement('tr')
                                for (var j = 0; j < data[i].length; j++) {
                                    var td = document.createElement('td')
                                    $(td).html(data[i][j])
                                    $(tr).append(td)
                                }
                                $('.fileDetail_box table').append(tr)
                            }
                        }
                        $('.fileDetail_box').show()
                        if ($('.Tabckwj')[0]) {
                            $('.Tabckwj').children('div').html('查看文件(' + file + ')')
                        } else {
                            $('h1 ol').append('<li class="Tabckwj"><div>查看文件(' + file + ')</div><img src="img/guan2.png"></li>')
                        }
                        tabW()
                        tabClick($('.Tabckwj'))
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                    if (data.status == 401) {
                        if (token == 'JWT undefined' || token == 'JWT null') {
                            $('.shade p').html('您目前还没有注册或登录~ ')
                            $('.shade').show();
                        } else {
                            $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                            $('.shade').show();
                        }
                    } else {
                        alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                    }
                },
                complete: function() {
                    $('.loading').hide()
                }
            })
        })
        /*数据库弹窗取消事件*/
    $('.databaseNo').click(function() {
            $('.database').hide()
        })
        /*数据接入节点查看事件*/
    $('.look_data').click(function() {
            var id_num = $(this).parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id = id_num
            })
            $('.fun').hide()
            if (nownode.base_data) {
                var data = nownode[0].base_data
                if (data.length < 18) {
                    for (var i = 0; i < data.length; i++) {
                        var tr = document.createElement('tr')
                        for (var j = 0; j < data[i].length; j++) {
                            var td = document.createElement('td')
                            $(td).html(data[i][j])
                            $(tr).append(td)
                        }
                        $('.fileDetail_box table').append(tr)
                    }
                    for (var a = 0; a < 18 - data.length; a++) {
                        var tr = document.createElement('tr')
                        for (var j = 0; j < data[0].length; j++) {
                            var td = document.createElement('td')
                            $(td).html('--')
                            $(tr).append(td)
                        }
                        $('.fileDetail_box table').append(tr)
                    }
                } else {
                    for (var i = 0; i < data.length; i++) {
                        var tr = document.createElement('tr')
                        for (var j = 0; j < data[i].length; j++) {
                            var td = document.createElement('td')
                            $(td).html(data[i][j])
                            $(tr).append(td)
                        }
                        $('.fileDetail_box table').append(tr)
                    }
                }
                $('.fileDetail_box').show()
                if ($('.Tabckwj')[0]) {
                    $('.Tabckwj').children('div').html('查看文件(' + nownode[0].nodetext + ')')
                } else {
                    $('h1 ol').append('<li class="Tabckwj"><div>查看文件(' + nownode[0].nodetext + ')</div><img src="img/guan2.png"></li>')
                }
                tabW()
                tabClick($('.Tabckwj'))
                $('.fun').hide()
            } else {
                alertmsg('当前数据为空，请首先接入数据', 2)
            }
        })
        /*打开上传文件弹窗*/
    $('.up_data').click(function() {
        $('.updata_box').show()
        $('.updaat_center')[0]._id = $(this).parent()[0]._id
    })
    $('.updata_box li').click(function() {
        $('.updata_box li').removeClass('on')
        $(this).addClass('on')
        var acept = $(this).attr('data-type')
        $('.updata_box input[type="file"]').attr('accept', acept)
    })
    $('.fegge').click(function() {
        if ($(this).val() != "," && $(this).val() != ";" && $(this).val() != "|") {
            $('.updata_box input[type="text"]').removeAttr('disabled')
        } else {
            $('.updata_box input[type="text"]').attr('disabled', true)
            $('.updata_box input[type="text"]').val('')
        }
    })
    $('.updata_box input[type="text"]').blur(function() {
        var html = $(this).val()
        $('.fegge option:eq(3)').val(html)
        $('.fegge').val(html)
    })
    $('.updata_box input[type="file"]').live('change', function() {
        var name = $(this)[0].files[0].name
        $('.updata_box span').html(name)
    })
    $('.up_sure').click(function() {
        var id_num = $(this).parent()[0]._id
        var nownode = scene.findElements(function(e) {
            return e._id == id_num
        });
        var fgf = $('.fegge').val()
        var is_header = $('.biaot').val()
        var file = $('.updata_box input[type="file"]')[0].files[0]
        var name = file.name
        var formData = new FormData();
        formData.append("user", '1');
        formData.append("file_name", file);
        formData.append("label", '1');
        formData.append("is_header", is_header);
        formData.append("column_delimiter", fgf);
        $.ajax({
            type: 'POST',
            url: url_ip + '/files/judge/',
            cache: false,
            data: { name: name },
            datatype: "json",
            headers: { "Authorization": token },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    $.ajax({
                        type: 'POST',
                        url: url_ip + '/files/',
                        cache: false,
                        data: formData,
                        datatype: "json",
                        processData: false,
                        /*告诉jQuery不要去处理发送的数据*/
                        contentType: false,
                        /*告诉jQuery不要去设置Content-Type请求头*/
                        headers: { "Authorization": token },
                        beforeSend: function() {
                            $('.loading').show()
                        },
                        success: function(data) {
                            //console.log(data)
                            if (data.status) {
                                alertmsg(data.msg, 1);
                                var id5 = data.objid
                                $.ajax({
                                    type: 'GET',
                                    url: url_ip + "/model/readdata/",
                                    cache: false,
                                    data: { obj_id: id5 },
                                    datatype: "json",
                                    headers: { "Authorization": token },
                                    success: function(data) {
                                        //console.log(data)
                                        if (data.status) {
                                            nownode[0].file = id5
                                            nownode[0].file_data = data.data
                                            nownode[0].parm_x = [];
                                            nownode[0].parm_y = [];
                                            nownode[0].text = txtLength(name)
                                            nownode[0].nodetext = name
                                            $('.updata_box').hide()
                                        }
                                    },
                                    error: function(data) {
                                        //console.log(data)
                                    }
                                })
                            } else {
                                alertmsg(data.msg, 0)
                            }
                        },
                        error: function(data) {
                            if (data.status == 400) {
                                alertmsg('<' + name + '>' + '文件的文件名格式或者文件格式不正确,上传失败', 0);
                            } else if (data.status == 401) {
                                if (token == 'JWT undefined' || token == 'JWT null') {
                                    $('.shade p').html('您目前还没有注册或登录~ ')
                                    $('.shade').show();
                                } else {
                                    $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                                    $('.shade').show();
                                }
                            }
                        },
                        complete: function() {
                            $('.loading').hide()
                        }
                    });
                } else {
                    alertmsg(data.msg, 0);
                }
            },
            error: function(data) {
                //console.log(data)
                if (data.status == 401) {
                    if (token == 'JWT undefined' || token == 'JWT null') {
                        $('.shade p').html('您目前还没有注册或登录~ ')
                        $('.shade').show();
                    } else {
                        $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                        $('.shade').show();
                    }
                }
            }
        })
    })
    $('.updata_box i').click(function() {
            $('.updata_box').hide()
        })
        /*选择算法*/
    $('.select_algo').click(function() {
        var id_num = $(this).parent()[0]._id
        var nownode = scene.findElements(function(e) {
            return e._id == id_num
        })
        var nownodeLeft = nownode[0].x + 86
        var nownodeTop = nownode[0].y + 46
        var maxTop = $(window).height() - 505
        var maxLeft = $(window).width() - 500
        if (nownodeTop >= maxTop) {
            nownodeTop = maxTop
        }
        if (nownodeLeft >= maxLeft) {
            nownodeLeft = nownodeLeft - 540
        }
        $('.algo_box').css({ left: nownodeLeft + 'px', top: nownodeTop + 'px' })
        $('.algo_box').show()
        $('.algo_look')[0]._id = id_num
        $('.algo_sure')[0]._id = id_num
        $('.fun').hide()
        $.ajax({
            type: "GET",
            url: url_ip + "/examine/upalgocrud/",
            async: false,
            data: {},
            dataType: "json",
            headers: { "Authorization": token },
            beforeSend: function() {
                $('.loading').show()
            },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    alertmsg(data.msg, 1)
                    $('.algo_box ol li').empty()
                    dataToTwotd(data.datahoop_alg, $('.algo_box .pingtai'))
                    dataToTwotd(data.self_alg, $('.algo_box .geren'))
                    dataToTwotd(data.purchased, $('.algo_box .syong'))
                } else {
                    alertmsg(data.msg, 0)
                }
            },
            error: function(data) {
                //console.log(data)
                if (data.status == 401) {
                    if (token == 'JWT undefined' || token == 'JWT null') {
                        $('.shade p').html('您目前还没有注册或登录~ ')
                        $('.shade').show();
                    } else {
                        $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                        $('.shade').show();
                    }
                } else {
                    alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                }
            },
            complete: function() {
                $('.loading').hide()
            }
        })
    })

    function dataToTwotd(data, obj) {
        $.each(data, function(key, value) {
            obj.append('<div>' + key + '</div>')
            var table = document.createElement('table')
            if (value.length > 0) {
                for (var i = 0; i < Math.ceil(value.length / 2); i++) {
                    var a = (i + 1) * 2 - 2
                    var b = (i + 1) * 2
                    var tr = document.createElement('tr')
                    for (var j = a; j < b; j++) {
                        var td = document.createElement('td');
                        if (value[j]) {
                            $(td).html(value[j][1])
                            $(td)[0].algo_id = value[j][0]
                            $(tr).append(td)
                        } else {
                            var td = document.createElement('td');
                            $(td).html('--')
                            $(tr).append(td)
                        }
                    }
                    table.append(tr)
                }
            } else {
                var tr = document.createElement('tr')
                for (var i = 0; i < 2; i++) {
                    var td = document.createElement('td');
                    $(td).html('--')
                    $(tr).append(td)
                    table.append(tr)
                }
            }
            obj.append(table)
        })
    }
    /*算法搜索*/
    $('.algo_box .search i').click(function() {
            if ($('.algo_box ul li.on').html() == '平台自有') {
                var type = 'datahoop'
            } else if ($('.algo_box ul li.on').html() == '个人自建') {
                var type = 'self'
            } else if ($('.algo_box ul li.on').html() == '商用自选') {
                var type = 'buy'
            }
            //console.log(type)
            $.ajax({
                url: url_ip + '/model/search_alg/',
                type: 'GET',
                data: { classify: type, keyword: $('.algo_box .search input').val() },
                datatype: 'json',
                headers: { 'Authorization': token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        if (type == 'datahoop') {
                            $('.pingtai table').empty()
                            dataToTwotd(data.data, $('.algo_box .pingtai table'), 24)
                        } else if (type == 'self') {
                            $('.geren table').empty()
                            dataToTwotd(data.data, $('.algo_box .geren table'), 24)
                        } else if (type == 'buy') {
                            $('.syong table').empty()
                            dataToTwotd(data.data, $('.algo_box .syong table'), 24)
                        }
                    }
                },
                error: function(data) {
                    //console.log(data)
                }
            })
        })
        /*算法列表选项卡点击*/
    $('.algo_box ul li').click(function() {
            $('.algo_box ul li').removeClass('on')
            $(this).addClass('on')
            if ($(this).html() == '平台自有') {
                $('.algo_box ul i').css('left', 0)
                $('.algo_box ol li').hide()
                $('.pingtai').show()
            } else if ($(this).html() == '个人自建') {
                $('.algo_box ul i').css('left', '94px')
                $('.algo_box ol li').hide()
                $('.geren').show()
            } else if ($(this).html() == '商用自选') {
                $('.algo_box ul i').css('left', '188px')
                $('.algo_box ol li').hide()
                $('.syong').show()
            }
        })
        /*算法列表内容点击*/
    $('.algo_box').on('click', 'td', function() {
            $('.algo_box td').removeClass('on')
            $(this).addClass('on')
        })
        /*算法列表确定事件*/
    $('.algo_box').on('dblclick', 'td', function() {
            $('.algo_sure').click()
        })
        /*算法列表取消事件*/
    $('.algo_no').click(function() {
            $('.algo_box').hide()
        })
        /*算法列表查看事件*/
    $('.algo_look').click(function() {
            if ($('.geren td.on')[0]) {
                if ($('.geren td.on')[0].algo_id) {
                    window.open("python3/python_online.html?" + 1 + "&" + $('.geren td.on')[0].algo_id)
                } else {
                    alertmsg('请先选择算法', 2)
                }
            } else if ($('.pingtai td.on')[0]) {
                if ($('.pingtai td.on')[0].algo_id) {
                    alertmsg('很抱歉，您没有权限查看该算法的源代码', 2)
                } else {
                    alertmsg('请先选择算法', 2)
                }
            } else if ($('.syong td.on')[0]) {
                if ($('.syong td.on')[0].algo_id) {
                    alertmsg('很抱歉，您没有权限查看该算法的源代码', 2)
                } else {
                    alertmsg('请先选择算法', 2)
                }
            } else {
                alertmsg('请先选择算法', 2)
            }
        })
        /*算法列表确定事件*/
    $('.algo_sure').click(function() {
            var id_num = $(this)[0]._id
            if ($('.algo_box td.on')[0].algo_id) {
                var nownode = scene.findElements(function(e) {
                        return e._id == id_num
                    })
                    //console.log(id_num,nownode)
                nownode[0].text = txtLength($('.algo_box td.on').html())
                nownode[0].nodetext = $('.algo_box td.on').html()
                nownode[0].algo_id = $('.algo_box td.on')[0].algo_id
                nownode[0].canshu = [];
                nownode[0].cs = [];
                nownode[0].parm_arr = [];
                nownode[0].parm_x = [];
                if (nownode[0].parm_y) {
                    nownode[0].parm_y = null;
                    //console.log(666666666)
                }
                $('.algo_box table').empty()
                $('.algo_box').hide()
                $('.set_algo').click()
            }
        })
        /*算法参数配置事件*/
    $('.set_algo').click(function() {
            var id_num = $(this).parent()[0]._id
            $('.set_sure')[0]._id = id_num
            $('.set_reset')[0]._id = id_num
            $('.set_XY')[0]._id = id_num
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            var nownodeLeft = nownode[0].x + 86
            var nownodeTop = nownode[0].y + 46
            var maxTop = $(window).height() - 505
            var maxLeft = $(window).width() - 600
            if (nownodeTop >= maxTop) {
                nownodeTop = maxTop
            }
            if (nownodeLeft >= maxLeft) {
                nownodeLeft = nownodeLeft - 640
            }
            $('.fun').hide()
            if (nownode[0].algo_id) {
                $.ajax({
                    type: "GET",
                    url: url_ip + "/examine/upalgocrud/?id=" + nownode[0].algo_id + "&adopt=" + 1,
                    async: false,
                    data: {},
                    dataType: "json",
                    headers: { "Authorization": token },
                    beforeSend: function() {
                        $('.loading').show()
                    },
                    success: function(data) {
                        //console.log(data)
                        if (data.status) {
                            alertmsg(data.msg, 1)
                            nownode[0].def_name = data.data.funcname;
                            $('.set_Y').remove()
                            $('.parm_box').empty()
                            $('.set_X b').attr('title', data.data.configuration.x_msg)
                            if (data.data.configuration.y_msg) {
                                $('.set_configure .set_XY').append('<div class="set_Y"><span>分组列 <b title="' + data.data.configuration.y_msg + '">?</b></span><em>--- 请选择y列号/数值 ---</em></div>')
                                nownode[0].isY = true
                            } else {
                                nownode[0].isY = false
                            }
                            if (data.data.configuration.csin) {
                                var arr = data.data.configuration.csin;
                                $.each(arr, function(key, value) {
                                    if (value.option.code == 1001) {
                                        var val = nownode[0].canshu[key] || value.default
                                        $('.parm_box').append('<li code="1001"><span>' + value.name + ' <b title="' + value.describe + '">?</b></span><input type="text" value="' + val + '" class="' + data.data.configuration.defname + key + '" data_type="' + value.type + '"></li>')
                                    } else if (value.option.code == 1002) {
                                        var li = document.createElement('li')
                                        $(li).attr('code', '1002')
                                        $(li).append('<span>' + value.name + ' <b title="' + value.describe + '">?</b></span>')
                                        var select = document.createElement('select');
                                        $(select).addClass(data.data.configuration.defname + key + '')
                                        $(select).attr('data_type', value.type)
                                        var index = 0
                                        for (var i = 0; i < value.option.content.length; i++) {
                                            if (value.option.content[i] != '') {
                                                var option = document.createElement('option');
                                                if (value.option.content[i] === true) {
                                                    var optionname = 'true'
                                                } else if (value.option.content[i] === false) {
                                                    var optionname = 'false'
                                                } else if (value.option.content[i] === null) {
                                                    var optionname = 'null'
                                                } else {
                                                    var optionname = value.option.content[i]
                                                }
                                                $(option).attr('value', optionname);
                                                $(option)[0].innerHTML = optionname
                                                $(select).append(option)
                                                if (nownode[0].canshu[key]) {
                                                    if (nownode[0].canshu[key] == value.option.content[i]) {
                                                        index = i
                                                    }
                                                }
                                            }
                                        }
                                        $(select)[0].options.selectedIndex = index
                                        $(li).append(select)
                                        $('.parm_box').append(li)
                                    } else if (value.option.code == 1003) {
                                        var a2 = value.option.content[0].a2
                                        var b2 = value.option.content[1].b2
                                        var check1 = 'checked'
                                        var check2 = null;
                                        if (nownode[0].canshu[key]) {
                                            for (var k in nownode[0].canshu[key]) {
                                                //console.log(k,value.option.content[0].a1,value.option.content[1].b1)
                                                if (k == value.option.content[0].a1) {
                                                    a2 = nownode[0].canshu[key][k]
                                                } else if (k == value.option.content[1].b1) {
                                                    b2 = nownode[0].canshu[key][k]
                                                    check1 = null
                                                    check2 = 'checked'
                                                        //console.log(1003)
                                                } else {
                                                    //console.log(666)
                                                }
                                            }
                                        }
                                        var html = '<li code="1003">' +
                                            '<span>' + value.name + ' <b title="' + value.describe + '">?</b></span>' +
                                            '<span><input type="radio" name="' + data.data.configuration.defname + key + '" id="' + data.data.configuration.defname + key + '_1" ' + check1 + '><label for="' + data.data.configuration.defname + key + '_1">' + value.option.content[0].a1 + '</label></span>' +
                                            '<input type="text" class="radio_input" value="' + a2 + '" data_type="' + value.type + '">' +
                                            '<span><input type="radio" name="' + data.data.configuration.defname + key + '" id="' + data.data.configuration.defname + key + '_2" ' + check2 + '><label for="' + data.data.configuration.defname + key + '_2">' + value.option.content[1].b1 + '</label></span>' +
                                            '<input type="text" class="radio_input" value="' + b2 + '" data_type="' + value.type + '">' +
                                            '</li>'
                                        $('.parm_box').append(html)
                                    }
                                })
                                $('.Scaler_func1').parent().hide()
                                $('.Scaler_func2').parent().hide()
                            } else {
                                $('.parm_box').append('<p>此算法没有参数项</p>')
                            }
                            nownode[0].resultArr = data.data.configuration.resultArr
                            $('.set_configure').css({ 'left': nownodeLeft + 'px', 'top': nownodeTop + 'px' })
                            $('.set_configure').show()
                        } else {
                            alertmsg(data.msg, 0)
                        }
                    },
                    error: function(data) {
                        //console.log(data)
                        if (data.status == 401) {
                            if (token == 'JWT undefined' || token == 'JWT null') {
                                $('.shade p').html('您目前还没有注册或登录~ ')
                                $('.shade').show();
                            } else {
                                $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                                $('.shade').show();
                            }
                        } else {
                            alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                        }
                    },
                    complete: function() {
                        $('.loading').hide()
                    }
                })
            } else {
                alertmsg('请先选择算法', 2)
            }
        })
        /*参数配置弹窗输入框取消拖拽事件*/
    $('.set_configure').on('mousemove', 'input,select', function() {
            $(document).unbind('mousemove')
        })
        /*参数配置弹窗取消事件*/
    $('.set_no').click(function() {
            $('.set_configure').hide()
        })
        /*参数配置弹窗重置事件*/
    $('.set_reset').click(function() {
            var id_num = $(this)[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            nownode[0].canshu = []
            $.ajax({
                type: "GET",
                url: url_ip + "/examine/upalgocrud/?id=" + nownode[0].algo_id + "&adopt=" + 1,
                async: false,
                data: {},
                dataType: "json",
                headers: { "Authorization": token },
                beforeSend: function() {
                    $('.loading').show()
                },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        alertmsg(data.msg, 1)
                        nownode[0].def_name = data.data.funcname;
                        $('.set_Y').remove()
                        $('.parm_box').empty()
                        if (data.data.configuration.y_msg) {
                            $('.set_configure .set_XY').append('<div class="set_Y"><span>分组列 <b title="' + data.data.configuration.y_msg + '">?</b></span><em>--- 请选择y列号/数值 ---</em></div>')
                            nownode[0].isY = true
                        } else {
                            nownode[0].isY = false
                        }
                        if (data.data.configuration.csin) {
                            var arr = data.data.configuration.csin;
                            $.each(arr, function(key, value) {
                                if (value.option.code == 1001) {
                                    var val = nownode[0].canshu[key] || value.default
                                    $('.parm_box').append('<li code="1001"><span>' + value.name + ' <b title="' + value.describe + '">?</b></span><input type="text" value="' + val + '" class="' + data.data.configuration.defname + key + '" data_type="' + value.type + '"></li>')
                                } else if (value.option.code == 1002) {
                                    var li = document.createElement('li')
                                    $(li).attr('code', '1002')
                                    $(li).append('<span>' + value.name + ' <b title="' + value.describe + '">?</b></span>')
                                    var select = document.createElement('select');
                                    $(select).addClass(data.data.configuration.defname + key + '')
                                    $(select).attr('data_type', value.type)
                                    var index = 0
                                    for (var i = 0; i < value.option.content.length; i++) {
                                        if (value.option.content[i] != '') {
                                            var option = document.createElement('option');
                                            if (value.option.content[i] === true) {
                                                var optionname = 'true'
                                            } else if (value.option.content[i] === false) {
                                                var optionname = 'false'
                                            } else if (value.option.content[i] === null) {
                                                var optionname = 'null'
                                            } else {
                                                var optionname = value.option.content[i]
                                            }
                                            $(option).attr('value', optionname);
                                            $(option)[0].innerHTML = optionname
                                            $(select).append(option)
                                            if (nownode[0].canshu[key]) {
                                                if (nownode[0].canshu[key] == value.option.content[i]) {
                                                    index = i
                                                }
                                            }
                                        }
                                    }
                                    $(select)[0].options.selectedIndex = index
                                    $(li).append(select)
                                    $('.parm_box').append(li)
                                } else if (value.option.code == 1003) {
                                    var a2 = value.option.content[0].a2
                                    var b2 = value.option.content[1].b2
                                    var check1 = 'checked'
                                    var check2 = null;
                                    if (nownode[0].canshu[key]) {
                                        for (var k in nownode[0].canshu[key]) {
                                            //console.log(k,value.option.content[0].a1,value.option.content[1].b1)
                                            if (k == value.option.content[0].a1) {
                                                a2 = nownode[0].canshu[key][k]
                                            } else if (k == value.option.content[1].b1) {
                                                b2 = nownode[0].canshu[key][k]
                                                check1 = null
                                                check2 = 'checked'
                                                    //console.log(1003)
                                            } else {
                                                //console.log(666)
                                            }
                                        }
                                    }
                                    var html = '<li code="1003">' +
                                        '<span>' + value.name + ' <b title="' + value.describe + '">?</b></span>' +
                                        '<span><input type="radio" name="' + data.data.configuration.defname + key + '" id="' + data.data.configuration.defname + key + '_1" ' + check1 + '><label for="' + data.data.configuration.defname + key + '_1">' + value.option.content[0].a1 + '</label></span>' +
                                        '<input type="text" class="radio_input" value="' + a2 + '" data_type="' + value.type + '">' +
                                        '<span><input type="radio" name="' + data.data.configuration.defname + key + '" id="' + data.data.configuration.defname + key + '_2" ' + check2 + '><label for="' + data.data.configuration.defname + key + '_2">' + value.option.content[1].b1 + '</label></span>' +
                                        '<input type="text" class="radio_input" value="' + b2 + '" data_type="' + value.type + '">' +
                                        '</li>'
                                    $('.parm_box').append(html)
                                }
                            })
                            $('.Scaler_func1').parent().hide()
                            $('.Scaler_func2').parent().hide()
                        } else {
                            $('.parm_box').append('<p>此算法没有参数项</p>')
                        }
                        $('.set_configure').show()
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                    if (data.status == 401) {
                        if (token == 'JWT undefined' || token == 'JWT null') {
                            $('.shade p').html('您目前还没有注册或登录~ ')
                            $('.shade').show();
                        } else {
                            $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                            $('.shade').show();
                        }
                    } else {
                        alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                    }
                },
                complete: function() {
                    $('.loading').hide()
                }
            })
        })
        /*标准化联动*/
    $('.Scaler_func0').live('click', function() {
            if ($(this).val() == '特征二值化') {
                $('.Scaler_func2').parent().show()
                $('.Scaler_func1').parent().hide()
            } else if ($(this).val() == '自定义特征函数') {
                $('.Scaler_func1').parent().show()
                $('.Scaler_func2').parent().hide()
            } else {
                $('.Scaler_func2').parent().hide()
                $('.Scaler_func1').parent().hide()
            }
        })
        /*参数配置弹窗确定事件*/
    $('.set_sure').click(function() {
            var id_num = $(this)[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            var parm_arr = [];
            nownode[0].canshu = [];
            for (var i = 0; i < $('.parm_box li').length; i++) {
                var parm = $('.parm_box li')[i]
                if ($('.parm_box li')[i].getAttribute('code') == '1001') {
                    if (parm.children[1].getAttribute('data_type') == 'string') {
                        parm_arr.push('' + $(parm).children('input').val())
                    } else if (parm.children[1].getAttribute('data_type') == 'int' || parm.children[1].getAttribute('data_type') == 'float') {
                        parm_arr.push(Number($(parm).children('input').val()))
                    } else if (parm.children[1].getAttribute('data_type') == 'boolean') {
                        if ($(parm).children('input').val() == '是' || $(parm).children('input').val() == 'true' || $(parm).children('input').val() == 'True' || $(parm).children('input').val() == 'TRUE' || $(parm).children('input').val() == '1' || $(parm).children('input').val() == '对' || $(parm).children('input').val() == '正确') {
                            parm_arr.push('true')
                        } else {
                            parm_arr.push('false')
                        }
                    }
                    nownode[0].canshu.push($(parm).children('input').val())
                } else if ($('.parm_box li')[i].getAttribute('code') == '1002') {
                    if (parm.children[1].getAttribute('data_type') == 'string') {
                        parm_arr.push('' + $(parm).children('select').val())
                    } else if (parm.children[1].getAttribute('data_type') == 'int' || parm.children[1].getAttribute('data_type') == 'float') {
                        parm_arr.push(Number($(parm).children('select').val()))
                    } else if (parm.children[1].getAttribute('data_type') == 'boolean') {
                        if ($(parm).children('select').val() == '是' || $(parm).children('select').val() == 'true' || $(parm).children('select').val() == 'True' || $(parm).children('select').val() == 'TRUE' || $(parm).children('select').val() == '1' || $(parm).children('select').val() == '对' || $(parm).children('select').val() == '正确') {
                            parm_arr.push('true')
                        } else {
                            parm_arr.push('false')
                        }
                    }
                    nownode[0].canshu.push($(parm).children('select').val())
                } else if ($('.parm_box li')[i].getAttribute('code') == '1003') {
                    var parm_key = "" + $(parm).children('span').children('input[type=radio]:checked').next().html()
                    var parm_val = $(parm).children('span').children('input[type=radio]:checked').parent().next().val()
                    var obj1 = {};
                    obj1[parm_key] = parm_val;
                    nownode[0].canshu.push(obj1)
                    var obj = {};
                    if (parm.children[2].getAttribute('data_type') == 'string') {
                        obj[parm_key] = '' + parm_val
                        parm_arr.push(obj)
                    } else if (parm.children[2].getAttribute('data_type') == 'int' || parm.children[2].getAttribute('data_type') == 'float') {
                        obj[parm_key] = Number(parm_val)
                        parm_arr.push(obj)
                    } else if (parm.children[2].getAttribute('data_type') == 'boolean') {
                        if (parm_val == '是' || parm_val == 'true' || parm_val == 'True' || parm_val == 'TRUE' || parm_val == '1' || parm_val == '对' || parm_val == '正确') {
                            obj[parm_key] = 'true'
                            parm_arr.push(obj)
                        } else {
                            obj[parm_key] = 'false'
                            parm_arr.push(obj)
                        }
                    }
                }
            }
            nownode[0].parm_arr = parm_arr
            var nodeA = is_textnode(nownode[0].inLinks)
            if (nodeA && nodeA.file) {
                if (nodeA.file_type == 'result') {
                    var sheet = nodeA.nodetext
                } else {
                    var sheet = ''
                }
                var canshu = []
                canshu.push(nownode[0].nodetext)
                canshu.push(nownode[0].def_name)
                canshu.push(nodeA.file)
                canshu.push(sheet)
                if (nownode[0].parm_y) {
                    canshu.push({ 'x': nownode[0].parm_x, 'y': nownode[0].parm_y })
                    var isy = true
                } else {
                    canshu.push({ 'x': nownode[0].parm_x })
                    var isy = false
                }
                var cs = canshu.concat(nownode[0].parm_arr)
                nownode[0].cs = cs
                nownode[0].isy = isy
                var source = '';
                if ($('.algo_box ul li.on').html() == '平台自有') {
                    source = 'datahoop'
                } else if ($('.algo_box ul li.on').html() == '个人自建') {
                    source = 'self'
                } else if ($('.algo_box ul li.on').html() == '商用自选') {
                    source = 'buy'
                }
                nownode[0].source = source
                    //console.log(nownode)
                $('.set_configure').hide()
            } else {
                alertmsg('未连接输入数据或输入数据为空', 2)
            }
        })
        /*数值列弹窗打开事件*/
        // 获取文本节点
    function is_textnode(obj) {
        for (var i = 0; i < obj.length; i++) {
            //console.log(obj[i].nodeA)
            if (obj[i].nodeA.type == 'sj' || obj[i].nodeA.type == 'ku' || obj[i].nodeA.type == 'up' || obj[i].nodeA.type == 'wk') {
                return obj[i].nodeA
            }
        }
        return undefined
    }
    $('.set_X em').click(function() {
            var id_num = $(this).parent().parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            if (nownode[0].inLinks) {
                var nodeA = is_textnode(nownode[0].inLinks)
                if (nodeA && nodeA.file) {
                    var data = nodeA.file_data
                    $('.filedX_box')[0]._id = id_num;
                    $('.filedX_all dd').remove()
                    $('.filedX_selc dd').remove()
                    if (nownode[0].parm_x) {
                        for (var i = 0; i < data[0].length; i++) {
                            if (chac(i, nownode[0].parm_x)) {
                                $('.filedX_selc').append('<dd index=' + i + '><b class="on"></b><span>' + data[0][i] + '</span></dd>')
                            } else {
                                $('.filedX_all').append('<dd index=' + i + '><b></b><span>' + data[0][i] + '</span></dd>')
                            }
                        }
                        filed_add($('.filedX_all'))
                        filed_add($('.filedX_selc'))
                        $('.filedX_box').show()
                    } else {
                        for (var i = 0; i < data[0].length; i++) {
                            $('.filedX_all').append('<dd index=' + i + '><b></b><span>' + data[0][i] + '</span></dd>')
                        }
                        filed_add($('.filedX_all'))
                        filed_add($('.filedX_selc'))
                        $('.filedX_box').show()
                    }
                } else {
                    alertmsg('请先选择文件', 2)
                }
            } else {
                alertmsg('请先连接文件节点', 2)
            }
        })
        /*分组列向右添加事件*/
    $('.filedX_box .add').click(function() {
            var arr = $('.filedX_all dd b.on').parent()
            for (var i = 0; i < $('.filedX_selc dd').length; i++) {
                if ($('.filedX_selc dd')[i].innerHTML == '') {
                    $('.filedX_selc')[0].removeChild($('.filedX_selc dd')[i])
                    i--
                }
            }
            for (var i = 0; i < arr.length; i++) {
                $('.filedX_selc').append(arr[i])
            }
            filed_add($('.filedX_all'))
            filed_add($('.filedX_selc'))
            if ($('.filedX_all dd b').length == 0) {
                $(this).parent().prev().children('dt').children('div').children('b').removeClass('on')
            }
        })
        /*分组列向左添加的事件*/
    $('.filedX_box .remove').click(function() {
            var arr = $('.filedX_selc dd b.on').parent()
            for (var i = 0; i < $('.filedX_all dd').length; i++) {
                if ($('.filedX_all dd')[i].innerHTML == '') {
                    $('.filedX_all')[0].removeChild($('.filedX_all dd')[i])
                    i--
                }
            }
            for (var i = 0; i < arr.length; i++) {
                var pre_index = arr[i].getAttribute('index') - 1
                if (pre_index < 0) {
                    $('.filedX_all dt').after(arr[i])
                } else {
                    $('.filedX_all dd[index=' + pre_index + ']').after(arr[i])
                }
            }
            filed_add($('.filedX_all'))
            filed_add($('.filedX_selc'))
            if (check_on($('.filedX_all dd b'))) {
                $(this).parent().prev().children('dt').children('div').children('b').addClass('on')
            }
        })
        /*分组列确定事件*/
    $('.filedX_sure').click(function() {
            var id_num = $(this).parent().parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            nownode[0].parm_x = [];
            var arr = $('.filedX_selc dd b.on').parent()
            for (var i = 0; i < arr.length; i++) {
                nownode[0].parm_x.push($(arr[i]).attr('index'))
            }
            $('.filedX_box').hide()
        })
        /*分组列取消事件*/
    $('.filedX_no').click(function() {
            $('.filedX_box').hide()
        })
        /*分组列重置事件*/
    $('.filedX_reset').click(function() {
            var id_num = $(this).parent().parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            var nodeA = is_textnode(nownode[0].inLinks)
            var data = nodeA.file_data
            $('.filedX_all dd').remove()
            $('.filedX_selc dd').remove()
            for (var i = 0; i < data[0].length; i++) {
                $('.filedX_all').append('<dd index=' + i + '><b></b><span>' + data[0][i] + '</span></dd>')
            }
            filed_add($('.filedX_all'))
            filed_add($('.filedX_selc'))
        })
        /*分组列弹窗打开事件*/
    $('.set_Y em').live('click', function() {
            var id_num = $(this).parent().parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            if (nownode[0].inLinks) {
                var nodeA = is_textnode(nownode[0].inLinks)
                if (nodeA && nodeA.file) {
                    var data = nodeA.file_data
                        //console.log(data[0])
                    $('.filedY_box')[0]._id = id_num;
                    $('.filedY_all dd').remove()
                    $('.filedY_selc dd').remove()
                    if (nownode[0].parm_y) {
                        for (var i = 0; i < data[0].length; i++) {
                            if (chac(i, nownode[0].parm_y)) {
                                $('.filedY_selc').append('<dd index=' + i + '><b class="on"></b><span>' + data[0][i] + '</span></dd>')
                            } else {
                                $('.filedY_all').append('<dd index=' + i + '><b></b><span>' + data[0][i] + '</span></dd>')
                            }
                        }
                        filed_add($('.filedY_all'))
                        filed_add($('.filedY_selc'))
                        $('.filedY_box').show()
                    } else {
                        for (var i = 0; i < data[0].length; i++) {
                            $('.filedY_all').append('<dd index=' + i + '><b></b><span>' + data[0][i] + '</span></dd>')
                        }
                        filed_add($('.filedY_all'))
                        filed_add($('.filedY_selc'))
                        $('.filedY_box').show()
                    }
                } else {
                    alertmsg('请先选择文件', 2)
                }
            } else {
                alertmsg('请先连接文件节点', 2)
            }
        })
        /*数值列向右添加事件*/
    $('.filedY_box .add').click(function() {
            var arr = $('.filedY_all dd b.on').parent()
            for (var i = 0; i < $('.filedY_selc dd').length; i++) {
                if ($('.filedY_selc dd')[i].innerHTML == '') {
                    $('.filedY_selc')[0].removeChild($('.filedY_selc dd')[i])
                    i--
                }
            }
            if (arr.length > 1 || $('.filedY_selc dd').length >= 1) {
                alertmsg('数值列只能添加一个字段', 2)
            } else {
                $('.filedX_selc dd').remove()
                $('.filedY_selc').append(arr[0])
            }
            filed_add($('.filedY_all'))
            filed_add($('.filedY_selc'))
            if ($('.filedY_all dd b').length == 0) {
                $(this).parent().prev().children('dt').children('div').children('b').removeClass('on')
            }
        })
        /*数值列向左添加的事件*/
    $('.filedY_box .remove').click(function() {
            var arr = $('.filedY_selc dd b.on').parent()
            for (var i = 0; i < $('.filedY_all dd').length; i++) {
                if ($('.filedY_all dd')[i].innerHTML == '') {
                    $('.filedY_all')[0].removeChild($('.filedY_all dd')[i])
                    i--
                }
            }
            for (var i = 0; i < arr.length; i++) {
                var pre_index = arr[i].getAttribute('index') - 1
                if (pre_index < 0) {
                    $('.filedY_all dt').after(arr[i])
                } else {
                    $('.filedY_all dd[index=' + pre_index + ']').after(arr[i])
                }
            }
            filed_add($('.filedX_all'))
            filed_add($('.filedX_selc'))
            if (check_on($('.filedY_all dd b'))) {
                $(this).parent().prev().children('dt').children('div').children('b').addClass('on')
            }
        })
        /*数值列确定事件*/
    $('.filedY_sure').click(function() {
            var id_num = $(this).parent().parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            nownode[0].parm_y = [];
            var arr = $('.filedY_selc dd b.on').parent()
            for (var i = 0; i < arr.length; i++) {
                nownode[0].parm_y.push($(arr[i]).attr('index'))
            }
            $('.filedY_box').hide()
        })
        /*数值列取消事件*/
    $('.filedY_no').click(function() {
            $('.filedY_box').hide()
        })
        /*数值列重置事件*/
    $('.filedY_reset').click(function() {
            var id_num = $(this).parent().parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            var nodeA = is_textnode(nownode[0].inLinks)
            var data = nodeA.file_data
            $('.filedY_all dd').remove()
            $('.filedY_selc dd').remove()
            for (var i = 0; i < data[0].length; i++) {
                $('.filedY_all').append('<dd index=' + i + '><b></b><span>' + data[0][i] + '</span></dd>')
            }
            filed_add($('.filedY_all'))
            filed_add($('.filedY_selc'))
        })
        /*算法执行事件*/
        // 判断算法节点
    function is_algnode(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].nodeA.type == 'sf') {
                return obj[i].nodeA
            }
        }
        return undefined
    }
    $('.exe_algo').click(function() {
            $('.fun').hide()
            var id_num = $(this).parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            if (nownode[0].nodetext == '预测' && nownode[0].cs.length < 6) {
                var nodeA = is_algnode(nownode[0].inLinks)
                if (nodeA && nodeA.result_id) {
                    nownode[0].cs.push(nodeA.result_id)
                } else {
                    alertmsg('未连接训练模型', 2)
                }
            }
            //console.log(nownode,nownode[0].cs,nownode[0].isy,nownode[0].source)
            $.ajax({
                url: url_ip + '/model/selfimportRpc/',
                type: 'GET',
                data: { arg_list: JSON.stringify(nownode[0].cs), is_y: nownode[0].isy, source: nownode[0].source },
                datatype: 'json',
                headers: { 'Authorization': token },
                beforeSend: function() {
                    $('.loading').show()
                },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        alertmsg(data.msg, 1)
                        nownode[0].result_id = data.objId
                        nownode[0].result = data.data
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                    if (data.status == 401) {
                        if (token == 'JWT undefined' || token == 'JWT null') {
                            $('.shade p').html('您目前还没有注册或登录~ ')
                            $('.shade').show();
                        } else {
                            $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                            $('.shade').show();
                        }
                    } else {
                        alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                    }
                },
                complete: function() {
                    $('.loading').hide()
                }
            })
        })
        /*结果弹窗打开事件*/
    $('.look_result1').click(function() {
        var id_num = $(this).parent()[0]._id
        var nownode = scene.findElements(function(e) {
            return e._id == id_num
        })
        $('.fun').hide()
        if (nownode[0].inLinks && nownode[0].inLinks.length != 0) {
            var data = nownode[0].inLinks[0].nodeA.result
            $('.result_box ol').empty()
            for (var item in data) {
                //console.log(item)
                var li = document.createElement('li')
                var h3 = document.createElement('h3')
                var div = document.createElement('div')
                var table = document.createElement('table')
                $(h3).html(item.substr(item.indexOf('_') + 1))
                $(li).append(h3)
                $(li).append(div)
                if (item.substr(0, 4) == 'data') {
                    $(div).append(table)
                    for (var i = 0; i < data[item].length; i++) {
                        var tr = document.createElement('tr')
                        $(table).append(tr)
                        for (var j = 0; j < data[item][i].length; j++) {
                            var td = document.createElement('td')
                            td.innerHTML = data[item][i][j]
                            $(tr).append(td)
                        }
                    }
                    $('.result_box ol').append(li)
                } else if (item.substr(0, 3) == 'img') {
                    //console.log(data[item])
                    $(div).append('<img src="' + url_ip + '/model/pics/?type=' + data[item] + '&objID=' + nownode[0].inLinks[0].nodeA.result_id + '">')
                    $('.result_box ol').append(li)
                }
            }
            $('.result_box')[0].obj_id = nownode[0].inLinks[0].nodeA.result_id
            var name = nownode[0].inLinks[0].nodeA.nodetext
            if (name == 'SVM' || name == '朴素贝叶斯' || name == '随机森林' || name == '神经网络' || name == '逻辑回归' || name == 'KNN' || name == 'GBDT' || name == 'Adaboost' || name == '决策树') {
                ycOrXl()
            } else {
                $('.result_box select').hide()
            }
            $('.result_box').show()
            if ($('.Tabjgzs')[0]) {
                $('.Tabjgzs').children('div').html('结果展示(' + nownode[0].inLinks[0].nodeA.nodetext + ')')
            } else {
                $('h1 ol').append('<li class="Tabjgzs"><div>结果展示(' + nownode[0].inLinks[0].nodeA.nodetext + ')</div><img src="img/guan2.png"></li>')
            }
            tabW()
            tabClick($('.Tabjgzs'))
        } else {
            alertmsg('没有算法执行结果需要展示，请检查模型', 2)
        }
    })

    function ycOrXl() {
        $('.result_box select').show()
        var obj = $('.result_box ol li')
        for (var i = 0; i < obj.length; i++) {
            if ($(obj[i]).children('h3').html().substr(0, 3) == $('.result_box select').val()) {
                $(obj[i]).show()
            } else {
                $(obj[i]).hide()
            }
        }
    }
    $('.result_box select').live('change', function() {
            ycOrXl()
        })
        /*下载*/
    $('.result_box a').mousedown(function() {
            //console.log($('.result_box')[0].obj_id)
            $('.result_box a').attr('href', url_ip + '/model/self_alg_result/?obj_id=' + $('.result_box')[0].obj_id)
        })
        /*结果弹窗关闭事件*/
    $('.result_box .close').click(function() {
            $('.result_box').hide()
            tabClick($('.Tabcj'))
        })
        /*查重*/
    function chac(value, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (value == arr[i]) {
                return true
            }
        }
        return false
    }
    /*分组列、数值列自动补全空白事件*/
    function filed_add(arr) {
        if (arr.children('dd').length < 12) {
            var length = 12 - arr.children('dd').length
            for (var i = 0; i < length; i++) {
                arr.append('<dd></dd>')
            }
        }
    }
    /*分组列、数值列联动全选*/
    $('dt b').click(function() {
        $(this).toggleClass('on')
        if ($(this).is('.on')) {
            $(this).parent().parent().nextAll().children('b').addClass('on')
        } else {
            $(this).parent().parent().nextAll().children('b').removeClass('on')
        }
    })

    function check_on(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (!$(arr[i]).is('.on')) {
                return false
            }
        }
        return true
    }
    $('.filed_box dd').live('click', function() {
            $(this).children('b').toggleClass('on')
            if (check_on($('dd b'))) {
                $(this).parent().children('dt').children().children('b').addClass('on')
            } else {
                $(this).parent().children('dt').children().children('b').removeClass('on')
            }
        })
        /*弹窗可移动事件*/
    $('.movable').mousedown(function(evt) {
        var _this = $(this)
        var evt = evt || window.event
        var x_1 = evt.clientX;
        var y_1 = evt.clientY;
        var x_offset = x_1 - $(this).offset().left; /*点击位置到弹窗边框的距离*/
        var y_offset = y_1 - $(this).offset().top; /*点击位置到弹窗边框的距离*/
        $(document).mousemove(function(evt) {
            var evt = evt || window.event
            var x_2 = evt.clientX;
            var y_2 = evt.clientY;
            if (Math.abs(x_2 - x_1) >= 10 || Math.abs(y_2 - y_1) >= 10) {
                var leftX = x_2 - x_offset
                var topY = y_2 - y_offset
                _this.css({ left: leftX + 'px', top: topY + 'px' })
            }
        })
    })
    $(document).mouseup(function() {
            $(document).unbind('mousemove')
        })
        /*消息提示弹窗*/
    var lag;

    function alertmsg(msg, num) {
        clearTimeout(lag)

        function full(val) {
            if (val < 10) {
                return '0' + val
            }
            return val
        }
        var date = new Date();
        var year = date.getFullYear()
        var month = full(date.getMonth() + 1);
        var day = full(date.getDate());
        var hour = full(date.getHours());
        var minute = full(date.getMinutes());
        var second = full(date.getSeconds());
        var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
        if (num == 1) {
            $('.msg_text').append('<p class="success"><i>' + time + '</i><span>' + msg + '</span></p>')
            $('.msg_box').html('<i class="success"></i><span>' + msg + '</span>')
        } else if (num == 0) {
            $('.msg_text').append('<p class="error"><i>' + time + '</i><span>' + msg + '</span></p>')
            $('.msg_box').html('<i class="error"></i><span>' + msg + '</span>')
        } else {
            $('.msg_text').append('<p class="info"><i>' + time + '</i><span>' + msg + '</span></p>')
            $('.msg_box').html('<i class="info"></i><span>' + msg + '</span>')
        }
        var h = $('.msg_box span').height() / 2
        $('.msg_box span').css('margin-top', '-' + h + 'px')
        $('.msg_box').css('right', '5px')
        lag = setTimeout(function() {
            $('.msg_box').css('right', '-340px')
        }, 2000)
    }
    /*信息弹窗上/下拉*/
    $('.msgspace img:eq(0)').click(function() {
            var that = $(this)
            if ($(this).attr('src') == 'img/toup.png') {
                $('.msgspace').css('height', '400px')
                $('.msg_text').css('top', '0')
                that.attr('src', 'img/todw.png')
            } else {
                $('.msgspace').css('height', '60px')
                that.attr('src', 'img/toup.png')
                $('.msg_text').css('top', '')
            }
        })
        /*信息弹窗清空*/
    $('.msgspace img:eq(1)').click(function() {
            $('.msg_text').empty()
        })
        /*树形整理*/
    $('.down_tree').click(function() {
        var links = scene.childs.filter(function(e) {
            return e instanceof JTopo.Link;
        });
        for (var i = 0; i < links.length; i++) {
            links[i].direction = 'horizontal'
        }
        scene.doLayout(JTopo.layout.TreeLayout('down', 60, 60));
    })
    $('.right_tree').click(function() {
            var links = scene.childs.filter(function(e) {
                return e instanceof JTopo.Link;
            });
            for (var i = 0; i < links.length; i++) {
                links[i].direction = 'vertical'
            }
            scene.doLayout(JTopo.layout.TreeLayout('right', 40, 160));
        })
        /*数据加工请求封装*/
    function workAjax(now_page) {
        var p = new Promise(function(resolve, reject) {
            $('.datawork_box .load').show()
            var list = []
            var type;
            var page;
            var li_L = $('.workTop_box li').length
            if (li_L <= 1) {
                type = 0
            } else {
                type = 1
            }
            if (now_page) {
                page = now_page
            } else {
                page = 1
            }
            for (var i = 0; i < li_L; i++) {
                if (i == 0) {
                    list = [
                        ['F1', $('.workTop_box li:eq(' + i + ')').attr('data-id')]
                    ]
                } else if (i == 1) {
                    var k = i - 1;
                    var j = Number($('.workTop_box li')[i].className.substr(6)) + 1
                    list[0].push('F' + j, $('.workTop_box li:eq(' + i + ')').attr('data-id'), $('.workTop_box div:eq(' + k + ')')[0].ka, $('.workTop_box div:eq(' + k + ')')[0].kz, $('.workTop_box div:eq(' + k + ')')[0].type)
                } else {
                    var k = i - 1;
                    var j = Number($('.workTop_box li')[i].className.substr(6)) + 1;
                    list.push(['', '', 'F' + j, $('.workTop_box li:eq(' + i + ')').attr('data-id'), $('.workTop_box div:eq(' + k + ')')[0].ka, $('.workTop_box div:eq(' + k + ')')[0].kz, $('.workTop_box div:eq(' + k + ')')[0].type])
                }
            }
            //console.log(list)
            $.ajax({
                url: url_ip + '/model/datalink/',
                type: 'GET',
                data: { args_list: JSON.stringify(list), type: type, page: page },
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        resolve(data.status)
                        if (data.data.length > 0) {
                            if (page == 1) {
                                var data_title = data.data[0]
                                var detail = [];
                                for (var i = 1; i < data.data.length; i++) {
                                    detail.push(data.data[i])
                                }
                                dataToTable(data_title, detail)
                            } else {
                                var data_title = []
                                var detail = [];
                                for (var i = 0; i < data.data.length; i++) {
                                    detail.push(data.data[i])
                                }
                                dataToTable(data_title, detail)
                            }
                        }
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                },
                complete: function(data) {
                    $('.datawork_box .load').hide()
                }
            })
        })
        return p
    }
    /*加工-数据列表滚动条滚动触发吸顶title事件*/
    var now_page = 1;
    var Switch = true;
    var scroll_func;
    $('.work_table').scroll(function(e) {
            var firstTr = $('.work_table table').children('tbody').children(':first')
            var secondTr = $($('.work_table table').children('tbody').children().get(1))
            if ($(this).scrollTop() > 0) {
                for (var i = 0; i < firstTr.children().length; i++) {
                    var w1 = firstTr.children()[i].children[0].offsetWidth
                    var w2 = secondTr.children()[i].children[0].offsetWidth
                    if (w1 < w2) {
                        var w = w2
                    } else {
                        var w = w1
                    }
                    var box_w = $('.work_table')[0].scrollWidth
                    if (box_w <= 1326) {
                        firstTr.children()[i].style.width = w + 'px'
                        secondTr.children()[i].style.width = w + 'px'
                    } else {
                        firstTr.children()[i].children[0].style.width = w + 'px'
                        secondTr.children()[i].children[0].style.width = w + 'px'
                    }
                }
                firstTr.css({ position: 'absolute', left: '0', top: '0' })
                if ($(this).scrollLeft() > 0) {
                    var w = $(this).scrollLeft()
                    var left = -w
                    firstTr.css({ position: 'absolute', left: left + 'px', top: '0' })
                }
                if ($(this).scrollTop() + 460 >= $(this).children('table')[0].offsetHeight) {
                    if (Switch) {
                        Switch = false;
                        now_page++;
                        $.ajax({
                            type: 'GET',
                            url: url_ip + '/model/pageetl/',
                            data: { page: now_page },
                            datatype: 'json',
                            headers: { "Authorization": token },
                            success: function(data) {
                                //console.log(data)
                                if (data.status) {
                                    var data_title = []
                                    var detail = [];
                                    for (var i = 1; i < data.data.length; i++) {
                                        detail.push(data.data[i])
                                    }
                                    dataToTable(data_title, detail)
                                    alertmsg(data.msg, 1)
                                    Switch = true;
                                } else {
                                    alertmsg(data.msg, 0)
                                }
                            },
                            error: function(data) {
                                //console.log(data)
                                if (data.status == 401) {
                                    if (token == 'JWT undefined' || token == 'JWT null') {
                                        $('.shade p').html('您目前还没有注册或登录~ ')
                                        $('.shade').show();
                                    } else {
                                        $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                                        $('.shade').show();
                                    }
                                } else {
                                    alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                                }
                            }
                        })
                    }
                }
            } else {
                firstTr.css({ position: '', left: '', top: '' })
            }
        })
        /*点击数据加工事件*/
    var LiNum;
    $('.jiag_data').click(function() {
            now_page = 1
            var id_num = $(this).parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            $('.fun').hide()
            if (nownode[0].inLinks && nownode[0].inLinks.length != 0) {
                $('.datawork_box .load').show()
                var obj_id = nownode[0].file || nownode[0].inLinks[0].nodeA.file + ''
                var dataFile_name = nownode[0].nodetext || nownode[0].inLinks[0].nodeA.nodetext
                var dataFile_title;
                $('.workTop_box').empty()
                $('.workTop_box').append('<li style="left:8px;top:5px;" class="workli0" data-id="' + obj_id + '"><span>' + dataFile_name + '</span><img src="img/remove3.png"></li>')
                $('.workli0')[0].bingArr = []
                LiNum = 0;
                $('.datawork_box').show()
                if ($('.Tabsjjg')[0]) {
                    $('.Tabsjjg').children('div').html('数据加工(' + nownode[0].inLinks[0].nodeA.nodetext + ')')
                } else {
                    $('h1 ol').append('<li class="Tabsjjg"><div>数据加工(' + nownode[0].inLinks[0].nodeA.nodetext + ')</div><img src="img/guan2.png"></li>')
                }
                tabW()
                tabClick($('.Tabsjjg'))
                $('.datawork_box')[0]._id = id_num

                function promiseA() {
                    var p = new Promise(function(resolve, reject) {
                        $.ajax({
                            type: 'GET',
                            url: url_ip + '/model/allfiles/',
                            data: {},
                            cache: false,
                            datatype: "json",
                            headers: { "Authorization": token },
                            success: function(data) {
                                //console.log(data)
                                if (data.status) {
                                    $('.dataFile ul').empty()
                                    for (var i = 0; i < data.data.length; i++) {
                                        $('.dataFile ul').append('<li data-id="' + data.data[i].file_obj_id + '">' + data.data[i].file_name + '</li>')
                                        $('.dataFile ul li[data-id=' + data.data[i].file_obj_id + ']')[0].data_title = data.data[i].title
                                        if (data.data[i].file_obj_id == obj_id) {
                                            dataFile_title = data.data[i].title
                                            resolve(dataFile_title)
                                        }
                                    }
                                }
                            },
                            error: function(data) {
                                //console.log(data)
                            }
                        })
                    })
                    return p
                }
                promiseA().then(function(data) {
                    var dataFile_title2 = data
                    var list = [
                        ['F1', obj_id]
                    ]
                    $.ajax({
                        url: url_ip + '/model/datalink/',
                        type: 'GET',
                        cache: false,
                        data: { args_list: JSON.stringify(list), type: 0, page: 1 },
                        dataType: 'json',
                        headers: { 'Authorization': token },
                        success: function(data) {
                            //console.log(data)
                            if (data.status) {
                                $('.work_table table').empty()
                                var data_title = data.data[0]
                                var detail = [];
                                for (var i = 1; i < data.data.length; i++) {
                                    detail.push(data.data[i])
                                }
                                dataToTable(data_title, detail)
                                $('.workTop_box')[0].parm = []
                                $('.workTop_box')[0].parm.push({ 'name': dataFile_name, 'class': 'workli0', 'title': dataFile_title2 })
                                alertmsg(data.msg, 1)
                            } else {
                                alertmsg(data.msg, 0)
                            }
                        },
                        error: function(data) {
                            //console.log(data)
                        },
                        complete: function(data) {
                            $('.datawork_box .load').hide()
                        }
                    })
                })
            }
        })
        /*数据渲染到加工弹窗封装*/
    function dataToTable(data_title, data) {
        var tr = document.createElement('tr')
        if (data_title.length > 0) {
            for (var i = 0; i < data_title.length; i++) {
                var td = document.createElement('td')
                $(td)[0].index = i;
                $(td)[0].index_y = 0;
                $(td).html('<div>' + data_title[i] + '</div><b id="title_' + i + '"></b>')
                $(tr).append(td)
            }
            $('.work_table table').append(tr)
        }
        if (data.length > 0) {
            for (var j = 0; j < data.length; j++) {
                var tr2 = document.createElement('tr')
                for (var k = 0; k < data[j].length; k++) {
                    var td2 = document.createElement('td')
                    $(td2)[0].index = k
                    $(td2)[0].index_y = (now_page - 1) * 30 + j + 1
                    $(td2).html('<div>' + data[j][k] + '</div>')
                    $(tr2).append(td2)
                }
                $('.work_table table').append(tr2)
            }
        }
    }
    /*点击小三角出操作弹窗事件*/
    $('.work_table').live('click', function(evt) {
        var evt = evt || window.event
        var key_id = evt.target.id;
        var key = key_id.substr(0, 5);
        if (key == 'title') {
            var maxW = $(this).outerWidth(true);
            var scroL = $(this).scrollLeft();
            var reL = $('#' + key_id).closest('td')[0].offsetLeft;
            var needL = reL - scroL;
            if (needL < 0) {
                needL = 0;
            } else if (needL > maxW - 150) {
                needL = maxW - 150;
            }
            var y = 20
            $('.work_box')[0].txt = $(evt.target).prev().html()
            $('.work_box')[0].index = $(evt.target).parent()[0].index
            $('.work_box')[0].index_y = $(evt.target).parent()[0].index_y
                //console.log($('.work_box')[0].index,$('.work_box')[0].index_y)
            $('.work_box').css({ left: needL + 'px', top: y + 'px', display: 'block' });
        } else {
            $('.work_box').hide();
        }
        return false;
    })
    $(document).on('click', function() {
        $('.work_box').hide();
    })
    $('.work_table').scroll(function() {
            $('.work_box').hide();
        })
        /*加工——列,鼠标移入事件*/
    $('.work_box>div').hover(function() {
        var html = $(this).children('span').html()
        $(this).append('<h4><span>' + html + '</span></h4>')
        if ($(this).children('ul')) {
            var maxW = $(this).closest('.table').outerWidth(true);
            var fooL = $(this).closest('.work_box').position().left;
            if (maxW - fooL <= 200) {
                $(this).children('ul').css('left', '-134px');
            } else {
                $(this).children('ul').css('left', '119px');
            }
            $(this).children('ul').show()
        }
    }, function() {
        $(this).children('h4').remove()
        if ($(this).children('ul')) {
            $(this).children('ul').hide()
        }
    })
    $('.work_box>div ul li').hover(function() {
            var html = $(this).html()
            $(this).append('<h5>' + html + '</h5>')
        }, function() {
            $(this).children('h5').remove()
        })
        /*数据加工改变操作区大小*/
    $('.dataworkLine').mousedown(function() {
        $(document).live('mousemove', function(evt) {
            var Y = $('.dataWork').height()
            var evt = evt || window.event
            var y = evt.clientY
            if (y >= $(window).height() - 150) {
                y = $(window).height() - 150
            } else if (y <= 126) {
                y = 126
            }
            var y1 = y - 66
            var y2 = Y - y1 - 42
            $('.workTop').css('height', y1 + 'px')
            $('.table').css('height', y2 + 'px')
        })
    })
    $('.dataworkLine').mouseup(function() {
            $(document).unbind('mousemove')
        })
        /*数据加工文件拖拽*/
    $('.dataFile li').live('mousedown', function(evt) {
        var txt = evt.target.innerHTML
        var obj_id = $(this).attr('data-id')
        var evt = evt || window.event
        var x = evt.clientX
        var y = evt.clientY
        $('body').append('<div class="movefile" style="left:' + x + 'px;top:' + y + 'px;" data-id="' + obj_id + '">' + txt + '</div>')
        $('.movefile')[0].data_title = evt.target.data_title
        $(document).live('mousemove', function(evt) {
            var evt = evt || window.event
            var x2 = evt.clientX + 1
            var y2 = evt.clientY + 1
            $('.movefile').css({ left: x2 + 'px', top: y2 + 'px' })
        })
    })
    var litxt;
    var dataTitle;
    var objId;
    $('.workTop').mouseenter(function() {
        if ($('.movefile')[0]) {
            litxt = $('.movefile').html()
            dataTitle = $('.movefile')[0].data_title
            objId = $('.movefile').attr('data-id')
        }
    })
    $('.workTop_box').mouseup(function() {
        if (litxt) {
            if (!$('.workTop_box li')[0]) {
                $('.workTop_box').append('<li style="left:8px;top:5px;" class="workli0" data-id="' + objId + '"><span>' + litxt + '</span><img src="img/remove3.png"></li>')
                $('.workTop_box li.workli0')[0].data_title = dataTitle
                $('.workTop_box')[0].parm = []
                $('.workTop_box')[0].parm.push({ 'name': litxt, 'class': 'workli0', 'title': $('.workTop_box li.workli0')[0].data_title })
                workAjax()
                LiNum = 0;
            } else if ($('.workTop_box li').length == 1) {
                $('.workTop_box').append('<div style="left:' + 188 + 'px;top:' + 5 + 'px;" class="workdiv0" data-a="workli0" data-z="workli1"><span></span><img src="img/yuan1.png"><span></span></div>' +
                    '<li style="left:' + 368 + 'px;top:' + 5 + 'px;" class="workli1" data-id="' + objId + '"><span>' + litxt + '</span><img src="img/remove3.png"></li>')
                $('.workTop_box li.workli1')[0].data_title = dataTitle
                setWork('workdiv0', '150px', '41px', 'F2', $('.workdiv0'))
                LiNum = 1;
            } else {
                var num = $('.workli0')[0].bingArr.length
                LiNum += 1;
                var num3 = LiNum - 1
                var num4 = LiNum + 1
                var left_d = $('.workli0')[0].offsetLeft + 180
                var top_d = $('.workli0')[0].offsetTop + (num * 55)
                var left_l = $('.workli0')[0].offsetLeft + 360
                var top_l = $('.workli0')[0].offsetTop + (num * 55)
                $('.workTop_box').append('<div style="left:' + left_d + 'px;top:' + top_d + 'px;" class="workdiv' + num3 + '" data-a="workli0" data-z="workli' + LiNum + '"><span class="wan"></span><img src="img/yuan1.png"><span></span></div>' +
                    '<li style="left:' + left_l + 'px;top:' + top_l + 'px;" class="workli' + LiNum + '" data-id="' + objId + '"><span>' + litxt + '</span><img src="img/remove3.png"></li>')
                $('.workTop_box li.workli' + LiNum)[0].data_title = dataTitle
                var left_s = left_d - 38
                var top_s = top_d + 36
                setWork('workdiv' + num3, left_s, top_s, 'F' + num4, $('.workdiv' + num3))
            }
            litxt = null
        }
    })
    $(document).mouseup(function() {
        $('.movefile').remove()
    })

    function setWork(which, left, top, gz, obj) {
        $('.set_workTop').attr('data-to', which)
        $('.set_workTop').css({ left: left, top: top })
        $('.set_workTop').show()
        $('.set_workTop .set_select1 div').empty()
        for (var i = 0; i < $('.workTop_box')[0].parm.length; i++) {
            var name = $('.workTop_box')[0].parm[i].name
            var classa = $('.workTop_box')[0].parm[i].class
            var title = $('.workTop_box')[0].parm[i].title
            var k = Number(classa.substr(6)) + 1
            $('.set_workTop .set_select1 div').append('<ol data-f="' + classa + '"></ol>')
            $('.set_workTop .set_select1 div ol[data-f=' + classa + ']').append('<b>' + name + '</b>')
            for (var j = 0; j < title.length; j++) {
                $('.set_workTop .set_select1 div ol[data-f=' + classa + ']').append('<li>F' + k + '_' + title[j] + '</li>')
            }
        }
        var className = $('.' + which).attr('data-z')
        var parm2 = $('.' + className)[0].data_title
        $('.set_workTop .set_select2').empty()
        $('.set_workTop .set_select2').append('<option></option>')
            //console.log(parm2)
        for (var i = 0; i < parm2.length; i++) {
            $('.set_workTop .set_select2').append('<option>' + gz + '_' + parm2[i] + '</option>')
        }
        if (obj.ka && obj.kz && obj.type) {
            $('.set_workTop dd').removeClass('on')
            $('.set_workTop dd[type=' + obj.type + ']').addClass('on')
            $('.set_workTop .set_select1 span').html(obj.ka)
            $('.set_workTop .set_select2').val(obj.kz)
        } else {
            $('.set_workTop dd').removeClass('on')
            $('.set_workTop dd[type=inner]').addClass('on')
            $('.set_workTop .set_select1 span').html('')
            $('.set_workTop .set_select2').val('')
        }
    }
    /*数据加工合并弹窗操作*/
    $('.set_select1').mouseup(function() {
        $(this).toggleClass('on')
    })
    $('.set_select1 li').live('mousedown', function() {
        var className0 = $(this).parent().attr('data-f')
        var className1 = $(this).parents('.set_workTop').attr('data-to')
        var className2 = $('.' + className1).attr('data-z')
        var divLink = $('.' + className1)
        if ($('.' + className0)[0].bingArr) {
            var num = $('.' + className0)[0].bingArr.length
        } else {
            var num = 0
        }
        var n_left_d = $('.' + className0)[0].offsetLeft + 180
        var n_top_d = $('.' + className0)[0].offsetTop + (num * 55)
        var n_left_l = n_left_d + 180
        var n_top_l = n_top_d
            //console.log(className0,className2,divLink,num,n_left_d,n_top_d,n_left_l,n_top_l)
        if (!$('.' + className0)[0].bingArr || num == 0) {
            divLink.children('span:eq(0)').removeClass('wan')
        } else {
            divLink.children('span:eq(0)').addClass('wan')
        }
        divLink.css({ left: n_left_d + 'px', top: n_top_d + 'px' })
        divLink.attr('data-a', className0)
        $('.' + className2).css({ left: n_left_l + 'px', top: n_top_l + 'px' })
        $('.set_select1>span').html($(this).html())
    })
    $('.setwork_no').click(function() {
        $('.set_workTop').hide()
    })
    $('.setwork_sure').click(function() {
        var className = $(this).parent().parent().attr('data-to')
        $('.' + className)[0].ka = $('.set_workTop .set_select1 span').html()
        $('.' + className)[0].kz = $('.set_workTop .set_select2').val()
        $('.' + className)[0].type = $('.set_workTop dd.on').attr('type')
        $('.work_table table').empty()
        var className1 = $('.' + className).attr('data-a')
        var className2 = $('.' + className).attr('data-z')
        if (!$('.' + className1)[0].bingArr || $('.' + className1)[0].bingArr.length == 0) {
            $('.' + className1)[0].bingArr = [className2]
        } else {
            $('.' + className1)[0].bingArr.push(className2)
        }
        var dataFile_name = $('.' + className2).children('span').html()
        var liclass = $('.' + className2)[0].className
        var data_title = $('.' + className2)[0].data_title
        workAjax().then(function(data) {
            if (data) {
                $('.workTop_box')[0].parm.push({ 'name': dataFile_name, 'class': liclass, 'title': data_title })
                    //console.log($('.workTop_box')[0].parm)
            }
        })
        $('.set_workTop').hide()
    })
    $('.workTop_box div').live('click', function() {
        var className = $(this)[0].className
        var left = $(this)[0].offsetLeft - 38
        var top = $(this)[0].offsetTop + 36
        var num = Number($(this).attr('data-z').substr(6)) + 1
        setWork(className, left, top, 'F' + num, $(this)[0])
    })
    $('.set_workTop dd').click(function() {
        $('.set_workTop dd').removeClass('on')
        $(this).addClass('on')
        var rote = $(this).children('img').attr('src')
        var className = $(this).parent().parent().attr('data-to')
        $('.' + className).children('img').attr('src', rote)
    })
    $('.workTop_box li img').live('click', function() {
            if ($(this).parent()[0].className == 'workli0') {
                $('.workTop_box').empty()
                $('.dataWork .table table').empty()
            } else {
                var num = $(this).parent()[0].className.substr(6) - 1
                var className_a = $('.workdiv' + num).attr('data-a')
                var className_z = $('.workdiv' + num).attr('data-z')
                var removeArr = [];
                removeArr.push(className_z)
                if ($('.' + className_z)[0].bingArr && $('.' + className_z)[0].bingArr.length != 0) {
                    var childworkli = $('.' + className_z)[0].bingArr
                    remove_add(childworkli)
                }

                function remove_add(childworkli) {
                    for (var i = 0; i < childworkli.length; i++) {
                        removeArr.push(childworkli[i])
                        if ($('.' + childworkli[i])[0].bingArr && $('.' + childworkli[i])[0].bingArr.length != 0) {
                            remove_add($('.' + childworkli[i])[0].bingArr)
                        }
                    }
                }

                function li_buju() {
                    for (var i = 0; i < LiNum + 1; i++) {
                        if (i == 0) {
                            $('.workli' + i).css({ left: '8px', top: '5px' })
                        } else {
                            var k = i - 1;
                            if ($('.workli' + i)[0]) {
                                var nameA = $('.workdiv' + k).attr('data-a')
                                var index = $('.' + nameA)[0].bingArr.indexOf('workli' + i)
                                var left_d = $('.' + nameA)[0].offsetLeft + 180
                                var left_l = $('.' + nameA)[0].offsetLeft + 360
                                var top_d = $('.' + nameA)[0].offsetTop + (index * 55)
                                var top_l = $('.' + nameA)[0].offsetTop + (index * 55)
                                $('.workli' + i).css({ left: left_l + 'px', top: top_l + 'px' })
                                $('.workdiv' + k).css({ left: left_d + 'px', top: top_d + 'px' })
                                if (index == 0) {
                                    $('.workdiv' + k).children('span:eq(0)').removeClass('wan')
                                }
                            }
                        }
                    }
                }
                if ($('.' + className_a)[0].bingArr.indexOf(className_z) != -1) {
                    $('.' + className_a)[0].bingArr.splice($('.' + className_a)[0].bingArr.indexOf(className_z), 1)
                    for (var i = 0; i < removeArr.length; i++) {
                        for (var j = 0; j < $('.workTop_box')[0].parm.length; j++) {
                            if ($('.workTop_box')[0].parm[j].class == removeArr[i]) {
                                $('.workTop_box')[0].parm.splice(j, 1)
                                j--;
                            }
                        }
                        var num = removeArr[i].substr(6) - 1
                        $('.' + removeArr[i]).remove()
                        $('.workdiv' + num).remove()
                    }
                    li_buju()
                    var list = [];
                    for (var i = 0; i < $('.workTop_box li').length; i++) {
                        if (i == 0) {
                            list.push(['F1', $('.workTop_box li')[i].getAttribute('data-id')])
                        } else if (i == 1) {
                            var num1 = $('.workTop_box li')[i].className.substr(6) - 1
                            var num2 = Number($('.workTop_box li')[i].className.substr(6)) + 1
                                //console.log(num2)
                            list[0].push('F' + num2, $('.workTop_box li')[i].getAttribute('data-id'), $('.workdiv' + num1)[0].ka, $('.workdiv' + num1)[0].kz, $('.workdiv' + num1)[0].type)
                        } else {
                            var num1 = $('.workTop_box li')[i].className.substr(6) - 1
                            var num2 = Number($('.workTop_box li')[i].className.substr(6)) + 1
                                //console.log(num2)
                            list.push(['', '', 'F' + num2, $('.workTop_box li')[i].getAttribute('data-id'), $('.workdiv' + num1)[0].ka, $('.workdiv' + num1)[0].kz, $('.workdiv' + num1)[0].type])
                        }
                    }
                    if ($('.workTop_box li').length <= 1) {
                        var type = 0
                    } else {
                        var type = 1
                    }
                    var page = 1
                        //console.log(list)
                    $('.work_table table').empty()
                    $.ajax({
                        url: url_ip + '/model/datalink/',
                        type: 'GET',
                        data: { args_list: JSON.stringify(list), type: type, page: page },
                        dataType: 'json',
                        headers: { 'Authorization': token },
                        beforeSend: function() {
                            $('.datawork_box .load').show()
                        },
                        success: function(data) {
                            //console.log(data)
                            if (data.status) {
                                if (data.data.length > 0) {
                                    if (page == 1) {
                                        var data_title = data.data[0]
                                        var detail = [];
                                        for (var i = 1; i < data.data.length; i++) {
                                            detail.push(data.data[i])
                                        }
                                        dataToTable(data_title, detail)
                                    } else {
                                        var data_title = []
                                        var detail = [];
                                        for (var i = 0; i < data.data.length; i++) {
                                            detail.push(data.data[i])
                                        }
                                        dataToTable(data_title, detail)
                                    }
                                }
                            } else {
                                alertmsg(data.msg, 0)
                            }
                        },
                        error: function(data) {
                            //console.log(data)
                        },
                        complete: function(data) {
                            $('.datawork_box .load').hide()
                        }
                    })
                } else {
                    for (var i = 0; i < removeArr.length; i++) {
                        var num = removeArr[i].substr(6) - 1
                        $('.' + removeArr[i]).remove()
                        $('.workdiv' + num).remove()
                    }
                }
            }
        })
        /*数据加工操作项*/
    $('.work_table td').live('dblclick', function() {
        $('.reset_name input').val($(this).children('div').html())
        $('.reset_name input')[0].oldname = $(this).children('div').html()
        $('.reset_name')[0].index = $(this)[0].index
        $('.reset_name')[0].index_y = $(this)[0].index_y
        $('.reset_name').show()
    })
    $('.work_box>div').click(function() {
        var type = $(this).children('span').html()
        var index = $(this).parent()[0].index
        if (type == '重命名(M)') {
            $('.reset_name input').val($(this).parent()[0].txt)
            $('.reset_name input')[0].oldname = $(this).parent()[0].txt
            $('.reset_name')[0].index = $(this).parent()[0].index
            $('.reset_name')[0].index_y = $(this).parent()[0].index_y
            $('.reset_name').show()
        } else if (type == '删除当前列(C)') {
            dataOpera(index, 0, 1, '', '', 'delete')
        } else if (type == '归类统计(S)') {
            $.ajax({
                type: 'GET',
                url: url_ip + '/model/dataetl/',
                cache: false,
                data: { axis_x: index, page: 1, my_mode: 'classify' },
                datatype: 'json',
                headers: { "Authorization": token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        alertmsg(data.msg, 1)
                        $('.classify_box')[0].index_x = index
                        $('.classify_box h2').html('当前列数据归类统计')
                        $('.classify_box table').empty()
                        $('.classify_box table').append('<tr><td>文本内容</td><td>数量</td></tr>')
                        $.each(data.data, function(key, value) {
                            $('.classify_box table').append('<tr><td><span>' + key + '</span><b>修改</b></td><td>' + value + '</td></tr>')
                        })
                        $('.classify_box').show()
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                }
            })
        } else if (type == '数据信息(I)') {
            $.ajax({
                type: 'GET',
                url: url_ip + '/model/dataetl/',
                cache: false,
                data: { axis_x: index, page: 1, my_mode: 'data_attr' },
                datatype: 'json',
                headers: { "Authorization": token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        alertmsg(data.msg, 1)
                        $('.classify_box h2').html('当前列数据信息结果')
                        $('.classify_box table').empty()
                        $('.classify_box table').append('<tr><td>最大值</td><td>' + data._max + '</td></tr><tr><td>平均值</td><td>' + data._mean + '</td></tr><tr><td>中值</td><td>' + data._median + '</td></tr><tr><td>最小值</td><td>' + data._min + '</td></tr><tr><td>标准差</td><td>' + data._std + '</td></tr><tr><td>求和</td><td>' + data._sum + '</td></tr>')
                        $('.classify_box').show()
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                }
            })
        }
    })
    $('.work_box>div ul li').click(function() {
        var type = $(this).children('h5').html()
        var index = $('.work_box')[0].index
            //console.log(index)
        if (type == '向前填充') {
            dataOpera(index, '', 1, '', '', 'x_prevfill')
        } else if (type == '向后填充') {
            dataOpera(index, '', 1, '', '', 'x_nextfill')
        } else if (type == '均值填充') {
            dataOpera(index, '', 1, '', '', 'x_meanfill')
        } else if (type == '0值填充') {
            dataOpera(index, '', 1, '', '', 'x_lingfill')
        } else if (type == '转整数型') {
            dataOpera(index, '', 1, '', '', 'int')
        } else if (type == '转浮点型') {
            dataOpera(index, '', 1, '', '', 'float')
        } else if (type == '转字符型') {
            dataOpera(index, '', 1, '', '', 'str')
        } else if (type == '转日期型') {
            dataOpera(index, '', 1, '', '', 'datetime')
        } else if (type == '全大写') {
            dataOpera(index, '', 1, '', '', 'upper')
        } else if (type == '全小写') {
            dataOpera(index, '', 1, '', '', 'lower')
        } else if (type == '首字母大写') {
            dataOpera(index, '', 1, '', '', 'title')
        } else if (type == '去除逗号') {
            dataOpera(index, '', 1, '', '', 'convert_douhao')
        } else if (type == '去除$符') {
            dataOpera(index, '', 1, '', '', 'convert_daolefu')
        } else if (type == '去除%符') {
            dataOpera(index, '', 1, '', '', 'convert_baifenhao')
        } else if (type == '向前填充(A)') {
            dataOpera('', '', 1, '', '', 'prevfill')
        } else if (type == '向后填充(A)') {
            dataOpera('', '', 1, '', '', 'nextfill')
        } else if (type == '均值填充(A)') {
            dataOpera('', '', 1, '', '', 'meanfill')
        } else if (type == '0值填充(A)') {
            dataOpera('', '', 1, '', '', 'lingfill')
        } else if (type == '去除缺失值') {
            dataOpera('', '', 1, '', '', 'de_value')
        }
    })
    $('.classify_box i').click(function() {
        $('.classify_box').hide()
    })
    $('.classify_box b').live('click', function() {
        var that = $(this)
        if ($(this).html() == '修改') {
            $(this).parent().append('<input type="text" value="' + $(this).prev().html() + '">')
            $(this).html('确定')
        } else if ($(this).html() == '确定') {
            $.ajax({
                type: 'GET',
                url: url_ip + '/model/dataetl/',
                cache: false,
                data: { my_mode: 'text', axis_x: $('.classify_box')[0].index_x, last_text: $(this).prev().html(), re_text: $(this).next().val() },
                datatype: 'json',
                headers: { "Authorization": token },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {
                        that.prev().html(that.next().val())
                        that.html('修改')
                        that.next().remove()
                        chexiao()
                        $('.work_box').hide()
                        $('.work_table table').empty()
                        var data_title = data.data[0]
                        var detail = [];
                        for (var i = 1; i < data.data.length; i++) {
                            detail.push(data.data[i])
                        }
                        dataToTable(data_title, detail)
                        alertmsg(data.msg, 1)
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                }
            })
        }
    })

    function chexiao() {
        $('.work_back').show()
    }
    /*数据加工操作项封装事件*/
    function dataOpera(x, y, page, new_text, old_text, type) {
        var json = {}
        if (x !== '') {
            json.axis_x = x
        }
        if (y !== '') {
            json.axis_y = y
        }
        json.page = page
        if (new_text !== '') {
            json.re_text = new_text
        }
        if (old_text !== '') {
            json.last_text = old_text
        }
        json.my_mode = type
            //console.log(json)
        $.ajax({
            type: 'GET',
            url: url_ip + '/model/dataetl/',
            cache: false,
            data: json,
            datatype: 'json',
            headers: { "Authorization": token },
            beforeSend: function() {
                $('.loading').show()
            },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    chexiao()
                    $('.work_box').hide()
                    $('.work_table table').empty()
                    var data_title = data.data[0]
                    var detail = [];
                    for (var i = 1; i < data.data.length; i++) {
                        detail.push(data.data[i])
                    }
                    dataToTable(data_title, detail)
                    alertmsg(data.msg, 1)
                } else {
                    alertmsg(data.msg, 0)
                }
            },
            error: function(data) {
                //console.log(data)
                if (data.status == 401) {
                    if (token == 'JWT undefined' || token == 'JWT null') {
                        $('.shade p').html('您目前还没有注册或登录~ ')
                        $('.shade').show();
                    } else {
                        $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                        $('.shade').show();
                    }
                } else {
                    alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                }
            },
            complete: function() {
                $('.loading').hide()
            }
        })
    }
    /*重命名列取消事件*/
    $('.reset_no').click(function() {
            $('.reset_name').hide()
        })
        /*重命名列确定封装*/
    $('.reset_sure').click(function() {
            var oldname = $(this).prev().children('input')[0].oldname
            var newname = $(this).prev().children('input').val()
            var index = $(this).parent().parent()[0].index
            var index_y = $(this).parent().parent()[0].index_y
            dataOpera(index, index_y, 1, newname, '', 'self_fill')
            $('.reset_name').hide()
        })
        /*数据加工弹窗取消事件*/
    $('.work_no').click(function() {
            $('.jiag_data').click()
        })
        /*数据弹窗撤销当前操作事件*/
    $('.work_back').click(function() {
            $.ajax({
                type: 'GET',
                url: url_ip + '/model/rollback/',
                cache: false,
                data: {},
                datatype: 'json',
                headers: { "Authorization": token },
                beforeSend: function() {
                    $('.loading').show()
                },
                success: function(data) {
                    //console.log(data)
                    if (data.status) {

                        $('.work_box').hide()
                        $('.work_table table').empty()
                        var data_title = data.data[0]
                        var detail = [];
                        for (var i = 1; i < data.data.length; i++) {
                            detail.push(data.data[i])
                        }
                        dataToTable(data_title, detail)
                        $('.datawork_box').show()
                        alertmsg(data.msg, 1)
                    } else {
                        alertmsg(data.msg, 0)
                    }
                },
                error: function(data) {
                    //console.log(data)
                    if (data.status == 401) {
                        if (token == 'JWT undefined' || token == 'JWT null') {
                            $('.shade p').html('您目前还没有注册或登录~ ')
                            $('.shade').show();
                        } else {
                            $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                            $('.shade').show();
                        }
                    } else {
                        alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                    }
                },
                complete: function() {
                    $('.loading').hide()
                }
            })
        })
        /*数据弹窗确定事件*/
    $('.work_sure').click(function() {
            $('.baocun_name input').val('')
            $('.baocun_name').show()
        })
        /*保存--确定按钮*/
    $('.baocun_sure').click(function() {
            var id_num = $('.datawork_box')[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            if ($(this).prev().children('input').val() != '') {
                $.ajax({
                    type: 'GET',
                    url: url_ip + '/model/savedata/',
                    cache: false,
                    data: { new_file: $('.baocun_name input').val() },
                    datatype: 'json',
                    headers: { "Authorization": token },
                    beforeSend: function() {
                        $('.loading').show()
                    },
                    success: function(data) {
                        //console.log(data)
                        if (data.status) {
                            nownode[0].file = data.data
                            nownode[0].file_data = data.result_data
                            nownode[0].text = txtLength(data.name)
                            nownode[0].nodetext = data.name
                            $('.baocun_name').hide()
                            $('.Tabsjjg img').click()
                            alertmsg(data.msg, 1)
                        } else {
                            alertmsg(data.msg, 0)
                        }
                    },
                    error: function(data) {
                        //console.log(data)
                        if (data.status == 401) {
                            if (token == 'JWT undefined' || token == 'JWT null') {
                                $('.shade p').html('您目前还没有注册或登录~ ')
                                $('.shade').show();
                            } else {
                                $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                                $('.shade').show();
                            }
                        } else {
                            alertmsg('请检查数据及参数，若无法解决，请联系我们。', 0)
                        }
                    },
                    complete: function() {
                        $('.loading').hide()
                    }
                })
            }
        })
        /*保存--取消按钮*/
    $('.baocun_no').click(function() {
            $('.baocun_name').hide()
        })
        /*工作台关闭*/
    $('.close_model').click(function() {
            window.history.go(-1)
        })
        /*一键执行*/
    var lxtig;
    $('.allDo').click(function() {
            $('.loading').show()
            var modelArr = [];
            var nodes = scene.childs.filter(function(e) {
                return e instanceof JTopo.Node;
            });
            var firstNode;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].outLinks && nodes[i].inLinks && nodes[i].outLinks.length > 0 && nodes[i].inLinks.length == 0) {
                    firstNode = nodes[i]
                }
            }
            var nodeSfArr = []
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].type == 'sf') {
                    nodeSfArr.push(nodes[i])
                }
            }
            var beginNode;
            var arr = []
            arr.push(firstNode)
            for (var i = 0; i < nodes.length; i++) {
                beginNode = arr
                arr = []
                for (var k = 0; k < beginNode.length; k++) {
                    if (beginNode[k].outLinks && beginNode[k].outLinks.length > 0) {
                        for (var j = 0; j < beginNode[k].outLinks.length; j++) {
                            if (beginNode[k].outLinks[j].nodeZ.type == 'sf') {
                                modelArr.push(beginNode[k].outLinks[j].nodeZ)
                            }
                            arr.push(beginNode[k].outLinks[j].nodeZ)
                        }
                    }
                }
            }
            var algoObj = {}
            algoObj.scene_id = scene_id;
            algoObj.algoList = []
            for (var i = 0; i < modelArr.length; i++) {
                if (i < modelArr.length - 1) {
                    var s = i + 1
                    modelArr[i].fake_name = modelArr[s].inLinks[0].nodeA.nodetext
                } else {
                    modelArr[i].fake_name = ''
                }
                algoObj.algoList.push({ "arg_list": modelArr[i].cs, "is_y": modelArr[i].isy, "source": modelArr[i].source, "fake_id": modelArr[i]._id, "fake_name": modelArr[i].fake_name })
            }
            var lxNum = 0;
            clearInterval(lxtig)
            lxtig = setInterval(function() {
                    $.ajax({
                        url: url_ip + '/model/fake_result/',
                        type: 'GET',
                        data: {},
                        datatype: 'json',
                        headers: { 'Authorization': token },
                        success: function(data) {
                            //console.log(data)
                            if (data.status) {
                                lxNum++;
                                var objid = data.fake_id
                                var nownode = scene.findElements(function(e) {
                                    return e._id == objid
                                })
                                nownode[0].fontColor = "44,255,114";
                                nownode[0].result_id = data.obj_id
                                nownode[0].result = data.data
                                    //console.log(nownode)
                            } else {
                                if (data.data) {
                                    clearInterval(lxtig)
                                    $('.loading').hide()
                                    var objid = data.fake_id
                                    var nownode = scene.findElements(function(e) {
                                        return e._id == objid
                                    })
                                    nownode[0].fontColor = "255,37,37";
                                    alertmsg(data.data, 0)
                                }
                            }
                            if (lxNum >= modelArr.length) {
                                clearInterval(lxtig)
                                $('.loading').hide()
                            }
                        },
                        error: function(data) {
                            //console.log(data)
                        }
                    })
                }, 1000)
                //console.log(algoObj)
            $.ajax({
                url: url_ip + '/model/oneclickgo/',
                type: 'POST',
                data: { run_list: JSON.stringify(algoObj) },
                datatype: 'json',
                headers: { 'Authorization': token },
                success: function(data) {
                    //console.log(data)
                },
                error: function(data) {
                    //console.log(data)
                }
            })
        })
        /*获取图列表*/
    $.ajax({
            type: 'GET',
            url: url_ip + '/visual/sortchart/',
            cache: false,
            data: {},
            datatype: 'json',
            headers: { "Authorization": token },
            success: function(data) {
                //console.log(data)
                if (data.status) {
                    for (var i = 0; i < data.sort.length; i++) {
                        for (var j = 0; j < data.labels.length; j++) {
                            if (data.labels[j].chart_name == data.sort[i].chart_name) {
                                $('.more_pic').before('<li id="' + data.sort[i].chart_name + '"><img src="img/' + data.sort[i].chart_name + '.png" title="' + data.sort[i].name + '"></li>')
                                $('#' + data.sort[i].chart_name)[0].parameter = data.labels[j].args
                                $('#' + data.sort[i].chart_name)[0].argument = data.labels[j].explain
                            }
                        }
                    }
                    $('.select_pic li:eq(0)').click()
                }
            },
            error: function(data) {
                //console.log(data)
                if (data.status == 401) {
                    if (token == 'JWT undefined' || token == 'JWT null') {
                        $('.shade p').html('您目前还没有注册或登录~ ')
                        $('.shade').show();
                    } else {
                        $('.shade p').html('系统检测,您的账号存在风险异常,请重新登录。')
                        $('.shade').show();
                    }
                } else {
                    alertmsg('未知错误。', touch_us)
                }
            }
        })
        /*点击数据可视化*/
    $('.ksh_result').click(function() {
            var id_num = $(this).parent()[0]._id
            var nownode = scene.findElements(function(e) {
                return e._id == id_num
            })
            if (nownode[0].inLinks && nownode[0].inLinks[0].nodeA) {
                $('.field_box dd').remove()
                var detail = nownode[0].inLinks[0].nodeA.file_data
                $('.field_box')[0].detail = detail
                var text = nownode[0].inLinks[0].nodeA.nodetext
                $('.field_box h2').html(text)
                if (detail[1]) {
                    for (var i = 0; i < detail[1].length; i++) {
                        if (isNaN(Number(detail[1][i]))) {
                            $('.field_box .weidu').append('<dd data-index="' + i + '">' + detail[0][i] + '</dd>')
                        } else {
                            $('.field_box .duliang').append('<dd data-index="' + i + '">' + detail[0][i] + '</dd>')
                        }
                    }
                } else {
                    alertmsg('当前中间文件未实例化,重新确定文件即可进行可视化')
                }
                $('.select_pic li:eq(0)').click()
                $('.echars_box').show()
                if ($('.Tabksh')[0]) {
                    $('.Tabksh').children('div').html('可视化(' + nownode[0].inLinks[0].nodeA.nodetext + ')')
                } else {
                    $('h1 ol').append('<li class="Tabksh"><div>可视化(' + nownode[0].inLinks[0].nodeA.nodetext + ')</div><img src="img/guan2.png"></li>')
                }
                tabW()
                tabClick($('.Tabksh'))
                var allHeight = $('.field_box')[0].offsetHeight
                var height = (allHeight - 76) / 2
                if ($('.field_box .weidu')[0].offsetHeight <= height) {
                    var oHeight = allHeight - $('.field_box .weidu')[0].offsetHeight - 76
                    $('.field_box .duliang').height(oHeight + 'px')
                } else {
                    if ($('.field_box .duliang')[0].offsetHeight <= height) {
                        var oHeight = allHeight - $('.field_box .duliang')[0].offsetHeight - 76
                        $('.field_box .weidu').height(oHeight + 'px')
                    } else {
                        $('.field_box .duliang').height(height + 'px')
                        $('.field_box .weidu').height(height + 'px')
                    }
                }
            }
        })
        /*数据可视化弹窗关闭*/
    $('.echars_close').click(function() {
            $('.echars_box').hide()
            tabClick($('.Tabcj'))
        })
        /*选择图类型*/
    $('.select_pic ul li').live('click', function() {
            $('.select_pic ul li').removeClass('on')
            $(this).addClass('on')
            var title = $(this).children('img').attr('title')
            var id = $(this)[0].id
            var parameter = $(this)[0].parameter
            var argument = $(this)[0].argument
            $('.dragBox span').remove()
            $('.biaoji span').remove()
            biaojiShow()
            $('.canvas>img').click()
            $('.canvas').append('<div id="canvas_box"></div>')
            $('.select_pic h4 span').html(title)
            $('.select_pic p').html(argument)
            $('.canvas')[0].type = id
            $('.canvas')[0].parameter = parameter
            $('.biaoji table tbody tr').empty()
            for (var i = 0; i < parameter.length; i++) {
                if (parameter[i] != '行' && parameter[i] != '列') {
                    $('.biaoji table tbody tr').append('<td><img src="img/' + parameter[i] + '.png">' + parameter[i] + '</td>')
                }
            }
        })
        /*行列等拖拽区鼠标移入事件*/
    $('.makeEchars li>div').hover(function() {
            if ($(this).children('span')[0]) {
                $(this).addClass('on')
            }
        }, function() {
            $(this).removeClass('on')
        })
        /*标记框判断*/
    function biaojiShow() {
        if ($('.biaoji').children('span')[0]) {
            $('.biaoji table').hide()
            $('.biaoji span').show()
        } else {
            $('.biaoji table').show()
        }
    }
    /*拖拽度量、维度到行列*/
    $('.field_box dd').live('mousedown', function(evt) {
        var evt = evt || window.event
        var text = $(this).html()
        var type = $(this).parent()[0].className
        var index = $(this).attr('data-index') || 0
        var left = evt.target.offsetLeft
        var top = evt.target.offsetTop
        $('.echars_box').append('<div class="shadow_div" data-type="' + type + '" data-index="' + index + '" style="left:' + left + 'px;top:' + top + 'px;">' + text + '</div>')
        $(document).live('mousemove', function(evt) {
            var evt = evt || window.event
            var left = evt.clientX + 1
            var top = evt.clientY - 49
            $('.shadow_div').css({ left: left + 'px', top: top + 'px' })
        })
        $('.biaoji span').hide()
        $('.biaoji table').show()
    })
    $(document).mouseup(function() {
        $('.shadow_div').remove()
        $('.filter_box').hide()
        $('.filter_box2').hide()
        biaojiShow();
    })
    $('.dragBox').mouseenter(function() {
        if ($('.shadow_div')[0]) {
            $('.shadow_div').addClass('on')
        }
    })

    function findEle(p, txt) {
        for (var i = 0; i < p.length; i++) {
            if (p[i].textContent == txt) {
                return p[i]
            }
        }
        return false
    }
    $('.dragBox').mouseup(function() {
        if ($('.shadow_div.on')[0]) {
            var text = $('.shadow_div.on').html()
            var type = $('.shadow_div.on').attr('data-type')
            var index = $('.shadow_div.on').attr('data-index')
            if (findEle($(this).children('span'), text)) {
                $(findEle($(this).children('span'), text)).remove()
            }
            $(this).append('<span data-index="' + index + '" data-type="' + type + '">' + text + '<img src="img/remove2.png" class="close"></span>')
            $('.shadow_div').remove()
            biaojiShow();
            var left = $(this).parent()[0].offsetLeft + $(this)[0].offsetLeft + $(this).children('span:contains("' + text + '")')[0].offsetLeft + 42
            var top = $(this).parent()[0].offsetTop + $(this)[0].offsetTop + $(this).children('span:contains("' + text + '")')[0].offsetTop + 22
            var maxLeft = $(window).width() - 250
            if (left >= maxLeft) {
                left = left - 250
            }
            if ($(this)[0].id == 'filter') {
                if (type == 'weidu') {
                    var detail = $('.field_box')[0].detail
                    $('.filter_box dl>div').empty()
                    for (var i = 0; i < detail.length; i++) {
                        $('.filter_box dl>div').append('<dd><input type="checkbox" id="' + i + '"><label>' + detail[i][index] + '</label></dd>')
                    }
                    $('.filter_box').css({ left: left + 'px', top: top + 'px' })
                    $('.filter_box').show()
                    $('.filter_box2').hide()
                } else {
                    $('.filter_box2').css({ left: left + 'px', top: top + 'px' })
                    $('.filter_box').hide()
                    $('.filter_box2').show()
                }
            }
        }
        var type = $('.canvas')[0].type
        var detail = $('.field_box')[0].detail
        plot(type, detail, $('#canvas_box')[0])
        return false;
    })
    $('.biaoji td').live('mouseenter', function() {
        if ($('.shadow_div')[0]) {
            $('.shadow_div').addClass('on')
        }
    })
    $('.biaoji td').live('mouseup', function() {
        if ($('.shadow_div.on')[0]) {
            var text = $('.shadow_div.on').html()
            var type = $(this).index() + 1
            var index = $('.shadow_div.on').attr('data-index')
            var img = $(this).children('img').attr('src').substr(0, $(this).children('img').attr('src').indexOf('.'))
            if ($('.biaoji span[data-type="' + type + '"]')) {
                $('.biaoji span[data-type="' + type + '"]').remove()
            }
            $('.biaoji').append('<span data-index="' + index + '" data-type="' + type + '"><img src="' + img + '0.png" class="img">' + text + '<img src="img/remove2.png" class="close"></span>')
        }
        var type = $('.canvas')[0].type
        var detail = $('.field_box')[0].detail
        plot(type, detail, $('#canvas_box')[0])
    })
    $('.makeEchars li div').mouseleave(function() {
            $('.shadow_div').removeClass('on')
        })
        /*筛选框li点击事件*/
    $('.filter_box>ul>li').click(function() {
            $('.filter_box>div').hide()
            if ($(this).children('span').html() == '常规') {
                $('.filter_cg').show()
            } else {
                $('.filter_tpf').show()
            }
            $('.filter_box>ul>li').removeClass('on')
            $(this).addClass('on')
        })
        /*筛选框单选按钮监控事件*/
    $('.filter_cg input[name="cg"]').bind('propertychange change', function() {
            if ($('.filter_cg input[name="cg"]:checked').val() == 'select') {
                $('.filter_cg dl').show()
                $('.filter_cg .filter_search').hide()
            } else if ($('.filter_cg input[name="cg"]:checked').val() == 'self') {
                $('.filter_cg .filter_search').show()
                $('.filter_cg dl').hide()
            } else {
                $('.filter_cg dl').hide()
                $('.filter_cg .filter_search').hide()
            }
        })
        /*取消筛选框的冒泡事件*/
    $('.filter_box').mouseup(function() {
        return false
    })
    $('.filter_box2').mouseup(function() {
            return false
        })
        /*删除当前已选拖拽*/
    $('img.close').live('click', function() {
            $(this).parent().remove()
            biaojiShow()
            var type = $('.canvas')[0].type
            var detail = $('.field_box')[0].detail
            plot(type, detail, $('#canvas_box')[0])
        })
        /*删除同类已选拖拽*/
    $('.makeEchars li>div>img').click(function() {
        $(this).parent().children('span').remove()
        biaojiShow()
    })
    $('.makeEchars li>div>img').hover(function() {
            $(this).attr('src', 'img/empty2.png')
        }, function() {
            $(this).attr('src', 'img/empty.png')
        })
        /*作图*/
    function plot(chartType, detail, box) {
        var myChart;
        if (myChart != null && myChart != "" && myChart != undefined) {
            myChart.dispose();
        }
        var obj = {};
        obj.legend = [];
        obj.data = [];
        if (chartType == 'pieChart') {
            obj.chart_title = "饼图";
            var color = $('.biaoji span[data-type="1"]').attr('data-index')
            var jiaodu = $('.biaoji span[data-type="2"]').attr('data-index')
            if (color && jiaodu) {
                for (var i = 1; i < detail.length; i++) {
                    obj.legend.push(detail[i][color])
                    obj.data.push({ 'value': detail[i][jiaodu], 'name': detail[i][color] })
                }
                pieChart(obj, box);
            }
        } else if (chartType == 'heatMapChart') {
            var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
            var hangIndex = [];
            for (var i = 0; i < hangArr.length; i++) {
                hangIndex.push(hangArr[i].getAttribute('data-index'))
            }
            var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
            if (lieIndex && hangIndex.length > 0) {
                for (var i = 1; i < detail.length; i++) {
                    obj.legend.push(detail[i][lieIndex])
                }
                for (var j = 0; j < hangIndex.length; j++) {
                    var k = hangIndex[j]
                        //console.log(k)
                    var data = []
                    for (var i = 1; i < detail.length; i++) {
                        data.push(detail[i][k])
                    }
                    obj.data.push({ 'name': detail[0][k], 'value': data })
                }
                obj.chart_title = '笛卡尔坐标系热力图'
                    //console.log(obj)
                heatMapChart(obj, box);
            }
        } else if (chartType == 'scatterChart') {
            var fenlei = $('.biaoji span[data-type="1"]').attr('data-index')
            var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
            var hangIndex = $('.makeEchars ul li:eq(1) .dragBox span').attr('data-index')
            if (fenlei && lieIndex && hangIndex) {
                obj.legend.push(detail[0][fenlei])
                for (var i = 0; i < detail.length; i++) {
                    obj.data.push([detail[i][lieIndex], detail[i][hangIndex], detail[i][fenlei]])
                }
                obj.chart_title = '散点图'
                scatterChart2(obj, box)
            }
        } else if (chartType == 'barChart') {
            var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
            var hangIndex = [];
            for (var i = 0; i < hangArr.length; i++) {
                hangIndex.push(hangArr[i].getAttribute('data-index'))
            }
            var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
            if (lieIndex && hangIndex.length > 0) {
                for (var i = 1; i < detail.length; i++) {
                    obj.legend.push(detail[i][lieIndex])
                }
                for (var j = 0; j < hangIndex.length; j++) {
                    var k = hangIndex[j]
                        //console.log(k)
                    var data = []
                    for (var i = 1; i < detail.length; i++) {
                        data.push(detail[i][k])
                    }
                    obj.data.push({ 'name': detail[0][k], 'value': data })
                }
                obj.chart_title = '柱状图'
                    //console.log(obj)
                barChart(obj, box);
            }
        } else if (chartType == 'bubbleChart') {
            var fenlei = $('.biaoji span[data-type="2"]').attr('data-index')
            var radius = $('.biaoji span[data-type="1"]').attr('data-index')
            var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
            var hangIndex = $('.makeEchars ul li:eq(1) .dragBox span').attr('data-index')
            if (fenlei && radius && lieIndex && hangIndex) {
                obj.legend.push(detail[0][fenlei])
                for (var i = 1; i < detail.length; i++) {
                    obj.data.push([detail[i][lieIndex], detail[i][hangIndex], detail[i][radius], detail[i][fenlei]])
                }
                obj.chart_title = '气泡图'
                    //console.log(obj)
                bubbleChart(obj, box);
            }
        } else if (chartType == 'boxChart') {
            var lieArr = $('.makeEchars ul li:eq(0) .dragBox span')
            var lieIndex = [];
            for (var i = 0; i < lieArr.length; i++) {
                lieIndex.push(lieArr[i].getAttribute('data-index'))
            }
            $('#canvas_box>div').remove()
            $('#canvas_box').append('<div style="width:100%;height:100%;overflow:auto"><table></table></div>')
            for (var i = 0; i < detail.length; i++) {
                var tr = document.createElement('tr')
                for (var j = 0; j < lieIndex.length; j++) {
                    var k = lieIndex[j]
                    var td = document.createElement('td')
                    $(td).html(detail[i][k])
                    $(tr).append(td)
                }
                $('#canvas_box table').append(tr)
            }
        } else if (chartType == 'stripUpPercentChart') {
            var lieArr = $('.makeEchars ul li:eq(0) .dragBox span')
            var lieIndex = [];
            for (var i = 0; i < lieArr.length; i++) {
                lieIndex.push(lieArr[i].getAttribute('data-index'))
            }
            var hangIndex = $('.makeEchars ul li:eq(1) .dragBox span').attr('data-index')
            if (hangIndex && lieIndex.length > 0) {
                for (var i = 0; i < detail.length; i++) {
                    obj.legend.push(detail[i][hangIndex])
                }
                for (var j = 0; j < lieIndex.length; j++) {
                    var k = lieIndex[j]
                    var data = []
                    for (var i = 1; i < detail.length; i++) {
                        data.push(detail[i][k])
                    }
                    obj.data.push({ 'name': detail[0][k], 'value': data })
                }
                obj.chart_title = '百分比堆叠条状图'
                    //console.log(obj)
                stripUpPercentChart(obj, box);
            }
        } else if (chartType == 'lineChart') {
            var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
            var hangIndex = [];
            for (var i = 0; i < hangArr.length; i++) {
                hangIndex.push(hangArr[i].getAttribute('data-index'))
            }
            var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
            if (lieIndex && hangIndex.length > 0) {
                for (var i = 1; i < detail.length; i++) {
                    obj.legend.push(detail[i][lieIndex])
                }
                for (var j = 0; j < hangIndex.length; j++) {
                    var k = hangIndex[j]
                    var data = []
                    for (var i = 1; i < detail.length; i++) {
                        data.push(detail[i][k])
                    }
                    obj.data.push({ 'name': detail[0][k], 'value': data })
                }
                obj.chart_title = '折线图'
                    //console.log(obj)
                lineChart(obj, box);
            }
        } else if (chartType == 'areaChart') {
            var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
            var hangIndex = [];
            for (var i = 0; i < hangArr.length; i++) {
                hangIndex.push(hangArr[i].getAttribute('data-index'))
            }
            var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
            if (lieIndex && hangIndex.length > 0) {
                for (var i = 1; i < detail.length; i++) {
                    obj.legend.push(detail[i][lieIndex])
                }
                for (var j = 0; j < hangIndex.length; j++) {
                    var k = hangIndex[j]
                    var data = []
                    for (var i = 1; i < detail.length; i++) {
                        data.push(detail[i][k])
                    }
                    obj.data.push({ 'name': detail[0][k], 'value': data })
                }
                obj.chart_title = '面积图'
                    //console.log(obj)
                areaChart(obj, box);
            }
        } else if (chartType == 'barUpChart') {
            var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
            var hangIndex = [];
            for (var i = 0; i < hangArr.length; i++) {
                hangIndex.push(hangArr[i].getAttribute('data-index'))
            }
            var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
            if (lieIndex && hangIndex.length > 0) {
                for (var i = 1; i < detail.length; i++) {
                    obj.legend.push(detail[i][lieIndex])
                }
                for (var j = 0; j < hangIndex.length; j++) {
                    var k = hangIndex[j]
                    var data = []
                    for (var i = 1; i < detail.length; i++) {
                        data.push(detail[i][k])
                    }
                    obj.data.push({ 'name': detail[0][k], 'value': data })
                }
                obj.chart_title = '堆叠柱状图'
                    //console.log(obj)
                barUpChart(obj, box);
            }
        } else if (chartType == 'barUpPercentChart') {
            var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
            var hangIndex = [];
            for (var i = 0; i < hangArr.length; i++) {
                hangIndex.push(hangArr[i].getAttribute('data-index'))
            }
            var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
            if (lieIndex && hangIndex.length > 0) {
                for (var i = 1; i < detail.length; i++) {
                    obj.legend.push(detail[i][lieIndex])
                }
                for (var j = 0; j < hangIndex.length; j++) {
                    var k = hangIndex[j]
                    var data = []
                    for (var i = 1; i < detail.length; i++) {
                        data.push(detail[i][k])
                    }
                    obj.data.push({ 'name': detail[0][k], 'value': data })
                }
                obj.chart_title = '百分比堆叠柱状图'
                    //console.log(obj)
                barUpPercentChart(obj, box);
            }
        } else if (chartType == 'stripChart') {
            var lieArr = $('.makeEchars ul li:eq(0) .dragBox span')
            var lieIndex = [];
            for (var i = 0; i < lieArr.length; i++) {
                lieIndex.push(lieArr[i].getAttribute('data-index'))
            }
            var hangIndex = $('.makeEchars ul li:eq(1) .dragBox span').attr('data-index')
            if (hangIndex && lieIndex.length > 0) {
                for (var i = 0; i < detail.length; i++) {
                    obj.legend.push(detail[i][hangIndex])
                }
                for (var j = 0; j < lieIndex.length; j++) {
                    var k = lieIndex[j]
                    var data = []
                    for (var i = 1; i < detail.length; i++) {
                        data.push(detail[i][k])
                    }
                    obj.data.push({ 'name': detail[0][k], 'value': data })
                }
                obj.chart_title = '条状图'
                    //console.log(obj)
                stripChart(obj, box);
            }
        } else if (chartType == 'stripUpChart') {
            var lieArr = $('.makeEchars ul li:eq(0) .dragBox span')
            var lieIndex = [];
            for (var i = 0; i < lieArr.length; i++) {
                lieIndex.push(lieArr[i].getAttribute('data-index'))
            }
            var hangIndex = $('.makeEchars ul li:eq(1) .dragBox span').attr('data-index')
            if (hangIndex && lieIndex.length > 0) {
                for (var i = 0; i < detail.length; i++) {
                    obj.legend.push(detail[i][hangIndex])
                }
                for (var j = 0; j < lieIndex.length; j++) {
                    var k = lieIndex[j]
                    var data = []
                    for (var i = 1; i < detail.length; i++) {
                        data.push(detail[i][k])
                    }
                    obj.data.push({ 'name': detail[0][k], 'value': data })
                }
                obj.chart_title = '堆叠条状图'
                    //console.log(obj)
                stripUpChart(obj, box);
            }
        } else if (chartType == 'barLineChart') {
            obj.data0 = [];
            var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
            var hangIndex = [];
            for (var i = 0; i < hangArr.length; i++) {
                hangIndex.push(hangArr[i].getAttribute('data-index'))
            }
            var lieIndex = $('.makeEchars ul li:eq(0) .dragBox span').attr('data-index')
            var zhexian = $('.biaoji span[data-type="1"]').attr('data-index')
            if (zhexian && lieIndex && hangIndex.length > 0) {
                for (var i = 0; i < detail.length; i++) {
                    obj.legend.push(detail[i][lieIndex])
                }
                for (var j = 0; j < hangIndex.length; j++) {
                    var k = hangIndex[j]
                    var data = []
                    for (var i = 1; i < detail.length; i++) {
                        data.push(detail[i][k])
                    }
                    obj.data.push({ 'name': detail[0][k], 'value': data })
                }
                var data2 = []
                for (var i = 1; i < detail.length; i++) {
                    data2.push(detail[i][zhexian])
                }
                obj.data0.push({ 'name': detail[0][zhexian], 'value': data2 })
                obj.chart_title = '折柱图'
                    //console.log(obj)
                barLineChart(obj, box);
            }
        } else if (chartType == 'radarChart') {
            var fenlei = $('.biaoji span[data-type="1"]').attr('data-index')
            var hangArr = $('.makeEchars ul li:eq(1) .dragBox span')
            var hangIndex = [];
            for (var i = 0; i < hangArr.length; i++) {
                hangIndex.push(hangArr[i].getAttribute('data-index'))
            }
            if (fenlei && hangIndex.length > 0) {
                for (var i = 1; i < detail.length; i++) {
                    obj.legend.push(detail[i][fenlei])
                }
                for (var j = 0; j < hangIndex.length; j++) {
                    var k = hangIndex[j]
                    var data = []
                    for (var i = 1; i < detail.length; i++) {
                        data.push(detail[i][k])
                    }
                    obj.data.push({ 'name': detail[0][k], 'value': data })
                }
                obj.chart_title = '雷达图'
                    //console.log(obj)
                radarChart(obj, box);
            }
        } else if (chartType == 'funnelChart') {
            var color = $('.biaoji span[data-type="1"]').attr('data-index')
            var daxiao = $('.biaoji span[data-type="2"]').attr('data-index')
            if (color && daxiao) {
                for (var i = 1; i < detail.length; i++) {
                    obj.legend.push(detail[i][color])
                    obj.data.push({ 'name': detail[i][color], 'value': detail[i][daxiao] })
                }
                obj.chart_title = '漏斗图'
                    //console.log(obj)
                funnelChart(obj, box);
            } else {
                //console.log(222)
            }
        }
        $('.makeEchars .btn div:eq(1)')[0].data = obj
    }
    /*清空当前图*/
    $('.canvas>img').click(function() {
            $('.canvas #canvas_box').remove()
        })
        /*放大*/
    var parW = $('.echars_box').outerWidth();
    var parH = $('.echars_box').outerHeight();
    //console.log(parW,parH)
    var poW = parW / 2
    var poH = parH / 2
    $('.makeEchars .btn div:eq(0)').click(function() {
            $('.bigChart').addClass('on')
            $('.bigChart>div').remove()
            $('.bigChart i').before('<div></div>')
            setTimeout(function() {
                var type = $('.canvas')[0].type
                var detail = $('.field_box')[0].detail
                plot(type, detail, $('.bigChart>div')[0])
            }, 200)
        })
        /*缩小*/
    $('.bigChart i').click(function() {
            $('.bigChart').removeClass('on')
        })
        /*保存*/
    $('.makeEchars .btn>div:eq(1)').click(function() {
            $('.holdBox input').val('')
            $('.holdBox').fadeIn()
        })
        /*保存弹窗确定按钮*/
    $('.holdSure').click(function() {
            if ($('.holdBox input').val() == '') {
                alertmsg('文件名不能为空', 0)
            } else {
                var name = $('.holdBox input').val()
                var type = $('.canvas')[0].type
                var data = JSON.stringify($('.makeEchars .btn>div:eq(1)')[0].data)
                    //console.log($('.makeEchars .btn>div:eq(1)'))
                $('#canvas_box').addClass('on')
                $('.historyChars dl').append("<dd data-type='" + type + "' data-obj='" + data + "'><span>" + name + "</span><img src='img/yichu2.png'></dd>")
                $('.holdBox').hide()
            }
        })
        /*已存历史作图打开*/
    $('.historyChars dd').live('dblclick', function() {
            if ($('#canvas_box.on')[0]) {
                drawChart($(this))
            } else {
                if ($('#canvas_box>div')[0]) {
                    var r = confirm('检测到当前有未保存的图表,是否对其保存？')
                    if (r) {
                        $('.makeEchars .btn>div:eq(1)').click()
                        var loop;
                        var that = $(this)
                        clearInterval(loop)
                        loop = setInterval(function() {
                            //console.log(1)
                            if ($('#canvas_box.on')[0]) {
                                clearInterval(loop);
                                drawChart(that)
                            }
                        }, 100)
                    } else {
                        drawChart($(this))
                    }
                } else {
                    drawChart($(this))
                }
            }
        })
        /*已保存历史作图还原封装*/
    function drawChart(obj) {
        var type = obj.attr('data-type')
        $('#' + type).click()
        var data_obj = obj.attr('data-obj')
        var data = JSON.parse(data_obj)
        var name = obj.children('span').html()
        $('.makeEchars .btn>div:eq(1)')[0].data = data
        data.chart_title = name
        window[type](data, $('#canvas_box')[0])
        $('#canvas_box').addClass('on')
    }
    /*删除历史作图*/
    $('.historyChars dd img').live('click', function() {
            var s = confirm('确定删除当前历史记录吗？删除后不可恢复。')
            if (s) {
                $(this).parent().remove()
            }
            return false;
        })
        /*关闭保存*/
    $('.holdBox_center i').click(function() {
        $('.holdBox').fadeOut()
    })
    $('.holdNo').click(function() {
            $('.holdBox').fadeOut()
        })
        /*清空画布*/
    $('.clearScene').click(function() {
            scene.clear()
        })
        /*场景保存*/
    $('.scenekeep').click(function() {
        var ggg = stage.saveImageInfo()
        $('.sceneImg img').attr('src', ggg)
        $('.saveBox input:eq(0)').val('')
        $('.saveBox input:eq(1)').val('')
        $('.save').show()
    })
    var msgTig;
    /*场景保存确定*/
    $('.saveBoxSure').click(function() {
            if ($('.saveBox input:eq(0)').val() == '') {
                $('.saveBox span').html('场景名不能为空')
                clearTimeout(msgTig)
                msgTig = setTimeout(function() {
                    $('.saveBox span').html('')
                }, 3000)
            } else {
                var name = $('.saveBox input:eq(0)').val()
                if ($('.saveBox input:eq(1)').val() == '') {
                    $('.saveBox span').html('场景描述不能为空')
                    clearTimeout(msgTig)
                    msgTig = setTimeout(function() {
                        $('.saveBox span').html('')
                    }, 3000)
                } else {
                    var descript = $('.saveBox input:eq(1)').val()
                    var imgbase = $('.sceneImg img').attr('src')
                    var savenode = [];
                    var savelink = [];
                    var save = {};
                    var nodes = scene.childs.filter(function(e) {
                        return e instanceof JTopo.Node;
                    });
                    if (nodes.length > 0) {
                        for (i = 0; i < nodes.length; i++) {
                            var node = nodes[i]
                            delete node.outLinks;
                            delete node.inLinks;
                            savenode.push(node);
                        }
                    }
                    var links = scene.childs.filter(function(e) {
                        return e instanceof JTopo.Link;
                    });
                    if (links.length > 0) {
                        for (var i = 0; i < links.length; i++) {
                            var linkmsg = {};
                            linkmsg.nodea = links[i].nodeA._id;
                            linkmsg.nodez = links[i].nodeZ._id;
                            savelink.push(linkmsg)
                        }
                    }
                    save.nodelist = savenode;
                    save.linklist = savelink;
                    $.ajax({
                        url: url_ip + '/model/chuanimg/',
                        type: 'POST',
                        data: { title: name, desc: descript, img: imgbase, info: JSON.stringify(save), from: 'scene' },
                        datatype: 'json',
                        headers: { 'Authorization': token },
                        success: function(data) {
                            //console.log(data)
                            if (data.status) {
                                $('.YCCJ ul').prepend('<li data-id="' + data.obj_id + '">' +
                                    '<img src="' + imgbase + '">' +
                                    '<div>' + name + '</div>' +
                                    '<p title="' + descript + '">' + descript + '</p>' +
                                    '<h3>' + data.now_time + '</h3>' +
                                    '</li>')
                                $('.save').hide()
                                scene.clear()
                                $('.historyScene').click()
                            } else {
                                alertmsg(data.msg, 0)
                            }
                        },
                        error: function(data) {
                            //console.log(data)
                        }
                    })
                }
            }
        })
        /*场景保存取消*/
    $('.saveBoxNo').click(function() {
            $('.save').hide()
        })
        /*工作台退出*/
    $('h1 i').click(function() {
        window.location.href = 'index.html'
    })
    $('.hint_logo_cancel').click(function() {
            window.location.href = 'index.html'
        })
        //判断地址, 场景详情过来, 默认打开历史场景
    if (window.location.search) {
        var search_comfrom = GetQueryString('obj_id');
        var obj_name = decodeURIComponent(window.location.search.split('=')[2]);
        xrScene(search_comfrom, obj_name)
    }
})