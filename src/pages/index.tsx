import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import { PageBody } from '~/components/PageBody';
import { PageContainer } from '~/components/PageContainer';
import { PageHeader } from '~/components/PageHeader';
import request from '~/lib/datocms';
import { getResult } from '~/utils/lyric';

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

    <PageContainer>
      <PageHeader />
      <PageBody
        videoUrl={information.backgroundVideo.video.mp4Url}
        lyric={lyric}
      />
    </PageContainer>
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
