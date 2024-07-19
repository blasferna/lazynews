import '@/lib/envConfig.js';
import {  defineConfig } from 'drizzle-kit';


export default defineConfig({
  schema: './src/db/drizzle/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
});
