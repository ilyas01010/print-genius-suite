
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
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="h-16 border-b p-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary p-1 rounded-md">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-heading font-semibold">Print Genius</span>
          </SheetTitle>
        </SheetHeader>
        <div className="p-6 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                location.pathname === item.path &&
                  "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          
          <div className="mt-6 pt-4 border-t">
            <div className="rounded-lg bg-primary/10 p-4">
              <h4 className="text-sm font-medium mb-2">Need Help?</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Visit our support center for tutorials and FAQs.
              </p>
              <Link to="/support" onClick={onClose} className="text-xs text-primary font-medium flex items-center">
                Visit Support Center
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
