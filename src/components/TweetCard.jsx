import { useRef } from "react";
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

const TweetCard = ({ tweet, toggleLike, bookMarkTweet }) => {
  const { toast } = useToast();
  const inputRef = useRef();

  const handleCopy = () => {
    inputRef.current?.select();
    window.navigator.clipboard.writeText(`${window.location.href}${tweet._id}`);
    toast({
      title: "Copied to clipboard",
    });
  };

  return (
    <div className="relative mb-2 w-full last:mb-0 sm:mb-4">
      <div className="flex border-b border-t border-slate p-4 text-white rounded sm:border-l sm:border-r">
        <div className="h-10 w-10 shrink-0 sm:h-12 sm:w-12">
          <img
            src={
              tweet.isAnonymous
                ? "https://i.postimg.cc/Pxd7wvnh/image.png"
                : tweet?.ownerDetails?.avatar
            }
            alt={
              tweet.isAnonymous ? "Anonymous" : tweet?.ownerDetails?.username
            }
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="pl-4 pt-1">
          <div className="mb-2 flex justify-between items-center gap-x-2">
            <div className="w-full">
              <h2 className="inline-block font-bold">
                {tweet.isAnonymous ? "Anonymous" : tweet.ownerDetails.username}
              </h2>
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
          <div className="flex gap-x-4">
            <button
              onClick={(e) => toggleLike(tweet._id, e)}
              className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] hover:text-[#1A8CD8]"
            >
              {tweet.isLiked === true ? <Heart fill="#1A8CD8" /> : <Heart />}
              <span>{tweet.likeCount}</span>
            </button>
            <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#1A8CD8]">
              <MessageCircle />
              <span>{tweet.commentCount}</span>
            </button>
            <div className="ml-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="mr-2 inline-flex items-center gap-x-1 outline-none hover:text-[#1A8CD8]">
                    <Share2 />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                      Anyone who has this link will be able to view this.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Link
                      </Label>
                      <Input
                        id="link"
                        defaultValue={`${window.location.href}${tweet._id}`}
                        readOnly
                        ref={inputRef}
                      />
                    </div>
                    <Button
                      onClick={handleCopy}
                      type="submit"
                      size="sm"
                      className="px-3"
                    >
                      <span className="sr-only">Copy</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <button
                onClick={(e) => bookMarkTweet(tweet._id, e)}
                className="group inline-flex items-center gap-x-1 outline-none hover:text-[#1A8CD8] "
              >
                {tweet.isBookmarked === true ? (
                  <Bookmark fill="#1A8CD8" />
                ) : (
                  <Bookmark />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
