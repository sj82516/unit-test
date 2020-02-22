const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const md5 = require('md5');

const app = express();

app.use(bodyParser.json());

const dbUrl = "mongodb://localhost:27017"
MongoClient.connect(dbUrl, function(err, client){
    if(err){
        return console.error(err);
    }

    const userCollection = client.db("test").collection("user");

    app.post("/user", function(req, res){
        const {
            account, password
        } = req.body;

        const isAccountValid = verifyAccount(account);
        if(!isAccountValid){
            return res.json(403, {
                message: "AccountInvalid"
            })
        }

        // just for demo
        // never used md5 for hash password in production
        const hashedPassword = md5(password);

        userCollection.findOne({
            account,
            password: hashedPassword
        }, function(err, result){
            if(err){
                return res.json(500, {
                    message: "DBError"
                })
            }
            if(result){
                return res.json(200, {
                    user: result
                })
            }
            return res.json(404, {
                message: "UserNotFound"
            })
        })
    });

    app.listen(3001, function(){
        console.log("server started!");
    })
})

function verifyAccount(account){
    const AccountValidFormat = /@helloworld\.com/;
    return AccountValidFormat.test(account);
}