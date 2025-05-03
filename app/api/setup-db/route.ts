import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Create tables using Prisma schema
    // This is a workaround for when prisma db push has permission issues
    
    // Check if tables exist by trying to count users
    let tablesExist = true;
    try {
      await prisma.user.count();
    } catch (error) {
      tablesExist = false;
    }
    
    if (tablesExist) {
      return NextResponse.json({ 
        message: 'Database tables already exist',
        status: 'success'
      });
    }
    
    // Execute raw SQL to create tables based on our Prisma schema
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "email" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "name" TEXT,
        "resetToken" TEXT,
        "resetTokenExpiry" TIMESTAMP(3),
        "otp" TEXT,
        "otpExpiry" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
        "id" SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL,
        "token" TEXT NOT NULL,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "used" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `;
    
    return NextResponse.json({ 
      message: 'Database tables created successfully',
      status: 'success'
    });
  } catch (error) {
    console.error('Error setting up database:', error);
    return NextResponse.json({ 
      error: 'Failed to set up database',
      details: error instanceof Error ? error.message : String(error),
      status: 'error'
    }, { status: 500 });
  }
}
