class NotInCustomerCollectionError extends Error {
}

class Reviews {
    constructor(){
        this.reviews =[];
    }

    leaveReview(review, cd){
        if(!review.customerHas(cd)){
            throw new NotInCustomerCollectionError();
        }
        this.reviews.push(review);
    }

    averageRating(){
        return this.sumOfRatings()
            /this.reviews.length;
    }

    sumOfRatings() {
        return this.reviews
            .map((review) => review.rating)
            .reduce((sum, rating) => sum + rating);
    }
}

module.exports = {Reviews, NotInCustomerCollectionError};