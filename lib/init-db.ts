import { initializeDatabase } from './schema';

// This function can be called during app startup to ensure database tables exist
export async function setupDatabase() {
  try {
    console.log('Setting up database...');
    await initializeDatabase();
    console.log('Database setup complete');
  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  }
}
