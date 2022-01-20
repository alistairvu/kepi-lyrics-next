// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { TwitterClient } from 'twitter-api-client';
import type { Result } from '../../utils/lyric';
import { getResult } from '../../utils/lyric';

const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY as string,
  apiSecret: process.env.TWITTER_API_SECRET as string,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

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
      res.status(200).send({
        success: true,
        tweeted: false,
        tweet,
        message: `Invalid authorization header: ${authHeader}`,
      });
      return;
    }

    await twitterClient.tweets.statusesUpdate({
      status: tweet,
    });
    res.status(200).send({ success: true, tweeted: true, tweet });
  } catch (err: any) {
    res
      .status(500)
      .send({ success: false, code: err.code, message: err.message });
  }
};

export default nc()
  .get((_, res) => getLyric(res as NextApiResponse<Result>))
  .post((req, res) => {
    postLyric(req as NextApiRequest, res as NextApiResponse);
  });
