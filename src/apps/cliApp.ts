import chalk from 'chalk';
import { parseCommandSequence, IRobot } from '../core';

export function launchCliApp(robot: IRobot) {
  const sequence = process.argv.slice(3).join(' ');

  try {
    const commands = parseCommandSequence(sequence);

    console.log(`Robot start position: \t[${chalk.yellow(robot.position)}]`);

    console.log(
      `Commands to execute: \t[${chalk.yellow(commands.join(', '))}]`,
    );

    robot.execCommands(commands);

    console.log(`Robot final position: \t[${chalk.green(robot.position)}]`);
  } catch (err) {
    console.log(chalk.red(err.message));
  }
}
