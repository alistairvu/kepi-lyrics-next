import { readdir, readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export type Result = {
  album: string;
  song: string;
  lyric: string;
};

type GetChildrenParams = {
  pathName: string;
  isDir?: boolean;
};

const getRandom = <T>(elements: T[]): T =>
  elements[Math.floor(Math.random() * elements.length)];

const getChildren = async ({ pathName, isDir = true }: GetChildrenParams) => {
  const allFiles = await readdir(pathName, { withFileTypes: true });
  return allFiles
    .filter((dir) => dir.isDirectory() === isDir)
    .map((dir) => dir.name);
};

export const getResult = async (): Promise<Result> => {
  const lyricsPath = path.join(process.cwd(), 'src', 'lyrics');

  const dirNames = await getChildren({
    pathName: lyricsPath,
  });

  const songNames = await Promise.all(
    dirNames.map((dir) =>
      getChildren({
        pathName: path.join(lyricsPath, dir),
        isDir: false,
      }).then((res) =>
        res.map((song) => ({
          dirName: dir,
          songName: song,
        }))
      )
    )
  ).then((res) => res.reduce((acc, curr) => [...acc, ...curr], []));

  const { dirName, songName } = getRandom(songNames);

  const fullPath = path.join(lyricsPath, dirName, songName);
  const fileContents = await readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const validLyrics = content
    .split('\n')
    .map((line) => line.trim().toLowerCase())
    .filter((line) => line.length);
  const lyric = getRandom(validLyrics);

  const { album, song } = data;

  return { album, song, lyric };
};
