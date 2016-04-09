import ApiGateway from "./ApiGateway";
import { formDataConverter } from '../ui/decorators';


export default class UserGateway extends ApiGateway {
    @formDataConverter
    login(credentials) {
        this.fetch('/login', {
            method: 'POST',
            body: credentials
        });
    }

    logout() {
        this.fetch('/logout', { method: 'POST' });
    }

    @formDataConverter
    createAccount(form) {
        this.fetch('/account', {
            method: 'POST',
            body: form
        });
    }
}
