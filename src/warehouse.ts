import { Point } from './types';

export type WarehouseDimensions = [number, number];

export interface WarehouseConfig {
  dimensions: WarehouseDimensions;
}

export interface IWarehouse {
  isPointWithinBoundaries(point: Point): boolean;
  isWithinAxisRange(axis: number, value: number): boolean;
}

export class Warehouse implements IWarehouse {
  public readonly dimensions: WarehouseDimensions;

  constructor({ dimensions }: WarehouseConfig) {
    if (dimensions[0] <= 0 || dimensions[1] <= 0) {
      throw new Error(
        `Warehouse dimensions ${JSON.stringify(dimensions)} are invalid`,
      );
    }

    this.dimensions = dimensions;
  }

  isPointWithinBoundaries(point: Point) {
    return (
      this.isWithinAxisRange(0, point[0]) && this.isWithinAxisRange(1, point[1])
    );
  }

  isWithinAxisRange(axis: number, value: number) {
    if (axis < 0 || axis > 1) {
      throw new Error(
        `Wrong axis value: ${axis} is specified but only 0 and 1 are valid`,
      );
    }

    return 0 <= value && value < this.dimensions[axis];
  }
}
