// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import type { Result } from '../../utils';
import { getResult } from '../../utils';
import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi(
  process.env.TWITTER_BEARER_TOKEN as string
);

const getLyric = async (res: NextApiResponse<Result>) => {
  const result = await getResult();
  return res.status(200).send(result);
};

const postLyric = async (res: NextApiResponse) => {
  try {
    const { lyric } = await getResult();
    await twitterClient.v1.tweet(lyric);
    res.status(200).send({ success: true, lyric });
  } catch (_) {
    res.status(500).send({ success: false });
  }
};

export default nc()
  .get((_, res) => getLyric(res as NextApiResponse<Result>))
  .post((_, res) => postLyric(res as NextApiResponse));
