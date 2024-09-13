'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

interface ImportCheatSheetModalProps {
  onImport: (newCheatSheet: any) => void
}

export function ImportCheatSheetModal({ onImport }: ImportCheatSheetModalProps) {
  const [jsonInput, setJsonInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const parsedJson = JSON.parse(jsonInput)
      onImport(parsedJson)
      toast({
        title: "Cheat sheet imported",
        description: "Your new cheat sheet has been imported successfully.",
      })
      setIsOpen(false)
      setJsonInput('')
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON format. Please check your input.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Import Cheat Sheet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Cheat Sheet</DialogTitle>
          <DialogDescription>
            Paste your JSON-formatted cheat sheet here. Make sure it follows the correct structure.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Paste your JSON here..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="h-[200px]"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Import</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}