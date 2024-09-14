"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function CustomClerkAuth({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSignIn = pathname.includes("sign-in");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-foreground">
            HintBase
          </Link>
        </div>
        {children}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
            <Button variant="link" className="mt-2">
              {isSignIn ? "Sign up" : "Sign in"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
