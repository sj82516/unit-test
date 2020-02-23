const expect = require('chai').expect;
const sinon = require('sinon');

describe('userManger', () => {
    let userManager = null;
    let sandbox = sinon.createSandbox();
    const findUserStub = sandbox.stub();
    let verifyAccountStub = sandbox.stub();

    const fakeDB = {
        collection: sinon.fake.returns({
            findOne: findUserStub
        })
    }

    before(() => {
        require.cache[require.resolve('../../helper/verifyAccount')] = {
            exports: verifyAccountStub
        };
        delete require.cache[require.resolve('../../user/user.manager')] 
        const UserManager = require('../../user/user.manager');

        userManager = new UserManager(fakeDB);
        expect(fakeDB.collection.args[0][0]).to.be.equal('user');
        expect(fakeDB.collection.calledOnce).to.be.equal(true);
    });

    after(()=>{
        // recover
        require.cache[require.resolve('../../helper/verifyAccount')] = require.resolve('../../helper/verifyAccount')
    })

    afterEach(() => {
        sandbox.resetHistory();
    })

    describe('findUser', () => {
        it('find existed user', async () => {
            const account = "test";
            const password = "test";
            const otherProp = "test";
            findUserStub.returns({
                account,
                password,
                otherProp
            });

            verifyAccountStub.returns(true);

            const user = await userManager.findUser({
                account,
                password
            })

            expect(user).to.deep.equal({
                account,
                password,
                otherProp
            })

            expect(verifyAccountStub.args)
        })

        it('db error', async () => {
            const account = "test";
            const password = "test";
            const otherProp = "test";
            findUserStub.throws("DBError");

            verifyAccountStub.returns(true);
            try {
                const user = await userManager.findUser({
                    account,
                    password
                })

                expect(user).to.deep.equal({
                    account,
                    password,
                    otherProp
                })
            } catch (error) {
                expect(error.name).to.equal("DBError")
            }
        })
    })
})