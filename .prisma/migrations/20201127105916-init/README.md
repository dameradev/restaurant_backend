# Migration `20201127105916-init`

This migration has been generated at 11/27/2020, 11:59:16 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
"id" SERIAL,
    "name" TEXT,
    "email" TEXT,
    "isAdmin" BOOLEAN,
    "password" TEXT,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201127105916-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,17 @@
+datasource postgresql {
+  url = "***"
+  provider = "postgresql"
+}
+
+generator client {
+  provider = "prisma-client-js"
+  output   = "generated-client"
+}
+
+model User {
+  id       Int      @id @default(autoincrement())
+  name     String?
+  email    String?  @unique
+  isAdmin  Boolean?
+  password String?
+}
```


