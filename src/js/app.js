import { RobotSimulator } from "./robotsimulator.js";
window.onload = function () {
    var outputConsole = (document.getElementById("command-output"));
    var robotSimulator = new RobotSimulator(5, 5, outputConsole);
    // Run the simulator
    document.getElementById("run-sim").addEventListener("click", function () {
        var inputValue = (document.getElementById("command-input")).value;
        document.getElementById("command-output").value = "";
        robotSimulator.parseCommandInput(inputValue);
    });
    // Report the robot's position
    document.getElementById("report").addEventListener("click", function () {
        robotSimulator.report(outputConsole);
    });
};
