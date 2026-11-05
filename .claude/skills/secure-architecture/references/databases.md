# The database rules, engine by engine

Before assuming what a column can hold, read its real type (`INFORMATION_SCHEMA.COLUMNS`, or the
engine's equivalent). Test on the same engine and major version as production.

## Reading the plan

| Engine | Plan | Look for |
|---|---|---|
| MySQL / MariaDB | `EXPLAIN ANALYZE SELECT …` (MySQL 8.0.18+), `EXPLAIN FORMAT=JSON` | `type: ALL` (full scan), `Using filesort`, `Using temporary`, rows examined ≫ rows returned |
| PostgreSQL | `EXPLAIN (ANALYZE, BUFFERS) SELECT …` | `Seq Scan` on a big table, a bad row estimate, `Sort` spilling to disk |
| SQL Server | Actual execution plan (`SET STATISTICS IO, TIME ON`) | Table/Clustered Index **Scan**, Key Lookups in a loop, implicit conversions (a `varchar` column compared with `nvarchar`) |
| SQLite | `EXPLAIN QUERY PLAN SELECT …` | `SCAN table` instead of `SEARCH … USING INDEX` |
| MongoDB | `.explain('executionStats')` | `COLLSCAN`, `totalDocsExamined` ≫ `nReturned`, an in-memory `SORT` |

## Indexes

- Composite indexes follow the query in **ESR order: Equality columns first, then the Sort
  column, then the Range column**. A range column placed before the sort column stops the index
  from serving the `ORDER BY` (true for SQL engines and MongoDB alike).
- One composite index often beats several single-column ones; drop indexes the plans never use.
- Covering indexes (MySQL/SQL Server `INCLUDE`, PostgreSQL `INCLUDE`) for hot read paths.
- Partial / filtered indexes for "active rows only" (PostgreSQL `WHERE`, SQL Server filtered
  index, SQLite partial index).
- Functions on a column in `WHERE` (`DATE(created_at) = …`, `LOWER(email) = …`) skip the index:
  rewrite as a range, or index the expression (PostgreSQL/SQLite expression index, MySQL
  functional index 8.0.13+, SQL Server computed column + index).
- `LIKE '%term%'` can't use a normal index: use full-text search (MySQL `FULLTEXT`, PostgreSQL
  `tsvector` + GIN or `pg_trgm`, SQL Server full-text, MongoDB text / Atlas Search).

## Keyset (cursor) pagination

```sql
-- First page
SELECT id, created_at, title FROM posts
WHERE tenant_id = ? ORDER BY created_at DESC, id DESC LIMIT 20;

-- Next page: pass the last row's (created_at, id) as the cursor
SELECT id, created_at, title FROM posts
WHERE tenant_id = ? AND (created_at, id) < (?, ?)
ORDER BY created_at DESC, id DESC LIMIT 20;
-- Index: (tenant_id, created_at DESC, id DESC)
```

Row-value comparison `(a, b) < (?, ?)` works in PostgreSQL, MySQL 8 and SQLite 3.15+. On SQL
Server write it out: `created_at < ? OR (created_at = ? AND id < ?)`, and page with
`OFFSET … FETCH` only for small lists. MongoDB: `find({ tenant, $or: [{ createdAt: { $lt: c } },
{ createdAt: c, _id: { $lt: id } }] }).sort({ createdAt: -1, _id: -1 }).limit(20)`.

## Engine-specific traps

- **SQL Server `bit`** turns any non-zero value into 1: a third state stored as `2` reads back as
  `1`. Two states only; three or more get a status column and an enum.
- **SQL Server collation and `nvarchar`:** compare like with like, or an implicit conversion
  scans the whole index.
- **MySQL `utf8`** is 3-byte (no emoji): use `utf8mb4`. Strict mode on (`STRICT_TRANS_TABLES`), or
  bad data is silently truncated.
- **PostgreSQL:** `NOT NULL` + defaults on big tables, and `CREATE INDEX CONCURRENTLY` for live
  tables. Row-level security (`CREATE POLICY`) is a strong guard for multi-tenant data.
- **SQLite:** types are loose (any column can hold any value unless `STRICT` tables); turn on
  `PRAGMA foreign_keys = ON` per connection; one writer at a time (WAL mode helps).
- **MongoDB:** never build a filter from raw request JSON: `{ "password": { "$ne": null } }`
  logs anyone in. Validate types first (a string must be a string) and strip `$` keys. No
  `$where` / server-side JavaScript with input. Use schema validation (`$jsonSchema`) on
  collections.

## Transactions and money

- Use the engine's transaction around multi-row changes; lock what you read-then-write
  (`SELECT … FOR UPDATE`, SQL Server `UPDLOCK`), or use an atomic update
  (`UPDATE stock SET qty = qty - ? WHERE id = ? AND qty >= ?`).
- Money: `DECIMAL(19,4)` / `NUMERIC` or integer minor units; never `FLOAT` / `REAL`.
- Unique constraints are the real guard against duplicates (idempotency keys, one order per
  cart); check them in code too for a friendly message.
