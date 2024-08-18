import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { sidebarItems, Button, useToast } from "./Index";
import { useSelector } from "react-redux";
import { VscThreeBars } from "react-icons/vsc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/services/authAPI";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((store) => store.auth);
  const [logout] = useLogoutMutation();
  const currentPath = location.pathname.split("/").pop();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.data?.message || error.status,
      });
    }
  };

  return (
    <>
      <div className="flex md:fixed md:flex-col justify-between md:justify-between md:items-center md:h-screen py-5 px-4">
        <NavLink to={"/"}>
          <button className="hidden md:block">
            <img
              className="w-9 h-9 text-white"
              src="/threadsLogo.svg"
              alt="threads logo"
            />
          </button>
        </NavLink>
        <div className="flex justify-between w-full md:flex-col md:space-y-3">
          {sidebarItems.map((item) => (
            <NavLink
              className={`${
                (currentPath == ""
                  ? import.meta.env.VITE_FRONTEND_URL
                  : currentPath === (user?.username || "replies" || "reposts")
                  ? "profile"
                  : currentPath) === item.title && `/${item.title}`
                  ? " text-white"
                  : "text-slate-600"
              } rounded-lg my-2 `}
              key={item._id}
              to={
                item.title === "profile"
                  ? `profile/${user?.username}`
                  : `${item.title}`
              }
            >
              <Button variant="ghost" className="text-xl md:text-3xl py-2">
                {item.icon}
              </Button>
            </NavLink>
          ))}
        </div>
        <div className="hidden md:block" onClick={() => handleLogout()}>
          <Button variant="ghost">
            <CiLogout className="text-lg" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
