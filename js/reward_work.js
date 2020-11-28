$(function () {
	var vm = new Vue({
		el:'#reward',
		data:{
			type:1,/*算法or数据*/
			id:'',/*悬赏ID*/
			canyu_id:'',/*悬赏ID*/
			title:'',/*标题*/
			xuqiu:'',/*需求描述*/
			scene:'',/*场景描述*/
			time:'',/*发布时间*/
			classify:'',/*分类*/
			money:'',/*赏金*/
			phone:'',/*手机号*/
			img:'',/*图片*/
			username:'',/*名字*/
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
			msgBox_show:false, /*控制消息弹窗显示*/
			file_img1:'img/reward_work.png',/*上传的图片文件1*/
			file_img2:'img/reward_work.png',/*上传的图片文件2*/
			file_img3:'img/reward_work.png',/*上传的图片文件3*/
			file_img4:'img/reward_work.png',/*上传的图片文件4*/
			file_img5:'img/reward_work.png',/*上传的图片文件5*/
			file1_show:false,/*文件移除图标1*/
			file2_show:false,/*文件移除图标2*/
			file3_show:false,/*文件移除图标3*/
			file4_show:false,/*文件移除图标4*/
			file5_show:false,/*文件移除图标5*/
			content:'',
			file_name:'',
			w_r:'',
			shade_show:false,
			shade_msg:'您目前还没有注册或登录~',
			register_show:true
		},
		created () {
			this.canyu_id = window.location.search.substr(1,window.location.search.indexOf('&')-1);
			this.id = window.location.search.substr(window.location.search.indexOf('&')+1);
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
				data:{id:this.id},
				datatype:'json',
				headers:{'Authorization':token},
				success:function (data) {
					console.log(data)
					if (data.status) {
						/*算法or数据*/
						_this.type = data.data.type
						/*题目*/
						_this.title = data.data.algo_title;
						/*发布时间*/
						_this.time = data.data.stage_time.time1;
						/*类别*/
						_this.classify = data.data.classify;
						/*手机号*/
						_this.phone = data.data.mobile;
						/*进度*/
						_this.type_num = data.data.status;
						/*需求描述*/
						_this.xuqiu = data.data.need_describe;
						/*场景描述*/
						_this.scene = data.data.scene_describe;
						/*赏金*/
						_this.money = data.data.money;
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
						if (data.data.status < 6) {
							_this.w_r = 'w'
						} else {
							_this.w_r = 'r'
						}
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
					console.log(time)
					_this.msgBox_show = false;
				},time)
			},
			close_shade:function () {
				this.shade_show = false;
				window.history.go(-1)
			},
			close_join:function () {
				var _this = this
				$.ajax({
					url:url_ip + '/award/partinaward/',
					type:'DELETE',
					data:{id:this.canyu_id},
					datatype:'json',
					headers:{'Authorization':token},
					success:function (data) {
						console.log(data)
						if (data.status) {
							window.location.href = 'reward_join.html?'+_this.id
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
			get_phone:function () {
				var _this = this
				$.ajax({
					url:url_ip + '/award/awardcontact/',
					type:'GET',
					data:{id:this.id},
					datatype:'json',
					headers:{'Authorization':token},
					success:function (data) {
						console.log(data)
						if (data.status) {
							_this.phone = data.mobile
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
			file1:function (e) {
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = ()=>{
					this.file_img1 = reader.result
				}
				this.file1_show = true;
			},
			file2:function (e) {
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = ()=>{
					this.file_img2 = reader.result
				}
				this.file2_show = true;
			},
			file3:function (e) {
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = ()=>{
					this.file_img3 = reader.result
				}
				this.file3_show = true;
			},
			file4:function (e) {
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = ()=>{
					this.file_img4 = reader.result
				}
				this.file4_show = true;
			},
			file5:function (e) {
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = ()=>{
					this.file_img5 = reader.result
				}
				this.file5_show = true;
			},
			remove_img1:function () {
				this.file_img1 = 'img/reward_work.png';
				this.file1_show = false;
				this.$refs.file1.value = '';
			},
			remove_img2:function () {
				this.file_img2 = 'img/reward_work.png';
				this.file2_show = false;
				this.$refs.file2.value = '';
			},
			remove_img3:function () {
				this.file_img3 = 'img/reward_work.png';
				this.file3_show = false;
				this.$refs.file3.value = '';
			},
			remove_img4:function () {
				this.file_img4 = 'img/reward_work.png';
				this.file4_show = false;
				this.$refs.file4.value = '';
			},
			remove_img5:function () {
				this.file_img5 = 'img/reward_work.png';
				this.file5_show = false;
				this.$refs.file5.value = '';
			},
			reward_submit:function () {
				var _this = this;
				console.log(this.content)
				var formData = new FormData();
				formData.append('type',this.type)
				formData.append('id',this.id)
				formData.append('content',this.content)
				formData.append('photo1',this.$refs.file1.files[0])
				formData.append('photo2',this.$refs.file2.files[0])
				formData.append('photo3',this.$refs.file3.files[0])
				formData.append('photo4',this.$refs.file4.files[0])
				formData.append('photo5',this.$refs.file5.files[0])
				$.ajax({
					url:url_ip + '/award/partinaward/',
					type:'POST',
					data:formData,
					datatype:'json',
					headers:{'Authorization':token},
					processData: false,
					contentType : false,
					success: function (data) {
						console.log(data)
						if (data.status) {
							_this.alertmsg(data.msg,1)
							_this.content = '';
							_this.file_img1 = 'img/reward_work.png';
							_this.file_img2 = 'img/reward_work.png';
							_this.file_img3 = 'img/reward_work.png';
							_this.file_img4 = 'img/reward_work.png';
							_this.file_img5 = 'img/reward_work.png';
							_this.file1_show = false;
							_this.file2_show = false;
							_this.file3_show = false;
							_this.file4_show = false;
							_this.file5_show = false;
							_this.$refs.file1.value = '';
							_this.$refs.file2.value = '';
							_this.$refs.file3.value = '';
							_this.$refs.file4.value = '';
							_this.$refs.file5.value = '';
						} else {
							_this.alertmsg(data.msg,0)
						}
					},
					error: function (data) {
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
			file0:function (e) {
				if (e.target.files.length != 0) {
					this.file_name = e.target.files[0].name
					this.$refs.file_submit.style.backgroundImage = 'url(img/file.png)'
				}
			},
			file_submit:function () {
				var _this = this
				var formData = new FormData();
				formData.append('reward_id',this.id)
				formData.append('id',this.canyu_id)
				formData.append('file',this.$refs.file_input.files[0])
				$.ajax({
					url:url_ip + '/award/uploadfile/',
					type:'POST',
					data:formData,
					datatype:'json',
					headers:{'Authorization':token},
					processData: false,
					contentType : false,
					success:function (data) {
						console.log(data)
						if (data.status) {
							_this.alertmsg(data.msg,1)
							_this.file_name = '';
							_this.$refs.file_submit.style.backgroundImage = 'url(img/reward_work.png)'
							_this.$refs.file_input.value = '';
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

		}
	})
})