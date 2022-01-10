/// <reference types="cypress" />

// import page objects
const homepage = require('../../../Pages/homepage.json')
const login = require('../../../Pages/loginpage.json')
const register = require('../../../Pages/registerpage.json')

describe('Login Suite', function () {
    beforeEach(function () {
        // Demoshop24 webpage opens with the parameters below
        cy.viewport(1280, 720)
        cy.visit('http://www.demoshop24.com/')
        cy.url().should('include', 'demoshop24.com')
        // Assert that Home Page opens
        cy.xpath(homepage.homepageHeader).should('have.text', 'Testing Demo Shop')
        cy.xpath(homepage.macbook).should('exist')
        // Open Login page
        cy.xpath(homepage.myAccountDropdown).click()
        cy.xpath(homepage.loginButton).click()
        cy.get(login.newCustomerHeader).children('h2').should('contain', 'New Customer')

    })
    it('Positive Login Test', function () {
        // Enter credentials from json file
        cy.fixture('credentials.json').then(user => {
            cy.xpath(login.email)
                .type(user.email)
            cy.xpath(login.password)
                .type(user.password)
        })
        // Click login button and assert that relative login page opens
        cy.xpath(login.loginButton).click()
        cy.xpath(login.accountTab).should('be.visible')
        cy.xpath(login.listLogout).should('be.visible')
        cy.xpath(homepage.macbook).should('not.exist')
        // Assert that new account dropdown menu items after login process
        cy.xpath(homepage.myAccountDropdown).click()
        cy.xpath(homepage.loginButton).should('not.exist')
        cy.xpath(homepage.myAccountButton).should('be.visible')
        cy.xpath(homepage.orderHistoryButton).should('be.visible')
        cy.xpath(homepage.transactionsButton).should('be.visible')
        cy.xpath(homepage.downloadsButton).should('be.visible')
        cy.xpath(homepage.logoutButton).should('be.visible')
    })
    it('Logout via element within list Test', () => {
        // Enter credentials from json file
        cy.fixture('credentials.json').then(user => {
            cy.xpath(login.email)
                .type(user.email)
            cy.xpath(login.password)
                .type(user.password)
        })
        // Click login button and assert that relative login page opens
        cy.xpath(login.loginButton).click()
        cy.xpath(login.accountTab).should('be.visible')
        // Click logout button within the list which is on the right 
        cy.xpath(login.listLogout).should('be.visible').click()
        // Assert that relative logout page opens
        cy.get(login.content).children('h1').should('have.text', 'Account Logout')
            .next('p').should('have.text', 'You have been logged off your account. It is now safe to leave the computer.')
        cy.xpath(login.continueButton).click()
        // Assert that homepage opens
        cy.get(login.content).should('not.exist')
        cy.xpath(homepage.macbook).should('exist')
    })
    it('Logout via element within dropdown Test', () => {
        // Enter credentials from json file
        cy.fixture('credentials.json').then(user => {
            cy.xpath(login.email)
                .type(user.email)
            cy.xpath(login.password)
                .type(user.password)
        })
        // Click login button and assert that relative login page opens
        cy.xpath(login.loginButton).click()
        cy.xpath(login.accountTab).should('be.visible')
        // Click logout button within the dropdown
        cy.xpath(homepage.myAccountDropdown).click()
        cy.xpath(homepage.logoutButton).click()
        // Assert that relative logout page opens
        cy.get(login.content).children('h1').should('have.text', 'Account Logout')
            .next('p').should('have.text', 'You have been logged off your account. It is now safe to leave the computer.')
        cy.xpath(login.continueButton).click()
        // Assert that homepage opens
        cy.get(login.content).should('not.exist')
        cy.xpath(homepage.macbook).should('exist')
    })
    it('Login with Invalid email', () => {
        // Enter credentials from json file
        cy.fixture('credentials.json').then(user => {
            cy.xpath(login.email)
                .type(user.firstName)
            cy.xpath(login.password)
                .type(user.password)
        })
        cy.xpath(login.loginButton).click()
        // Assert that relative error message is existed
        cy.contains('Warning: No match for E-Mail Address and/or Password.')
    })
    it('Login with Invalid password', () => {
        // Enter credentials from json file
        cy.fixture('credentials.json').then(user => {
            cy.xpath(login.email)
                .type(user.email)
            cy.xpath(login.password)
                .type(user.lastName)
        })
        cy.xpath(login.loginButton).click()
        // Assert that relative error message is existed
        cy.contains('Warning: No match for E-Mail Address and/or Password.')
    })
    it('Login with empty credentials', () => {
        cy.xpath(login.loginButton).click()
        // Assert that relative error message is existed
        cy.contains('Warning: No match for E-Mail Address and/or Password.')
    })
    it('Register as new user and login with that user', () => {
        // Open register page
        cy.xpath(login.continueButton).click()
        // Assert that register page opened
        cy.xpath(register.registerHeader).should('be.visible')
        // Enter random values to register form
        cy.randomCredential()
        cy.fixture('randomCredentials.json').then(user => {
            cy.get(register.firstName)
                .type(user.firstName)
            cy.get(register.lastName)
                .type(user.lastName)
            cy.get(register.email)
                .type(user.email)
            cy.get(register.phone)
                .type(user.phone)
            cy.get(register.password)
                .type(user.password)
            cy.get(register.passConfirm)
                .type(user.password)
        })
        cy.get(register.agreeCheckbox).check().should('be.checked')
        cy.xpath(login.loginButton).click()
        // Assert that new account created
        cy.get(register.registerSuccess).should('have.text', 'Your Account Has Been Created!')
        cy.xpath(login.continueButton).click()
        cy.xpath(login.accountTab).should('be.visible')
        // Click logout button within the dropdown
        cy.xpath(homepage.myAccountDropdown).click()
        cy.xpath(homepage.logoutButton).click()
        // Assert that relative logout page opens
        cy.get(login.content).children('h1').should('have.text', 'Account Logout')
            .next('p').should('have.text', 'You have been logged off your account. It is now safe to leave the computer.')
        cy.xpath(login.continueButton).click()
        // Assert that homepage opens
        cy.get(login.content).should('not.exist')
        cy.xpath(homepage.macbook).should('exist')
        // Open Login page
        cy.xpath(homepage.myAccountDropdown).click()
        cy.xpath(homepage.loginButton).click()
        cy.get(login.newCustomerHeader).children('h2').should('contain', 'New Customer')
        // Login with new account
        cy.fixture('credentials.json').then(user => {
            cy.xpath(login.email)
                .type(user.email)
            cy.xpath(login.password)
                .type(user.password)
        })
        // Click login button and assert that relative login page opens
        cy.xpath(login.loginButton).click()
        cy.xpath(login.accountTab).should('be.visible')
        cy.xpath(login.listLogout).should('be.visible')
        cy.xpath(homepage.macbook).should('not.exist')
        // Assert that new account dropdown menu items after login process
        cy.xpath(homepage.myAccountDropdown).click()
        cy.xpath(homepage.loginButton).should('not.exist')
        cy.xpath(homepage.myAccountButton).should('be.visible')
        // Open order history and do relative assertions
        cy.xpath(homepage.orderHistoryButton).click()
        cy.get(homepage.orderHistoryHeader).should('have.text','Order History')
        .next('p').should('have.text','You have not made any previous orders!')
    })
})

