import { useEffect } from "react";
import { CommentCard, Spinner } from "@/components/Index";
import TweetCard from "@/components/TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CommentDetails = () => {
  const { id } = useParams();
  const { commentDetails, isLoading, comments } = useSelector(
    (store) => store.comment
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getCommentsOnComment(id));
  }, [dispatch, id]);

  if (isLoading) {
    <Spinner />;
  } else {
    return (
      <>
        {commentDetails.map((comment) => (
          <TweetCard
            type="commentOnComment"
            key={comment._id}
            tweet={comment}
          />
        ))}
        {isLoading ? (
          <Spinner />
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))
        )}
      </>
    );
  }
};

export default CommentDetails;
