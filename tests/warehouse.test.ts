import { Warehouse, WarehouseDimensions } from '@/core';

const defaultDimensions: WarehouseDimensions = [10, 10];

describe('Warehouse', () => {
  it('Should correctly set dimensions', () => {
    const dimensions: WarehouseDimensions = [5, 5];

    const warehouse = new Warehouse({ dimensions });

    expect(warehouse.dimensions).toEqual(dimensions);
  });

  it('Should validate dimensions zero dimensions', () => {
    const createWarehouse = () => new Warehouse({ dimensions: [0, 0] });

    expect(createWarehouse).toThrow('Warehouse dimensions [0,0] are invalid');
  });

  it('Should validate dimensions negative dimensions', () => {
    const createWarehouse = () => new Warehouse({ dimensions: [-1, -2] });

    expect(createWarehouse).toThrow('Warehouse dimensions [-1,-2] are invalid');
  });

  it('Should correctly check each axis when point is checked against boundaries', () => {
    const warehouse = new Warehouse({ dimensions: defaultDimensions });

    const isWithinAxisRangeMock = jest
      .spyOn(warehouse, 'isWithinAxisRange')
      .mockReturnValue(true);

    warehouse.isPointWithinBoundaries([123, 321]);

    expect(isWithinAxisRangeMock).toHaveBeenCalledTimes(2);
    expect(isWithinAxisRangeMock).toHaveBeenNthCalledWith(1, 0, 123);
    expect(isWithinAxisRangeMock).toHaveBeenNthCalledWith(2, 1, 321);
  });

  it('Should correctly check point against boundaries', () => {
    const warehouse = new Warehouse({ dimensions: defaultDimensions });

    let result = warehouse.isPointWithinBoundaries([0, 200]);
    expect(result).toBe(false);

    result = warehouse.isPointWithinBoundaries([5, 5]);
    expect(result).toBe(true);
  });

  it('Should correctly check value against axis range', () => {
    const warehouse = new Warehouse({ dimensions: defaultDimensions });

    const checkAxis = (axis: number) => {
      let result = warehouse.isWithinAxisRange(axis, -1);
      expect(result).toBe(false);

      result = warehouse.isWithinAxisRange(axis, 0);
      expect(result).toBe(true);

      result = warehouse.isWithinAxisRange(axis, defaultDimensions[axis] - 1);
      expect(result).toBe(true);

      result = warehouse.isWithinAxisRange(axis, defaultDimensions[axis]);
      expect(result).toBe(false);
    };

    checkAxis(0);
    checkAxis(1);
  });

  it('Should throw an error if axis is invalid', () => {
    const warehouse = new Warehouse({ dimensions: defaultDimensions });

    const check = () => warehouse.isWithinAxisRange(4, 4);

    expect(check).toThrow(
      'Wrong axis value: 4 is specified but only 0 and 1 are valid',
    );
  });
});
