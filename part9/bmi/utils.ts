// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean =>
  isNaN(Number(argument));

export const parseArgs = (args: string[]): number[] => {

  if (args.length < 2) throw new Error('Not enough arguments');

  const numbers = args.map(arg => {
    if (!isNotNumber(arg)) {
      return Number(arg);
    } else {
      throw new Error('Provided values were not numbers!');
    }
  });

  return numbers;
};