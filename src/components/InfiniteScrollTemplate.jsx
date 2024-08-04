import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "./Index";
import TweetCard from "./TweetCard";

const InfiniteScrollTemplate = ({
  data,
  isLoading,
  isError,
  error,
  hasNextPage,
  next,
}) => {
  if (isLoading) return <Spinner />;

  if (isError) return <p>{error || "something went wrong"}</p>;
  return (
    <InfiniteScroll
      dataLength={data?.length}
      next={next}
      hasMore={hasNextPage}
      loader={<Spinner />}
      endMessage={
        <p className="my-3 flex justify-center">
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
