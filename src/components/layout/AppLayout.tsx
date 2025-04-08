
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NewSidebar from "./NewSidebar";
import MobileSidebar from "./MobileSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Add animation delay for content loading
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <div className="hidden md:block">
          <NewSidebar />
        </div>
        <div className="flex flex-1 flex-col w-full">
          <Header onToggleSidebar={() => setSidebarOpen(true)} />
          <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className={`flex-1 overflow-auto p-3 md:p-4 lg:p-5 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
