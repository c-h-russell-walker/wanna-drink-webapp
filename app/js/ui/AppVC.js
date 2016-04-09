import React from 'react';
import classNames from 'classnames';
import { App } from 'spak';
import { autobind } from './decorators';
import LoginForm from './LoginForm';
import SimpleModal from './SimpleModal';

export default class AppVC extends React.Component {
    constructor() {
        super();
        this.state = {
            hasLoginForm: false,
            modal: null
        };
        this._offs = [
            App.events.on('ui.requestLoginForm', this._showForm),
            App.events.on('ui.requestModal', this._showModal)
        ];
    }

    componentWillUnmount() {
        this._offs.forEach(off => off());
    }

    render() {
        var loginForm = this.state.hasLoginForm ? this._loginForm : null;
        var modal = this.state.modal ? this._renderModal(this.state.modal) : null;

        return (
            <main className={classNames('appvc', this._classes)}>
                <div>
                    <button className="btn" onClick={() => this._handleLogoutClick()}>Logout</button>
                </div>
                <div className="appvc__loader progress">
                    <div className="indeterminate"></div>
                </div>
                {loginForm}
                {modal}
            </main>
        );
    }

    get _loginForm() {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }

    _renderModal({ title, message }) {
        return (
            <SimpleModal
                message={message}
                title={title}
                onComplete={this._closeModal} />
        );
    }

    @autobind
    _handleLogoutClick() {
        App.dispatchAction('logout', { presenter: this });
    }

    @autobind
    _closeModal() {
        this.setState({ modal: null });
    }

    get _classes() {
        return {
            'appvc__is-loading': !this.state.hasLoginForm
        };
    }

    @autobind
    _showForm() {
        this.setState({ hasLoginForm: true });
    }

    @autobind
    _showModal(modal) {
        this.setState({ modal });
    }
}
