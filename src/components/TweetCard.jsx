import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Heart, Bookmark, Share2, MessageCircle, Copy } from "lucide-react";
import axios from "axios";

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

const TweetCard = ({ tweet }) => {
  const { toast } = useToast();
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTweetBoxType("replyOnTweet"));
  }, []);

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
            alt={tweet.isAnonymous ? "Anonymous" : tweet.ownerDetails?.username}
            className="h-full w-full rounded-full object-cover"
          />
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
          <Widgets data={tweet} />
        </div>
      </div>
    </div>
    // <div className="bg-gray-50 dark:bg-gray-600 p-10 flex items-center justify-center">
    //   <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
    //     <div className="flex justify-between">
    //       <div className="flex items-center">
    //         <img
    //           className="h-11 w-11 rounded-full"
    //           src="https://pbs.twimg.com/profile_images/1287562748562309122/4RLk5A_U_x96.jpg"
    //         />
    //         <div className="ml-1.5 text-sm leading-tight">
    //           <span className="text-black dark:text-white font-bold block ">
    //             Visualize Value
    //           </span>
    //           <span className="text-gray-500 dark:text-gray-400 font-normal block">
    //             @visualizevalue
    //           </span>
    //         </div>
    //       </div>
    //       <svg
    //         className="text-blue-400 dark:text-white h-6 w-auto inline-block fill-current"
    //         viewBox="0 0 24 24"
    //       >
    //         <g>
    //           <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
    //         </g>
    //       </svg>
    //     </div>
    //     <p className="text-black dark:text-white block text-xl leading-snug mt-3">
    //       “No one ever made a decision because of a number. They need a story.”
    //       — Daniel Kahneman
    //     </p>
    //     <div className="flex overflow-x-auto">
    //       <img
    //         className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
    //         src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
    //       />
    //       <img
    //         className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
    //         src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
    //       />
    //     </div>
    //     <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
    //       10:05 AM · Dec 19, 2020
    //     </p>
    //     <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />
    //     <div className="text-gray-500 dark:text-gray-400 flex mt-3">
    //       <div className="flex items-center mr-6">
    //         <svg
    //           className="fill-current h-5 w-auto"
    //           viewBox="0 0 24 24"
    //           style={{}}
    //         >
    //           <g>
    //             <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
    //           </g>
    //         </svg>
    //         <span className="ml-3">615</span>
    //       </div>
    //       <div className="flex items-center mr-6">
    //         <svg className="fill-current h-5 w-auto" viewBox="0 0 24 24">
    //           <g>
    //             <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
    //           </g>
    //         </svg>
    //         <span className="ml-3">93 people are Tweeting about this</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default TweetCard;
