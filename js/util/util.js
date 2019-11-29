function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getLenArr(len, node) {
    let result = [];
    for (let i = 0; i < len; i++) {
        result.push(node);
    }
    return result;
}