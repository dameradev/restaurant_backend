# Migration `20201127140535-keystone-cki0c8vxm000095ujfju0f063`

This migration has been generated at 11/27/2020, 3:05:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "_Table_users_many" DROP CONSTRAINT "_Table_users_many_A_fkey"

ALTER TABLE "_Table_users_many" DROP CONSTRAINT "_Table_users_many_B_fkey"

CREATE SEQUENCE "table_number_seq";
ALTER TABLE "Table" ADD COLUMN     "description" TEXT,
ALTER COLUMN "number" SET DEFAULT nextval('table_number_seq');
ALTER SEQUENCE "table_number_seq" OWNED BY "public"."Table"."number"

DROP TABLE "_Table_users_many"

CREATE UNIQUE INDEX "Table.number_unique" ON "Table"("number")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127123830-keystone-cki094wbq00009hujhb85cwyi..20201127140535-keystone-cki0c8vxm000095ujfju0f063
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -26,9 +26,8 @@
 model Table {
   id           Int         @id @default(autoincrement())
   number       Int?        @unique @default(autoincrement())
-  seats        Int?
   description  String?
   restaurant   Restaurant? @relation("Tablerestaurant", fields: [restaurantId], references: [id])
   restaurantId Int?        @map("restaurant")
 }
```


