import { getCheatSheetById } from "@/app/lib/cheat-sheets";
import CheatSheetDisplay from "@/app/components/CheatSheetDisplay";
import Header from "@/app/components/Header";

export default async function CheatSheetPage({ params }: { params: { id: string } }) {
  const cheatSheet = await getCheatSheetById(params.id);

  if (!cheatSheet) {
    return <div>Cheat sheet not found</div>;
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{cheatSheet.name}</h1>
        <CheatSheetDisplay
          title={cheatSheet.name}
          sections={cheatSheet.sections}
        />
      </main>
    </>
  );
}
