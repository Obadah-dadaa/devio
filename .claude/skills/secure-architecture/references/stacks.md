# The rules, stack by stack

Each row names the usual tool for the rule. Prefer what the project already uses; check its
installed version before using an API.

## Backends

| Rule | Laravel / PHP | Node: Express | Node: NestJS | Next.js (App Router) |
|---|---|---|---|---|
| Validate at the edge | FormRequest; use `$request->validated()` only | `zod` / `joi` schema middleware; use the parsed result | `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })` + class-validator DTOs | `zod` in every Server Action and route handler |
| Parameterised queries | Eloquent / query builder; raw: `DB::select('… ?', [$v])` | `pg` `$1`, `mysql2` `?`; Prisma `$queryRaw` tagged template, never `$queryRawUnsafe` with input | TypeORM QueryBuilder `:param`, Prisma as left | Same as the ORM in use |
| Mass assignment | `$fillable` (never `$guarded = []`) | Pick fields from the parsed schema | DTO whitelist (above) | Pick fields from the parsed schema |
| Authorise per record | Policies + `$this->authorize('update', $order)` | Middleware + an ownership check in the service (or CASL) | Guards + a resource check in the service | Check the session **and** ownership inside each action / handler (middleware alone is not enough) |
| CSRF | `@csrf` / `VerifyCsrfToken` (on for `web`) | `csrf-csrf` (double-submit) for cookie auth | Same as Express | Server Actions check the Origin; route handlers with cookies need a token or Origin check |
| Passwords | `Hash::make` (bcrypt; Argon2id in `config/hashing.php`) | `argon2` (Argon2id) or `bcrypt` | Same | Same, via the auth library |
| Rate limits | `RateLimiter::for` + `throttle:` middleware | `express-rate-limit` (Redis store when clustered) | `@nestjs/throttler` | Middleware or the host's limiter |
| Escape output | Blade `{{ }}`; `{!! !!}` only on sanitised HTML | Template engines' escaping tags; React escapes | — | React escapes; `dangerouslySetInnerHTML` only with a sanitiser |
| Migrations | `php artisan make:migration` | Knex / Prisma Migrate / Drizzle Kit | TypeORM / Prisma migrations | Prisma / Drizzle |
| Tests | Pest / PHPUnit + `RefreshDatabase` on the real engine | Vitest / Jest + Supertest + Testcontainers | Jest + `@nestjs/testing` + Supertest | Vitest + Playwright |
| Audit | `composer audit` | `npm audit` | `npm audit` | `npm audit` |

| Rule | Python: Django / DRF | Python: FastAPI | Ruby on Rails | Java: Spring Boot | .NET: ASP.NET Core | Go |
|---|---|---|---|---|---|---|
| Validate at the edge | Forms / DRF serializers | Pydantic models, `model_config = ConfigDict(extra='forbid')` | Strong parameters: `params.expect` (Rails 8) / `require().permit()` | `@Valid` + Bean Validation on DTOs | DataAnnotations / FluentValidation on DTOs | `go-playground/validator` on request structs |
| Parameterised queries | ORM; raw: `cursor.execute(sql, [v])` | SQLAlchemy; `text('… :v')` with params | `where(name: v)`, `where('name = ?', v)` | JPA named params / `JdbcTemplate` `?` | EF Core LINQ; `FromSql($"…{v}")` (parameterised), never `FromSqlRaw` with input | `db.Query(sql, args…)`, sqlc |
| Mass assignment | `ModelForm` / serializer `fields = [...]`, never `'__all__'` | Separate input and DB models | Strong parameters | DTOs, never bind entities | DTOs / `[Bind]` | Explicit struct mapping |
| Authorise per record | DRF permission classes + queryset filtered by user | `Depends()` auth + ownership check in the service | Pundit / CanCanCan | `@PreAuthorize` + resource check | Policies + `IAuthorizationService` resource checks | Middleware + check in the service |
| CSRF | `CsrfViewMiddleware` (on) | Token or Origin check for cookie auth | `protect_from_forgery` (on) | Spring Security CSRF (on) | Antiforgery (on for forms) | `http.CrossOriginProtection` (Go 1.25+) / `gorilla/csrf` |
| Passwords | `Argon2PasswordHasher` first in `PASSWORD_HASHERS` (needs `argon2-cffi`) | `argon2-cffi` / `pwdlib` | `has_secure_password` (bcrypt) | `Argon2PasswordEncoder` / BCrypt | Identity `PasswordHasher` | `x/crypto/argon2` / `bcrypt` |
| Rate limits | DRF throttling / `django-ratelimit` | `slowapi` | `rate_limit` (Rails 7.2+) / Rack::Attack | Bucket4j | Built-in rate limiter (.NET 7+) | `x/time/rate` |
| Escape output | Autoescape on | Jinja2 autoescape | ERB escapes | Thymeleaf `th:text` | Razor escapes | `html/template` |
| Migrations | Django migrations | Alembic | Rails migrations | Flyway / Liquibase | EF Core migrations | golang-migrate / goose |
| Tests | pytest-django | pytest + `TestClient` | RSpec / Minitest | JUnit 5 + Testcontainers | xUnit + `WebApplicationFactory` + Testcontainers | `testing` + testcontainers-go |
| Audit | `pip-audit` | `pip-audit` | `bundler-audit`, Brakeman | OWASP dependency-check | `dotnet list package --vulnerable` | `govulncheck` |

## Frontends (any framework)

- Never trust the client: every check the UI does is repeated on the server.
- No tokens in `localStorage` / `sessionStorage`; the server sets `HttpOnly` cookies.
- Render user content as text; HTML from users only through a sanitiser (DOMPurify).
- One request helper for the whole app (CSRF header, JSON/FormData, 401/422 handling, cancellation).
- Debounce typed searches 300-400 ms and abort the previous request.
- Secrets never in the bundle: anything in client code is public.

## Desktop and mobile clients

- Secrets in the OS store: Keychain (iOS/macOS), Android Keystore / EncryptedSharedPreferences,
  DPAPI / Credential Manager (Windows).
- TLS only; certificate pinning only with backup pins and a rotation plan.
- Treat local files and deep links as untrusted input; validate them like a request.
- Desktop shells (Electron, Tauri): no remote content with access to native APIs; narrow the
  allowed commands; validate every argument on the native side.
