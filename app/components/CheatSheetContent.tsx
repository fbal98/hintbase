"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheatSheet } from "@/app/lib/cheat-sheets";
import { useToast } from "@/hooks/use-toast";

export default function CheatSheetContent({
  cheatSheet,
}: {
  cheatSheet: CheatSheet;
}) {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({ title: "Copied!", description: "Command copied to clipboard" });
  };

  const handleFavorite = (commandId: string) => {
    setFavorites((prev) =>
      prev.includes(commandId)
        ? prev.filter((id) => id !== commandId)
        : [...prev, commandId]
    );
    toast({
      title: favorites.includes(commandId)
        ? "Removed from favorites"
        : "Added to favorites",
      description: "Your favorites have been updated",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cheatSheet.sections.map((section, index) => (
        <div key={index} className="bg-card rounded-lg shadow-sm p-2">
          <h3 className="text-sm font-bold mb-1 text-primary">
            {section.title}
          </h3>
          <ul className="space-y-1">
            {section.commands.map((command, cmdIndex) => (
              <li
                key={cmdIndex}
                className="text-xs border-b border-muted pb-1 last:border-b-0 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <span className="font-medium">{command.name}</span>
                    <code className="block bg-muted text-muted-foreground px-1 py-0.5 rounded mt-0.5">
                      {command.command}
                    </code>
                  </div>
                  <div className="flex space-x-1 ml-1 mt-0.5">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => handleCopy(command.command)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p className="text-xs">Copy command</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => handleFavorite(command.name)}
                          >
                            <Star
                              className={`h-3 w-3 ${
                                favorites.includes(command.name)
                                  ? "fill-yellow-400"
                                  : ""
                              }`}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p className="text-xs">
                            {favorites.includes(command.name)
                              ? "Remove from favorites"
                              : "Add to favorites"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {command.description}
                </p>
                <Badge variant="secondary" className="text-[10px] mt-1">
                  {command.tag}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
