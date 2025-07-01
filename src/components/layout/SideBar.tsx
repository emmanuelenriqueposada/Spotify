import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { Button } from "../ui/Button";

export default function Sidebar() {
  const menuItems = [
    { icon: AiOutlineHome, label: "Home", active: true },
    { icon: AiOutlineSearch, label: "Search" },
    { icon: BiLibrary, label: "Your Library" },
  ];

  return (
    <div className="w-64 bg-black p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Spotify</h1>
      </div>

      <nav className="space-y-2 mb-8">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            className={`w-full justify-start text-gray-300 hover:text-white ${
              item.active ? "text-white bg-gray-800" : ""
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}
