import usePagination from "@/hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "./Index";
import TweetCard from "./TweetCard";

const InfiniteScrollTemplate = ({
  data,
  isLoading,
  isError,
  error,
  totalTweets,
  hasNextPage,
}) => {
  const { incrementPage } = usePagination();

  if (isLoading) return <Spinner />;

  if (isError) return <p>{error.status || "something went wrong"}</p>;
  return (
    <InfiniteScroll
      dataLength={totalTweets}
      next={incrementPage}
      hasMore={hasNextPage}
      loader={<Spinner />}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {data?.map((tweet) => (
        <section key={tweet._id}>
          <TweetCard type="HomeCommentOnTweet" tweet={tweet} />
          <hr />
        </section>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollTemplate;
