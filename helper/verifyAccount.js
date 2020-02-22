module.exports = function verifyAccount(account){
    const AccountValidFormat = /@helloworld\.com/;
    return AccountValidFormat.test(account);
}