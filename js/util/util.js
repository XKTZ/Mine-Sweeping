function getRandomInt() {
    return parseInt(Math.random() * 10);
}

function getLenArr(len, node) {
    let result = [];
    for(let i = 0; i < len; i ++) {
        result.push(node);
    }
    return result;
}