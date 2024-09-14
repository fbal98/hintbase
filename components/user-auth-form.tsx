import * as React from "react";
import { cn } from "@/lib/utils";
import SignIn from "@/app/components/SignIn";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <SignIn />
    </div>
  );
}
