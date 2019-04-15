function init() {
    'use strict';

    var remoting = this.namespace('pl.library.remoting');
    var contactTemplate = '';

    function onContactsLoaded(contacts) {
        var contactsHtml = '';
        contacts.forEach(function (contact) {
            contactsHtml += library.evaluate(contactTemplate, contact);
        });
        document.querySelector("#contacts").innerHTML = contactsHtml;
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
}

library.onReady(init);