import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { useToast } from "@/components/Index";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [userDetails, setUserDetails] = useState({});

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

  const currentUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/current-user`,
        { withCredentials: true }
      );
      setUserDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  const value = {
    progress,
    setProgress,
    toggleLike,
    bookMarkTweet,
    getFeedTweets,
    infiniteScroll,
    tweets,
    loading,
    page,
    setTweets,
    userDetails,
    setLoading,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
