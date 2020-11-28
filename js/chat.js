// var token = "JWT " + window.sessionStorage.token;
var token1 = token;
if (token1 == "JWT " + undefined) {
    token1 = '';
}

$(function () {
	if (window.sessionStorage.im_id) {
        var im_id = window.sessionStorage.im_id;
    } else {
        var im_id = '';
    }
    var sdkAppID = 1400098018;
    var accountType = 28307;
    var avChatRoomId = '@TGS#bCOCYMIF3';  //默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)
    var user_id = '';
    var user_pass = '';
    var identifier = '';
    var identifierNick = '';
    var loginInfo;
    var onGroupSystemNotifys;
    var listeners;
    var options;
    console.log(im_id)
	$.ajax({
        type:'POST',
        url:'http://py.datahoop.cn/push/OnlineServe/',
        aysnc:false,
        data:{im_id:im_id},
        dataType:'json',
        headers:{"Authorization":token1},
        success:function (data) {
            console.log(data);
            user_id = data.name;
            sessionStorage.setItem('im_id',data.name);
            user_pass = data.UserSig;
            console.log(user_id,user_pass)
        },
        error:function (data) {
            console.log(data)
        },
        complete:function () {
            loginInfo = {
                'sdkAppID': sdkAppID, //用户所属应用id,必填
    			'appIDAt3rd': sdkAppID, //用户所属应用id，必填
                'identifier': user_id, //当前用户ID,必须是否字符串类型，必填
                'accountType': accountType, //用户所属应用帐号类型，必填
                'userSig': user_pass, //当前用户身份凭证，必须是字符串类型，必填
                'identifierNick': null //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
            };
            identifier = loginInfo.identifier;
            identifierNick = loginInfo.identifierNick;
            onGroupSystemNotifys = {
                "255": onCustomGroupNotify//用户自定义通知(默认全员接收)
            };
            listeners = {
                "onConnNotify": onConnNotify, //监听连接状态回调变化事件,必填
                "jsonpCallback": jsonpCallback, //IE9(含)以下浏览器用到的jsonp回调函数，
    			"onBigGroupMsgNotify": onBigGroupMsgNotify, //监听新消息(大群)事件，必填
                "onMsgNotify": onMsgNotify, //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
    			"onGroupSystemNotifys": onGroupSystemNotifys //监听（多终端同步）群系统消息事件，必填
            };
            //初始化时，其他对象，选填
            options = {
                'isAccessFormalEnv': true, 
                'isLogOn': false //是否开启控制台打印日志,默认开启，选填
            };
            webimLogin()
        }
    })
    function webimLogin() {
        console.log(loginInfo)
        webim.login(loginInfo, listeners, options,function (resp) {
                console.log(resp)
                loginInfo.identifierNick = resp.identifierNick;//设置当前用户昵称
                loginInfo.headurl = resp.headurl;//设置当前用户头像
                applyJoinBigGroup(avChatRoomId); //加入大群
            },function (err) {
                console.log(err.ErrorInfo);
            }
        );
    }
    //IE9(含)以下浏览器用到的jsonp回调函数
    function jsonpCallback(rspData) {
        webim.setJsonpLastRspData(rspData);
    }
    //监听连接状态回调变化事件
    var onConnNotify = function(resp) {
        var info;
        switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
                break;
            case webim.CONNECTION_STATUS.OFF:
                info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
                console.log(info);
                break;
            case webim.CONNECTION_STATUS.RECONNECT:
                info = '连接状态恢复正常: ' + resp.ErrorInfo;
                console.log(info);
                break;
            default:
                break;
        }
    };
    //监听新消息事件
    //newMsgList 为新消息数组，结构为[Msg]
    function onMsgNotify(newMsgList) {
        var message = newMsgList[0].elems[0].content.text
        // $('.left').append('<p>客服438：'+message+'</p>')
    }
    function onBigGroupMsgNotify(msgList) {}
	function applyJoinBigGroup(groupId) {
	    var options = {
	        'GroupId': groupId //群id
	    };
	    webim.applyJoinBigGroup( 
	        options,
	        function(resp) {
	        	console.log(resp.JoinedStatus)
	        },
	        function(err) {
	            console.log(err.ErrorInfo);
	        }
	    );
	}
	function onCustomGroupNotify(notify) {
        console.log(notify)
        var str = notify.UserDefinedField.replace(/\'/g,'"')
        str = JSON.parse(str)
        console.log(str)
        var msg = str.createtime+' ['+str.user_name+'] '+str.content+'： 《'+str.name+'》';
        tui_msg(msg,str.source)
	}
    var selSess = new webim.Session(webim.SESSION_TYPE.C2C,avChatRoomId, avChatRoomId,'',Math.round(new Date().getTime() / 1000));
    var isSend = true; //是否为自己发送
    var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
    var subType = webim.C2C_MSG_SUB_TYPE.COMMON;
    $('button').click(function () {
        var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, identifier, subType, identifierNick);
        var text = $('input').val();
        msg.addText(text)
        msg.PushInfo = {
            "PushFlag": 0,
            "Desc": '测试离线推送内容', //离线推送内容
            "Ext": '测试离线推送透传内容' //离线推送透传内容
        };
        msg.PushInfoBoolean = true; //是否开启离线推送push同步
        msg.sending = 1;
        msg.originContent = text;
        // addMsg(msg);
        console.log(msg)
        webim.sendMsg(msg, function(resp) {
            // $('.left').append('<p>用户：'+text+'</p>')
            console.log("发消息成功");
            $("#send_msg_text").val('');
        }, function(err) {
            console.log("发消息失败:" + err.ErrorInfo);
        });
    })
    function tui_msg (msg,e) {
        if (e == 2) {
            $('.tui_algo').html(msg)
            $('.tui_algo').stop().fadeIn();
            setTimeout(function () {
                $('.tui_algo').stop().fadeOut();
            },8000)
        } else {
            $('.tui_data').html(msg)
            $('.tui_data').stop().fadeIn();
            setTimeout(function () {
                $('.tui_data').stop().fadeOut();
            },8000)
        }
    }
})