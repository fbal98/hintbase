"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  getAllCheatSheets,
  getCheatSheetUserRole,
  CheatSheet,
} from "@/app/lib/cheat-sheets";
import CheatSheetGrid from "@/app/components/CheatSheetGrid";
import { AddCheatSheetModal } from "@/app/components/AddCheatSheetModal";
import { Input } from "@/components/ui/input";
import { Search, Edit } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function CheatSheetsContent() {
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const { user, isSignedIn, isLoaded } = useUser();
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
      title: "Success",
      description: "Cheat sheet added successfully!",
    });
  };

  const handleUpdateCheatSheet = (updatedCheatSheet: CheatSheet) => {
    setCheatSheets((prevSheets) =>
      prevSheets.map((sheet) =>
        sheet.id === updatedCheatSheet.id ? updatedCheatSheet : sheet
      )
    );
    toast({
      title: "Success",
      description: "Cheat sheet updated successfully!",
    });
  };

  const handleDeleteCheatSheet = (id: string) => {
    setCheatSheets((prevSheets) =>
      prevSheets.filter((sheet) => sheet.id !== id)
    );
    toast({
      title: "Success",
      description: "Cheat sheet deleted successfully!",
    });
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
      </motion.div>
    </div>
  );
}
