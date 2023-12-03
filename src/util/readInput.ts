import readline from 'node:readline/promises';
import fs from 'node:fs';
import path from 'node:path';

export const readInputToLines = (directory: string): readline.Interface => {
  const filePath = process.argv[2] || path.join(directory, 'input.txt');
  const fileStream = fs.createReadStream(filePath);
  return readline.createInterface(fileStream);
};
