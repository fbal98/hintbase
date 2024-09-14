import { SignIn } from "@clerk/nextjs";

export default function AuthPage() {
  return (
    <div className="container mx-auto py-10">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
