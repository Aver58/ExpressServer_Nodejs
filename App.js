var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//#region 消息handler
var Login = require('./GameServer/Handler/LoginHandler');
login = new Login();

var handlers = new Array(50);

handlers = {
	1: login
}

//#endregion

//访问返回index.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});


//#region  websocket

const WebSocket = require('ws');// 导入WebSocket模块:
const WebSocketServer = WebSocket.Server;// 引用Server类:

//无论是WebSocket请求，还是普通HTTP请求，都会被http.Server处理。
const wss = new WebSocketServer({
	port: 3001,
	// server: server   //把WebSocketServer绑定到同一个端口 
});
console.log('WebSocket Server listening on *:3001');

//连接上
wss.on('connection', function (ws) {
	console.log(`[SERVER] connection()`);
	//   console.log(ws);

	//收到消息
	ws.on('message', function (message) {
		console.log(`[SERVER] Received: ${message}`);
		msgCode = message.substring(0,1);
		msgBody = message.substring(1);
		//让子处理器去处理
		var Handler = null;
		Object.keys(handlers).forEach(function(key){
			if (key = msgCode) {
				Handler = handlers[key];
			}
	   });
		if (Handler === null) {
			wss.broadcast("no handler");
		} else {
			var res = Handler.Execute(msgBody);
			console.log('res');
			console.log(res);
			wss.broadcast(res);
		}
		//   let msg = createMessage('chat', this.user, message);
		//   wss.broadcast(msg);
	})
});

//广播信息
wss.broadcast = function (data) {
	wss.clients.forEach(function (client) {
		client.send(`ECHO: ${data}`, (err) => {
			if (err) {
				console.log(`[SERVER] error: ${err}`);
			}
		});
	});
};

// 消息ID:
var messageIndex = 0;
//写Json结构体
function createMessage(type, user, data) {
	messageIndex++;
	return JSON.stringify({
		id: messageIndex,
		type: type,
		user: user,
		data: data
	});
}
// var expressWs = require('express-ws')(app);  
// var util = require('util');  

// app.use(express.static('./static'));      
// app.ws('/', function(ws, req) {  
//   util.inspect(ws);  
//   ws.on('message', function(msg) {  
//     console.log('_message');  
//     console.log(msg);  
//     ws.send('echo:' + msg);  
//   });  
// })  
//#endregion

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// 捕获错误然后送到错误处理
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// 错误处理
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// 渲染错误页面
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
