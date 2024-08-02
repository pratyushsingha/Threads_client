import InfiniteScrollTemplate from "@/components/InfiniteScrollTemplate";
import { useGetLikedTweetsQuery } from "@/services/tweetAPI";
import { useSelector } from "react-redux";

const LikedTweets = () => {
  const { page } = useSelector((store) => store.tweet);
  const {
    data: likedTweets,
    isLoading,
    isError,
    error,
  } = useGetLikedTweetsQuery(page);

  return (
    <InfiniteScrollTemplate
      data={likedTweets?.tweets}
      isLoading={isLoading}
      isError={isError}
      error={error}
      totalTweets={likedTweets?.totalTweets}
      hasNextPage={likedTweets?.hasNextPage}
    />
  );
};

export default LikedTweets;
