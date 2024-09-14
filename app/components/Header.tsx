"use client";

import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User, LayoutDashboard, LogOut } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
export default function Header() {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">HintBase</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/cheat-sheets"
            className="text-foreground/60 hover:text-foreground"
          >
            Cheat Sheets
          </Link>
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage
                    src={user?.imageUrl}
                    alt={user?.fullName || ""}
                  />
                  <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignInButton mode="modal">
              <Button variant="ghost">Sign In</Button>
            </SignInButton>
          )}
        </nav>
      </div>
    </header>
  );
}
