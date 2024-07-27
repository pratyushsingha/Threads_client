import { Spinner } from "@/components/Index";
import TweetCard from "@/components/TweetCard";
import { useGetBookmarkedTweetsQuery } from "@/services/tweetAPI";

const BookmarkedTweets = () => {
  const {
    data: bookmarkedTweets,
    isLoading,
    isError,
    error,
  } = useGetBookmarkedTweetsQuery();

  if (isLoading) return <Spinner />;
  if (isError) return <p>something went wrong ${error.status}</p>;

  return bookmarkedTweets.length > 0 ? (
    bookmarkedTweets?.map((tweet) => (
      <TweetCard type="HomeCommentOnTweet" key={tweet._id} tweet={tweet} />
    ))
  ) : (
    <p>be the first to add a tweet</p>
  );
};

export default BookmarkedTweets;
