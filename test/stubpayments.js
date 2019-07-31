class StubPayments {
    constructor(accepted) {
        this.accepted = accepted;
    }

    process(amount, creditcard){
        return this.accepted;
    }
}

module.exports = {StubPayments};