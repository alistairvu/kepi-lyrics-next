import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <head>
          <Head />
          <link rel="manifest" href="/pwa/manifest.webmanifest" />
          <link rel="apple-touch-icon" href="/pwa/192x192.png"></link>
        </head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
