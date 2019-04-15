library.onReady(($) => {
    'use strict';

    const remoting = $.namespace('pl.library.remoting');
    let contactTemplate = '';

    function createCard(contactsHtml, contact) {
        return contactsHtml += library.evaluate(contactTemplate, contact);
    }

    function onContactsLoaded(contacts) {
        document.querySelector("#contacts").innerHTML = contacts.reduce(createCard, '');
    }

    function onTemplateLoaded(template) {
        contactTemplate = template;
        remoting.ajax({
            url: 'data/contacts.json',
            onSuccess: onContactsLoaded,
            onFailure: onRequestFailure
        });
    }

    function onRequestFailure(xhr) {
        console.log(xhr.status);
    }

    remoting.ajax({
        url: 'assets/templates/contact.html',
        onSuccess: onTemplateLoaded,
        onFailure: onRequestFailure,
        parse: false
    });

});