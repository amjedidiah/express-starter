import { Router } from 'express';
import { asyncHandler } from '../config/error';

const router = Router();

const { npm_package_name, npm_package_version } = process.env;
router.get('/', (_req, res) =>
  res.send({ name: npm_package_name, version: npm_package_version })
);

// CSRF Protection route
router.get(process.env.CSRF_ROUTE as string, (req, res) =>
  res.send({
    data: { csrfToken: req.csrfToken() },
    message: 'CSRF Token fetched successfully',
  })
);

// Example async route with error handling
// router.get('/async-example', asyncHandler(async (req, res) => {
//   // Any errors thrown here will be caught by the error middleware
//   const data = await someAsyncOperation();
//   res.json({ data });
// }));

export default router;
