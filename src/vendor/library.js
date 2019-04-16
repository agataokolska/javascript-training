const library = (() => {
    'use strict';

    const api = {
        on,
        namespace,
        evaluate,
        onReady(callback) {
            api.on('DOMContentLoaded', window, () => callback(library));
        },
    };
    const baseNamespace = {};

    function on(event, target, callback, scope) {
        target.addEventListener(event, callback.bind(scope || target));
    }

    function createNamespace(currentNamespace, pathElement) {
        return currentNamespace[pathElement] = currentNamespace[pathElement] || {};
    }

    function namespace(path) {
        return path.split('.').reduce(createNamespace, baseNamespace);
    }

    function evaluate(template, data) {
        return Object.keys(data)
            .reduce((result, key) => result.replace('{{' + key + '}}', data[key]), template);
    }

    if (!window.addEventListener) {
        api.on = function (event, target, callback) {
            target.attachEvent('on' + event, callback);
        };
    }

    return api;
})();
