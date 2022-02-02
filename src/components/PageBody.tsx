type PageBodyProps = {
  lyric: string;
  videoUrl: string;
};

export const PageBody = ({ lyric, videoUrl }: PageBodyProps) => (
  <main className="relative flex items-center justify-center w-screen h-screen overflow-hidden">
    <video
      loop
      autoPlay
      muted
      playsInline
      className="absolute z-10 object-fill w-auto h-auto min-w-full min-h-full max-w-none max-h-none"
    >
      <source src={videoUrl} type="video/mp4" />
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

      <div className="w-full py-4 space-x-5 text-center">
        <a
          href="https://twitter.com/kepilyrics"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 text-2xl font-semibold text-center text-purple-800 rounded-md bg-slate-100 hover:bg-slate-300 focus:outline-none focus:ring focus:ring-purple-300 drop-shadow-md"
        >
          view bot
        </a>

        <a
          href="https://twitter.com/intent/follow?screen_name=kepilyrics"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 text-2xl font-semibold text-center bg-purple-800 rounded-md text-slate-100 hover:bg-purple-900 focus:outline-none focus:ring focus:ring-purple-300 drop-shadow-md"
        >
          follow us
        </a>
      </div>

      <div className="w-full py-4 space-x-5 text-center">
        <a
          href="https://curiouscat.live/kepilyrics"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 text-2xl font-semibold text-center bg-orange-500 rounded-md text-slate-800 hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300 drop-shadow-md"
        >
          curiouscat
        </a>
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
);
