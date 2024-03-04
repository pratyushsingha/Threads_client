import { useContext, useEffect, useState } from "react";
import {
  AppContext,
  Button,
  Label,
  Separator,
  useToast,
  Switch,
} from "./Index";
import { Hash, Image, SmilePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TweetBox = () => {
  const { toast } = useToast();
  const { userDetails, setLoading } = useContext(AppContext);
  const [openImoji, setOpenImoji] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [tagClick, setTagClick] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [multipleImages, setMultipleImages] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isTouched, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      content: "",
      tags: "",
      images: [],
    },
  });

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

  const createTweet = async (data) => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("content", data.content);
      formdata.append("tags", data.tags);
      formdata.append("isAnonymous", isAnonymous);
      for (let i = 0; i < data.images.length; i++) {
        formdata.append("images", data.images[i]);
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tweet`,
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      toast({
        title: response.data.message,
      });
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const render = (data) => {
    return (
      <div className="mb-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
        {data.map((image, index) => (
          <img key={index} src={image} alt={image} className="rounded-md" />
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
  return (
    <form onSubmit={handleSubmit(createTweet)}>
      <div className="relative flex-col border-slate border-2 rounded px-2 py-2 my-4">
        <div className="flex space-x-5 w-full ">
          <img
            className="h-10 w-10 shrink-0 sm:h-12 self-center sm:w-12 rounded-full"
            src={userDetails.avatar}
            alt=""
          />
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
              <Button type="button" variant="ghost">
                <Image color="#1a8cd8" />
              </Button>
            </Label>
            <input
              id="imageUpload"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              multiple
              {...register("images")}
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
            Post
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TweetBox;
