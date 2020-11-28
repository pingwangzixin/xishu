$(function () {
	var vm = new Vue({
		el:'#reward',
		data:{
			type:1,
			title:'',
			xuqiu:'',
			scene:'',
			select:'',
			money:0,
			time:14,
			phone_num:'',
			yzm:'',
			num:'',
			msg:'',
			msgBox_show:false,
			button_html:'获取短信验证码',
			is_click:'true_click',
			algo_type:[],
			title_type:'',
			shade_show:false,
			shade_msg:'您目前还没有注册或登录~',
			register_show:true
		},
		created () {
			if (window.location.search.substr(1) == 'sf') {
				this.type = 1
				this.title_type = '算法标题：'
				this.algo_type = ['文本分析','机器学习','深度学习','计算机视觉']
			} else if (window.location.search.substr(1) == 'sj') {
				this.type = 0
				this.title_type = '数据标题：'
				this.algo_type = ['商业','文化','环境','生活','社会','体育','教育','科技','时政']
			} else {
				this.type = 1
				this.title_type = '算法标题：'
				this.algo_type = ['文本分析','机器学习','深度学习','计算机视觉']
			}
		},
		methods: {
			alertmsg:function (msg,num) {
				this.num = num;
				this.msg = msg;
				this.msgBox_show = true;
				var _this = this
				if (num == 1) {
					var time = 1000;
				} else {
					var time = 2000
				}
				setTimeout(function () {
					// console.log(time)
					_this.msgBox_show = false;
				},time)
			},
			close_shade:function () {
				this.shade_show = false;
			},
			yanz:function (e) {
				var _this = this
				var time = 60
				var tig;
				if (e.target.className == 'true_click') {
					$.ajax({
						url:url_ip + '/award/authcode/',
						type:'POST',
						data:{mobile:this.phone_num},
						datatype:'json',
						headers:{'Authorization':token},
						beforeSend:function () {
							_this.button_html = '重新发送：' + time + 's'
							_this.is_click = 'false_click'
							clearInterval(tig)
							tig = setInterval(function () {
								time--;
								_this.button_html = '重新发送：' + time + 's'
								if (time < 0) {
									clearInterval(tig)
									_this.is_click = 'true_click'
									_this.button_html = '重新发送'
								}
							},1000)
						},
						success:function (data) {
							// console.log(data)
							if (data.status) {
								_this.alertmsg(data.msg,1)
							} else {
								_this.alertmsg(data.msg,0)
								clearInterval(tig)
								_this.is_click = 'true_click'
								_this.button_html = '重新发送'
							}
						},
						error:function (data) {
							// console.log(data)
							if (data.status == 401) {
								if (token == 'JWT undefined' || token == 'JWT null') {
				            		_this.shade_msg = '您目前还没有注册或登录'
				            		_this.register_show = true;
				            		_this.shade_show = true
				            	} else {
				            		_this.shade_msg = '系统检测,您的账号存在风险异常,请重新登录。'
				            		_this.register_show = false;
				            		_this.shade_show = true
				            	}
							} else {
								_this.alertmsg('未知错误',0)
							}
						}
					})	
				}
			},
			fabu:function () {
				var _this = this
				$.ajax({
					url:url_ip + '/award/publish/',
					type:'POST',
					data:{algo_title:_this.title,need_describe:_this.xuqiu,scene_describe:_this.scene,classify:_this.select,money:_this.money,past_time:_this.time,mobile:_this.phone_num,auth_code:_this.yzm,type:_this.type},
					datatype:'json',
					headers:{'Authorization':token},
					success:function (data) {
						// console.log(data)
						if (data.status) {
							_this.alertmsg(data.msg,1)
							_this.title = ''
							_this.xuqiu = ''
							_this.scene = ''
							_this.select = ''
							_this.money = 0
							_this.time = 14
							_this.phone_num = ''
							_this.yzm = ''
							window.location.href = 'reward_detail.html?'+data.id
						} else {
							_this.alertmsg(data.msg,0)
						}
					},
					error:function (data) {
						console.log(data)
						if (data.status == 401) {
							if (token == 'JWT undefined' || token == 'JWT null') {
			            		_this.shade_msg = '您目前还没有注册或登录'
			            		_this.register_show = true;
			            		_this.shade_show = true
			            	} else {
			            		_this.shade_msg = '系统检测,您的账号存在风险异常,请重新登录。'
			            		_this.register_show = false;
			            		_this.shade_show = true
			            	}
						} else {
							_this.alertmsg('未知错误',0)
						}
					}
				})
			}
		},
		mounted () {
			
		},
		watch:{
			money (n) {
				if (n < 0) {
					this.alertmsg('赏金不能小于0元，请您修改赏金。',0)
					this.money = 0;
				}
			},
			time (n) {
				if (n > 14) {
					this.alertmsg('公示期限不能超过14天，请您修改期限。',0)
					this.time = 14;
				} else if (n < 0) {
					this.alertmsg('公示期限不能小于0天，请您修改期限。',0)
					this.time = 0;
				}
			}
		}
	})
})