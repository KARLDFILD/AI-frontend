import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function MainPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden relative">
        <div className="hidden xl:block">
          <AppSidebar isOpen={true} setIsOpen={setIsOpen} staticMode />
        </div>

        <div className="block xl:hidden">
          <AppSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        <div className="flex flex-col w-full h-screen">
          <div className="w-full h-full bg-white flex flex-col items-center overflow-auto hideScroll">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default MainPage;
