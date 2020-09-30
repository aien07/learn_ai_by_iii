var mysql = require('mysql');
// const bluebird = require('bluebird')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alen07'
})

//除錯處理
db.on('error',function(ex){
    console.log('ex:',ex);
})

db.connect();
// bluebird.promisifyAll(db);
module.exports = db;