import { Robot } from '@/robot';
import { Point } from '@/types';
import { Warehouse } from '@/warehouse';

const defaultStart: Point = [5, 5];
const defaultWarehouse = new Warehouse({
  dimensions: [10, 10],
});

describe('Robot', () => {
  it('Should correctly set starting point', () => {
    const robot = new Robot({
      startPosition: defaultStart,
      warehouse: defaultWarehouse,
    });

    expect(robot.position).toEqual(defaultStart);
  });

  it('Should should throw an error if starting point is outside of warehouse boundaries', () => {
    const startPosition: Point = defaultWarehouse.dimensions;

    const createRobot = () =>
      new Robot({
        startPosition,
        warehouse: defaultWarehouse,
      });

    expect(createRobot).toThrow(
      'Starting position is outside of Warehouse boundaries',
    );
  });

  it('Should correctly execute commands', () => {
    const [startX, startY] = defaultStart;

    const robot = new Robot({
      startPosition: defaultStart,
      warehouse: defaultWarehouse,
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
    const warehouse = new Warehouse({ dimensions: [1, 1] });

    // Let's set up a 1x1 grid so robot has no room to move
    const robot = new Robot({
      startPosition,
      warehouse,
    });

    robot.execCommands(['N', 'W', 'W', 'N']);
    expect(robot.position).toEqual(startPosition);

    robot.execCommands(['S', 'E', 'E', 'S']);
    expect(robot.position).toEqual(startPosition);
  });

  it('Should take set correct position after commands are executed', () => {
    const startPosition: Point = [2, 2];
    const warehouse = new Warehouse({ dimensions: [5, 5] });

    const robot = new Robot({
      startPosition,
      warehouse,
    });

    robot.execCommands([
      'W',
      'W',
      'N',
      'N',
      'W',
      'E',
      'N',
      'S',
      'E',
      'S',
      'E',
      'S',
    ]);

    expect(robot.position).toEqual([3, 3]);
  });
});
