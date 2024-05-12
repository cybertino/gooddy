import { Warehouse } from './warehouse';
import { Robot } from './robot';
import { warehouseDimensions, robotStartPosition } from './config';
import { launchConsoleApp } from './consoleApp';

const warehouse = new Warehouse({ dimensions: warehouseDimensions });
const robot = new Robot({ startPosition: robotStartPosition, warehouse });

launchConsoleApp(robot);
