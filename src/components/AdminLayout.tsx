import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminBottomNav } from "./AdminBottomNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export const AdminLayout = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Desktop Sidebar */}
        {!isMobile && <AdminSidebar />}
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <AdminHeader />
          
          {/* Main Content */}
          <main className="flex-1 p-4 pb-20 md:pb-4">
            <Outlet />
          </main>
        </div>
        
        {/* Mobile Bottom Navigation */}
        {isMobile && <AdminBottomNav />}
      </div>
    </SidebarProvider>
  );
};