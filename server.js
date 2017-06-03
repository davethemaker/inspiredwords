const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req,res) => {
    console.log(req.body);
});

app.listen(8080,function(){
    console.log("server up at 8080");
});