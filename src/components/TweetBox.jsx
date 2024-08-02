import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Label, Separator, useToast, Switch, Input } from "./Index";
import { Hash, Image, SmilePlus } from "lucide-react";
import Picker from "emoji-picker-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useCreateTweetMutation } from "@/services/tweetAPI";
import { useReplyOnTweetMutation } from "@/services/replyAPI";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const TweetBox = ({ formType, id }) => {
  const imagesRef = useRef(null);
  const { toast } = useToast();
  const [openImoji, setOpenImoji] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [tagClick, setTagClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { tweetBoxType } = useSelector((store) => store.tweet);

  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, isTouched, isSubmitSuccessful },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      content: "",
      tags: "",
      images: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "images",
    keyName: "imageId",
  });

  const onAddImages = () => {
    imagesRef.current.click();
  };

  const [createTweet, { isLoading: isCreating }] = useCreateTweetMutation();
  const [replyOnTweet, { isLoading: isPosting }] = useReplyOnTweetMutation(id);

  const handleMultipleImages = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) => ({
        file,
      }));

      append(files);
      imagesRef.current.value = "";
    }
  };

  const toggleAnonymous = (value) => {
    setIsAnonymous(value);
    toast({
      title: `Tweet set to ${value ? "anonymous" : "public"}`,
      status: "success",
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        content: "",
        tags: "",
        images: [],
      });
    }
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
        title: "New Reply Posted",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong while replying on tweet",
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

  const onEmojiClick = (data) => {
    const content = watch("content");
    setValue("content", content + data.emoji);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="relative flex-col rounded px-2 py-2 my-4">
        <div className="flex space-x-5 w-full ">
          <div className="self-center">
            <Link to={`/profile/${user.username}`}>
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className="w-full relative">
            <textarea
              className="py-5 text-pretty text-xl border-none focus:border-none bg-black w-full focus:outline-none"
              placeholder="What is happening?!"
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
            <div className="mb-4 flex space-x-3 w-full overflow-x-scroll hide-scrollbar">
              {fields.map(({ imageId, file }, index) => (
                <Controller
                  key={imageId}
                  control={control}
                  name={`images.${index}`}
                  render={() => (
                    <div className="mb-4">
                      <img
                        src={URL.createObjectURL(file)}
                        className="rounded-md "
                      />
                    </div>
                  )}
                />
              ))}
            </div>
            {openImoji && (
              <div className="absolute top-52 left-0 z-50">
                <Picker
                  onEmojiClick={onEmojiClick}
                  className="object-cover"
                  theme="dark"
                />
              </div>
            )}
          </div>
        </div>
        <Separator className="my-3" />
        <div className="mx-4 flex justify-between">
          <div>
            <Label htmlFor="imageUpload">
              <Button onClick={onAddImages} type="button" variant="ghost">
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
              onChange={handleMultipleImages}
            />
            <Button
              type="button"
              onClick={() => setOpenImoji(!openImoji)}
              variant="ghost"
            >
              <SmilePlus color="#1a8cd8" />
            </Button>
            <Button type="button" variant="ghost">
              <Switch
                defaultChecked={false}
                onCheckedChange={toggleAnonymous}
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
            {(isCreating || isPosting) && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Post
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TweetBox;
