# Express Starter Template

Production-ready Express.js template with TypeScript, security middleware, and error handling.

## Quick Start

```bash
bun install
bun dev
```

## Features

- Security: Helmet, CORS, CSRF protection
- Logging: Winston with express-winston  
- Validation: express-validator with HttpError class
- Async error handling: asyncHandler wrapper
- Testing: Bun test with supertest
- Optional MongoDB support
- TypeScript strict mode

## Scripts

```bash
bun dev           # Development with nodemon
bun test          # Run tests
bun test --watch  # Watch mode
bun run build     # Compile TypeScript
bun start         # Production server
```

## Usage

### Creating Routes

See `lib/routes/index.ts` for examples. Use `asyncHandler` for async routes:

```typescript
import { asyncHandler, HttpError } from '../config/error';

router.get('/data', asyncHandler(async (req, res) => {
  const data = await fetchData();
  res.json({ data });
}));
```

### Testing

Tests use Bun's built-in test runner with supertest. See `lib/__tests__/app.test.ts` for examples:

```typescript
import { test, expect } from 'bun:test';
import request from 'supertest';
import app from '../app';

test('should handle requests', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBe(200);
});
```

## Git Hooks

Pre-commit hooks via Husky automatically run:

- `bun test` - Ensures all tests pass
- `bun run build` - Verifies TypeScript compiles

Skip hooks for WIP commits: `git commit --no-verify`

## Environment

Copy `.env.example` or set:

- `HOST` - Server host (default: localhost)
- `PORT` - Server port (default: 8080)
- `CSRF_ROUTE` - CSRF token endpoint
- `MONGODB_URI` - Uncomment in `main.ts` if needed

## License

MIT
