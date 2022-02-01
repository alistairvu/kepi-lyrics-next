import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';
import '~/styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID || '', {
    debug: process.env.NODE_ENV !== 'production',
  });

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      mixpanel.track(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default MyApp;
