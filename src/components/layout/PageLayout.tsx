
import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return <div className="container mx-auto px-4 py-6">{children}</div>;
};

export default PageLayout;
