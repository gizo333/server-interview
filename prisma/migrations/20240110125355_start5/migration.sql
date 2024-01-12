-- AlterTable
ALTER TABLE "User" ADD COLUMN     "github" TEXT,
ADD COLUMN     "lastname" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "telegram" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
