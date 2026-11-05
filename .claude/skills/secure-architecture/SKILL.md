---
name: secure-architecture
description: Nothing to install. The rules to follow while writing backend, API, database and app code on any stack (PHP/Laravel, Node/Express/NestJS/Next.js, Python/Django/FastAPI, Go, Java/Spring, .NET, Ruby/Rails; MySQL, PostgreSQL, SQL Server, SQLite, MongoDB; web, desktop and mobile clients) so it is secure by default, fast at scale and proven by tests. Covers input validation, injection, authorization per record, sessions and tokens, secrets, rate limits, uploads, SSRF, headers, indexing, N+1, pagination, caching, transactions, layering, error handling and the test pyramid. Use when building or changing an endpoint, a query, a table, auth, or anything that handles user data or money.
version: 1.0.0
---

# Secure, fast, tested: the rules while you write the code

Every request is untrusted, every table will grow, and nothing is done until a test proves it.
This file holds the rules; `references/stacks.md` maps each one to the tools of your stack, and
`references/databases.md` to your database engine.

**The project comes first.** Its existing conventions, framework and team rules win over the
examples here; these are the standards to meet, not a framework to impose. Check the installed
versions before using an API.

## 1. Security

### Input
- **Validate at the edge, once, with a schema**: type, format, length, range, allowed values, for
  every field of every request (body, query, route params, headers you trust, uploaded files).
  Keep only the validated fields and pass those on: unknown fields are dropped, never stored.
- **"Optional" means nullable all the way down:** an id that only exists after save is `null` on
  create. Normalise what browsers send as text (`""`, `"null"`, `"undefined"`) to real nulls
  before validating.
- **Mass assignment:** a model is filled only from an allowlist of fields. `role`, `is_admin`,
  `tenant_id`, `price` are set by the server, never from the request.

### Injection
- **Queries are parameterised, always:** ORM methods or bound parameters. Never concatenate or
  interpolate a value into SQL, a raw ORM query, a MongoDB filter built from JSON, a shell
  command, or an LDAP/XPath expression.
- Identifiers that can't be bound (a sort column, a direction) come from an **allowlist**, never
  from the request text.
- Shell commands get an argument array, never one string through a shell.

### Output
- **Escape by default** in every template; raw HTML output only for content the server produced
  and sanitised (with an allowlist sanitiser), and every raw spot treated as code to review.
- JSON responses never echo internals: no stack traces, SQL, file paths or other users' data.

### Authorization
- **Check every action on the server, per record.** "Logged in" is not "allowed": the user must
  own, or have a role for, *this* record (no IDOR: changing `/orders/41` to `/orders/42` must fail).
- Hiding a button is not access control; the endpoint behind it checks too.
- Deny by default; one central place for policies (policy classes, guards, middleware);
  the permission names match what the UI checks.
- Multi-tenant: every query is scoped to the tenant by the framework (a global scope / row-level
  security), not by remembering a `WHERE`.

### Sessions, tokens, passwords
- Web sessions and tokens live in **cookies with `HttpOnly`, `Secure` and `SameSite`**
  (`Lax` by default; `Strict` where no cross-site sign-in or redirect flow is involved; `None`
  only with `Secure` for real cross-site needs). Never in `localStorage`.
- Cookie-based auth needs **CSRF protection** on every state-changing request.
- Passwords: **Argon2id** (or bcrypt, cost ≥ 12) through the framework's hasher. Never log
  passwords, hashes, tokens, session ids or full card numbers.
- Short-lived access tokens, rotated refresh tokens, revocation on logout and password change.
- Native apps: secrets in the OS keystore (Keychain, Android Keystore / EncryptedSharedPreferences,
  Windows DPAPI). Certificate pinning only with backup pins and a rotation plan, or a certificate
  change locks every installed app out.

### Abuse limits
- **Rate-limit** every public endpoint, and harder on login, sign-up, password reset, OTP and
  anything that sends mail or costs money (per IP and per account).
- Login: after ~5 failures, slow down (exponential backoff) or lock the account temporarily,
  with a notice to its owner; same answer for "no such user" and "wrong password".
- Pagination and request-size limits on every list and upload.

### Files and outbound calls
- Uploads: check the **real type** (magic bytes), the size and the name; store outside the web
  root under a generated name; serve through a controller that checks access.
- **SSRF:** never fetch a URL the user supplied without an allowlist of hosts; block private and
  link-local ranges (127.0.0.0/8, 10/8, 172.16/12, 192.168/16, 169.254/16, ::1, fc00::/7).
- Outbound calls have timeouts, retries with backoff, and never send secrets in a URL.

### Platform
- **Secrets in the environment** (`.env` never committed, `.env.example` with placeholders) or a
  secret manager; nothing secret in code, tests, logs, fixtures or commit messages.
- Security headers: `Content-Security-Policy`, `Strict-Transport-Security`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `frame-ancestors` in the CSP.
- CORS: an explicit list of origins; never `*` with credentials.
- **Dependencies:** pinned by a lock file, audited before release (`npm audit`, `composer audit`,
  `pip-audit`, `govulncheck`, `dotnet list package --vulnerable`), no package added without a reason.

## 2. Database and performance

Write every query as if the table had 100 million rows, then measure the real one.

- **Index** every column used to filter, join or sort, as **composite indexes in ESR order**:
  equality columns first, then the sort column, then the range column. Check the plan
  (`EXPLAIN`); an index the plan doesn't use is cost without benefit.
- **Select the columns you need**, not `*`, on anything large or hot.
- **No N+1:** a loop that touches a relation has it eager-loaded (or joined) before the loop.
  Count queries in tests for the hot screens.
- **Paginate everything.** Offset paging is fine for small, admin-style lists; use **keyset
  (cursor) paging** (`WHERE (created_at, id) < (?, ?) ORDER BY created_at DESC, id DESC LIMIT n`)
  for feeds, infinite scroll and large tables.
- **Cache** reads that are hot and change rarely (settings, catalogues), with a TTL **and**
  invalidation on write; use the framework's cache with whatever store the project has (memory,
  file, Redis, Memcached). Never cache per-user data under a shared key.
- **Transactions** around every multi-write change that must succeed or fail as one; keep them
  short and never wait on an HTTP call inside one.
- **Money:** integer minor units or exact decimals, never floats; idempotency keys on payment and
  order endpoints, so a retry can't charge twice.
- **Migrations:** one structural change per file, reversible, run in order; big tables get
  online-safe changes (add nullable → backfill in batches → enforce).
- Long work (mail, exports, image processing, third-party calls) goes to a **queue/job**, not the
  request.

## 3. Structure

- **Thin entry points:** a controller / route handler / resolver authorises, validates, calls
  one service method and returns the response. No queries, loops or business rules in it.
- **Business logic in services or use-case classes**, independent of HTTP; they take plain
  values, not the request object.
- **A repository only when it earns its place:** raw or heavy queries, the same non-trivial query
  used in several places, or data access that must be swapped or mocked. Otherwise the service
  uses the ORM directly. (This keeps the benefit of Clean Architecture's separation without a
  layer of empty pass-through classes.)
- **Dependency injection:** collaborators come in through the constructor; no `new Client()`
  inside business code, no static calls into business logic.
- **One error handler** turns exceptions into safe responses (a stable error shape, a request id,
  no internals) and logs the detail server-side.
- Magic values (statuses, types, roles) live in enums or constants with their meaning, never as
  bare numbers or strings across the code.
- Configuration from the environment (Twelve-Factor): same build, different config per stage.

## 4. Tests

Nothing is done without tests that would fail if the code were wrong.

- **Pyramid:** many fast unit tests for business rules and calculations; integration tests for
  queries, repositories and endpoints; a few end-to-end tests for the journeys that make or lose
  money (sign-up, checkout, the main workflow).
- **Integration tests run on the same database engine as production** (a test database, or a
  container such as Testcontainers). An in-memory SQLite stand-in hides type, constraint, JSON
  and collation differences and lets broken queries pass.
- **Test the boundaries and the attacks**, not only the happy path: `null`, empty, very long,
  wrong type, unexpected extra fields, non-ASCII and emoji, negative and huge numbers, another
  user's id (must be refused), missing auth (must be refused), injection strings stored and
  rendered safely.
- Each bug fix starts with a test that reproduces it.
- A refactor keeps a before/after test proving the output didn't change.
- Coverage is a signal, not the goal: aim high on business logic (~80%+), don't chase it on glue.
- Tests are deterministic: no real network, fixed clocks and seeds, independent of order.

## 5. Before you call it done

- [ ] Every input validated by a schema at the edge; only validated fields used; mass assignment allowlisted.
- [ ] Every query parameterised; identifiers from allowlists.
- [ ] Every action authorised on the server, per record and per tenant.
- [ ] Cookies `HttpOnly` + `Secure` + `SameSite`, CSRF on, passwords hashed, nothing secret logged.
- [ ] Rate limits on public and sensitive endpoints; uploads and outbound URLs checked.
- [ ] Indexes match the queries (plan checked); no N+1; lists paginated; money exact and idempotent.
- [ ] Thin entry point → service; repository only where earned; one error handler.
- [ ] Unit + integration (same DB engine) + the attack and boundary cases; all green.
- [ ] Dependencies audited; secrets only in the environment.
