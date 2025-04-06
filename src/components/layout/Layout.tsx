
import React, { useState, useEffect } from "react";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";
import NewSidebar, { SidebarWrapper } from "./NewSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    // Add animation delay for content loading
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    // Handle scroll detection for header shadow
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <SidebarWrapper>
      <div className="flex min-h-screen w-full">
        <div className="hidden md:block">
          <NewSidebar />
        </div>
        <div className="flex flex-1 flex-col w-full">
          <Header 
            onToggleSidebar={() => setSidebarOpen(true)} 
            className={scrolled ? 'shadow-sm' : ''} 
          />
          <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className={`flex-1 overflow-auto p-4 md:p-6 lg:p-8 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mx-auto max-w-6xl animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Layout;
