class Warehouse {
    constructor(catalogue) {
        this.catalogue = catalogue;
    }

    receive(batch) {
        batch.cds.forEach((received) => {
            let cd = this.catalogue.search(received.title, received.artist);
            if (cd == null) {
                cd = this.catalogue.add(received);
            }
            cd.addStock(received.copies);
        });
    }
}

module.exports = {Warehouse};