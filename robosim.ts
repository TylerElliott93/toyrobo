const MAX_X : number = 5
const MIN_X : number = 0

const MAX_Y : number = 5
const MIN_Y : number = 0

enum CardinalDirection{
    NORTH,
    WEST,
    SOUTH,
    EAST
}

interface Robot {
    direction: CardinalDirection,
    xPos: number,
    yPos: number
}

// Place
function PlaceRobot(x:number, y:number, direction:string): Robot{
    let dir : CardinalDirection = getDirectionFromString(direction);
    if(dir!=null){
        const newBot: Robot = {
            direction:dir,
            xPos:x,
            yPos:y
        }
        return newBot;
    }
    return null;
}

function getDirectionFromString(direction:string) : CardinalDirection{
    direction = direction.toUpperCase();
    
    switch(direction){
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

function turn(orientation:string, robot:Robot){
    orientation = orientation.toUpperCase();
    if (orientation == "RIGHT"){
        robot.direction = robot.direction == CardinalDirection.NORTH ? 3 : robot.direction -= 1
    }else if(orientation = "LEFT"){
        robot.direction = robot.direction == CardinalDirection.EAST ? 0 : robot.direction += 1
    }
}

function move(robot:Robot){
    switch(robot.direction){
        case CardinalDirection.NORTH:
            robot.yPos = robot.yPos < MAX_Y ? robot.yPos+=1 : robot.yPos;
            break;
        case CardinalDirection.WEST:
            robot.xPos = robot.xPos > MIN_X ? robot.xPos-=1 : robot.xPos;
            break;
        case CardinalDirection.EAST:
            robot.xPos = robot.xPos < MAX_X ? robot.xPos+=1 : robot.xPos;
            break;
        case CardinalDirection.SOUTH:
            robot.yPos = robot.yPos > MIN_Y ? robot.yPos-=1 : robot.yPos;
            break;
    }
}

// Report
function report(robot:Robot){
    let reportStr = robot.xPos.toString() + robot.yPos.toString() + CardinalDirection[robot.direction].toString();
    document.getElementById("console").innerText = reportStr;
} 

function parseCommandInput(){
    var inputValue = (<HTMLInputElement>document.getElementById('commandInput')).value;

    console.log(inputValue);
}

// Execution
let myBot = PlaceRobot(0,0,"NORTH");

window.onload = () => {
    document.getElementById('runSim').addEventListener('click', parseCommandInput);
}


