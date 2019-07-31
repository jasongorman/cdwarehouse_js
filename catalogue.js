class Catalogue {
    constructor(contents, cdFactory) {
        this.contents = contents;
        this.cdFactory = cdFactory;
    }

    search(title, artist){
        return this.contents
            .filter((cd) =>
                cd.matches(title, artist))[0];
    }

    add(received){
        const cd = this.cdFactory.createCd(received);
        this.contents.push(cd);
        return cd;
    }
}

module.exports = {Catalogue};