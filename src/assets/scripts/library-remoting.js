import {library} from "./library";

if (typeof library === 'undefined') {
    throw 'Core library not loaded'
}

(function ($) {
    'use strict';

    const remoting = $.namespace('pl.library.remoting');

    function emptyFn() {
    }

    function prepareSettings(settings) {
        return  Object.assign({
            method: 'GET',
            url: '',
            data: {},
            onSuccess: emptyFn,
            onFailure: emptyFn,
            parse: true
        }, settings);
    }

    remoting.ajax = function (settings) {
        var config = prepareSettings(settings);
        var xhr = new XMLHttpRequest();
        xhr.open(config.method, config.url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status <= 300) {
                    config.onSuccess(config.parse ? JSON.parse(xhr.responseText) : xhr.responseText);
                } else {
                    config.onFailure(xhr);
                }
            }
        };
        xhr.send(config.data);
    };

})(library);