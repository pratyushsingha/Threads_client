import { Link } from "react-router-dom";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { useEffect, useRef } from "react";

const Tweet = ({ tweet }) => {
  const imageScrollRef = useRef();
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      if (imageScrollRef.current) {
        imageScrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = imageScrollRef.current;

    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleScroll);
      };
    }
  }, []);
  return (
    <div className="relative w-full">
      <div className="flex p-4 text-white ">
        <Link to={`/profile/${tweet.ownerDetails.username}`}>
          <Avatar>
            <AvatarImage
              src={tweet.isAnonymous ? "/image.png" : tweet.ownerDetails.avatar}
              alt=""
            />
            <AvatarFallback>
              {tweet.isAnonymous ? "Anonymous" : tweet.ownerDetails.username}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="pl-4 pt-1 w-full">
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
                {moment(tweet.updatedAt).fromNow()}
              </span>
            </div>
          </div>
          <Link to={`/tweet/${tweet._id}`}>
            <p className="mb-4 text-sm sm:text-base">{tweet.content}</p>
            <div
              ref={imageScrollRef}
              className="mb-4 flex space-x-3 w-full overflow-x-scroll hide-scrollbar"
            >
              {tweet.images &&
                tweet.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={image}
                    className="rounded-md w-6/12"
                  />
                ))}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
