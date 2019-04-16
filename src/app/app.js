import {library} from "../assets/scripts/library";
import "../assets/scripts/library-remoting";
import "../assets/styles/styles.scss"

library.onReady(($) => {
    'use strict';

    const remoting = $.namespace('pl.library.remoting');

    function updateContacts(html) {
        document.querySelector("#contacts").innerHTML = html;
    }

    function onLoad([contacts, template]) {
        const resultHtml = contacts.reduce((html, contact) => html += library.evaluate(template, contact), '');
        updateContacts(resultHtml);
    }

    function loadContacts() {
        return remoting.ajax({
            url: 'data/contacts.json'
        });
    }

    function loadContactTemplate() {
        return remoting.ajax({
            url: 'assets/templates/contact.html',
            parse: false
        });
    }

    Promise.all([loadContacts(), loadContactTemplate()])
        .then(onLoad, (xhr) => console.log(xhr.status));

});