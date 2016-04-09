import { App, Action } from 'spak';
import { propInject } from 'spak/decorators';

// Class decorator for setting componentName getter.
// When registered this will be the default name of the action for dispatch.
function action(defaultName) {
    return (target) => {
        target.prototype.ns = defaultName; // Action base class wants a namespace.
        Object.defineProperty(target.prototype, 'componentName', {
            get: () => defaultName,
            enumerable: true
        });
    };
}

@action('launchApp')
export class LaunchApp extends Action {
    exec({ presenter }) {
        presenter.showStartingUp();

        // Simulate longer start/load time.
        setTimeout(() => {
            if (App.session().isAuthenticated) {
                presenter.showHome();
            } else {
                presenter.showLogin();
            }
        }, 1500);
    }
}

@action('login')
@propInject('userGateway')
export class Login extends Action {
    exec({ credentials, presenter }) {
        this.logger.log('Attempt to login w/ credentials', credentials);

        const errors = this._validate(credentials);
        if (errors.length > 0) {
            presenter.showErrorMessage(errors);
            return; // RETURN EARLY! Can't login w/o valid creds.
        }

        return this.userGateway.login(credentials);
    }

    _validate({ username, password }) {
        let errors = [];

        if (username === "" || password === "") {
            errors.push("Missing username/password.");
        } else if (!/^([a-zA-z0-9])*$/.test(username)) {
            errors.push("Username must be alphanumeric.");
        }

        return errors;
    }
}

@action('logout')
@propInject('userGateway')
export class Logout extends Action {
    exec({ presenter }) {
        return this.userGateway.logout();
    }
}

@action('createAccount')
@propInject('userGateway')
export class CreateAccount extends Action {
    exec({ form }) {
        return this.userGateway.createAccount(form);
    }
}

