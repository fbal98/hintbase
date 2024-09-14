import Header from "../components/Header";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
export default async function DashboardPage() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    redirect("/sign-in");
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

  x;
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div>
          <h1>Welcome, {user.firstName}!</h1>
          <h2>Your Stats</h2>
          <ul>
            <li>Created Cheat Sheets: {stats.createdCheatSheets}</li>
            <li>Added Commands: {stats.addedCommands}</li>
            <li>Favorites: {stats.favorites}</li>
          </ul>
          <h2>Favorite Cheat Sheets</h2>
          <ul>
            {favoriteCheatSheets.map((sheet) => (
              <li key={sheet.id}>
                {sheet.icon} {sheet.name}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
