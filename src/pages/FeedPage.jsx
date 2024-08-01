import { Spinner } from "@/components/Index";
import TweetCard from "@/components/TweetCard";
import { useGetFeedTweetsQuery } from "@/services/tweetAPI";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { setPage } from "@/features/tweetSlice";
import InfiniteScrollTemplate from "@/components/InfiniteScrollTemplate";
import usePagination from "@/hooks/usePagination";

const FeedPage = () => {
  const { page } = useSelector((store) => store.tweet);
  const { isLoading, isError, data } = useGetFeedTweetsQuery(page);
  const { incrementPage } = usePagination();

  isError && <p>something went wrong</p>;

  return (
    <InfiniteScrollTemplate
      data={data?.tweets}
      isLoading={isLoading}
      isError={isError}
      fetchMore={incrementPage}
      totalTweets={data?.totalTweets}
      hasNextPage={data?.hasNextPage}
    />
  );
};

export default FeedPage;
