import { Spinner } from "@/components/Index";
import TweetCard from "@/components/TweetCard";
import { useGetLikedTweetsQuery } from "@/services/tweetAPI";

const LikedTweets = () => {
  const { data: likedTweets, isLoading, isError } = useGetLikedTweetsQuery();

  if (isLoading) return <Spinner />;

  if (isError) return <p>something went wrong</p>;

  return likedTweets.length > 0 ? (
    likedTweets[0].likedTweets.map((tweet) => (
      <TweetCard type="HomeCommentOnTweet" key={tweet._id} tweet={tweet} />
    ))
  ) : (
    <p>be the first to add a tweet</p>
  );
};

export default LikedTweets;
