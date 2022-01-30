import type { NextApiRequest, NextApiResponse } from 'next';
import type { Result } from '../../utils/lyric';
import { getResult } from '../../utils/lyric';
import twitterClient from '../../lib/twitter';
import { PrismaClient } from '@prisma/client';

const getLyric = async (res: NextApiResponse<Result>) => {
  const result = await getResult();
  return res.status(200).send(result);
};

const postLyric = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authHeader = req.headers.authorization;
    const prisma = new PrismaClient();

    if (!authHeader) {
      throw new Error(`Invalid authorization header: ${authHeader}`);
    }

    const nextTweetContent: Result = {
      album: '',
      lyric: '',
      song: '',
    };

    const prevTweetContent = await prisma.tweetData.findFirst({
      orderBy: {
        updatedAt: 'desc',
      },
    });

    do {
      // eslint-disable-next-line no-await-in-loop
      const { lyric, song, album } = await getResult();
      nextTweetContent.lyric = lyric;
      nextTweetContent.song = song;
      nextTweetContent.album = album;
    } while (
      // eslint-disable-next-line no-unmodified-loop-condition
      prevTweetContent !== null &&
      prevTweetContent.lyric !== nextTweetContent.lyric &&
      prevTweetContent.song !== nextTweetContent.song
    );

    const tweet = `${
      nextTweetContent.lyric
    }\n\n— ${nextTweetContent.song.toLowerCase()}`;

    if (authHeader !== `Bearer ${process.env.AUTH_SECRET_KEY}`) {
      return res.status(200).send({
        success: true,
        tweeted: false,
        tweet,
        message: `Invalid authorization header: ${authHeader}`,
      });
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    await Promise.all([
      twitterClient.tweetsV2.createTweet({
        text: tweet,
      }),

      prisma.tweetData.create({
        data: {
          ...nextTweetContent,
        },
      }),

      prisma.tweetData.deleteMany({
        where: {
          updatedAt: {
            lt: yesterday,
          },
        },
      }),
    ]);

    return res.status(200).send({ success: true, tweeted: true, tweet });
  } catch (err: any) {
    return res.status(500).send({
      success: false,
      code: err.code || 500,
      message: err.message || 'Something went wrong',
      err: JSON.stringify(err),
    });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return postLyric(req, res);
  }

  if (req.method === 'GET') {
    return getLyric(res);
  }

  return res.send({ success: false, code: 404, message: 'Route not found' });
};

export default handler;
