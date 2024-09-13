import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className={cn("h-8 w-8 animate-spin text-primary", className)} />
    </div>
  );
}
