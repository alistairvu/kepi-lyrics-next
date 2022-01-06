import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { getResult } from '../utils/lyric';

const Home: NextPage<{ lyric: string }> = ({ lyric }: { lyric: string }) => (
  <>
    <Head>
      <title>kepilyrics</title>
      <meta
        name="description"
        content="An automated lyrics bot for Kep1er, running on the hour, every hour"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="w-screen h-screen bg-gradient-to-br from-purple-500 to-purple-700 text-slate-100 flex flex-col items-center justify-center">
      <header className="w-full absolute top-0 drop-shadow-md py-2 text-center bg-white">
        <h1 className="font-extrabold bg-gradient-to-bl from-purple-500 via-purple-700 to-purple-900 text-transparent bg-clip-text text-4xl">
          kepilyrics
        </h1>
      </header>

      <main className="px-4">
        <h1 className="text-center font-bold text-6xl w-full py-2">{lyric}</h1>
        <h2 className="text-center text-3xl w-full py-4">
          an hourly lyrics bot for Kep1er!
        </h2>
        <div className="w-full text-center">
          <button
            onClick={() => {
              window.open('https://twitter.com/kepilyrics', '_blank');
            }}
            className="text-center px-3 py-2 mx-2 rounded-md bg-slate-100 text-purple-800 font-semibold hover:bg-slate-200 focus:outline-none focus:ring focus:ring-purple-300 text-2xl drop-shadow-md"
          >
            view bot
          </button>

          <button
            onClick={() => {
              window.open(
                'https://twitter.com/intent/follow?screen_name=kepilyrics',
                '_blank'
              );
            }}
            className="text-center px-3 py-2 mx-2 rounded-md text-slate-100 bg-purple-800 font-semibold hover:bg-purple-900 focus:outline-none focus:ring focus:ring-purple-300 text-2xl drop-shadow-md"
          >
            follow us
          </button>
        </div>
        <p className="text-center w-full py-2 italic">
          (refresh for another lyric on this page)
        </p>
      </main>
    </div>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const { lyric } = await getResult();
  return { props: { lyric } };
};

export default Home;
