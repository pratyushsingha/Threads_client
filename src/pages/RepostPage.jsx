import { Spinner } from "@/components/Index";
import RepostCard from "@/components/RepostCard";
import { useGetRepostedTweetsQuery } from "@/services/repostAPI";
import React from "react";
import { useParams } from "react-router-dom";

const RepostPage = () => {
  const { username } = useParams();

  const {
    data: repostTweets,
    isLoading,
    isError,
  } = useGetRepostedTweetsQuery(username);

  if (isLoading) return <Spinner />;
  if (isError) return <p>something went wrong</p>;

  return repostTweets.length > 0 ? (
    repostTweets.map((tweet) => <RepostCard key={tweet._id} tweet={tweet} />)
  ) : (
    <p>be the first to add a repost</p>
  );
};

export default RepostPage;
