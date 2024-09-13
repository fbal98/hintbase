import { auth } from "@/auth";
import { UserDashboard } from "../components/UserDashboard";
import Header from "../components/Header";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  // You'll need to implement these functions to get the actual data
  const getUserStats = async (userId: string) => {
    // Fetch user stats from your database
    return {
      createdCheatSheets: 5,
      addedCommands: 25,
      favorites: 10,
    };
  };

  const getFavoriteCheatSheets = async (userId: string) => {
    // Fetch favorite cheat sheets from your database
    return [
      { id: "1", name: "Git", icon: "🌿" },
      { id: "2", name: "VSCode", icon: "📝" },
    ];
  };

  const stats = await getUserStats(session.user?.id || "");
  const favoriteCheatSheets = await getFavoriteCheatSheets(
    session.user?.id || ""
  );

  return (
    <>
      <Header session={session} />
      <main className="container mx-auto px-4 py-8">
        <UserDashboard
          user={session.user as { name: string; email: string; image: string }}
          stats={stats}
          favoriteCheatSheets={favoriteCheatSheets}
        />
      </main>
    </>
  );
}
