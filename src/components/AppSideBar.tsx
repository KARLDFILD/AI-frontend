import * as React from "react";
import { NavLink } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import { ArrowLeftToLine } from "lucide-react";

export function AppSidebar({
  isOpen,
  setIsOpen,
  onCloseEnd,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onCloseEnd?: () => void;
} & React.ComponentProps<"div">) {
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const handleTransitionEnd = () => {
    if (!isOpen && onCloseEnd) {
      onCloseEnd();
    }
  };

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={`${
        isOpen ? "w-64" : "w-0"
      } h-screen bg-background shadow-lg transition-all duration-300 overflow-hidden flex-shrink-0 fixed z-20`}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-between mb-4">
          <p className="text-center flex items-center">LOGO</p>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 focus:outline-none text-black"
            aria-label="Toggle menu"
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

        <div className="mt-auto">
          {user?.user_name ? (
            <p className="text-sm font-medium text-muted-foreground">
              {user.user_name}
            </p>
          ) : (
            <p className="text-sm font-medium text-muted-foreground">
              Not logged in
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
