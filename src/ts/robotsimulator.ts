import { CardinalDirection } from "./cardinalDirection.js";
import { Grid } from "./grid.js";
import { Robot } from "./robot.js";

/**
 * Contains methods to simulate control of a Robot on a Grid
 */
export class RobotSimulator {
  grid: Grid;
  robot: Robot;
  console: HTMLTextAreaElement;

  /**
   * Creates a new empty Robot object and a grid object of given dimensions
   * @param gridWidth
   * @param gridHeight
   * @param console Not the most elegant solution,
   * @returns A Robot,Grid tuple
   */
  constructor(
    gridWidth: number,
    gridHeight: number,
    console?: HTMLTextAreaElement
  ) {
    this.grid = {
      min_x: 0,
      max_x: gridWidth - 1,
      min_y: 0,
      max_y: gridHeight - 1,
    };

    this.robot = {
      xPos: null,
      yPos: null,
      direction: null,
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
  place(
    x: number,
    y: number,
    direction: CardinalDirection,
    robot: Robot,
    grid: Grid
  ): void {
    if (
      direction != null &&
      x >= grid.min_x &&
      x <= grid.max_x &&
      y >= grid.min_y &&
      y <= grid.max_y
    ) {
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
  robotOnGrid(robot: Robot): boolean {
    return robot.direction != null && robot.xPos != null && robot.yPos != null;
  }

  /**
   * Converts a literal string to a CardinalDirection enum value
   * @param direction
   * @returns
   */
  getDirectionFromString(direction: string): CardinalDirection {
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
  turn(orientation: string, robot: Robot) {
    orientation = orientation.toUpperCase();
    if (orientation == "RIGHT") {
      robot.direction =
        robot.direction == CardinalDirection.NORTH ? 3 : (robot.direction -= 1);
    } else if ((orientation = "LEFT")) {
      robot.direction =
        robot.direction == CardinalDirection.EAST ? 0 : (robot.direction += 1);
    }
  }

  /**
   * Moves a robot in the direction of its direction property. Will not move beyond the grid bounds.
   * @param robot
   * @param grid
   */
  move(robot: Robot, grid: Grid) {
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
  }

  /**
   * Returns a string representing the robot's coordinates on the grid.
   * Optionally prints that string to a HTMLTextAreaElement
   */
  report(console?: HTMLTextAreaElement): string {
    debugger;
    if (this.robot != null) {
      let reportStr =
        this.robot.xPos.toString() +
        "," +
        this.robot.yPos.toString() +
        "," +
        CardinalDirection[this.robot.direction].toString();

      if (console) {
        console.value += console.value == "" ? reportStr : "\n" + reportStr;
      }

      return reportStr;
    }
  }

  /**
   * Takes a robot and a string of one or many commands separated by whitespaces.
   * @param robot
   * @param input
   */
  parseCommandInput(input: string) {
    if (!input) {
      // Normally we'd use whatever logging framework is available to us but for now the console wil do.
      console.warn("No input string was provided to the RobotSimulator");
      return;
    }
    // Split the raw string into lines. Only one cmd per line is allowed.
    let inputArr: string[] = input.toUpperCase().split("\n");

    for (let i = 0; i < inputArr.length; i++) {
      // Split the string into an array delimited by a comma
      let inputValueArr = inputArr[i].split(",");

      // Grab the 'verb' part of the cmd
      let verb = inputValueArr[0];

      // If user tries to send a cmd other than PLACE, before the robot has been placed, ignore that cmd.
      if (verb != "PLACE" && !this.robotOnGrid(this.robot)) {
        continue;
      }
      switch (verb) {
        case "PLACE":
          if (inputValueArr.length == 4) {
            // We also need to grab the X and Y values and direction from the input
            let x: number = parseInt(inputValueArr[1]);
            let y: number = parseInt(inputValueArr[2]);
            let direction: CardinalDirection = this.getDirectionFromString(
              inputValueArr[3]
            );
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
  }
}
