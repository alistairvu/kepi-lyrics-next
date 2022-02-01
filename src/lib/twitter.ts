import { TwitterClient } from 'twitter-api-client';

const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY as string,
  apiSecret: process.env.TWITTER_API_SECRET as string,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export default twitterClient;
