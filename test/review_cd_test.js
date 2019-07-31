const assert = require('assert');
const {Reviews} = require("../reviews");
const {NotInCustomerCollectionError} = require("../reviews");
const {Review} = require("../review");
const {Description} = require("../description");
const {Customer} = require("../customer");
const {CD} = require("../cd");

describe("Reviewing a CD", function(){
    describe('Just a rating', function(){
        it('adds the rating to the CDs reviews', function(){
            const reviews = new Reviews();
            const cd = new CD(0,0, new Description('Obzen', 'Meshuggah'), reviews);
            const customer = new Customer('Jason');
            customer.addToCollection(cd);
            const review = new Review(customer, rating=5);
            cd.leaveReview(review);
            assert.equal(reviews.reviews.filter((review) => review.rating == 5 )[0], review);
        })
    })

    describe('Rating and text', function(){
        it('adds the text to the CDs reviews', function(){
            const reviews = new Reviews();
            const cd = new CD(0,0, new Description('Obzen', 'Meshuggah'), reviews);
            const customer = new Customer('Jason');
            customer.addToCollection(cd);
            const review = new Review(customer, rating=5, text='I loved this album!');
            cd.leaveReview(review);
            assert.equal(reviews.reviews.filter((review) => review.text == 'I loved this album!')[0], review);
        })
    })

    describe('CD not in customer collection', function(){
        it('does not allow leaving review', function(){
            const reviews = new Reviews();
            const cd = new CD(0,0, new Description('Obzen', 'Meshuggah'), reviews);
            const customer = new Customer('Jason');
            const review = new Review(customer, rating=5);
            assert.throws(() => cd.leaveReview(review), NotInCustomerCollectionError);
        })
    })

    describe('Average rating', function(){
        it('calculates the average of ratings in all reviews for a CD', function(){
            const reviews = new Reviews();
            const cd = new CD(0,0, new Description('Obzen', 'Meshuggah'), reviews);
            const jason = new Customer('Jason');
            jason.addToCollection(cd);
            const review1 = new Review(jason, rating=5);
            const jane = new Customer('Jane');
            jane.addToCollection(cd);
            const review2 = new Review(jane, rating=4);
            cd.leaveReview(review1);
            cd.leaveReview(review2);
            assert.equal(cd.averageRating(), 4.5);
        })
    })
})