import { RobotSimulator } from "./robotsimulator.js";

window.onload = () => {
  let outputConsole = <HTMLTextAreaElement>(
    document.getElementById("command-output")
  );

  let robotSimulator: RobotSimulator = new RobotSimulator(5, 5, outputConsole);

  // Run the simulator
  document.getElementById("run-sim").addEventListener("click", function () {
    let inputValue = (<HTMLInputElement>(
      document.getElementById("command-input")
    )).value;
    (<HTMLInputElement>document.getElementById("command-output")).value = "";
    robotSimulator.parseCommandInput(inputValue);
  });

  // Report the robot's position
  document.getElementById("report").addEventListener("click", function () {
    robotSimulator.report(outputConsole);
  });
};
