"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Code, Command, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CheatSheetGrid from "./CheatSheetGrid";
import { AddCheatSheetModal } from "./AddCheatSheetModal";
import { getAllCheatSheets, CheatSheet } from "../lib/cheat-sheets";

export function HomeContent({ session }: { session: any }) {
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);

  useEffect(() => {
    const fetchCheatSheets = async () => {
      const sheets = await getAllCheatSheets();
      setCheatSheets(sheets);
    };
    fetchCheatSheets();
  }, []);

  const handleAddCheatSheet = (newCheatSheet: CheatSheet) => {
    setCheatSheets((prevSheets) => [...prevSheets, newCheatSheet]);
  };

  return (
    <div className="w-full space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-primary"
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
          Access, create, and share cheat sheets for all your favorite tools and
          technologies.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Input
            type="text"
            placeholder="Search for cheat sheets..."
            className="max-w-sm mx-auto"
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
            className="bg-card text-card-foreground p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <feature.icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Popular Cheat Sheets Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Cheat Sheets</h2>
          {session && (
            <AddCheatSheetModal
              onAddCheatSheet={handleAddCheatSheet}
              session={session}
            />
          )}
        </div>
        <CheatSheetGrid
          cheatSheets={cheatSheets.slice(0, 6)}
          isAdmin={false}
          onAddCheatSheet={() => {}}
          onUpdateCheatSheet={() => {}}
          onDeleteCheatSheet={() => {}}
          session={session}
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

      {/* Call to Action (only shown when not signed in) */}
      {!session && (
        <section className="bg-primary text-primary-foreground p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Boosting Your Productivity Today
          </h2>
          <p className="text-xl mb-6">
            Join HintBase and never forget a command again.
          </p>
          <Link href="/signin" passHref>
            <Button variant="secondary" size="lg">
              Sign Up for Free
            </Button>
          </Link>
        </section>
      )}
    </div>
  );
}
