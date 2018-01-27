//初始化http服务器
// var HttpServer = require('./HttpServer');
// myServer = new HttpServer();
// myServer.express();

// 初始化websocket服务器
var webSocket = require('./WebServer');
ws = new webSocket();
ws.InitWebServer();

// var webClient = require('./WebClient');
// wc = new webClient();

//初始化数据库
var SQL = require('./MySqlHelp');
mySQL = new SQL();
// mySQL.Select('SELECT * FROM userinfo');

//初始化MongoDB
var mongoDB = require('./MongoDBHelp');
mongo = new mongoDB();
// mongo.test();
// mongo.Insert();
