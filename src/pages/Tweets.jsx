import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, TweetCard, useToast } from "@/components/Index";

const Tweets = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);

  const userTweets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tweet/my`,
        {
          withCredentials: true,
        }
      );
      setTweets(response.data.data);
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

  useEffect(() => {
    userTweets();
  }, []);

  loading && <Spinner />;

  return tweets.map((tweet) => (
    <TweetCard tweet={tweet} setTweets={setTweets} />
  ));
};

export default Tweets;
