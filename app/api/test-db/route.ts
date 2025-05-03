import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Test database connection
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    
    return NextResponse.json({ 
      message: 'Database connection successful',
      result,
      status: 'success'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      error: 'Failed to connect to database', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
