-- CreateTable
CREATE TABLE "UserClub" (
    "clubId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserClub_pkey" PRIMARY KEY ("clubId","userId")
);

-- CreateTable
CREATE TABLE "Post" (
    "clubId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "header" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("clubId","userId")
);

-- AddForeignKey
ALTER TABLE "UserClub" ADD CONSTRAINT "UserClub_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClub" ADD CONSTRAINT "UserClub_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
