//#region   阻塞代码\非阻塞代码
//阻塞代码
var fs = require("fs");

var data = fs.readFileSync('input.txt');

console.log(data.toString());

//非阻塞代码
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

//#endregion

//#region 事件监听回调

// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});

// 触发 connection 事件 
eventEmitter.emit('connection');

console.log("程序执行完毕。");

//#endregion

//#region buffer

// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');

//分配
buf = Buffer.alloc(256);
len = buf.write("www.runoob.com");

console.log("写入字节数 : "+  len);//写入字节数 : 14

//
buf = Buffer.alloc(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}
console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde
//转Json
var buf = Buffer.from('www.runoob.com');
var json = buf.toJSON(buf);

console.log(json);//{ type: 'Buffer',
// data: [ 119, 119, 119, 46, 114, 117, 110, 111, 111, 98, 46, 99, 111, 109 ] }


//#endregion

//#region file
var fs = require("fs");

// 异步打开文件
console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
  console.log("文件打开成功！");     
});


//获取文件信息
var fs = require('fs');

fs.stat('/Users/liuht/code/itbilu/demo/fs.js', function (err, stats) {
    console.log(stats.isFile());         //true
})

//写入文件
var fs = require("fs");

console.log("准备写入文件");
fs.writeFile('input.txt', '我是通过写入的文件内容！',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});


//#endregion

//#region Server
// var http = require('http');

// http.createServer(function (request, response) {

//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, { 'Content-Type': 'text/plain' });

//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);

// // 终端打印如下信息
// var url = require('url');
// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));



// 'use strict';
// var path = require('path');

// // 解析当前目录:
// var workDir = path.resolve('.'); // '/Users/michael'

// // 组合完整的文件路径:当前目录+'pub'+'index.html':
// var filePath = path.join(workDir, 'pub', 'index.html');
// // '/Users/michael/pub/index.html'

// 'use strict';
// var
//     fs = require('fs'),
//     url = require('url'),
//     http = require('http');

// // 从命令行参数获取root目录，默认是当前目录:
// var root = path.resolve(process.argv[2] || '.');

// console.log('Static root dir: ' + root);

// // 创建服务器:

// // 取得当前根目录
// let rootPath = path.resolve('.');

// // 开启服务器
// let server = http.createServer(function (request, response) {
//     console.log(`${request.url}`);

//     // 通过url与根目录拼接获取文件地址
//     let filePath = path.join(rootPath, url.parse(request.url).pathname);

//     // 检查文件状态
//     fs.stat(filepath, function (err, stats) {
//         if (!err && stats.isFile()) {
//             // 没有出错并且文件存在:
//             console.log('200 ' + request.url);
//             // 发送200响应:
//             response.writeHead(200);
//             // 将文件流导向response:
//             fs.createReadStream(filepath).pipe(response);
//             //没有必要手动读取文件内容。
//             // 由于response对象本身是一个Writable Stream，
//             // 直接用pipe()方法就实现了自动读取文件内容并输出到HTTP响应。
//         } else {
//             showError(err, response);
//         }
//     });
// });


// // 显示网页
// let showHTML = function (filePath, response) {
//     response.writeHead(200);
//     fs.createReadStream(filePath).pipe(response);
// };

// // 显示错误
// let showError = function (err, response) {
//      // 出错了或者文件不存在:
//      console.log(err);
//      // 发送404响应:
//      response.writeHead(404);
//      response.end('404 Not Found');
// };
// server.listen(8080);

var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');//Post请求体
var postHTML = 
'<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
'<body>' +
'<form method="post">' +
'网站名： <input name="name"><br>' +
'网站 URL： <input name="url"><br>' +
'<input type="submit">' +
'</form>' +
'</body></html>';
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    //获取GET请求内容
    //由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。
    // res.end(util.inspect(url.parse(req.url, true)));
    //在浏览器中访问 http://localhost:3000/user?name=菜鸟教程&url=www.runoob.com 然后查看返回结果:
    
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();
    // 在浏览器中访问 http://localhost:3000/user?name=菜鸟教程&url=www.runoob.com 然后查看返回结果:
   
    // 获取 POST 请求内容
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
 
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
 
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        res.end(util.inspect(post));
    })
}).listen(3000);
console.log('Server is running at http://127.0.0.1:8080/');

//在命令行运行node Server.js C:\Users\Administrator\Documents\GitHub\Nodejs
// 把/path/to/dir改成你本地的一个有效的目录，
// 然后在浏览器中输入http://localhost:8080/index.html
//#endregion

//#region Get submit to json
var express = require('express');
var app = express();
 
app.use(express.static('public'));
 
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
//通过 GET 方法提交两个参数，
//我们可以使用 server.js 文件内的 process_get 路由器来处理输入 
app.get('/process_get', function (req, res) {
 
   // 输出 JSON 格式
   var response = {
       "first_name":req.query.first_name,
       "last_name":req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
//#endregion

//#region 文件上传
var express = require('express');
var app = express();
var fs = require("fs");
 
var bodyParser = require('body-parser');
var multer  = require('multer');
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
//获取路径
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
//上传
app.post('/file_upload', function (req, res) {
 
   console.log(req.files[0]);  // 上传的文件信息
 
   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
//#endregion

//#region 子线程
const fs = require('fs');
const child_process = require('child_process');

for(var i=0; i<3; i++) {
   var workerProcess = child_process.exec('node support.js '+i,//执行support.js
      function (error, stdout, stderr) {
         if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
         }
         console.log('stdout: ' + stdout);
         console.log('stderr: ' + stderr);
      });

      workerProcess.on('exit', function (code) {
      console.log('子进程已退出，退出码 '+code);
   });
}
//fork 方法
const fs = require('fs');
const child_process = require('child_process');
 
for(var i=0; i<3; i++) {
   var worker_process = child_process.fork("support.js", [i]);    

   worker_process.on('close', function (code) {
      console.log('子进程已退出，退出码 ' + code);
   });
}
//#endregion

