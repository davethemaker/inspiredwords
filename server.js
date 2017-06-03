const express = require('express');
const app = express();



app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080,function(){
    console.log("server up at 8080");
});