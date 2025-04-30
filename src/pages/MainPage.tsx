import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(true);

  const handleSidebarCloseEnd = () => {
    setShowMenuButton(true);
  };

  const handleToggleSidebar = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setShowMenuButton(false);
      setIsOpen(true);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onCloseEnd={handleSidebarCloseEnd}
        />
        <div className="flex flex-col h-full w-full">
          {showMenuButton && (
            <div className="fixed top-4 left-4 z-30 flex items-center px-4">
              <button
                onClick={handleToggleSidebar}
                className="p-2 focus:outline-none text-black"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          )}
          <div className="w-full h-full bg-white flex flex-col items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default MainPage;
