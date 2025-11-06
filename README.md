# Express Starter Template

Production-ready Express.js template with TypeScript, security middleware, and error handling.

## Requirements

- Node.js 24.10.0 or higher (see `.nvmrc`)
- Bun

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

## Caddy Proxy (Optional)

Add automatic HTTPS and HTTP/2/HTTP/3 support using Caddy as a reverse proxy.

### Architecture

```txt
Client (H3/H2/H1) → Caddy (HTTPS :443) → Express (HTTP :8080)
```

### Setup

1. Install Caddy:

    ```bash
    # macOS
    brew install caddy

    # Linux
    sudo apt install caddy
    ```

2. Run both servers (separate terminals):

    ```bash
    bun dev          # Terminal 1
    caddy run        # Terminal 2
    ```

3. Access at `https://localhost` (Caddy auto-generates local SSL cert)

    **Verify protocols:**

    1. Check the JSON response at `https://localhost`:

        ```json
        {
          "protocols": {
            "clientToCaddy": "HTTP/2.0",
            "caddyToExpress": "1.1"
          }
        }
        ```

    2. View in DevTools (Optional):
        - Chrome/Firefox: Network tab → Enable "Protocol" column → Should show `h2` or `h3`

    3. Verify HTTP/3 support:

        ```bash
        curl -v https://localhost 2>&1 | grep -i "alt-svc"
        # Should show: alt-svc: h3=":443"; ma=2592000
        ```

### Troubleshooting

If Caddy doesn't exit properly when stopping the terminal, find and kill the process:

```bash
lsof -i :443        # Find Caddy PID
kill <PID>          # Replace <PID> with the actual process ID
```

For production, update `Caddyfile` with your domain - Caddy handles Let's Encrypt automatically.

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
- `CSRF_ROUTE` - CSRF token endpoint (default: /csrf-token)
- `CSRF_SECRET` - Secret for CSRF token generation (change in production)
- `MONGODB_URI` - Uncomment in `main.ts` if needed

## License

MIT
