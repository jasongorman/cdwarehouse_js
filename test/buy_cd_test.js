const assert = require('assert');
const {StubPayments} = require("./stubpayments");
const {Customer} = require("../customer");
const {CD, OutOfStockError} = require('../cd.js');
const {Description} = require('../description');

describe("buy a CD", function() {

    const creditCard = {
        number: "1234234545675768",
        expiry: "10/22",
        cv: "855"

    };

    describe("payment accepted", function() {

        const customer = new Customer("Jason");
        const cd = new CD(price = 9.99, stock = 2, new Description('', ''));
        const payments = new StubPayments(accepted = true);
        cd.buy(payments, customer, creditCard);

        it("reduces stock count by 1", function () {
            assert.equal(cd.stock, 1);
        })

        it("adds the CD to the customer's collection", function(){
            assert(customer.has(cd));
        })
    })

    describe("payment rejected", function () {
        it("doesn't change the stock count", function() {
            const customer = new Customer("Jason");
            const cd = new CD(price=9.99, stock=2, new Description('', ''));
            const payments = new StubPayments(accepted=false);
            cd.buy(payments, customer, creditCard);
            assert.equal(cd.stock, 2);
        })
    })

    describe("out of stock", function () {
        it("should throw an out of stock error", function() {
            const customer = new Customer("Jason");
            const cd = new CD(price=9.99, stock=0, new Description('', ''));
            const payments = new StubPayments(accepted=true);
            assert.throws(() => {cd.buy(payments, customer, creditCard);}, OutOfStockError);
        })
    })
})