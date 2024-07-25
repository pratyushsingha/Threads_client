import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  Copy,
  Repeat2,
} from "lucide-react";

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
import CommentBox from "./CommentBox";
import {
  useToggleBookmarkMutation,
  useToggleLikeMutation,
} from "@/services/tweetAPI";
import { useRepostTweetMutation } from "@/services/repostAPI";

const Widgets = ({ data, type }) => {
  const { toast } = useToast();
  const inputRef = useRef();
  const [toggleLike] = useToggleLikeMutation();
  const [toggleBookmark] = useToggleBookmarkMutation();
  const [repostTweet] = useRepostTweetMutation();
  // const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const handleCopy = () => {
    inputRef.current?.select();
    window.navigator.clipboard.writeText(
      `${import.meta.env.VITE_FRONTEND_URL}/tweet/${data._id}`
    );
    toast({
      title: "Copied to clipboard",
    });
  };

  const handleRepost = async () => {
    try {
      await repostTweet(data._id);
      toast({
        title: "Tweet reposted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "something went wrong",
      });
    }
  };

  return (
    <div className="flex gap-x-4 ">
      <button
        onClick={() => toggleLike(data._id, user.username)}
        className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)] hover:text-[#1A8CD8]"
      >
        {data.isLiked === true ? <Heart fill="#1A8CD8" /> : <Heart />}
        <span>{data.likeCount}</span>
      </button>
      <Dialog>
        <DialogTrigger asChild>
          <button className="inline-flex items-center gap-x-1 outline-none hover:text-[#1A8CD8]">
            <MessageCircle />
            <span>{data.commentCount}</span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Reply</DialogTitle>
          <CommentBox type={type} data={data} />
        </DialogContent>
      </Dialog>
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
                  defaultValue={`${import.meta.env.VITE_FRONTEND_URL}/tweet/${
                    data._id
                  }`}
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
          onClick={() => toggleBookmark(data._id)}
          className={`
           group inline-flex items-center gap-x-1 outline-none hover:text-[#1A8CD8] `}
        >
          {data.isBookmarked === true ? (
            <Bookmark fill="#1A8CD8" />
          ) : (
            <Bookmark />
          )}
        </button>
        <button
          onClick={handleRepost}
          className={`
          } group inline-flex items-center gap-x-1 outline-none hover:text-[#1A8CD8] `}
        >
          <Repeat2 />
        </button>
      </div>
    </div>
  );
};

export default Widgets;
