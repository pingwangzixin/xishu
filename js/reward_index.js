$(function () {
	var vm = new Vue ({
		el:'#reward',
		data:{
			type:1,/*算法*/
			url:url_ip,
			hot_list:[],
			money_list:[],
			new_list:[],
			mine_list:[],
			now_user:''
		},
		created () {
			if (window.location.search.substr(1) == 'sf') {
				this.type = 1;
			} else if (window.location.search.substr(1) == 'sj') {
				this.type = 0;
			} else {
				this.type = 1;
			}
			var _this = this
			$.ajax({
				url:url_ip + '/award/rewardindex/',
				type:'GET',
				async:false,
				data:{type:this.type},
				datatype:'json',
				success:function (data) {
					console.log(data)
					if (data.status) {
						_this.hot_list = data.hot_data
						_this.money_list = data.money_data
						_this.new_list = data.new_data
						_this.now_user = data.now_user_id
					}
				},
				error:function (data) {
					console.log(data)
				}
			}),
			$.ajax({
				url:url_ip + '/award/getmyaward/',
				type:'GET',
				async:false,
				data:{type:this.type},
				datatype:'json',
				headers:{'Authorization':token},
				success:function (data) {
					console.log(data)
					if (data.status) {
						_this.mine_list = data.data
					}
				},
				error:function (data) {
					console.log(data)
				}
			})
		},
		methods:{
			detail:function (e) {
				if (this.now_user == e.target.getAttribute('data-user')) {
					window.location.href = 'reward_detail.html?' + e.target.getAttribute('data-id')
				} else {
					window.location.href = 'reward_join.html?' + e.target.getAttribute('data-id')
				}
			},
			more:function (e) {
				window.sessionStorage.setItem("keyword",'');
				window.sessionStorage.setItem("rank",e);
				window.sessionStorage.setItem("type",this.type);
				window.location.href = 'rewards.html'
			}
		},
		mounted () {
			
		},
		watch:{

		}
	})
})
$(function () {
	$('.public_search').click(function () {
		window.sessionStorage.setItem("keyword",$(this).prev().val());
		window.sessionStorage.setItem("rank",'');
		if (window.location.search.substr(1) == 'sj') {
			window.sessionStorage.setItem("type",0);
		} else {
			window.sessionStorage.setItem("type",1);
		}
		window.location.href = 'rewards.html'
	})
})