$(function () {
	var vm = new Vue({
		el:'#reward',
		data:{
			type:1,/*算法*/
			id:'',/*悬赏ID*/
			title:'',/*标题*/
			xuqiu:'',/*需求描述*/
			scene:'',/*场景描述*/
			time:'',/*发布时间*/
			select:'',/*分类*/
			money:'',/*赏金*/
			phone:'',/*手机号*/
			img:'',/*图片*/
			username:'',/*名字*/
			num:'',/*判断消息提示类别*/
			msg:'',/*消息内容*/
			msgBox_show:false, /*控制消息弹窗显示*/
			shade_show:false,
			shade_msg:'您目前还没有注册或登录~',
			register_show:true
		},
		created () {
			this.id = window.location.search.substr(1);
			var _this = this
			$.ajax({
				url:url_ip + '/award/touristreward/',
				type:'GET',
				data:{id:this.id,user_id:token_id},
				datatype:'json',
				success:function (data) {
					// console.log(data)
					if (data.status) {
						if (data.data.partin_id == '') {
							/*算法or数据*/
							_this.type = data.data.type
							/*题目*/
							_this.title = data.data.algo_title;
							/*发布时间*/
							_this.time = data.data.stage_time.time1;
							/*类别*/
							_this.select = data.data.classify;
							/*手机号*/
							_this.phone = data.data.mobile;
							/*需求描述*/
							_this.xuqiu = data.data.need_describe;
							/*场景描述*/
							_this.scene = data.data.scene_describe;
							/*头像*/
							_this.img = url_ip + data.data.image;
							/*名字*/
							_this.username = data.data.username
							/*左右等高*/
							_this.$nextTick(function () {
								_this.$refs.xuqiu_html.style.height = _this.$refs.xuqiu_html.scrollHeight + 'px'
								_this.$refs.scene_html.style.height = _this.$refs.scene_html.scrollHeight + 'px'
								_this.$refs.xiaoxi.style.height = _this.$refs.content.clientHeight + 'px'
							})	
						} else {
							window.location.href = 'reward_work.html?'+data.data.partin_id+'&'+_this.id
						}
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
		},
		filters:{
			to_date:function (time) {
				if (time != '') {
					var date = new Date(time)
					var year = date.getFullYear();
					var m = date.getMonth() + 1;
					var month = (m < 10 ? '0' + m : m)
					var d = date.getDate();
					var day = (d < 10 ? '0' + d : d)
					return year + '-' + month + '-' + day	
				}
			}
		},
		methods:{
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
			joins:function () {
				var _this = this
				$.ajax({
					url:url_ip + '/award/partinaward/',
					type:'GET',
					data:{id:this.id,type:this.type},
					datatype:'json',
					headers:{'Authorization':token},
					success:function (data) {
						// console.log(data)
						if (data.status) {
							_this.alertmsg(data.msg,1)
							window.location.href = 'reward_work.html?'+data.id+'&'+_this.id
						} else {
							_this.alertmsg(data.msg,0)
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
			},
			get_phone:function () {
				var _this = this
				$.ajax({
					url:url_ip + '/award/awardcontact/',
					type:'GET',
					data:{id:this.id},
					datatype:'json',
					headers:{'Authorization':token},
					success:function (data) {
						// console.log(data)
						if (data.status) {
							_this.alertmsg(data.msg,1)
						} else {
							_this.alertmsg(data.msg,0)
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
		mounted () {

		}
 	})
})