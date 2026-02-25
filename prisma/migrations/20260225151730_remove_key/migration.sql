-- DropIndex
DROP INDEX "UserItem_userId_itemId_key";

-- CreateIndex
CREATE INDEX "UserItem_itemId_idx" ON "UserItem"("itemId");
