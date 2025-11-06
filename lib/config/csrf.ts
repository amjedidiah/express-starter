import { doubleCsrf } from 'csrf-csrf';
import { Request } from 'express';

const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () =>
    process.env.CSRF_SECRET ?? 'your-secret-here-change-in-production',
  getSessionIdentifier: (req: Request) => {
    // Use client IP as identifier
    // In production with sessions, use: req.session.id
    return req.ip ?? 'anonymous';
  },
  cookieName: '__Host-csrf-token',
  cookieOptions: {
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
});

export { generateCsrfToken, doubleCsrfProtection };
