var MAX_X = 5;
var MIN_X = 0;
var MAX_Y = 5;
var MIN_Y = 0;
var CardinalDirection;
(function (CardinalDirection) {
    CardinalDirection[CardinalDirection["NORTH"] = 0] = "NORTH";
    CardinalDirection[CardinalDirection["WEST"] = 1] = "WEST";
    CardinalDirection[CardinalDirection["SOUTH"] = 2] = "SOUTH";
    CardinalDirection[CardinalDirection["EAST"] = 3] = "EAST";
})(CardinalDirection || (CardinalDirection = {}));
// Place
function PlaceRobot(x, y, direction) {
    var dir = getDirectionFromString(direction);
    if (dir != null) {
        var newBot = {
            direction: dir,
            xPos: x,
            yPos: y
        };
        return newBot;
    }
    return null;
}
function getDirectionFromString(direction) {
    direction = direction.toUpperCase();
    switch (direction) {
        case "NORTH":
            return CardinalDirection.NORTH;
        case "SOUTH":
            return CardinalDirection.SOUTH;
        case "EAST":
            return CardinalDirection.EAST;
        case "WEST":
            return CardinalDirection.WEST;
        default:
            return null;
    }
}
function turn(orientation, robot) {
    orientation = orientation.toUpperCase();
    if (orientation == "RIGHT") {
        robot.direction = robot.direction == CardinalDirection.NORTH ? 3 : robot.direction -= 1;
    }
    else if (orientation = "LEFT") {
        robot.direction = robot.direction == CardinalDirection.EAST ? 0 : robot.direction += 1;
    }
}
function move(robot) {
    switch (robot.direction) {
        case CardinalDirection.NORTH:
            robot.yPos = robot.yPos < MAX_Y ? robot.yPos += 1 : robot.yPos;
            break;
        case CardinalDirection.WEST:
            robot.xPos = robot.xPos > MIN_X ? robot.xPos -= 1 : robot.xPos;
            break;
        case CardinalDirection.EAST:
            robot.xPos = robot.xPos < MAX_X ? robot.xPos += 1 : robot.xPos;
            break;
        case CardinalDirection.SOUTH:
            robot.yPos = robot.yPos > MIN_Y ? robot.yPos -= 1 : robot.yPos;
            break;
    }
}
// Report
function report(robot) {
    var reportStr = robot.xPos.toString() + robot.yPos.toString() + CardinalDirection[robot.direction].toString();
    document.getElementById("console").innerText = reportStr;
}
function parseCommandInput() {
    var inputValue = document.getElementById('commandInput').value;
    console.log(inputValue);
}
// Execution
var myBot = PlaceRobot(0, 0, "NORTH");
window.onload = function () {
    document.getElementById('runSim').addEventListener('click', parseCommandInput);
};
