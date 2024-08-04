import { useEffect } from "react";
import { Spinner } from "@/components/Index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useLazyGetMyTweetsQuery,
  useLazyGetPublicTweetsQuery,
} from "@/services/tweetAPI";
import InfiniteScrollTemplate from "@/components/InfiniteScrollTemplate";
import {
  setMyTweetsPage,
  setPublicTweetsPage,
} from "@/features/paginationSlice";

const Tweets = () => {
  const { username } = useParams();
  const { user } = useSelector((store) => store.auth);
  const { myTweetsPage, publicTweetsPage } = useSelector(
    (store) => store.pagination
  );
  const dispatch = useDispatch();
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
      myTweetsTrigger({ username, page: myTweetsPage });
    } else {
      publicTweetsTrigger({ username, page: publicTweetsPage });
    }
  }, []);

  const tweets = username === user?.username ? myTweets : publicTweets;

  if (myTweetsLoading || publicTweetsLoading) return <Spinner />;
  if (myTweetsError || publicTweetsError) return <p>something went wrong</p>;

  return (
    tweets && (
      <InfiniteScrollTemplate
        data={tweets?.tweets}
        isLoading={myTweetsLoading || publicTweetsLoading}
        isError={myTweetsError || publicTweetsError}
        totalTweets={tweets?.totalTweets}
        hasNextPage={tweets?.hasNextPage}
        next={() =>
          username === user?.username
            ? dispatch(setMyTweetsPage())
            : dispatch(setPublicTweetsPage())
        }
      />
    )
  );
};

export default Tweets;
