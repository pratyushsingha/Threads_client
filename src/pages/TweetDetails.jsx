import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import {
  useToast,
  AppContext,
  TweetCard,
  CommentCard,
} from "@/components/Index";

const TweetDetails = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const { progress, setProgress } = useContext(AppContext);
  const [tweet, setTweet] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState([]);
  const [disableMap, setDisableMap] = useState({});

  const getTweetDetails = useCallback(async () => {
    setProgress(progress + 30);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tweet/tweet/${id}`,
        { withCredentials: true }
      );
      setTweet(response.data.data);
      setProgress(progress + 100);
    } catch (error) {
      console.log(error);
      setProgress(progress + 100);
    }
  }, [id, setProgress]);

  const toggleCommentLike = async (commentId, e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/like/comment/${commentId}`,
        {},
        { withCredentials: true }
      );
      const updatedComment = response.data.data[0];
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment
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

  const getTweetComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${id}`,
        { withCredentials: true }
      );
      setComments(response.data.data);
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

  const commentComments = async (commentId, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/comments/comment/${commentId}`,
        { withCredentials: true }
      );
      if (response.data.data.length > 0) {
        // Update disable state for the clicked comment
        setDisableMap((prevMap) => ({
          ...prevMap,
          [commentId]: true,
        }));
      }
      setReplies((prevReplies) => [...prevReplies, ...response.data.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTweetDetails();
    getTweetComments();
  }, []);

  return (
    <>
      {tweet.map((t) => (
        <TweetCard key={t._id} tweet={t} setTweets={setTweet} />
      ))}
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          comment={comment}
          toggleCommentLike={toggleCommentLike}
          commentComments={commentComments}
          replies={replies.filter((reply) => reply.commentId === comment._id)}
          disable={disableMap[comment._id]}
        />
      ))}
    </>
  );
};

export default TweetDetails;
