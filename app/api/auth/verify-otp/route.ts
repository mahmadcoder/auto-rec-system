import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { User } from '@/types/user';

// Validation schema for OTP verification
const verifyOtpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(4, 'OTP must be 4 digits')
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validation = verifyOtpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { email, otp } = validation.data;
    
    // Find user by email with OTP fields using raw SQL
    const users = await prisma.$queryRaw`
      SELECT id, email, "otp", "otpExpiry" 
      FROM users 
      WHERE email = ${email}
    `;
    
    // Check if user exists
    if (!users || (users as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Invalid OTP or email' },
        { status: 400 }
      );
    }
    
    const user = (users as any[])[0];
    const userId = user.id;
    
    // Check if OTP exists and is not expired
    if (!user.otp) {
      return NextResponse.json(
        { error: 'No OTP requested or OTP expired' },
        { status: 400 }
      );
    }
    
    // Check if OTP is expired
    const now = new Date();
    const otpExpiry = new Date(user.otpExpiry);
    if (otpExpiry < now) {
      return NextResponse.json(
        { error: 'OTP has expired', expired: true },
        { status: 400 }
      );
    }
    
    // Verify OTP
    if (user.otp !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      );
    }
    
    // Generate a temporary token for password reset
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    // Update user with verified status using raw SQL
    await prisma.$executeRaw`
      UPDATE users 
      SET "resetToken" = ${resetToken}, "resetTokenExpiry" = ${resetTokenExpiry} 
      WHERE id = ${userId}
    `;
    
    return NextResponse.json({
      message: 'OTP verified successfully',
      resetToken
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
