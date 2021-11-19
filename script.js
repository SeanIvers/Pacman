var score = 0;
var scoreDiv = document.getElementById("score");

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
    worldArr[length - 2][width - 2] = 1;
    console.log(worldArr);
    return worldArr;
}
// Create world with custom length and width
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

var rowLength = document.querySelectorAll(".row:first-of-type > *").length;
// console.log(rowNum);

var ghost = {
    x: rowLength - 2,
    y: world.length - 2
}

function drawPacman() {
    document.getElementById("pacman").style.top = pacman.y * 40 + "px";
    document.getElementById("pacman").style.left = pacman.x * 40 + "px";
}

drawPacman();

function drawGhost() {
    document.getElementById("ghost").style.top = ghost.y * 40 + "px";
    document.getElementById("ghost").style.left = ghost.x * 40 + "px";
}

drawGhost();

$(document).on("keydown", function(e) {
    // console.log(e);
    if (e.key === "w" || e.key === "ArrowUp") {
        if (world[pacman.y - 1][pacman.x] != 0){
            pacman.y--;
            document.getElementById("pacman").style.transform = "rotate(270deg)";
        }
        if (world[pacman.y][pacman.x] == 3) {
            score += 50;
            // console.log(score);
        }
    }
    else if (e.key === "s" || e.key === "ArrowDown") {
        if (world[pacman.y + 1][pacman.x] != 0) {
            pacman.y++;
            document.getElementById("pacman").style.transform = "rotate(90deg)";
        }
        if (world[pacman.y][pacman.x] == 3) {
            score += 50;
            // console.log(score);
        }
    }
    else if (e.key === "a" || e.key === "ArrowLeft") {
        if (world[pacman.y][pacman.x - 1] != 0) {
            pacman.x--;
            document.getElementById("pacman").style.transform = "rotate(180deg)";
        }
        if (world[pacman.y][pacman.x] == 3) {
            score += 50;
            // console.log(score);
        }
    }
    else if (e.key === "d" || e.key === "ArrowRight") {
        if (world[pacman.y][pacman.x + 1] != 0) {
            pacman.x++;
            document.getElementById("pacman").style.transform = "rotate(0deg)";
        }
        if (world[pacman.y][pacman.x] == 3) {
            score += 50;
            // console.log(score);
        }
    }
    scoreDiv.innerText = "Score: " + score;
    world[pacman.y][pacman.x] = 1;
    // console.log(pacman.x, pacman.y)
    // console.log(ghost.x, ghost.y)
    // moveGhost();
    drawPacman();
    displayWorld();
})

function moveGhost() {
    // calculate distance
    // calculate next move
    // can't be brick
    // can't be visited
    var distanceArr = [
        ((pacman.x - ghost.x) ** 2 + (pacman.y - ghost.y - 1) ** 2) ** 0.5,
        ((pacman.x - ghost.x) ** 2 + (pacman.y - ghost.y + 1) ** 2) ** 0.5,
        ((pacman.x - ghost.x - 1) ** 2 + (pacman.y - ghost.y) ** 2) ** 0.5,
        ((pacman.x - ghost.x + 1) ** 2 + (pacman.y - ghost.y) ** 2) ** 0.5
    ];
    var minDistance = distanceArr[0];
    var minIndex = 0;
    for (element of distanceArr) {
        // console.log(element);
        if (element < minDistance) {
            minDistance = element;
        }
    }
    minIndex = distanceArr.findIndex(element => element === minDistance);
    console.log(minIndex);
    if (minIndex === 1 && world[ghost.y - 1][ghost.x] != 0) {
        ghost.y--;
    }
    if (minIndex === 0 && world[ghost.y + 1][ghost.x] != 0) {
        ghost.y++;
    }
    if (minIndex === 3 && world[ghost.y][ghost.x - 1] != 0) {
        ghost.x--;
    }
    if (minIndex === 2 && world[ghost.y][ghost.x + 1] != 0) {
        ghost.x++;
    }
    // var distance = ((pacman.x - ghost.x) ** 2 + (pacman.y - ghost.y) ** 2) ** 0.5;
}

function gameLoop() {
    drawPacman();
    drawGhost();
    moveGhost();
    drawGhost();
    setTimeout(gameLoop, 250);
}
gameLoop();