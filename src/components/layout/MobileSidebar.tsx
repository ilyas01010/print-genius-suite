
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Search, 
  Palette, 
  ShieldCheck, 
  Store, 
  MessageSquare,  
  BookOpen,
  Settings,
  Home
} from "lucide-react";

type SidebarItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "Niche Research",
    path: "/niche-research",
    icon: <Search className="h-5 w-5" />,
  },
  {
    name: "Design Generator",
    path: "/design-generator",
    icon: <Palette className="h-5 w-5" />,
  },
  {
    name: "Copyright Checker",
    path: "/copyright-checker",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    name: "Platform Manager",
    path: "/platform-manager",
    icon: <Store className="h-5 w-5" />,
  },
  {
    name: "Marketing Planner",
    path: "/marketing-planner",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    name: "Customer Service",
    path: "/customer-service",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    name: "Learning Hub",
    path: "/learning-hub",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const location = useLocation();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex items-center gap-2">
            <Palette className="h-6 w-6 text-pod-blue" />
            Print Genius
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-1 p-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                location.pathname === item.path &&
                  "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
