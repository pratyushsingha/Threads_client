import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { homeRoutes } from "@/utils/Index";
import { setHomeRoute } from "@/features/tweetSlice";
import { Button } from "./Index";
import { CiCircleChevDown } from "react-icons/ci";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { homeRoute } = useSelector((store) => store.tweet);

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(setHomeRoute("For You"));
    } else {
      dispatch(setHomeRoute(location.pathname.split("/").pop()));
    }
  }, [location]);

  if (
    location.pathname === "/" ||
    location.pathname === "/following" ||
    location.pathname === "/liked" ||
    location.pathname === "/saved"
  ) {
    return (
      <div className="flex justify-center items-center space-x-2 mb-3 sticky top-0 z-50 bg-black md:w-8/12">
        <span className="font-bold text-xl">
          {homeRoute.charAt(0).toUpperCase() + homeRoute.toLowerCase().slice(1)}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">
              <CiCircleChevDown className="text-2xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {homeRoutes.map((item) => (
              <Link to={`${item.path}`} key={item._id}>
                <DropdownMenuItem>{item.title} </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-between mb-3 md:w-8/12">
        <Button
          onClick={() => navigate(-1)}
          size="sm"
          variant="ghost"
          className="flex-shrink-0"
        >
          <IoArrowBackCircleOutline className="w-5 h-5" />
        </Button>
        <span className="font-bold text-xl mx-auto">
          {location.pathname.split("/")[1].charAt(0).toUpperCase() +
            location.pathname.split("/")[1].slice(1)}
        </span>
        <div className="flex-shrink-0 w-20"></div>
      </div>
    );
  }
};

export default Header;
