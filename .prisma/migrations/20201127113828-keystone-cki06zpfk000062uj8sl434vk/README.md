# Migration `20201127113828-keystone-cki06zpfk000062uj8sl434vk`

This migration has been generated at 11/27/2020, 12:38:28 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Restaurant" (
"id" SERIAL,
    "name" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN,

    PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127105916-init..20201127113828-keystone-cki06zpfk000062uj8sl434vk
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -13,5 +13,12 @@
   name     String?
   email    String?  @unique
   isAdmin  Boolean?
   password String?
+}
+
+model Restaurant {
+  id          Int      @id @default(autoincrement())
+  name        String?
+  description String?
+  isActive    Boolean?
 }
```


