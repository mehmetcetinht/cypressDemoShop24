/// <reference types="cypress" />

// import page objects
const homepage = require('../../../Pages/homepage.json')
const product = require('../../../Pages/product.json')
const productSamsung = require('../../../Pages/productSamsung.json')
const productMac = require('../../../Pages/productMac.json')

describe('Search Suite',()=>{
    beforeEach(()=>{
        // Demoshop24 webpage opens with the parameters below
        cy.viewport(1280, 720)
        
        // cy.fixture('sessionInfo.json').then(session => {
        //     cy.clearCookies()
        //     cy.setCookie(session.sessionName,session.sessionValue)
        //     cy.setCookie(session.wdataName,session.wdataValue)
        // })

        cy.visit('http://www.demoshop24.com/')
        cy.url().should('include', 'demoshop24.com')
        // Assert that Home Page opens
        cy.xpath(homepage.homepageHeader).should('have.text', 'Testing Demo Shop')
        cy.xpath(homepage.macbook).should('exist')
    })
    it('Search Samsung Item',()=>{
        // Search Samsung item
        cy.xpath(homepage.searchEditTextArea).type('Samsung SyncMaster 941BW')
        cy.xpath(homepage.searchButton).click()
        // Assert item and check price
        cy.xpath(product.priceCaption).contains('$242.00')
        cy.get(product.caption).children('h4')
        .should('have.text','Samsung SyncMaster 941BW').click()
        cy.get('h1').should('contain','Samsung SyncMaster 941BW')
        cy.get('h2').should('contain','$242.00')
        // Add item to the Cart
        cy.xpath(product.addToCartButton).click()
        // Assert that relative success alert is showed to customer
        cy.xpath(product.successAlert).should('be.visible')
        cy.contains('Success: You have added Samsung SyncMaster 941BW to your shopping cart!')
        // Assert that cart has the right amount and open the cart
        cy.get(homepage.cartTotal).should('contain','1 item(s) - $242.00').click()
        cy.xpath(homepage.goToCartFromCartTotal).click()
        // Assert that the values in cart is correct
         cy.contains('(5.00kg)')
         cy.xpath(productSamsung.productImage).should('be.visible')
         cy.xpath(productSamsung.productName).should('be.visible')
         cy.xpath(productSamsung.productModel).should('be.visible')
         cy.xpath(productSamsung.productQuantity).should('be.visible')
         cy.xpath(productSamsung.unitPrice).should('be.visible')
         cy.xpath(productSamsung.totalPrice).should('be.visible')
         cy.xpath(productSamsung.totalCheckoutPrice).should('be.visible')
    })
    it('Search Mac Item',()=>{
        // Select Mac from desktop dropdown
        cy.xpath(homepage.desktopDropdown).realHover()
        cy.xpath(homepage.desktopMac).click()
        // Assert that mac desktop page opened
        cy.xpath(product.desktopTab).should('be.visible')
        cy.get(product.desktopHeader).should('contain','Mac')
        cy.xpath(product.priceCaption).should('contain','$122.00')
        cy.xpath(product.iMac).click()
        // Assert the product datas
        cy.xpath(productMac.name).should('be.visible')
        cy.xpath(productMac.brand).should('be.visible')
        cy.xpath(productMac.productCode).should('be.visible')
        cy.xpath(productMac.availability).should('be.visible')
        cy.xpath(productMac.price).should('be.visible')
    })
})
