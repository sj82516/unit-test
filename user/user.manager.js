const md5 = require('md5');
const MongoDBType = require("mongodb");

const verifyAccount = require('../helper/verifyAccount');

/**
 *
 *
 * @param {MongoDBType.Db} db 
 */
function UserManager(db){
    const userCollection = db.collection("user");

    this.findUser = async function({
        account, 
        password
    }){
        if(!account || !password){
            throw "ParamMissing"
        }
        const isValidAccount = verifyAccount(account);
        // just for demo
        // never used md5 for hash password in production
        const hashedPassword = md5(password);

        if(isValidAccount){
            throw "InvalidAccount"
        }

        const user = await userCollection.findOne({
            account,
            password: hashedPassword
        })

        if(!user){
            throw "UserNotFound"
        }

        return user;
    }
}

module.exports = UserManager