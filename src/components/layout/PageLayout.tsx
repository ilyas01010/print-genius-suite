
import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      {children}
    </div>
  );
};

export default PageLayout;
