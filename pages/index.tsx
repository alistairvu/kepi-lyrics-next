import type { GetServerSideProps, NextPage } from 'next';
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

    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-purple-500 to-purple-700 text-slate-100">
      <header className="absolute top-0 w-full py-2 text-center bg-white drop-shadow-md">
        <h1 className="text-4xl font-extrabold text-transparent cursor-default bg-gradient-to-bl from-purple-500 via-purple-700 to-purple-900 bg-clip-text">
          kepilyrics
        </h1>
      </header>

      <main className="max-w-4xl px-4">
        <h1 className="w-full text-4xl font-bold text-center md:text-6xl">
          {lyric}
        </h1>
        <h2 className="w-full py-2 text-2xl text-center md:text-3xl md:py-4">
          an hourly lyrics bot for Kep1er!
        </h2>
        <div className="w-full text-center">
          <button
            onClick={() => {
              window.open('https://twitter.com/kepilyrics', '_blank');
            }}
            className="px-3 py-2 mx-2 text-2xl font-semibold text-center text-purple-800 rounded-md bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring focus:ring-purple-300 drop-shadow-md"
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
            className="px-3 py-2 mx-2 text-2xl font-semibold text-center bg-purple-800 rounded-md text-slate-100 hover:bg-purple-900 focus:outline-none focus:ring focus:ring-purple-300 drop-shadow-md"
          >
            follow us
          </button>
        </div>
        <p className="w-full py-2 italic text-center">
          (refresh for another lyric on this page)
        </p>
      </main>
    </div>
  </>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const { lyric } = await getResult();
  return { props: { lyric } };
};

export default Home;
