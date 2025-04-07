
import React, { useEffect } from "react";
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
  X,
  Book,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  // Close sidebar when clicking outside or on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = ''; // Re-enable scrolling
    };
  }, [isOpen, onClose]);
  
  // Close sidebar when navigating to a new page
  const handleNavigation = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border p-4 shadow-lg transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg">Print Genius</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={handleNavigation}
              className={({ isActive }) => cn(
                "flex items-center py-2 px-3 text-sm rounded-md transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="ml-3 font-medium">{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default MobileSidebar;
