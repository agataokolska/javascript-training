const library = (() => {
    'use strict';

    const api = {
        on: on,
        onReady: onReady,
        namespace: namespace,
        evaluate: evaluate
    };
    const baseNamespace = {};

    function on(event, target, callback, scope) {
        target.addEventListener(event, callback.bind(scope || target));
    }

    function onReady(callback) {
        api.on('DOMContentLoaded', window, () => callback(library));
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
