// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import nc from 'next-connect';
import type { Result } from '../../utils';
import { getResult } from '../../utils';

const getLyric = async (res: NextApiResponse<Result>) => {
  const result = await getResult();
  return res.status(200).send(result);
};

export default nc().get((_, res) => getLyric(res as NextApiResponse<Result>));
