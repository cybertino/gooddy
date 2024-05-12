import { Warehouse, Robot } from './core';
import { getRobotStartPosition, getWarehouseDimensions } from './config';
import { launchConsoleApp } from './apps/consoleApp';

const warehouse = new Warehouse({ dimensions: getWarehouseDimensions() });
const robot = new Robot({ startPosition: getRobotStartPosition(), warehouse });

launchConsoleApp(robot);
