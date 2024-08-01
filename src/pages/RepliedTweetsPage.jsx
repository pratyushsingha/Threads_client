import { Spinner } from "@/components/Index";
import TweetCard from "@/components/TweetCard";
import usePagination from "@/hooks/usePagination";
import { useGetRepliedTweetsQuery } from "@/services/replyAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

const RepliedTweetsPage = () => {
  const { username } = useParams();
  const { incrementPage } = usePagination();

  const {
    data: repliedTweets,
    isLoading,
    isError,
  } = useGetRepliedTweetsQuery(username);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Something went wrong</p>;
  
  return (
    <InfiniteScroll
      dataLength={repliedTweets?.totalRepliedTweets}
      next={incrementPage}
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
