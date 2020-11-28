document.write('<script type="text/javascript" src="js/make_cookies.js"></script>');
var navLdata = [
    // {name: '专业工作台', children: {name: '专业工作台'}},
    {
        name: '自建场景',
        href: 'uploading_algo.new.html',
        children: [{ name: '自建场景' }, { name: '我的场景' }]
    },
    {
        name: '算法集群',
        href: 'alg_list.html?sf',
        children: {
            name: '算法集群',
            list: [{
                    title: '预处理',
                    list: [
                        { name: '因子分析算法', id: 187 },
                        { name: 'K-means算法', id: 170 },
                        { name: '标准化算法', id: 264 },
                        { name: 'Factorization Machine(因子分解机)', id: 258 },
                        { name: '标签特征编码算法', id: 201 },
                    ]
                },
                {
                    title: '分类',
                    list: [
                        { name: 'Adaboost算法', id: 257 },
                        { name: '简单指数平滑算法', id: 208 },
                        { name: '移动平均算法', id: 207 },
                        { name: '朴素贝叶斯算法', id: 199 },
                        { name: 'KNN算法', id: 185 },
                    ]
                },
                {
                    title: '回归',
                    list: [
                        { name: '关联分析算法', id: 183 },
                        { name: '逻辑回归', id: 214 },
                        { name: 'CART(树回归)', id: 267 },
                        { name: '线性回归', id: 209 },
                        { name: 'Softmax Regression算法', id: 178 },
                    ]
                },
                {
                    title: '聚类',
                    list: [
                        { name: '聚合函数', id: 211 },
                        { name: '网格聚类', id: 210 },
                        { name: '层次聚类算法', id: 193 },
                        { name: '密度聚类算法', id: 192 },
                        { name: 'Mean Shift算法', id: 176 },
                    ]
                },
                {
                    title: '时间序列',
                    list: [
                        { name: 'winter指数平滑算法', id: 180 },
                        { name: 'Hopfield网络', id: 383 }
                    ]
                },
                {
                    title: '关联分析',
                    list: [
                        { name: 'CLIQUE', id: 427 },
                        { name: 'WaveCluster', id: 426 },
                        { name: 'STING', id: 425 },
                        { name: 'FDC', id: 424 },
                        { name: 'OPTICS', id: 423 },
                    ]
                },
                {
                    title: '统计分析',
                    list: [
                        { name: '词频统计算', id: 213 },
                        { name: '神经网络算法', id: 206 },
                        { name: '主成分分析算法', id: 181 },
                        { name: '文本分析算法', id: 198 },
                        { name: '情感分析算法', id: 197 },
                    ]
                },
                {
                    title: '网络分析',
                    list: [
                        { name: '神经网络算法', id: 206 },
                        { name: 'RBN算法', id: 177 },
                        { name: 'Hot指数平滑算法', id: 169 },
                        { name: 'RAS分段加密', id: 406 },
                        { name: '数据集拆分', id: 2 },
                    ]
                },
                {
                    title: '其他',
                    list: [
                        { name: '相关系数矩阵算法', id: 204 },
                        { name: '矩阵分解算法', id: 205 },
                        { name: '相似度矩阵算法', id: 203 },
                        { name: '基于项的协同过滤算法', id: 189 },
                        { name: '基于用户的协同过滤算法', id: 188 },
                    ]
                },
            ]
        }
    },
    {
        name: '数据库',
        href: 'data_list.html',
        children: {
            name: '数据库',
            localdata: [
                { name: 'Postgresql', cm: 'postgresql' }, { name: 'SQL Server', cm: 'sqlserver' },
                { name: 'MySQL', cm: 'mysql' }, { name: 'ORACLE', cm: 'oracle' }, { name: 'HIVE', cm: 'hive' }
            ],
            longdata: [
                { name: 'Postgresql', cm: 'postgresql' }, { name: 'SQL Server', cm: 'sqlserver' },
                { name: 'MySQL', cm: 'mysql' }, { name: 'ORACLE', cm: 'oracle' }, { name: 'HIVE', cm: 'hive' }
            ]
        }
    },
    {
        name: '数据可视化',
        href: 'javascript:;',
        children: {
            name: '数据可视化',
            children: [{
                    name: '数据展示',
                    EngName: 'Data Presentation',
                    data2: [
                        { name: '散点图', chartname: 'scatterChart' }, { name: '饼图', chartname: 'pieChart' },
                        { name: '柱状图', chartname: 'barChart' }, { name: '漏斗图', chartname: 'funnelChart' },
                        { name: '堆叠柱状图', chartname: 'barUpChart' }, { name: '表格', chartname: 'boxChart' },
                        { name: '折线图', chartname: 'lineChart' }, { name: '面积图', chartname: 'areaChart' },
                        { name: '热力图', chartname: 'heatMapChart' }, { name: '百分比堆叠条状图', chartname: 'stripUpPercentChart' },
                        { name: '折柱图', chartname: 'barLineChart' }, { name: '气泡图', chartname: 'bubbleChart' },
                        { name: '雷达图', chartname: 'radarChart' },
                    ]
                },
                { name: '数据展示<span style="color: red;">new</span>', data2: [] },
                { name: '数据加工', EngName: 'Data Visualization', data2: [], data21: [{ name: '数据加载' }, { name: '数据清洗' }, { name: '数据同步' }] },
                { name: '数据加工<span style="color: red;">new</span>', data2: [] },
                // {name: '报表分析', data2: []},
            ]
        }
    },
    {
        name: '数据源接入',
        href: 'javascript:;',
        children: {
            name: '数据源接入',
            children: [{
                    name: '数据上传',
                    EngName: 'Data Uploading',
                    data2: [
                        { name: '文本文件', data3: ['Excel', 'Txt', 'Csv'] },
                        { name: '数据库源', data3: ['MySQL', 'PostgreSQL', 'SQL Server', 'Oracle', 'MariaDB'] }
                    ]
                },
                { name: '远程服务器', EngName: 'Remote Server', data3: [] },
                { name: '网络爬取', EngName: 'Network Crawling', data3: [] },
                {
                    name: '公开数据',
                    EngName: 'Public Data',
                    data3: [{ name: '商业', type: '' }, { name: '文化', type: '' }, { name: '环境', type: '' },
                        { name: '生活', type: '' }, { name: '社会', type: '' }, { name: '体育', type: '' },
                        { name: '教育', type: '' }, { name: '科技', type: '' }, { name: '时政', type: '' }
                    ]
                }
            ]
        }
    },
    {
        name: '算法设计',
        href: 'javascript:;',
        children: {
            name: '算法设计',
            children: [
                { name: '自建算法', EngName: 'Algorithm Upload', data3: [{ name: '在线编码' }, { name: '查看已上传算法' }] },
                {
                    name: '自建场景',
                    EngName: 'Custom Scene',
                    data3: [
                        { name: '新建模板' }, { name: '监督学习模板' },
                        { name: '非监督学习模板' },
                        // {name: 'KNN算法模板'},
                        // {name: '独热编码算法模板'},{name: '监因子分析模板'},
                    ]
                },
                { name: '应用场景', EngName: 'Application Scenario', data3: [] },
                // {name: '舆情分析', EngName: 'Public Opinion Analysis', data3: []}
            ]
        }
    },
    {
        name: '犀数学院',
        href: 'xssy_index.html',
        children: [{
            name: '个性化课程',
            children: [
                { name: '精准用户画像', id: 34, label: '' }, { name: '8小时，教你成为PowerBI大师', id: 33, label: '' },
                { name: '数据可视化五部曲', id: 32, label: '' }, { name: '数据分析应用之SPSS', id: 28, label: 'new' },
                { name: '数据分析应用技能之R语言', id: 14, label: '' }, { name: '数据分析应用技能之Python', id: 13, label: '' },
                // {name: 'Datahoop2.0使用教程', id: 11, label: 'hot'},
                // {name: 'CPDA课程', id: 37, label: 'hot'},
                { name: 'CPDA数据分析师模拟习题库', id: 36, label: '' }, { name: 'SPSS核心技能速成班', id: 35, label: '' },
                { name: 'PowerBI数据建模', id: 31, label: '' }, { name: 'PowerBI可视化', id: 30, label: '' },
                { name: 'PowerBI数据整理', id: 29, label: 'new' }, { name: '机器学习理论基础', id: 27, label: 'hot' },
                { name: '分析工具基础', id: 26, label: '' }, { name: '数据分析基础', id: 25, label: '' },
                // {name: 'CPDA课程介绍', id: 24, label: ''},
                { name: 'R语言机器学习实战', id: 23, label: '' },
                { name: 'R语言统计分析实战', id: 22, label: '' }, { name: 'R语言数据处理', id: 21, label: '' },
                { name: 'R语言基础入门', id: 20, label: '' }, { name: 'Python机器学习实战', id: 19, label: '' },
                { name: 'Pandas基础', id: 18, label: '' }, { name: 'Matplotlib可视化基础', id: 17, label: '' },
                { name: 'Numpy基础课程', id: 16, label: '' }, { name: 'Python快速入门', id: 15, label: '' },
            ]
        }]
    },
    { name: '悬赏参与', href: 'javascript:;', href1: 'reward.html', children: [{ name: '参与悬赏' }, { name: '发布需求' }] },
    {
        name: '行业资讯',
        href: 'information_center.html',
        children: {
            name: '行业资讯',
            data2: [
                { name: '行业资讯', data3: [] },
                { name: '运营资讯', data3: [] },
                { name: '算法资讯', data3: [] },
            ]
        }
    },
    {
        name: '帮助中心',
        href: 'help_center.html',
        children: {
            name: '帮助中心',
            children: [{
                    question: "账户与会员",
                    id: 1,
                    data3: [            { question: "如何注册用户？", id: 2 },              { question: "用户如何登录？", id: 3 },              { question: "如何找回密码？", id: 4 },              { question: "如何提升会员等级？", id: 5 },              { question: "什么是用户积分？", id: 6 }],
                }, {
                    question: "个人中心",
                    id: 2,
                    data3: [
                        { question: "如何查看我的账户信息？", id: 7 },      { question: "如何查看我拥有的资源信息？", id: 8 },      { question: "如何查看我的收纳信息？", id: 9 },
                        { question: "如何填写个人资料？", id: 10 },      { question: "如何修改登录密码？", id: 11 },      { question: "如何关注其他用户？", id: 12 }
                    ],
                }, {
                    question: "数据源接入",
                    id: 3,
                    data3: [
                        { question: "如何获取数据？", id: 13 },
                    ],
                }, {
                    question: "数据可视化",
                    id: 4,
                    data3: [
                        { question: "如何进行数据加工？", id: 14 },
                        { question: "如何进行数据合并？", id: 15 },
                        { question: "如何进行数据展示？", id: 16 }
                    ],
                }, { question: "算法设计", id: 5, data3: [            { question: "如何上传算法？", id: 17 },              { question: "自建算法须知", id: 22 },              { question: "2.0读取数据规则", id: 23 },              { question: "自建算法支持模块", id: 24 },              { question: "如何将本地算法变成在线可运行", id: 25 }] },
                {
                    question: "分析工作台",
                    id: 6,
                    data3: [
                        { question: "如何使用分析工作台？", id: 18 },
                        { question: "如何对数据进行预测?", id: 21 }
                    ],
                }, {
                    question: "商品购买",
                    id: 7,
                    data3: [
                        { question: "如何购买微课？", id: 19 },
                        { question: "如何购买算法和算力？", id: 20 }
                    ],
                },
            ]
        }
    },
    { name: '联系我们', href: 'contact_us.html', children: { name: '联系我们' } },
    { name: '关于我们', href: 'about_us.html', children: { name: '关于我们' } },
    { name: '建议与反馈', href: 'feedback.html', children: { name: '建议与反馈' } },
    {
        name: '网课中心',
        children: [{
            name: '个性化课程',
            EngName: 'Individualized Curriculum',
            children: [
                { name: '精准用户画像', id: 34, label: '' }, { name: '8小时，教你成为PowerBI大师', id: 33, label: '' },
                { name: '数据可视化五部曲', id: 32, label: '' }, { name: '数据分析应用之SPSS', id: 28, label: 'new' },
                { name: '数据分析应用技能之R语言', id: 14, label: '' }, { name: '数据分析应用技能之Python', id: 13, label: '' },
                // {name: 'Datahoop2.0使用教程', id: 11, label: 'hot'},
                // {name: 'CPDA课程', id: 37, label: 'hot'},
                { name: 'CPDA数据分析师模拟习题库', id: 36, label: '' }, { name: 'SPSS核心技能速成班', id: 35, label: '' },
                { name: 'PowerBI数据建模', id: 31, label: '' }, { name: 'PowerBI可视化', id: 30, label: '' },
                { name: 'PowerBI数据整理', id: 29, label: 'new' }, { name: '机器学习理论基础', id: 27, label: 'hot' },
                { name: '分析工具基础', id: 26, label: '' }, { name: '数据分析基础', id: 25, label: '' },
                // {name: 'CPDA课程介绍', id: 24, label: ''},
                { name: 'R语言机器学习实战', id: 23, label: '' },
                { name: 'R语言统计分析实战', id: 22, label: '' }, { name: 'R语言数据处理', id: 21, label: '' },
                { name: 'R语言基础入门', id: 20, label: '' }, { name: 'Python机器学习实战', id: 19, label: '' },
                { name: 'Pandas基础', id: 18, label: '' }, { name: 'Matplotlib可视化基础', id: 17, label: '' },
                { name: 'Numpy基础课程', id: 16, label: '' }, { name: 'Python快速入门', id: 15, label: '' },
            ]
        }, { name: '个性化资料', EngName: 'Personalized Data', children: [] }]
    }
]
<!-- Matomo -->
var _paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//da.datahoop.cn/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
<!-- End Matomo Code -->
var xs_bi_ = 'C币';
var token;
// var token = "JWT " + window.sessionStorage.token;
if(window.localStorage.token) {
    token = "JWT " + window.localStorage.token;
}
else {
    token = "JWT " + window.sessionStorage.token;
}
// var token = "JWT " + window.localStorage.token ? window.localStorage.token : window.sessionStorage.token;
var token1 = token;
if (token1 == "JWT " + undefined) {
    token1 = '';
}
var urlip = url_ip;
var token_id = '';
var user_name_ = '';
var user_img = 'img/user_img.png'

var JQ = true;

/*滚动条封装S*/
$(function() {
    rxued.scrolls = {
        doScroll: function(obj, ulclass, li, prev, next, scrollsl, fn) {
            var oUllist = obj.find(ulclass);
            var oLi = obj.find(li);
            var theLength = oLi.length;
            var oWidth = parseInt(oLi.eq(0).outerWidth()) + parseInt(oLi.eq(0).css("margin-left")) + parseInt(oLi.eq(0).css(
                "margin-right"));
            oUllist.width(oWidth * theLength);
            if (theLength > scrollsl) {
                obj.find(prev).show();
                obj.find(next).show()
            } else {
                obj.find(prev).hide();
                obj.find(next).hide()
            }
            var iNum = 0;
            obj.find(prev).unbind("click");
            obj.find(prev).click(function() {
                if (!oUllist.is(":animated")) {
                    if (iNum == 0) {} else {
                        iNum -= scrollsl;
                        oUllist.animate({
                            "marginLeft": -oWidth * iNum + "px"
                        }, 500)
                    }
                }
            });
            obj.find(next).unbind("click");
            obj.find(next).click(function() {
                if (!oUllist.is(":animated")) {
                    iNum += scrollsl;
                    if (iNum >= theLength) {
                        oUllist.animate({
                            "marginLeft": 0 + "px"
                        }, 500);
                        iNum = 0
                    }
                    if (theLength - iNum < scrollsl) {
                        oUllist.animate({
                            "marginLeft": -oWidth * (theLength - scrollsl) + "px"
                        }, 500)
                    } else {
                        oUllist.animate({
                            "marginLeft": -oWidth * iNum + "px"
                        }, 500)
                    }
                }
            });
            if (typeof(fn) == "function") {
                fn()
            }
        },
        doScroll2: function(obj, ulclass, ul_li, olclass, ol_li, ol_active, prev, next) {
            var oUllist = obj.find(ulclass);
            var oOllist = obj.find(olclass);
            var oi = 0;
            var oUlli = obj.find(ul_li);
            var oOlli = obj.find(ol_li);
            var theLength = oUlli.length;
            var oWidth = parseInt(oUlli.eq(0).outerWidth()) + parseInt(oUlli.eq(0).css("margin-left")) + parseInt(oUlli.eq(0).css(
                "margin-right"));
            oUllist.width(oWidth * theLength);
            obj.find(prev).unbind("click");
            obj.find(prev).click(function() {
                if (!oUllist.is(":animated")) {
                    if (oi == 0) {
                        return false
                    } else {
                        oi--;
                        oUllist.animate({
                            "marginLeft": -oWidth * oi + "px"
                        }, 500);
                        oOlli.eq(oi).addClass(ol_active).siblings().removeClass(ol_active)
                    }
                }
            });
            obj.find(next).unbind("click");
            obj.find(next).click(function() {
                if (!oUllist.is(":animated")) {
                    if (oi == theLength - 1) {
                        return false
                    } else {
                        oi++;
                        oUllist.animate({
                            "marginLeft": -oWidth * oi + "px"
                        }, 500);
                        oOlli.eq(oi).addClass(ol_active).siblings().removeClass(ol_active)
                    }
                }
            });
            oOlli.click(function() {
                oi = $(this).index();
                $(this).addClass(ol_active).siblings().removeClass(ol_active);
                oUllist.animate({
                    "marginLeft": -oWidth * oi + "px"
                }, 500)
            })
        },
        doScroll3: function(obj, ulclass, li, prev, next, scrollsl, bigimgclass, cur, fn) {
            var oUllist = obj.find(ulclass);
            var oLi = obj.find(li);
            var theLength = oLi.length;
            var oWidth = parseInt(oLi.eq(0).outerWidth()) + parseInt(oLi.eq(0).css("margin-left")) + parseInt(oLi.eq(0).css(
                "margin-right"));
            oUllist.width(oWidth * theLength);
            var iNum = 0;
            obj.find(prev).unbind("click");
            obj.find(prev).click(function() {
                if (!oUllist.is(":animated")) {
                    if (iNum == 0) {} else {
                        iNum -= scrollsl;
                        oUllist.animate({
                            "marginLeft": -oWidth * iNum + "px"
                        }, 500)
                    }
                }
            });
            obj.find(next).unbind("click");
            obj.find(next).click(function() {
                if (!oUllist.is(":animated")) {
                    iNum += scrollsl;
                    if (iNum >= theLength) {
                        oUllist.animate({
                            "marginLeft": 0 + "px"
                        }, 500);
                        iNum = 0
                    }
                    if (theLength - iNum < scrollsl) {
                        oUllist.animate({
                            "marginLeft": -oWidth * (theLength - scrollsl) + "px"
                        }, 500)
                    } else {
                        oUllist.animate({
                            "marginLeft": -oWidth * iNum + "px"
                        }, 500)
                    }
                }
            });
            oLi.click(function() {
                $(this).addClass(cur).siblings().removeClass(cur);
                var othisSrc = $(this).find("img").attr("src");
                obj.find(bigimgclass).attr("src", othisSrc);
                if (typeof(fn) == "function") {
                    fn()
                }
            })
        }
    };
})
var rxued;
if (!rxued) {
    rxued = {}
}
(function(e) {
    e.fn.extend({
        slimScroll: function(n) {
            var i = e.extend({
                width: "auto",
                height: "250px",
                maxHeight: "50px",
                size: "2px",
                color: "#cecece",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: 0.4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: 0.2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px"
            }, n);
            return this.each(function() {
                function o(t) {
                    if (d) {
                        t = t || window.event;
                        var n = 0;
                        t.wheelDelta && (n = -t.wheelDelta / 120), t.detail && (n = t.detail / 3), e(t.target || t.srcTarget || t.srcElement)
                            .closest("." + i.wrapperClass).is(y.parent()) && r(n, !0), t.preventDefault && !v && t.preventDefault(), v ||
                            (t.returnValue = !1)
                    }
                }

                function r(e, t, n) {
                    v = !1;
                    var o = e,
                        r = y.outerHeight() - _.outerHeight();
                    t && (o = parseInt(_.css("top")) + e * parseInt(i.wheelStep) / 100 * _.outerHeight(), o = Math.min(Math.max(
                            o, 0), r), o = e > 0 ? Math.ceil(o) : Math.floor(o), _.css({
                            top: o + "px"
                        })), f = parseInt(_.css("top")) / (y.outerHeight() - _.outerHeight()), o = f * (y[0].scrollHeight - y.outerHeight()),
                        n && (o = e, e = o / y[0].scrollHeight * y.outerHeight(), e = Math.min(Math.max(e, 0), r), _.css({
                            top: e + "px"
                        })), y.scrollTop(o), y.trigger("slimscrolling", ~~o), s(), l()
                }

                function a() {
                    m = Math.max(y.outerHeight() / y[0].scrollHeight * y.outerHeight(), 30), _.css({
                        height: m + "px"
                    });
                    var e = m == y.outerHeight() ? "none" : "block";
                    _.css({
                        display: e
                    })
                }

                function s() {
                    a(), clearTimeout(u), f == ~~f ? (v = i.allowPageScroll, g != f && y.trigger("slimscroll", 0 == ~~f ? "top" :
                        "bottom")) : v = !1, g = f, m >= y.outerHeight() ? v = !0 : (_.stop(!0, !0).fadeIn("fast"), i.railVisible &&
                        x.stop(!0, !0).fadeIn("fast"))
                }

                function l() {
                    i.alwaysVisible || (u = setTimeout(function() {
                        i.disableFadeOut && d || c || h || (_.fadeOut("slow"), x.fadeOut("slow"))
                    }, 1000))
                }
                var d, c, h, u, p, m, f, g, v = !1,
                    y = e(this);
                if (y.parent().hasClass(i.wrapperClass)) {
                    var b = y.scrollTop(),
                        _ = y.closest("." + i.barClass),
                        x = y.closest("." + i.railClass);
                    if (a(), e.isPlainObject(n)) {
                        if ("height" in n && "auto" == n.height) {
                            y.parent().css("height", "auto"), y.css("height", "auto");
                            var E = y.parent().parent().height();
                            y.parent().css("height", E), y.css("height", E)
                        }
                        if ("scrollTo" in n) {
                            b = parseInt(i.scrollTo)
                        } else {
                            if ("scrollBy" in n) {
                                b += parseInt(i.scrollBy)
                            } else {
                                if ("destroy" in n) {
                                    return _.remove(), x.remove(), void y.unwrap()
                                }
                            }
                        }
                        r(b, !1, !0)
                    }
                } else {
                    if (!(e.isPlainObject(n) && "destroy" in n)) {
                        i.height = "auto" == i.height ? y.parent().height() : i.height, b = e("<div></div>").addClass(i.wrapperClass)
                            .css({
                                position: "relative",
                                overflow: "hidden",
                                width: i.width,
                                height: i.height
                            }), y.css({
                                overflow: "hidden",
                                width: i.width,
                                height: i.height
                            });
                        var x = e("<div></div>").addClass(i.railClass).css({
                                width: i.size,
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                display: i.alwaysVisible && i.railVisible ? "block" : "none",
                                "border-radius": i.railBorderRadius,
                                background: i.railColor,
                                opacity: i.railOpacity,
                                zIndex: 90
                            }),
                            _ = e("<div></div>").addClass(i.barClass).css({
                                background: i.color,
                                width: i.size,
                                position: "absolute",
                                top: 0,
                                opacity: i.opacity,
                                display: i.alwaysVisible ? "block" : "none",
                                "border-radius": i.borderRadius,
                                BorderRadius: i.borderRadius,
                                MozBorderRadius: i.borderRadius,
                                WebkitBorderRadius: i.borderRadius,
                                zIndex: 99
                            }),
                            E = "right" == i.position ? {
                                right: i.distance
                            } : {
                                left: i.distance
                            };
                        x.css(E), _.css(E), y.wrap(b), y.parent().append(_), y.parent().append(x), i.railDraggable && _.bind(
                                "mousedown",
                                function(n) {
                                    var i = e(document);
                                    return h = !0, t = parseFloat(_.css("top")), pageY = n.pageY, i.bind("mousemove.slimscroll", function(e) {
                                        currTop = t + e.pageY - pageY, _.css("top", currTop), r(0, _.position().top, !1)
                                    }), i.bind("mouseup.slimscroll", function(e) {
                                        h = !1, l(), i.unbind(".slimscroll")
                                    }), !1
                                }).bind("selectstart.slimscroll", function(e) {
                                return e.stopPropagation(), e.preventDefault(), !1
                            }), x.hover(function() {
                                s()
                            }, function() {
                                l()
                            }), _.hover(function() {
                                c = !0
                            }, function() {
                                c = !1
                            }), y.hover(function() {
                                d = !0, s(), l()
                            }, function() {
                                d = !1, l()
                            }), y.bind("touchstart", function(e, t) {
                                e.originalEvent.touches.length && (p = e.originalEvent.touches[0].pageY)
                            }), y.bind("touchmove", function(e) {
                                v || e.originalEvent.preventDefault(), e.originalEvent.touches.length && (r((p - e.originalEvent.touches[
                                    0].pageY) / i.touchScrollStep, !0), p = e.originalEvent.touches[0].pageY)
                            }), a(), "bottom" === i.start ? (_.css({
                                top: y.outerHeight() - _.outerHeight()
                            }), r(0, !0)) : "top" !== i.start && (r(e(i.start).position().top, null, !0), i.alwaysVisible || _.hide()),
                            window.addEventListener ? (this.addEventListener("DOMMouseScroll", o, !1), this.addEventListener(
                                "mousewheel", o, !1)) : document.attachEvent("onmousewheel", o)
                    }
                }
            }), this
        }
    }), e.fn.extend({
        slimscroll: e.fn.slimScroll
    })
})(jQuery);
/*滚动条封装N*/
/* 是否ie浏览器 asdfgh */
function isIeFn() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE || isIE11) {
        $('.ieTipTxt').show();
    } else {
        $('.ieTipTxt').hide();
    }
}
/* 获取search某个参数, eg: GetQueryString("param"), 若无, 返回null */
function GetQueryString(param) {
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
/*
	message
	成功: success;
	警告: warning;
*/
function lkwMessage(type, cont) {
    $('.lkw-fshadow').show();
    $('.lkw-msg').addClass('lkw-msg-' + type).html('<i class="lkw-msg-icon fl lkw-icon-' + type + '"></i><p class="lkw-msg-cont">' + cont + '</p></div>').animate({ top: 20 }, function() {
        setTimeout(function() {
            $('.lkw-msg').animate({ top: '-100%' }).removeClass('lkw-msg-' + type);
            $('.lkw-fshadow').hide();
        }, 1500)
    });
}
var maxrl;
var syrl;

function datarl() {
    $.ajax({
        type: "GET",
        url: url_ip + '/personal/myaccount/',
        data: {},
        dataType: "json",
        async: false,
        headers: {
            'Authorization': token
        },
        success: function(res) {
            // console.log(res)
            if (res.status) {
                maxrl = res.data.mystorage.maxsize
                syrl = res.data.mystorage.mysize / res.data.mystorage.maxsize * 100;
                if (syrl >= 100) {
                    syrl = 100;
                }
                $(".nav_percen_tlp2").html('总容量<b>' + maxrl + '</b>M');
                $(".nav_percen_tby").css("width", syrl + "%");
            }
        }
    });
}
/*nav*/
function lkwNavPage() {
    var navAllHtml = '';
    for (var i = 0; i < navLdata.length; i++) {
        if (i < 10) {
            if (i == 6) {
                navAllHtml += '<li class=""><a class="lev_01Href" href="' + navLdata[i].href + '">' + navLdata[i].name + '</a>'
            } else {
                navAllHtml += '<li class="lev_next">' +
                    '<a class="lev_01Href" href="' + navLdata[i].href + '">' + navLdata[i].name + '</a>' +
                    '<div data-item="aa" class="lev_02 lev_">' +
                    '<div data-item="aa" class="lev_02Scroll">' +

                    '</div>' +
                    '</div>' +
                    '</li>'
            }
        } else if (i >= 10 && i < 13) {
            navAllHtml += '<li class=""><a class="lev_01Href" href="' + navLdata[i].href + '">' + navLdata[i].name + '</a>'
        }
    }
    var navHtml = '<div style="min-width: 1024px;position: relative;">' +
        '<div class="navTop">' +
        // '<div class="navAll"><img src="img/icon/nav_all.png" width="18"></div>' +
        '<h1 class="fl"><a href="index.html"></a></h1>' +
        '<ul>' +
        '<li class="navHelp">' +
        '<div class="isDisplayMsgRed" style="width: 10px;height: 10px;border-radius:50%;background-color:red;position: absolute;right: 11%; display: none"></div>' +
        '<i></i>' +
        '<span class="navHelp_news">消息</span>' +
        '<div class="nav_news"><div class="nav_news_t"><p>消息中心</p></div><div class="nav_news_b"><div class="nav_news_bbc">查看全部</div></div></div>' +
        '</li>' +
        // '<li class="navPers hide" style="border-right: 1px solid hsla(0,0%,100%,.15);">' +
        // '<!-- <i></i> -->' +
        // '<span><a href="perscen-zh.html" style="color: #fff;">个人中心</a></span>' +
        // '</li>' +
        '<li class="navKong"></li>' +
        '<li class="navLogin" data-login="1">' +
        '<i class="fl toI"></i>' +
        '<span class="fl"><a href="login.html?back" style="color: #fff;">登录</a></span>' +
        // '<p class="fl"><img src="img/icon/outLogin.png" width="18px" style="margin-top: 1px;" alt="">退出</p>' +
        '<div class="nav_percen"><div class="nav_percen_t"><div class="nav_percen_tl"><p class="nav_percen_tlp1"></p><p class="nav_percen_tlp2">总容量<b>99999999</b>M</p></div><div class="nav_percen_tr"><img src="" alt=""></div><div class="nav_percen_tb"><div class="nav_percen_tbw"><div class="nav_percen_tby""></div></div></div></div><div class="nav_percen_b"><div class="nav_percen_xf"><span class="fl nav_percen_xfl"></span><span class="fr nav_percen_xfr">续费</span><span class="clear"></span></div><ul><li>个人中心</li><li>我的订单</li><li>帮助中心</li></ul><div class="nav_percen_bdc">退出账号<b></b></div><div class="nav_percen_kun"></div></div></div>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div class="navBot">' +
        '<ul>' +
        '<li class="active">' +
        '<a href="index.html">产品与服务</a>' +
        '</li>' +
        '<li>' +
        '<a href="javascript:void(0);">分析工作台</a>' +
        '<i></i>' +
        '<div class="navSlide">' +
        '<p><a  href="hmodel2.html" class="specialty">专业版</a></p>' +
        '</div>' +
        '</li>' +
        '<li>' +
        '<a href="javascript:;">数据源接入</a>' +
        '<i></i>' +
        '<div class="navSlide">' +
        '<p><a href="data_list.html">文本文件</a></p>' +
        '<p><a href="data_list.html">数据库源</a></p>' +
        '<p><a href="alg_list.html?sj">公开数据</a></p>' +
        '</div>' +
        '</li>' +
        '<li>' +
        '<a href="javascript:;">数据可视化</a>' +
        '<i></i>' +
        '<div class="navSlide">' +
        '<p><a href="ksh2.html" class="dataShow">数据展示</a></p>' +
        '<p><a href="ycl2.html" class="dataProcess">数据加工</a></p>' +
        '</div>' +
        '</li>' +
        '<li>' +
        '<a href="javascript:;">算法与场景</a>' +
        '<i></i>' +
        '<div class="navSlide">' +
        '<p><a href="javascript:void(0);" class="selfsetup1">自建算法</a>' +
        '<span class="navSlide_span"><a href="javascript:void(0);" class="selfsetup2">新建算法</a><a href="javascript:void(0);" class="selfsetup3">已上传算法</a></span>' +
        '</p>' +
        '<p><a href="javascript:void(0);" class="selfscene">自建场景</a>' +
        '<span class="navSlide_span"><a href="javascript:void(0);" class="selfscene1">新建场景</a><a href="javascript:void(0);" class="selfscene">我的场景</a></span>' +
        '</p>' +
        '</div>' +
        '</li>' +
        '<li>' +
        '<a href="alg_list.html?sf">公开资源</a>' +
        '<i></i>' +
        '<div class="navSlide">' +
        '<p><a href="alg_list.html?sf">算法</a></p>' +
        '<p><a href="alg_list.html?sj">数据</a></p>' +
        '<p><a href="alg_list.html?cj">场景</a></p>' +
        '</div>' +
        '</li>' +
        '<li><a href="xssy_index.html">网课中心</a></li>' +
        // '<li><a href="javascript:;" class="nav_cpdaGo">CPDA网课中心</a></li>'+
        //'<li><a href="javascript:;" class="jupyter">jupyter</a></li>' +
        '<li class="hide">' +
        '<a href="#">资源管理</a>' +
        '<div class="navSlide">' +
        '<a href="javascript:;">合作伙伴</a>' +
        '<a href="javascript:;">共享资源</a>' +
        '<a href="javascript:;">项目资源</a>' +
        '</div>' +
        '</li>' +
        '<li class="hide">行业资讯</li>' +
        // register.html
        // '<li class="zc"><a href="javascript:;">免费注册</a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="navHideL">' +
        '<div class="lev_01">' +
        '<ul class="lev_01Ajax">' +
        navAllHtml +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="navHide">' +
        '<div data-item="分析工作台">' +
        // '<ul class="navHide_tabL hide">' +
        // '</ul>' +
        // '<div class="navHide_tabR fxgzt" style="background: #fff;">' +
        // '<p><a href="model.html">社区版</a></p>' +
        // '<p class="zyb"><a href="javascript:;">专业版</a></p>' +
        // '</div>' +
        '</div>' +
        '<div data-item="数据源接入">' +

        '<ul class="navHide_tabL hide">' +
        //
        '</ul>' +
        '<div class="navHide_tabR bgDiv sjyjr">' +

        '</div>' +
        '</div>' +
        '<div data-item="数据可视化">' +
        '<ul class="navHide_tabL hide">' +

        '</ul>' +
        '<div class="navHide_tabR bgDiv sjksh">' +

        '</div>' +
        '</div>' +
        '<div data-item="算法与设计">' +
        '<ul class="navHide_tabL hide">' +

        '</ul>' +
        '<div class="navHide_tabR bgDiv sfysj">' +

        '</div>' +
        '</div>' +
        // '<div data-item="网课中心">'+
        // 		'<ul class="navHide_tabL">'+
        // 			'<li class="active"><a href="javascript:;">个性化课程</a></li>'+
        // 			'<li><a href="javascript:;">个性化资料</a></li>'+
        // 		'</ul>'+
        // 		'<div class="navHide_tabR zycd hide">'+

        // 		'</div>'+
        // '</div>'+
        '</div>' +
        '<div class="ieTipTxt" style="height: 50px;line-height: 50px;font-size: 20px;color: #e6a23c;position: absolute;left: 50%;top: 0;transform: translateX(-50%);overflow:hidden;txte-overflow: ellipsis;white-space: nowrap;display: none;">不再对IE浏览器做支持，推荐使用google、firefox等现代浏览器</div>' +
        '</div>';
    // var nav_cpdaLoginHtml = '<div class="nav_cpdaLoginMu msg-box-wraper hide" style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;text-align: center;background: rgba(0,0,0,0.6);z-index: 1031;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index: 9999">'+
    // 	'<div class="msg-box"><i class="msg-close-cpda" style="font-size: 30px;font-weight: 200;position: absolute;right: 10px;top: 0px;color: #999;cursor: pointer;">×</i><h2><span>提示信息</span></h2>'+
    // 		'<div><p>您目前还没有注册或登录~ </p></div>'+
    // 		'<div class="msg-box-btn">'+
    // 			'<span class="ok"><a href="login.html?cm=cpdalogin">登 录</a></span>'+
    // 			// '<span class="no"><a href="register.html?cm="cpdaregist"">注 册</a></span>'+
    // 		'</div>'+
    // 	'<div>'+
    // '</div>'
    var giveCB_MyGoldTxt = '<div class="giveCB_MyGoldMu">' +
        '<div class="giveCb_MyGold">' +
        '<i class="giveCb_MyGold_close"></i>' +
        '<p class="giveCb_MyGold_tip_max">尊敬的CPDA学员您好，本平台赠送您</p>' +
        '<h3><span class="giveCb_MyGold_giveCBnum">--</span> <span class="xs_bi_"></span></h3>' +
        '<p class="giveCb_MyGold_tip_max">您可以去网课中心使用C币去购买心仪的课</p>' +
        '<div class="giveCb_MyGold_btnFoo">' +
        '<a class="giveCb_MyGold_btn ml17" href="perscen-zh.html">查看<span class="xs_bi_"></span></a>' +
        '<a class="giveCb_MyGold_btn mr17" href="cpda_selsource.html">去选课</a>' +
        '</div>' +
        '</div>' +
        '</div>'
        $('nav').html(navHtml + giveCB_MyGoldTxt);
        // if(location.hash.search('cpda') === -1) {
        // }
        // else {
        //     changeStyle();
        // }
    // $('nav').html(navHtml).append(nav_cpdaLoginHtml);

    for (var i = 0; i < navLdata.length; i++) {
        if (i == 0) {
            var navAll_zjsf_lev2Html = '';
            for (var j = 0; j < navLdata[i].children.length; j++) {
                navAll_zjsf_lev2Html += '<dd><a href="uploading_algo.new.html">' + navLdata[i].children[j].name + '</a></dd>';
            }
            var navAll_zjcjAjax = '<div data-item="aa" class="lev_02Scroll lev_02_noNextFoo">' +
                '<dl>' +
                // '<dt style="width: 200px;"><a href="javascript:;">'+navLdata[i].children.name+'</a></dt>'+
                navAll_zjsf_lev2Html +
                '</dl>' +
                '</div>'
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').addClass('lev_02_mid');
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').html(navAll_zjcjAjax);
        } else if (i == 1) {
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').addClass('lev_02_max');
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').html('<div data-item="aa" class="lev_02Scroll navAll_sfjq"></div>');
            for (var j = 0; j < navLdata[i].children.list.length; j++) {
                var navAll_sfjqAjax = '<dl>' + '<dt class="navGo" data-href="alg_list.html?sf=' + j + '"><a href="javascript:;">' + navLdata[i].children.list[j].title + '<i>更多></i></a></dt>' + '</dl>';
                $('.navAll_sfjq').append(navAll_sfjqAjax);
                for (var k = 0; k < navLdata[i].children.list[j].list.length; k++) {
                    var navAll_sfjqAjax2 = '<dd class="navGo" data-go="details" data-href="details.html?' + navLdata[i].children.list[j].list[k].id + '"><a href="javascript:;">' + navLdata[i].children.list[j].list[k].name + '</a></dd>'
                    $('.navAll_sfjq').children('dl').eq(j).append(navAll_sfjqAjax2)
                }
            }
        } else if (i == 2) {
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').addClass('lev_02_mid');
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').html('<div data-item="aa" class="lev_02Scroll navAll_sjk"></div>');
            var navAll_sjkAjax = '<dl>' +
                '<dt><a href="data_list.html">数据库</a></dt>' +
                '</dl>'
            $('.navAll_sjk').html(navAll_sjkAjax)
            for (var j = 0; j < navLdata[i].children.localdata.length; j++) {
                var navAll_sjkAjax2 = '<dd><a href="data_list.html?cm=' + navLdata[i].children.longdata[j].cm + '">' + navLdata[i].children.localdata[j].name + '</a></dd>'
                $('.navAll_sjk').children('dl').eq(0).append(navAll_sjkAjax2);
            }
            for (var j = 0; j < navLdata[i].children.localdata.length; j++) {
                var navAll_sjkAjax2 = '<dd><a href="data_list.html?cm=' + navLdata[i].children.longdata[j].cm + '">' + navLdata[i].children.longdata[j].name + '</a></dd>'
                $('.navAll_sjk').children('dl').eq(1).append(navAll_sjkAjax2);
            }
        } else if (i == 3) {
            // var navHide_tabLHtml = '';// 下拉nav左
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').addClass('lev_02_max');
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').html('<div data-item="aa" class="lev_02Scroll navAll_sjksh"></div>');
            for (var j = 0; j < navLdata[i].children.children.length; j++) {
                var navHide_tabRHtml = '';
                if (j == 0) {
                    navHide_tabRHtml = '<dt><a href="ksh.html">' + navLdata[i].children.children[j].name + '</a></dt>'; // 下拉nav右
                } else if (j == 1) {
                    navHide_tabRHtml = '<dt><a href="ksh2.html">' + navLdata[i].children.children[j].name + '</a></dt>'; // 下拉nav右
                } else if (j == 2) {
                    navHide_tabRHtml = '<dt><a href="ycl.html">' + navLdata[i].children.children[j].name + '</a></dt>'; // 下拉nav右
                } else if (j == 3) {
                    navHide_tabRHtml = '<dt><a href="ycl2.html">' + navLdata[i].children.children[j].name + '</a></dt>'; // 下拉nav右
                } else if (j == 4) {
                    navHide_tabRHtml = '<dt><a href="smartBi.html">' + navLdata[i].children.children[j].name + '</a></dt>'; // 下拉nav右
                }
                // navHide_tabLHtml +=  '<li><a href="javascript:;"><i>'+navLdata[i].children.children[j].Engname+'</i><span>'+navLdata[i].children.children[j].name+'</span></a></li>';//下拉nav左
                var navAll_sjkshAjax = '<dl>' + '<dt><a href="ksh.html">' + navLdata[i].children.children[j].name + '<i>更多></i></a></dt>' + '</dl>';
                $('.navAll_sjksh').append(navAll_sjkshAjax);
                for (var k = 0; k < navLdata[i].children.children[j].data2.length; k++) {
                    if (j == 2) {
                        navHide_tabRHtml += '<dd><a href="ycl2.html?cm=' + navLdata[i].children.children[j].data2[k].chartname + '">' + navLdata[i].children.children[j].data2[k].name + '</a></dd>'; // 下拉nav右
                    } else {
                        navHide_tabRHtml += '<dd><a href="ksh.html?cm=' + navLdata[i].children.children[j].data2[k].chartname + '">' + navLdata[i].children.children[j].data2[k].name + '</a></dd>'; // 下拉nav右
                    }
                    var navAll_sjkshAjax2 = '<dd><a href="ksh.html?cm=' + navLdata[i].children.children[j].data2[k].chartname + '">' + navLdata[i].children.children[j].data2[k].name + '</a></dd>';
                    $('.navAll_sjksh').children('dl').eq(j).append(navAll_sjkshAjax2);
                }
                $('.navHide>div[data-item="数据可视化"] .navHide_tabR').append('<dl>' + navHide_tabRHtml + '</dl>');
            }
            // $('.navHide>div[data-item="数据可视化"] .navHide_tabL').html(navHide_tabLHtml); //下拉nav左
            // $('.navHide>div[data-item="数据可视化"] .navHide_tabL li').eq(0).addClass('active'); //下拉nav左
        } else if (i == 4) {
            // var navHide_tabLHtml = '';// 下拉nav左
            var navAll_sjyjr_lev2Html = '';
            var navAll_sjyjr_lev3Html = '';
            for (var j = 0; j < navLdata[i].children.children.length; j++) {
                // navHide_tabLHtml +=  '<li><a href="javascript:;"><i>'+navLdata[i].children.children[j].EngName+'</i><span>'+navLdata[i].children.children[j].name+'</span></a></li>';//下拉nav左
                var sjyjr_lev3DetailHtml = '';
                if (j == 0) {
                    navAll_sjyjr_lev2Html += '<dd class="lev02_next"><a class="lev_02Href" href="data_list.html">' + navLdata[i].children.children[j].name + '</a></dd>';

                    for (var k = 0; k < navLdata[i].children.children[j].data2.length; k++) {
                        var navHide_tabRHtml = '<dt><a href="data_list.html">' + navLdata[i].children.children[j].data2[k].name + '</a></dt>'; // 下拉nav右
                        sjyjr_lev3DetailHtml += '<dt><a href="data_list.html">' + navLdata[i].children.children[j].data2[k].name + '</a></dt>';
                        for (var m = 0; m < navLdata[i].children.children[j].data2[k].data3.length; m++) {
                            sjyjr_lev3DetailHtml += '<dd><a href="data_list.html?cm=' + navLdata[i].children.children[j].data2[k].data3[m] + '">' + navLdata[i].children.children[j].data2[k].data3[m] + '</a></dd>';
                            navHide_tabRHtml += '<dd><a href="data_list.html?cm=' + navLdata[i].children.children[j].data2[k].data3[m] + '">' + navLdata[i].children.children[j].data2[k].data3[m] + '</a></dd>' //下拉nav右
                        }
                        $('.navHide>div[data-item="数据源接入"] .navHide_tabR').append('<dl>' + navHide_tabRHtml + '</dl>');
                    }
                } else if (j == 1) {
                    navAll_sjyjr_lev2Html += '<dd class="lev02_next lev02_next_no"><a class="lev_02Href" href="scene.html">' + navLdata[i].children.children[j].name + '</a></dd>';
                    // sjyjr_lev3DetailHtml = '<dd><a href="help_center.html?"'+navLdata[i].children.children[j].data3+'>'+navLdata[i].children.children[j].data3+'----</a></dd>';
                } else if (j == 2) {
                    navAll_sjyjr_lev2Html += '<dd class="lev02_next lev02_next_no"><a class="lev_02Href" href="gatherer.html">' + navLdata[i].children.children[j].name + '</a></dd>';
                } else {
                    navAll_sjyjr_lev2Html += '<dd class="lev02_next"><a class="lev_02Href" href="alg_list.html?sj">' + navLdata[i].children.children[j].name + '</a></dd>';
                    var navHide_tabRHtml = ''; //下拉右
                    for (var k = 0; k < navLdata[i].children.children[j].data3.length; k++) {
                        sjyjr_lev3DetailHtml += '<dd><a href="alg_list.html?sj=' + k + '">' + navLdata[i].children.children[j].data3[k].name + '</a></dd>'
                        navHide_tabRHtml += '<dd><a href="alg_list.html?sj=' + k + '">' + navLdata[i].children.children[j].data3[k].name + '</a></dd>';
                    }
                    $('.navHide>div[data-item="数据源接入"] .navHide_tabR').append('<dl><dt><a href="alg_list.html?sj">' + navLdata[i].children.children[j].name + '</a></dt>' + navHide_tabRHtml + '</dl>');
                }
                navAll_sjyjr_lev3Html += '<dl class="lev_03TabCont">' + sjyjr_lev3DetailHtml + '</dl>';
            }
            var navAll_sjyjrAjax = '<div data-item="aa" class="lev_02Scroll" style="position: relative;">' +
                '<dl>' +
                // '<dt style="width: 200px;" class="lev02_next"><a href="javascript:;">'+navLdata[i].children.name+'</a></dt>'+
                navAll_sjyjr_lev2Html +
                '</dl>' +
                '<div class="lev_03 lev_03_min">' +
                navAll_sjyjr_lev3Html +
                '</div>' +
                '</div>'
                // $('.navHide>div[data-item="数据源接入"] .navHide_tabL').html(navHide_tabLHtml); //下拉nav左
                // $('.navHide>div[data-item="数据源接入"] .navHide_tabL li').eq(0).addClass('active'); //下拉nav左
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').html(navAll_sjyjrAjax);
        } else if (i == 5) {
            // var navHide_tabLHtml = '';// 下拉nav左
            var navAll_sfsj_lev2Html = '';
            var navAll_sfsj_lev3Html = '';
            for (var j = 0; j < navLdata[i].children.children.length; j++) {
                // navHide_tabLHtml +=  '<li><a href="javascript:;"><i>'+navLdata[i].children.children[j].EngName+'</i><span>'+navLdata[i].children.children[j].name+'</span></a></li>';//下拉nav左
                var navHide_tabRHtml = ''; // 下拉nav右
                var sfsj_lev3DetailHtml = '';
                if (j == 0) {
                    var navHide_tabRHtml = '<dt><a href="uploading_algo.new.html?cm=sf">' + navLdata[i].children.children[j].name + '</a></dt>'; // 下拉nav右
                    var href1 = '';
                    navAll_sfsj_lev2Html += '<dd class="lev02_next"><a class="lev_02Href" href="uploading_algo.new.html?cm=sf">' + navLdata[i].children.children[j].name + '</a></dd>';
                    for (var k = 0; k < navLdata[i].children.children[j].data3.length; k++) {
                        var navAll_sfsj3Href = '';
                        var hrefcm = '';
                        if (k == 0) {
                            navAll_sfsj3Href = 'uploading_algo.new.html?cm=upload_alg';
                            hrefcm = 'upload_alg';
                        } else if (k == 1) {
                            navAll_sfsj3Href = 'uploading_algo.new.html?cm=uplook_alg'
                            hrefcm = 'uplook_alg';
                        }
                        navHide_tabRHtml += '<dd><a href="uploading_algo.new.html?cm=' + hrefcm + '">' + navLdata[i].children.children[j].data3[k].name + '</a></dd>'
                        sfsj_lev3DetailHtml += '<dd><a href="' + navAll_sfsj3Href + '">' + navLdata[i].children.children[j].data3[k].name + '</a></dd>';
                    }
                } else if (j == 1) {
                    var navHide_tabRHtml = '<dt><a href="uploading_algo.new.html?cm=build_cj">' + navLdata[i].children.children[j].name + '</a></dt>'; // 下拉nav右
                    navAll_sfsj_lev2Html += '<dd class="lev02_next"><a class="lev_02Href" href="python3/python_online.html">' + navLdata[i].children.children[j].name + '</a></dd>';
                    for (var k = 0; k < navLdata[i].children.children[j].data3.length; k++) {
                        navHide_tabRHtml += '<dd><a href="python3/python_online.html">' + navLdata[i].children.children[j].data3[k].name + '</a></dd>'
                        sfsj_lev3DetailHtml += '<dd><a href="python3/python_online.html">' + navLdata[i].children.children[j].data3[k].name + '</a></dd>';
                    }
                } else if (j == 2 || j == 3) {
                    if (j == 2) {
                        var navHide_tabRHtml = '<dt><a href="alg_list.html?cj">' + navLdata[i].children.children[j].name + '</a></dt>'; // 下拉nav右
                        goHref = 'alg_list.html?cj';
                    } else {
                        goHref = 'javascript:;';
                        var navHide_tabRHtml = '<dt><a href="javascript:;">' + navLdata[i].children.children[j].name + '</a></dt>'; // 下拉nav右

                    }
                    navAll_sfsj_lev2Html += '<dd class="lev02_next lev02_next_no"><a class="lev_02Href" href="' + goHref + '">' + navLdata[i].children.children[j].name + '</a></dd>';
                    sfsj_lev3DetailHtml = '<dd><a href="help_center.html?"' + navLdata[i].children.children[j].data3 + '>' + navLdata[i].children.children[j].data3 + '----</a></dd>';
                }
                navAll_sfsj_lev3Html += '<dl class="lev_03TabCont">' + sfsj_lev3DetailHtml + '</dl>';
                $('.navHide>div[data-item="算法与设计"] .navHide_tabR').append('<dl>' + navHide_tabRHtml + '</dl>');
            }
            /* 公开算法S */
            var addi5Html = '<dt><a href="alg_list.html?sf">公开算法</a></dt>';
            for (var addi5 = 0; addi5 < navLdata[1].children.list.length; addi5++) {
                addi5Html += '<dd><a href="alg_list.html?sf=' + addi5 + '">' + navLdata[1].children.list[addi5].title + '</a></dd>'
            }
            $('.navHide>div[data-item="算法与设计"] .navHide_tabR').children('dl').eq(1).after('<dl>' + addi5Html + '</dl>');
            /* 公开算法N */
            var navAll_sfsjAjax = '<div data-item="aa" class="lev_02Scroll" style="position: relative;">' +
                '<dl>' +
                // '<dt style="width: 200px;" class="lev02_next"><a href="javascript:;">'+navLdata[i].children.name+'</a></dt>'+
                navAll_sfsj_lev2Html +
                '</dl>' +
                '<div class="lev_03 lev_03_min">' +
                navAll_sfsj_lev3Html +
                '</div>' +
                '</div>'
                // $('.navHide>div[data-item="算法与设计"] .navHide_tabL').html(navHide_tabLHtml); //下拉nav左
                // $('.navHide>div[data-item="算法与设计"] .navHide_tabL li').eq(0).addClass('active'); //下拉nav左
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').html(navAll_sfsjAjax);
        } else if (i == 6) {
            var navAll_xsxy_lev2Html = '';
            var navAll_xsxy_lev3Html = '';
            for (var j = 0; j < navLdata[i].children.length; j++) {
                navAll_xsxy_lev2Html += '<dd class="lev02_next"><a class="lev_02Href" href="xssy_index.html">' + navLdata[i].children[j].name + '</a></dd>';
                // var xsxy_lev3DetailHtml = '';
                if (j == 0) {
                    for (var k = 0; k < navLdata[i].children[j].children.length; k++) {
                        navAll_xsxy_lev3Html += '<dd style="width: 190px;float: left;"><a href="xssy_detail.html?' + navLdata[i].children[j].children[k].id + '">' + navLdata[i].children[j].children[k].name + '</a></dd>';
                    }
                }
            }
            var navAll_xsxyAjax = '<div data-item="aa" class="lev_02Scroll" style="position: relative;">' +
                '<dl>' +
                // '<dt style="width: 200px;" class="lev02_next"><a href="javascript:;">'+navLdata[i].children.name+'</a></dt>'+
                navAll_xsxy_lev2Html +
                '</dl>' +
                '<div class="lev_03 lev_03_max">' +
                '<dl class="lev_03TabCont">' + navAll_xsxy_lev3Html + '</dl>';
            '</div>' +
            '</div>'
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').html(navAll_xsxyAjax);
        } else if (i == 7) {
            var navAll_zxAjax2Detail = '';
            for (var j = 0; j < navLdata[i].children.length; j++) {
                navAll_zxAjax2Detail += '<dd class=""><a href="javascript:;">' + navLdata[i].children[j].name + '</a></dd>';
            }
            var navAll_zxAjax2 = '<div data-item="aa" class="lev_02Scroll" style="position: relative;">' +
                '<dl>' +
                navAll_zxAjax2Detail +
                '</dl>' +
                // 								'<div class="lev_03">'+
                // 									'<div class="lev_03TabCont">123456</div>'+
                // 									'<div class="lev_03TabCont">2546789</div>'
                // 								'</div>'+
                '</div>'

            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').addClass('lev_02_mid');
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').html(navAll_zxAjax2);
        } else if (i == 8) {
            var navAll_zxAjax2Detail = '';
            for (var j = 0; j < navLdata[i].children.data2.length; j++) {
                navAll_zxAjax2Detail += '<dd class=""><a href="information_center.html?' + navLdata[i].children.data2[j].name + '">' + navLdata[i].children.data2[j].name + '</a></dd>';
            }
            var navAll_zxAjax2 = '<div data-item="aa" class="lev_02Scroll" style="position: relative;">' +
                '<dl>' +
                navAll_zxAjax2Detail +
                // '<dt style="width: 200px;" class="lev02_next"><a href="javascript:;">'+navLdata[i].children.name+'</a></dt>'+
                '</dl>' +
                // 								'<div class="lev_03">'+
                // 									'<div class="lev_03TabCont">123456</div>'+
                // 									'<div class="lev_03TabCont">2546789</div>'
                // 								'</div>'+
                '</div>'
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').addClass('lev_02_mid');
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').html(navAll_zxAjax2);
        } else if (i == 9) {
            var navAll_bzzx_lev2Html = '';
            var navAll_bzzx_lev3Html = '';
            for (var j = 0; j < navLdata[i].children.children.length; j++) {
                navAll_bzzx_lev2Html += '<dd class="lev02_next"><a class="lev_02Href" href="help_center.html?' + navLdata[i].children.children[j].id + '">' + navLdata[i].children.children[j].question + '</a></dd>';
                var bzzx_lev3DetailHtml = '';
                for (var k = 0; k < navLdata[i].children.children[j].data3.length; k++) {
                    bzzx_lev3DetailHtml += '<dd><a href="help_center.html?' + navLdata[i].children.children[j].id + "&" + navLdata[i].children.children[j].data3[k].id + '">' + navLdata[i].children.children[j].data3[k].question + '</a></dd>';
                }
                navAll_bzzx_lev3Html += '<dl class="lev_03TabCont">' + bzzx_lev3DetailHtml + '</dl>';
            }
            navAll_bzzx_lev2Html += '<dd class="lev02_next lev02_next_no"><a class="lev_02Href" href="help_center.html?0">新手引导</a></dd><dd class="lev02_next lev02_next_no"><a class="lev_02Href" href="help_center.html?compare">版本对比</a></dd>';
            // navAll_bzzx_lev3Html += '<dl></dl><dl></dl>'
            var navAll_bzzxAjax = '<div data-item="aa" class="lev_02Scroll" style="position: relative;">' +
                '<dl>' +
                // '<dt style="width: 200px;" class="lev02_next"><a href="javascript:;">'+navLdata[i].children.name+'</a></dt>'+
                navAll_bzzx_lev2Html +
                '</dl>' +
                '<div class="lev_03 lev_03_min">' +
                navAll_bzzx_lev3Html +
                '</div>' +
                '</div>'
            $('.lev_01Ajax').children('li').eq(i).find('.lev_02').html(navAll_bzzxAjax);
        } else if (i == 10) {

        } else if (i == 11) {

        } else if (i == 12) {

        } else if (i == 13) {
            var navHide_tabRHtml = ''; // 下拉nav右

            for (var j = 0; j < navLdata[i].children.length; j++) {
                if (j == 0) {
                    for (var k = 0; k < navLdata[i].children[j].children.length; k++) {
                        navHide_tabRHtml += '<dd class="' + navLdata[i].children[j].children[k].label + '"><a href="xssy_detail.html?' + navLdata[i].children[j].children[k].id + '" class="' + navLdata[i].children[j].children[k].label + '">' + navLdata[i].children[j].children[k].name + '</a></dd>'; // 下拉nav右
                    }
                    $('.navHide>div[data-item="网课中心"] .navHide_tabR').html('<div class="" data-item=""><dl>' + navHide_tabRHtml + '</dl></div>');
                } else if (j == 1) {
                    navHide_tabRHtml = '<div class="zycd02">' + navLdata[i].children[j].name + '</div>';
                    $('.navHide>div[data-item="网课中心"] .navHide_tabR').append('<div class="hide" data-item="">' + navHide_tabRHtml + '</div>')
                }
            }
        }
    }
    $(".lev_01>ul").slimScroll({
        height: 467,
        borderRadius: "2px"
    });
    $(".lev_02Scroll").slimScroll({
        height: 467,
        borderRadius: "2px"
    });
    var p = "<p></p>";
    $(".alertMsg .msg-box").append(p);
    // 判断用户权限过期时间
    $.ajax({
        type: "GET",
        url: url_ip + "/vip/vipdemotion/",
        data: {},
        dataType: "json",
        async: false,
        headers: {
            'Authorization': token
        },
        success: function(res) {
            if (!res.status) {
                if(res.type === 1) {
                    var dialogHtml = `
                        <div class="expire">
                            <i class="expire-close">×</i>
                            <div class="expire-content">
                                <h3>您的会员服务即将到期</h3>
                                <p class="user">尊敬的用户，您的Datahoop账号${res.username}的<span>${res.name}<span></p>
                                <div class="time">还有<span>${res.day > 0 ? res.day+'天' : ''}${res.hour > 0 ? res.hour + '小时' : ''}${res.second > 0 ? res.second+'分钟' : ''}</span>到期~~</div>
                                <p class="tips">当前常用的数据和高级算法也将无法再继续使用。为了不影响你的正常使用，建议您尽快续费~</p>
                                <div class="btn">立即续费</div>
                            </div>
                        </div>
                    `
                }
                else {
                    var dialogHtml = `
                        <div class="expireTwo">
                            <i class="expire-close">×</i>
                            <div class="expireTwo-content">
                                <img src="./img/弹窗-提示.png">
                                <p class="change">会员等级变更提醒</p>
                                <p class="tips">尊敬的用户您好，你的${res.name}已到期，会员等级已降至${res.new_name}，如需恢复请前往会员中心进行升级</p>
                                <div class="btn">去升级</div>
                            </div>
                        </div>
                    `
                }
                $('body').append(dialogHtml)
                // $('.alertMsg').showMsg({
                //     isImg: 'isNo',
                //     h2txt: '',
                //     ptxt: res.msg
                // });
            }
        }
    });
    // 关闭弹窗按钮及跳转页面
    $('body').on('click', '.expire-close', function() {
        $('.expire').fadeOut()
        $('.expireTwo').fadeOut()
    })
    $('body').on('click', '.expire .btn,.expireTwo .btn', function() {
        $('.expire').fadeOut();
        $('.expireTwo').fadeOut();
        window.location.href = "perscen-vip.html";
    })
    $.ajax({
        type: "POST",
        url: url_ip + '/personal/vipdeadlinedate/',
        data: {},
        dataType: "json",
        async: false,
        headers: {
            'Authorization': token
        },
        success: function(res) {
            // console.log(res);
            if (res.status) {
                // 当前时间
                var timestamp = Date.parse(new Date());
                // 到期时间
                var timestamp2 = Number(get_unix_time(res.msg));
                if (timestamp > timestamp2) {
                    $(".nav_percen_xfl").html("当前会员等级已到期");
                } else {
                    var newDate = new Date(timestamp2);
                    var year = newDate.getFullYear();
                    var month = newDate.getMonth() + 1;
                    var date = newDate.getDate();
                    var time = year + "-" + month + "-" + date;
                    $(".nav_percen_xfl").html(time + "<b> 到期</b>");
                }
            }
        },
        error: function(err) {
            console.log(err)
        }
    });

    function get_unix_time(dateStr) {
        var newstr = dateStr.replace(/-/g, '/');
        var date = new Date(newstr);
        var time_str = date.getTime().toString();
        return time_str;
    }
    // 用户是否修改密码

    if(sessionStorage.getItem('locklogin') !== 'false') {
        $.ajax({
            url: url_ip + '/news/userhintpassword/',
            type: 'GET',
            datatype: 'json',
            data: {},
            headers: {
                'Authorization': token
            },
            success: function(res) {
                if(! res.status) {
                    sessionStorage.setItem('locklogin', false)
                    console.log(sessionStorage.getItem('locklogin'))
                    $('.alertMsg').showMsg({
                        isImg: 'isNo',
                        h2txt: res.msg+'</br>'+`<div class="modifierPassword"
                            style="display: block;
                                    width: 96px;
                                    height: 30px;
                                    background: #496FFF;
                                    color:#fff;
                                    font-size: 14px;
                                    margin: 20px auto 0;
                                    line-height: 30px;
                                    cursor: pointer;">去修改</div>`,
                    });
                }
            }
        })
    }
    $('body').on('click', '.modifierPassword', function() {
        window.location.href = 'perscen-sz.html#new';
        $(this).parent().parent().hide();
    })
}

function msgIsTrue() {
    $.ajax({
        type: "GET",
        url: url_ip + '/push/displaymsg/',
        data: {},
        dataType: "json",
        async: false,
        headers: {
            'Authorization': token
        },
        success: function (res) {
            if (res.status) {
                $(".isDisplayMsgRed").css('display','block');
            }
        }

    })
}

/*收纳盒子*/
function lkwstoragePage() {
    var storageHtml = '<i class="fixed_btn_sn hide">0</i>' +
        '<ul class="fixed_btn_ul">' +
        '<li data-item="xx">' +
        '<div>' +
        '<i><img src="img/icon/fixed_btn02.png" width="100%" height="100%" alt=""></i>' +
        '<p>客<br />服</p>' +
        '</div>' +
        '<em></em>' +
        '</li>' +
        '<li data-item="zx">' +
        '<div>' +
        '<i><img src="img/icon/fixed_btn04.png" width="100%" height="100%" alt=""></i>' +
        '<p>咨<br />询</p>' +
        '</div>' +
        '<em></em>' +
        '</li>' +
        '<li data-item="sn">' +
        '<div>' +
        '<i><img src="img/icon/fixed_btn01.png" width="100%" height="100%" alt=""></i>' +
        '<p>收<br />纳</p>' +
        '</div>' +
        '<em></em>' +
        '</li>' +
        '</ul>' +
        '<div class="fixed_btn_alert fixed_btn_alert_sn hide" data-item="sn">' +
        '<div>' +
        '<dl data-item="微课">' +
        '<dt><span>我的微课</span><i>0</i></dt>' +
        '<div class="sn_nologin"><img src="img/icon/xn.png" width="35" height="35" /><p>您还未选择微课</p></div>' +
        '</dl>' +
        '<dl data-item="算法">' +
        '<dt><span>我的算法</span><i>0</i></dt>' +
        '<div class="sn_nologin"><img src="img/icon/xn.png" width="35" height="35" /><p>您还未选择算法</p></div>' +
        '</dl>' +
        '<dl data-item="数据">' +
        '<dt><span>我的数据</span><i>0</i></dt>' +
        '<div class="sn_nologin"><img src="img/icon/xn.png" width="35" height="35" /><p>您还未选择数据</p></div>' +
        '</dl>' +
        '</div>' +
        '<h3>' +
        '<span>已收纳: &nbsp; <b>0</b>个</span>' +
        '<i>GET</i>' +
        '</h3>' +
        '</div>' +
        '<div class="fixed_btn_alert fixed_btn_alert_xx hide" data-item="xx">' +
        // '<i class="close_i"></i>'+
        '<div class="xiaoxi_info">' +
        '您好！有什么可以帮到您?' +
        // 				'<h3><i></i>有什么可以帮到您? 您可以有一下操作: </h3>'+
        // 				'<p><span>1、您可以点击下方选择适合您的问题; </span><span>2、可以点击<a href="help_center.html?0" style="color: #fff;">【帮助中心】</a>来解决您的疑问;</span></p>'+
        // 				'<p><span>3、在下方提交问题或对平台的建议/意见, 我们会尽快处理改进，感谢您的配合~</span></p>'+
        '</div>' +
        '<dl class="xiaoxi_content">' +
        '<dt class="first">' +
        '<img src="img/icon/kefu.png">' +
        '<div class="default_txt">' +
        '<i class="triangleL"></i>' +
        '<h4>为您筛选出以下几个常见问题：</h4>' +
        '<p class="question" id="2"><span>1、算法的一般运行流程</span></p><p class="question" id="3"><span>2、如何上传算法</span></p><p class="question" id="4"><span>3、上传文件后出现乱码的问题</span></p><p class="question" id="5"><span>4、如何和我们联系</span></p><p class="question" id="6"><span>5、遇到Bug怎么办</span></p>' +
        '<h5>您还可以点击【<a href="help_center.html">帮助中心</a>】来解决您的疑问, 或提交对平台的建议/意见。</h5>' +
        '</div>' +
        '</dt>' +
        '</dl>' +
        '<div class="xiaoxi_input">' +
        // '<input type="text" placeholder="没有解决您的问题？请在此提交问题或对平台的建议/意见 。">'+
        '<div class="xiaoxi_input_titl">' +
        '<p class="xiaoxi_input_titl1">没有解决您的问题？</p>' +
        '<p class="xiaoxi_input_titl2">您还可以点击帮助中心来解决您的疑问，或提交对平台的建议/意见 。</p>' +
        '</div>' +
        '<div class="xiaoxi_btn"><a href="help_center.html" target="blank">帮助中心</a><a href="feedback.html" target="blank">问题反馈</a></div>' +
        // '<p class="xiaoxi_btn">提交</p>'+
        '</div>' +
        '</div>' +
        // '<div class="fixed_btn_alert fixed_btn_alert_zq hide" data-item="zq">'+
        // 	'<p><a href="">立即参与悬赏</a></p>'+
        // 	'<p><a href="">我要发布需求</a></p>'+
        // '</div>'
        '<div class="fixed_btn_alert fixed_btn_alert_zx hide" data-item="zx">' +
        '<h3><a href="javascript:;">咨询电话</a></p>' +
        '<h4><i></i><a href="javascript:;">400-050-6600</a></h4>' +
        '<p>工作日 8:30-17:30</p>' +
        '</div>'
    $('.fixed_btn').html(storageHtml);
}
/*收纳封装*/
function lkwStorage() {
    $.ajax({
        type: 'GET',
        url: url_ip + '/pay/mycart/',
        data: {},
        dataType: 'json',
        headers: { 'Authorization': token },
        success: function(res) {
            $('.fixed_btn_alert_sn dl dd').remove();
            var ohtml = '';
            var wknum = sfnum = sjnum = 0;
            for (var i = 0; i < res.cart.length; i++) {
                if (res.cart[i].category == '微课') {
                    wknum++;
                    ohtml = '<dd data-name="wecourse"><span>' + res.cart[i].name + '</span><i data-id="' + res.cart[i].id + '">移除</i><em style="margin-right: 14px;">' + res.cart[i].selected + '节</em></dd>';
                } else if (res.cart[i].category == '算法') {
                    sfnum++;
                    ohtml = '<dd data-name="algorithm"><em style="display: none !important;">' + res.cart[i].num + '</em><span>' + res.cart[i].name + '</span><i data-id="' + res.cart[i].id + '">移除</i></dd>';
                } else if (res.cart[i].category == '数据') {
                    sjnum++;
                    ohtml = '<dd data-name="data"><em style="display: none !important;">' + sjnum + '.</em><span>' + res.cart[i].name + '</span><i data-id="' + res.cart[i].id + '">移除</i></dd>';
                }
                $('.fixed_btn_alert_sn dl[data-item="' + res.cart[i].category + '"]').append(ohtml);
            }
            //
            $('.fixed_btn_alert_sn dl[data-item="微课"] .sn_nologin p').html('您还未选择微课 <a href="https://ai.datahoop.cn/xssy_index.html"><span style="color: #3168fa">去看看</span></a>');
            $('.fixed_btn_alert_sn dl[data-item="算法"] .sn_nologin p').html('您还未选择算法 <a href="https://ai.datahoop.cn/alg_list.html?sf"><span style="color: #3168fa">去看看</span></a>');
            $('.fixed_btn_alert_sn dl[data-item="数据"] .sn_nologin p').html('您还未选择数据 <a href="https://ai.datahoop.cn/alg_list.html?sj"><span style="color: #3168fa">去看看</span></a>');
            wknum == 0 ? ($('.fixed_btn_alert_sn dl[data-item="微课"] .sn_nologin').show()) : ($('.fixed_btn_alert_sn dl[data-item="微课"] .sn_nologin').hide())
            sfnum == 0 ? ($('.fixed_btn_alert_sn dl[data-item="算法"] .sn_nologin').show()) : ($('.fixed_btn_alert_sn dl[data-item="算法"] .sn_nologin').hide()),
                sjnum == 0 ? ($('.fixed_btn_alert_sn dl[data-item="数据"] .sn_nologin').show()) : ($('.fixed_btn_alert_sn dl[data-item="数据"] .sn_nologin').hide())


            if (wknum == 0) {
                $('.fixed_btn_alert_sn dl[data-item="微课"] .sn_nologin').show();
            } else {
                $('.fixed_btn_alert_sn dl[data-item="微课"] .sn_nologin').hide();
            }
            $('.fixed_btn_alert_sn dl').eq(0).find('dt i').text(wknum);
            $('.fixed_btn_alert_sn dl').eq(1).find('dt i').text(sfnum);
            $('.fixed_btn_alert_sn dl').eq(2).find('dt i').text(sjnum);
            var allNum = wknum + sfnum + sjnum;
            $('.fixed_btn_alert_sn h3 b,.fixed_btn .fixed_btn_sn').text(allNum);
            if (allNum == 0) {
                $('.fixed_btn_sn').hide();
            } else {
                $('.fixed_btn_sn').show()
            }
            $(".fixed_btn_alert_sn>div").slimScroll({
                height: 480,
                borderRadius: "2px"
            });
        },
        error: function(err) {
            if (err.status == 401) {
                $('.fixed_btn_alert_sn .sn_nologin p').html('<a href="https://ai.datahoop.cn/login.html"><span style="color: #3168fa">登陆</span></a>后查看');
            }
        }
    })
}
/*footer*/
function lkwfootPage() {
    var footHtml = '<h2>' +
        '<a href="about_us.html">关于我们</a>' +
        '<a href="contact_us.html">联系我们</a>' +
        '<a href="feedback.html">建议反馈</a>' +
        '<a href="help_center.html?0">帮助中心</a>' +
        '</h2>' +
        '<p><span>Copyright © </span>2019 北京犀数科技有限公司 All Rights Reserved.</p>' +
        '<p>京ICP备15042197号</p>';
    $('footer').html(footHtml)
}
/*登录验证盒子*/
function lkwIsLoginPage() {
    var oDizhi = $('.shade').attr('data-dizhi') || '';
    if (oDizhi) {
        var toLogin = '../login.html?'
        var toregist = '../register.html'
    } else {
        var toLogin = 'login.html?'
        var toregist = 'register.html'
    }
    // var loginHtml = '<div class="lkw-msg-box">'+
    // 			'<h2>'+
    // 				'<span>提示信息</span>'+
    // 				'<i class="lkw-msg-box-close"></i>'+
    // 			'</h2>'+
    // 			'<div class="lkw-msg-box-cont">'+
    // 				// '<div class="lkw-msg-box-msg hide"><p>检测到未保存的内容，是否在离开页面前保存修改？</p></div>'+
    // 				'<div class="lkw-msg-box-msg"><i class="lkw-msg-icon lkw-icon-warning" style="margin-top: 1.5px"></i><span>您目前还没有注册或登录~</span></div>'+
    // 				'<div class="lkw-msg-box-input hide">'+
    // 					'<div class="lkw-input">'+
    // 						'<input type="text" autocomplete="off" placeholder="" class="lkw-input-inner">'+
    // 					'</div>'+
    // 				'</div>'+
    // 			'</div>'+
    // 			'<div class="lkw-msg-box-btn">'+
    // 				'<span class="ok"><a href="'+toLogin+oWhere+'" style="color: #666">登录</a></span>'+
    // 				'<span class="no"><a href="'+toregist+'" style="color: #666">注册</span>'+
    // 			'</div>'+
    // 		'</div>'
    var loginHtml = '<div class="msg-box">' +
        '<i class="msg-close">×</i>' +
        // '<h6 class="msg-img"></h6>'+
        '<h2><span>提示信息</span></h2>' +
        '<div>' +
        // '<div class="lkw-msg-box-msg hide"><p>检测到未保存的内容，是否在离开页面前保存修改？</p></div>'+
        '<p>您目前还没有注册或登录~</p>' +
        // '<div class="lkw-msg-box-input">'+
        // 	'<div class="lkw-input">'+
        // 		'<input type="text" autocomplete="off" placeholder="" class="lkw-input-inner">'+
        // 	'</div>'+
        // '</div>'+
        '</div>' +
        '<div class="msg-box-btn">' +
        '<span class="ok"><a href="' + toLogin + '">登 录</a></span>' +
        // '<span class="no"><a href="'+toregist+'">注 册</span>'+
        '<span class="no"><a href="javascript:;" class="goRegister_">注 册</span>' +
        '</div>' +
        '</div>'
    $('.shade').html(loginHtml);
}
/* 发送消息-掉接口 */
function fixedSendFn() {
    var cont = $('.xiaoxi_input input').val();
    $('.xiaoxi_input input').val('')
    $('.xiaoxi_btn').removeClass('active')
    var ohtml = '<dd>' +
        '<img src="' + user_img + '">' +
        '<div><i class="triangleR"></i>' + cont + '</div>' +
        '</dd>'
    $('.xiaoxi_content').append(ohtml);
    $('.xiaoxi_content').scrollTop($('.xiaoxi_content')[0].scrollHeight - $('.xiaoxi_content')[0].offsetHeight);
    $.ajax({
        url: url_ip + '/push/Robot/',
        type: 'POST',
        data: { content: cont },
        datatype: 'json',
        headers: { 'Authorization': token1 },
        success: function(res) {
            if (res.status) {
                for (var i = 0; i < res.data.length; i++) {
                    var ohtml2 = '<dt class="">' +
                        '<img src="img/icon/kefu.png">' +
                        '<div>' +
                        '<i class="triangleL"></i>' +
                        '<p style="height: 14px;line-height: 14px;margin-bottom: 10px">' + res.data[i].problem + '?</p>' +
                        '<p style="line-height: 18px;">' + res.data[i].answer + '</p>' +
                        '</div>' +
                        '</dt>'
                    $('.xiaoxi_content').append(ohtml2)
                }
                $('.xiaoxi_content').scrollTop($('.xiaoxi_content')[0].scrollHeight - $('.xiaoxi_content')[0].offsetHeight)
                $(".xiaoxi_content").slimScroll({
                    height: 359,
                    borderRadius: "2px"
                });
            }
        },
        error: function(err) {
            console.log(err)
        }
    })
}
/* lkw2018-10-30N */

$(function() {
    // 轮询验证用户是否有效, 防止多开
    // if (token != 'JWT undefined' && token != 'JWT null') {
    //     clearInterval(lunxunLogg);
    //     var lunxunLogg = setInterval(function() {
    //         $.ajax({
    //             url: url_ip + '/push/unique_user/',
    //             type: 'GET',
    //             data: {},
    //             dataType: 'json',
    //             headers: { 'Authorization': token },
    //             success: function(res) {
    //                 if (!res.status) {
    //                     sessionStorage.removeItem('token');
    //                     $('.alertMsg').showMsg({
    //                         isImg: 'isNo',
    //                         h2txt: res.msg,
    //                         setTime: 3000,
    //                         cllbackFn: function() {
    //                             setTimeout(function() {
    //                                 window.location.href = 'login.html';
    //                             }, 3000)
    //                         }
    //                     });
    //
    //                 }
    //             },
    //             error: function(err) {
    //                 console.log(err)
    //             }
    //         })
    //     }, 5000)
    // }
    //判断进来是否ie asdfgh
    isIeFn();
    //获取导航信息
    // $.ajax({
    // 	url:url_ip + '/labels/menus/',
    // 	type:'GET',
    // 	cache:false,
    // 	async:false,
    // 	data:{},
    // 	dataType:'json',
    // 	headers:{'Authorization':token},
    // 	success: function (res) {
    // 		navLdata = res.data;
    // 	},
    // 	error: function (err) {
    // 		console.log(err)
    // 	}
    // })
    /* lkw-2018-10-30S */
    lkwNavPage();
    datarl();
    lkwstoragePage();
    msgIsTrue();
    lkwStorage();
    lkwIsLoginPage();
    lkwfootPage();
    $(function() {
        $.ajax({ 
            type: 'POST',  
            url: url_ip + '/push/messages/', 
            data: {
               
            },
            dataType: 'json',
            contentType : "application/x-www-form-urlencoded; charset=UTF-8", 
            headers: {
                'Authorization': token
            }, 
            //data : JSON.stringify(list),
             success: function (res) { 
                var ul = $("<ul></ul>");
                $(".nav_news_bbc").before(ul);
                for (var i = 0; i < 3; i++) {
                    // var li = '<li><p class="nav_news_bp"></p><span class="nav_news_bs">2018-12-25<span><a href="" class="nav_news_ba">查看</a></li>';
                    var li = `<li><p class="nav_news_bp">${res.data[i].title}</p><span class="nav_news_bs">${res.data[i].times}<span><a href="https://ai.datahoop.cn/perscen-tz.html" class="nav_news_ba">查看</a></li>`;
                    $(ul).append(li);
                  
                }
         
            },error:function (e) {
                //失败方法，错误信息用e接收
                var div = '<div class="nav_news_bi"><img src="img/empty_msg.png"><span>没有新消息</span></div>';
                $(".nav_news_bbc").before(div);
            }
        });  
        // 请求
        // var data = [];
        // if (data.length <= 0) {
        //     var div = '<div class="nav_news_bi"><img src="img/empty_msg.png"><span>没有新消息</span></div>';
        //     $(".nav_news_bbc").before(div);
        // } else {
        //     var ul = $("<ul></ul>");
        //     $(".nav_news_bbc").before(ul);
        //     for (var i = 0; i < 3; i++) {
        //         var li = '<li><p class="nav_news_bp">公告-算法工作台使用须知和使用</p><span class="nav_news_bs">2018-12-25<span><a href="" class="nav_news_ba">查看</a></li>';
        //         $(ul).append(li);
        //     }
        // }
    });
    // 修改nav登录状态&存token
    if (token != 'JWT undefined' && token != 'JWT null') {
        $('.navLogin p').show(); //退出登录显示
        $.ajax({
            url: url_ip + '/userinfo/',
            type: 'GET',
            cache: false,
            async: false,
            data: {},
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function(res) {
                // console.log(res);
                user_img = url_ip + res.header;
                token_id = res.user_id;
                user_name_ = res.name;
                var backgroundImg = url_ip + res.header;
                $('.navTop .navLogin i').css({ backgroundImage: 'url(' + user_img + ')', width: '20px', height: '20px' }).attr('data-img', user_img);
                $('.navTop .navLogin a').text(res.name).attr('href', 'perscen-zh.html')
                $(".nav_percen .nav_percen_tl p:eq(0)").text(res.name)
                $(".nav_percen .nav_percen_tr img").attr("src", user_img);
                $('.navLogin').attr('data-login', 1);
                $('.navPers').show();
                $('.navBot ul li.zc').hide(); //注册按钮
                // 更新登录提示请求
                $.ajax({
                    type: "GET",
                    url: url_ip + "/news/banben/",
                    cache: false,
                    data: {},
                    dataType: "json",
                    headers: {
                        'Authorization': token
                    },
                    success: function(data) {
                        // console.log(data);
                        if (data.status) {
                            $(".cpda_content").append(data.data);
                            for (var i = 0; i < $(".cpda_content>p img").length; i++) {
                                var img_path = $(".cpda_content>p img").eq(i).attr("src");
                                $(".cpda_content>p img").eq(i).attr("src", url_ip + img_path);
                                $(".cpda_updata").show();
                            }
                        } else {
                            $(".cpda_updata").hide();
                        }
                    }
                });
            },
            error: function(err) {
                console.log(err)
            }
        })
    } else {
        $('.navTop .navLogin a').text('登录').attr('href', 'login.html?back');
        $('.navLogin').attr('data-login', 0);
        $('.navPers').hide();
        $('.navLogin p').hide(); //退出登录隐藏
        $('.navBot ul li.zc').show(); //注册按钮
    }
    // 跳转个人中心
    $('.navLogin').on('click', '.nav_percen ul li:eq(0)', function() {
        window.location.href = 'perscen-zh.html';
    });
    // 跳转我的订单
    $('.navLogin').on('click', '.nav_percen ul li:eq(1)', function() {
        window.location.href = 'perscen-dd.html';
    });
    // 跳转帮助中心
    $('.navLogin').on('click', '.nav_percen ul li:eq(2)', function() {
        window.location.href = 'help_center.html?0';
    });
    // 退出登录
    $('.navLogin').on('click', '.nav_percen_bdc', function() {
        $('.body_mask').show()
        $('body .is_quit').show()
    })
        /*跳转个人主页*/
    $('.navLogin').on('click', '.toI', function() {
            if (token_id) {
                window.location.href = 'perscen-zh.html';
            } else {
                window.location.href = 'login.html';
            }
        })
        // 登录状态显示信息
    $(".navLogin").on("mouseenter", function() {
        if ($(".navLogin span>a").text() != "登录") {
            $(".nav_percen").show();
        }
    })
    $(".navLogin").on("mouseleave", function() {
            $(".nav_percen").hide();
        })
        // 点击消息进入系统通知
    $(".navHelp_news").on("click", function() {
        if ($(".navLogin span>a").text() != "登录") {
            window.location.href = 'perscen-tz.html';
        } else {
            $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '请先进行登录！', setTime: 1500 });
        }
    })
    $(".nav_news_bbc").on("click", function() {
            $(".navHelp_news").click();
        })
        // 登录状态显示消息
    $(".navHelp").on("mouseenter", function() {
        if ($(".navLogin span>a").text() != "登录") {
            $(".nav_news").show();
        }
    })
    $(".navHelp").on("mouseleave", function() {
        $(".nav_news").hide();
    });
    $('.navBot li').hover(function() {
        //     $('.navHide').show();
        //     var nowTxt = $(this).children('a').text();
        //     $('.navHide>div[data-item="' + nowTxt + '"]').show();
        $(this).children('.navSlide').stop().slideDown(150);
    }, function() {
        //     $('.navHide').hide();
        //     var nowTxt = $(this).children('a').text();
        //     $('.navHide>div[data-item="' + nowTxt + '"]').hide();
        $(this).children('.navSlide').stop().slideUp(150);
    });
    $('.navHide>div').hover(function() {
        $('.navHide').show();
        $(this).show();
        // $(this).children('.navSlide').stop().slideDown(150);
    }, function() {
        $('.navHide').hide();
        $(this).hide();
        // $(this).children('.navSlide').stop().slideUp(150);
    })
    $('.navHide_tabL').on('mouseenter', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active');
        var nowIndex = $(this).index();
        var showNext = $(this).closest('.navHide_tabL').next('.navHide_tabR').children('div').eq(nowIndex);
        if (showNext) {
            showNext.show().siblings().hide();
        }
    })

    // navAll 一级二级切换
    $('.navAll').hover(function() {
        $('.navHideL').show();
    }, function() {
        $('.navHideL').hide();
    })
    $('.navHideL .lev_01').hover(function() {
        $('.navHideL').show();
        $('.navAll').addClass('active');
    }, function() {
        $('.navHideL').hide();
        $('.navAll').removeClass('active');
    });
    $('.lev_01').on('mouseenter', 'li', function() {
        $('.lev_02').hide();
        $(this).children('.lev_02').show();
        // $('.lev_02').stop().css({width: 'auto'},50);
    })
    $('.lev_01').on('mouseleave', function() {
        $('.lev_02').hide();
        // $('.lev_02').stop().css({width: 0},50);
    })

    // 	$('.lev_02').on('mouseenter', '.lev_02Hide', function () {
    // 		$(this).show();
    // 		$(this).closest('.lev_02').css({width: 'auto'});
    // 	})
    // 	$('.lev_02').on('mouseleave', '.lev_02Hide', function () {
    // 		$(this).hide();
    // 		$(this).closest('.lev_02').css({width: 0});
    // 	})

    // navAll 算法集群点击进入详情页
    $('.navAll_sfjq').on('click', 'dd', function() {
            var algo_id = $(this).attr('data-id');
            sessionStorage.setItem("data_algo", 'algo');
            sessionStorage.setItem("form", 'index');
            window.location.href = 'details.html?' + algo_id;
        })
        // navAll二级三级联动
    $('.lev_02Scroll').on('mouseenter', '.lev02_next', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('.lev_03').hide();
        var nowIndex = $(this).index();
        if ($(this).hasClass('lev02_next_no')) {

        } else {
            $(this).closest('.lev_02Scroll').find('.lev_03').show();
            $(this).closest('.lev_02Scroll').find('.lev_03').children().eq(nowIndex).show().siblings().hide();
        }
        // $('.lev_02').stop().css({width: 'auto'},50);
    })
    $('.lev_02').on('mouseleave', function() {
        $('.lev02_next.active').removeClass('active');
        $('.lev_03').hide();
        // $('.lev_02').stop().css({width: 0},50);
    })



    // nav跳转
    $('nav').on('click', '.navGo', function() {
            var goHref = $(this).attr('data-href');
            var isVerify = $(this).attr('data-verify');
            var goWhere = $(this).attr('data-go');
            if (isVerify == '1') {
                if (token == 'JWT undefined' || token == 'JWT null') {
                    $('.msg-box-wraper.login-alert').fadeIn();
                    document.body.style.overflow = 'hidden';
                    return;
                }
            }
            if (goWhere == 'details') {
                sessionStorage.setItem("data_algo", 'algo');
                sessionStorage.setItem("form", 'index');
            } else if (goWhere == '数据加工') {
                goHref = 'ycl.html';
            } else if (goWhere == '数据展示') {
                goHref = 'ksh.html';
            }
            window.location.href = goHref;
        })
        //注册提示
    $('nav .navBot').on('click', 'li.zc', function() {
        $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '平台目前仅供CPDA学员使用,不对外开放!', setTime: 3000 });
    })
    $('.shade ').on('click', '.goRegister_', function() {
            $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: '平台目前仅供CPDA学员使用,不对外开放!', setTime: 3000 });
        })
        //cpda登录跳转
    $('nav').on('click', '.nav_cpdaGo', function() { //123456
        if (token != 'JWT undefined' && token != 'JWT null') {
            window.location.href = "xssy_index.html?com=cpdanet";
        } else {
            window.location.href = "login.html?cpdanet";
        }
    })
    var fixed_btnShowSettimeout = '';
    /*消息*/
    $('.fixed_btn_ul').on('mouseenter', 'li', function() {
        clearTimeout(fixed_btnShowSettimeout);
        var nowItem = $(this).attr('data-item');
        if ($('.fixed_btn_alert:visible').attr('data-item') != nowItem) {
            $('.fixed_btn_alert').stop().fadeOut();
            $('.fixed_btn_alert[data-item="' + nowItem + '"]').stop().fadeIn();
        }
    })
    $('.fixed_btn_ul').on('mouseleave', 'li', function() {
        clearTimeout(fixed_btnShowSettimeout);
        fixed_btnShowSettimeout = setTimeout(function() {
            $('.fixed_btn_alert:visible').stop().fadeOut();
        }, 500)
    })
    // 点击收纳跳转个人中心收纳页面
    $('.fixed_btn_ul').on('click', 'li', function() {
        if($(this).attr('data-item') === 'sn') {
            window.location.href = "perscen-sn.html";
        }
    })
    $('.fixed_btn').on('mouseenter', '.fixed_btn_alert', function() {
        clearTimeout(fixed_btnShowSettimeout);
    })
    $('.fixed_btn').on('mouseleave', '.fixed_btn_alert', function() {
            clearTimeout(fixed_btnShowSettimeout);
            fixed_btnShowSettimeout = setTimeout(function() {
                $('.fixed_btn_alert:visible').stop().fadeOut();
            }, 500)
        })
        //发送消息
    $('.xiaoxi_input input').on('input propertychange change', function() {
            if ($(this).val() == '' || $.trim($(this).val()).length == 0) {
                $(this).next().removeClass('active');
            } else {
                $(this).next().addClass('active');
            }
        })
        // 发送消息-点击选项
    $('.xiaoxi_content .first').on('click', 'p.question', function() {
            var cont = $(this).children().text();
            var ohtml = '<dd>' +
                '<img src="' + user_img + '">' +
                '<div><i class="triangleR"></i>' + cont + '</div>' +
                '</dd>'
            $('.xiaoxi_content').append(ohtml);
            $('.xiaoxi_content').scrollTop($('.xiaoxi_content')[0].scrollHeight - $('.xiaoxi_content')[0].offsetHeight);
            $.ajax({
                url: url_ip + '/push/Robot/',
                type: 'POST',
                data: { content: cont },
                datatype: 'json',
                headers: { 'Authorization': token1 },
                success: function(res) {
                    if (res.status) {
                        for (var i = 0; i < res.data.length; i++) {
                            var ohtml2 = '<dt class="">' +
                                '<img src="img/icon/kefu.png">' +
                                '<div>' +
                                '<i class="triangleL"></i>' +
                                '<p style="height: 14px;line-height: 14px;margin-bottom: 10px">' + res.data[i].problem + '?</p>' +
                                '<p style="line-height: 18px;">' + res.data[i].answer + '</p>' +
                                '</div>' +
                                '</dt>'
                            $('.xiaoxi_content').append(ohtml2)
                        }
                        $('.xiaoxi_content').scrollTop($('.xiaoxi_content')[0].scrollHeight - $('.xiaoxi_content')[0].offsetHeight)
                            // setTimeout(function () {
                            // 	$('.xiaoxi_content').scrollTop($('.xiaoxi_content')[0].scrollHeight - $('.xiaoxi_content')[0].offsetHeight)
                            // 	$(".xiaoxi_content").slimScroll({
                            // 		height: 359,
                            // 		borderRadius: "2px"
                            // 	});
                            // })

                    }
                },
                error: function(err) {
                    console.log(err)
                }
            })
        })
        // 发送消息-回车
        //搜索跳转-回车
    $('.xiaoxi_input input').on('keyup', function(e) {
        if ($('.xiaoxi_btn').hasClass('active')) {
            var nowEvent = e || window.event;
            if (e.keyCode == "13") {
                fixedSendFn();
            }
        }
    })
    $('.fixed_btn').on('click', '.xiaoxi_btn.active', function() {
            fixedSendFn();
        })
        // 返回顶部
    $('.backtop').on('click', function() {
            // $(document).scrollTop(0);
            $('body,html').animate({ scrollTop: 0 }, 500);
        })
        // 关闭loginTip弹窗
        // 	$('.lkw-msg-box-close').on('click', function() {
        // 		$('.msg-box-wraper').fadeOut();
        // 		document.body.style.overflow = 'auto';
        // 		/* 如需关闭以后执行私有js, 请粘贴下面注释代码到私有js文件*/
        // // 		$('.lkw-msg-box-close').on('click', function() {
        // // 			window.history.go(-1);
        // // 		})
        // 	})
        // 关闭loginTip弹窗-20190103
        // 默认关闭, 登录弹窗加'data-to', 返回上一页
    $('.msg-box-wraper').on('click', '.msg-close', function() {
            var nowGo = $(this).closest('.shade');
            if (nowGo && nowGo.attr('data-to')) {
                window.history.go(-1);
            } else {
                $(this).closest('.msg-box-wraper').fadeOut();
            }
        })
        //收纳跳转
    $('.fixed_btn_alert_sn h3 i').on('click', function() {
            if (token != 'JWT undefined' && token != 'JWT null') {
                window.location.href = "perscen-sn.html";
            } else {
                $('.shade').showMsg({ ptxt: '您目前还没有注册或登录~ ' });
                // $('.msg-box-wraper.login-alert').fadeIn();
                // document.body.style.overflow = 'hidden';
            }
        })
        //高校咨询跳转
    $('.fixed_btn_alert_zx').on('click', function() {
            window.location.href = 'university.html';
        })
        //收纳移除
        // 	$('.fixed_btn_alert_sn').on('mouseenter', 'dd', function () {
        // 		$(this).children('i').text('移除');
        // 	})
        // 	$('.fixed_btn_alert_sn').on('mouseleave', 'dd', function () {
        // 		$(this).children('i').text('--');
        // 	})
    $('.fixed_btn_alert_sn').on('click', 'dd i', function() {
        var goods = $(this).parent('dd').attr('data-name');
        var goods_id = $(this).attr('data-id');
        $.ajax({
            type: 'POST',
            url: url_ip + '/pay/delmycart/',
            data: { goods: goods, goods_id: goods_id },
            dataType: 'json',
            headers: { 'Authorization': token },
            success: function(res) {
                if (res.status) {
                    $('.alertMsg').showMsg({ isImg: 'isOk', h2txt: res.msg, setTime: 3000 });
                    lkwStorage();
                } else {
                    $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: res.msg, setTime: 3000 });
                }
            },
            error: function(err) {
                console.log(err)
            }
        })
    });
    // 关闭资讯
    $('.fixed_btn_alert').on('click', '.close_i', function() {
            $(this).closest('.fixed_btn_alert').fadeOut();
        })
        /* lkw-2018-10-30N */


    function url(url) {
        if (JQ) {
            return url
        } else {
            return '../' + url
        }
    }
    // 上传算法
    $('.nav_hide.four input').click(function() {
            window.location.href = 'scene.html'
        })
        // 消息提示msgbox
    function alertmsg(msg, tag, num) {
        $('.mu').show();
        $('.msgbox img').removeClass('on')
        if (num == 1) {
            $('.success').addClass('on')
            $('.msgbox span').css('color', '#06415E')
        } else {
            $('.fail').addClass('on')
            $('.msgbox span').css('color', '#DC1010')
        }
        $('.msgbox span').html(msg);
        $('.msgbox').fadeIn();
        var timeout
        clearTimeout(timeout)
        timeout = setTimeout(function() {
            $('.msgbox').fadeOut();
            $('.mu').hide();
        }, 2000)
    }
    //专业版
    $('.zyb').on('click', function() {
            $.ajax({
                url: urlip + '/model/xianzhi/',
                type: 'POST',
                data: {},
                dataType: 'json',
                headers: { 'Authorization': token },
                success: function(res) {
                    if (res.status) {
                        window.location.href = 'hmodel2.html'
                    } else {
                        $('.alertMsg').showMsg({ isImg: 'isNo', h2txt: res.msg, setTime: 3000 });
                    }
                },
                error: function(err) {
                    if (err.status == 401) {
                        if (token == 'JWT undefined' || token == 'JWT null') {
                            $('.shade').showMsg({ ptxt: '您目前还没有注册或登录~ ' });
                        } else {
                            $('.shade').showMsg({ ptxt: '系统检测,您的账号存在风险异常,请重新登录。' });
                        }
                    } else {
                        $('.alertMsg').showMsg({
                            ptxt: '连接超时, 请重试',
                            isImg: 'isNo'
                        });
                    }
                }
            })
        })
        //赠送CB提示弹窗
    $('.giveCB_MyGoldMu .xs_bi_').text(xs_bi_);
    $.ajax({
        url: urlip + '/give/',
        type: 'get',
        data: { id: token_id },
        headers: { 'Authorization': token },
        success: function(res) {
            if (res.status) {
                $('.giveCb_MyGold_giveCBnum').text(res.data.coin);
                $('.giveCB_MyGoldMu').fadeIn();
            }
        }
    })
    $('.giveCB_MyGoldMu').on('click', '.giveCb_MyGold_close', function() {
        $('.giveCB_MyGoldMu').hide();
    })
    var CPDA_box = $('<div class="cpda_updata"><div class="cpda_updata_jz"><p class="cpda_close"></p><div class="cpda_content"></div></div></div>');
    $("body").append(CPDA_box);
    // 更新通知提示
    $(".cpda_close").on("click", function() {
        $(".cpda_updata").hide();
    })
})

var _close_alertmsg; //防止延时弹窗手动关闭后, 下次打开延时隐藏会加速

//弹窗, eg: $('.alertMsg').showMsg({isImg: 'isNo', h2txt: '服务异常, 请刷新重试或联系我们'});
;
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


// 数据加工权限判断
setTimeout(() => {
        $('body').on('click', '.dataProcess', function() {
            limit('数据加工')
                .then(res => {
                    if (res) {
                        window.location.href = 'ycl2.html'
                    }
                })
        });
        $('body').on('click', '.dataShow', function() {
            limit('数据可视化')
                .then(res => {
                    if (res) {
                        window.location.href = 'ksh2.html'
                    }
                })
        })
        $('body').on('click', '.specialty,.selfscene1', function() {
            limit('场景自建')
                .then(res => {
                    if (res) {
                        window.location.href = 'hmodel2.html'
                    }
                })
        })
        $('body').on('click', '.selfscene', function() {
            limit('场景自建')
                .then(res => {
                    if (res) {
                        window.location.href = 'uploading_algo.new.html?cm=build_cj'
                    }
                })
        })
        $('body').on('click', '.selfsetup1', function() {
            limit('算法自建')
                .then(res => {
                    if (res) {
                        window.location.href = 'uploading_algo.new.html?cm=build_cj'
                    }
                })
        })
        $('body').on('click', '.selfsetup2', function() {
            limit('算法自建')
                .then(res => {
                    if (res) {
                        window.location.href = 'uploading_algo.new.html?cm=uplook_alg&cf=xjmb'
                    }
                })
        })
        $('body').on('click', '.selfsetup3', function() {
            limit('算法自建')
                .then(res => {
                    if (res) {
                        window.location.href = 'uploading_algo.new.html?cm=uplook_alg'
                    }
                })
        })
    }, 200)
    // 权限设置
function limit(name) {
    return new Promise((resolve, reject) => {
        if (token != 'JWT undefined' && token != 'JWT null') {
            $.ajax({
                url: url_ip + '/vip/permissionsvalidation/',
                type: 'GET',
                headers: { 'Authorization': token },
                data: {
                    name
                },
                dataType: 'json',
                success: function(res) {
                    if (!res.status) {
                        $('.alertMsg').showMsg({
                            isImg: 'isNo',
                            h2txt: `<h2 style="font-weight: 700;margin-bottom: 3px">高级用户专享<h2><h5 style="font-size: 13px">升级为高级账户即可使用，您的当前权限为${res.levlename}</h5>`
                        });
                        resolve(false)
                    } else {
                        resolve(true)
                    }
                }
            })
        } else {
            $('.shade').show();
        }
    })
}
// 封装删除提示
function delConfirm() {
    return new Promise((resolve, reject) => {
        var del = confirm('确定删除？')
        if(del === true) {
            resolve()
        }
        else {
            reject()
        }
    })
}
$(function() {
    $(".nav_percen_xfr").on("click", function() {
        window.location.href = "perscen-vip.html";
    })
    $('body').append(`
        <div class="body_mask">
            <div class="is_quit">
                <p>退出登录后，</br>功能使用将会受到限制</p>
                <p>您确定要退出登录状态吗？</p>
                <div class="sure_quit">确定退出</div>
                <div class="no_quit">再想一想</div>
            </div>
        </div>
    `)
    $('body').on('click', '.no_quit', function() {
        $('.is_quit').hide()
        $('.body_mask').hide()
    })
    $('body').on('click', '.sure_quit', function() {
        $('.is_quit').hide()
        $('.body_mask').hide()
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        cookie.delete('token');
        cookie.delete('membername');
        cookie.delete('token_id');
        cookie.delete('user_img');
        window.location.href = 'index.html';
    })
})

// 从cpda跳转到个人中心
// changeStyle();
// function changeStyle() {
//     if(location.hash.search('cpda') !== -1) {
//         $('nav').empty();
//         $('footer').empty();
//         var link = document.createElement('link');
//         link.href = 'css/otherStyle.css';
//         link.rel = 'stylesheet';
//         link.type = 'text/css';
//         $('head').append(link);

//         var user_name_;
//         $.ajax({
//             url: url_ip + '/userinfo/',
//             type: 'GET',
//             cache: false,
//             async: false,
//             data: {},
//             dataType: 'json',
//             headers: { 'Authorization': token },
//             success: function(res) {
//                 // user_img = url_ip + res.header;
//                 // token_id = res.user_id;
//                 user_name_ = res.name;
//             },
//             error: function(err) {
//                 console.log(err)
//             }
//         })
//         $('nav').append(`
//             <!--header begin-->
//             <header>
//                 <div class="clearfix inner">
//                     <div class="clearfix header_top">
//                         <h1 class="logo"><a href="#"><img src="img/cpda.png" width="273" height="52" alt="" /></a></h1>
//                         <div class="h_t_right">
//                             <p class="hotline">400-050-6600</p>
//                             ${user_name_? `<div class="enter"><a href="#">${user_name_}</a>|<a href="#cpda">退出</a></div>`: `<div class="enter"><a href="#">登录</a>|<a href="#">注册</a></div>`}
//                         </div>
//                     </div>
//                     <!--nav begin-->
//                     <ul class="clearfix nav">
//                         <li class="current"><a href="http://www.cpda.cn/" class="n_a0"><em>首页</em></a></li>
//                         <li><a href="#" class="n_a0"><em>行业协会</em></a></li>
//                         <li>
//                             <a href="#" class="n_a0"><em>课程中心</em></a>
//                             <!--subclass begin-->
//                             <div class="subclass">
//                                 <div class="clearfix inner">
//                                     <!--subclass_block-->
//                                     <dl class="subclass_block subclass_block01">
//                                         <dt><a href="#">认证课程</a></dt>
//                                         <dd>
//                                             <div class="subclass_line">
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=35">CPDA数据分析师</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=40">CDA数据分析员</a>
//                                             </div>
//                                         </dd>
//                                     </dl>
//                                     <!--subclass_block-->
//                                     <dl class="subclass_block subclass_block02">
//                                         <dt><a href="#">集训课程</a></dt>
//                                         <dd>
//                                             <div class="subclass_line">
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=46">数据分析零基础集训营</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=45">数据分析职场集训营</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=44">运筹学解读数据集训营</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=43">用户画像场景搭建集训营</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=42">Power BI玩转数据集训营</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=41">面向数据科学的实用统计与SPSS实例操作集训营</a>
//                                             </div>
//                                         </dd>
//                                     </dl>
//                                     <!--subclass_block-->
//                                     <dl class="subclass_block subclass_block03">
//                                         <dt><a href="#">精品微课</a></dt>
//                                         <dd>
//                                             <div class="subclass_line">
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=55">数据分析应用技能之R语言</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=54">数据分析应用技能之SPSS</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=53">数据可视化五部曲</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=52">Power BI数据可视化</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=51">Power BI数据整理</a>
//                                             </div>
//                                             <div class="subclass_line">
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=50">Power BI数据建模</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=49">SPSS核心技能速成班</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=48">精准用户画像</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=47">新媒体数据化营销</a>
//                                             </div>
//                                         </dd>
//                                     </dl>
//                                     <!--subclass_block-->
//                                     <dl class="subclass_block subclass_block04">
//                                         <dt><a href="#">师资培训</a></dt>
//                                         <dd>
//                                             <div class="subclass_line">
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=58">数据分析员（CDA）讲师培训</a>
//                                                 <a href="http://www.cpda.cn/coursedetail/?id=57">数据分析讲师公益培训</a>
//                                             </div>
//                                         </dd>
//                                     </dl>

//                                 </div>
//                             </div>
//                             <!--subclass end-->
//                         </li>
//                         <li ><a href="http://www.cpda.cn/examine/" class="n_a0"><em>执业考核</em></a></li>
//                         <li ><a href="http://www.cpda.cn/trainning/" class="n_a0"><em>企业内训</em></a></li>
//                         <li ><a href="http://www.cpda.cn/teachertrain/" class="n_a0"><em>师资培训</em></a></li>
//                         <li ><a href="http://www.cpda.cn/career/" class="n_a0"><em>职业规划</em></a></li>
//                         <li ><a href="http://www.cpda.cn/datahoop/" class="n_a0"><em>Datahoop</em></a></li>
//                         <li ><a href="http://www.cpda.cn/about/" class="n_a0"><em>关于我们</em></a></li>
//                     </ul>
//                     <!--nav end-->
//                 </div>
//             </header>
//         `)
//     }
// }
