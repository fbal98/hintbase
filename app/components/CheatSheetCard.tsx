import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CheatSheetCardProps {
  id: string
  name: string
  icon: string
  description: string
}

export default function CheatSheetCard({ id, name, icon, description }: CheatSheetCardProps) {
  return (
    <Card className="transition-transform hover:scale-105 bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-4xl">{icon}</span>
          <span>{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link href={`/cheat-sheet/${id}`} passHref>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            View Cheats
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}