var mongodb = require('./MongoDBHelp');
var Schema = mongodb.mongoose.Schema;
var LoginSchema = new Schema({
username : String,
password : String
});
var Movie = mongodb.mongoose.model("userInfo", LoginSchema);
var userDAO = function(){};
module.exports = new userDAO();