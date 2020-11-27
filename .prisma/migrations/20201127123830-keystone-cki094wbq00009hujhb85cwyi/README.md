# Migration `20201127123830-keystone-cki094wbq00009hujhb85cwyi`

This migration has been generated at 11/27/2020, 1:38:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "_Table_users_many" DROP CONSTRAINT "_Table_users_many_A_fkey"

ALTER TABLE "_Table_users_many" DROP CONSTRAINT "_Table_users_many_B_fkey"

CREATE SEQUENCE "table_number_seq";
ALTER TABLE "Table" ADD COLUMN     "seats" INTEGER,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "number" SET DEFAULT nextval('table_number_seq');
ALTER SEQUENCE "table_number_seq" OWNED BY "public"."Table"."number"

DROP TABLE "_Table_users_many"

CREATE UNIQUE INDEX "Table.number_unique" ON "Table"("number")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127123351-keystone-cki08yxgq0000yaujbheqfcam..20201127123830-keystone-cki094wbq00009hujhb85cwyi
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -15,13 +15,8 @@
   isAdmin  Boolean?
   password String?
 }
-model Customer {
-  id   Int     @id @default(autoincrement())
-  name String?
-}
-
 model Restaurant {
   id          Int      @id @default(autoincrement())
   name        String?
   description String?
```


