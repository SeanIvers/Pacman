var worldObjects = {
    0: "brick",
    1: "blank",
    2: "coin"
};

function getRandObjNum() {
    return Math.floor(Math.random() * Object.keys(worldObjects).length);
}

function createWorld(length, width) {
    var worldArr = new Array(length);
    for (var i = 0; i < worldArr.length; i++) {
        worldArr[i] = new Array(width);
        for (var j = 0; j < width; j++) {
            worldArr[i][j] = 0;
            if (i > 0 && i < length - 1 && j > 0 && j < width - 1) {
                worldArr[i][j] = getRandObjNum();
            }
        }
    }
    return worldArr;
}
// console.log(createWorld(10, 20));

function drawWorld() {
    
}