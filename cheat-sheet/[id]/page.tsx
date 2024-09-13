import { getCheatSheetById } from "@/app/lib/cheat-sheets";
import { notFound } from "next/navigation";
import CheatSheetContent from "@/app/components/CheatSheetContent";
import Header from "@/app/components/Header";
import { auth } from "@/auth";

export default async function CheatSheetPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const cheatSheet = await getCheatSheetById(params.id);

  if (!cheatSheet) {
    notFound();
  }

  return (
    <>
      <Header session={session} />
      <main className="container mx-auto px-2 py-4">
        <h1 className="text-2xl font-bold mb-1">{cheatSheet.title}</h1>
        <p className="text-sm text-muted-foreground mb-2">
          {cheatSheet.description}
        </p>
        <CheatSheetContent cheatSheet={cheatSheet} />
      </main>
    </>
  );
}
