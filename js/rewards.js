$(function () {
	var vm = new Vue({
		el:'#reward',
		data:{
			type_arr:[],
			keyword:'',
			type:'',
			rank:'',
			url:url_ip,
			rank_list:[],
			now_user:''
		},
		created () {
			this.keyword = window.sessionStorage.getItem('keyword');
			this.type = window.sessionStorage.getItem('type');
			this.rank = window.sessionStorage.getItem('rank');
			if (this.type == 1) {
				this.type_arr = ['文本分析','机器学习','计算机视觉','深度学习']
			} else {
				this.type_arr = ['商业','文化','环境','生活','社会','体育','教育','科技','时政']
			}
			var _this = this
			$.ajax({
				url:url_ip + '/award/searchreward/',
				type:'GET',
				async:false,
				data:{type:this.type,rank_type:this.rank,keyword:this.keyword,classify:''},
				datatype:'json',
				success:function (data) {
					console.log(data)
					if (data.status) {
						_this.rank_list = data.data
						_this.now_user = data.now_user_id
					}
				},
				error:function (data) {
					console.log(data)
				}
			})
		},
		methods:{
			type_search:function (e) {
				var _this = this
				$.ajax({
					url:url_ip + '/award/searchreward/',
					type:'GET',
					async:false,
					data:{type:this.type,rank_type:'',keyword:'',classify:e.target.innerHTML},
					datatype:'json',
					success:function (data) {
						console.log(data)
						if (data.status) {
							_this.rank_list = data.data
							_this.now_user = data.now_user_id
						}
					},
					error:function (data) {
						console.log(data)
					}
				})
			},
			public_search:function (e) {
				var _this = this
				$.ajax({
					url:url_ip + '/award/searchreward/',
					type:'GET',
					async:false,
					data:{type:this.type,rank_type:'',keyword:this.keyword,classify:''},
					datatype:'json',
					success:function (data) {
						console.log(data)
						if (data.status) {
							_this.rank_list = data.data
							_this.now_user = data.now_user_id
						}
					},
					error:function (data) {
						console.log(data)
					}
				})
			},
			detail:function (e) {
				if (this.now_user == e.target.getAttribute('data-user')) {
					window.location.href = 'reward_detail.html?' + e.target.getAttribute('data-id')
				} else {
					window.location.href = 'reward_join.html?' + e.target.getAttribute('data-id')
				}
			}
		}
	})
})