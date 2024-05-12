import dotenv from 'dotenv';

dotenv.config();

import { WarehouseDimensions } from './core/warehouse';
import { Point } from './types';

export function getWarehouseDimensions(): WarehouseDimensions {
  const { WAREHOUSE_SIZE_X = '10', WAREHOUSE_SIZE_Y = '10' } = process.env;

  const whSizeX = parseInt(WAREHOUSE_SIZE_X);
  const whSizeY = parseInt(WAREHOUSE_SIZE_Y);

  if (isNaN(whSizeX) || isNaN(whSizeY)) {
    throw new Error('Invalid environment values for Warhouse dimenisons');
  }

  return [whSizeX, whSizeY];
}

export function getRobotStartPosition(): Point {
  const { ROBOT_START_X = '0', ROBOT_START_Y = '0' } = process.env;

  const robotStartX = parseInt(ROBOT_START_X);
  const robotStartY = parseInt(ROBOT_START_Y);

  if (isNaN(robotStartX) || isNaN(robotStartY)) {
    throw new Error('Invalid environment values for Robot start position');
  }

  return [robotStartX, robotStartY];
}
