"use client";

import { useUser } from "@clerk/nextjs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus, Trash, Edit } from "lucide-react";
import Link from "next/link";
import {
  getCheatSheetUserRole,
  deleteCheatSheet,
  updateCheatSheet,
  getAllCheatSheets,
  CheatSheet,
} from "@/app/lib/cheat-sheets";
import { AddCheatSheetModal } from "@/app/components/AddCheatSheetModal";
import { useToast } from "@/hooks/use-toast";

interface UserStats {
  createdCheatSheets: number;
  addedCommands: number;
  favorites: number;
}

async function getUserStats(userId: string): Promise<UserStats> {
  // Fetch user stats from your database (placeholder implementation)
  return {
    createdCheatSheets: 5,
    addedCommands: 25,
    favorites: 10,
  };
}

export default function DashboardContent() {
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isLoaded && user) {
      getUserStats(user.id).then(setStats);
      getCheatSheetUserRole(user.id).then((role) => {
        setIsAdmin(role === "admin");
        if (role === "admin") {
          getAllCheatSheets().then(setCheatSheets);
        } else {
          // Fetch user's cheat sheets if not admin
          // Implement this function in cheat-sheets.ts
          // getUserCheatSheets(user.id).then(setCheatSheets);
        }
      });
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    redirect("/sign-in");
  }

  const handleDeleteCheatSheet = async (id: string) => {
    try {
      await deleteCheatSheet(id);
      setCheatSheets((prevSheets) =>
        prevSheets.filter((sheet) => sheet.id !== id)
      );
      toast({
        title: "Success",
        description: "Cheat sheet deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting cheat sheet:", error);
      toast({
        title: "Error",
        description: "Failed to delete cheat sheet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCheatSheet = async (updatedCheatSheet: CheatSheet) => {
    try {
      const result = await updateCheatSheet(
        updatedCheatSheet.id,
        updatedCheatSheet
      );
      if (result) {
        setCheatSheets((prevSheets) =>
          prevSheets.map((sheet) => (sheet.id === result.id ? result : sheet))
        );
        toast({
          title: "Success",
          description: "Cheat sheet updated successfully!",
        });
      }
    } catch (error) {
      console.error("Error updating cheat sheet:", error);
      toast({
        title: "Error",
        description: "Failed to update cheat sheet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddCheatSheet = (newCheatSheet: CheatSheet) => {
    setCheatSheets((prev) => [...prev, newCheatSheet]);
    toast({
      title: "Success",
      description: "Cheat sheet added successfully!",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Welcome, {user.firstName}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Created Cheat Sheets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats?.createdCheatSheets}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Added Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats?.addedCommands}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Favorites</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats?.favorites}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {isAdmin ? "All Cheat Sheets" : "Your Cheat Sheets"}
          </h2>
          <AddCheatSheetModal onAddCheatSheet={handleAddCheatSheet} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cheatSheets.map((sheet) => (
            <Card key={sheet.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-2xl mr-2">{sheet.icon}</span>
                    <span>{sheet.name}</span>
                  </span>
                  <div className="flex space-x-2">
                    <AddCheatSheetModal
                      cheatSheet={sheet}
                      onUpdateCheatSheet={handleUpdateCheatSheet}
                    >
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </AddCheatSheetModal>
                    {isAdmin && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCheatSheet(sheet.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href={`/cheat-sheet/${sheet.id}`}>
                  <Button variant="link" className="p-0">
                    View Cheat Sheet <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/cheat-sheets">
            <Button>
              View All Cheat Sheets <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
