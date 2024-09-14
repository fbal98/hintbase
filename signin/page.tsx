import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "@/components/user-auth-form";
import Header from "@/app/components/Header";
import { auth } from "@/auth";
import SignIn from "@/app/components/SignIn";

export const metadata: Metadata = {
  title: "HintBase - Sign In",
  description: "Sign in to your HintBase account",
};

export default async function SignInPage() {
  const session = await auth();

  return (
    <>
      <Header session={session} />
      <div className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-primary">
            Sign in to HintBase
          </h1>
          <SignIn />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
