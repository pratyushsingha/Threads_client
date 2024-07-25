import { useEffect } from "react";
import { Spinner } from "@/components/Index";
import { useSelector } from "react-redux";
import TweetCard from "@/components/TweetCard";
import { useParams } from "react-router-dom";
import {
  useLazyGetMyTweetsQuery,
  useLazyGetPublicTweetsQuery,
} from "@/services/tweetAPI";

const Tweets = () => {
  const { username } = useParams();
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
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (username == user.username) {
      myTweetsTrigger(username);
    } else {
      publicTweetsTrigger(username);
    }
  }, []);

  if (myTweetsLoading || publicTweetsLoading) return <Spinner />;
  if (myTweetsError || publicTweetsError) return <p>something went wrong</p>;
  const tweets = username === user.username ? myTweets : publicTweets;

  return tweets?.map((tweet) => (
    <TweetCard type="HomeCommentOnTweet" key={tweet._id} tweet={tweet} />
  ));
};

export default Tweets;
