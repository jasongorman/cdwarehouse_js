const assert = require('assert');
const {CD} = require("../cd");
const {Description} = require('../description');
const {Catalogue} = require('../catalogue');

describe('search for a CD', function(){
    describe('catalogue contains matching CD', function(){
        it('finds the CD that matches title and artist ' +
            'when matching CD is only contents', function(){
            const title = 'Empath', artist = 'Devin Townsend';
            const cd = new CD(9.99, 1, new Description(title, artist));
            const catalogue = new Catalogue(contents=[cd], null);
            assert.strictEqual(catalogue.search(title, artist), cd);
        })

        it('finds the CD that matches title and artist ' +
            'when matching CD is one of multiple contents', function(){
            const title = 'Empath', artist = 'Devin Townsend';
            const cd = new CD(9.99, 1, new Description(title, artist));
            const catalogue = new Catalogue(contents=[new CD(0,0,new Description('', '')), cd], null);
            assert.strictEqual(catalogue.search(title, artist), cd);
        })
    })

    describe('Catalogue contains no matching CD', function(){
        it('returns null when no match is found', function(){
            const catalogue = new Catalogue([new CD(0,0,new Description('',''))], null);
            assert.equal(catalogue.search('So', 'Peter Gabriel'), null);
        })
    })
})