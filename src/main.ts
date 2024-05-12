import { Warehouse, Robot } from './core';
import { warehouseDimensions, robotStartPosition } from './config';
import { launchConsoleApp } from './apps/consoleApp';

const warehouse = new Warehouse({ dimensions: warehouseDimensions });
const robot = new Robot({ startPosition: robotStartPosition, warehouse });

launchConsoleApp(robot);
