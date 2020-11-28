document.write('<script type="text/javascript" src="js/js/jquery.js"></script>');
document.write('<script type="text/javascript" src="js/js/url_ip.js"></script>');
document.write('<script type="text/javascript" src="js/js/make_cookies.js"></script>');
var cookie = {
    set: function (key, val, time) {//设置cookie方法
        var date = new Date(); //获取当前时间
        var expiresDays = time;  //将date设置为n天以后的时间
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
        document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ";path=/";  //设置cookie
    },
    get: function (key) {//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips = arr[1];   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
        return tips;
    },
    delete: function (key) { //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime() - 1); //将date设置为过去的时间
        document.cookie = key + "=v;expires =" + date.toGMTString() + ";path=/";//设置cookie
    }
};
console.log("三方获取token: ",sessionStorage.getItem('token'));
console.log("三方获取token: ",cookie.get('token'));
$.ajax({
    url: 'http://211.159.168.247:9000' + '/userinfo/',
    type: 'GET',
    cache: false,
    async: false,
    data: {},
    dataType: 'json',
    headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
    success: function (res) {
        localStorage.setItem('token', cookie.get('token'))
        user_img = url_ip + res.header;
        token_id = res.user_id;
        user_name_ = res.name;

        cookie.set("user_img", "meiyou");
        cookie.set("membername", user_name_);
        cookie.set("token_id", token_id,);
        cookie.set("token", sessionStorage.getItem('token'));
    },
    error: function (err) {
        cookie.delete("user_img");
        cookie.delete("membername");
        cookie.delete("token_id");
        cookie.delete("token");
    }
})
