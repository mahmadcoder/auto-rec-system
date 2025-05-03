import { NextRequest, NextResponse } from 'next/server';
import { setupDatabase } from '@/lib/init-db';

export async function GET(req: NextRequest) {
  try {
    await setupDatabase();
    return NextResponse.json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
}
