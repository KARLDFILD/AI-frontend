import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import useHistoryStore from "@/store/useHistoryStore";
import { Menu, ArrowLeftToLine, LogOut } from "lucide-react";
import { clearToken, getToken } from "@/utils/getToken";
import axios from "axios";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppSidebar({
  isOpen,
  setIsOpen,
  staticMode = false,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  staticMode?: boolean;
}) {
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);
  const history = useHistoryStore((state) => state.history);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (getToken()) {
      getUser();
    }
  }, []);

  const handleLogout = async () => {
    try {
      clearToken();
      useUserStore.setState({ user: null });
      await axios.post(
        "http://localhost:5000/api/user/logout",
        {},
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const sidebarContent = (
    <div className="w-64 px-4 py-6 flex flex-col h-full bg-background border-r">
      <div className="flex items-center justify-between mb-6">
        <NavLink to="/" className="text-lg font-bold">
          LOGO
        </NavLink>
        {!staticMode && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 focus:outline-none text-black"
            aria-label="Close sidebar"
          >
            <ArrowLeftToLine className="h-6 w-6" />
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-4">
        <NavLink to="/create-character">
          <Button className="mb-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Character
          </Button>
        </NavLink>

        {history.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Recent Characters
            </h3>
            <div className="space-y-2">
              {history.map((char) => (
                <NavLink
                  key={char.id}
                  to={`/character/${char.id}`}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={char.avatar} alt={char.name} />
                    <AvatarFallback>
                      {char.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm truncate">{char.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="mt-auto flex justify-between">
        <div className="">{user ? `${user.user_name}` : "Not logged in"}</div>

        {user ? (
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800"
          >
            <LogOut className="inline-block mr-2" />
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="text-sm text-primary hover:text-primary-800"
          >
            <LogOut className="inline-block mr-2" />
            Login
          </NavLink>
        )}
      </div>
    </div>
  );

  if (staticMode) {
    return sidebarContent;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="p-2 focus:outline-none text-black fixed top-5 left-4 z-30"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 flex flex-col" hideClose={true}>
        <SheetTitle className="sr-only">Sidebar</SheetTitle>
        {sidebarContent}
      </SheetContent>
    </Sheet>
  );
}
