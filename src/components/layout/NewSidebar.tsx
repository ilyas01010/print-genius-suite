
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Palette, 
  Search, 
  ShieldCheck, 
  Store, 
  MessageSquare, 
  BarChart3,
  Settings,
  HelpCircle,
  Book,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  LogIn
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    title: "Design Generator",
    href: "/design",
    icon: <Palette className="h-5 w-5" />
  },
  {
    title: "Niche Research",
    href: "/niche-research",
    icon: <Search className="h-5 w-5" />
  },
  {
    title: "Copyright Checker",
    href: "/copyright",
    icon: <ShieldCheck className="h-5 w-5" />
  },
  {
    title: "Platform Dashboard",
    href: "/platform",
    icon: <Store className="h-5 w-5" />
  },
  {
    title: "Marketing Planner",
    href: "/marketing",
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    title: "Learning Hub",
    href: "/learning",
    icon: <Book className="h-5 w-5" />
  },
  {
    title: "Admin Panel",
    href: "/admin",
    icon: <ShieldAlert className="h-5 w-5" />
  },
  {
    title: "Support",
    href: "/support",
    icon: <HelpCircle className="h-5 w-5" />
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />
  }
];

// Custom toggle button for the sidebar
const SidebarToggle = () => {
  const { toggleSidebar, state } = useSidebar();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleSidebar} 
      className="absolute right-2 top-4 z-20 h-8 w-8 rounded-full bg-background shadow-md border border-border/30 hover:bg-muted transition-all duration-200"
    >
      {state === "collapsed" ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </Button>
  );
};

const NewSidebar = () => {
  const { state } = useSidebar();
  const { user } = useUser();

  const displayName = user?.user_metadata?.display_name || 'User';
  const userInitials = displayName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r bg-background">
      <SidebarHeader className="flex h-16 items-center px-4 relative">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-primary to-primary/60 h-8 w-8 rounded-full flex items-center justify-center">
            <span className="font-bold text-primary-foreground text-lg">P</span>
          </div>
          <h1 className={cn("text-lg font-semibold transition-opacity", 
            state === "collapsed" ? "opacity-0" : "opacity-100"
          )}>
            Print Genius
          </h1>
        </div>
        <SidebarToggle />
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                tooltip={state === "collapsed" ? item.title : undefined}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-2 w-full",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {user?.id === 'demo-user' && (
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={state === "collapsed" ? "Sign In" : undefined}>
                <NavLink
                  to="/auth"
                  className={({ isActive }) => cn(
                    "flex items-center gap-2 w-full mt-4 bg-primary/10",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary/20 text-primary hover:text-primary"
                  )}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In / Sign Up</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t">
        <div className="p-4 flex items-center gap-2">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-medium text-sm text-primary">{userInitials}</span>
          </div>
          <div className={cn("transition-opacity", state === "collapsed" ? "opacity-0" : "opacity-100")}>
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground">Pro Plan</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default NewSidebar;
