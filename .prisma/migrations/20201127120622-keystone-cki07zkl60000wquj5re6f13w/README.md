# Migration `20201127120622-keystone-cki07zkl60000wquj5re6f13w`

This migration has been generated at 11/27/2020, 1:06:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Table" (
"id" SERIAL,
    "number" INTEGER,
    "restaurant" INTEGER,

    PRIMARY KEY ("id")
)

ALTER TABLE "Table" ADD FOREIGN KEY("restaurant")REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127113828-keystone-cki06zpfk000062uj8sl434vk..20201127120622-keystone-cki07zkl60000wquj5re6f13w
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -20,5 +20,13 @@
   id          Int      @id @default(autoincrement())
   name        String?
   description String?
   isActive    Boolean?
+  tables      Table[]  @relation("Tablerestaurant")
+}
+
+model Table {
+  id           Int         @id @default(autoincrement())
+  number       Int?
+  restaurant   Restaurant? @relation("Tablerestaurant", fields: [restaurantId], references: [id])
+  restaurantId Int?        @map("restaurant")
 }
```


