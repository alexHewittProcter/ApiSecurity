import { LoginEmail } from "./LoginEmail";

export class LoginEndpoint {
    constructor() {
        this.loginEmails = [];
        this.blockCallbacks = [];
        this.acceptedAttempts = 3; //Default to 3
    }
    loginFailure(email) {
        let emailObject = this.findEmail(email);
        emailObject.attempts++;
        if(emailObject.attempts >= this.acceptedAttempts) {
            this.callCallbacks();
        }
    }
    loginSucceed(email) {
        let emailObject = this.findEmail(email);
        let objectIndex = this.findEmailIndex(emailObject);
        this.loginEmails.splice(objectIndex,1);
    }
    findEmail(email) {
        const emailArray = this.loginEmails.filter(loginEmail => loginEmail.email === email);
        if(emailArray.length === 1) {
            return emailArray[0];
        } else {
            //Create new object
            let newLoginEmail = new LoginEmail(email);
            this.loginEmails.push(newLoginEmail);
            return newLoginEmail;
        }            
    }
    findEmailIndex(emailObject) {
        return this.loginEmails.indexOf(emailObject);
    }
    addBlockCallback(callback) {
        this.blockCallbacks.push(callback);
    }
    callCallbacks() {
        this.blockCallbacks.forEach(callback => callback());
    }
}