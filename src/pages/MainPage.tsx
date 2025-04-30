import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function MainPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden relative">
        <AppSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex flex-col h-full w-full">
          <div className="w-full h-full bg-white flex flex-col items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default MainPage;
