var navLdata = [
	// {name: '专业工作台', children: {name: '专业工作台'}},
	{name: '自建场景', href: 'uploading_algo.new.html', children: [{name: '自建场景'},{name: '我的场景'}]},
	{name: '算法集群', href: 'alg_list.html?sf', children: {name: '算法集群', list: [
		{title: '预处理', list: [
			{name: '因子分析算法', id: 187},
			{name: 'K-means算法', id: 170},
			{name: '标准化算法', id: 264},
			{name: 'Factorization Machine(因子分解机)', id: 258},
			{name: '标签特征编码算法', id: 201},
		]},
		{title: '分类', list: [
			{name: 'Adaboost算法', id: 257},
			{name: '简单指数平滑算法', id: 208},
			{name: '移动平均算法', id: 207},
			{name: '朴素贝叶斯算法', id: 199},
			{name: 'KNN算法', id: 185},
		]},
		{title: '回归', list: [
			{name: '关联分析算法', id: 183},
			{name: '逻辑回归', id: 214},
			{name: 'CART(树回归)', id: 267},
			{name: '线性回归', id: 209},
			{name: 'Softmax Regression算法', id: 178},
		]},
		{title: '聚类', list: [
			{name: '聚合函数', id: 211},
			{name: '网格聚类', id: 210},
			{name: '层次聚类算法', id: 193},
			{name: '密度聚类算法', id: 192},
			{name: 'Mean Shift算法', id: 176},
		]},
		{title: '时间序列', list: [
			{name: 'winter指数平滑算法', id: 180},
			{name: 'Hopfield网络', id: 383}
		]},
		{title: '关联分析', list: [
			{name: 'CLIQUE', id: 427},
			{name: 'WaveCluster', id: 426},
			{name: 'STING', id: 425},
			{name: 'FDC', id: 424},
			{name: 'OPTICS', id: 423},
		]},
		{title: '统计分析', list: [
			{name: '词频统计算', id: 213},
			{name: '神经网络算法', id: 206},
			{name: '主成分分析算法', id: 181},
			{name: '文本分析算法', id: 198},
			{name: '情感分析算法', id: 197},
		]},
		{title: '网络分析', list: [
			{name: '神经网络算法', id: 206},
			{name: 'RBN算法', id: 177},
			{name: 'Hot指数平滑算法', id: 169},
			{name: 'RAS分段加密', id: 406},
			{name: '数据集拆分', id: 2},
		]},
		{title: '其他', list: [
			{name: '相关系数矩阵算法', id: 204},
			{name: '矩阵分解算法', id: 205},
			{name: '相似度矩阵算法', id: 203},
			{name: '基于项的协同过滤算法', id: 189},
			{name: '基于用户的协同过滤算法', id: 188},
		]},
	]}},
	{name: '数据库', href: 'data_list.html', children: {name: '数据库', localdata: [
			{name: 'Postgresql', cm: 'postgresql'},{name: 'SQL Server', cm: 'sqlserver'},
			{name: 'MySQL', cm: 'mysql'},{name: 'ORACLE', cm: 'oracle'},{name: 'HIVE', cm: 'hive'}
		], longdata: [
			{name: 'Postgresql', cm: 'postgresql'},{name: 'SQL Server', cm: 'sqlserver'},
			{name: 'MySQL', cm: 'mysql'},{name: 'ORACLE', cm: 'oracle'},{name: 'HIVE', cm: 'hive'}
		]}
	},
	{name: '数据可视化', href: 'javascript:;', children: {name: '数据可视化', children: [
		{name: '数据展示', EngName: 'Data Presentation', data2: [
			{name: '散点图', chartname: 'scatterChart'},{name: '饼图', chartname: 'pieChart'},
			{name: '柱状图', chartname: 'barChart'},{name: '漏斗图', chartname: 'funnelChart'},
			{name: '堆叠柱状图', chartname: 'barUpChart'},{name: '表格', chartname: 'boxChart'},
			{name: '折线图', chartname: 'lineChart'},{name: '面积图', chartname: 'areaChart'},
			{name: '热力图', chartname: 'heatMapChart'},{name: '百分比堆叠条状图', chartname: 'stripUpPercentChart'},
			{name: '折柱图', chartname: 'barLineChart'},{name: '气泡图', chartname: 'bubbleChart'},
			{name: '雷达图', chartname: 'radarChart'},
		]},
		{name: '数据展示<span style="color: red;">new</span>', data2: []},
		{name: '数据加工', EngName: 'Data Visualization', data2: [], data21: [{name: '数据加载'},{name: '数据清洗'},{name: '数据同步'}]},
		{name: '数据加工<span style="color: red;">new</span>', data2: []},
		{name: '报表分析', data2: []},
	]}},
	{name: '数据源接入', href: 'javascript:;', children: {name: '数据源接入', children: [
		{name: '数据上传', EngName: 'Data Uploading', data2: [
			{name: '文本文件', data3: ['Excel', 'Txt', 'Csv']},
			{name: '数据库源', data3: ['MySQL', 'PostgreSQL', 'SQL Server', 'Oracle', 'MariaDB']}]},
		{name: '远程服务器', EngName: 'Remote Server', data3: []},
		{name: '网络爬取', EngName: 'Network Crawling', data3: []},
		{name: '公开数据', EngName: 'Public Data', data3: [{name: '商业', type: ''},{name: '文化', type: ''},{name: '环境', type: ''},
			{name: '生活', type: ''},{name: '社会', type: ''},{name: '体育', type: ''},
			{name: '教育', type: ''},{name: '科技', type: ''},{name: '时政', type: ''}
		]}
	]}},
	{name: '算法设计', href: 'javascript:;', children: {name: '算法设计', children: [
		{name: '算法上传', EngName: 'Algorithm Upload', data3: [{name: '上传算法'},{name: '查看已上传算法'}]},
		{name: '自定义场景', EngName: 'Custom Scene', data3: [
			{name: '新建模板'},{name: '监督学习模板'},
			{name: '非监督学习模板'},{name: 'KNN算法模板'},
			{name: '独热编码算法模板'},{name: '监因子分析模板'},
		]},
		{name: '应用场景', EngName: 'Application Scenario', data3: []},
		{name: '舆情分析', EngName: 'Public Opinion Analysis', data3: []}
	]}},
	{name: '犀数学院', href: 'xssy_index.html', children: [{name: '个性化课程', children: [
		{name: '精准用户画像', id: 34, label: ''},{name: '8小时，教你成为PowerBI大师', id: 33, label: ''},
		{name: '数据可视化五部曲', id: 32, label: ''},{name: '数据分析应用之SPSS', id: 28, label: 'new'},
		{name: '数据分析应用技能之R语言', id: 14, label: ''},{name: '数据分析应用技能之Python', id: 13, label: ''},
		{name: 'Datahoop2.0使用教程', id: 11, label: 'hot'},
		{name: 'CPDA课程', id: 37, label: 'hot'},
		{name: 'CPDA数据分析师模拟习题库', id: 36, label: ''},{name: 'SPSS核心技能速成班', id: 35, label: ''},
		{name: 'PowerBI数据建模', id: 31, label: ''},{name: 'PowerBI可视化', id: 30, label: ''},
		{name: 'PowerBI数据整理', id: 29, label: 'new'},{name: '机器学习理论基础', id: 27, label: 'hot'},
		{name: '分析工具基础', id: 26, label: ''},{name: '数据分析基础', id: 25, label: ''},
		{name: 'CPDA课程介绍', id: 24, label: ''},{name: 'R语言机器学习实战', id: 23, label: ''},
		{name: 'R语言统计分析实战', id: 22, label: ''},{name: 'R语言数据处理', id: 21, label: ''},
		{name: 'R语言基础入门', id: 20, label: ''},{name: 'Python机器学习实战', id: 19, label: ''},
		{name: 'Pandas基础', id: 18, label: ''},{name: 'Matplotlib可视化基础', id: 17, label: ''},
		{name: 'Numpy基础课程', id: 16, label: ''},{name: 'Python快速入门', id: 15, label: ''},
	]}]},
	{name: '悬赏参与', href: 'javascript:;', href1: 'reward.html', children: [{name: '参与悬赏'},{name: '发布需求'}]},
	{name: '行业资讯', href: 'information_center.html', children: {name: '行业资讯', data2: [
		{name: '行业资讯', data3: []},
		{name: '运营资讯', data3: []},
		{name: '算法资讯', data3: []},
	]}},
	{name: '帮助中心', href: 'help_center.html', children: {name: '帮助中心', children: [
		{question: "账户与会员",  id: 1, data3: [
            {question: "如何注册用户？", id: 2},
            {question: "用户如何登录？", id: 3},
            {question: "如何找回密码？", id: 4},
            {question: "如何提升会员等级？", id: 5},
            {question: "什么是用户积分？", id: 6}],
		},{question: "个人中心", id: 2, data3:[
			{question: "如何查看我的账户信息？", id: 7},
		    {question: "如何查看我拥有的资源信息？", id: 8},
		    {question: "如何查看我的收纳信息？", id: 9},
			{question: "如何填写个人资料？", id: 10},
		    {question: "如何修改登录密码？", id: 11},
		    {question: "如何关注其他用户？", id: 12}],
		},{question: "数据源接入", id: 3, data3: [
			{question: "如何获取数据？", id: 13},],
		},{question: "数据可视化", id: 4, data3: [
			{question: "如何进行数据加工？", id: 14},
			{question: "如何进行数据合并？", id: 15},
			{question: "如何进行数据展示？", id: 16}],
		},{question: "算法设计",id: 5, data3: [
            {question: "如何上传算法？", id: 17},
            {question: "自建算法须知", id: 22},
            {question: "2.0读取数据规则", id: 23},
            {question: "自建算法支持模块", id: 24},
            {question: "如何将本地算法变成在线可运行", id: 25}]},
		{question: "分析工作台", id: 6, data3: [
			{question: "如何使用分析工作台？", id: 18},
			{question: "如何对数据进行预测?", id: 21}],
		},{question: "商品购买", id: 7, data3: [
			{question: "如何购买微课？", id: 19},
			{question: "如何购买算法和算力？", id: 20}],
		},
	]}},
	{name: '联系我们', href: 'contact_us.html', children: {name: '联系我们'}},
	{name: '关于我们', href: 'about_us.html', children: {name: '关于我们'}},
	{name: '建议与反馈', href: 'feedback.html', children: {name: '建议与反馈'}},
	{name: '职业充电', children: [{name: '个性化课程', EngName: 'Individualized Curriculum', children: [
		{name: '精准用户画像', id: 34, label: ''},{name: '8小时，教你成为PowerBI大师', id: 33, label: ''},
		{name: '数据可视化五部曲', id: 32, label: ''},{name: '数据分析应用之SPSS', id: 28, label: 'new'},
		{name: '数据分析应用技能之R语言', id: 14, label: ''},{name: '数据分析应用技能之Python', id: 13, label: ''},
		{name: 'Datahoop2.0使用教程', id: 11, label: 'hot'},
		{name: 'CPDA课程', id: 37, label: 'hot'},
		{name: 'CPDA数据分析师模拟习题库', id: 36, label: ''},{name: 'SPSS核心技能速成班', id: 35, label: ''},
		{name: 'PowerBI数据建模', id: 31, label: ''},{name: 'PowerBI可视化', id: 30, label: ''},
		{name: 'PowerBI数据整理', id: 29, label: 'new'},{name: '机器学习理论基础', id: 27, label: 'hot'},
		{name: '分析工具基础', id: 26, label: ''},{name: '数据分析基础', id: 25, label: ''},
		{name: 'CPDA课程介绍', id: 24, label: ''},{name: 'R语言机器学习实战', id: 23, label: ''},
		{name: 'R语言统计分析实战', id: 22, label: ''},{name: 'R语言数据处理', id: 21, label: ''},
		{name: 'R语言基础入门', id: 20, label: ''},{name: 'Python机器学习实战', id: 19, label: ''},
		{name: 'Pandas基础', id: 18, label: ''},{name: 'Matplotlib可视化基础', id: 17, label: ''},
		{name: 'Numpy基础课程', id: 16, label: ''},{name: 'Python快速入门', id: 15, label: ''},
	]}, {name: '个性化资料', EngName: 'Personalized Data', children: []}]}
]