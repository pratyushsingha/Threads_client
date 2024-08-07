import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Button,
  InputDiv,
  Spinner,
  profileRoutes,
  useToast,
} from "@/components/Index";
import {
  useGetUserProfileDetailsQuery,
  useHandleFollowMutation,
  useUpdateUserDetailsMutation,
} from "@/services/followAPI";
import { useGetCurrentUserQuery } from "@/services/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setUsernameParams } from "@/features/authSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  tags: z
    .string()
    .regex(
      /^#[^\s#]+(?:\s+#[^\s#]+)*$/,
      "Tags should be formatted as '#tag1 #tag2 #tag3' with each tag starting with '#' and separated by spaces"
    ),
  bio: z.string(),
  portfolio: z.string().url("Portfolio must be a valid URL"),
  avatar: z.any().optional(),
});

const Profile = () => {
  const avatarRef = useRef(null);
  const { toast } = useToast();
  const location = useLocation();
  const { username } = useParams();
  const dispatch = useDispatch();
  const [handleFollow] = useHandleFollowMutation();
  const { user } = useSelector((store) => store.auth);

  const {
    data: userProfile,
    isLoading: profileDetailsLoading,
    isError: profileDetailsError,
  } = useGetUserProfileDetailsQuery(username);
  const [updateProfile, { isLoading: updatingProfile }] =
    useUpdateUserDetailsMutation();

  const currentPath = location.pathname.split("/").pop();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isTouched, isSubmitting, isSubmitSuccessful },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      tags: "",
      bio: "",
      portfolio: "",
      avatar: null,
    },
    resolver: zodResolver(profileSchema),
  });

  const oldUserDetails = () => {
    setValue("firstName", userProfile?.fullName.split(" ")[0]);
    setValue("lastName", userProfile?.fullName.split(" ")[1]);
    setValue("tags", userProfile?.tags);
    setValue("bio", userProfile?.bio);
    setValue("portfolio", userProfile?.portfolio);
  };

  const handleUpdateProfile = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("tags", data.tags);
      formData.append("bio", data.bio);
      formData.append("portfolio", data.portfolio);
      // if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar);
      // }
      await updateProfile(formData).unwrap();

      toast({
        title: "Profile updated successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    }
  };

  useEffect(() => {
    dispatch(setUsernameParams(username));
  }, [username, dispatch]);

  if (profileDetailsError) return <p>Something went wrong</p>;

  if (profileDetailsLoading) {
    return <Spinner />;
  } else {
    return (
      <section className="bg-[#181818]">
        <div className="flex justify-between w-full p-5">
          <div>
            <h2 className="h2">{userProfile?.fullName}</h2>
            <p className="text-md font-medium mb-10">
              @{userProfile?.username}
            </p>
            {userProfile?.tags &&
              userProfile?.tags.map((tag, index) => (
                <>
                  <p key={index}>{tag}</p>{" "}
                </>
              ))}
            <p className="text-sm">{userProfile?.bio}</p>
            {userProfile?.portfolio && (
              <a
                href={userProfile?.portfolio}
                target="_blank"
                className="text-sm text-blue-600 underline cursor-pointer my-2"
              >
                {userProfile?.portfolio}
              </a>
            )}
            <p className="mt-5 text-slate-500 text-sm">
              {userProfile?.followersCount} followers
            </p>
          </div>
          <Avatar className="w-20 h-20 rounded-full">
            <AvatarImage src={userProfile?.avatar} />
            <AvatarFallback>{userProfile?.username}</AvatarFallback>
          </Avatar>
        </div>
        {userProfile?._id === user?._id ? (
          <Dialog>
            <DialogTrigger className="w-full px-5">
              <Button
                onClick={oldUserDetails}
                variant="outline"
                className="w-full"
              >
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">Edit Profile</DialogTitle>
                <DialogDescription className="flex">
                  <form
                    className="space-y-4 w-full"
                    onSubmit={handleSubmit(handleUpdateProfile)}
                  >
                    <div className="flex space-x-3">
                      <div className="w-full">
                        <InputDiv
                          label="First Name"
                          placeholder="Enter your first name"
                          {...register("firstName")}
                        />
                        <p className="text-red-600">
                          {errors.firstName?.message}
                        </p>
                      </div>
                      {/* <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={userProfile?.avatar} />
                            <AvatarFallback>
                              {userProfile?.username}
                            </AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <input
                              accept="image/png, image/jpg, image/jpeg"
                              type="file"
                              className="hidden"
                              // {...register("avatar")}
                              ref={avatarRef}
                              onChange={() => {
                                const file = avatarRef.current.files[0];
                                if (file) {
                                  setValue("avatar", file);
                                }
                              }}
                            />
                            <Button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                avatarRef.current.click();
                              }}
                              className="font-bold w-full text-start"
                              variant="ghost"
                            >
                              Upload Profile Picture
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {/* <Button
                              type="button"
                              className="text-red-500 font-bold"
                              variant="ghost"
                            >
                              Remove current Picture
                            </Button> */}
                      {/* </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}
                    </div>
                    <InputDiv
                      label="Last Name"
                      placeholder="Enter your last name"
                      {...register("lastName")}
                    />
                    <p className="text-red-600">{errors.lastName?.message}</p>
                    <InputDiv
                      label="Tags"
                      placeholder="Enter tags"
                      {...register("tags")}
                    />
                    <p className="text-red-600">{errors.tags?.message}</p>
                    <InputDiv
                      label="Bio"
                      placeholder="Enter your bio"
                      {...register("bio")}
                    />
                    <p className="text-red-600">{errors.bio?.message}</p>
                    <InputDiv
                      label="Portfolio"
                      type="url"
                      placeholder="Enter your portfolio"
                      {...register("portfolio")}
                    />
                    <p className="text-red-600">{errors.portfolio?.message}</p>
                    <InputDiv
                      label="Avatar"
                      accept="image/png, image/jpg, image/jpeg"
                      type="file"
                      ref={avatarRef}
                      onChange={() => {
                        const file = avatarRef.current.files[0];
                        if (file) {
                          setValue("avatar", file);
                        }
                      }}
                    />
                    <div>
                      <Button
                        disabled={isSubmitting || (!isDirty && !isTouched)}
                        className="w-full"
                      >
                        {updatingProfile && (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Update
                      </Button>
                    </div>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <div className="px-5">
            <Button
              variant={userProfile?.isFollowing ? "outline" : ""}
              className="w-full justify-center px-5"
              onClick={() =>
                handleFollow({
                  followerId: userProfile?._id,
                  username: userProfile?.username,
                })
              }
            >
              {userProfile?.isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </div>
        )}
        <div className="flex justify-between p-5">
          {profileRoutes.map((profileRoute) => (
            <NavLink
              key={profileRoute._id}
              to={profileRoute.path}
              className={`${
                (currentPath === user.username ? "" : currentPath) ===
                  `${profileRoute.path}` && "border-b border-white"
              } `}
            >
              {profileRoute.title}
            </NavLink>
          ))}
        </div>
        <hr />
        <Outlet />
      </section>
    );
  }
};

export default Profile;
