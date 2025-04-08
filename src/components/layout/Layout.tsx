
import React from "react";
import PageLayout from "./PageLayout";

interface LayoutProps {
  children: React.ReactNode;
}

// This is kept for backwards compatibility with existing pages
// New pages should use the AppLayout with Outlet pattern
const Layout = ({ children }: LayoutProps) => {
  return (
    <PageLayout>
      {children}
    </PageLayout>
  );
};

export default Layout;
