import { App, Action } from 'spak';
import { autobind } from './ui/decorators';

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
export class Login extends Action {
    exec({ credentials }) {
        this.logger.log('Attempt to login w/ credentials', credentials);
        throw new Error(`NotImplemented: Login "${credentials.username}."`);
    }
}


@action('createAccount')
export class CreateAccount extends Action {
    @autobind
    exec({ form }) {
        var formData = new FormData();
        for (let prop in form) {
            formData.append(prop, form[prop]);
        }
        fetch('/api/account', {
            method: 'POST',
            body: formData
        }).then(this._handleFormSubmit, this._handleFetchError);
    }

    _handleFormSubmit(response) {
        response.json().then(function(json) {
            console.log('_handleFormSubmit json: ', json);
        });
    }

    _handleFetchError(error) {
        throw new Error(`Could not post to Create Account: ${error.message}.`);
    }
}
