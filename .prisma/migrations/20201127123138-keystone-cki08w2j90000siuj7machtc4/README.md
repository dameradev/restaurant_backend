# Migration `20201127123138-keystone-cki08w2j90000siuj7machtc4`

This migration has been generated at 11/27/2020, 1:31:38 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "_Table_users_many" DROP CONSTRAINT "_Table_users_many_A_fkey"

ALTER TABLE "_Table_users_many" DROP CONSTRAINT "_Table_users_many_B_fkey"

CREATE SEQUENCE "table_number_seq";
ALTER TABLE "Table" ADD COLUMN     "reservationTime_utc" TIMESTAMP(3),
ADD COLUMN     "reservationTime_offset" TEXT,
ADD COLUMN     "seats" INTEGER,
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
migration 20201127122306-keystone-cki08l3gw0000fuuj9w6k7d5m..20201127123138-keystone-cki08w2j90000siuj7machtc4
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -15,8 +15,13 @@
   isAdmin  Boolean?
   password String?
 }
+model Customer {
+  id   Int     @id @default(autoincrement())
+  name String?
+}
+
 model Restaurant {
   id          Int      @id @default(autoincrement())
   name        String?
   description String?
@@ -32,12 +37,5 @@
   seats                  Int?
   description            String?
   restaurant             Restaurant? @relation("Tablerestaurant", fields: [restaurantId], references: [id])
   restaurantId           Int?        @map("restaurant")
-  customer               Customer[]  @relation("Table_customer_many", references: [id])
-}
-
-model Customer {
-  id            Int     @id @default(autoincrement())
-  name          String?
-  from_customer Table[] @relation("Table_customer_many", references: [id])
 }
```


