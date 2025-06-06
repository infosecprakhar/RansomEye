import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';
import { Button } from '../ui/button';

interface AppHeaderProps {
  title: string;
  className?: string;
}

export function AppHeader({ title, className }: AppHeaderProps) {
  return (
    <header className={cn("h-16 bg-card border-b border-border flex items-center justify-between px-6", className)}>
      <h2 className="text-xl font-semibold font-headline text-foreground">{title}</h2>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
          <AvatarFallback>RE</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
