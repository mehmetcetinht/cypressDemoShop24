// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Enable uploading files
import 'cypress-file-upload';

// Drag&Drop
Cypress.Commands.add('dragAndDrop', (source, target) => {
    const dataTransfer = new DataTransfer();
    function inner() {
        cy.get(source).trigger('dragstart', { dataTransfer })
        cy.get(target).trigger('drop', { dataTransfer })
        cy.get(source).trigger('dragend')
    }
    inner();
})

// Get body of frame
Cypress.Commands.add('iframe', { prevSubject: 'element' }, (iframe) => {
    return new Cypress.Promise((resolve) => {
        resolve(iframe.contents().find('body'))
    })
})

Cypress.Commands.add("randomCredential", () => {
    // fill-out form

    function randomGen(length, type) {
        var result = '';
        if (type == 'number') {
            var characters = '0123456789';
        } else if (type == 'string') {
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        }else{
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        }
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    let firstName = randomGen(7,'string')
    let lastName = randomGen(7,'string')
    let email = `${randomGen(10,'both')}@testmail.com`
    let phone = randomGen(11,'number')
    let password = randomGen(8,'both')

    cy.writeFile('cypress/fixtures/randomCredentials.json',`{\n"firstName":"${firstName}",\n"lastName":"${lastName}",\n"email":"${email}",\n"phone":"${phone}",\n"password":"${password}"\n}`)

})