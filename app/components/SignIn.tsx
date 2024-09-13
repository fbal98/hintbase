import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button variant="outline" type="submit" className="w-full">
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Sign in with GitHub
      </Button>
    </form>
  );
}
