import { useContext, useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Sidebar,
  AppContext,
  TweetCard,
  Spinner,
  useToast,
} from "@/components/Index";

const Home = () => {
  const { toast } = useToast();
  const { progress, setProgress } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);

  const getFeedTweets = async () => {
    setLoading(true);
    setProgress(progress + 30);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tweet?page=${page}&limit=20`,
        { withCredentials: true }
      );
      setTweets((prev) => [...prev, ...response.data.data.tweets]);
      setLoading(false);
      setProgress(progress + 100);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        variant: "destructive",
        title: "error",
        description: `${error.message}`,
      });
      setProgress(progress + 100);
    }
  };

  const toggleLike = async (tweetId, e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/like/tweet/${tweetId}`,
        {},
        { withCredentials: true }
      );
      const updatedTweet = response.data.data[0];
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet._id === updatedTweet._id ? updatedTweet : tweet
        )
      );
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "error",
        description: `${error.message}`,
      });
    }
  };

  const bookMarkTweet = async (tweetId, e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/bookmarks/${tweetId}`,
        {},
        { withCredentials: true }
      );
      // console.log(response.data.data[0]);

      const updatedTweet = response.data.data[0];
      setTweets((prevTweets) =>
        prevTweets.map((tweet) =>
          tweet._id === updatedTweet._id ? updatedTweet : tweet
        )
      );
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "error",
        description: `${error.message}`,
      });
    }
  };

  const infiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeedTweets();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, []);

  return (
    <Container>
      <div className="grid grid-4 gap-4 sm:grid-cols-12">
        <Sidebar />
        {loading && <Spinner />}
        <div className="sm:col-span-8 col-span-10 overscroll-y-auto">
          {tweets.map((tweet, index) => (
            <TweetCard
              key={index}
              tweet={tweet}
              toggleLike={toggleLike}
              bookMarkTweet={bookMarkTweet}
            />
          ))}
        </div>
        <div className="hidden sm:block sm:col-span-2">who to follow</div>
      </div>
    </Container>
  );
};

export default Home;
