const assert = require('assert');
const {CdFactory} = require("../cdfactory");
const {Warehouse} = require("../warehouse");
const {Catalogue} = require("../catalogue");
const {Description} = require("../description");
const {CD} = require("../cd");

describe('Receive batch of CDs', function(){
    describe('When the CD is already in the catalogue', function(){
        it('adds the received copies to the stock for that CD', function(){
            const cd = new CD(0, 10, new Description('Bat Out Of Hell', 'Meatloaf'));
            const catalogue = new Catalogue(contents=[cd], new CdFactory());
            const warehouse = new Warehouse(catalogue);
            const batch = {
                cds: [
                    {
                        title: 'Bat Out Of Hell',
                        artist: 'Meatloaf',
                        copies: 10
                    }
                ]
            }
            warehouse.receive(batch);
            assert.equal(cd.stock, 20);
        })
    })

    describe('When the CD is not in the catalogue', function(){
        const catalogue = new Catalogue(contents=[], new CdFactory());
        const warehouse = new Warehouse(catalogue);
        const batch = {
            cds: [
                {
                    title: 'Bat Out Of Hell',
                    artist: 'Meatloaf',
                    copies: 10,
                    price: 9.99
                }
            ]
        }
        warehouse.receive(batch);
        const cd = catalogue.search('Bat Out Of Hell', 'Meatloaf');

        it('adds the CD to the catalogue with received copies for initial stock', function(){
            assert.equal(cd.stock, 10);
        })

        it('sets the price for the new CD', function(){
            assert.equal(cd.price, 9.99);
        })
    })

    describe('When a label sends a batch of multiple CDs', function(){
        it('adds all the received copies to the stock of all received CDs', function(){
            const meatloaf = new CD(0, 10, new Description('Bat Out Of Hell', 'Meatloaf'));
            const catalogue = new Catalogue(contents=[meatloaf], new CdFactory());
            const warehouse = new Warehouse(catalogue);
            const batch = {
                cds: [
                    {
                        title: 'Bat Out Of Hell',
                        artist: 'Meatloaf',
                        copies: 10,
                        price: 9.99
                    },
                    {
                        title: 'So Red The Rose',
                        artist: 'Arcadia',
                        copies: 10,
                        price: 9.99
                    }
                ]
            }
            warehouse.receive(batch);

            assert.equal(meatloaf.stock, 20);
            assert.equal(catalogue.search('So Red The Rose', 'Arcadia').stock, 10);
        })
    })
})