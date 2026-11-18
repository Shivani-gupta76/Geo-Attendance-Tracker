import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const configuredJwtSecret = process.env.JWT_SECRET?.trim();
if (!configuredJwtSecret || configuredJwtSecret.length < 32 || /^(replace|change|your)[-_ ]/i.test(configuredJwtSecret)) {
  throw new Error('JWT_SECRET must be configured as a unique value of at least 32 characters.');
}

export const JWT_SECRET = configuredJwtSecret;
