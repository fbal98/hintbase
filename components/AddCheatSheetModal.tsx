'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addCheatSheet,
  updateCheatSheet,
  deleteCheatSheet,
} from "@/app/lib/cheat-sheets";
import { useToast } from "@/hooks/use-toast";
import { emojiOptions } from "@/app/lib/emoji-options";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

interface AddCheatSheetModalProps {
  onAddCheatSheet: (newCheatSheet: any) => void;
  onUpdateCheatSheet?: (updatedCheatSheet: any) => void;
  onDeleteCheatSheet?: (id: string) => void;
  cheatSheet?: any; // For editing existing cheat sheets
}

export function AddCheatSheetModal({
  onAddCheatSheet,
  onUpdateCheatSheet,
  onDeleteCheatSheet,
  cheatSheet,
}: AddCheatSheetModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(cheatSheet?.title || "");
  const [name, setName] = useState(cheatSheet?.name || "");
  const [description, setDescription] = useState(cheatSheet?.description || "");
  const [icon, setIcon] = useState(cheatSheet?.icon || "");
  const [jsonInput, setJsonInput] = useState(
    cheatSheet ? JSON.stringify(cheatSheet.sections) : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, isSignedIn } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignedIn && user) {
      setIsLoading(true);
      try {
        const cheatSheetData = {
          title,
          name,
          description,
          icon,
          sections: JSON.parse(jsonInput),
          added_by: user.id,
        };

        let result;
        if (cheatSheet) {
          result = await updateCheatSheet(cheatSheet.id, cheatSheetData);
          if (result && onUpdateCheatSheet) {
            onUpdateCheatSheet(result);
          }
        } else {
          result = await addCheatSheet(cheatSheetData);
          if (result) {
            onAddCheatSheet(result);
          }
        }

        setIsOpen(false);
        setTitle("");
        setName("");
        setDescription("");
        setIcon("");
        setJsonInput("");
        toast({
          title: "Success",
          description: cheatSheet
            ? "Cheat sheet updated successfully!"
            : "Cheat sheet added successfully!",
        });
      } catch (error) {
        console.error("Error with cheat sheet:", error);
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to process cheat sheet. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    if (cheatSheet && onDeleteCheatSheet) {
      try {
        await deleteCheatSheet(cheatSheet.id);
        onDeleteCheatSheet(cheatSheet.id);
        setIsOpen(false);
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
    }
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {cheatSheet ? "Edit Cheat Sheet" : "Add New Cheat Sheet"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {cheatSheet ? "Edit Cheat Sheet" : "Add New Cheat Sheet"}
          </DialogTitle>
          <DialogDescription>
            {cheatSheet
              ? "Edit the details of your cheat sheet."
              : "Enter the details for your new cheat sheet. Provide the sections and commands in JSON format."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="icon" className="text-right">
                Icon
              </label>
              <Select value={icon} onValueChange={(value) => setIcon(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {emojiOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className="mr-2">{option.value}</span>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="sections" className="text-right">
                Sections (JSON)
              </label>
              <div className="col-span-3 space-y-2">
                <Textarea
                  id="sections"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full"
                  placeholder='[{"title": "Section 1", "commands": [{"name": "Command 1", "command": "cmd1", "description": "Description", "tag": "Tag"}]}]'
                />
                <Link
                  href="/json-sample"
                  className="text-sm text-primary hover:underline"
                  target="_blank"
                >
                  Preview Sample
                </Link>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? cheatSheet
                  ? "Updating..."
                  : "Adding..."
                : cheatSheet
                ? "Update Cheat Sheet"
                : "Add Cheat Sheet"}
            </Button>
            {isSignedIn && user?.role === "admin" && cheatSheet && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Delete Cheat Sheet
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}