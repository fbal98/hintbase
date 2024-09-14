import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddCheatSheetModal } from "./AddCheatSheetModal";

interface CheatSheetGridProps {
  cheatSheets: any[];
  isAdmin: boolean;
  onAddCheatSheet: (cheatSheet: any) => void;
  onUpdateCheatSheet: (updatedCheatSheet: any) => void;
  onDeleteCheatSheet: (id: string) => void;
}

export default function CheatSheetGrid({
  cheatSheets,
  isAdmin,
  onUpdateCheatSheet,
  onDeleteCheatSheet,
}: CheatSheetGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cheatSheets.map((cheatSheet) => (
        <Card key={cheatSheet.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {cheatSheet.icon} {cheatSheet.name}
              </span>
              {isAdmin && (
                <AddCheatSheetModal
                  onAddCheatSheet={onUpdateCheatSheet}
                  onUpdateCheatSheet={onUpdateCheatSheet}
                  onDeleteCheatSheet={onDeleteCheatSheet}
                  cheatSheet={cheatSheet}
                />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{cheatSheet.description}</p>
            <Link
              href={`/cheat-sheet/${cheatSheet.id}`}
              className="mt-4 inline-block text-primary hover:underline"
            >
              View Cheat Sheet
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
