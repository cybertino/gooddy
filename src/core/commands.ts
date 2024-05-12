import { trim } from 'radash';

export type Command = 'N' | 'S' | 'E' | 'W';

export const movementCommands: Command[] = ['N', 'S', 'E', 'W'];
export const supportedCommands: Command[] = [...movementCommands];

/**
 * Parses a string of command sequence
 * @param {string} sequence String of command sequence e.g. 'N E W S'
 * @returns {Command[]} Array of parsed commands
 */
export function parseCommandSequence(sequence: string): Command[] {
  if (!sequence) {
    throw new Error('Command sequence is empty');
  }

  const isValid = /^[a-zA-z\s]+$/g.test(sequence);

  if (!isValid) {
    throw new Error('Only A-z and space characters are allowed');
  }

  return sequence
    .split(' ')
    .filter((cmd) => !!cmd)
    .map((cmd) => parseCommand(trim(cmd)));
}

/**
 * Checks that command is supported and normalises it to uppercase
 * @param {string} command Command code
 * @returns {Command} Normalised command code
 */
export function parseCommand(command: string): Command {
  const normalized = command.toUpperCase();

  const isCommandSupported = (supportedCommands as string[]).includes(
    normalized,
  );

  if (!isCommandSupported) {
    throw new Error(`Command ${normalized} is not supported`);
  }

  return normalized as Command;
}
