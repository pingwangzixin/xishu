/***************************************忘记密码页面************************************************/ 
console.log(url_ip);
// var isOkPhon = false;

//输入框
$(function(){
	$('input').focus(function(){
		$(this).parent().css('border-color','#0e6eb7');
	});
	$('input').blur(function(){
		$(this).parent().css('border-color','');
		$('.forget_box span').html('');
	});
});
var t = 60;
var tid=null;
// 点击取消忘记密码页，跳转到登录页
$(function(){
	$('.cancel').click(function(){
		if(location.search.search('backurl') !== -1) {
			window.open(`login.html${location.search}`);
		}
		else {
			window.open('login.html?noback',"_self");
		}
	});
	var a = /^((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/;
	var b = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
	var c = /^\d{6}$/;
	var tid;
	function xiaoshi () {
		clearTimeout(tid);
		tid = setTimeout(function () {
			$('.forget_box span').html('');
		},5000)
	}
	// 手机号码输入提示
	$('#phone').blur(function () {
		// $('.forget_send').removeClass('forget_sendPre')
		$('.phoneTip').css('color','#ff0000');
		if ($('#phone').val() != '') {
			if (!a.test($('#phone').val())) {
				$('.phoneTip').html('*该手机号不存在');
				// isOkPhon = false;
			} else { //判断手机号是否存在
// 				$.ajax({
// 					async:false, //同步
// 					type: "POST",  
// 					cache: false,//不缓存
// 					url: url_ip+"/exist/",//注意路径
// 					data:{"username":$('#phone').val()}, 
// 					dataType:"json",  
// 					success:function(data){
// 						if (!data.status) {
// 							$('.phoneTip').html('*该用户不存在');
// 							// isOkPhon = false;
// 						} else {
// 							// isOkPhon = true;
// 							$('.forget_send').addClass('forget_sendPre');
// 						}
// 					},
// 					error:function (data) {  
// 						console.log(data)
// 						// isOkPhon = false
// 					}
// 				})
			}
		} else {
			// isOkPhon = false;
		}
	})
	$('#phone_yz').focus(function () {
		$('.yz_phoneTip').html('*有效时长为10分钟')
		$('.yz_phoneTip').css('color','#ff0000');
		// xiaoshi();
	})
	$('#phone_yz').blur(function () {
		$('.yz_phoneTip').css('color','#ff0000');
		if ($('#phone_yz').val() != '' && !c.test($('#phone_yz').val())) {
			$('.yz_phoneTip').html('*验证码长度错误')
		}
	})
	$('#pwd').focus(function () {
		$('.pwdTip').html('*6到16位、数字字母的组合')
		$('.pwdTip').css('color','#ff0000');
		// xiaoshi();
	})
	$('#pwd').blur(function () {
		$('.pwdTip').css('color','#ff0000');
		if ($('#pwd').val() != '' && !b.test($('#pwd').val())) {
			$('.pwdTip').html('*密码格式不正确')
		}
	})
	$('#repet_pwd').focus(function () {
		$('.repet_pwdTip').html('*请与设置密码保持一致')
		$('.repet_pwdTip').css('color','#ff0000');
		// xiaoshi();
	})
	$('#repet_pwd').blur(function () {
		$('.repet_pwdTip').css('color','#ff0000');
		if ($('#repet_pwd').val() != '' && $('#repet_pwd').val() != $('#pwd').val()) {
			$('.repet_pwdTip').html('*两次输入的密码不一致')
		}
	})
	// 获取验证码
	$('.forget_send').click(function () {
		//60s倒计时, 不允许点击
		if ($('#phone').val() == '') {
			$('.phoneTip').html('*手机号不能为空');
		} else if (!a.test($('#phone').val())) {
			$('.phoneTip').html('*请输入正确的手机号');
		} else {
			//验证是否已经注册
			$.ajax({
				async:false, //同步
				type: "POST",  
				cache: false,//不缓存
				url: url_ip+"/exist/",//注意路径
				data:{"username":$('#phone').val()}, 
				dataType:"json",  
				success:function(data){
					if (!data.status) {
						$('.phoneTip').html('*该用户不存在');
						// isOkPhon = false;
					} else {
						// isOkPhon = true;
						//注册用户ok
						$.ajax({  
							async:false, //同步
							type: "POST",  
							cache: false,//不缓存
							url: url_ip+"/send_code/",//注意路径
							data:{"mobile":$('#phone').val(),"type":2}, 
							dataType:"json",  
							success:function(data){
								// $('.forget_send').removeClass('forget_sendPre');
								alert(data.msg);
								//请求成功, 时间重置60s
								t = 60;
								$('.forget_send').html(t+'s');
								clearInterval(tid);
								$('.forget_send').addClass('active');
								tid = setInterval(function(){
									t--;
									if(t>=0){
										$('.forget_send').html(t+'s');
										
									}else if(t<0){
										clearInterval(tid);
										$('.forget_send').html('获取验证码').removeClass('active');
										// $('.forget_send').addClass('forget_sendPre');
									}
								},1000)
							},
							error:function (data) {   
								alert('发送失败')
							}
						});
					}
				},
				error:function (data) {  
					console.log(data)
					// isOkPhon = false
				}
			})
		}
	})
	//确认提交
	$('.forget').click(function () {
		if ($('#phone').val() == '') {
			$('.phoneTip').html('*手机号不能为空');
		} else if (!a.test($('#phone').val())) {
			$('.phoneTip').html('*请输入正确的手机号');
		} else if ($('#phone_yz').val() == '') {
			$('.yz_phoneTip').html('验证码不能为空')
		} else if ($('#pwd').val() == '') {
			$('.pwdTip').html('密码不能为空')
		} else if (!b.test($('#pwd').val())) {
			$('.pwdTip').html('密码格式错误')
		} else if ($('#repet_pwd').val() == '') {
			$('.repet_pwdTip').html('请再次输入密码')
		} else if ($('#repet_pwd').val() != $('#pwd').val()) {
			$('.repet_pwdTip').html('两次密码输入不一致')
		} else {
			$.ajax({
				async:false, //同步
					type: "PUT",  
					cache: false,//不缓存
					url: url_ip+"/forget/"+$('#phone').val()+"/",//注意路径
					data:{mobile:$('#phone').val(),password:$('#pwd').val(),code:$('#phone_yz').val(),"_method":'delete'}, 
					dataType:"json", 
					success:function(data){
						alert('密码重设成功')
						if(location.search.search('backurl') !== -1) {
							window.open(`login.html${location.search}`);
						}
						else {
							window.open('login.html?noback',"_self");
						}
					},
					error:function (data) {
						alert('密码重设失败')
					}
			})
		}
	})
})