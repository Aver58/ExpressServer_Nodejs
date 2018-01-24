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

'use strict';

var path = require('path');

// 解析当前目录:
var workDir = path.resolve('.'); // '/Users/michael'

// 组合完整的文件路径:当前目录+'pub'+'index.html':
var filePath = path.join(workDir, 'pub', 'index.html');
// '/Users/michael/pub/index.html'

'use strict';

var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

// 创建服务器:

// 取得当前根目录
let rootPath = path.resolve('.');

// 开启服务器
let server = http.createServer(function (request, response) {
    console.log(`${request.url}`);

    // 通过url与根目录拼接获取文件地址
    let filePath = path.join(rootPath, url.parse(request.url).pathname);

    // 检查文件状态
    fs.stat(filePath, function (err, stats) {
        if (err) {
            showError(err, response)
        } else if (stats.isDirectory()) {
            // 如果是目录则检查目录下index.html文件
            let indexFilePath = path.join(filePath, 'index.html');
            console.log(`Check file "${indexFilePath.toString()}"`);
            fs.stat(indexFilePath, function (err, stats) {
                if (err) {
                    // 如果index.html找不到则检查default.html文件
                    let defaultFilePath = path.join(filePath, 'default.html');
                    console.log(`Check file "${defaultFilePath.toString()}"`);
                    fs.stat(defaultFilePath, function (err, stats) {
                        if (err) {
                            showError(err, response);
                        } else {
                            console.log(`Success open file "${defaultFilePath.toString()}"`);
                            showHTML(defaultFilePath, response);
                        }
                    })
                } else {
                    console.log(`Success open file "${indexFilePath.toString()}"`);
                    showHTML(indexFilePath, response);
                }
            })
        } else {
            console.log(`Success open file "${filePath.toString()}"`);
            showHTML(filePath, response);
        }
    })
});
    // fs.stat(filepath, function (err, stats) {
    //     if (!err && stats.isFile()) {
    //         // 没有出错并且文件存在:
    //         console.log('200 ' + request.url);
    //         // 发送200响应:
    //         response.writeHead(200);
    //         // 将文件流导向response:
    //         fs.createReadStream(filepath).pipe(response);
    //         //没有必要手动读取文件内容。
    //         // 由于response对象本身是一个Writable Stream，
    //         // 直接用pipe()方法就实现了自动读取文件内容并输出到HTTP响应。
    //     } else {
    //         showError(err, response);
    //     }
    // });

// 显示网页
let showHTML = function (filePath, response) {
    response.writeHead(200);
    fs.createReadStream(filePath).pipe(response);
};

// 显示错误
let showError = function (err, response) {
     // 出错了或者文件不存在:
     console.log(err);
     // 发送404响应:
     response.writeHead(404);
     response.end('404 Not Found');
};
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');

//在命令行运行node Server.js D:\git\Nodejs
// 把/path/to/dir改成你本地的一个有效的目录，
// 然后在浏览器中输入http://localhost:8080/index.html