import { CardinalDirection } from "./cardinalDirection.js";

export interface Robot {
  direction: CardinalDirection;
  xPos: number;
  yPos: number;
}
