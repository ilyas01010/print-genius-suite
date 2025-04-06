
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, User, LogOut, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onToggleSidebar: () => void;
  className?: string;
}

const Header = ({ onToggleSidebar, className }: HeaderProps) => {
  const { user, isAuthenticated, logout } = useUser();
  const { toast } = useToast();
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [hasUnreadNotifications] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll detection for enhanced visual effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    toast({
      title: t("auth.logoutSuccess"),
      description: "",
    });
  };

  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    toast({
      title: t("common.language"),
      description: `${availableLanguages[lang]} ${t("common.success").toLowerCase()}`,
    });
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 sm:px-6 lg:px-8 transition-all duration-200",
        scrolled ? "shadow-sm" : "",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-muted-foreground hover:text-foreground"
        onClick={onToggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-1.5 rounded-md shadow-sm group-hover:shadow-md transition-all">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-heading font-semibold text-lg hidden md:inline-block bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Print Genius
          </span>
        </Link>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full h-9 w-9">
              <Globe className="h-5 w-5" />
              <span className="sr-only">{t("common.language")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{t("common.language")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(availableLanguages).map(([code, name]) => (
              <DropdownMenuItem 
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={language === code ? "bg-accent text-accent-foreground" : ""}
              >
                <span className="mr-2">{code === "en" ? "🇺🇸" : code === "fr" ? "🇫🇷" : code === "es" ? "🇪🇸" : "🌐"}</span>
                {name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full h-9 w-9">
              <div className="relative">
                <Bell className="h-5 w-5" />
                {hasUnreadNotifications && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-destructive ring-2 ring-background animate-pulse"></span>
                )}
              </div>
              <span className="sr-only">{t("common.notifications")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>{t("common.notifications")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto py-2">
              <div className="px-4 py-2 text-sm text-center text-muted-foreground">
                {t("notifications.noNotifications")}
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="outline" size="sm" className="w-full">
                {t("notifications.markAllRead")}
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Menu */}
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 p-0 border-2 border-transparent hover:border-primary/20 transition-colors">
                <Avatar className="h-full w-full">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-primary/10 text-primary">{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {user?.email || t("common.account")}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex w-full cursor-pointer">
                  {t("common.settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t("common.profile")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t("common.support")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                {t("common.signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="default" size="sm" className="rounded-full">
            <Link to="/auth">{t("common.signIn")}</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
