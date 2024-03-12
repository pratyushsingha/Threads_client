import { useEffect, useState } from "react";
import { Spinner, TweetCard, useToast } from "@/components/Index";
import axios from "axios";

const BookmarkedTweets = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);

  const bookmarkedTweets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/bookmarks`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.data[0].bookmarkedTweet)
      setTweets(response.data.data[0].bookmarkedTweet);
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

  const removeFromBookmarks = (tweetId) => {
    setTweets((prevTweets) =>
      prevTweets.filter((tweet) => tweet._id !== tweetId)
    );
    toast({
      title: "Removed from your bookmarks",
    });
  };

  useEffect(() => {
    bookmarkedTweets();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    tweets.map((tweet) => (
      <TweetCard
        key={tweet._id}
        tweet={tweet}
        setTweets={setTweets}
        removeFromBookmarks={removeFromBookmarks}
      />
    ))
  );
};

export default BookmarkedTweets;
