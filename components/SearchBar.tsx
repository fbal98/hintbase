import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="max-w-2xl mx-auto relative">
      <Input
        type="text"
        placeholder="Search for commands or tools..."
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
    </div>
  )
}