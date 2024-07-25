import React from "react";
import TweetCard from "./TweetCard";

const RepostCard = ({ tweet }) => {
  return (
    <>
      <p>{tweet.ownerDetails.username} reposted</p>
      <TweetCard tweet={tweet.tweetDetails} />
    </>
  );
};

export default RepostCard;
