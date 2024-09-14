import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheatSheet } from "@/app/lib/cheat-sheets";
import { Skeleton } from "@/components/ui/skeleton";

interface CheatSheetGridProps {
  cheatSheets: CheatSheet[];
  isAdmin: boolean;
  isAdminLoading: boolean;
  onUpdateCheatSheet: (updatedCheatSheet: CheatSheet) => void;
  onDeleteCheatSheet: (id: string) => void;
  renderUpdateButton: (cheatSheet: CheatSheet) => React.ReactNode;
}

export default function CheatSheetGrid({
  cheatSheets,
  isAdmin,
  isAdminLoading,
  renderUpdateButton,
}: CheatSheetGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cheatSheets.map((cheatSheet) => (
        <Card key={cheatSheet.id} className="hover:shadow-lg transition-shadow">
          {isAdminLoading ? (
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {cheatSheet.icon} {cheatSheet.name}
                  </span>
                  {isAdmin && renderUpdateButton(cheatSheet)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {cheatSheet.description}
                </p>
                <Link
                  href={`/cheat-sheet/${cheatSheet.id}`}
                  className="mt-4 inline-block text-primary hover:underline"
                >
                  View Cheat Sheet
                </Link>
              </CardContent>
            </>
          )}
        </Card>
      ))}
    </div>
  );
}
