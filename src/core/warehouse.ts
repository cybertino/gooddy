import { Point } from '../types';

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

  // We could use dimensions only as a parameter but let's leave some room to extend it
  constructor({ dimensions }: WarehouseConfig) {
    if (dimensions[0] <= 0 || dimensions[1] <= 0) {
      throw new Error(
        `Warehouse dimensions ${JSON.stringify(dimensions)} are invalid`,
      );
    }

    this.dimensions = dimensions;
  }

  /**
   * Checks whether specified point is within Warehouse boundaries
   * @param {Point} point Point to be checked
   * @returns {boolean} True if point is within boundaries
   */
  isPointWithinBoundaries(point: Point): boolean {
    return (
      this.isWithinAxisRange(0, point[0]) && this.isWithinAxisRange(1, point[1])
    );
  }

  /**
   * Checks whether axis value is within acceptable range
   * @param {number} axis Axis index: 0 for X, 1 for Y
   * @param {number} value Axis value
   * @returns {boolean} True if value is within axis range
   */
  isWithinAxisRange(axis: number, value: number): boolean {
    if (axis < 0 || axis > 1) {
      throw new Error(
        `Wrong axis value: ${axis} is specified but only 0 and 1 are valid`,
      );
    }

    return 0 <= value && value < this.dimensions[axis];
  }
}
