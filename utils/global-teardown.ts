import fs from 'fs/promises';
import path from 'path';

async function globalTeardown() {
  const filePath = path.resolve('storage', 'auth.json');
  try {
    await fs.unlink(filePath);
    console.log('🧹 Auth session file removed: storage/auth.json');
  } catch (err: any) {
    if (err.code !== 'ENOENT') {
      console.error('❌ Error deleting auth session file:', err);
    } else {
      console.warn('⚠️ Auth session file not found (already deleted?)');
    }
  }
}

export default globalTeardown;