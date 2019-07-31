class OutOfStockError extends Error {
}

class CD {

    constructor(price, stock, description, reviews) {
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.reviews = reviews;
    }

    leaveReview(review){
        this.reviews.leaveReview(review, this);
    }

    averageRating(){
        return this.reviews.averageRating();
    }

    addStock(copies){
        this.stock += copies;
    }

    buy(payments, customer, creditCard) {
        if(this.stock == 0){
            throw new OutOfStockError();
        }
        let paymentAccepted = payments.process(this.price, creditCard);
        if(paymentAccepted){
            this.stock -= 1;
            customer.addToCollection(this);
        }
    }

    matches(title, artist) {
        return this.description.matches(title, artist);
    }
}

module.exports = {CD, OutOfStockError};