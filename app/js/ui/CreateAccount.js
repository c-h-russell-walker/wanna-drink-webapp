import React from 'react';
import classNames from 'classnames';
import { App } from 'spak';
import { autobind, preventDefault } from './decorators';

export default class CreateAccount extends React.Component {
    componentDidMount() {
        $('#fav-styles').material_select();
    }

    componentWillUnmount() {
        $('#fav-styles').material_select('destroy');
    }

    render() {
        return (
            <div className={classNames('cacct', { 'cacct--showing': this.props.isVisible })}>
                <form className="row">
                    <div className="col s12">
                        <h2 className="shadowed-box__header">Create Account</h2>
                        <label htmlFor="username">User Name</label>
                        <input ref="username" type="text" id="username" name="username" />
                        <label htmlFor="password">Password</label>
                        <input ref="password" type="password" id="password" name="password" />
                        <label htmlFor="fav-beers">Favorite Beers</label>
                        <input ref="favBeers" type="text" id="fav-beers" name="fav-beers" />
                        <label htmlFor="fav-styles">Favorite Styles</label>
                        <select ref="favStyles" id="fav-styles" name="fav-styles">
                            <option value="" disabled>Choose your option</option>
                            <option>IPA</option>
                            <option>other</option>
                        </select>
                        <button className="btn" onClick={this._handleClick}>Create</button>
                    </div>
                    <div className="col s6 offset-s6">
                        <h4>Nevermind take me back.</h4>
                        <button className="btn green darken-1" onClick={this._handleBack}>Back</button>
                    </div>
                </form>
            </div>
        );
    }

    @autobind @preventDefault
    _handleClick() {
        App.dispatchAction('createAccount', {
            form: {
                username: this.refs.username.getDOMNode().value,
                password: this.refs.password.getDOMNode().value,
                favBeers: this.refs.favBeers.getDOMNode().value,
                favStyles: this.refs.favStyles.getDOMNode().value,
            }
        });
    }

    @autobind @preventDefault
    _handleBack() {
        this.props.onBack();
    }
}
