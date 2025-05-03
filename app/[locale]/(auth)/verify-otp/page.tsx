"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Form validation schema
const formSchema = z.object({
  otp: z.string().length(4, "OTP must be 4 digits"),
});

type FormValues = z.infer<typeof formSchema>;

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Timer effect
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTimerActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle form submission
  async function onSubmit(values: FormValues) {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: values.otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.expired) {
          toast.error("OTP has expired. Please request a new one.");
          setIsTimerActive(false);
          setTimeLeft(0);
          return;
        }
        throw new Error(data.error || "Failed to verify OTP");
      }

      toast.success("OTP verified successfully");
      
      // Navigate to reset password page with the reset token
      router.push(`/reset-password?token=${data.resetToken}`);
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Handle resend OTP
  async function handleResendOTP() {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to resend OTP");
      }

      // Reset timer
      setTimeLeft(120);
      setIsTimerActive(true);
      
      toast.success("New OTP sent to your email");
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify OTP</h1>
        <p className="text-muted-foreground">
          Enter the 4-digit OTP sent to {email || "your email"}
        </p>
        {isTimerActive && (
          <div className="mt-2">
            <p className="text-sm font-medium">OTP expires in</p>
            <p className="text-xl font-bold text-primary">{formatTime(timeLeft)}</p>
          </div>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter 4-digit OTP"
                    maxLength={4}
                    className="text-center text-lg tracking-widest"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying OTP
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {!isTimerActive ? (
            <>
              OTP expired?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-medium"
                onClick={handleResendOTP}
                disabled={isResending}
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Resending
                  </>
                ) : (
                  "Resend OTP"
                )}
              </Button>
            </>
          ) : (
            <>
              Didn't receive the OTP? You can resend after the timer expires.
            </>
          )}
        </p>
        <p className="mt-2">
          <Button variant="ghost" asChild size="sm" className="hover:text-white">
            <Link href="/forgot-password">Back to Forgot Password</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
