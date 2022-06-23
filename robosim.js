var CardinalDirection;
(function (CardinalDirection) {
    CardinalDirection[CardinalDirection["NORTH"] = 0] = "NORTH";
    CardinalDirection[CardinalDirection["WEST"] = 1] = "WEST";
    CardinalDirection[CardinalDirection["SOUTH"] = 2] = "SOUTH";
    CardinalDirection[CardinalDirection["EAST"] = 3] = "EAST";
})(CardinalDirection || (CardinalDirection = {}));
function place(x, y, direction, robot) {
    if (direction != null
        && x >= robot.grid.MIN_X
        && x <= robot.grid.MAX_X
        && y >= robot.grid.MIN_Y
        && y <= robot.grid.MAX_Y) {
        robot.direction = direction;
        robot.xPos = x;
        robot.yPos = y;
    }
}
function robotOnGrid(robot) {
    return robot.direction != null && robot.xPos != null && robot.yPos != null;
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
            robot.yPos = robot.yPos < robot.grid.MAX_Y ? robot.yPos += 1 : robot.yPos;
            break;
        case CardinalDirection.WEST:
            robot.xPos = robot.xPos > robot.grid.MIN_X ? robot.xPos -= 1 : robot.xPos;
            break;
        case CardinalDirection.EAST:
            robot.xPos = robot.xPos < robot.grid.MAX_X ? robot.xPos += 1 : robot.xPos;
            break;
        case CardinalDirection.SOUTH:
            robot.yPos = robot.yPos > robot.grid.MIN_Y ? robot.yPos -= 1 : robot.yPos;
            break;
    }
}
// Report
function report(robot) {
    let reportStr = robot.xPos.toString() + robot.yPos.toString() + CardinalDirection[robot.direction].toString();
    let cmdOutput = document.getElementById("command-output");
    cmdOutput.value += "\n" + reportStr;
}
function parseCommandInput(robot) {
    let inputValue = document.getElementById('command-input').value.toUpperCase().split('\n');
    for (let i = 0; i < inputValue.length; i++) {
        // Split the string into an array delimited by the comma
        let inputValueArr = inputValue[i].split(',');
        // Grab the 'verb' part of the cmd
        let verb = inputValueArr[0];
        if (verb != "PLACE" && !robotOnGrid(myRobot)) {
            continue;
        }
        switch (verb) {
            case "PLACE":
                if (inputValueArr.length == 4) {
                    // We also need to grab the X and Y values and direction from the input
                    let x = parseInt(inputValueArr[1]);
                    let y = parseInt(inputValueArr[2]);
                    let direction = getDirectionFromString(inputValueArr[3]);
                    place(x, y, direction, myRobot);
                }
                break;
            case "MOVE":
                move(myRobot);
                break;
            case "LEFT":
                turn("LEFT", myRobot);
                break;
            case "RIGHT":
                turn("RIGHT", myRobot);
                break;
            case "REPORT":
                report(myRobot);
                break;
            default:
                break;
        }
        report(myRobot);
    }
}
// Hook buttons up to functions 
window.onload = () => {
    document.getElementById('run-sim').addEventListener('click', function () { parseCommandInput(myRobot); });
    document.getElementById('report').addEventListener('click', function () { report(myRobot); });
};
// Execution
// Create a grid
let myGrid = {
    MIN_X: 0,
    MAX_X: 5,
    MIN_Y: 0,
    MAX_Y: 5,
};
// Create a new Robot
let myRobot = {
    xPos: null,
    yPos: null,
    direction: null,
    grid: myGrid
};
