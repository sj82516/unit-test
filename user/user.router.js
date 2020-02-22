const Router = require('express').Router;

const UserController = require('./user.controller');
const UserManager = require('./user.manager');
module.exports = function (db) {
    const router = Router();

    const userManager = new UserManager(db);
    const userController = new UserController({
        userManager
    });

    router.post("/login", userController.handleUserLogin);

    return router;
}