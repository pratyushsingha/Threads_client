import { Link, Outlet, useParams } from "react-router-dom";
import moment from "moment";

import { Button, Spinner, profileRoutes } from "@/components/Index";
import {
  useGetUserProfileDetailsQuery,
  useHandleFollowMutation,
} from "@/services/followAPI";
import { useGetCurrentUserQuery } from "@/services/authAPI";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUsernameParams } from "@/features/authSlice";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [handleFollow] = useHandleFollowMutation();
  const { data: user } = useGetCurrentUserQuery();
  const {
    data: userProfile,
    isLoading: profileDetailsLoading,
    isError: profileDetailsError,
  } = useGetUserProfileDetailsQuery(username);

  if (profileDetailsError) return <p>something went wrong </p>;

  useEffect(() => {
    dispatch(setUsernameParams(username));
  });

  return (
    <div>
      {profileDetailsLoading ? (
        <Spinner />
      ) : (
        <div key={userProfile._id}>
          <p>@{userProfile.username}</p>
          <img
            className="w-10 h-10 rounded-full"
            src={userProfile.avatar}
            alt=""
          />
          <p className="uppercase font-bold">{userProfile.fullName}</p>
          <p>joined {moment(userProfile.createdAt).format("MMM Do YY")}</p>
          <p>{userProfile.followersCount} followers</p>
          <p>{userProfile.followingCount} following</p>
          {userProfile._id === user._id ? (
            <Link to={`/profile/${userProfile.username}/edit`}>
              <Button>edit Profile</Button>
            </Link>
          ) : (
            <Button
              onClick={() =>
                handleFollow({
                  followerId: userProfile._id,
                  username: userProfile.username,
                })
              }
            >
              {userProfile.isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
          <div className="flex space-x-3">
            {profileRoutes.map(({ _id, title, path }) => (
              <Link key={_id} to={path}>
                <p>{title}</p>
              </Link>
            ))}
            {userProfile._id === user._id && (
              <Link to={`/profile/${userProfile.username}/edit`}>
                <p>Edit Profile</p>
              </Link>
            )}
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Profile;
