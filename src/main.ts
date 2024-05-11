import Readline from 'node:readline';
import { stdin, stdout } from 'node:process';
import { emojify } from 'node-emoji';
import chalk from 'chalk';

import { parseCommandSequence } from './commands';
import { Warehouse } from './warehouse';
import { Robot } from './robot';

const warehouse = new Warehouse({ dimensions: [10, 10] });
const robot = new Robot({ startPosition: [0, 0], warehouse });

const readline = Readline.createInterface({ input: stdin, output: stdout });

readline.setPrompt(
  formatMessage(
    `What are your commands, sir? ${chalk.gray('(enter noting to exit)')}`,
  ),
);

readline.prompt();

readline.on('line', (entry) => {
  try {
    if (!entry) {
      return exit();
    }

    const sequence = parseCommandSequence(entry);

    robot.execCommands(sequence);

    printMessage(`OK, I am at ${chalk.green(`[${robot.position}]`)} now.`);

    readline.setPrompt(
      formatMessage(
        `Any other orders, commander? ${chalk.gray('(enter noting to exit)')}`,
      ),
    );

    readline.prompt();
  } catch (err) {
    const error = err as Error;
    printMessage(`${error.message} :confused:`);
  }
});

function formatMessage(message: string) {
  return emojify(`:robot: ${chalk.blue(`Gooddy:`)} ${message}\n>`);
}

function printMessage(message: string) {
  console.log(formatMessage(message));
}

function exit() {
  printMessage('Have a good day, commander!');
  readline.close();
  process.exit();
}
