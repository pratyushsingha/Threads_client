import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Spinner } from "@/components/Index";
import { useDispatch } from "react-redux";
import TweetCard from "@/components/TweetCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetTweetByIdQuery } from "@/services/tweetAPI";
import { useGetTweetRepliesQuery } from "@/services/replyAPI";
import { setIdParams } from "@/features/authSlice";

const TweetDetails = () => {
  // const { toast } = useToast();
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: tweetDetails,
    isLoading: isTweetDetailsLoading,
    isError: isTweetDetailsError,
  } = useGetTweetByIdQuery(id);
  const {
    data: tweetReplies,
    isLoading: isTweetRepliesLoading,
    isError: isTweetRepliesError,
  } = useGetTweetRepliesQuery(id);

  useEffect(() => {
    dispatch(setIdParams(id));
  }, [id, dispatch]);

  if (isTweetDetailsError)
    return <p>something went wrong while getting tweetDetils</p>;

  if (isTweetRepliesError)
    return <p>something went wrong while getting tweetComment</p>;

  return (
    <>
      {isTweetDetailsLoading ? (
        <Spinner />
      ) : (
        <>
          {tweetDetails.map((t) => (
            <TweetCard key={t._id} tweet={t} />
          ))}
          <hr />
        </>
      )}
      <div className="p-4 bg-[#181818]">
        <p className="font-3xl font-bold ">Replies</p>
      </div>
      <hr />
      {
        isTweetRepliesLoading ? (
          <Spinner />
        ) : // <InfiniteScroll
        //   dataLength={tweetReplies.length}
        //   next={handleFetchComments}
        //   hasMore={hasNextPage}
        //   loader={<Spinner className="text-center" />}
        // >
        // {

        tweetReplies?.length > 0 ? (
          tweetReplies.map((comment) => (
            <TweetCard key={comment._id} tweet={comment} />
          ))
        ) : (
          <p>Be the first to add a comment</p>
        )
        // }
        // </InfiniteScroll>
      }
    </>
  );
};

export default TweetDetails;
