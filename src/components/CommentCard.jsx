import moment from "moment";
import { Heart, MessageCircle } from "lucide-react";

import { Button } from "@/components/Index";

const CommentCard = ({
  comment,
  toggleCommentLike,
  commentComments,
  replies,
  disable,
}) => {
  const { _id, ownerDetails, updatedAt, content, images, isLiked, likeCount } =
    comment;

  return (
    <div key={_id} className="relative border-b border-slate last:border-none">
      <div className="flex p-4 text-white">
        {/* <div className="relative shrink-0 before:absolute before:left-1/2 before:top-[30px] before:z-[5] before:h-full before:w-[1px] before:bg-slate-800"> */}
        <div className="relative z-10 h-10 w-10 sm:h-12 sm:w-12">
          <img
            src={ownerDetails?.avatar}
            alt={ownerDetails?.username}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        {/* </div> */}
        <div className="pl-4 pt-1">
          <div className="mb-2 flex items-center gap-x-2">
            <div className="w-full">
              <h2 className="inline-block font-bold">
                {ownerDetails?.username}
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
          <div className="flex gap-x-4">
            <button
              onClick={(e) => toggleCommentLike(_id, e)}
              className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] hover:text-[#ae7aff] focus:text-[#ae7aff] focus:after:content-[attr(data-like-count-alt)]"
            >
              {isLiked ? <Heart fill="#1A8CD8" /> : <Heart />}
              <span>{likeCount}</span>
            </button>
            <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
              <MessageCircle />
              <span>20</span>
            </button>
            <Button
              className={disable ? "hidden" : "block"}
              onClick={(e) => commentComments(_id, e)}
              variant="ghost"
            >
              see replies
            </Button>
          </div>
        </div>
      </div>
      {replies.map(
        ({
          _id,
          ownerDetails,
          updatedAt,
          content,
          images,
          isLiked,
          likeCount,
        }) => (
          <div
            key={_id}
            className="relative border-b border-slate ml-20 last:border-none"
          >
            <div className="flex p-4 text-white">
              <div className="relative shrink-0 before:absolute before:left-1/2 before:top-[19px] before:z-[5] before:h-full before:w-[1px] before:bg-slate-800">
                <div className="relative z-10 h-10 w-10 sm:h-12 sm:w-12">
                  <img
                    src={ownerDetails?.avatar}
                    alt={ownerDetails?.username}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="pl-4 pt-1">
                <div className="mb-2 flex items-center gap-x-2">
                  <div className="w-full">
                    <h2 className="inline-block font-bold">
                      {ownerDetails?.username}
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
                <div className="flex gap-x-4">
                  <button
                    onClick={(e) => toggleCommentLike(_id, e)}
                    className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] hover:text-[#ae7aff] focus:text-[#ae7aff] focus:after:content-[attr(data-like-count-alt)]"
                  >
                    {isLiked ? <Heart fill="#1A8CD8" /> : <Heart />}
                    <span>{likeCount}</span>
                  </button>
                  <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#ae7aff]">
                    <MessageCircle />
                    <span>20</span>
                  </button>
                  <Button
                    className={disable ? "hidden" : "block"}
                    onClick={(e) => commentComments(_id, e)}
                    variant="ghost"
                  >
                    see replies
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CommentCard;
