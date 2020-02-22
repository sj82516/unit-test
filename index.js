const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const userRouter = require('./user/user.router');

const app = express();

app.use(bodyParser.json());

const dbUrl = "mongodb://localhost:27017"
MongoClient.connect(dbUrl, function(err, client){
    if(err){
        return console.error(err);
    }

    const db = client.db("test");

    app.use("/", userRouter(db));

    app.listen(3001, function(){
        console.log("server started!");
    })
})