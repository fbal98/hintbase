'use client'
import { useState } from 'react';
import { ChevronDown, ChevronUp, Clipboard, Star, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AddCheatModal } from './AddCheatModal';

interface Command {
  name: string;
  command: string;
  description?: string;
  tag: string;
}

interface Section {
  title: string;
  commands: Command[];
}

interface CheatSheetDisplayProps {
  title: string;
  sections: Section[];
}

export default function CheatSheetDisplay({ title, sections }: CheatSheetDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(sections.map(s => s.title)));
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [localSections, setLocalSections] = useState(sections);
  const { toast } = useToast();

  const toggleSection = (title: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({
      title: "Copied to clipboard",
      description: "The command has been copied to your clipboard.",
    });
  };

  const toggleFavorite = (commandName: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commandName)) {
        newSet.delete(commandName);
      } else {
        newSet.add(commandName);
      }
      return newSet;
    });
  };

  const handleAddCheat = (newCheat: Command) => {
    setLocalSections(prevSections => {
      const updatedSections = [...prevSections];
      const lastSection = updatedSections[updatedSections.length - 1];
      lastSection.commands.push(newCheat);
      return updatedSections;
    });
  };

  const handleImportCheatSheet = (importedCheatSheet: CheatSheetDisplayProps) => {
    setLocalSections(importedCheatSheet.sections);
  };

  const handleAddCheatSheet = (newCheatSheet: any) => {
    // This function should be implemented in a parent component or context
    // to update the global list of cheat sheets
    console.log('New cheat sheet added:', newCheatSheet);
    // You might want to redirect to the new cheat sheet or update the UI accordingly
  };

  const renderCommand = (command: Command) => (
    <Card key={command.name} className="mb-2 p-2">
      <CardContent className="p-0">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <h4 className="text-sm font-semibold mb-1">{command.name}</h4>
            <code className="bg-muted px-1 py-0.5 rounded text-xs">{command.command}</code>
          </div>
          <div className="flex space-x-1 ml-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(command.name)}
                    className={`p-1 ${favorites.has(command.name) ? 'text-yellow-500' : 'text-muted-foreground'}`}
                    aria-label={favorites.has(command.name) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {favorites.has(command.name) ? "Remove from favorites" : "Add to favorites"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(command.command)}
                    className="p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Copy to clipboard"
                  >
                    <Clipboard className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy to clipboard</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {command.description && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 text-muted-foreground hover:text-foreground"
                      aria-label="Show description"
                    >
                      <Info className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{command.description}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <Badge variant="secondary" className="mt-1 text-xs">
          {command.tag}
        </Badge>
      </CardContent>
    </Card>
  );

  const renderSection = (section: Section) => (
    <Collapsible
      key={section.title}
      open={expandedSections.has(section.title)}
      onOpenChange={() => toggleSection(section.title)}
      className="mb-4"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-between items-center w-full text-left mb-2"
        >
          <h3 className="text-base font-semibold">{section.title}</h3>
          {expandedSections.has(section.title) ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {section.commands.map(renderCommand)}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <AddCheatModal onAddCheat={handleAddCheat} />
      </div>
      {favorites.size > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Favorites</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {localSections.flatMap(s => s.commands).filter(c => favorites.has(c.name)).map(renderCommand)}
          </div>
        </div>
      )}
      {localSections.map(renderSection)}
    </div>
  );
}