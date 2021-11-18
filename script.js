var worldObjects = {
    0: "brick",
    1: "blank",
    2: "coin",
    3: "cherry"
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
    worldArr[1][1] = 1;
    console.log(worldArr);
    return worldArr;
}
var world = createWorld(15, 20);
// console.log(world.length, world[0].length)

function displayWorld() {
    var output = '';

    for (var i = 0; i < world.length; i++) {
        output += "<div class='row'>"
        for (var j = 0; j < world[i].length; j++) {
            output = output += "<div class='" + worldObjects[world[i][j]] + "'></div>";
        }
        output += "</div>";
    }
    document.getElementById('world').innerHTML = output;
}
displayWorld();

var pacman = {
    x: 1,
    y: 1
}

function drawPacman() {
    document.getElementById("pacman").style.top = pacman.y * 40 + "px";
    document.getElementById("pacman").style.left = pacman.x * 40 + "px";
}

drawPacman();

$(document).on("keydown", function(e) {
    console.log(e);
    if (e.key === "w" || e.key === "ArrowUp") {
        if (world[pacman.y - 1][pacman.x] != 0){
            pacman.y--;
        }
    }
    else if (e.key === "s" || e.key === "ArrowDown") {
        if (world[pacman.y + 1][pacman.x] != 0) {
            pacman.y++;
        }
    }
    else if (e.key === "a" || e.key === "ArrowLeft") {
        if (world[pacman.y][pacman.x - 1] != 0) {
            pacman.x--;
        }
    }
    else if (e.key === "d" || e.key === "ArrowRight") {
        if (world[pacman.y][pacman.x + 1] != 0) {
            pacman.x++;
        }
    }
    world[pacman.y][pacman.x] = 1;
    drawPacman();
    displayWorld();
})