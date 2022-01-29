import type { NextApiRequest, NextApiResponse } from 'next';
import type { Result } from '../../utils/lyric';
import { getResult } from '../../utils/lyric';
import twitterClient from '../../lib/twitter';

const getLyric = async (res: NextApiResponse<Result>) => {
  const result = await getResult();
  return res.status(200).send(result);
};

const postLyric = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error(`Invalid authorization header: ${authHeader}`);
    }

    const { lyric, song } = await getResult();
    const tweet = `${lyric}\n\n— ${song.toLowerCase()}`;

    if (authHeader !== `Bearer ${process.env.AUTH_SECRET_KEY}`) {
      return res.status(200).send({
        success: true,
        tweeted: false,
        tweet,
        message: `Invalid authorization header: ${authHeader}`,
      });
    }

    await twitterClient.tweetsV2.createTweet({
      text: tweet,
    });
    return res.status(200).send({ success: true, tweeted: true, tweet });
  } catch (err: any) {
    return res
      .status(500)
      .send({
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
