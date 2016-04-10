import { autobind } from 'core-decorators';
import { App } from 'spak';

// TODO Check errors for 401 not authenticated.

export default class ApiGateway {
    fetch(endpoint, options) {
        return this._publishBeforeFetch(endpoint)
            .then(() => this._sendFetch(endpoint, options))
            .then(this._handleFetchResponse)
            .finally(() => this._publishFetched(endpoint));
    }

    _sendFetch(endpoint, options={credentials:'include'}) {
        // Credentials options means we send cookies in request
        if (!options.hasOwnProperty('credentials')) {
            options['credentials'] = 'include';
        }
        return global.fetch(`/api${endpoint}`, options);
    }

    @autobind
    _handleFetchResponse(response) {
        return response.json()
            .then((json) => {
                App.events.publish('api.fetchResponded', json, response);
                return json;
            });
    }

    _publishBeforeFetch(endpoint) {
        return App.events.publish.when('api.beforeFetch', endpoint);
    }

    _publishFetched(endpoint) {
        App.events.publish('api.fetched', endpoint);
    }
}
