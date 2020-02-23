const expect = require('chai').expect;

const verifyAccount = require('../../helper/verifyAccount')

describe("verifyAccount", ()=>{
    it('verify valid account', ()=>{
        const validAccount = "test@helloworld.com"
        const result = verifyAccount(validAccount);

        expect(result).to.equal(true);
    })

    it('verify valid account', ()=>{
        const validAccount = "test@wrong.com"
        const result = verifyAccount(validAccount);

        expect(result).to.equal(false);
    })

    it('verify unexpected input', ()=>{
        const validAccount = undefined;
        const result = verifyAccount(validAccount);

        expect(result).to.equal(false);
    })
})