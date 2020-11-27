# Migration `20201127123351-keystone-cki08yxgq0000yaujbheqfcam`

This migration has been generated at 11/27/2020, 1:33:51 PM.
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

CREATE TABLE "Customer" (
"id" SERIAL,
    "name" TEXT,

    PRIMARY KEY ("id")
)

DROP TABLE "_Table_users_many"

CREATE UNIQUE INDEX "Table.number_unique" ON "Table"("number")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127123243-keystone-cki08xgro0000vruj7m4lc2yp..20201127123351-keystone-cki08yxgq0000yaujbheqfcam
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -16,11 +16,10 @@
   password String?
 }
 model Customer {
-  id            Int     @id @default(autoincrement())
-  name          String?
-  from_customer Table[] @relation("Table_customer_many", references: [id])
+  id   Int     @id @default(autoincrement())
+  name String?
 }
 model Restaurant {
   id          Int      @id @default(autoincrement())
@@ -36,6 +35,5 @@
   seats        Int?
   description  String?
   restaurant   Restaurant? @relation("Tablerestaurant", fields: [restaurantId], references: [id])
   restaurantId Int?        @map("restaurant")
-  customer     Customer[]  @relation("Table_customer_many", references: [id])
 }
```


