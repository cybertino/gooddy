import { Warehouse, Robot } from './core';
import { getRobotStartPosition, getWarehouseDimensions } from './config';

import { launchConsoleApp } from './apps/consoleApp';
import { launchCliApp } from './apps/cliApp';

const [appType = 'console'] = process.argv.slice(2);

const supportedApps = ['console', 'cli'];

if (!supportedApps.includes(appType)) {
  console.log(`App type "${appType}" is not supported`);
  process.exit();
}

const warehouse = new Warehouse({ dimensions: getWarehouseDimensions() });
const robot = new Robot({ startPosition: getRobotStartPosition(), warehouse });

if (appType === 'console') {
  launchConsoleApp(robot);
} else if (appType === 'cli') {
  launchCliApp(robot);
}
