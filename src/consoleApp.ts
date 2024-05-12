import Readline from 'node:readline';
import { stdin, stdout } from 'node:process';
import { emojify } from 'node-emoji';
import chalk from 'chalk';

import { parseCommandSequence } from './commands';
import { IRobot } from './robot';

export function launchConsoleApp(robot: IRobot) {
  const readline = Readline.createInterface({ input: stdin, output: stdout });

  readline.setPrompt(
    formatMessage(
      `Welcome, Commander! Ready for your orders! ${chalk.gray('(enter noting to exit)')}`,
    ),
  );

  readline.prompt();

  readline.on('line', (entry) => {
    try {
      if (!entry) {
        readline.close();
        return exit();
      }

      const sequence = parseCommandSequence(entry);

      robot.execCommands(sequence);

      printMessage(`OK, I am at ${chalk.green(`[${robot.position}]`)} now.`);

      readline.setPrompt(
        formatMessage(
          `Any other orders, sir? ${chalk.gray('(enter noting to exit)')}`,
        ),
      );

      readline.prompt();
    } catch (err) {
      const error = err as Error;
      printMessage(`${error.message} :confused:`);
    }
  });
}

function formatMessage(message: string) {
  return emojify(`:robot: ${chalk.blue(`Gooddy:`)} ${message}\n>`);
}

function printMessage(message: string) {
  console.log(formatMessage(message));
}

function exit() {
  printMessage('Shutting down... Have a good day, Commander!');
  process.exit();
}
