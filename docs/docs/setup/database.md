---
sidebar_position: 1
---

# Database

## Prerequisites

Before setting up the database, ensure you have installed the following software:

- [PostgreSQL](https://www.postgresql.org/download/) (latest version recommended)
- `psql` or a GUI tool like pgAdmin to run SQL queries

## Create a New Database

1. Open a terminal or command prompt.
2. Log in to PostgreSQL:
   ```sh
   psql -U postgres
   ```
   If using a password, enter the PostgreSQL administrator password.
3. Create a new database:
   ```sql
   CREATE DATABASE database_name;
   ```

## Import SQL File

Once the database is created, import the provided SQL file:

```sh
psql -U postgres -d database_name -f path/to/file.sql
```

Or, if using pgAdmin:

1. Open pgAdmin and connect to PostgreSQL.
2. Select the created database.
3. Click **Query Tool** > **File** > **Open File** and choose the SQL file.
4. Click **Execute** to run the SQL script.

## Verify Data

To ensure the data has been imported correctly, run the following commands in `psql`:

```sql
\c database_name;
\dt; -- View table list
SELECT * FROM table_name LIMIT 10; -- Check table contents
```

If tables and data appear as expected, the database setup is successful.

## Troubleshooting

If you encounter errors, check the following:

- Ensure PostgreSQL is running (`systemctl status postgresql` on Linux)
- Ensure the user has access to the database (`GRANT ALL PRIVILEGES ON DATABASE database_name TO postgres;`)
- If you get a `role does not exist` error, create a PostgreSQL user:
  ```sh
  createuser -P -s -e user_name
  ```
- If there are encoding issues, ensure the SQL file is using UTF-8 encoding.
