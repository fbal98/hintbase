"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserDashboardProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
  stats: {
    createdCheatSheets: number;
    addedCommands: number;
    favorites: number;
  };
  favoriteCheatSheets: Array<{ id: string; name: string; icon: string }>;
}

export function UserDashboard({
  user,
  stats,
  favoriteCheatSheets,
}: UserDashboardProps) {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">Welcome, {user.name}!</h1>
      <p className="text-xl text-muted-foreground">
        Here's an overview of your activity on HintBase.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Cheat Sheets Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">
              {stats.createdCheatSheets}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Commands Added
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">
              {stats.addedCommands}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card hover:bg-card/80 transition-colors">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Favorites</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{stats.favorites}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Favorite Cheat Sheets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteCheatSheets.map((cheatSheet) => (
              <Button
                key={cheatSheet.id}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <span className="text-3xl mb-2">{cheatSheet.icon}</span>
                <span className="text-sm font-medium">{cheatSheet.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
