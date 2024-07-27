import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Heart, Bookmark, Share2, MessageCircle, Copy } from "lucide-react";

import {
  Label,
  Input,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  useToast,
} from "@/components/Index";
import { useDispatch } from "react-redux";
import { setTweetBoxType } from "@/features/tweetSlice";
import Widgets from "./Widgets";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TweetCard = ({ tweet }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTweetBoxType("replyOnTweet"));
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex border-b border-t border-slate p-4 text-white sm:border-l sm:border-r bg-[#181818]">
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
                {moment(tweet.updatedAt, "YYYYMMDD").fromNow()}
              </span>
            </div>
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
          <Widgets data={tweet} />
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
