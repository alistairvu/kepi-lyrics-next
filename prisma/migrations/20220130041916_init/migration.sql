-- CreateTable
CREATE TABLE "TweetData" (
    "id" SERIAL NOT NULL,
    "lyric" TEXT NOT NULL,
    "song" TEXT NOT NULL,
    "album" TEXT NOT NULL,

    CONSTRAINT "TweetData_pkey" PRIMARY KEY ("id")
);
