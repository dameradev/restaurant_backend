# Migration `20201127123243-keystone-cki08xgro0000vruj7m4lc2yp`

This migration has been generated at 11/27/2020, 1:32:43 PM.
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
migration 20201127123138-keystone-cki08w2j90000siuj7machtc4..20201127123243-keystone-cki08xgro0000vruj7m4lc2yp
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -16,10 +16,11 @@
   password String?
 }
 model Customer {
-  id   Int     @id @default(autoincrement())
-  name String?
+  id            Int     @id @default(autoincrement())
+  name          String?
+  from_customer Table[] @relation("Table_customer_many", references: [id])
 }
 model Restaurant {
   id          Int      @id @default(autoincrement())
@@ -29,13 +30,12 @@
   tables      Table[]  @relation("Tablerestaurant")
 }
 model Table {
-  id                     Int         @id @default(autoincrement())
-  number                 Int?        @unique @default(autoincrement())
-  reservationTime_utc    DateTime?
-  reservationTime_offset String?
-  seats                  Int?
-  description            String?
-  restaurant             Restaurant? @relation("Tablerestaurant", fields: [restaurantId], references: [id])
-  restaurantId           Int?        @map("restaurant")
+  id           Int         @id @default(autoincrement())
+  number       Int?        @unique @default(autoincrement())
+  seats        Int?
+  description  String?
+  restaurant   Restaurant? @relation("Tablerestaurant", fields: [restaurantId], references: [id])
+  restaurantId Int?        @map("restaurant")
+  customer     Customer[]  @relation("Table_customer_many", references: [id])
 }
```


