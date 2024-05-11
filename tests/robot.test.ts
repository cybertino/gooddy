import { Robot } from '@/robot';
import { GridSize, Point } from '@/types';

const defaultGrid: GridSize = [10, 10];
const defaultStart: Point = [5, 5];

describe('Robot', () => {
  it('Should correctly set starting point', () => {
    const robot = new Robot({
      startPosition: defaultStart,
      grid: defaultGrid,
    });

    expect(robot.position).toEqual(defaultStart);
  });

  it('Should correctly execute commands', () => {
    const [startX, startY] = defaultStart;

    const robot = new Robot({
      startPosition: defaultStart,
      grid: defaultGrid,
    });

    robot.execCommands(['N']);
    expect(robot.position).toEqual([startX, startY - 1]);

    robot.execCommands(['S']);
    expect(robot.position).toEqual(defaultStart);

    robot.execCommands(['W']);
    expect(robot.position).toEqual([startX - 1, startY]);

    robot.execCommands(['E']);
    expect(robot.position).toEqual(defaultStart);
  });

  it('Should not go outside of boundaries', () => {
    const startPosition: Point = [0, 0];

    // Let's set up a 1x1 grid so robot has no room to move
    const robot = new Robot({
      startPosition,
      grid: [1, 1],
    });

    robot.execCommands(['N', 'W', 'W', 'N']);
    expect(robot.position).toEqual(startPosition);

    robot.execCommands(['S', 'E', 'E', 'S']);
    expect(robot.position).toEqual(startPosition);
  });
});
