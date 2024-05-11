import { trim } from 'radash';

export type Command = 'N' | 'S' | 'E' | 'W';

export const supportedCommands: Command[] = ['N', 'S', 'E', 'W'];

export function parseCommandSequence(sequence: string) {
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
