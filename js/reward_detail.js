$(function () {
	var vm = new Vue({
		el:'#reward',
		data:{
			type:1,/*算法*/
			id:'',/*悬赏ID*/
			close_progress:false,/*关闭需求进度条*/
			close_box:false,/*控制关闭需求弹窗*/
			revise_boxs:false,/*控制修改弹窗隐藏*/
			toubiao:false,/*控制投标信息隐藏*/
			zhongbiao:false,/*控制中标信息隐藏*/
			back_resive:false,/*控制修改建议弹窗关闭*/
			zb_isSure:false,/*控制中标确认弹窗隐藏*/
			jubao:false,/*举报弹窗隐藏*/
			title:'',/*标题*/
			xuqiu:'',/*需求描述*/
			scene:'',/*场景描述*/
			time:'',/*发布时间*/
			classify:'',/*分类*/
			money:'',/*赏金*/
			phone:'',/*手机号*/
			img:'',/*图片*/
			username:'',/*名字*/
			Dd_number:'',/*订单号*/
			revise_title_type:'算法标题：',/*判断是什么标题*/
			revise_title:'',/*修改时的标题*/
			revise_xuqiu:'',/*修改时的需求描述*/
			revise_scene:'',/*修改时的场景描述*/
			revise_select:'',/*修改时的分类*/
			revise_money:'',/*修改时的赏金*/
			revise_time:'',/*修改时的公式期限*/
			revise_phone:'',/*修改时的手机号*/
			revise_yzm:'',/*修改时的验证码*/
			algo_type:[],/*需求分类数组*/
			button_html:'获取手机验证码',/*发送验证码按钮内容*/
			is_click:'true_click',/*是否可以发送验证码*/
			type_num:2,/*进度：默认第二步*/
			time1:'',/*提交需求的时间*/
			time1_2:'',/*托管赏金的倒计时*/
			time2:'',/*托管赏金的时间*/
			time3:'',/*公示开始的时间*/
			time3_4:'',/*公示倒计时*/
			time4:'',/*公示结束的时间*/
			time4_5:'',/*产生中标倒计时*/
			time5:'',/*产生中标的时间*/
			time5_6:'',/*提交成果倒计时*/
			time6:'',/*提交成果的时间*/
			time6_7:'',/*赏金支付倒计时*/
			time7:'',/*赏金支付时间*/
			num:'',/*判断消息提示类别*/
			msg:'',/*消息内容*/
			src:'',/*图片路径*/
			msgBox_show:false,/*控制消息弹窗显示*/
			dd_datas:'',/*投标信息*/
			dd_length:0,
			back_txt:'',
			url_ip:url_ip,
			no_zb:false,
			zb_id:'',
			zb_e:'',
			jb_reason:['脏话/谩骂','反党/反社会言论','虚假信息','色情、暴力','信息无意义,滥竽充数','其他'],
			jb_id:'',
			reason_select:'',
			reason_text:'',
			shade_show:false,
			shade_msg:'您目前还没有注册或登录~',
			register_show:true
		},
		created () {
			this.id = window.location.search.substr(1);
			setInterval(()=>{
				if (this.time1_2 != '') {
					this.time1_2--;
				} else if (this.time3_4 != '') {
					this.time3_4--;
				} else if (this.time4_5 != '') {
					this.time4_5--;
				} else if (this.time5_6 != '') {
					this.time5_6--;
				} else if (this.time6_7 != '') {
					this.time6_7--;
				}
			},1000)
			var _this = this
			$.ajax({
				url:url_ip + '/award/rewarddetails/',
				type:'GET',
				async:false,
				data:{id:this.id},
				datatype:'json',
				headers:{'Authorization':token},
				success:function (data) {
					console.log(data)
					if (data.status) {
						/*算法or数据*/
						_this.type = data.data.type
						/*是否关闭*/
						if (data.data.adopt == 0) {
								_this.close_progress = true;
						}
						/*题目*/
						_this.title = data.data.algo_title;
						_this.revise_title = data.data.algo_title;
						/*发布时间*/
						_this.time = data.data.stage_time.time1;
						/*类别*/
						_this.classify = data.data.classify;
						_this.revise_select = data.data.classify;
						/*手机号*/
						_this.phone = data.data.mobile;
						_this.revise_phone = data.data.mobile;
						/*进度*/
						_this.type_num = data.data.status;
						if (data.data.status >= 6) {
							_this.no_zb = true
						}
						/*需求描述*/
						_this.xuqiu = data.data.need_describe;
						_this.revise_xuqiu = data.data.need_describe;
						/*场景描述*/
						_this.scene = data.data.scene_describe;
						_this.revise_scene = data.data.scene_describe;
						/*赏金*/
						_this.revise_money = data.data.money;
						_this.money = data.data.money;
						/*公式期限*/
						_this.revise_time = data.data.duration;
						/*头像*/
						_this.img = url_ip + data.data.image;
						/*名字*/
						_this.username = data.data.username
						/*订单号*/
						_this.Dd_number = data.data.order_number
						/*进度时间*/
						_this.time1 = data.data.stage_time.time1;
						if (data.data.status < 3) {
							_this.time1_2 = parseInt((data.data.stage_time.time1 + 86400000 - new Date().getTime()) / 1000)
						}
						_this.time2 = data.data.stage_time.time2;
						_this.time3 = data.data.stage_time.time3;
						if (data.data.status == 4) {
							_this.time3_4 = parseInt((data.data.stage_time.time4 - data.data.stage_time.time3) / 1000)
						}
						if (data.data.status > 4) {
							_this.time3 = data.data.stage_time.time4;
						}
						if (data.data.status == 5) {
							_this.time4_5 = (data.data.stage_time.time4 == '' ? data.data.stage_time.time4 : parseInt((data.data.stage_time.time4 + 86400000 - new Date().getTime()) / 1000))
						}
						_this.time5 = data.data.stage_time.time5;
						if (data.data.status == 6) {
							_this.time5_6 = (data.data.stage_time.time5 == '' ? data.data.stage_time.time5 : parseInt((data.data.stage_time.time5 + 86400000 - new Date().getTime()) / 1000))
						}
						_this.time6 = data.data.stage_time.time6;
						if (data.data.status == 7) {
							_this.time6_7 = (data.data.stage_time.time6 == '' ? data.data.stage_time.time6 : parseInt((data.data.stage_time.time6 + 86400000 - new Date().getTime()) / 1000))
						}
						_this.time7 = data.data.stage_time.time7;
						/*左右等高*/
						_this.$nextTick(function () {
							_this.$refs.xuqiu_html.style.height = _this.$refs.xuqiu_html.scrollHeight + 'px'
							_this.$refs.scene_html.style.height = _this.$refs.scene_html.scrollHeight + 'px'
							_this.$refs.xiaoxi.style.height = _this.$refs.content.clientHeight + 'px'
						})
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
			if (this.type == 1) {
				this.revise_title_type = '算法标题：'
				this.algo_type = ['文本分析','机器学习','深度学习','计算机视觉']
			} else {
				this.revise_title_type = '数据标题：'
				this.algo_type = ['商业','文化','环境','生活','社会','体育','教育','科技','时政']
			}
			$.ajax({
				url:url_ip + '/award/rewardblueprint/',
				type:'GET',
				data:{id:this.id},
				datatype:'json',
				headers:{'Authorization':token},
				success:function (data) {
					console.log(data)
					if (data.status) {
						_this.dd_length = data.data.length
						_this.dd_datas = data.data
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
			if (this.type_num >= 7) {
				console.log(this.type_num)
				this.toubiao = false;
				this.zhongbiao = true;
				$.ajax({
					url:url_ip + '/award/uploadfile/',
					type:'get',
					data:{id:this.id},
					datatype:'json',
					headers:{'Authorization':token},
					success:function (data) {
						console.log(data)
						if (data.status) {
							_this.$refs.download.setAttribute('href',url_ip + data.file_url)
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
			} else {
				console.log(this.type_num)
				this.zhongbiao = false;
				this.toubiao = true
			}
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
			},
			dao_date:function (time) {
				if (time != '') {
					if (time > 0) {
						var day = parseInt(time / 86400)
						var h = parseInt((time % 86400) / 3600)
						var hour = (h < 10 ? '0' + h : h)
						var m = parseInt(((time % 86400) % 3600) / 60)
						var minute = (m < 10 ? '0' + m : m)
						var s = parseInt(((time % 86400) % 3600) % 60)
						var second = (s < 10 ? '0' + s : s)
						return '余:' + day + '天' + hour + '时' + minute + '分' + second + '秒'	
					} else {
						return '余:' + 0 + '天' + 0 + '时' + 0 + '分' + 0 + '秒'	
					}
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
					_this.msgBox_show = false;
				},time)
			},
			close_shade:function () {
				this.shade_show = false;
				window.location.href = 'index.html'
			},
			revise:function () {
				if (this.type_num < 3) {
					this.revise_boxs = true;
				}
			},
			tuoguan:function () {
				this.$refs.zhifu_type.style.display = 'block';
			},
			close_zhifu:function () {
				this.$refs.zhifu_type.style.display = 'none';
			},
			weixin:function () {
				console.log(this.Dd_number)
				this.$refs.zhifu_type.style.display = 'none';
				this.$refs.erweima.style.display = 'block';
				this.src = url_ip + '/award/payqrcode/?order_number='+this.Dd_number
				var _this = this;
				var tid_ajax;
				clearInterval(tid_ajax);
				tid_ajax = setInterval(()=>{
					$.ajax({
						url:url_ip + '/award/payqrcode/',
						type:'POST',
						data:{id:this.id,order_number:this.Dd_number},
						datatype:'json',
						headers:{'Authorization':token},
						success:function (data) {
							console.log(data)
							if (data.status) {
								if (data.audit == 1) {
									_this.alertmsg(data.msg,1)
									clearInterval(tid_ajax);
									_this.$refs.erweima.style.display = 'none';
								}
							} else {
								clearInterval(tid_ajax);
							}
						}
					})	
				},1000)
			},
			close_erweima:function () {
				this.$refs.erweima.style.display = 'none';
			},
			zfb:function () {
				this.alertmsg('很抱歉，平台暂未开通支付宝服务，敬请期待。',3)
			},
			close:function () {
				this.close_box = true;
			},
			close_sure:function () {
				var _this = this;
				$.ajax({
					url:url_ip + '/award/closeaward/',
					type:'get',
					data:{id:this.id},
					datatype:'json',
					headers:{'Authorization':token},
					success:function (data) {
						console.log(data)
						if (data.status) {
							this.close_progress = true;
							this.close_box = false;
						} else {
							_this.alertmsg(data.msg,0)
						}
					}
				})
			},
			close_no:function () {
				this.close_box = false;
			},
			revise_close:function () {
				this.revise_boxs = false;
			},
			revise_sure:function () {
				var _this = this;
				$.ajax({
					url:url_ip + '/award/rewarddetails/',
					type:'put',
					data:{id:_this.id,algo_title:_this.revise_title,need_describe:_this.revise_xuqiu,scene_describe:_this.revise_scene,classify:_this.revise_select,money:_this.revise_money,past_time:_this.revise_time,mobile:_this.revise_phone,auth_code:_this.revise_yzm,type:_this.type},
					datatype:'json',
					headers:{'Authorization':token},
					success:function (data) {
						console.log(data)
						if (data.status) {
							_this.alertmsg(data.msg,1)
							window.location.reload()
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
			},
			yanz:function (e) {
				var _this = this
				var time = 60
				var tig;
				if (e.target.className == 'true_click') {
					$.ajax({
						url:url_ip + '/award/authcode/',
						type:'POST',
						data:{mobile:this.revise_phone},
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
							console.log(data)
							if (data.status) {
								_this.alertmsg(data.msg,1)
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
			back:function () {
				this.back_resive = true
			},
			close_back:function () {
				this.back_resive = false
			},
			zbiao_click:function (e) {
				if (!this.no_zb) {
					this.zb_id = e.target.getAttribute('data-id')
					this.zb_isSure = true;
					this.zb_e = e.target
				}
			},
			quit_zb:function () {
				this.zb_id = '';
				this.zb_isSure = false;
				this.zb_e = ''
			},
			zb_sure:function () {
				var _this = this
				$.ajax({
					url:url_ip + '/award/rewardblueprint/',
					type:'POST',
					data:{id:this.zb_id,opt_for:1},
					datatype:'json',
					headers:{'Authorization':token},
					success:function (data) {
						console.log(data)
						if (data.status) {
							_this.alertmsg(data.msg,1)
							_this.no_zb = true;
							_this.zb_e.innerHTML = '已中标'
						} else {
							_this.alertmsg(data.msg,0)
						}
						_this.zb_id = '';
						_this.zb_isSure = false;
						_this.zb_e = ''
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
			},
			jbao_click:function (e) {
				this.jb_id = e.target.getAttribute('data-id')
				this.jubao = true;	
			},
			jubao_close:function () {
				this.jb_id = '';
				this.jubao = false;
				this.reason_select = '';
			},
			jb_sure:function () {
				var _this = this
				if (this.reason_select == '其他') {
					var content = this.reason_text
				} else {
					var content = this.reason_select
				}
				$.ajax({
					url:url_ip + '/award/rewardblueprint/',
					type:'POST',
					data:{id:this.jb_id,iscomplain:0,complain_content:content},
					datatype:'json',
					headers:{'Authorization':token},
					success:function (data) {
						console.log(data)
						if (data.status) {
							_this.alertmsg(data.msg,1)
						} else {
							_this.alertmsg(data.msg,0)
						}
						_this.jb_id = '';
						_this.jubao = false;
						_this.reason_select = '';
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
			},
			result_sure:function () {
				var _this = this
				$.ajax({
					url:url_ip + '/award/againsatisfy/',
					type:'POST',
					data:{id:this.id},
					datatype:'json',
					headers:{'Authorization':token},
					success:function (data) {
						console.log(data)
						if (data.status) {
							_this.alertmsg(data.msg,1)
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
			},
			backsure:function () {
				if (this.back_txt == '') {
					this.alertmsg('修改建议为必填内容，不可为空',2)
				} else {
					var _this = this
					$.ajax({
						url:url_ip + '/award/againnosatisfy/',
						type:'POST',
						data:{id:this.id,cause:this.back_txt},
						datatype:'json',
						headers:{'Authorization':token},
						success:function (data) {
							console.log(data)
							if (data.status) {
								_this.alertmsg(data.msg,1)
								_this.back_resive = false
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
			close_back:function () {
				this.back_resive = false
			}
		},
		mounted () {
			
		},
		watch:{

		}
	})
})
				