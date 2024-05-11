import { Point, GridSize } from './types';
import { Command } from './commands';

const commandMoves: Record<Command, Point> = {
  N: [0, -1],
  S: [0, 1],
  W: [-1, 0],
  E: [1, 0],
};

export interface RobotConfig {
  startPosition: Point;
  grid: GridSize;
}

export class Robot {
  // Perhaps should be public only for read
  // Consider to use accessors
  public position: Point;

  private grid: GridSize;

  constructor({ startPosition, grid }: RobotConfig) {
    this.position = startPosition;
    this.grid = grid;
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

      if (newAxisPosition < 0) {
        return 0;
      }

      if (newAxisPosition > this.grid[axis] - 1) {
        return this.grid[axis] - 1;
      }

      return newAxisPosition;
    }, axisPosition);
  }
}
