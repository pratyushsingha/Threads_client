import { Spinner, TweetCard, useToast } from "@/components/Index";
import axios from "axios";
import React, { useEffect, useState } from "react";

const LikedTweets = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);

  const userTweets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/like/tweets`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setTweets(response.data.data[0].likedTweets);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "error",
        description: `${error.message}`,
      });
      setLoading(false);
    }
  };

  const removeFromLikes = (tweetId) => {
    setTweets((prevTweets) =>
      prevTweets.filter((tweet) => tweet._id !== tweetId)
    );
    toast({
      title: "Removed from your likes",
    });
  };

  useEffect(() => {
    userTweets();
  }, []);

  loading && <Spinner />;

  return tweets.map((tweet) => (
    <TweetCard
      key={tweet._id}
      tweet={tweet}
      setTweets={setTweets}
      removeFromLikes={removeFromLikes}
    />
  ));
};

export default LikedTweets;
