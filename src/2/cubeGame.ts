import { readInputToLines } from "../util/readInput";

const cubeLimits: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};
const colorOptions = Object.keys(cubeLimits).join('|');

const getColorFromText = (input: string): string => {
  return input.match(`(${colorOptions})$`)![1];
};

const getNumberFromText = (input: string): number => {
  return Number(input.match(/(\d+)/)![1]);
};

const getCubesFromShow = (show: string): Record<string, number> => {
  const parsedCubes: Record<string, number> = {};
  const cubes = show.split(',');

  cubes.forEach((cube) => {
    parsedCubes[getColorFromText(cube)] = getNumberFromText(cube);
  });

  return parsedCubes;
};

const getMaxCubesFromGame = (game: string) => {
  const maxCubes: Record<string, number> = {};
  const shows = game.split(';').map(getCubesFromShow);

  shows.forEach((show) => {
    Object.keys(show).forEach((color) => {
      if (!maxCubes[color] || maxCubes[color] < show[color]) {
        maxCubes[color] = show[color];
      }
    })
  })

  return maxCubes;
}

const run = async (): Promise<void> => {
  const lines = readInputToLines(__dirname);

  let totalPossible = 0;
  let totalMinCubePowers = 0;
  for await (const line of lines) {
    const maxCubesInGame = getMaxCubesFromGame(line.split(':')[1]);
    
    let isPossible = true;
    Object.keys(cubeLimits).forEach((color) => {
      if (maxCubesInGame[color] > cubeLimits[color]) {
        isPossible = false;
      }
    });
    if (isPossible) totalPossible += getNumberFromText(line.split(':')[0]);

    totalMinCubePowers += Object.values(maxCubesInGame).reduce((runningTotal, currentCubeQty) => {
      return runningTotal*currentCubeQty;
    }, 1);
  };

  console.log('Sum of Possible Games: ' + totalPossible);
  console.log('Sum of Minimum Cube Powers: ' + totalMinCubePowers);
};

run();
