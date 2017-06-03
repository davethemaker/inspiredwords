const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()


// use MongoLab for cloud-hosted db
MongoClient.connect('mongodb://'+ process.env.DB_USER +':' + process.env.DB_PASS + '@ds161551.mlab.com:61551/inspiredwords', (err,database) => {
   if(err) return console.log(err)
    db = database;

    app.listen(8080,function(){
        console.log("server up at 8080");
    });
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req,res) => {
    console.log(req.body);

    db.collection('quotes').save(req.body, (err,result) => {
        if(err) return console.log(err)

        console.log('saved to db');
        res.redirect('/');
    });
});

