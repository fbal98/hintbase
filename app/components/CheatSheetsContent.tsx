"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAllCheatSheets } from "@/app/lib/cheat-sheets";
import CheatSheetGrid from "@/app/components/CheatSheetGrid";
import { AddCheatSheetModal } from "@/app/components/AddCheatSheetModal";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function CheatSheetsContent() {
  const [cheatSheets, setCheatSheets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const fetchCheatSheets = async () => {
      const sheets = await getAllCheatSheets();
      setCheatSheets(sheets);
    };
    fetchCheatSheets();

    // You might want to implement a different way to check for admin status
    // This is just a placeholder
    setIsAdmin(false);
  }, []);

  const handleAddCheatSheet = (newCheatSheet: any) => {
    setCheatSheets((prevSheets) => [...prevSheets, newCheatSheet]);
  };

  const handleUpdateCheatSheet = (updatedCheatSheet: any) => {
    setCheatSheets((prevSheets) =>
      prevSheets.map((sheet) =>
        sheet.id === updatedCheatSheet.id ? updatedCheatSheet : sheet
      )
    );
  };

  const handleDeleteCheatSheet = (id: string) => {
    setCheatSheets((prevSheets) =>
      prevSheets.filter((sheet) => sheet.id !== id)
    );
  };

  const filteredCheatSheets = cheatSheets.filter(
    (sheet) =>
      sheet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sheet.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative w-full md:w-96">
          <Input
            type="text"
            placeholder="Search cheat sheets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
        </div>
        {isSignedIn && (
          <AddCheatSheetModal onAddCheatSheet={handleAddCheatSheet} />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <CheatSheetGrid
          cheatSheets={filteredCheatSheets}
          isAdmin={isAdmin}
          onAddCheatSheet={handleAddCheatSheet}
          onUpdateCheatSheet={handleUpdateCheatSheet}
          onDeleteCheatSheet={handleDeleteCheatSheet}
        />
      </motion.div>
    </div>
  );
}
