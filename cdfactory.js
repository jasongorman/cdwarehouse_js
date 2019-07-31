const {Description} = require("./description");
const {CD} = require("./cd");

class CdFactory {

    createCd(cdInfo) {
        const {title, artist, price} = cdInfo;
        return new CD(price, 0, new Description(title, artist));
    }
}

module.exports = {CdFactory};