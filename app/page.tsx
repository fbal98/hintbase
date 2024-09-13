import { Suspense } from "react";
import { auth } from "@/auth";
import { HomeContent } from "./components/HomeContent";
import Header from "./components/Header";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Header session={session} />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<HomeContentSkeleton />}>
          <HomeContent session={session} />
        </Suspense>
      </main>
    </>
  );
}

function HomeContentSkeleton() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
        <Skeleton className="h-10 w-64 mx-auto" />
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
      <div>
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    </div>
  );
}
