import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Check if otp column exists in users table
    let otpColumnExists = true;
    try {
      // Try to query a user with otp field to see if it exists
      await prisma.$queryRaw`SELECT "otp" FROM users LIMIT 1`;
    } catch (error) {
      otpColumnExists = false;
    }
    
    if (otpColumnExists) {
      return NextResponse.json({ 
        message: 'OTP columns already exist in users table',
        status: 'success'
      });
    }
    
    // Add otp and otpExpiry columns to users table
    await prisma.$executeRaw`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS "otp" TEXT,
      ADD COLUMN IF NOT EXISTS "otpExpiry" TIMESTAMP(3)
    `;
    
    return NextResponse.json({ 
      message: 'OTP columns added to users table',
      status: 'success'
    });
  } catch (error) {
    console.error('Error migrating database:', error);
    return NextResponse.json({ 
      error: 'Failed to migrate database', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
