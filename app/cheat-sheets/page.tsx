import { Suspense } from "react";
import { auth } from "@/auth";
import CheatSheetsContent from "@/app/components/CheatSheetsContent";
import { Skeleton } from "@/components/ui/skeleton";
import CheatSheetsHeader from "@/app/components/CheatSheetsHeader";

export default async function CheatSheetsPage() {
  const session = await auth();

  return (
    <>
      <CheatSheetsHeader session={session} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-8">
          All Cheat Sheets
        </h1>
        <Suspense fallback={<CheatSheetsSkeleton />}>
          <CheatSheetsContent session={session} />
        </Suspense>
      </main>
    </>
  );
}

function CheatSheetsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    </div>
  );
}
