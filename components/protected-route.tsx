"use client";


export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simply return children without any authentication checks
  return <>{children}</>;
}
