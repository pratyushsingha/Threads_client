import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Share2, MessageCircle, Copy, Repeat2 } from "lucide-react";

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
import { useToggleLikeMutation } from "@/services/tweetAPI";
import { useRepostTweetMutation } from "@/services/repostAPI";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { setTweetBoxType } from "@/features/tweetSlice";

const Widgets = ({ data, type }) => {
  const { toast } = useToast();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [toggleLike] = useToggleLikeMutation();
  const [repostTweet] = useRepostTweetMutation();
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
    <div className="flex space-x-1 md:space-x-1 ">
      <Button
        variant="ghost"
        onClick={() => toggleLike(data._id, user.username)}
        className="rounded-3xl space-x-1"
      >
        {data.isLiked === true ? (
          <>
            <IoHeartSharp className="w-6 h-6 text-[#DC143C]" />
            <span className="text-[#DC143C]">{data.likeCount}</span>
          </>
        ) : (
          <>
            <IoHeartOutline className="w-6 h-6" />
            <span>{data.likeCount}</span>
          </>
        )}
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={() => dispatch(setTweetBoxType("replyOnTweet"))}
            variant="ghost"
            className="rounded-3xl space-x-1"
          >
            <MessageCircle className="w-6 h-6" />
            <span>{data.commentCount}</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Reply</DialogTitle>
          <CommentBox type={type} data={data} />
        </DialogContent>
      </Dialog>
      <div className="ml-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="rounded-3xl space-x-1">
              <Share2 />
            </Button>
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
        <Button
          onClick={data.isReposted ? null : handleRepost}
          variant="ghost"
          className="rounded-3xl space-x-1"
        >
          {data.isReposted === true ? (
            <Repeat2 className="w-6 h-6 text-green-600" />
          ) : (
            <Repeat2 className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Widgets;
