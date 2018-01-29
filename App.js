var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http').Server(app);
//socket.io通过传递http（HTTP服务器）对象来初始化一个新的实例。然后，我收听connection传入套接字的事件，并将其记录到控制台
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.emit('chat message',msg);
    });
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//#region  websocket

// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
//无论是WebSocket请求，还是普通HTTP请求，都会被http.Server处理。
const wss = new WebSocketServer({
    port: 3000,
    // server: http.server//把WebSocketServer绑定到同一个端口 
});
console.log(wss);

// wss.on('connection', function (ws) {
//     console.log(111);
// })

// wss.on('connection', function (ws) {
//   console.log(`[SERVER] connection()`);
//   ws.on('message', function (message) {
//       console.log(`[SERVER] Received: ${message}`);
//       ws.send(`ECHO: ${message}`, (err) => {
//           if (err) {
//               console.log(`[SERVER] error: ${err}`);
//           }
//       }); 
//   })
// });

// wss.on('message', function (message) {
//   console.log(message);
//   if (message && message.trim()) {
//       let msg = createMessage('chat', this.user, message.trim());
//       this.wss.broadcast(msg);
//   }
// });
// // 消息ID:
// var messageIndex = 0;

// function createMessage(type, user, data) {
//     messageIndex ++;
//     return JSON.stringify({
//         id: messageIndex,
//         type: type,
//         user: user,
//         data: data
//     });
// }

// wss.on('connection', function (ws) {
//   // ws.upgradeReq是一个request对象:
//   let user = parseUser(ws.upgradeReq);
//   if (!user) {
//       // Cookie不存在或无效，直接关闭WebSocket:
//       ws.close(4001, 'Invalid user');
//   }
//   // 识别成功，把user绑定到该WebSocket对象:
//   ws.user = user;
//   // 绑定WebSocketServer对象:
//   ws.wss = wss;
// });

// wss.broadcast = function (data) {
//   wss.clients.forEach(function (client) {
//       client.send(data);
//   });
// };
// //解析用户名
// function parseUser(obj) {
//   if (!obj) {
//       return;
//   }
//   console.log('try parse: ' + obj);
//   let s = '';
//   if (typeof obj === 'string') {
//       s = obj;
//   } else if (obj.headers) {
//       let cookies = new Cookies(obj, null);
//       s = cookies.get('name');
//   }
//   if (s) {
//       try {
//           let user = JSON.parse(Buffer.from(s, 'base64').toString());
//           console.log(`User: ${user.name}, ID: ${user.id}`);
//           return user;
//       } catch (e) {
//           // ignore
//       }
//   }
// }

//#endregionvar app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.emit('chat message',msg);
    });
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//#region  websocket

// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
//无论是WebSocket请求，还是普通HTTP请求，都会被http.Server处理。
const wss = new WebSocketServer({
    port: 3000,
    // server: http.server//把WebSocketServer绑定到同一个端口 
});
console.log(wss);

// wss.on('connection', function (ws) {
//     console.log(111);
// })

// wss.on('connection', function (ws) {
//   console.log(`[SERVER] connection()`);
//   ws.on('message', function (message) {
//       console.log(`[SERVER] Received: ${message}`);
//       ws.send(`ECHO: ${message}`, (err) => {
//           if (err) {
//               console.log(`[SERVER] error: ${err}`);
//           }
//       }); 
//   })
// });

// wss.on('message', function (message) {
//   console.log(message);
//   if (message && message.trim()) {
//       let msg = createMessage('chat', this.user, message.trim());
//       this.wss.broadcast(msg);
//   }
// });
// // 消息ID:
// var messageIndex = 0;

// function createMessage(type, user, data) {
//     messageIndex ++;
//     return JSON.stringify({
//         id: messageIndex,
//         type: type,
//         user: user,
//         data: data
//     });
// }

// wss.on('connection', function (ws) {
//   // ws.upgradeReq是一个request对象:
//   let user = parseUser(ws.upgradeReq);
//   if (!user) {
//       // Cookie不存在或无效，直接关闭WebSocket:
//       ws.close(4001, 'Invalid user');
//   }
//   // 识别成功，把user绑定到该WebSocket对象:
//   ws.user = user;
//   // 绑定WebSocketServer对象:
//   ws.wss = wss;
// });

// wss.broadcast = function (data) {
//   wss.clients.forEach(function (client) {
//       client.send(data);
//   });
// };
// //解析用户名
// function parseUser(obj) {
//   if (!obj) {
//       return;
//   }
//   console.log('try parse: ' + obj);
//   let s = '';
//   if (typeof obj === 'string') {
//       s = obj;
//   } else if (obj.headers) {
//       let cookies = new Cookies(obj, null);
//       s = cookies.get('name');
//   }
//   if (s) {
//       try {
//           let user = JSON.parse(Buffer.from(s, 'base64').toString());
//           console.log(`User: ${user.name}, ID: ${user.id}`);
//           return user;
//       } catch (e) {
//           // ignore
//       }
//   }
// }

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
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});
module.exports = app;
