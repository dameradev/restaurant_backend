# Migration `20201127121020-keystone-cki084mon00000vujhx1q6su8`

This migration has been generated at 11/27/2020, 1:10:20 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "_Restaurant_users_many" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
)

CREATE UNIQUE INDEX "_Restaurant_users_many_AB_unique" ON "_Restaurant_users_many"("A", "B")

CREATE INDEX "_Restaurant_users_many_B_index" ON "_Restaurant_users_many"("B")

ALTER TABLE "_Restaurant_users_many" ADD FOREIGN KEY("A")REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_Restaurant_users_many" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127120622-keystone-cki07zkl60000wquj5re6f13w..20201127121020-keystone-cki084mon00000vujhx1q6su8
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -8,21 +8,23 @@
   output   = "generated-client"
 }
 model User {
-  id       Int      @id @default(autoincrement())
-  name     String?
-  email    String?  @unique
-  isAdmin  Boolean?
-  password String?
+  id         Int          @id @default(autoincrement())
+  name       String?
+  email      String?      @unique
+  isAdmin    Boolean?
+  password   String?
+  from_users Restaurant[] @relation("Restaurant_users_many", references: [id])
 }
 model Restaurant {
   id          Int      @id @default(autoincrement())
   name        String?
   description String?
   isActive    Boolean?
   tables      Table[]  @relation("Tablerestaurant")
+  users       User[]   @relation("Restaurant_users_many", references: [id])
 }
 model Table {
   id           Int         @id @default(autoincrement())
```


