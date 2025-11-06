// import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app';
import logger from './config/logger';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

// Optional: MongoDB connection (uncomment to use)
// mongoose
//   .connect(process.env.MONGODB_URI as string)
//   .then(() =>
//     app.listen(port, host, () => {
//       logger.info(`[ ready ] http://${host}:${port}`);
//     })
//   )
//   .catch(logger.error);

// Start server without MongoDB
app.listen(port, host, () => {
  logger.info(`[ ready ] http://${host}:${port}`);
});
