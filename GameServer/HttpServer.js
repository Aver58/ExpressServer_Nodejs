//http服务器
function MyServer(){
    var http = require('http');
    var fs = require('fs');
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

     //原始创建方式
    this.createServer = function(){
                // 创建服务器
        http.createServer( function (request, response) {  
            // 解析请求，包括文件名
            var pathname = url.parse(request.url).pathname;

            // 输出请求的文件名
            console.log("Request for " + pathname + " received.");

            // 从文件系统中读取请求的文件内容
            fs.readFile(pathname.substr(1), function (err, data) {
               if (err) {
                  console.log(err);
                  // HTTP 状态码: 404 : NOT FOUND
                  // Content Type: text/plain
                  response.writeHead(404, {'Content-Type': 'text/html'});
               }else{             
                  // HTTP 状态码: 200 : OK
                  // Content Type: text/plain
                  response.writeHead(200, {'Content-Type': 'text/html'});    

                  // 响应文件内容
                  response.write(data.toString());        
               }
               //  发送响应数据
               response.end();

            });   
        }).listen(8080);
         
        // 控制台会输出以下信息
        console.log('Server running at http://127.0.0.1:8080/');
        
        //在命令行运行node Server.js C:\Users\Administrator\Documents\GitHub\Nodejs
        // 把/path/to/dir改成你本地的一个有效的目录，
        // 然后在浏览器中输入http://localhost:8080/index.html
    }
    //express框架服务器
    this.express = function(){
        var express = require('express');
        var app = express();
        var fs = require("fs");

        var bodyParser = require('body-parser');
        var multer  = require('multer');

        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(multer({ dest: '/tmp/'}).array('image'));

        //获取路径http://localhost:8081/index.html
        app.get('/index.html', function (req, res) {
           res.sendFile( __dirname + "/" + "index.html" );//找到目录下的index.html
        })


        ///处理请求部分
        app.get('',function(req, res){
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            // 解析 url 参数
            var params = url.parse(req.url, true).query;
            res.write("网站名：" + params.name);
            res.write("\n");
            res.write("网站 URL：" + params.url);
            // 输出 JSON 格式
            var response = {
                "first_name":req.query.first_name,
                "last_name":req.query.last_name
            };
            console.log(response);
            res.end(JSON.stringify(response));

            })


        //上传部分
        app.post('/file_upload', function (req, res) {
           console.log(req.files[0]);  // 上传的文件信息

           var des_file = __dirname + "/" + req.files[0].originalname;  //目标文件
           fs.readFile( req.files[0].path, function (err, data) {       //读取请求文件
                fs.writeFile(des_file, data, function (err) {           //写入目标文件
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
            console.log("Http服务器应用实例已启动，访问地址为 http://%s:%s", host, port)
            // server.addListener("connection",)
            // var mysql = require('mysql');
            // var SQL   = require('./MySqlHelp');
            // sss = new SQL();
            // sss.Select();
        })
    }
}
module.exports = MyServer;
