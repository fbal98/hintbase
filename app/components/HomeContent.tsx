"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Code, Command, Zap, Lock, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CheatSheetGrid from "./CheatSheetGrid";
import {
  getAllCheatSheets,
  getCheatSheetUserRole,
  updateCheatSheet,
  deleteCheatSheet,
  CheatSheet,
} from "@/app/lib/cheat-sheets";
import { useUser } from "@clerk/nextjs";
import { AddCheatSheetModal } from "./AddCheatSheetModal";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export const HomeContent: React.FC = () => {
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
  const { user, isSignedIn, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCheatSheets = async () => {
      const sheets = await getAllCheatSheets();
      setCheatSheets(sheets);
    };
    fetchCheatSheets();

    if (isLoaded && isSignedIn && user) {
      setIsAdminLoading(true);
      getCheatSheetUserRole(user.id).then((role) => {
        setIsAdmin(role === "admin");
        setIsAdminLoading(false);
      });
    } else {
      setIsAdminLoading(false);
    }
  }, [isLoaded, isSignedIn, user]);

  const handleAddCheatSheet = (newCheatSheet: CheatSheet) => {
    setCheatSheets((prevSheets) => [...prevSheets, newCheatSheet]);
    toast({
      title: "Cheat Sheet Added",
      description: "Your new cheat sheet has been successfully added.",
    });
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
          title: "Cheat Sheet Updated",
          description: "The cheat sheet has been successfully updated.",
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

  const handleDeleteCheatSheet = async (id: string) => {
    try {
      await deleteCheatSheet(id);
      setCheatSheets((prevSheets) =>
        prevSheets.filter((sheet) => sheet.id !== id)
      );
      toast({
        title: "Cheat Sheet Deleted",
        description: "The cheat sheet has been successfully deleted.",
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

  return (
    <>
      <div className="w-full space-y-12 px-4 md:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Ultimate Cheat Sheet Hub
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Access, create, and share cheat sheets for all your favorite tools
            and technologies.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            <Input
              type="text"
              placeholder="Search for cheat sheets..."
              className="w-full py-2 px-4 rounded-md border-2 border-primary"
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Code,
              title: "Developer-Focused",
              description: "Tailored for programmers and tech enthusiasts",
            },
            {
              icon: Zap,
              title: "Quick Access",
              description: "Find the commands you need in seconds",
            },
            {
              icon: Command,
              title: "Customizable",
              description: "Create and edit your own cheat sheets",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="w-12 h-12 text-primary mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Popular Cheat Sheets Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Popular Cheat Sheets</h2>
            {isLoaded ? (
              isSignedIn ? (
                <AddCheatSheetModal onAddCheatSheet={handleAddCheatSheet} />
              ) : (
                <Button disabled className="cursor-not-allowed">
                  <Lock className="mr-2 h-4 w-4" />
                  Add Cheat Sheet
                </Button>
              )
            ) : (
              <Skeleton className="h-10 w-32" />
            )}
          </div>
          <CheatSheetGrid
            cheatSheets={cheatSheets.slice(0, 6)}
            isAdmin={isAdmin}
            isAdminLoading={isAdminLoading}
            onUpdateCheatSheet={handleUpdateCheatSheet}
            onDeleteCheatSheet={handleDeleteCheatSheet}
            renderUpdateButton={(cheatSheet) => (
              <AddCheatSheetModal
                cheatSheet={cheatSheet}
                onUpdateCheatSheet={handleUpdateCheatSheet}
              >
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </AddCheatSheetModal>
            )}
          />
          <div className="text-center mt-8">
            <Link href="/cheat-sheets" passHref>
              <Button variant="outline">
                View All Cheat Sheets
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        {isLoaded ? (
          !isSignedIn && (
            <section className="bg-primary text-primary-foreground p-12 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">
                Start Boosting Your Productivity Today
              </h2>
              <p className="text-xl mb-6">
                Join HintBase and never forget a command again.
              </p>
              <Link href="/sign-up" passHref>
                <Button variant="secondary" size="lg">
                  Sign Up for Free
                </Button>
              </Link>
            </section>
          )
        ) : (
          <Skeleton className="h-64 w-full" />
        )}
      </div>
    </>
  );
};
