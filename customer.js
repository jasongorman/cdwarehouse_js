class Customer {

    constructor(name) {
        this.cdCollection = [];
    }

    addToCollection(cd){
        this.cdCollection.push(cd);
    }

    has(cd){
        return this.cdCollection.includes(cd);
    }
}

module.exports = {Customer};