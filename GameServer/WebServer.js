//WebSocket服务器
function WebSocketServer(){
    // 导入WebSocket模块:
    const WebSocket = require('ws');
    // 引用Server类:
    const WebServer = WebSocket.Server;
    // 实例化:
    const wss = new WebServer({
        port: 3000
    });
    
    this.InitWebServer = function(){
        console.log("WebServer服务器应用实例已启动，访问地址为 http://%s : %s",
                 wss.Server,wss.port)
        wss.on('connection', function (ws) {
            console.log(`[SERVER] connection()`);
        
            ws.on('message', function (message) {
                console.log(`[SERVER] Received: ${message}`);
                
                //服务器处理请求
    
                //服务器返回
                ws.send(`ECHO: ${message}`, (err) => {
                    if (err) {
                        console.log(`[SERVER] error: ${err}`);
                    }
                });
            })
        });
    }
    
}
module.exports = WebSocketServer;








