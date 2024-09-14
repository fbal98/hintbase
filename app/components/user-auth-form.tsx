"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Github } from "lucide-react";
import { SignIn, useSignIn } from "@clerk/nextjs";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn, isLoaded } = useSignIn();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    // Add your Clerk sign-in logic here
    // For example:
    // await signIn.create({
    //   identifier: email,
    //   password,
    // });

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <LoadingSpinner className="mr-2 h-4 w-4" />}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          // Add your Clerk OAuth sign-in logic here
          // For example:
          // signIn.authenticateWithRedirect({
          //   strategy: "oauth_github",
          //   redirectUrl: "/sso-callback",
          //   redirectUrlComplete: "/",
          // });
        }}
      >
        {isLoading ? (
          <LoadingSpinner className="mr-2 h-4 w-4" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
