import { Spinner } from "@/components/Index";
import TweetCard from "@/components/TweetCard";
import { useGetLikedTweetsQuery } from "@/services/tweetAPI";

const LikedTweets = () => {
  const { data: likedTweets, isLoading, isError } = useGetLikedTweetsQuery();

  if (isLoading) return <Spinner />;

  if (isError) return <p>something went wrong</p>;

  return likedTweets.length > 0 ? (
    likedTweets[0].likedTweets.map((tweet) => (
      <section key={tweet._id}>
        <TweetCard type="HomeCommentOnTweet" tweet={tweet} />
        <hr />
      </section>
    ))
  ) : (
    <p>be the first to add a tweet</p>
  );
};

export default LikedTweets;
