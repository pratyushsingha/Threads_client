import { Link } from "react-router-dom";
import moment from "moment";
import Widgets from "./Widgets";

const Tweet = ({ tweet }) => {
  return (
    <>
      <div className="relative mb-2 w-full last:mb-0 sm:mb-4">
        <div className="flex p-2">
          <div className="h-10 w-10 shrink-0 sm:h-12 sm:w-12">
            <Link
              to={
                tweet.isAnonymous
                  ? ""
                  : `/profile/${tweet.ownerDetails.username}`
              }
            >
              <img
                src={
                  tweet.isAnonymous
                    ? "https://i.postimg.cc/Pxd7wvnh/image.png"
                    : tweet?.ownerDetails?.avatar
                }
                alt={
                  tweet.isAnonymous ? "Anonymous" : tweet.ownerDetails?.username
                }
                className="h-full w-full rounded-full object-cover"
              />
            </Link>
          </div>
          <div className="pl-4 pt-1">
            <div className="mb-2 flex justify-between items-center gap-x-2">
              <div className="w-full">
                {tweet.ownerDetails && (
                  <h2 className="inline-block font-bold">
                    {tweet.isAnonymous
                      ? "Anonymous"
                      : tweet.ownerDetails.username}
                  </h2>
                )}

                <span className="ml-2 inline-block text-sm text-gray-400">
                  {moment(tweet.updatedAt, "YYYYMMDD").fromNow()}
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
            <Link to={`/tweet/${tweet._id}`}>
              <p className="mb-4 text-sm sm:text-base">{tweet.content}</p>
              <div className="mb-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
                {tweet.images &&
                  tweet.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={image}
                      className="rounded-md"
                    />
                  ))}
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Widgets data={tweet} />
    </>
  );
};

export default Tweet;
