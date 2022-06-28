import { CardinalDirection } from "./cardinalDirection.js";
/**
 * Contains methods to simulate control of a Robot on a Grid
 */
var RobotSimulator = /** @class */ (function () {
    /**
     * Creates a new empty Robot object and a grid object of given dimensions
     * @param gridWidth
     * @param gridHeight
     * @param console Not the most elegant solution,
     * @returns A Robot,Grid tuple
     */
    function RobotSimulator(gridWidth, gridHeight, console) {
        this.grid = {
            min_x: 0,
            max_x: gridWidth - 1,
            min_y: 0,
            max_y: gridHeight - 1
        };
        this.robot = {
            xPos: null,
            yPos: null,
            direction: null
        };
        this.console = console;
    }
    /**
     * Takes an object of type Robot and populates X,Y and direction values
     * @param x The X grid coordinate of the robot
     * @param y The Y grid coordinate of the robot
     * @param direction The direction in which the robot is facing
     * @param robot The robot object
     */
    RobotSimulator.prototype.place = function (x, y, direction, robot, grid) {
        if (direction != null &&
            x >= grid.min_x &&
            x <= grid.max_x &&
            y >= grid.min_y &&
            y <= grid.max_y) {
            robot.direction = direction;
            robot.xPos = x;
            robot.yPos = y;
        }
    };
    /**
     * Takes a robot object and returns true only if it has a direction and X,Y coord values
     * @param robot
     * @returns
     */
    RobotSimulator.prototype.robotOnGrid = function (robot) {
        return robot.direction != null && robot.xPos != null && robot.yPos != null;
    };
    /**
     * Converts a literal string to a CardinalDirection enum value
     * @param direction
     * @returns
     */
    RobotSimulator.prototype.getDirectionFromString = function (direction) {
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
    };
    /**
     *
     * @param orientation
     * @param robot
     */
    RobotSimulator.prototype.turn = function (orientation, robot) {
        orientation = orientation.toUpperCase();
        if (orientation == "RIGHT") {
            robot.direction =
                robot.direction == CardinalDirection.NORTH ? 3 : (robot.direction -= 1);
        }
        else if ((orientation = "LEFT")) {
            robot.direction =
                robot.direction == CardinalDirection.EAST ? 0 : (robot.direction += 1);
        }
    };
    /**
     * Moves a robot in the direction of its direction property. Will not move beyond the grid bounds.
     * @param robot
     * @param grid
     */
    RobotSimulator.prototype.move = function (robot, grid) {
        switch (robot.direction) {
            case CardinalDirection.NORTH:
                robot.yPos = robot.yPos < grid.max_y ? (robot.yPos += 1) : robot.yPos;
                break;
            case CardinalDirection.WEST:
                robot.xPos = robot.xPos > grid.min_x ? (robot.xPos -= 1) : robot.xPos;
                break;
            case CardinalDirection.EAST:
                robot.xPos = robot.xPos < grid.max_x ? (robot.xPos += 1) : robot.xPos;
                break;
            case CardinalDirection.SOUTH:
                robot.yPos = robot.yPos > grid.min_y ? (robot.yPos -= 1) : robot.yPos;
                break;
            default:
                break;
        }
    };
    /**
     * Returns a string representing the robot's coordinates on the grid.
     * Optionally prints that string to a HTMLTextAreaElement
     */
    RobotSimulator.prototype.report = function (console) {
        debugger;
        if (this.robot != null) {
            var reportStr = this.robot.xPos.toString() +
                "," +
                this.robot.yPos.toString() +
                "," +
                CardinalDirection[this.robot.direction].toString();
            if (console) {
                console.value += console.value == "" ? reportStr : "\n" + reportStr;
            }
            return reportStr;
        }
    };
    /**
     * Takes a robot and a string of one or many commands separated by whitespaces.
     * @param robot
     * @param input
     */
    RobotSimulator.prototype.parseCommandInput = function (input) {
        if (!input) {
            // Normally we'd use whatever logging framework is available to us but for now the console wil do.
            console.warn("No input string was provided to the RobotSimulator");
            return;
        }
        // Split the raw string into lines. Only one cmd per line is allowed.
        var inputArr = input.toUpperCase().split("\n");
        for (var i = 0; i < inputArr.length; i++) {
            // Split the string into an array delimited by a comma
            var inputValueArr = inputArr[i].split(",");
            // Grab the 'verb' part of the cmd
            var verb = inputValueArr[0];
            // If user tries to send a cmd other than PLACE, before the robot has been placed, ignore that cmd.
            if (verb != "PLACE" && !this.robotOnGrid(this.robot)) {
                continue;
            }
            switch (verb) {
                case "PLACE":
                    if (inputValueArr.length == 4) {
                        // We also need to grab the X and Y values and direction from the input
                        var x = parseInt(inputValueArr[1]);
                        var y = parseInt(inputValueArr[2]);
                        var direction = this.getDirectionFromString(inputValueArr[3]);
                        this.place(x, y, direction, this.robot, this.grid);
                    }
                    break;
                case "MOVE":
                    this.move(this.robot, this.grid);
                    break;
                case "LEFT":
                    this.turn("LEFT", this.robot);
                    break;
                case "RIGHT":
                    this.turn("RIGHT", this.robot);
                    break;
                case "REPORT":
                    this.report();
                    break;
                default:
                    break;
            }
            this.report(this.console);
        }
    };
    return RobotSimulator;
}());
export { RobotSimulator };
