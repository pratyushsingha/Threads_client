import { useGetFeedTweetsQuery } from "@/services/tweetAPI";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScrollTemplate from "@/components/InfiniteScrollTemplate";
import { setFeedTweetsPage } from "@/features/paginationSlice";

const FeedPage = () => {
  const { feedTweetsPage } = useSelector((store) => store.pagination);
  const { isLoading, isError, data } = useGetFeedTweetsQuery(feedTweetsPage);
  const dispatch = useDispatch();

  isError && <p>something went wrong</p>;
  return (
    <InfiniteScrollTemplate
      data={data?.tweets}
      isLoading={isLoading}
      isError={isError}
      fetchMore={() => dispatch(setFeedTweetsPage())}
      hasNextPage={data?.hasNextPage}
      next={() => dispatch(setFeedTweetsPage())}
    />
  );
};

export default FeedPage;
