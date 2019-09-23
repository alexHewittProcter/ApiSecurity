const { LoginEndpoint } = require('../dist');
const assert = require('assert');

/**
 * Test the LoginEmail array is empty upon init
 * An email address should be added when there is a login failure
 * An email address should be removed when a login success has happened
 * The findEmail method should return an object with the correct email address either by creating it or retrieving from array
 * findEmailIndex method should return an index of the objects location in the array
 * addBlockCallback should add a callback function
 * addBlockCallback should be able to add multiple callbacks
 * callCallbacks method should be able to call all callbacks, no matter how many there are
 * Accepted attempts should be 3 by default
 * Changing accepted attempts variable should change the attempts before callback
 */
describe("Login endpoint functionality",function() {
    
    let loginEndpoint = new LoginEndpoint();
    this.beforeEach(function() {
        loginEndpoint = new LoginEndpoint();
    });
    it("Should have no login emails after init",function() {
        assert.equal(loginEndpoint.loginEmails.length,0);
    });
    it("Should add an email address to the login emails when a failed login attempt occurs",function() {
        assert.equal(loginEndpoint.loginEmails.length,0,'Make sure the array is empty first');
        loginEndpoint.loginFailure("test@email.com");
        assert.equal(loginEndpoint.loginEmails.length,1,'One LoginEmail added');
        assert.equal(loginEndpoint.loginEmails[0].email,'test@email.com','Email is the same as login failure');
        assert.equal(loginEndpoint.loginEmails[0].attempts,1,'Make sure there is only one attempt');
    });
    it("Should remove an email address when the login is successful",function() {
        loginEndpoint.loginFailure("test@email.com");
        loginEndpoint.loginSucceed("test@email.com");
        assert.equal(loginEndpoint.loginEmails.length,0,"Check if array is empty");
    });
    it("The findEmail method should return an object with the correct email address either by creating it or retrieving from array",function() {
        let returnedObject = loginEndpoint.findEmail("test@email.com");
        assert.equal(returnedObject.email,"test@email.com");
    });
    it("findEmailIndex method should return an index of the objects location in the array",function() {
        loginEndpoint.loginFailure("test@email.com");
        loginEndpoint.loginFailure("test2@email.com");
        let object = loginEndpoint.findEmail("test2@email.com");
        assert.equal(loginEndpoint.findEmailIndex(object),1);
    });
    it("addBlockCallback should add a callback function",function() {
        let changedVariable = false;
        const callback = () => changedVariable = true;
        loginEndpoint.addBlockCallback(callback);
        loginEndpoint.loginFailure("test@email.com");
        loginEndpoint.loginFailure("test@email.com");
        loginEndpoint.loginFailure("test@email.com");
        assert.equal(changedVariable,true);
    });
    it("addBlockCallback should be able to add multiple callbacks",function() {
        let changedVariable1 = false;
        let changedVariable2 = false;
        const callback1 = () => changedVariable1 = true;
        const callback2 = () => changedVariable2 = true;
        loginEndpoint.addBlockCallback(callback1);
        loginEndpoint.addBlockCallback(callback2);
        loginEndpoint.loginFailure("test@email.com");
        loginEndpoint.loginFailure("test@email.com");
        loginEndpoint.loginFailure("test@email.com");
        assert.equal(changedVariable1 && changedVariable2, true);
    });
    it("callCallbacks method should be able to call all callbacks, no matter how many there are",function() {
        let changedVariable1 = false;
        let changedVariable2 = false;
        const callback1 = () => changedVariable1 = true;
        const callback2 = () => changedVariable2 = true;
        loginEndpoint.addBlockCallback(callback1);
        loginEndpoint.addBlockCallback(callback2);
        loginEndpoint.callCallbacks();
        assert.equal(changedVariable1 && changedVariable2, true);
    });
    it("Accepted attempts should be 3 by default",function() {
        let changedVariable = false;
        loginEndpoint.addBlockCallback(() => changedVariable = true);
        loginEndpoint.loginFailure("test@email.com");
        loginEndpoint.loginFailure("test@email.com");
        loginEndpoint.loginFailure("test@email.com");
        assert.equal(changedVariable,true);
    });
    it("Changing accepted attempts variable should change the attempts before callback",function() {
        let changedVariable = false;
        loginEndpoint.acceptedAttempts = 5;
        loginEndpoint.addBlockCallback(() => changedVariable = true);
        loginEndpoint.loginFailure("test@email.com");
        loginEndpoint.loginFailure("test@email.com");
        loginEndpoint.loginFailure("test@email.com");
        assert.equal(changedVariable,false,"3 Logins does not call callback");
        loginEndpoint.loginFailure("test@email.com");
        loginEndpoint.loginFailure("test@email.com");
        assert.equal(changedVariable,true);
    });
});