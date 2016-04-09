import { autobind } from 'core-decorators';

function preventDefault(target, key, descriptor) {
    var fn = descriptor.value;
    descriptor.value = function (ev, ...args) {
        ev.preventDefault();
        return fn.call(this, ev, ...args);
    };
    return descriptor;
}

// Decorator for transforming parameter to JS FormData object
function formDataConverter(target, key, descriptor) {
    var fn = descriptor.value;
    descriptor.value = function (data) {
        let formData = new FormData();
        for (let prop in data) {
            formData.append(prop, data[prop]);
        }
        return fn.call(this, formData);
    };
    return descriptor;
}

export { preventDefault, formDataConverter, autobind }
