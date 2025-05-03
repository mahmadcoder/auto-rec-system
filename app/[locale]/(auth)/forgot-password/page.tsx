"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
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
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          // Show error message for non-existent account
          form.setError("email", {
            type: "manual",
            message: "No account found with this email address",
          });
          toast.error("No account found with this email address");
          return;
        } else {
          throw new Error(data.error || "Failed to send OTP");
        }
      }

      setEmail(values.email);
      setIsSubmitted(true);
      toast.success("OTP sent to your email");
      
      // Navigate to OTP verification page
      router.push(`/verify-otp?email=${encodeURIComponent(values.email)}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Check Your Email</h1>
          <p className="text-muted-foreground">
            We've sent a 4-digit OTP to your email address if an account exists.
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Didn't receive an email?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-medium"
              onClick={() => setIsSubmitted(false)}
            >
              Try again
            </Button>
          </p>
          <Button asChild className="w-full">
            <Link href={`/verify-otp?email=${encodeURIComponent(email)}`}>Enter OTP</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a 4-digit OTP to reset your password
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    type="email"
                    autoComplete="email"
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Send OTP"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            href="/signin"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
