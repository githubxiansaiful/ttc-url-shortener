import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

export function TopNav() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <span className="text-sm font-medium text-muted-foreground">
        TTC URL Shortener
      </span>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </header>
  );
}
