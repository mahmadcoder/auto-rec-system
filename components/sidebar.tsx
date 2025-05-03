"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ChartNoAxesColumn,
  Briefcase,
  Users,
  LayoutDashboard,
  Menu,
  Settings,
  LogOut,
  FileText,
  ClipboardList,
  Mail,
  List,
  CalendarMinus2,
  RefreshCcw
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/providers/auth-provider";

// Divide navigation items into main items and tools
const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Jobs",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidates",
    href: "/candidates",
    icon: Users,
  },
  {
    title: "CV Rebrander",
    href: "/cv-reviewer",
    icon: FileText,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: ClipboardList,
  },
];

const toolsNavItems = [
  {
    title: "Job Boards",
    href: "/job-boards",
    icon: List,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartNoAxesColumn ,
  },
  {
    title: "Meetings",
    href: "/meetings",
    icon: CalendarMinus2,
  },
  {
    title: "CRM Integration",
    href: "/crm-integration",
    icon: RefreshCcw,
  },
  {
    title: "AI Sourcing",
    href: "/ai-sourcing",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Email Integration",
    href: "/email-integration",
    icon: Mail,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[280px] p-0 bg-[#1231AA0D] border-r"
        >
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>

      <aside className="hidden md:flex fixed left-0 top-0 z-30 h-screen w-[280px] flex-col bg-[#1231AA0D] border-r">
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  const { user, logout } = useAuth();

  type ExtendedUser = {
    id: string;
    email: string;
    name?: string;
    profileImage?: string;
    subscription?: {
      status: 'active' | 'inactive' | 'trial';
      plan?: string;
    };
  };
  const extendedUser = user as ExtendedUser;
  
  // Generate initials from user name - Fixed function
  const getInitials = (name: string | undefined) => {
    if (!name || name.trim() === "") return ""; // Handle empty name

    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div className="flex h-full flex-col bg-[#1231AA0D]">
      <div className="flex h-[70px] items-center justify-between px-7 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      <ScrollArea className="flex-1 py-6">
        <nav className="grid gap-1 px-4">
          {mainNavItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-200 h-10 relative",
                pathname === item.href
                  ? "bg-blue-600 text-white font-medium"
                  : "text-black hover:bg-[#1231AA1A] hover:rounded-3xl active:bg-[#1231AA1A] active:rounded-3xl"
              )}
              style={{
                position: 'relative',
                paddingLeft: '10px'
              }}
            >
              <Link href={item.href} className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    "h-[18px] w-[18px]",
                    pathname === item.href
                      ? "text-white stroke-[2px]"
                      : "text-black stroke-[2px]"
                  )}
                  stroke={pathname === item.href ? "white" : "black"}
                  fill={pathname === item.href ? "white" : "transparent"}
                />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            </Button>
          ))}
          
          {/* Tools Section Header */}
          <div className="mt-6 mb-2 px-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-black">
              Tools
            </h3>
          </div>
          
          {toolsNavItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-200 h-10 relative",
                pathname === item.href
                  ? "bg-blue-600 text-white font-medium"
                  : "text-black hover:bg-[#1231AA1A] hover:rounded-xl"
              )}
              style={{
                position: 'relative',
                paddingLeft: '10px'
              }}
            >
              <Link href={item.href} className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    "h-[18px] w-[18px] ",
                    pathname === item.href
                      ? "text-white stroke-[2px]"
                      : "text-black stroke-[2px]"
                  )}
                  stroke={pathname === item.href ? "white" : "black"}
                  fill={pathname === item.href ? "white" : "transparent"}
                />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-auto p-0 h-auto hover:bg-transparent transition-transform duration-200 hover:scale-105"
            >
              <div className="flex items-center">
                <Avatar className="h-11 w-11 border-[1.5px] border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200">
                  {extendedUser?.profileImage ? (
                    <AvatarImage src={extendedUser.profileImage} alt={extendedUser?.name || ""} />
                  ) : (
                    <AvatarFallback className="bg-blue-600">
                      <span className="text-base font-medium text-white">
                        {getInitials(extendedUser?.name) || "U"}
                      </span>
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px]">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{extendedUser?.name}</span>
                <span className="text-xs text-muted-foreground">{extendedUser?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer flex w-full items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await logout();
                } catch (error) {
                  console.error('Logout failed:', error);
                }
              }}
              className="cursor-pointer text-red-500 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}