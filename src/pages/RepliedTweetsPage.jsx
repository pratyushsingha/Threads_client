import { Spinner } from "@/components/Index";
import TweetCard from "@/components/TweetCard";
import { useGetRepliedTweetsQuery } from "@/services/replyAPI";
import { useParams } from "react-router-dom";

const RepliedTweetsPage = () => {
  const { username } = useParams();

  const {
    data: repliedTweets,
    isLoading,
    isError,
  } = useGetRepliedTweetsQuery(username);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Something went wrong</p>;
  return repliedTweets?.map((tweet) => (
    <>
      <div className="flex flex-col my-5 border-b border-t border-slate p-4 text-white rounded sm:border-l sm:border-r">
        <TweetCard key={tweet._id} tweet={tweet} />
        <TweetCard key={tweet.tweetDetails._id} tweet={tweet.tweetDetails} />
      </div>
    </>
  ));
};

export default RepliedTweetsPage;
