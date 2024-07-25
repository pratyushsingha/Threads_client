import moment from "moment";

import Widgets from "./Widgets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTweetBoxType } from "@/features/tweetSlice";

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
  // const { setTweetBoxType } = useSelector((store) => store.tweet);

  useEffect(() => {
    dispatch(setTweetBoxType("replyOnTweet"));
  }, []);

  return (
    <div key={_id} className="relative border-b border-slate last:border-none">
      <div className="flex p-4 text-white">
        {/* <div className="relative shrink-0 before:absolute before:left-1/2 before:top-[30px] before:z-[5] before:h-full before:w-[1px] before:bg-slate-800"> */}
        <Link to={`/tweet/${_id}`}>
          <div className="relative z-10 h-10 w-10 sm:h-12 sm:w-12">
            <img
              src={
                isAnonymous
                  ? "https://i.postimg.cc/Pxd7wvnh/image.png"
                  : ownerDetails?.avatar
              }
              alt={isAnonymous ? "Anonymous" : ownerDetails?.username}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </Link>
        {/* </div> */}
        <div className="pl-4 pt-1">
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
          {/* <div className="flex gap-x-4">
            <button
              onClick={() => dispatch(toggleLikeComment(_id))}
              className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] hover:text-[#ae7aff] focus:text-[#ae7aff] focus:after:content-[attr(data-like-count-alt)]"
            >
              {isLiked ? <Heart fill="#1A8CD8" /> : <Heart />}
              <span>{likeCount}</span>
            </button>
            <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
              <MessageCircle />
              <span>{commentCount}</span>
            </button>
          </div> */}

          <Widgets data={comment} />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
