import { readInputToLines } from '../util/readInput';

const numberMap: Record<string, string> = {
  'one': 'on1ne',
  'two': 'tw2wo',
  'three': 'thr3ree',
  'four': 'fou4ur',
  'five': 'fiv5ve',
  'six': 'si6ix',
  'seven': 'sev7ven',
  'eight': 'eig8ght',
  'nine': 'nin9ne',
};
const firstDigitRegex = /(\d{1})/;
const lastDigitRegex = /(\d{1})(\D*)$/;

const insertLiteralNumbers = (input: string): string => {
  let convertedString = input;
  Object.entries(numberMap).forEach(([stringNumber, withLiteralNumber]) => {
    convertedString = convertedString.replaceAll(stringNumber, withLiteralNumber);
  });
  return convertedString;
};

const run = async (): Promise<void> => {
  const lines = readInputToLines(__dirname);

  let total = 0;
  for await (const line of lines) {
    const lineWithNumbers = insertLiteralNumbers(line);

    const firstDigitMatch = lineWithNumbers.match(firstDigitRegex);
    const firstDigit = firstDigitMatch ? firstDigitMatch[1] : '0';

    const lastDigitMatch = lineWithNumbers.match(lastDigitRegex);
    const lastDigit = lastDigitMatch ? lastDigitMatch[1] : '0';

    total += Number(firstDigit.concat(lastDigit));
  }

  console.log('Trebuchet Calibration Setting: ' + total);
};

run();
