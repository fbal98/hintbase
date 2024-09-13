import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          HintBase
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/cheat-sheets"
                className="text-foreground hover:text-primary transition-colors"
              >
                Cheat Sheets
              </Link>
            </li>
            <li>
              <Link href="/signin" passHref>
                <Button variant="outline">Sign In</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
