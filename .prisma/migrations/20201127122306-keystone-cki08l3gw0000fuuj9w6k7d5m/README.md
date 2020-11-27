# Migration `20201127122306-keystone-cki08l3gw0000fuuj9w6k7d5m`

This migration has been generated at 11/27/2020, 1:23:06 PM.
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

CREATE TABLE "_Table_customer_many" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
)

DROP TABLE "_Table_users_many"

CREATE UNIQUE INDEX "_Table_customer_many_AB_unique" ON "_Table_customer_many"("A", "B")

CREATE INDEX "_Table_customer_many_B_index" ON "_Table_customer_many"("B")

CREATE UNIQUE INDEX "Table.number_unique" ON "Table"("number")

ALTER TABLE "_Table_customer_many" ADD FOREIGN KEY("A")REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_Table_customer_many" ADD FOREIGN KEY("B")REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127121156-keystone-cki086qmi00003kujbs8912di..20201127122306-keystone-cki08l3gw0000fuuj9w6k7d5m
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -8,14 +8,13 @@
   output   = "generated-client"
 }
 model User {
-  id         Int      @id @default(autoincrement())
-  name       String?
-  email      String?  @unique
-  isAdmin    Boolean?
-  password   String?
-  from_users Table[]  @relation("Table_users_many", references: [id])
+  id       Int      @id @default(autoincrement())
+  name     String?
+  email    String?  @unique
+  isAdmin  Boolean?
+  password String?
 }
 model Restaurant {
   id          Int      @id @default(autoincrement())
@@ -25,10 +24,20 @@
   tables      Table[]  @relation("Tablerestaurant")
 }
 model Table {
-  id           Int         @id @default(autoincrement())
-  number       Int?
-  restaurant   Restaurant? @relation("Tablerestaurant", fields: [restaurantId], references: [id])
-  restaurantId Int?        @map("restaurant")
-  users        User[]      @relation("Table_users_many", references: [id])
+  id                     Int         @id @default(autoincrement())
+  number                 Int?        @unique @default(autoincrement())
+  reservationTime_utc    DateTime?
+  reservationTime_offset String?
+  seats                  Int?
+  description            String?
+  restaurant             Restaurant? @relation("Tablerestaurant", fields: [restaurantId], references: [id])
+  restaurantId           Int?        @map("restaurant")
+  customer               Customer[]  @relation("Table_customer_many", references: [id])
+}
+
+model Customer {
+  id            Int     @id @default(autoincrement())
+  name          String?
+  from_customer Table[] @relation("Table_customer_many", references: [id])
 }
```


