import { Point } from '../types';
import { Command } from './commands';
import { IWarehouse } from './warehouse';

// Dictionary that defines increments
// for Robot position per axis
const commandMoves: Record<Command, Point> = {
  N: [0, -1],
  S: [0, 1],
  W: [-1, 0],
  E: [1, 0],
};

export interface RobotConfig {
  startPosition: Point;
  warehouse: IWarehouse;
}

export interface IRobot {
  get position(): Point;
  execCommands(commands: Command[]): void;
}

export class Robot implements IRobot {
  // Perhaps should be public only for read
  // Consider to use accessors
  public position: Point;

  private warehouse: IWarehouse;

  constructor({ startPosition, warehouse }: RobotConfig) {
    this.position = startPosition;
    this.warehouse = warehouse;

    const isValidStart = warehouse.isPointWithinBoundaries(this.position);

    if (!isValidStart) {
      throw new Error('Starting position is outside of Warehouse boundaries');
    }
  }

  /**
   * Executes specified commands
   * @param {Command[]} commands Array of commands to execute, e.g. ['N', 'W', 'E', 'S']
   */
  execCommands(commands: Command[]) {
    commands.forEach((cmd) => this.execSingleCommand(cmd));
  }

  // Entry point to process each command
  private execSingleCommand(command: Command) {
    const move = commandMoves[command];

    // Let's iterate through each axis and apply increments
    this.position = this.position.map((axisPosition, axis) => {
      const axisMove = move[axis];
      const newAxisPosition = axisPosition + axisMove;

      return this.warehouse.isWithinAxisRange(axis, newAxisPosition)
        ? newAxisPosition
        : axisPosition;
    }) as Point;
  }
}
