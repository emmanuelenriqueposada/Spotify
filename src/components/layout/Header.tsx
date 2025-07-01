import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { useItemContext } from "../../context/useItemContext";
import { logOut } from "../../utils/auth";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const { user, isUserLoggedIn } = useItemContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <header className="bg-gradient-to-b from-gray-900 to-black p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex space-x-2">
          <Button className="rounded-full bg-black/40">
            <IoChevronBack className="h-4 w-4" />
          </Button>
          <Button className="rounded-full bg-black/40">
            <IoChevronForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative flex-1 max-w-md">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-none text-white placeholder-gray-400 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 font-bold">
        {isUserLoggedIn ? (
          <>
            <span className="text-white">
              👤 {user?.displayName ?? user?.email}
            </span>
            <Button
              onClick={handleLogout}
              className="rounded bg-black/40 hover:bg-red-950 text-white"
            >
              Cerrar Sesión
            </Button>
          </>
        ) : (
          <Link to="/login" className="rounded bg-black/40">
            <Button className="rounded bg-black/40">
              <AiOutlineUser className="h-4 w-4" />
              Iniciar Sesión
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
