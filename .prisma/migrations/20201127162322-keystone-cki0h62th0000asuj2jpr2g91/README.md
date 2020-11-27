# Migration `20201127162322-keystone-cki0h62th0000asuj2jpr2g91`

This migration has been generated at 11/27/2020, 5:23:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Customer" ADD COLUMN     "reservationTime_utc" TIMESTAMP(3),
ADD COLUMN     "reservationTime_offset" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127142110-keystone-cki0csxkn0000vwuj1g0r11wa..20201127162322-keystone-cki0h62th0000asuj2jpr2g91
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -34,8 +34,10 @@
   customer     Customer[]  @relation("Table_customer_many", references: [id])
 }
 model Customer {
-  id            Int     @id @default(autoincrement())
-  name          String?
-  from_customer Table[] @relation("Table_customer_many", references: [id])
+  id                     Int       @id @default(autoincrement())
+  name                   String?
+  reservationTime_utc    DateTime?
+  reservationTime_offset String?
+  from_customer          Table[]   @relation("Table_customer_many", references: [id])
 }
```


