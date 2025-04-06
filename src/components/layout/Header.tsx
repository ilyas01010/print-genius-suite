
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, User, LogOut, Languages, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { Separator } from "@/components/ui/separator";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { user, isAuthenticated, logout } = useUser();
  const { toast } = useToast();
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [hasUnreadNotifications] = useState(true);

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

  const handleNotificationClick = () => {
    // This function just opens the dropdown now
  };
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    toast({
      title: t("common.language"),
      description: `${availableLanguages[lang]} ${t("common.success").toLowerCase()}`,
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onToggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      <div className="flex-1">
        <h2 className="text-lg font-semibold">Print Genius Suite</h2>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">{t("common.language")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("common.language")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(availableLanguages).map(([code, name]) => (
              <DropdownMenuItem 
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={language === code ? "bg-accent" : ""}
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
            <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
              <div className="relative">
                <Bell className="h-5 w-5" />
                {hasUnreadNotifications && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
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
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.email || t("common.account")}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("common.profile")}</DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="flex w-full">{t("common.settings")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                {t("common.signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="default" size="sm">
            <Link to="/auth">{t("common.signIn")}</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
