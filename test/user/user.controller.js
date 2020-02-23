const expect = require('chai').expect;
const sinon = require('sinon');

const UserManager = require('../../user/user.manager');
const UserController = require('../../user/user.controller');

describe('userController', () => {
    const sandbox = sinon.createSandbox();

    const findUserStub = sandbox.stub();
    const fakeDB = {
        collection: sinon.fake.returns({
            findOne: findUserStub
        })
    }
    const userManager = new UserManager(fakeDB);
    const userController = new UserController({
        userManager
    })


    const jsonResponseStub = sandbox.stub();
    const res = {
        json: jsonResponseStub
    }

    afterEach(() => {
        sandbox.resetHistory();
    })

    describe('handleUserLogin', () => {
        it('existed user login', async () => {
            const account = "test@helloworld.com";
            const password = "test";
            const otherProp = "test";
            findUserStub.returns({
                account,
                password,
                otherProp
            });


            const req = {
                body: {
                    account,
                    password,
                    otherProp
                }
            }
            await userController.handleUserLogin(req, res);

            expect(res.json.args[0][0]).to.equal(200);
            expect(res.json.args[0][1]).to.deep.equal({
                user: {
                    account,
                    password,
                    otherProp
                }
            });
        })

        it('invalid user account', async () => {
            const account = "invalid@wrong.com";
            const password = "test";
            const otherProp = "test";

            const req = {
                body: {
                    account,
                    password,
                    otherProp
                }
            }
            await userController.handleUserLogin(req, res);

            expect(res.json.args[0][0]).to.equal(400);
            expect(res.json.args[0][1]).to.deep.equal({
                message: "InvalidAccount"
            });
        })
    })
})