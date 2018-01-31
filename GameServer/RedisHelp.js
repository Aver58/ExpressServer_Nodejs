function redisHelp(){
    var redis = require("redis"),
    redisClient = redis.createClient();

    // 连接提示  
    redisClient.on("connect", function(error) {  
        console.log("redisClient connect....");  
    });  
    
    // redis 链接错误提示；  
    redisClient.on("error", function(error) {  
        console.log(error);  
    });  

    this.Insert = function(){
        //写入JavaScript(JSON)对象
        redisClient.hmset('sessionid', { username: 'kris', password: 'password' }, function(err) {
            console.log(err)
        })
    }
    this.read = function(){
        //读取JavaScript(JSON)对象
        redisClient.hgetall('sessionid', function(err, object) {
            console.log(object)
        })
    }
}

module.exports = redisHelp;