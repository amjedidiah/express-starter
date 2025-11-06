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
- Optional MongoDB support
- TypeScript strict mode

## Scripts

```bash
bun dev       # Development with nodemon
bun run build     # Compile TypeScript
bun start         # Production server
```

## Usage

See `lib/routes/index.ts` for examples. Use `asyncHandler` for async routes:

```typescript
import { asyncHandler, HttpError } from '../config/error';

router.get('/data', asyncHandler(async (req, res) => {
  const data = await fetchData();
  res.json({ data });
}));
```

## Environment

Copy `.env.example` or set:

- `HOST` - Server host (default: localhost)
- `PORT` - Server port (default: 8080)
- `CSRF_ROUTE` - CSRF token endpoint
- `MONGODB_URI` - Uncomment in `main.ts` if needed

## License

MIT
