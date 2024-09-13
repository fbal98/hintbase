"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  getAllCheatSheets,
  getUserRole,
  getUserIdFromNextAuth,
} from "@/app/lib/cheat-sheets";
import CheatSheetGrid from "@/app/components/CheatSheetGrid";
import { AddCheatSheetModal } from "@/app/components/AddCheatSheetModal";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function CheatSheetsContent({ session }: { session: any }) {
  const [cheatSheets, setCheatSheets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchCheatSheets = async () => {
      const sheets = await getAllCheatSheets();
      setCheatSheets(sheets);
    };
    fetchCheatSheets();

    const checkAdminStatus = async () => {
      if (session?.user?.email) {
        const userId = await getUserIdFromNextAuth(session.user.email);
        if (userId) {
          const role = await getUserRole(userId);
          setIsAdmin(role === "admin");
        }
      }
    };
    checkAdminStatus();
  }, [session]);

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
        {session && (
          <AddCheatSheetModal
            onAddCheatSheet={handleAddCheatSheet}
            session={session}
          />
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
          onUpdateCheatSheet={handleUpdateCheatSheet}
          onDeleteCheatSheet={handleDeleteCheatSheet}
          session={session}
        />
      </motion.div>
    </div>
  );
}
