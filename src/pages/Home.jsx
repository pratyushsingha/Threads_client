import { useDispatch, useSelector } from "react-redux";
import { setTweetBoxType } from "@/features/tweetSlice";
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

import { Link, Outlet } from "react-router-dom";

const Home = () => {
  const { tweetBoxType } = useSelector((store) => store.tweet);

  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-between p-5">
        <Link to={`/profile/${user.username}`}>
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.username.split("")[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <p
              onClick={() => dispatch(setTweetBoxType("createTweet"))}
              className="self-center"
            >
              Start a Tweet
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
      <hr />
      <div className="overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
};

export default Home;
