// 加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 加载路由控制
var index = require('./routes/index');
var users = require('./routes/users');
// 创建项目实例
var app = express();

var handlers = require('./GameServer/Handler/Handlers');//处理器们

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
console.log('WebSocket Server listening on * : '+wss.port);

//连接上
wss.on('connection', function (ws) {
	console.log(`[SERVER] connection()`);

	//收到消息
	ws.on('message', function (message) {
		console.log(`[SERVER] Received: ${message}`);
		msgCode = parseInt(message.substring(0,6));
		msgBody = message.substring(6);
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
			// ret = new Promise((resolve,reject)=>{
			var res = Handler.Execute(msgBody);
			console.log(res);
			wss.broadcast(res);
			
		}
	})
});
// wss.handleMessage = async function(handler,data){
// 	console.log('handler');
// 	console.log(handler);
	
// 	var res = await handler.Execute(data);
// 	console.log('res');
// 	console.log(res);
// 	wss.broadcast(res);
// }

//广播信息
wss.broadcast = function (data) {
	wss.clients.forEach(function (client) {
		// client.send(`${data}`, (err) => {
			
		client.send(data, (err) => {
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

// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));// 定义日志和输出级别
app.use(bodyParser.json());// 定义数据解析器
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());// 定义cookie解析器	
app.use(express.static(path.join(__dirname, 'public')));// 定义静态文件目录
// 匹配路径和路由
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
