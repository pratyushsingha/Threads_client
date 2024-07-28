import { Spinner } from "@/components/Index";
import TweetCard from "@/components/TweetCard";
import { useGetFeedTweetsQuery } from "@/services/tweetAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

const FeedPage = () => {
  const { isLoading, isError, data, error } = useGetFeedTweetsQuery();
  const { page, hasNextPage } = useSelector((store) => store.tweet);

  const handleFetchData = () => {
    dispatch(setPage());
    console.log(page);
  };

  isError && <p>something went wrong</p>;

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <InfiniteScroll
        dataLength={data.length}
        next={handleFetchData}
        hasMore={hasNextPage}
        loader={<Spinner className="text-center" />}
      >
        {data.length > 0 ? (
          data.map((tweet, index) => (
            <section key={index}>
              <TweetCard type="HomeCommentOnTweet" tweet={tweet} />
              <hr />
            </section>
          ))
        ) : (
          <h3
            className={` ${
              isLoading && "hidden"
            } block text-md  justify-center items-center h-screen `}
          >
            be the first to make a tweet
          </h3>
        )}
      </InfiniteScroll>
    );
  }
};

export default FeedPage;
