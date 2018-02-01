var prefix = './'
var Login = require(prefix +'LoginHandler');
login = new Login();


var handler = {
    1:login
}
// handler.join(login);

module.exports = handler;