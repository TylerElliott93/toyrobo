var CardinalDirection;
(function (CardinalDirection) {
    CardinalDirection[CardinalDirection["NORTH"] = 0] = "NORTH";
    CardinalDirection[CardinalDirection["WEST"] = 1] = "WEST";
    CardinalDirection[CardinalDirection["SOUTH"] = 2] = "SOUTH";
    CardinalDirection[CardinalDirection["EAST"] = 3] = "EAST";
})(CardinalDirection || (CardinalDirection = {}));
// Global vars
var myGrid;
var myRobot;
/**
 * Creates a new empty Robot object and a grid object of given dimensions
 * @param gridWidth
 * @param gridHeight
 * @returns A Robot,Grid tuple
 */
function initialiseSimulator(gridWidth, gridHeight) {
    let newGrid = {
        min_x: 0,
        max_x: gridWidth - 1,
        min_y: 0,
        max_y: gridHeight - 1
    };
    let newRobot = {
        xPos: null,
        yPos: null,
        direction: null,
        grid: newGrid
    };
    return [newRobot, newGrid];
}
/**
 * Takes an object of type Robot and populates X,Y and direction values
 * @param x The X grid coordinate of the robot
 * @param y The Y grid coordinate of the robot
 * @param direction The direction in which the robot is facing
 * @param robot The robot object
 */
function place(x, y, direction, robot) {
    if (direction != null
        && x >= robot.grid.min_x
        && x <= robot.grid.max_x
        && y >= robot.grid.min_y
        && y <= robot.grid.max_y) {
        robot.direction = direction;
        robot.xPos = x;
        robot.yPos = y;
    }
}
/**
 * Takes a robot object and returns true only if it has a direction and X,Y coord values
 * @param robot
 * @returns
 */
function robotOnGrid(robot) {
    return robot.direction != null && robot.xPos != null && robot.yPos != null;
}
/**
 * Converts a literal string to a CardinalDirection enum value
 * @param direction
 * @returns
 */
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
/**
 *
 * @param orientation
 * @param robot
 */
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
            robot.yPos = robot.yPos < robot.grid.max_y ? robot.yPos += 1 : robot.yPos;
            break;
        case CardinalDirection.WEST:
            robot.xPos = robot.xPos > robot.grid.min_x ? robot.xPos -= 1 : robot.xPos;
            break;
        case CardinalDirection.EAST:
            robot.xPos = robot.xPos < robot.grid.max_x ? robot.xPos += 1 : robot.xPos;
            break;
        case CardinalDirection.SOUTH:
            robot.yPos = robot.yPos > robot.grid.min_y ? robot.yPos -= 1 : robot.yPos;
            break;
        default:
            break;
    }
}
function report(robot) {
    if (robot != null) {
        let reportStr = robot.xPos.toString() + "," + robot.yPos.toString() + "," + CardinalDirection[robot.direction].toString();
        let cmdOutput = document.getElementById("command-output");
        cmdOutput.value += cmdOutput.value == "" ? reportStr : "\n" + reportStr;
    }
}
/**
 * Takes a robot and a string of one or many commands separated by whitespaces.
 * @param robot
 * @param input
 */
function parseCommandInput(robot, input) {
    // Split the raw string into lines. Only one cmd per line is allowed.
    let inputArr = input.toUpperCase().split('\n');
    for (let i = 0; i < inputArr.length; i++) {
        // Split the string into an array delimited by a comma
        let inputValueArr = inputArr[i].split(',');
        // Grab the 'verb' part of the cmd
        let verb = inputValueArr[0];
        // If user tries to send a cmd other than PLACE, before the robot has been placed, ignore that cmd.
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
window.onload = () => {
    document.getElementById('run-sim').addEventListener('click', function () {
        // Create a new robot with a 5x5 grid
        [myRobot, myGrid] = initialiseSimulator(5, 5);
        let inputValue = document.getElementById('command-input').value;
        document.getElementById('command-output').value = "";
        parseCommandInput(myRobot, inputValue);
    });
    document.getElementById('report').addEventListener('click', function () { report(myRobot); });
    document.getElementById('clear').addEventListener('click', function () {
        myRobot = null;
        document.getElementById('command-input').value = "";
        document.getElementById('command-output').value = "";
    });
};
