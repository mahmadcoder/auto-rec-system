import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Resend } from 'resend';
import { User } from '@/types/user';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema for resending OTP
const resendOtpSchema = z.object({
  email: z.string().email('Invalid email address')
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validation = resendOtpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { email } = validation.data;
    
    // Find user by email
    const userRecord = await prisma.user.findUnique({
      where: { email }
    });
    
    // Don't reveal if user exists or not for security reasons
    if (!userRecord) {
      return NextResponse.json(
        { message: 'If an account with that email exists, a new OTP has been sent' },
        { status: 200 }
      );
    }
    
    // Cast to our custom User type that includes OTP fields
    const user = userRecord as unknown as User;
    
    // Generate a new 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Set OTP expiry (2 minutes from now)
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 2);
    
    // Store OTP in user record using raw SQL query
    await prisma.$executeRaw`
      UPDATE users 
      SET "otp" = ${otp}, "otpExpiry" = ${otpExpiry} 
      WHERE id = ${user.id}
    `;
    
    // Send email with OTP
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'alphabit@paragonestimator.com',
      to: email,
      subject: 'New Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Password Reset OTP</h2>
          <p>You requested a new OTP. Use the OTP below to reset your password:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; margin: 30px 0; padding: 15px; background-color: #f3f4f6; border-radius: 5px;">${otp}</div>
          <p>This OTP will expire in 2 minutes.</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `
    });
    
    return NextResponse.json({
      message: 'If an account with that email exists, a new OTP has been sent'
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { error: 'An error occurred while resending OTP' },
      { status: 500 }
    );
  }
}
