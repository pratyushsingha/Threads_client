import moment from "moment";

import Widgets from "./Widgets";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTweetBoxType } from "@/features/tweetSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CommentCard = ({ comment }) => {
  const {
    _id,
    ownerDetails,
    updatedAt,
    content,
    images,
    isLiked,
    likeCount,
    isAnonymous,
    commentCount,
  } = comment;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTweetBoxType("replyOnTweet"));
  }, []);

  return (
    <div
      key={_id}
      className="relative border-b border-slate last:border-none bg-[#181818]"
    >
      <div className="flex p-4 text-white">
        <Link to={`/profile/${ownerDetails.username}`}>
          <Avatar>
            <AvatarImage
              src={isAnonymous ? "/image.png" : ownerDetails.avatar}
              alt=""
            />
            <AvatarFallback>
              {isAnonymous ? "Anonymous" : ownerDetails.username}
            </AvatarFallback>
          </Avatar>
        </Link>
        {/* </div> */}
        <div className="pl-4 pt-1 w-full">
          <div className="mb-2 flex items-center gap-x-2">
            <div className="w-full">
              <h2 className="inline-block font-bold">
                {isAnonymous ? "Anonymous" : ownerDetails?.username}
              </h2>
              <span className="ml-2 inline-block text-sm text-gray-400">
                {moment(updatedAt, "YYYYMMDD").fromNow()}
              </span>
            </div>
            <button className="ml-auto shrink-0 hover:text-[#ae7aff]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                ></path>
              </svg>
            </button>
          </div>
          <Link to={`/tweet/${_id}`}>
            <p className="mb-4 text-sm sm:text-base">{content}</p>
            {images && (
              <>
                <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={image}
                      className="rounded-md"
                    />
                  ))}
                </div>
              </>
            )}
          </Link>
          <Widgets data={comment} />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
