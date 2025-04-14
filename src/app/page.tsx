"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/linkedin-jobs");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-16 h-16 rounded-full bg-blue-600 mb-4 mx-auto"></div>
        <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
      </div>
    </div>
  );
} 