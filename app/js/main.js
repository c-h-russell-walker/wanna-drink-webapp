import { App } from 'spak';
import { ProvidedAppDelegate } from 'spak/providers';
import { component } from 'spak/decorators';
import { ConsoleLogger } from 'spak/providers';
import { renderUI } from './ui';
import { LaunchApp, Login } from './actions';
import UncaughtErrors from './errors/UncaughtErrors';

@component('main')
class MainComponent {
    register() {
        return {
            logger: new ConsoleLogger(),
            uncaughtErrors: new UncaughtErrors(),
            $actions: [
                new LaunchApp(),
                new Login()
            ]
        };
    }
}

App.run(
    new App.Components(new MainComponent()),
    new App.Config(),
    new ProvidedAppDelegate({
        provideLogger({ logger }) {
            return logger;
        },

        provideUncaughtErrors({ uncaughtErrors }) {
            return uncaughtErrors;
        },

        onReady() {
            App.dispatchAction('launchApp', { presenter: this });
        },

        showStartingUp() {
            renderUI();
        },

        showHome() {
            console.log('Show Logged In Homepage!');
        },

        showLogin() {
            App.events.publish('ui.requestLoginForm');
        }
    })
)
