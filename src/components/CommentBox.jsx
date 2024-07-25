import { useSelector } from "react-redux";
import { TweetBox } from "./Index";
import Tweet from "./Tweet";

const CommentBox = ({ type, data }) => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <Tweet tweet={data} />
      <div>
        <div className="flex self-center space-x-3">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-12 h-12 rounded-full"
          />
          <p>{user.username}</p>
        </div>
        <TweetBox formType={type} id={data._id} />
      </div>
    </>
  );
};

export default CommentBox;
