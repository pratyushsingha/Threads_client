import InfiniteScrollTemplate from "@/components/InfiniteScrollTemplate";
import { setLikedTweetsPage } from "@/features/paginationSlice";
import { useGetLikedTweetsQuery } from "@/services/tweetAPI";
import { useDispatch, useSelector } from "react-redux";

const LikedTweets = () => {
  const { likedTweetsPage } = useSelector((store) => store.pagination);
  const dispatch = useDispatch();
  const {
    data: likedTweets,
    isLoading,
    isError,
    error,
  } = useGetLikedTweetsQuery(likedTweetsPage);

  return (
    <InfiniteScrollTemplate
      data={likedTweets?.tweets}
      isLoading={isLoading}
      isError={isError}
      error={error}
      totalTweets={likedTweets?.totalTweets}
      hasNextPage={likedTweets?.hasNextPage}
      next={() => dispatch(setLikedTweetsPage())}
    />
  );
};

export default LikedTweets;
