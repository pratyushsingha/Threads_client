import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Label,
  Separator,
  useToast,
  Switch,
  Spinner,
  Input,
} from "./Index";
import { Hash, Image, SmilePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useCreateTweetMutation } from "@/services/tweetAPI";
import { useReplyOnTweetMutation } from "@/services/replyAPI";

const TweetBox = ({ formType, id }) => {
  const imagesRef = useRef(null);
  const { toast } = useToast();
  const [openImoji, setOpenImoji] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [tagClick, setTagClick] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [multipleImages, setMultipleImages] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { tweetBoxType } = useSelector((store) => store.tweet);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isTouched, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      content: "",
      tags: "",
      images: [],
    },
  });

  const [createTweet, { isLoading: isCreating }] = useCreateTweetMutation();
  const [replyOnTweet, { isLoading: isPosting }] = useReplyOnTweetMutation(id);

  const handleMultipleImages = (e) => {
    if (e.target.files) {
      setMultipleImages(e.target.files);
      const imgArr = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages((prevImg) => prevImg.concat(imgArr));
    }
  };

  const toggleAnonymous = (value) => {
    setIsAnonymous(value);
    if (value === true) {
      toast({
        title: "Tweet set to anonymous",
        status: "success",
      });
    } else {
      toast({
        title: "Tweet set to public",
        status: "success",
      });
    }
  };

  const render = (data) => {
    return (
      <div className="mb-4 flex overflow-x-auto gap-4">
        {data.map((image, index) => (
          <img key={index} src={image} alt={image} className="rounded-md w-2/4 h-2/4" />
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (isSubmitSuccessful)
      reset({
        content: "",
        tags: "",
        images: [],
      });
  }, [isSubmitSuccessful]);

  const handleCreateTweet = async (data) => {
    try {
      await createTweet({ ...data, isAnonymous }).unwrap();
      toast({
        title: "Tweet created",
      });
    } catch (error) {
      console.error("Error creating tweet:", error);
    }
  };

  const handleReplyOnTweet = async (data) => {
    try {
      await replyOnTweet({
        data: { ...data, isAnonymous },
        tweetId: id,
      }).unwrap();
      toast({
        title: "reply posted",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "something went wrong while repling on tweet",
      });
    }
  };

  const submitHandler = (data) => {
    if (tweetBoxType === "createTweet") {
      handleCreateTweet(data);
    } else if (tweetBoxType === "replyOnTweet") {
      handleReplyOnTweet(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="relative flex-col rounded px-2 py-2 my-4">
        <div className="flex space-x-5 w-full ">
          <div className="self-center">
            <Link to={`/profile/${user.username}`}>
              <img
                className="h-10 w-10 shrink-0 sm:h-12 sm:w-12 rounded-full"
                src={user.avatar}
                alt=""
              />
            </Link>
          </div>
          <div className="w-full relative">
            <textarea
              className="py-5 text-pretty text-xl border-none focus:border-none bg-black w-full focus:outline-none"
              placeholder="what is happening?!"
              {...register("content", {
                required: true,
              })}
            />
            <input
              placeholder="#trending..."
              className={`text-[#1a8cd8] w-full rounded my-2 font-semibold bg-black outline-none ${
                tagClick ? "block" : "hidden"
              }`}
              {...register("tags")}
            />
            {render(previewImages)}
            {openImoji && (
              <div className="absolute top-52 left-0 z-50">
                <EmojiPicker className="object-cover" theme="dark" />
              </div>
            )}
          </div>
        </div>
        <Separator className="my-3" />
        <div className="mx-4 flex justify-between">
          <div>
            <Label htmlFor="imageUpload">
              <Button
                onClick={() => imagesRef.current.click()}
                type="button"
                variant="ghost"
              >
                <Image color="#1a8cd8" />
              </Button>
            </Label>
            <Input
              ref={imagesRef}
              className="hidden"
              id="imageUpload"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              multiple
              // {...register("images")}
              onChange={(e) => handleMultipleImages(e)}
            />
            <Button onClick={() => setOpenImoji(!openImoji)} variant="ghost">
              <SmilePlus color="#1a8cd8" />
            </Button>
            <Button type="button" variant="ghost">
              <Switch
                defaultChecked={false}
                onCheckedChange={(value) => toggleAnonymous(value)}
              />
            </Button>

            <Button
              type="button"
              onClick={() => setTagClick(!tagClick)}
              variant="ghost"
            >
              <Hash color="#1a8cd8" />
            </Button>
          </div>
          <Button disabled={!isDirty && !isTouched} type="submit">
            {isCreating ||
              (isPosting && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ))}
            Post
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TweetBox;
