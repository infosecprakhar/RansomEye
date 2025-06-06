import Link from 'next/link';
import { Binary, LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  // Placeholder for active path logic
  const isActive = (path: string) => path === '/'; 

  return (
    <aside className={cn("h-screen w-64 bg-card border-r border-border flex flex-col", className)}>
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Binary className="h-8 w-8 text-primary" />
        <h1 className="ml-3 text-xl font-semibold font-headline">RansomEye</h1>
      </div>
      <nav className="flex-grow px-4 py-6 space-y-2">
        <Link
          href="/"
          className={cn(
            "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
            isActive('/')
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted hover:text-accent-foreground"
          )}
        >
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="#" // Placeholder for settings page
          className={cn(
            "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
            isActive('/settings') // Example, won't be active
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted hover:text-accent-foreground"
          )}
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </nav>
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground">© 2024 RansomEye Inc.</p>
      </div>
    </aside>
  );
}
