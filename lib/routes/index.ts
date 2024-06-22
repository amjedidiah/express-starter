import { Router } from 'express';

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

export default router;
