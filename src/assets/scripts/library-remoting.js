import {library} from "./library";

if (typeof library === 'undefined') {
    throw 'Core library not loaded'
}

(function ($) {
    'use strict';

    const remoting = $.namespace('pl.library.remoting');

    function prepareSettings(settings) {
        return  Object.assign({
            method: 'GET',
            url: '',
            data: {},
            parse: true
        }, settings);
    }

    remoting.ajax = function (settings) {
        return new Promise((resolve, reject) => {
            const config = prepareSettings(settings);
            const xhr = new XMLHttpRequest();
            xhr.open(config.method, config.url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status <= 300) {
                        resolve(config.parse ? JSON.parse(xhr.responseText) : xhr.responseText);
                    } else {
                        reject(xhr);
                    }
                }
            };
            xhr.send(config.data);
        });
    };

})(library);