import { useSelector } from "react-redux";
import { TweetBox } from "./Index";
import Tweet from "./Tweet";

const CommentBox = ({ type, data }) => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <Tweet tweet={data} />
      <TweetBox formType={type} id={data._id} />
    </>
  );
};

export default CommentBox;
