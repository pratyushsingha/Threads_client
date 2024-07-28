import TweetCard from "./TweetCard";
import { BiRepost } from "react-icons/bi";

const RepostCard = ({ tweet }) => {
  return (
    <>
      <section className="p-4">
        <div className="flex space-x-3 text-gray-500 px-5">
          <BiRepost className="self-center text-xl" />
          <p>
            <span className="font-bold">{tweet.ownerDetails.username}</span>{" "}
            Reposted
          </p>
        </div>
        <TweetCard tweet={tweet.tweetDetails} />
      </section>
      <hr />
    </>
  );
};

export default RepostCard;
