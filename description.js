class Description {

    constructor(title, artist) {
        this.title = title;
        this.artist = artist;
    }

    matches(title, artist) {
        return this.title == title && this.artist == artist;
    }
}

module.exports = {Description};