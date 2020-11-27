# Migration `20201127121156-keystone-cki086qmi00003kujbs8912di`

This migration has been generated at 11/27/2020, 1:11:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "_Restaurant_users_many" DROP CONSTRAINT "_Restaurant_users_many_A_fkey"

ALTER TABLE "_Restaurant_users_many" DROP CONSTRAINT "_Restaurant_users_many_B_fkey"

CREATE TABLE "_Table_users_many" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
)

DROP TABLE "_Restaurant_users_many"

CREATE UNIQUE INDEX "_Table_users_many_AB_unique" ON "_Table_users_many"("A", "B")

CREATE INDEX "_Table_users_many_B_index" ON "_Table_users_many"("B")

ALTER TABLE "_Table_users_many" ADD FOREIGN KEY("A")REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_Table_users_many" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201127121020-keystone-cki084mon00000vujhx1q6su8..20201127121156-keystone-cki086qmi00003kujbs8912di
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgresql {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 generator client {
@@ -8,27 +8,27 @@
   output   = "generated-client"
 }
 model User {
-  id         Int          @id @default(autoincrement())
+  id         Int      @id @default(autoincrement())
   name       String?
-  email      String?      @unique
+  email      String?  @unique
   isAdmin    Boolean?
   password   String?
-  from_users Restaurant[] @relation("Restaurant_users_many", references: [id])
+  from_users Table[]  @relation("Table_users_many", references: [id])
 }
 model Restaurant {
   id          Int      @id @default(autoincrement())
   name        String?
   description String?
   isActive    Boolean?
   tables      Table[]  @relation("Tablerestaurant")
-  users       User[]   @relation("Restaurant_users_many", references: [id])
 }
 model Table {
   id           Int         @id @default(autoincrement())
   number       Int?
   restaurant   Restaurant? @relation("Tablerestaurant", fields: [restaurantId], references: [id])
   restaurantId Int?        @map("restaurant")
+  users        User[]      @relation("Table_users_many", references: [id])
 }
```


