import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
const MONGODB_DB_NAME = process.env.MONGO_DB_NAME || 'portfolio_db';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: Cached | undefined;
}

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const cached: Cached = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DB_NAME,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
