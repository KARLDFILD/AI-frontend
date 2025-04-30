import { Menu } from "lucide-react";

const Header = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  return (
    <div className="w-full fixed z-100 min-h-[70px] bg-background flex items-center px-4 ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 focus:outline-none text-black"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Header;
