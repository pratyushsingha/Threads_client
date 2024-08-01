import { useEffect } from "react";
import { Spinner } from "@/components/Index";
import { useDispatch, useSelector } from "react-redux";
import TweetCard from "@/components/TweetCard";
import { useParams } from "react-router-dom";
import {
  useLazyGetMyTweetsQuery,
  useLazyGetPublicTweetsQuery,
} from "@/services/tweetAPI";
import { CloudHail } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import usePagination from "@/hooks/usePagination";
import InfiniteScrollTemplate from "@/components/InfiniteScrollTemplate";

const Tweets = () => {
  const { username } = useParams();
  const { user } = useSelector((store) => store.auth);
  const { page } = useSelector((store) => store.tweet);
  const [
    myTweetsTrigger,
    { data: myTweets, isLoading: myTweetsLoading, error: myTweetsError },
  ] = useLazyGetMyTweetsQuery();
  const [
    publicTweetsTrigger,
    {
      data: publicTweets,
      isLoading: publicTweetsLoading,
      error: publicTweetsError,
    },
  ] = useLazyGetPublicTweetsQuery();

  useEffect(() => {
    if (username == user.username) {
      myTweetsTrigger(username, page);
    } else {
      publicTweetsTrigger(username, page);
    }
  }, []);

  const tweets = username === user.username ? myTweets : publicTweets;

  return (
    tweets && (
      <InfiniteScrollTemplate
        data={tweets?.tweets}
        isLoading={myTweetsLoading || publicTweetsLoading}
        isError={myTweetsError || publicTweetsError}
        totalTweets={tweets?.totalTweets}
        hasNextPage={tweets?.hasNextPage}
      />
    )
  );
};

export default Tweets;
