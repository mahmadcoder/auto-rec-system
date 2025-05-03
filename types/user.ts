// Extended User type that includes OTP fields
export interface User {
  id: string;
  email: string;
  password: string;
  name: string | null;
  resetToken: string | null;
  resetTokenExpiry: Date | null;
  otp: string | null;
  otpExpiry: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Type for creating a new user
export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
}

// Type for updating a user
export interface UpdateUserInput {
  email?: string;
  password?: string;
  name?: string;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  otp?: string | null;
  otpExpiry?: Date | null;
}
