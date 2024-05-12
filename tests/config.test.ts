import { getRobotStartPosition, getWarehouseDimensions } from '@/config';

describe('Config', () => {
  it('Should correctly read Warehouse dimensions', () => {
    process.env = { WAREHOUSE_SIZE_X: '7', WAREHOUSE_SIZE_Y: '8' };

    const dimenisons = getWarehouseDimensions();

    expect(dimenisons).toEqual([7, 8]);
  });

  it('Should have default value for Warehouse dimensions', () => {
    process.env = {};

    const dimenisons = getWarehouseDimensions();

    expect(dimenisons[0]).toBeGreaterThan(0);
    expect(dimenisons[1]).toBeGreaterThan(0);
  });

  it('Should throw an error if environment vars for Warehouse dimensions are invalid', () => {
    process.env = { WAREHOUSE_SIZE_X: 'x', WAREHOUSE_SIZE_Y: 'y' };

    const getDimensions = () => getWarehouseDimensions();

    expect(getDimensions).toThrow();
  });

  it('Should correctly read Robot start point', () => {
    process.env = { ROBOT_START_X: '3', ROBOT_START_Y: '4' };

    const position = getRobotStartPosition();

    expect(position).toEqual([3, 4]);
  });

  it('Should have default value for Robot start point', () => {
    process.env = {};

    const position = getRobotStartPosition();

    expect(position[0]).toBeGreaterThanOrEqual(0);
    expect(position[1]).toBeGreaterThanOrEqual(0);
  });

  it('Should throw an error if environment vars for Robot start point are invalid', () => {
    process.env = { ROBOT_START_X: 'x', ROBOT_START_Y: 'y' };

    const getPosition = () => getRobotStartPosition();

    expect(getPosition).toThrow();
  });
});
