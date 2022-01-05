// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as path from 'path';
import { readdir, readFile } from 'fs/promises';

type Result = {
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

const getChildren = async ({ pathName, isDir = true }: GetChildrenParams) => {
  const allFiles = await readdir(pathName, { withFileTypes: true });
  return allFiles
    .filter((dir) => dir.isDirectory() === isDir)
    .map((dir) => dir.name);
};

const getResult = async (): Promise<Result> => {
  const results: Result = {
    album: '',
    song: '',
    lyric: '',
  };

  const pathName = path.join(process.cwd(), 'public', 'lyrics');
  const directories = await getChildren({ pathName });
  const directoryName = getRandom(directories);
  results.album = directoryName;

  const files = await getChildren({
    pathName: path.join(pathName, directoryName),
    isDir: false,
  });
  const fileName = getRandom(files);
  results.song = fileName;

  const filePath = path.join(pathName, directoryName, fileName);
  const rawData = await readFile(filePath, { encoding: 'utf8' });
  const line = getRandom(rawData.split('\n')).toLowerCase();
  results.lyric = line;

  return results;
};

const getLyric = async (_: NextApiRequest, res: NextApiResponse<Result>) => {
  const result = await getResult();
  return res.status(200).send(result);
};

export default getLyric;
