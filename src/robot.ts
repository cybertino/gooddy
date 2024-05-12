import { Point } from './types';
import { Command } from './commands';
import { IWarehouse } from './warehouse';

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

  execCommands(commands: Command[]) {
    commands.forEach((cmd) => this.execSingleCommand(cmd));
  }

  private execSingleCommand(command: Command) {
    const move = commandMoves[command];

    this.position = this.position.map((axisPosition, axis) => {
      const axisMove = move[axis];
      const newAxisPosition = axisPosition + axisMove;

      return this.warehouse.isWithinAxisRange(axis, newAxisPosition)
        ? newAxisPosition
        : axisPosition;
    }) as Point;
  }
}
