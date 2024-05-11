import { draw, iterate } from 'radash';
import {
  Command,
  parseCommandSequence,
  parseCommand,
  supportedCommands,
} from '@/commands';

describe('parseCommandSequence()', () => {
  it('Should be parsed correctly', () => {
    const result = parseCommandSequence('N E W S');

    expect(result).toEqual(['N', 'E', 'W', 'S']);
  });

  it('Should allow lower case', () => {
    const parseSequence = () => parseCommandSequence('n e w s');

    expect(parseSequence).not.toThrow();
  });

  it('Should keep correct command positions', () => {
    // Let's create a random sequence
    const commands = iterate(
      10,
      (acc) => {
        const cmd = draw(supportedCommands);

        cmd && acc.push(cmd);

        return acc;
      },
      [] as Command[],
    );

    const sequence = commands.join(' ');
    const result = parseCommandSequence(sequence);

    // Order of the generated sequence must be kept
    expect(result).toEqual(commands);
  });

  it('Should trim extra spaces', () => {
    const result = parseCommandSequence(' N   E  W    S ');

    expect(result).toEqual(['N', 'E', 'W', 'S']);
  });

  it('Should throw an error if sequence is empty', () => {
    const parseEmptySequence = () => parseCommandSequence('');

    expect(parseEmptySequence).toThrow('Command sequence is empty');
  });

  it('Should not allow invalid characters', () => {
    const parseSequence = () => parseCommandSequence('N;W-E');

    expect(parseSequence).toThrow('Only A-z and space');
  });
});

describe('parseCommand()', () => {
  it('Should support lower case and return uppercase', () => {
    const result = parseCommand('n');

    expect(result).toBe('N');
  });

  it('Should throw an error if command is not supported', () => {
    const parse = () => parseCommand('Z');

    expect(parse).toThrow(`Command Z is not supported`);
  });
});
