"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simply return children without any authentication checks
  return <>{children}</>;
}
