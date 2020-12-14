# Migration `20201211184126-keystone-ckikm9kan0000k8uj5qkiga0i`

This migration has been generated at 12/11/2020, 7:41:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Restaurant" ADD COLUMN     "slogan" TEXT,
ADD COLUMN     "descriptionTitle" TEXT,
ADD COLUMN     "reserveText" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127162322-keystone-cki0h62th0000asuj2jpr2g91..20201211184126-keystone-ckikm9kan0000k8uj5qkiga0i
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -16,13 +16,16 @@
   password String?
 }
 model Restaurant {
-  id          Int      @id @default(autoincrement())
-  name        String?
-  description String?
-  isActive    Boolean?
-  tables      Table[]  @relation("Tablerestaurant")
+  id               Int      @id @default(autoincrement())
+  name             String?
+  slogan           String?
+  description      String?
+  descriptionTitle String?
+  reserveText      String?
+  isActive         Boolean?
+  tables           Table[]  @relation("Tablerestaurant")
 }
 model Table {
   id           Int         @id @default(autoincrement())
```


