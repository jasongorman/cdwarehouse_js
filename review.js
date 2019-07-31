class Review {
    constructor(customer, rating, text) {
        this.customer = customer;
        this.rating = rating;
        this.text = text;
    }

    customerHas(cd){
        return this.customer.has(cd);
    }
}

module.exports = {Review};