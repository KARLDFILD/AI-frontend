import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import { Menu, ArrowLeftToLine } from "lucide-react";

export function AppSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="p-2 focus:outline-none text-black fixed top-4 left-4 z-30"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-64 px-4 py-6 flex flex-col"
        hideClose={true}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-bold">LOGO</div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 focus:outline-none text-black"
            aria-label="Close sidebar"
          >
            <ArrowLeftToLine className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-primary" : "text-muted-foreground"
              } hover:text-primary`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-primary" : "text-muted-foreground"
              } hover:text-primary`
            }
          >
            Main
          </NavLink>
          <NavLink
            to="/create-character"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-primary" : "text-muted-foreground"
              } hover:text-primary`
            }
          >
            New character
          </NavLink>
        </nav>

        <div className="mt-auto pt-6 border-t text-sm text-muted-foreground">
          {user?.user_name ? `Logged in as ${user.user_name}` : "Not logged in"}
        </div>
      </SheetContent>
    </Sheet>
  );
}
