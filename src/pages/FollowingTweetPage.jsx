import InfiniteScrollTemplate from "@/components/InfiniteScrollTemplate";
import { setFollowingUsersTweetsPage } from "@/features/paginationSlice";
import { useGetFollowingUserTweetsQuery } from "@/services/tweetAPI";
import { useDispatch, useSelector } from "react-redux";

const FollowingTweetPage = () => {
  const dispatch = useDispatch();
  const { followingUsersTweetsPage } = useSelector((store) => store.pagination);
  const {
    data: followingUserTweets,
    isLoading: followingUserTweetsLoading,
    isError: followingUserTweetsError,
  } = useGetFollowingUserTweetsQuery(followingUsersTweetsPage);
  return (
    <InfiniteScrollTemplate
      data={followingUserTweets?.followingTweets}
      isLoading={followingUserTweetsLoading}
      isError={followingUserTweetsError}
      hasNextPage={followingUserTweets?.hasNextPage}
      next={() => dispatch(setFollowingUsersTweetsPage())}
    />
  );
};

export default FollowingTweetPage;
