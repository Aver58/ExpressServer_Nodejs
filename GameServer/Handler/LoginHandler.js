//处理登陆信息
function Login (){
    var SQL = require('../MySqlHelp')
    sql = new SQL();
    // var mongoDB = require('../MongoDBHelp')
    // mongo = new mongoDB();
    // var redis = require('../RedisHelp')
  
    this.Code = 1;
    this.Execute = async function(message){
       
        var isPass = await sql.Authenticator(message);//这个异步暂时搞不定，先放着：传不出参数
        console.log('ispass');
        console.log(isPass);
        var ret = {};
        if(1){

            ret = JSON.stringify(000002,{ret:"true",message})
            return ret;
        }
        else
        {  
            ret = JSON.stringify(000002,{ret:"false",message:"没有该用户！"})
            return ret;
        }
    }
}

module.exports = Login;
// ws.upgradeReq是一个request对象:
// let user = parseUser(ws.upgradeReq);

// if (!user) {
//     // Cookie不存在或无效，直接关闭WebSocket:
//     ws.close(4001, 'Invalid user');
//     console.log(ws);
// }
// // 识别成功，把user绑定到该WebSocket对象:
// ws.user = user;
// // 绑定WebSocketServer对象:
// ws.wss = wss;

// // 消息ID:
// var messageIndex = 0;
// //写Json结构体
// function createMessage(type, user, data) {
//     messageIndex ++;
//     return JSON.stringify({
//         id: messageIndex,
//         type: type,
//         user: user,
//         data: data
//     });
// }
// //解析用户名
// function parseUser(obj) {
//     if (!obj) {
//         return;
//     }
//     console.log('try parse: ' + obj);
//     let s = '';
//     if (typeof obj === 'string') {
//         s = obj;
//     } else if (obj.headers) {
//         let cookies = new Cookies(obj, null);
//         s = cookies.get('name');
//     }
//     if (s) {
//         try {
//             let user = JSON.parse(Buffer.from(s, 'base64').toString());
//             console.log(`User: ${user.name}, ID: ${user.id}`);
//             return user;
//         } catch (e) {
//             // ignore
//         }
//     }
//   }