import { useDispatch, useSelector } from "react-redux";
import { setHomeRoute, setPage, setTweetBoxType } from "@/features/tweetSlice";
import {
  TweetBox,
  Spinner,
  Input,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/Index";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiCircleChevDown } from "react-icons/ci";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { homeRoutes } from "@/utils/Index";
import FeedPage from "./FeedPage";
import { useEffect } from "react";

const Home = () => {
  const location = useLocation();
  const { tweetBoxType } = useSelector((store) => store.tweet);

  const { user } = useSelector((store) => store.auth);
  const { homeRoute } = useSelector((store) => store.tweet);

  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(setHomeRoute("For You"));
    } else {
      dispatch(setHomeRoute(location.pathname.split("/").pop()));
    }
  }, [location]);

  return (
    <>
      <div className="flex justify-center items-center space-x-2">
        <span className="font-bold text-xl">{homeRoute}</span>
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
      <div className="flex justify-between">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            {user.username.split("")[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Dialog>
          <DialogTrigger asChild>
            <p
              onClick={() => dispatch(setTweetBoxType("createTweet"))}
              className="self-center"
            >
              start a thread
            </p>
          </DialogTrigger>
          <DialogContent>
            <TweetBox formType={tweetBoxType} />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Post</Button>
          </DialogTrigger>
          <DialogContent>
            <TweetBox formType={tweetBoxType} />
          </DialogContent>
        </Dialog>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
