import { LoginEndpoint } from './index';

export class ApiSecurity {  
    constructor() {
        this.loginEndpoint = new LoginEndpoint();
    }
    loginBlockCallback(callback) {
        this.loginEndpoint.addBlockCallback(callback);
    }
    loginFailure(email) {
        this.loginEndpoint.loginFailure(email);
    }
    loginSucceed(email) {
        this.loginEndpoint.loginSucceed(email);
    }
}