import { Spinner } from "@/components/Index";
import TweetCard from "@/components/TweetCard";
import { setRepliedTweetsPage } from "@/features/paginationSlice";
import { useGetRepliedTweetsQuery } from "@/services/replyAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RepliedTweetsPage = () => {
  const { username } = useParams();
  const { repliedTweetsPageNo } = useSelector((store) => store.pagination);
  const {
    data: repliedTweets,
    isLoading,
    isError,
  } = useGetRepliedTweetsQuery({ username, page: repliedTweetsPageNo });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Something went wrong</p>;

  return (
    <InfiniteScroll
      dataLength={repliedTweets?.repliedTweets.length}
      next={() => dispatch(setRepliedTweetsPage())}
      hasMore={repliedTweets?.hasNextPage}
      loader={<Spinner />}
    >
      {repliedTweets?.repliedTweets.map((tweet) => (
        <div
          key={tweet._id}
          className="flex flex-col my-5 border-b border-t border-slate p-4 text-white rounded sm:border-l sm:border-r"
        >
          <TweetCard key={tweet._id} tweet={tweet} />
          <TweetCard key={tweet.tweetDetails._id} tweet={tweet.tweetDetails} />
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default RepliedTweetsPage;
