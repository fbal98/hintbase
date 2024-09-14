import CheatSheetsContent from "@/app/components/CheatSheetsContent";
import Header from "@/app/components/Header";

export default function CheatSheetsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Cheat Sheets</h1>
        <CheatSheetsContent />
      </main>
    </>
  );
}
