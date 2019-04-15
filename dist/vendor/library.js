'use strict';

var library = function () {
    'use strict';

    var api = {
        on: on,
        onReady: onReady,
        namespace: namespace,
        evaluate: evaluate
    };
    var baseNamespace = {};

    function on(event, target, callback, scope) {
        target.addEventListener(event, callback.bind(scope || target));
    }

    function onReady(callback) {
        api.on('DOMContentLoaded', window, function () {
            return callback(library);
        });
    }

    function createNamespace(currentNamespace, pathElement) {
        return currentNamespace[pathElement] = currentNamespace[pathElement] || {};
    }

    function namespace(path) {
        return path.split('.').reduce(createNamespace, baseNamespace);
    }

    function evaluate(template, data) {
        return Object.keys(data).reduce(function (result, key) {
            return result.replace('{{' + key + '}}', data[key]);
        }, template);
    }

    if (!window.addEventListener) {
        api.on = function (event, target, callback) {
            target.attachEvent('on' + event, callback);
        };
    }

    return api;
}();