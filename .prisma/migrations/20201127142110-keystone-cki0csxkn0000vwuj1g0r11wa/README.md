# Migration `20201127142110-keystone-cki0csxkn0000vwuj1g0r11wa`

This migration has been generated at 11/27/2020, 3:21:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Table" ADD COLUMN     "seats" INTEGER

CREATE TABLE "Customer" (
"id" SERIAL,
    "name" TEXT,

    PRIMARY KEY ("id")
)

CREATE TABLE "_Table_customer_many" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
)

CREATE UNIQUE INDEX "_Table_customer_many_AB_unique" ON "_Table_customer_many"("A", "B")

CREATE INDEX "_Table_customer_many_B_index" ON "_Table_customer_many"("B")

ALTER TABLE "_Table_customer_many" ADD FOREIGN KEY("A")REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_Table_customer_many" ADD FOREIGN KEY("B")REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127140535-keystone-cki0c8vxm000095ujfju0f063..20201127142110-keystone-cki0csxkn0000vwuj1g0r11wa
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -26,8 +26,16 @@
 model Table {
   id           Int         @id @default(autoincrement())
   number       Int?        @unique @default(autoincrement())
+  seats        Int?
   description  String?
   restaurant   Restaurant? @relation("Tablerestaurant", fields: [restaurantId], references: [id])
   restaurantId Int?        @map("restaurant")
+  customer     Customer[]  @relation("Table_customer_many", references: [id])
+}
+
+model Customer {
+  id            Int     @id @default(autoincrement())
+  name          String?
+  from_customer Table[] @relation("Table_customer_many", references: [id])
 }
```


