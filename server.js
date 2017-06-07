const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require("mongodb").MongoClient;

require('dotenv').config()

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public')); // static resources here

app.set('views',__dirname + '/views');
app.set('view engine','ejs');  // set ejs as view engine

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // get server to read JSON data

// use MongoLab for cloud-hosted db
MongoClient.connect( process.env.PROD_MONGODB, (err,database) => {
   if(err) return console.log(err)
    db = database;

    app.get('/',(req,res) => {
    // cursor is a Mongo Object
        db.quotes.find().toArray(function(err,result){
          if(err) return console.log(err)
          // console.log(results);
          res.render('index.ejs', {quotes: result});
        });
     });


    app.post('/quotes', (req,res) => {
        console.log(req.body);

        db.collection('quotes').save(req.body, (err,result) => {
            if(err) return console.log(err)

            console.log('saved to db');
            res.redirect('/');
         });
        // res.sendFile(__dirname + '/index.html');
     });

    app.put('/quotes',(req,res) =>{
        db.collection('quotes').findOneAndUpdate(
        { author: req.body.author },
        {
            $set: {
                author: req.body.new_author,
                quote: req.body.quote
            }
        },
        {
            sort: {_id: -1},
            upsert:true
        },
        (err,result) => {
            if(err) return res.send(err)
            res.send(result)
        }
      )
    });

    app.delete('/quotes',(req,res) =>{
       db.collection('quotes').findOneAndDelete(

        {author: req.body.author},
        (err,result) => {
            if(err) return res.send(500,err)
            res.send({message: 'quote deleted'})
        })
    });

    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });

});






