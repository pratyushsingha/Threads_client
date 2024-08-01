import InfiniteScrollTemplate from "@/components/InfiniteScrollTemplate";
import { useGetBookmarkedTweetsQuery } from "@/services/tweetAPI";
import { useSelector } from "react-redux";

const BookmarkedTweets = () => {
  const { page } = useSelector((store) => store.tweet);
  const {
    data: bookmarkedTweets,
    isLoading,
    isError,
    error,
  } = useGetBookmarkedTweetsQuery(page);

  return (
    <InfiniteScrollTemplate
      data={bookmarkedTweets?.tweets}
      isLoading={isLoading}
      isError={isError}
      error={error}
      totalTweets={bookmarkedTweets?.totalTweets}
      hasNextPage={bookmarkedTweets?.hasNextPage}
    />
  );
};

export default BookmarkedTweets;
