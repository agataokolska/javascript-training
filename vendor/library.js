var library = (function () {
    'use strict';

    var api = {
        on: on,
        onReady: onReady,
        namespace: namespace,
        mix: mix,
        evaluate: evaluate
    };
    var baseNamespace = {};

    function on(event, target, callback, scope) {
        target.addEventListener(event, bind(scope || target, callback));
    }

    function onReady(callback) {
        api.on('DOMContentLoaded', window, bind(library, callback));
    }

    function bind(scope, fn) {
        return function () {
          return fn.apply(scope, arguments);
        };
    }

    function namespace(path) {
        var currentNamespace = baseNamespace;
        path.split('.').forEach(function (pathElement) {
            if (!currentNamespace[pathElement]) {
                currentNamespace[pathElement] = {};
            }
            currentNamespace = currentNamespace[pathElement];
        });
        return currentNamespace;
    }

    function evaluate(template, data) {
        var result = template;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                result = result.replace('{{' + key + '}}', data[key]);
            }
        }
        return result;
     }

    function mix(source, target) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
        return target;
    }

    if (!window.addEventListener) {
        api.on = function (event, target, callback) {
            target.attachEvent('on' + event, callback);
        };
    }

    return api;
})();
