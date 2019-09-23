const assert = require('assert');
const { ApiSecurity } = require('../dist');

describe("ApiSecurity class functionality",function() {
    let apiSecurity = new ApiSecurity();
    describe("Login functionality",function() {
        let loginBlocked = false;
        this.beforeEach(function() {
            loginBlocked = false;
            apiSecurity = new ApiSecurity();
            apiSecurity.loginBlockCallback(() => {
                loginBlocked = true;
                // console.log("Callback");
            });
        })
        it("Should call callback with 3 incorrect passwords, using default",function() {
            apiSecurity.loginFailure("test@email.com");
            apiSecurity.loginFailure("test@email.com");
            apiSecurity.loginFailure("test@email.com");
            assert.equal(loginBlocked,true);
        });
        it("Should call callback with 5 incorrect passwords, when variable set",function() {
            apiSecurity.loginEndpoint.acceptedAttempts = 5;
            apiSecurity.loginFailure("test@email.com");
            apiSecurity.loginFailure("test@email.com");
            apiSecurity.loginFailure("test@email.com");
            apiSecurity.loginFailure("test@email.com");
            apiSecurity.loginFailure("test@email.com");
            assert.equal(loginBlocked,true);
        });
        it("Should not call the callback when 2 incorrect,1 correct and 1 incorrect passwords have been used",function() {
            apiSecurity.loginFailure("test@email.com");
            apiSecurity.loginFailure("test@email.com");
            apiSecurity.loginSucceed("test@email.com");
            apiSecurity.loginFailure("test@email.com");
            assert.equal(loginBlocked,false);
        });
    });
});