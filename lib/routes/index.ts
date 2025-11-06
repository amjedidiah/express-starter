import { Router } from 'express';
import { asyncHandler } from '../config/error';
import { generateCsrfToken } from '../config/csrf';

const router = Router();

router.get('/', (req, res) =>
  res.send({
    name: process.env.npm_package_name ?? 'api',
    version: process.env.npm_package_version ?? '0.0.0',
    message: 'Hello! Caddy is handling HTTP/1.1, HTTP/2, and HTTP/3 for you.',
    timestamp: new Date().toISOString(),
    protocols: {
      clientToCaddy: req.headers['x-client-protocol'] ?? 'unknown',
      caddyToExpress: req.httpVersion,
    },
  })
);

// CSRF Token route
router.get(process.env.CSRF_ROUTE ?? '/csrf-token', (req, res) => {
  const csrfToken = generateCsrfToken(req, res);
  res.send({
    data: { csrfToken },
    message: 'CSRF Token fetched successfully',
  });
});

// Example async route with error handling
// router.get('/async-example', asyncHandler(async (req, res) => {
//   // Any errors thrown here will be caught by the error middleware
//   const data = await someAsyncOperation();
//   res.json({ data });
// }));

export default router;
