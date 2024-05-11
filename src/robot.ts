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

export class Robot {
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
    this.position = this.position.map((axisPosition, axis) =>
      this.aggregateAxisMoves(commands, axisPosition, axis),
    ) as Point;
  }

  private aggregateAxisMoves(
    commands: Command[],
    axisPosition: number,
    axis: number,
  ) {
    return commands.reduce((result, cmd) => {
      const move = commandMoves[cmd];
      const axisMove = move[axis];
      const newAxisPosition = result + axisMove;

      return this.warehouse.isWithinAxisRange(axis, newAxisPosition)
        ? newAxisPosition
        : result;
    }, axisPosition);
  }
}
