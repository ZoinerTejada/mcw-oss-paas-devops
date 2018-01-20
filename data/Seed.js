var mongoose = require('mongoose');
import User from "../src/components/user/User";
var bcrypt = require('bcryptjs');

function encryptPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.state.password, salt);
    return hash;
}

var http = require('http');
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World\n');
    }).listen(1337, "127.0.0.1");
    console.log('Server running at http://127.0.0.1:1337/');

var user = new User({
    email: 'demouser@bfyo.com',
    password: encryptPassword('Password.1!!'),
    firstName: 'Demo',
    lastName: 'User',
    address1: '123 Main St',
    city: 'Carmel',
    state: 'IN',
    postalCode: '46033',
    phone: '3175551212'
});