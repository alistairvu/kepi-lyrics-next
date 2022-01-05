import { readdir, readFile } from 'fs/promises';
import path from 'path';

export type Result = {
  album: string;
  song: string;
  lyric: string;
};

type GetChildrenParams = {
  pathName: string;
  isDir?: boolean;
};

const getRandom = (elements: string[]) =>
  elements[Math.floor(Math.random() * elements.length)];

const transformName = (name: string) => name.split('.')[0].split('-').join(' ');

const getChildren = async ({ pathName, isDir = true }: GetChildrenParams) => {
  const allFiles = await readdir(pathName, { withFileTypes: true });
  return allFiles
    .filter((dir) => dir.isDirectory() === isDir)
    .map((dir) => dir.name);
};

export const getResult = async (): Promise<Result> => {
  const results: Result = {
    album: '',
    song: '',
    lyric: '',
  };

  const pathName = path.join(process.cwd(), 'public', 'lyrics');
  const directories = await getChildren({ pathName });
  const directoryName = getRandom(directories);
  results.album = transformName(directoryName);

  const files = await getChildren({
    pathName: path.join(pathName, directoryName),
    isDir: false,
  });
  const fileName = getRandom(files);
  results.song = transformName(fileName);

  const filePath = path.join(pathName, directoryName, fileName);
  const rawData = await readFile(filePath, { encoding: 'utf8' });
  const line = getRandom(rawData.split('\n')).toLowerCase();
  results.lyric = line;

  return results;
};
