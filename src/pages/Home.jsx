import { useDispatch, useSelector } from "react-redux";
import { setPage, setTweetBoxType } from "@/features/tweetSlice";
import {
  TweetBox,
  Spinner,
  Input,
  Button,
  Dialog,
  DialogTrigger,
  DialogHeader,
} from "@/components/Index";
import InfiniteScroll from "react-infinite-scroll-component";
import TweetCard from "@/components/TweetCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogContent } from "@radix-ui/react-dialog";
import { useGetFeedTweetsQuery } from "@/services/tweetAPI";

const Home = () => {
  const { page, tweetBoxType, hasNextPage } = useSelector(
    (store) => store.tweet
  );
  const { isLoading, isError, data, error } = useGetFeedTweetsQuery();

  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const handleFetchData = () => {
    dispatch(setPage());
    console.log(page);
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <>
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
        {isError && <div>{error}</div>}
        <InfiniteScroll
          dataLength={data.length}
          next={handleFetchData}
          hasMore={hasNextPage}
          loader={<Spinner className="text-center" />}
        >
          {data.length > 0 ? (
            data.map((tweet, index) => (
              <TweetCard type="HomeCommentOnTweet" key={index} tweet={tweet} />
            ))
          ) : (
            <h3
              className={` ${
                isLoading && "hidden"
              } block text-md  justify-center items-center h-screen `}
            >
              be the first to make a tweet
            </h3>
          )}
        </InfiniteScroll>
      </>
    );
  }
};

export default Home;
