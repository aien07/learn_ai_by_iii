var express = require('express');

var app = express();

app.set('view engine', 'ejs');

// 解析 post urlencoded 的 middleware
app.use(express.urlencoded({ extended: false }));

// 解析 json 的 middleware
app.use(express.json());

app.get('/', function(req, res){
    res.redirect('/detectimage');
})

app.get('/detectimage',function(req,res){
    res.render('detectimage', {title:'detectimage',pageName:'detectimage'})
})

app.get('/luisai',function(req,res){
    res.render('luisai', {title:'luisai',pageName:'luisai'})
})

// app.get('/urlinmysql',function(req,res){

// })
app.use('/urlinmysql', require(__dirname + '/urlinmysql'));

app.use(express.static('public'));

// app.use((req, res)=>{
//     res.type('text/html');
//     res.status(404);
//     res.send('<h2>WebPage is not Found!<h2>')
// })

app.listen(3001,() =>{
    console.log('project start');
    console.log('server start in port 3001');
})