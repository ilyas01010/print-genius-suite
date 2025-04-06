
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
  Book
} from "lucide-react";
import { cn } from "@/lib/utils";

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

const Sidebar = () => {
  return (
    <aside className="hidden md:flex border-r border-border w-64 flex-col fixed inset-y-0 pt-16 bg-background">
      <div className="flex flex-col flex-1 p-4">
        <nav className="mt-4 flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
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
      </div>
    </aside>
  );
};

export default Sidebar;
