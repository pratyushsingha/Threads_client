import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Spinner } from "@/components/Index";
import { useDispatch } from "react-redux";
import TweetCard from "@/components/TweetCard";
import { useGetTweetByIdQuery } from "@/services/tweetAPI";
import { useGetTweetRepliesQuery } from "@/services/replyAPI";
import { setIdParams } from "@/features/authSlice";
import usePagination from "@/hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollTemplate from "@/components/InfiniteScrollTemplate";

const TweetDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { incrementPage } = usePagination();

  const {
    data: tweetDetails,
    isLoading: isTweetDetailsLoading,
    isError: isTweetDetailsError,
  } = useGetTweetByIdQuery(id);
  const {
    data: tweetReplies,
    isLoading: isTweetRepliesLoading,
    isError: isTweetRepliesError,
    error,
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
      <InfiniteScrollTemplate
        data={tweetReplies?.replies}
        isLoading={isTweetRepliesLoading}
        isError={isTweetRepliesError}
        error={error}
        totalTweets={tweetReplies?.totalReplies}
        hasNextPage={tweetReplies?.hasNextPage}
      />
    </>
  );
};

export default TweetDetails;
