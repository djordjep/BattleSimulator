const Util = () => {

}

Util.getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Util.getRandomBool = () => {
    return Math.random() >= 0.5;
}

module.exports = Util;