import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import request from '../lib/datocms';
import { getResult } from '../utils/lyric';

type HomePageProps = {
  lyric: string;
  information: {
    seo: {
      attributes: any;
      content: string | null;
      tag: any;
    }[];
    backgroundVideo: {
      video: {
        mp4Url: string;
      };
    };
  };
};

const Home: NextPage<HomePageProps> = ({
  lyric,
  information,
}: HomePageProps) => (
  <>
    <Head>
      {renderMetaTags(information.seo)}
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 text-slate-100">
      <header className="absolute top-0 z-30 flex items-center justify-center w-full py-2 text-center bg-white drop-shadow-md">
        <h1 className="text-4xl font-extrabold text-transparent cursor-default bg-gradient-to-bl from-purple-500 via-purple-700 to-purple-900 bg-clip-text">
          kepilyrics
        </h1>
      </header>

      <main className="relative flex items-center justify-center w-screen h-screen overflow-hidden">
        <video
          loop
          autoPlay
          muted
          className="absolute z-10 object-fill w-auto h-auto min-w-full min-h-full max-w-none max-h-none"
        >
          <source
            src={information.backgroundVideo.video.mp4Url}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute z-20 min-w-full min-h-full opacity-75 bg-gradient-to-br from-purple-500 to-purple-700 max-w-none max-h-none" />

        <div className="z-30 max-w-4xl px-4">
          <h1 className="w-full text-4xl font-bold text-center md:text-6xl">
            {lyric}
          </h1>
          <h2 className="w-full py-2 text-2xl text-center md:text-3xl md:py-4">
            an hourly lyrics bot for Kep1er!
          </h2>
          <div className="w-full space-x-5 text-center">
            <button
              onClick={() => {
                window.open('https://twitter.com/kepilyrics', '_blank');
              }}
              className="px-3 py-2 text-2xl font-semibold text-center text-purple-800 rounded-md hover:scale-110 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring focus:ring-purple-300 drop-shadow-md"
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
              className="px-3 py-2 text-2xl font-semibold text-center bg-purple-800 rounded-md hover:scale-110 text-slate-100 hover:bg-purple-900 focus:outline-none focus:ring focus:ring-purple-300 drop-shadow-md"
            >
              follow us
            </button>
          </div>
          <p className="w-full py-1 italic text-center">
            (refresh for another lyric on this page)
          </p>

          <div className="w-full text-center">
            <a
              href="https://github.com/alistairvu/kepi-lyrics-next"
              className="w-full text-xs text-center hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </main>
    </div>
  </>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const [{ lyric }, { information }] = await Promise.all([
    getResult(),
    request({
      query: `{
    information {
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
      backgroundVideo {
        video {
          mp4Url
        }
      }
    }
  }
  `,
    }),
  ]);

  return { props: { lyric, information } };
};

export default Home;
