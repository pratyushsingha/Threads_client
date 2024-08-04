import { Spinner } from "@/components/Index";
import RepostCard from "@/components/RepostCard";
import { setRepostedTweetsPage } from "@/features/paginationSlice";
import { useGetRepostedTweetsQuery } from "@/services/repostAPI";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RepostPage = () => {
  const { username } = useParams();
  const { repostedTweetsPage } = useSelector((store) => store.pagination);
  const dispatch = useDispatch();
  const {
    data: repostTweets,
    isLoading,
    isError,
  } = useGetRepostedTweetsQuery({ username, page: repostedTweetsPage });

  if (isLoading) return <Spinner />;
  if (isError) return <p>something went wrong</p>;

  return repostTweets?.reposts.length > 0 ? (
    <InfiniteScroll
      dataLength={repostTweets?.totalReposts}
      next={() => dispatch(setRepostedTweetsPage())}
      hasMore={repostTweets.hasNextPage}
      loader={<Spinner />}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {repostTweets?.reposts.map((tweet) => (
        <RepostCard key={tweet._id} tweet={tweet} />
      ))}
    </InfiniteScroll>
  ) : (
    <div className="flex justify-center items-center my-9">
      Be the first to add a repost
    </div>
  );
};

export default RepostPage;
