
// const WebSocket = require('ws');
// // 打开一个WebSocket:
// var wss = new WebSocket('ws://localhost:3000/');
// // 响应onmessage事件:
// wss.onmessage = function(msg) { console.log(msg); };
// if(wss.readyState == 1)
// // 给服务器发送一个字符串:
// wss.send('Hello!');


// //http
var http = require('http');
var qs = require('querystring');  
  
var data = {  
    a: 123,  
    time: new Date().getTime()
};//这是需要提交的数据  
  
var content = qs.stringify(data);  
  
var options = {  
    hostname: '127.0.0.1',  
    port: 3000,  
    form: content,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    // path: '/pay/pay_callback?' + content,  
    method: 'GET'  
};  
var req = http.request(options, function (res) {  
    console.log('STATUS: ' + res.statusCode);  
    console.log('HEADERS: ' + JSON.stringify(res.headers)); 
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {  
        console.log('BODY: ' + chunk);  
    });  
});  
  
req.on('error', function (e) {  
    console.log('problem with request: ' + e.message);  
});  
  
req.end(); 




// // 用于请求的选项
// var options = {
//    host: 'localhost',
//    port: '3000',
// //    path: '/index.html'  
// };
// // 处理响应的回调函数
// var callback = function(response){
//    // 不断更新数据
//    var body = '';
//    response.on('data', function(data) {
//       body += data;
//    });
   
//    response.on('end', function() {
//       // 数据接收完成
//       console.log(body);
//    });
// }
// // 向服务端发送请求
// var req = http.request(options, callback);
// req.end();

