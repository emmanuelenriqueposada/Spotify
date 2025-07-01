import { FaHome, FaSearch } from "react-icons/fa";
import { BiLibrary } from "react-icons/bi";
import { Button } from "../ui/Button";

export default function MobileNav() {
  const navItems = [
    { icon: FaHome, label: "Home", active: true },
    { icon: FaSearch, label: "Search" },
    { icon: BiLibrary, label: "Library" },
  ];

  return (
    <nav className="bg-black border-t border-gray-800 p-2">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Button
            key={item.label}
            className={`flex flex-col items-center space-y-1 p-2 ${
              item.active ? "text-white" : "text-gray-400"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}
