
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
  PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  useSidebar
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    title: "Design Generator",
    href: "/design-generator",
    icon: <Palette className="h-5 w-5" />
  },
  {
    title: "Niche Research",
    href: "/niche-research",
    icon: <Search className="h-5 w-5" />
  },
  {
    title: "Copyright Checker",
    href: "/copyright-checker",
    icon: <ShieldCheck className="h-5 w-5" />
  },
  {
    title: "Platform Manager",
    href: "/platform-manager",
    icon: <Store className="h-5 w-5" />
  },
  {
    title: "Platform Dashboard",
    href: "/platform-dashboard",
    icon: <PieChart className="h-5 w-5" />
  },
  {
    title: "Marketing Planner",
    href: "/marketing-planner",
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    title: "Learning Hub",
    href: "/learning-hub",
    icon: <Book className="h-5 w-5" />
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

// This component wraps our app to provide sidebar functionality
export const SidebarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {children}
      </div>
    </SidebarProvider>
  );
};

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

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r bg-background">
      <SidebarHeader className="flex h-16 items-center px-4 relative">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-primary to-primary/60 h-8 w-8 rounded-full flex items-center justify-center">
            <span className="font-bold text-primary-foreground text-lg">M</span>
          </div>
          <h1 className={cn("text-lg font-semibold transition-opacity", 
            state === "collapsed" ? "opacity-0" : "opacity-100"
          )}>
            Merch AI
          </h1>
        </div>
        <SidebarToggle />
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                asChild
                tooltip={state === "collapsed" ? item.title : undefined}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) => cn(
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
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t">
        <div className="p-4 flex items-center gap-2">
          <div className="size-8 rounded-full bg-muted flex items-center justify-center">
            <span className="font-medium text-sm">JD</span>
          </div>
          <div className={cn("transition-opacity", state === "collapsed" ? "opacity-0" : "opacity-100")}>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Pro Plan</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default NewSidebar;
